// ─── Système de parrainage — helpers client-safe ────────────────────
// Constantes + sanitize + helpers de partage. SANS dépendance Node.
// La génération du code (qui utilise node:crypto) vit dans
// `lib/referral-server.ts` pour ne PAS polluer les bundles client.

const CODE_LENGTH = 6;

export const REFERRAL_DISCOUNT_EUR = 15;
export const REFERRAL_DISCOUNT_CENTS = 1500;

// Montant de l'avoir parrain crédité pour la prochaine édition (Aïd 2027).
// Anciennement cashback de 15€ versé manuellement post-Aïd. Désormais un
// avoir de 20€ à utiliser sur la commande Aïd 2027 — moins de cash sortant
// et meilleure rétention.
export const REFERRER_REWARD_EUR = 20;

/**
 * Sanitize un code reçu en input. Accepte tout code alphanumérique 6 chars
 * uppercase. La validité d'un code est garantie par l'unicité DB, pas par
 * un alphabet restrictif côté sanitize.
 *
 * Note : les nouveaux codes que NOUS générons utilisent un alphabet non-
 * ambigu (cf. lib/referral-server.ts) pour limiter les erreurs de saisie.
 * Mais on doit accepter en lecture les codes existants — notamment ceux
 * issus du backfill SQL md5 qui contiennent 0/1.
 */
export function sanitizeReferralCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.toUpperCase().trim().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length !== CODE_LENGTH) return null;
  return cleaned;
}

/** URL de partage que le parrain peut envoyer. */
export function shareUrl(code: string, base = "https://qurbaniya.fr"): string {
  return `${base}/?ref=${code}`;
}

/** Message WhatsApp pré-rempli pour le partage. */
export function shareWhatsAppMessage(code: string, prenom?: string): string {
  const url = shareUrl(code);
  const intro = prenom
    ? `Salam ! J'ai commandé mon sacrifice de l'Aïd 2026 sur Qurbaniya — je te recommande, ils sont sérieux.`
    : `Salam ! Je te recommande Qurbaniya pour ton sacrifice de l'Aïd 2026, ils sont sérieux.`;
  return `${intro} Avec mon code, tu as -${REFERRAL_DISCOUNT_EUR}€ sur ta commande : ${url}`;
}

/** Sujet email pour partage. */
export function shareEmailSubject(): string {
  return `Mon code pour ton sacrifice de l'Aïd 2026 (-${REFERRAL_DISCOUNT_EUR}€)`;
}

/** Corps email pour partage. */
export function shareEmailBody(code: string, prenom?: string): string {
  const url = shareUrl(code);
  const sig = prenom ? `\n\n${prenom}` : "";
  return `Salam,

J'ai commandé mon sacrifice de l'Aïd al-Adha 2026 sur Qurbaniya — sacrifice conforme à la Sounnah à Madagascar, vidéo nominative envoyée par WhatsApp, distribution aux familles dans le besoin.

Si tu n'as pas encore commandé ton mouton, voici mon code : ${code}
Tu auras -${REFERRAL_DISCOUNT_EUR}€ sur ta commande en l'utilisant.

Lien direct : ${url}${sig}`;
}
