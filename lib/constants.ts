// ─── Impact per sheep (source : Cheikh Omar, mars 2026) ───
export const MEALS_PER_SHEEP = 30;
export const FAMILIES_PER_SHEEP = 5;

// ─── Pricing ───
export const PRICE_AMOUNT = 140;
export const PRICE_DISPLAY = "140€";
export const PRICE_CENTS = 14000; // Stripe amount in cents

// ─── Historical stats (source of truth) ───
export const STATS = {
  sacrificesCompleted: 300,
  mealsDistributed: 9000,   // 300 × MEALS_PER_SHEEP
  familiesFed: 1500,        // 300 × FAMILIES_PER_SHEEP
  rating: 4.8,
  yearsExperience: 5,
  satisfactionRate: 100,
} as const;

// ─── Dates ───
export const AID_DATE = new Date("2026-05-27T06:00:00+01:00");
export const AID_YEAR = "2026";
export const CURRENT_YEAR = 2026;

// ─── Contact ───
export const WHATSAPP_NUMBER = "33744798883";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Salam, j'ai une question concernant le sacrifice de l'Aïd 2026";
export const whatsappUrl = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// ─── Urgency message public (basé sur la vraie date de l'Aïd) ────────────
// Retourne un message d'urgence qui évolue naturellement à mesure que
// l'Aïd approche. Aucun chiffre inventé — la pression temporelle vient
// uniquement de la date réelle (27 mai 2026). Tous les visiteurs voient
// le même message à une date donnée.
//
// Niveaux :
//   > 60j     → tier "low"      — on mentionne la date, invite à anticiper
//   31-60j    → tier "medium"   — signaler que l'Aïd approche
//   15-30j    → tier "high"     — "derniers jours pour réserver"
//    8-14j    → tier "high"     — "dernière semaine"
//    1-7j     → tier "critical" — "dernières réservations"
//   ≤ 0j      → tier "closed"   — "réservations clôturées"
// ─────────────────────────────────────────────────────────────────────────
export type UrgencyTier = "low" | "medium" | "high" | "critical" | "closed";

export interface UrgencyMessage {
  tier: UrgencyTier;
  daysUntilAid: number;
  short: string; // badge / compteur / sticky bar (max ~40 chars)
  long: string;  // exit popup / section offer (1 phrase complète)
}

export function getUrgencyMessage(now: Date = new Date()): UrgencyMessage {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const aid = new Date(AID_DATE);
  aid.setHours(0, 0, 0, 0);
  const daysUntilAid = Math.max(
    0,
    Math.round((aid.getTime() - today.getTime()) / 86_400_000)
  );

  if (daysUntilAid <= 0) {
    return {
      tier: "closed",
      daysUntilAid: 0,
      short: "Réservations clôturées",
      long:
        "Les réservations pour l'Aïd al-Adha sont clôturées. Inscrivez-vous pour être averti de l'ouverture de l'édition suivante.",
    };
  }
  if (daysUntilAid <= 7) {
    return {
      tier: "critical",
      daysUntilAid,
      short: `Dernière ligne droite · ${daysUntilAid}j`,
      long:
        "Les dernières réservations ferment dans les prochains jours — ne tardez pas pour accomplir votre sacrifice en toute sérénité.",
    };
  }
  if (daysUntilAid <= 14) {
    return {
      tier: "high",
      daysUntilAid,
      short: `Dernière semaine · ${daysUntilAid}j`,
      long:
        "Il vous reste moins de deux semaines pour réserver — sécurisez votre sacrifice avant la clôture.",
    };
  }
  if (daysUntilAid <= 30) {
    return {
      tier: "high",
      daysUntilAid,
      short: `Plus que ${daysUntilAid} jours avant l'Aïd`,
      long:
        "L'Aïd approche : réservez dès maintenant pour garantir votre sacrifice et recevoir votre preuve vidéo le jour J.",
    };
  }
  if (daysUntilAid <= 60) {
    return {
      tier: "medium",
      daysUntilAid,
      short: `Aïd dans ${daysUntilAid} jours · Réservez`,
      long:
        "L'Aïd approche — les places partent rapidement chaque semaine. Anticipez votre sacrifice pour éviter la dernière minute.",
    };
  }
  return {
    tier: "low",
    daysUntilAid,
    short: "Aïd al-Adha · 27 mai 2026",
    long:
      "Anticipez votre sacrifice de l'Aïd al-Adha 2026 : réservez dès maintenant et confiez-nous l'essentiel en toute sérénité.",
  };
}
