import { Star, ExternalLink, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  GOOGLE_REVIEWS_URL,
  getAverageRating,
  getFeaturedReviews,
  getTotalReviews,
} from "@/lib/google-reviews";
import type { GoogleReview } from "@/lib/google-reviews";

// Section "Avis Google" affichée sur la home avant `RealTestimonials`.
//
// Source : avis statiques en `lib/google-reviews.ts` collectés manuellement
// depuis la fiche Google Business Profile. On a délibérément évité l'API
// Places (limite 5 avis, billing requis, contrôle nul sur les avis
// affichés). Le coût est ~30 sec de copier-coller par nouvel avis qui
// arrive — acceptable vu le volume actuel.
//
// Hiérarchie visuelle :
//   - Header : score moyen XXL + badge Google + nombre d'avis
//   - Grille de 6 avis featured (mosquée, longs, émotionnels)
//   - 2 CTAs : "Voir tous nos avis Google" (out-link) + "Laisser un avis"
//     (out-link review form Google)

function GoogleLogo({ size = 18 }: { size?: number }) {
  // Logo Google officiel multicolore (SVG inline pour pas devoir embarquer
  // un asset + bénéficie du tree-shake).
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-1.9 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C40.6 35.7 44 30.3 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function Avatar({ author }: { author: string }) {
  // Avatar avec initiale + couleur déterministe basée sur le nom.
  // Reproduit le style Google par défaut.
  const initial = author.trim().charAt(0).toUpperCase();
  const colors = [
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
    "bg-orange-100 text-orange-700",
  ];
  const hash = author.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const colorClass = colors[hash % colors.length];
  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${colorClass}`}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5 étoiles`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= rating ? "text-gold fill-gold" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 hover:border-gold/30 hover:shadow-soft transition-all flex flex-col h-full">
      <div className="flex items-start gap-3 mb-3">
        <Avatar author={review.author} />
        <div className="flex-1 min-w-0">
          <p className="text-text-primary font-semibold text-sm leading-tight">
            {review.author}
          </p>
          {review.authorMeta && (
            <p className="text-text-muted-light text-xs mt-0.5 truncate">
              {review.authorMeta}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          <GoogleLogo size={16} />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <StarRow rating={review.rating} />
        <span className="text-text-muted-light text-xs">{review.relativeDate}</span>
      </div>
      <p className="text-text-primary text-sm leading-relaxed flex-1">
        {review.text}
      </p>
    </div>
  );
}

export default function GoogleReviews() {
  const featured = getFeaturedReviews();
  const total = getTotalReviews();
  const avg = getAverageRating();
  if (featured.length === 0) return null;

  return (
    <section className="bg-bg-secondary section-padding" id="avis-google">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="AVIS VÉRIFIÉS DE NOS CLIENTS"
          accent="VÉRIFIÉS"
          subtitle="Toutes les voix de la communauté qui nous a fait confiance"
        />

        {/* Header agregé : note moyenne + total + badge Google */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-8 shadow-soft">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
            {/* Bloc note moyenne */}
            <div className="flex flex-col items-center md:items-start md:border-r md:border-gray-200 md:pr-10">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl md:text-6xl font-black text-text-primary leading-none">
                  {avg.toFixed(1)}
                </span>
                <span className="text-text-muted-light text-lg pb-1">/ 5</span>
              </div>
              <StarRow rating={Math.round(avg)} size={18} />
              <p className="text-text-muted text-sm mt-2">
                {total} avis vérifiés
              </p>
            </div>

            {/* Bloc badge Google + tagline */}
            <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-tertiary border border-gray-200 mb-3">
                <GoogleLogo size={16} />
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wide">
                  Avis Google
                </span>
              </div>
              <p className="text-text-primary text-base md:text-lg leading-relaxed max-w-md">
                Chaque avis ci-dessous provient d&apos;une personne ayant
                réellement utilisé notre service et publié son retour sur
                notre fiche Google publique.
              </p>
            </div>
          </div>
        </div>

        {/* Grille des avis featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {featured.map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} review={r} />
          ))}
        </div>

        {/* CTAs : voir tous + laisser un avis */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-gold/40 text-text-primary font-semibold px-5 py-3 rounded-xl transition-colors"
          >
            <GoogleLogo size={16} />
            Voir tous nos avis Google
            <ExternalLink size={14} className="text-text-muted-light" />
          </a>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold px-5 py-3 rounded-xl transition-colors"
          >
            Laisser un avis
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
