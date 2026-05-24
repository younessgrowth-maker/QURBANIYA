import { Star, Quote } from "lucide-react";
import { createServiceRoleClient } from "@/lib/supabase/server";

// Bandeau "Ils nous ont fait confiance" à afficher juste au-dessus du tunnel
// /commander, en complément de l'OrderForm. Objectif : booster la conversion
// du trafic chaud arrivant à J-3/J-2 par preuve sociale immédiate.
//
// Affichage : 3 avis vérifiés (status='approved') les plus récents, format
// horizontal compact (1 colonne mobile, 3 colonnes desktop). Pas de section
// title — c'est un "trust strip", pas une section dédiée.
//
// Render null si moins de 3 avis approuvés (on évite le visuel cassé "1 seul
// avis perdu").

type Review = {
  id: string;
  prenom: string;
  ville: string | null;
  rating: number;
  text: string;
  year: number | null;
};

const TRUST_STRIP_COUNT = 3;
const TEXT_MAX_CHARS = 160; // Évite que des avis très longs cassent le layout

async function fetchTopReviews(): Promise<Review[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, prenom, ville, rating, text, year")
    .eq("status", "approved")
    .gte("rating", 4) // n'affiche que les meilleurs sur le tunnel — pas de 3⭐
    .order("approved_at", { ascending: false })
    .limit(TRUST_STRIP_COUNT);
  if (error) {
    console.error("CommanderTrustStrip: fetch reviews failed", error);
    return [];
  }
  return (data as Review[]) ?? [];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5 étoiles`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={12}
          className={n <= rating ? "text-gold fill-gold" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  // On coupe au dernier espace pour éviter une césure brutale au milieu d'un mot.
  const sliced = text.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced) + "…";
}

export default async function CommanderTrustStrip() {
  const reviews = await fetchTopReviews();
  if (reviews.length < TRUST_STRIP_COUNT) return null;

  return (
    <section
      aria-label="Ils nous ont fait confiance"
      className="mb-8 max-w-5xl mx-auto"
    >
      <p className="text-center text-text-muted-light text-xs uppercase tracking-widest font-semibold mb-4">
        Ils nous ont fait confiance pour leur sacrifice
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {reviews.map((r) => {
          const meta = [r.ville, r.year ? `Aïd ${r.year}` : null].filter(Boolean).join(" · ");
          return (
            <div
              key={r.id}
              className="bg-white rounded-lg border border-gray-100 p-4 flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <Quote size={14} className="text-gold/40" />
                <StarRow rating={r.rating} />
              </div>
              <p className="text-text-primary text-xs md:text-[13px] leading-relaxed italic flex-1">
                &ldquo;{truncate(r.text, TEXT_MAX_CHARS)}&rdquo;
              </p>
              <div className="border-t border-gray-100 mt-3 pt-2 text-xs">
                <span className="text-text-primary font-semibold">{r.prenom}</span>
                {meta && (
                  <span className="text-text-muted-light"> · {meta}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
