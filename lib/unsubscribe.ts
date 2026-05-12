// ─── Helpers désinscription email ───────────────────────────────────
// HMAC token = signature de l'email + secret côté serveur. Sans ce
// secret, un attaquant ne peut pas générer de token valide pour
// désinscrire arbitrairement quelqu'un d'autre.
//
// Le secret vit dans UNSUBSCRIBE_SECRET (env var Vercel). Si absent,
// fallback sur RESEND_API_KEY pour rester fonctionnel — au pire un
// attaquant ayant ce secret peut désinscrire des clients, ce qui n'est
// pas critique (il peuvent se ré-inscrire).

import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret(): string {
  return (
    process.env.UNSUBSCRIBE_SECRET ??
    process.env.RESEND_API_KEY ??
    "qrb-fallback-2026"
  );
}

/** Signe un email avec HMAC SHA-256 tronqué à 16 hex chars. */
export function signEmail(email: string): string {
  const h = createHmac("sha256", getSecret());
  h.update(email.toLowerCase().trim());
  return h.digest("hex").slice(0, 16);
}

/** Vérifie qu'un token HMAC correspond à l'email. */
export function verifyEmailToken(email: string, token: string): boolean {
  if (!email || !token) return false;
  const expected = signEmail(email);
  if (expected.length !== token.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  } catch {
    return false;
  }
}

/** URL d'unsubscribe (one-click POST + visite navigateur). */
export function unsubscribeUrl(email: string, base = "https://qurbaniya.fr"): string {
  const token = signEmail(email);
  return `${base}/api/unsubscribe?email=${encodeURIComponent(email)}&t=${token}`;
}

/** Headers RFC 2369 + RFC 8058 (one-click). À mettre dans chaque email. */
export function unsubscribeHeaders(email: string): Record<string, string> {
  const url = unsubscribeUrl(email);
  return {
    "List-Unsubscribe": `<mailto:unsubscribe@qurbaniya.fr?subject=unsubscribe>, <${url}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}
