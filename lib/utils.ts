import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

// Référence client lisible : QRB-2026-<8 hex du uuid>. 8 caractères ≈
// 4,3 milliards de combinaisons → non énumérable sur une page publique
// (recherche vidéo par email + numéro). Avant 2026-06 : 4 caractères ;
// les confirmations déjà envoyées avec un ref à 4 car. restent reconnues
// par parseOrderReference (préfixe du même uuid).
export function orderRef(orderId: string): string {
  return `QRB-2026-${orderId.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

/**
 * Normalise une référence saisie librement par un client en préfixe hex du
 * uuid de commande. Tolère « QRB-2026-ABCD1234 », « qrb2026abcd1234 »,
 * « ABCD1234 », espaces et tirets. Retourne le préfixe en minuscule (8 car.
 * = format courant, 4 car. = legacy confirmations < 2026-06) pour matcher
 * `order.id`, ou null si la saisie est inexploitable.
 */
export function parseOrderReference(input: string | null | undefined): string | null {
  if (!input) return null;
  const cleaned = input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  const code = cleaned.replace(/^QRB\d{0,4}/, "");
  if (/^[0-9A-F]{8}/.test(code)) return code.slice(0, 8).toLowerCase();
  if (/^[0-9A-F]{4}$/.test(code)) return code.toLowerCase();
  return null;
}

/**
 * Échappe les métacaractères LIKE/ILIKE (`%`, `_`, `\`) — légaux dans un
 * email ou une saisie utilisateur — avant de les passer à un filtre
 * `.ilike()` Supabase, pour éviter un sur-matching (ex: `a_b@x.com` qui
 * matcherait `aXb@x.com`).
 */
export function escapeLike(input: string): string {
  return input.replace(/[\\%_]/g, "\\$&");
}
