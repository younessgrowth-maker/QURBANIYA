import { Star, Quote, ArrowRight } from "lucide-react";
import { createServiceRoleClient } from "@/lib/supabase/server";
import SectionTitle from "@/components/ui/SectionTitle";

const MAX_DISPLAY = 6;
const MIN_TO_SHOW_SECTION = 3;

type ApprovedReview = {
  id: string;
  prenom: string;
  ville: string | null;
  rating: number;
  text: string;
  year: number | null;
  approved_at: string | null;
};

async function fetchApprovedReviews(): Promise<ApprovedReview[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, prenom, ville, rating, text, year, approved_at")
    .eq("status", "approved")
    .order("approved_at", { ascending: false })
    .limit(MAX_DISPLAY);
  if (error) {
    console.error("Failed to fetch approved reviews:", error);
    return [];
  }
  return (data as ApprovedReview[]) ?? [];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5 étoiles`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          className={n <= rating ? "text-gold fill-gold" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ApprovedReview }) {
  const meta = [review.ville, review.year ? `Aïd ${review.year}` : null]
    .filter(Boolean)
    .join(" · ");
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gold/30 hover:shadow-soft transition-all flex flex-col h-full">
      <Quote size={20} className="text-gold/40 mb-3" />
      <p className="text-text-primary text-sm md:text-base leading-relaxed mb-5 flex-1 italic">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-text-primary font-semibold text-sm">{review.prenom}</p>
          {meta && <p className="text-text-muted-light text-xs mt-0.5">{meta}</p>}
        </div>
        <StarRow rating={review.rating} />
      </div>
    </div>
  );
}

export default async function RealTestimonials() {
  const reviews = await fetchApprovedReviews();
  if (reviews.length < MIN_TO_SHOW_SECTION) return null;

  return (
    <section className="bg-bg-secondary section-padding" id="avis-clients">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="CE QUE DISENT LES FAMILLES"
          accent="LES FAMILLES"
          subtitle="Témoignages vérifiés de clients qui nous ont confié leur sacrifice"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/avis"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors"
          >
            Voir tous les avis ou laisser le vôtre
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
