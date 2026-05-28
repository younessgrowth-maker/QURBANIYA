// Avis Google Business Profile (Qurbaniya) — collecte manuelle.
//
// On garde l'approche statique plutôt que Google Places API parce que :
//   1) Places API limite à 5 avis affichés (vs. tous ici)
//   2) Pas besoin d'API key ni quota
//   3) Texte indexable par Google = bonus SEO
//   4) On peut mettre en avant les "trophées" (Cheikh Massy, Sonia, etc.)
//   5) Pas de risque de breaking API
//
// Mise à jour manuelle quand un nouvel avis arrive sur GBP (= 30 sec via PR).
//
// Source URL : https://g.page/r/CQT3MFQZ9CcfEBM/review
// Note moyenne actuelle : 5.0 / 5 sur 10 avis (au 27 mai 2026).

export interface GoogleReview {
  author: string;
  /** Badge optionnel sous le nom (ex: "Mosquée de Massy", "Local Guide", "5 avis · 1 photo"). */
  authorMeta?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Texte brut de l'avis. */
  text: string;
  /** Date relative à afficher (ex: "il y a 15 heures", "il y a 3 semaines"). */
  relativeDate: string;
  /** Pour ordonner — récent en premier. Format ISO. */
  postedAt: string;
  /**
   * Mise en avant en grille principale (sinon visible uniquement via "voir
   * tous les avis"). On surface en priorité les avis longs/qualitatifs +
   * les badges d'autorité (Mosquée, Local Guide).
   */
  featured?: boolean;
}

export const GOOGLE_REVIEWS_URL = "https://g.page/r/CQT3MFQZ9CcfEBM/review";

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: "Chamouini CHAMSOUDDIN",
    authorMeta: "Mosquée de Massy",
    rating: 5,
    text: "Votre sacrifice avec toute confiance en respectant les rites islamiques. 5 ans d'expérience. Masha Allah.",
    relativeDate: "il y a 2 semaines",
    postedAt: "2026-05-13T00:00:00Z",
    featured: true,
  },
  {
    author: "Sonia Hamroun",
    authorMeta: "18 avis",
    rating: 5,
    text: "Service sérieux, professionnel et très respectueux du sens du sacrifice de l'Aïd. Tout s'est très bien passé du début à la fin, avec une excellente communication et beaucoup de bienveillance. Qu'Allah mette la baraka dans votre travail et vous récompense pour ce que vous faites pour la communauté musulmane. Je recommande Qurbaniya les yeux fermés. Merci encore et Aïd Moubarak à toute l'équipe.",
    relativeDate: "il y a 18 heures",
    postedAt: "2026-05-26T20:00:00Z",
    featured: true,
  },
  {
    author: "Jamal Douich",
    rating: 5,
    text: "Très bonne expérience avec l'association Qurbaniya. Organisation sérieuse et professionnelle pour le sacrifice du mouton. L'équipe est réactive, respectueuse et transparente tout au long du processus. Nous avons reçu des informations et un suivi rassurant. Merci à toute l'équipe de Qurbaniya pour leur sérieux et leur engagement. Je recommande cette association sans hésitation.",
    relativeDate: "il y a 15 heures",
    postedAt: "2026-05-26T23:00:00Z",
    featured: true,
  },
  {
    author: "Yuliia",
    rating: 5,
    text: "Je remercie votre organisation pour son aide dans cette œuvre si noble, In chaa Allah. Des larmes de joie et de bonheur coulent de mes yeux ! Je vous remercie pour cette aide ! Et qu'Allah accepte cela de vous et de nous !",
    relativeDate: "il y a 19 heures",
    postedAt: "2026-05-26T19:00:00Z",
    featured: true,
  },
  {
    author: "Youssef M.",
    authorMeta: "5 avis · 1 photo",
    rating: 5,
    text: "J'ai sollicité ce service l'an dernier et rien à dire : c'est efficace, sérieux et rassurant. J'ai reçu ma preuve dans un délai irréprochable, ce qui m'a vraiment mis en confiance. Je recommande Qurbaniya à ceux qui souhaitent déléguer leur sacrifice de l'Aïd simplement et sereinement.",
    relativeDate: "il y a 3 semaines",
    postedAt: "2026-05-06T00:00:00Z",
    featured: true,
  },
  {
    author: "FID FAR",
    rating: 5,
    text: "L'aid de l'année 2025 c'était ma première expérience avec Qurbaniya. Ça c'est bien passé : j'ai reçu la vidéo la matinée du jour de la fête. Mon nom et prénom ont été bien prononcés lors de l'égorgement du mouton.",
    relativeDate: "il y a 2 semaines",
    postedAt: "2026-05-13T00:00:00Z",
    featured: true,
  },
  {
    author: "dembi fred",
    authorMeta: "Local Guide · 13 avis",
    rating: 5,
    text: "Service au top merci à toute l'équipe d'avoir effectué mon Sacrifice. Famille Dembi",
    relativeDate: "il y a 18 heures",
    postedAt: "2026-05-26T20:00:00Z",
  },
  {
    author: "Naj",
    rating: 5,
    text: "Vidéo reçu le jour de l'Aïd merci à vous…",
    relativeDate: "il y a 20 heures",
    postedAt: "2026-05-26T18:00:00Z",
  },
  {
    author: "FAICAL HADDAD",
    authorMeta: "5 avis",
    rating: 5,
    text: "",
    relativeDate: "il y a 17 heures",
    postedAt: "2026-05-26T21:00:00Z",
  },
  {
    author: "Youness",
    rating: 5,
    text: "",
    relativeDate: "il y a 3 semaines",
    postedAt: "2026-05-06T00:00:00Z",
  },
];

// ─── Helpers d'agrégation ─────────────────────────────────────────────────

export function getAverageRating(): number {
  if (GOOGLE_REVIEWS.length === 0) return 0;
  const sum = GOOGLE_REVIEWS.reduce((acc, r) => acc + r.rating, 0);
  return sum / GOOGLE_REVIEWS.length;
}

export function getTotalReviews(): number {
  return GOOGLE_REVIEWS.length;
}

export function getFeaturedReviews(): GoogleReview[] {
  return GOOGLE_REVIEWS.filter((r) => r.featured);
}

export function getReviewsWithText(): GoogleReview[] {
  return GOOGLE_REVIEWS.filter((r) => r.text.trim() !== "");
}
