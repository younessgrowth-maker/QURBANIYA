// ─── Système d'affiliation (partenaires) — helpers client-safe ──────
// Distinct du parrainage client (lib/referral.ts) :
//  - Partenaires approuvés uniquement
//  - Pas de réduction client
//  - Commission FIXE par vente, tracée puis versée MANUELLEMENT par
//    l'admin (le système ne verse jamais d'argent automatiquement)

// Commission par défaut versée au partenaire par vente attribuée.
// Surchargeable par affilié en base (colonne affiliates.commission_eur).
export const AFFILIATE_COMMISSION_EUR = 20;

// Codes affiliés : lisibles (donnés à des partenaires connus), donc plus
// permissif que les codes parrain 6-chars. Lettres/chiffres/tirets,
// 3 à 24 caractères, uppercase. La validité réelle est garantie par la
// table `affiliates` (approved = true), PAS par ce sanitize.
const AFFILIATE_CODE_RE = /^[A-Z0-9-]{3,24}$/;

export function sanitizeAffiliateCode(
  raw: string | null | undefined
): string | null {
  if (!raw) return null;
  const cleaned = raw.toUpperCase().trim().replace(/[^A-Z0-9-]/g, "");
  if (!AFFILIATE_CODE_RE.test(cleaned)) return null;
  return cleaned;
}
