"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2, Upload, Loader2, XCircle, Send, Video } from "lucide-react";
import type { SacrificeRow } from "@/app/admin/videos/page";
import type { Worker as TesseractWorker } from "tesseract.js";

type Status =
  | "idle"
  | "processing"
  | "uploading"
  | "uploaded"
  | "sending"
  | "sent"
  | "error";

interface RowState {
  row: SacrificeRow;
  status: Status;
  message?: string;
  ocrLabel?: string;
}

interface VideosManagerProps {
  initialRows: SacrificeRow[];
}

// Extrait plusieurs frames de la vidéo (à 0.5s, 2s, 4s, 6s) pour donner
// plusieurs chances à l'OCR. Safari fait parfois un seek imprécis qui
// tombe sur une frame floue/noire → on essaie plusieurs timestamps et
// le caller s'arrête au premier OCR réussi (early exit).
async function* extractFrames(file: File): AsyncGenerator<HTMLCanvasElement> {
  const url = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.src = url;
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error("video load failed"));
    });

    const duration = video.duration;
    const timestamps = [0.5, 2, 4, 6, 8].filter((t) => t < duration);
    if (timestamps.length === 0) timestamps.push(Math.max(0, duration / 2));

    for (const t of timestamps) {
      video.currentTime = t;
      await new Promise<void>((resolve) => {
        video.onseeked = () => resolve();
      });
      // Petit délai supplémentaire pour laisser le frame buffer se peindre
      await new Promise((r) => setTimeout(r, 100));

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(video, 0, 0);
      yield canvas;
    }
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Cherche un label type "N°12", "N°12a", "No 42b" ou juste "12a" seul sur
// une ligne. Retourne le label combiné lowercase (sans le N°) ou null.
// Multi-mouton : le cheikh écrit "12a" / "12b" sur les vidéos d'une même
// commande pour distinguer les sacrifices.
function parseLabel(text: string): string | null {
  // Forme "N°12a" ou "No 12 a" — espaces tolérés entre digit et lettre
  const withPrefix = text.match(/N[°o]\s*(\d{1,4})\s*([a-z])?/i);
  if (withPrefix) {
    const digits = withPrefix[1];
    const letter = withPrefix[2]?.toLowerCase() ?? "";
    return `${digits}${letter}`;
  }
  // Forme "12a" seul sur une ligne
  const lineMatch = text.match(/^\s*(\d{1,4})\s*([a-z])?\s*$/im);
  if (lineMatch) {
    const digits = lineMatch[1];
    const letter = lineMatch[2]?.toLowerCase() ?? "";
    return `${digits}${letter}`;
  }
  return null;
}

export default function VideosManager({ initialRows }: VideosManagerProps) {
  const [rows, setRows] = useState<RowState[]>(() =>
    initialRows.map((r) => ({
      row: r,
      status: r.videoSent
        ? "sent"
        : r.videoPath
        ? "uploaded"
        : "idle",
    }))
  );
  const [dragActive, setDragActive] = useState(false);
  const [workerReady, setWorkerReady] = useState(false);
  const workerRef = useRef<TesseractWorker | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialise Tesseract en arrière-plan dès le montage (~8 Mo à charger).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { createWorker } = await import("tesseract.js");
        const worker = await createWorker("fra");
        if (cancelled) {
          await worker.terminate();
          return;
        }
        workerRef.current = worker;
        setWorkerReady(true);
      } catch (err) {
        console.error("Tesseract init failed:", err);
      }
    })();
    return () => {
      cancelled = true;
      workerRef.current?.terminate();
    };
  }, []);

  const updateRow = useCallback(
    (combinedLabel: string, patch: Partial<RowState>) => {
      setRows((prev) =>
        prev.map((s) =>
          s.row.combinedLabel === combinedLabel ? { ...s, ...patch } : s
        )
      );
    },
    []
  );

  // Marque toutes les rows d'une commande en "sent" après l'envoi groupé email.
  const markOrderSent = useCallback((orderId: string, message?: string) => {
    setRows((prev) =>
      prev.map((s) =>
        s.row.orderId === orderId
          ? { ...s, status: "sent" as const, message }
          : s
      )
    );
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      let detectedLabel: string | null = null;
      let detectionSource = "ocr";

      // 1) Fallback nom de fichier — si l'utilisateur a renommé son fichier
      // en "N°234.mp4" ou "N°234a.mp4", on lit le N° directement depuis le
      // nom de fichier (plus fiable que l'OCR Tesseract qui ajoute parfois
      // des lettres parasites sur les étiquettes floues : "259f" au lieu
      // de "259", "277l" au lieu de "277", etc.).
      // Précondition : le label détecté doit matcher un sacrifice existant ;
      // sinon on tombe sur l'OCR.
      const fromName = parseLabel(file.name);
      if (fromName && rows.find((s) => s.row.combinedLabel === fromName)) {
        detectedLabel = fromName;
        detectionSource = "filename";
      }

      // 2) Sinon OCR sur les frames vidéo
      if (detectedLabel === null) {
        if (!workerRef.current) {
          console.warn("Tesseract worker not ready, skipping", file.name);
          return;
        }
        try {
          // Multi-frame OCR : essaie plusieurs timestamps (0.5s, 2s, 4s, 6s, 8s)
          // et arrête au premier qui détecte un N°X. Safari fait parfois un
          // seek imprécis qui tombe sur une frame floue → multi-essai indispensable.
          for await (const canvas of extractFrames(file)) {
            if (!workerRef.current) break;
            const { data: { text } } = await workerRef.current.recognize(canvas);
            const label = parseLabel(text);
            if (label !== null) {
              detectedLabel = label;
              break;
            }
          }
        } catch (err) {
          console.error("OCR failed for", file.name, err);
        }
      }

      if (detectedLabel === null) {
        console.warn("No N°X detected in", file.name);
        return;
      }

      const match = rows.find((s) => s.row.combinedLabel === detectedLabel);
      if (!match) {
        console.warn(
          `N°${detectedLabel} détecté (via ${detectionSource}) mais aucun sacrifice correspondant`
        );
        return;
      }
      if (process.env.NODE_ENV !== "production") {
        console.info(`✓ ${file.name} → N°${detectedLabel} (via ${detectionSource})`);
      }

      updateRow(detectedLabel, {
        status: "uploading",
        ocrLabel: detectedLabel,
        message: "Upload en cours…",
      });

      try {
        const signRes = await fetch("/api/admin/videos/sign-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name }),
        });
        if (!signRes.ok) throw new Error("sign failed");
        const { path, token } = (await signRes.json()) as { path: string; token: string };

        const supabase = createClient();
        const { error: uploadError } = await supabase.storage
          .from("sacrifice-videos")
          .uploadToSignedUrl(path, token, file);
        if (uploadError) throw uploadError;

        const updateRes = await fetch("/api/admin/videos/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: match.row.orderId,
            sacrifice_index: match.row.sacrificeIndex,
            video_path: path,
          }),
        });
        if (!updateRes.ok) {
          const errBody = await updateRes.json().catch(() => ({}));
          console.error("update failed:", errBody);
          throw new Error(
            errBody.details || errBody.error || `update ${updateRes.status}`,
          );
        }

        updateRow(detectedLabel, {
          status: "uploaded",
          message: undefined,
        });
      } catch (err) {
        console.error("Upload pipeline failed:", err);
        updateRow(detectedLabel, {
          status: "error",
          message: err instanceof Error ? err.message : "upload failed",
        });
      }
    },
    [rows, updateRow]
  );

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("video/"));
      for (const file of list) {
        await processFile(file);
      }
    },
    [processFile]
  );

  const sendEmail = useCallback(
    async (orderId: string) => {
      // Marque toutes les rows de la commande en "sending" (l'envoi groupe
      // tous les liens vidéos de la commande dans un seul email).
      setRows((prev) =>
        prev.map((s) =>
          s.row.orderId === orderId
            ? { ...s, status: "sending" as const, message: "Envoi en cours…" }
            : s
        )
      );
      try {
        const res = await fetch("/api/admin/videos/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderId }),
        });
        const body = await res.json().catch(
          () =>
            ({} as {
              error?: string;
              wa_sent?: boolean;
              wa_error?: string;
              already_sent?: boolean;
              sent_at?: string;
            })
        );
        // Cas spécial : HTTP 409 = idempotency (PR #126) — la vidéo a déjà
        // été envoyée précédemment. On NE veut PAS afficher "Erreur" rouge
        // dans ce cas. On marque comme "déjà envoyée" (état sent) et on
        // affiche un message clair plutôt que le message d'erreur générique.
        if (res.status === 409 && body.already_sent) {
          const date = body.sent_at
            ? new Date(body.sent_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
            : "";
          markOrderSent(orderId, `Déjà envoyé${date ? ` à ${date}` : ""}`);
          return;
        }
        if (!res.ok) {
          throw new Error(body.error || "send failed");
        }
        const waNote = body.wa_sent
          ? "Email ✓ WA ✓"
          : `Email ✓ WA ✗ ${body.wa_error ?? ""}`.trim();
        markOrderSent(orderId, waNote);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "send failed";
        setRows((prev) =>
          prev.map((s) =>
            s.row.orderId === orderId
              ? { ...s, status: "error" as const, message: errMsg }
              : s
          )
        );
      }
    },
    [markOrderSent]
  );

  // Groupements pour les stats + déterminer si une commande est prête à envoyer.
  const orderStats = useMemo(() => {
    const byOrder = new Map<
      string,
      { total: number; uploaded: number; sent: number }
    >();
    for (const s of rows) {
      const entry = byOrder.get(s.row.orderId) ?? {
        total: 0,
        uploaded: 0,
        sent: 0,
      };
      entry.total += 1;
      if (
        s.status === "uploaded" ||
        s.status === "sent" ||
        s.status === "sending"
      ) {
        entry.uploaded += 1;
      }
      if (s.status === "sent") entry.sent += 1;
      byOrder.set(s.row.orderId, entry);
    }
    return byOrder;
  }, [rows]);

  const stats = useMemo(() => {
    const totalSacrifices = rows.length;
    const uploadedSacrifices = rows.filter(
      (s) =>
        s.status === "uploaded" ||
        s.status === "sent" ||
        s.status === "sending"
    ).length;
    const ordersSent = Array.from(orderStats.values()).filter(
      (o) => o.sent === o.total && o.total > 0
    ).length;
    const totalOrders = orderStats.size;
    return { totalSacrifices, uploadedSacrifices, ordersSent, totalOrders };
  }, [rows, orderStats]);

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="flex gap-3 text-sm flex-wrap">
        <div className="px-3 py-2 rounded-lg bg-white border border-gray-200">
          <span className="text-text-muted-light">Sacrifices :</span>{" "}
          <strong className="text-text-primary">{stats.totalSacrifices}</strong>
        </div>
        <div className="px-3 py-2 rounded-lg bg-white border border-gray-200">
          <span className="text-text-muted-light">Vidéos uploadées :</span>{" "}
          <strong className="text-text-primary">{stats.uploadedSacrifices} / {stats.totalSacrifices}</strong>
        </div>
        <div className="px-3 py-2 rounded-lg bg-white border border-gray-200">
          <span className="text-text-muted-light">Commandes livrées :</span>{" "}
          <strong className="text-text-primary">{stats.ordersSent} / {stats.totalOrders}</strong>
        </div>
        <div className="ml-auto px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs">
          OCR :{" "}
          {workerReady ? (
            <span className="text-emerald-600 font-semibold">prêt</span>
          ) : (
            <span className="text-text-muted-light">chargement…</span>
          )}
        </div>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 bg-white hover:border-primary/40"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={32} className="mx-auto text-gold mb-3" />
        <p className="text-text-primary font-semibold">
          Glisse-dépose toutes les vidéos ici
        </p>
        <p className="text-text-muted text-sm mt-1">
          ou clique pour parcourir — le matching N°X (ou N°Xa/Xb pour multi-moutons) se fait automatiquement
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* Rows list — 1 ligne par sacrifice */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-text-muted-light text-xs uppercase tracking-wider">
              <th className="px-4 py-3 w-20">N°</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Niyyah</th>
              <th className="px-4 py-3 w-40">Vidéo</th>
              <th className="px-4 py-3 w-48 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s, idx) => {
              const orderEntry = orderStats.get(s.row.orderId);
              const allUploadedForOrder =
                !!orderEntry && orderEntry.uploaded === orderEntry.total;
              const allSentForOrder =
                !!orderEntry && orderEntry.sent === orderEntry.total;
              // L'action "Envoyer l'email" n'apparaît que sur la PREMIÈRE row
              // de la commande, pour éviter N boutons doublons.
              const isFirstOfOrder =
                idx === 0 || rows[idx - 1].row.orderId !== s.row.orderId;
              const isLastOfOrder =
                idx === rows.length - 1 ||
                rows[idx + 1].row.orderId !== s.row.orderId;
              return (
                <tr
                  key={s.row.combinedLabel}
                  className={`border-gray-100 ${
                    isLastOfOrder ? "border-b" : "border-b border-dashed"
                  } last:border-0`}
                >
                  <td className="px-4 py-3 font-bold text-gold whitespace-nowrap">
                    #{s.row.combinedLabel}
                  </td>
                  <td className="px-4 py-3">
                    {isFirstOfOrder ? (
                      <>
                        <div className="font-semibold text-text-primary">
                          {s.row.fullName}
                          {s.row.quantity > 1 && (
                            <span className="ml-2 text-[10px] font-bold text-gold uppercase tracking-wider">
                              {s.row.quantity} sacrifices
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-text-muted-light">{s.row.email}</div>
                      </>
                    ) : (
                      <div className="text-xs text-text-muted-light italic">
                        ↳ même commande
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{s.row.niyyah}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status} message={s.message} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isFirstOfOrder && allSentForOrder && (
                      <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                        <CheckCircle2 size={14} />
                        Email envoyé
                      </span>
                    )}
                    {isFirstOfOrder &&
                      !allSentForOrder &&
                      allUploadedForOrder && (
                        <button
                          onClick={() => sendEmail(s.row.orderId)}
                          disabled={s.status === "sending"}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send size={12} />
                          {s.status === "sending" ? "Envoi…" : "Envoyer l'email"}
                          {s.status !== "sending" && s.row.quantity > 1 && (
                            <span className="ml-1 opacity-80">
                              ({s.row.quantity} vidéos)
                            </span>
                          )}
                        </button>
                      )}
                    {isFirstOfOrder &&
                      !allSentForOrder &&
                      !allUploadedForOrder &&
                      orderEntry &&
                      orderEntry.total > 1 && (
                        <span className="text-xs text-text-muted-light">
                          {orderEntry.uploaded}/{orderEntry.total} vidéos
                        </span>
                      )}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                  Aucune commande payée pour {new Date().getFullYear()}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status, message }: { status: Status; message?: string }) {
  switch (status) {
    case "idle":
      return (
        <span className="inline-flex items-center gap-1 text-text-muted-light text-xs">
          <Video size={12} />
          En attente
        </span>
      );
    case "processing":
    case "uploading":
    case "sending":
      return (
        <span className="inline-flex items-center gap-1 text-gold text-xs">
          <Loader2 size={12} className="animate-spin" />
          {message ?? "Traitement…"}
        </span>
      );
    case "uploaded":
      return (
        <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
          <CheckCircle2 size={12} />
          Uploadée
        </span>
      );
    case "sent":
      return (
        <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
          <CheckCircle2 size={12} />
          Livrée
        </span>
      );
    case "error":
      return (
        <span className="inline-flex items-center gap-1 text-urgency text-xs" title={message}>
          <XCircle size={12} />
          Erreur
        </span>
      );
  }
}
