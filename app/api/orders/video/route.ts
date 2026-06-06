import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { parseOrderReference, escapeLike } from "@/lib/utils";
import { expandOrderToSacrifices } from "@/lib/sacrifices";
import { buildOrderSteps } from "@/lib/order-status";
import type { Order } from "@/types";

// ─── Recherche publique de la vidéo nominative ────────────────────────────
// Le client saisit son email + son numéro de commande (QRB-2026-XXXXXXXX) et
// récupère, sans authentification, les URL signées de ses vidéos de sacrifice.
//
// Sécurité (page publique exposant une donnée perso forte = vidéo nominative) :
//   1. Double facteur : email ET préfixe uuid (8 hex ≈ 4,3 milliards de combos)
//      doivent matcher la MÊME commande → non énumérable.
//   2. Réponse générique en cas d'échec : on ne révèle jamais si l'email
//      existe ou si seul le numéro est faux.
//   3. Rate-limit IP en défense de profondeur (cap les tentatives auto).
//   4. URL signées à TTL court (2h) — bien plus court que les liens email/WA
//      (90j) : si l'URL fuite depuis cette page publique, l'exposition est
//      limitée.

const SIGNED_URL_TTL_SECONDS = 2 * 60 * 60; // 2h

/* ── Rate limit en mémoire : 15 tentatives / 10 min / IP ── */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 15;
const attempts = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  attempts.set(ip, recent);
  // Cleanup opportuniste pour éviter la croissance infinie de la Map.
  if (attempts.size > 5000) {
    Array.from(attempts.entries()).forEach(([key, ts]) => {
      if (ts.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) attempts.delete(key);
    });
  }
  return recent.length > RATE_LIMIT_MAX;
}

// Réponse générique « introuvable » — volontairement identique que l'email
// soit inconnu ou le numéro faux (anti-énumération).
const NOT_FOUND = NextResponse.json(
  {
    status: "not_found",
    message:
      "Aucune commande ne correspond à cet email et ce numéro. Vérifiez votre saisie ou contactez-nous sur WhatsApp.",
  },
  { status: 404 }
);

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        {
          status: "rate_limited",
          message: "Trop de tentatives. Réessayez dans quelques minutes.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const refHex = parseOrderReference(
      typeof body.reference === "string" ? body.reference : ""
    );

    // Email plausible + référence exploitable. Sinon réponse générique.
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !refHex) {
      return NOT_FOUND;
    }

    const supabase = createServiceRoleClient();

    // Toutes les commandes de cet email (en pratique 1-3). On matche le préfixe
    // uuid en JS plutôt qu'en SQL (PostgREST ne filtre pas un préfixe de uuid
    // proprement) — le volume par email est négligeable.
    const { data: rows, error } = await supabase
      .from("orders")
      .select("*")
      .ilike("email", escapeLike(email));

    if (error) {
      console.error("Video lookup query failed:", error.code, error.message);
      return NextResponse.json(
        { status: "error", message: "Erreur technique. Réessayez plus tard." },
        { status: 500 }
      );
    }

    const order = (rows as Order[] | null)?.find((o) =>
      o.id.replace(/-/g, "").toLowerCase().startsWith(refHex)
    );

    if (!order) return NOT_FOUND;

    // Vidéo prête = commande payée ET toutes les vidéos uploadées.
    const items = expandOrderToSacrifices(order, 0);
    const allReady =
      order.payment_status === "paid" &&
      items.length > 0 &&
      items.every((it) => it.videoPath);

    // Pas encore prête (non réglée OU vidéos pas toutes uploadées) → on
    // renvoie le suivi de commande (même timeline que /ma-commande) plutôt
    // qu'un simple message, pour que le client voie où en est sa commande.
    if (!allReady) {
      return NextResponse.json({
        status: "tracking",
        prenom: order.prenom,
        reference: `QRB-2026-${order.id.replace(/-/g, "").slice(0, 8).toUpperCase()}`,
        orderId: order.id,
        steps: buildOrderSteps(order, new Date()),
      });
    }

    // Génère une URL signée courte par sacrifice.
    // - `url`         : lecture inline (<video>) — pas de Content-Disposition.
    // - `downloadUrl` : même URL + `&download=<nom>`. Le param `download` ne
    //   fait PAS partie du token signé : Supabase Storage répond alors avec
    //   `Content-Disposition: attachment`, ce qui force le téléchargement
    //   même en cross-origin (l'attribut HTML `download` est ignoré entre
    //   qurbaniya.fr et supabase.co).
    const videos: Array<{ niyyah: string; url: string; downloadUrl: string }> = [];
    let idx = 0;
    for (const it of items) {
      idx += 1;
      if (!it.videoPath) continue;
      const { data: signed, error: signError } = await supabase.storage
        .from("sacrifice-videos")
        .createSignedUrl(it.videoPath, SIGNED_URL_TTL_SECONDS);
      if (signError || !signed) {
        console.error("Signed URL failed:", it.videoPath, signError);
        return NextResponse.json(
          { status: "error", message: "Erreur lors de la préparation de la vidéo." },
          { status: 500 }
        );
      }
      const ext = (it.videoPath.split(".").pop() || "mp4").toLowerCase();
      const slug =
        (it.niyyah || order.prenom)
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "") // retire les accents
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .toLowerCase() || "sacrifice";
      const filename = `qurbaniya-${slug}${items.length > 1 ? `-${idx}` : ""}.${ext}`;
      const downloadUrl = `${signed.signedUrl}&download=${encodeURIComponent(filename)}`;
      videos.push({ niyyah: it.niyyah, url: signed.signedUrl, downloadUrl });
    }

    return NextResponse.json({
      status: "ready",
      prenom: order.prenom,
      reference: `QRB-2026-${order.id.replace(/-/g, "").slice(0, 8).toUpperCase()}`,
      videos,
    });
  } catch (e) {
    console.error("Video lookup error:", e instanceof Error ? e.message : "unknown");
    return NextResponse.json(
      { status: "error", message: "Erreur technique. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
