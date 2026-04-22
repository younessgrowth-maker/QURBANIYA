"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2, Upload, Loader2, XCircle, Send, Video } from "lucide-react";
import type { OrderWithNumber } from "@/app/admin/videos/page";
import type { Worker as TesseractWorker } from "tesseract.js";

type Status =
  | "idle"
  | "processing"
  | "uploading"
  | "uploaded"
  | "sending"
  | "sent"
  | "error";

interface OrderState {
  order: OrderWithNumber;
  status: Status;
  message?: string;
  ocrNumber?: number;
}

interface VideosManagerProps {
  initialOrders: OrderWithNumber[];
}

// Extrait la première frame utile d'un fichier vidéo (à 0.5s pour éviter la
// frame noire d'ouverture). Retourne un canvas prêt pour l'OCR.
async function extractFrame(file: File): Promise<HTMLCanvasElement> {
  const url = URL.createObjectURL(file);
  try {
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.playsInline = true;
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error("video load failed"));
    });
    video.currentTime = Math.min(0.5, video.duration);
    await new Promise<void>((resolve) => { video.onseeked = () => resolve(); });

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas context failed");
    ctx.drawImage(video, 0, 0);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Cherche un numéro type "N°42", "No 42" ou juste "42" seul sur une ligne
// dans le texte OCR. Retourne null si pas trouvé.
function parseNumber(text: string): number | null {
  const withPrefix = text.match(/N[°o]\s*(\d{1,4})/i);
  if (withPrefix) return parseInt(withPrefix[1], 10);
  const lineMatch = text.match(/^\s*(\d{1,4})\s*$/m);
  if (lineMatch) return parseInt(lineMatch[1], 10);
  return null;
}

export default function VideosManager({ initialOrders }: VideosManagerProps) {
  const [orders, setOrders] = useState<OrderState[]>(() =>
    initialOrders.map((o) => ({
      order: o,
      status: o.video_url ? (o.video_sent ? "sent" : "uploaded") : "idle",
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

  const updateOrder = useCallback((orderNumber: number, patch: Partial<OrderState>) => {
    setOrders((prev) =>
      prev.map((s) => (s.order.order_number === orderNumber ? { ...s, ...patch } : s))
    );
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      if (!workerRef.current) {
        console.warn("Tesseract worker not ready, skipping", file.name);
        return;
      }

      let detectedNumber: number | null = null;
      try {
        const canvas = await extractFrame(file);
        const { data: { text } } = await workerRef.current.recognize(canvas);
        detectedNumber = parseNumber(text);
      } catch (err) {
        console.error("OCR failed for", file.name, err);
      }

      if (detectedNumber === null) {
        console.warn("No N°X detected in", file.name);
        return;
      }

      const match = orders.find((s) => s.order.order_number === detectedNumber);
      if (!match) {
        console.warn(`N°${detectedNumber} détecté mais aucune commande`);
        return;
      }

      updateOrder(detectedNumber, {
        status: "uploading",
        ocrNumber: detectedNumber,
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
          body: JSON.stringify({ order_id: match.order.id, video_path: path }),
        });
        if (!updateRes.ok) throw new Error("update failed");

        updateOrder(detectedNumber, {
          status: "uploaded",
          message: undefined,
        });
      } catch (err) {
        console.error("Upload pipeline failed:", err);
        updateOrder(detectedNumber, {
          status: "error",
          message: err instanceof Error ? err.message : "upload failed",
        });
      }
    },
    [orders, updateOrder]
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
    async (order: OrderWithNumber) => {
      updateOrder(order.order_number, { status: "sending", message: "Envoi en cours…" });
      try {
        const res = await fetch("/api/admin/videos/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: order.id }),
        });
        if (!res.ok) {
          const { error } = await res.json().catch(() => ({ error: "send failed" }));
          throw new Error(error);
        }
        updateOrder(order.order_number, { status: "sent", message: undefined });
      } catch (err) {
        updateOrder(order.order_number, {
          status: "error",
          message: err instanceof Error ? err.message : "send failed",
        });
      }
    },
    [updateOrder]
  );

  const stats = {
    total: orders.length,
    uploaded: orders.filter((s) => s.status === "uploaded" || s.status === "sent" || s.status === "sending").length,
    sent: orders.filter((s) => s.status === "sent").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="flex gap-3 text-sm">
        <div className="px-3 py-2 rounded-lg bg-white border border-gray-200">
          <span className="text-text-muted-light">Commandes payées :</span>{" "}
          <strong className="text-text-primary">{stats.total}</strong>
        </div>
        <div className="px-3 py-2 rounded-lg bg-white border border-gray-200">
          <span className="text-text-muted-light">Vidéos uploadées :</span>{" "}
          <strong className="text-text-primary">{stats.uploaded} / {stats.total}</strong>
        </div>
        <div className="px-3 py-2 rounded-lg bg-white border border-gray-200">
          <span className="text-text-muted-light">Emails envoyés :</span>{" "}
          <strong className="text-text-primary">{stats.sent} / {stats.total}</strong>
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
          ou clique pour parcourir — le matching N°X se fait automatiquement
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

      {/* Orders list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-text-muted-light text-xs uppercase tracking-wider">
              <th className="px-4 py-3 w-16">N°</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Niyyah</th>
              <th className="px-4 py-3 w-40">Vidéo</th>
              <th className="px-4 py-3 w-48 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((s) => (
              <tr key={s.order.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-bold text-gold">#{s.order.order_number}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-text-primary">{s.order.full_name}</div>
                  <div className="text-xs text-text-muted-light">{s.order.email}</div>
                </td>
                <td className="px-4 py-3 text-text-muted">{s.order.niyyah}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={s.status} message={s.message} />
                </td>
                <td className="px-4 py-3 text-right">
                  {(s.status === "uploaded" || s.status === "error") && s.order.video_url && (
                    <button
                      onClick={() => sendEmail(s.order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors"
                    >
                      <Send size={12} />
                      Envoyer l&apos;email
                    </button>
                  )}
                  {s.status === "sent" && (
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                      <CheckCircle2 size={14} />
                      Email envoyé
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
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
