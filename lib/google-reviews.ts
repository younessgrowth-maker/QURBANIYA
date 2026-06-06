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
// Note moyenne actuelle : 5.0 / 5 sur 33 avis (au 6 juin 2026).

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
  // ─── Avis collectés le 6 juin 2026 (Aïd 2026) ───
  {
    author: "Kamil Rais",
    rating: 5,
    text: "",
    relativeDate: "il y a 3 jours",
    postedAt: "2026-06-03T15:00:00Z",
  },
  {
    author: "Oum Ibnati",
    rating: 5,
    text: "Parfait, barakAllahou fikoum. Nous avons reçu la vidéo, tout est carré. N'hésitez pas à leur confier votre sacrifice de l'Aïd el-Adha, ils sont dignes de confiance. Allahuma barek.",
    relativeDate: "il y a 3 jours",
    postedAt: "2026-06-03T14:40:00Z",
    featured: true,
  },
  {
    author: "Juba kabir",
    rating: 5,
    text: "",
    relativeDate: "il y a 3 jours",
    postedAt: "2026-06-03T14:20:00Z",
  },
  {
    author: "Zakaria R.",
    rating: 5,
    text: "",
    relativeDate: "il y a 3 jours",
    postedAt: "2026-06-03T14:00:00Z",
  },
  {
    author: "Saida Michbal",
    rating: 5,
    text: "Nous avons effectué notre don de l'Aïd via Qurbaniya et nous sommes très satisfaits de notre expérience.",
    relativeDate: "il y a 3 jours",
    postedAt: "2026-06-03T13:40:00Z",
    featured: true,
  },
  {
    author: "Yf Mono",
    rating: 5,
    text: "Service sérieux et impeccable.",
    relativeDate: "il y a 3 jours",
    postedAt: "2026-06-03T13:20:00Z",
  },
  {
    author: "Davit Bokuchava",
    rating: 5,
    text: "",
    relativeDate: "il y a 3 jours",
    postedAt: "2026-06-03T13:00:00Z",
  },
  {
    author: "teffahi ali",
    rating: 5,
    text: "Salam aleykoum, Barakallah oufikum. Pour l'Aïd 2026, bonne organisation.",
    relativeDate: "il y a 4 jours",
    postedAt: "2026-06-02T12:00:00Z",
  },
  {
    author: "Mohamed Mrabet",
    rating: 5,
    text: "Bonjour, je tiens à vous remercier pour l'organisation de la Qurbaniya et pour la vidéo que vous m'avez envoyée.",
    relativeDate: "il y a 4 jours",
    postedAt: "2026-06-02T11:00:00Z",
    featured: true,
  },
  {
    author: "Abdelhamid Ouhda",
    rating: 5,
    text: "",
    relativeDate: "il y a 5 jours",
    postedAt: "2026-06-01T12:00:00Z",
  },
  {
    author: "laieb noura",
    rating: 5,
    text: "",
    relativeDate: "il y a 5 jours",
    postedAt: "2026-06-01T11:00:00Z",
  },
  {
    author: "chady ahamudally",
    rating: 5,
    text: "Très satisfait de ce sacrifice avec preuve à l'appui (vidéo).",
    relativeDate: "il y a 5 jours",
    postedAt: "2026-06-01T10:00:00Z",
  },
  {
    author: "Fethia Medjahri",
    rating: 5,
    text: "",
    relativeDate: "il y a 6 jours",
    postedAt: "2026-05-31T12:00:00Z",
  },
  {
    author: "hadjameur hadjameur",
    rating: 5,
    text: "Rien à dire, tout a été très bien fait, hamdoulah.",
    relativeDate: "il y a 6 jours",
    postedAt: "2026-05-31T11:00:00Z",
  },
  {
    author: "fadoua Doujjani",
    rating: 5,
    text: "Très heureuse de ce retour, sérieux et honnête ! Je recommande, je suis ravie, je reviendrai l'année prochaine inchallah 🤲🏻",
    relativeDate: "il y a 6 jours",
    postedAt: "2026-05-31T10:00:00Z",
    featured: true,
  },

  // ─── Avis collectés le 30 mai 2026 (Aïd 2026) ───
  {
    author: "Loic Coachpro",
    rating: 5,
    text: "100% confiance, vidéo reçu comme preuve du sacrifice, je recommande.",
    relativeDate: "il y a 6 jours",
    postedAt: "2026-05-30T12:30:00Z",
  },
  {
    author: "Moustapha Tall",
    authorMeta: "Local Guide · 58 avis",
    rating: 5,
    text: "",
    relativeDate: "il y a 6 jours",
    postedAt: "2026-05-30T12:20:00Z",
  },
  {
    author: "A. Bahloul",
    authorMeta: "4 avis · 3 photos",
    rating: 5,
    text: "Merci à Qurbaniya pour leur investissement et leur travail remarquable.",
    relativeDate: "il y a 6 jours",
    postedAt: "2026-05-30T11:40:00Z",
  },
  {
    author: "Fidar Des",
    authorMeta: "Local Guide · 25 avis",
    rating: 5,
    text: "Sacrifice fait par leur soin. Je recommande, fait dans les règles wa el hamdoulilah, qu'Allah les préserve. J'ai bien la vidéo nominative 👍👍",
    relativeDate: "il y a 3 jours",
    postedAt: "2026-05-30T11:30:00Z",
    featured: true,
  },
  {
    author: "Marie Soifeini",
    rating: 5,
    text: "Très belle expérience pour ma première année. Le sacrifice a été réalisé avec beaucoup de sérieux et de professionnalisme. Tout était bien transparent et organisé selon la Sunna. Nous avons apprécié le suivi et la qualité du service. Merci beaucoup, je recommande sans hésitation. À l'année in sha Allah.",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-29T14:00:00Z",
    featured: true,
  },
  {
    author: "حكيم ابو مروان",
    authorMeta: "1 avis",
    rating: 5,
    text: "J'ai délégué mon sacrifice de l'Aïd à Qurbaniya et je suis très satisfait de la transparence et du sérieux de toute l'équipe ! La vidéo nominative du sacrifice a été envoyée dans les délais et tout au long du processus il y a eu un excellent suivi ! Je recommande à quiconque veut déléguer son sacrifice de l'Aïd. جزاهم الله خيرا",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-28T16:00:00Z",
    featured: true,
  },
  {
    author: "Sayed",
    authorMeta: "5 avis",
    rating: 5,
    text: "Excellent service, efficace. Tout est clair.",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-28T14:00:00Z",
  },
  {
    author: "ben hassine bilel",
    authorMeta: "Local Guide · 21 avis",
    rating: 5,
    text: "Très professionnel, très honnête, je recommande.",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-28T12:00:00Z",
  },
  {
    author: "Jamal Douich",
    authorMeta: "1 avis",
    rating: 5,
    text: "Très bonne expérience avec l'association Qurbaniya. Organisation sérieuse et professionnelle pour le sacrifice du mouton. L'équipe est réactive, respectueuse et transparente tout au long du processus. Nous avons reçu des informations et un suivi rassurant. Merci à toute l'équipe de Qurbaniya pour leur sérieux et leur engagement. Je recommande cette association sans hésitation.",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-28T11:00:00Z",
    featured: true,
  },
  {
    author: "FAICAL HADDAD",
    authorMeta: "5 avis",
    rating: 5,
    text: "",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-28T09:00:00Z",
  },
  {
    author: "Sonia Hamroun",
    authorMeta: "Local Guide · 19 avis",
    rating: 5,
    text: "Service sérieux, professionnel et très respectueux du sens du sacrifice de l'Aïd. Tout s'est très bien passé du début à la fin, avec une excellente communication et beaucoup de bienveillance. Qu'Allah mette la baraka dans votre travail et vous récompense pour ce que vous faites pour la communauté musulmane. Je recommande Qurbaniya les yeux fermés. Merci encore et Aïd Moubarak à toute l'équipe.",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-27T18:00:00Z",
    featured: true,
  },
  {
    author: "dembi fred",
    authorMeta: "Local Guide · 14 avis · 1 photo",
    rating: 5,
    text: "Service au top, merci à toute l'équipe d'avoir effectué mon sacrifice. Famille Dembi.",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-27T16:00:00Z",
  },
  {
    author: "Yuliia",
    authorMeta: "2 avis",
    rating: 5,
    text: "Je remercie votre organisation pour son aide dans cette œuvre si noble, In chaa Allah. Des larmes de joie et de bonheur coulent de mes yeux ! Je vous remercie pour cette aide ! Et qu'Allah accepte cela de vous et de nous !",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-27T14:00:00Z",
    featured: true,
  },
  {
    author: "Naj",
    authorMeta: "2 avis",
    rating: 5,
    text: "Vidéo reçue le jour de l'Aïd, merci à vous…",
    relativeDate: "il y a une semaine",
    postedAt: "2026-05-27T12:00:00Z",
  },
  {
    author: "Chamouini CHAMSOUDDIN",
    authorMeta: "Mosquée de Massy",
    rating: 5,
    text: "Votre sacrifice avec toute confiance en respectant les rites islamiques. 5 ans d'expérience. Masha Allah.",
    relativeDate: "il y a 4 semaines",
    postedAt: "2026-05-09T00:00:00Z",
    featured: true,
  },
  {
    author: "FID FAR",
    authorMeta: "1 avis",
    rating: 5,
    text: "L'Aïd de l'année 2025, c'était ma première expérience avec Qurbaniya. Ça s'est bien passé : j'ai reçu la vidéo la matinée du jour de la fête. Mon nom et prénom ont été bien prononcés lors de l'égorgement du mouton.",
    relativeDate: "il y a 4 semaines",
    postedAt: "2026-05-09T00:00:00Z",
    featured: true,
  },
  {
    author: "Youssef M.",
    authorMeta: "5 avis · 1 photo",
    rating: 5,
    text: "J'ai sollicité ce service l'an dernier et rien à dire : c'est efficace, sérieux et rassurant. J'ai reçu ma preuve dans un délai irréprochable, ce qui m'a vraiment mis en confiance. Je recommande Qurbaniya à ceux qui souhaitent déléguer leur sacrifice de l'Aïd simplement et sereinement.",
    relativeDate: "il y a un mois",
    postedAt: "2026-05-09T00:00:00Z",
    featured: true,
  },
  {
    author: "Youness",
    authorMeta: "1 avis",
    rating: 5,
    text: "",
    relativeDate: "il y a 4 semaines",
    postedAt: "2026-05-09T00:00:00Z",
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
