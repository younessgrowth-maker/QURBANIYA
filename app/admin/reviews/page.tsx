import { createServiceRoleClient } from "@/lib/supabase/server";
import { Star, MessageSquare, Clock, CheckCircle2, XCircle } from "lucide-react";
import ReviewModerationButtons from "@/components/admin/ReviewModerationButtons";

export const dynamic = "force-dynamic";

type Review = {
  id: string;
  prenom: string;
  ville: string | null;
  rating: number;
  text: string;
  email: string | null;
  year: number | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  approved_at: string | null;
};

async function fetchReviews(): Promise<Review[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
  return (data as Review[]) ?? [];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={n <= rating ? "text-gold fill-gold" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Review["status"] }) {
  const map = {
    pending: { label: "En attente", icon: Clock, cls: "bg-gold/10 text-gold border-gold/30" },
    approved: { label: "Approuvé", icon: CheckCircle2, cls: "bg-emerald/10 text-emerald border-emerald/30" },
    rejected: { label: "Rejeté", icon: XCircle, cls: "bg-urgency/10 text-urgency border-urgency/30" },
  } as const;
  const { label, icon: Icon, cls } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded border ${cls}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.created_at).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <StarRow rating={review.rating} />
          <span className="text-text-primary font-semibold text-sm">
            {review.prenom}
            {review.ville && <span className="text-text-muted font-normal"> · {review.ville}</span>}
            {review.year && <span className="text-text-muted-light font-normal"> · Aïd {review.year}</span>}
          </span>
        </div>
        <StatusBadge status={review.status} />
      </div>
      <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap">{review.text}</p>
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
        <div className="text-xs text-text-muted-light">
          {date}
          {review.email && <span> · {review.email}</span>}
        </div>
        <ReviewModerationButtons id={review.id} currentStatus={review.status} />
      </div>
    </div>
  );
}

export default async function AdminReviewsPage() {
  const reviews = await fetchReviews();
  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");
  const rejected = reviews.filter((r) => r.status === "rejected");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black uppercase text-text-primary flex items-center gap-2">
          <MessageSquare size={26} className="text-gold" />
          Modération des avis
        </h1>
        <p className="text-text-muted text-sm mt-1">
          {pending.length} en attente · {approved.length} approuvés · {rejected.length} rejetés
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-text-muted">
          Aucun avis pour le moment.
        </div>
      ) : (
        <div className="space-y-8">
          {pending.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                <Clock size={14} className="text-gold" />
                En attente ({pending.length})
              </h2>
              <div className="space-y-3">
                {pending.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            </section>
          )}

          {approved.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald" />
                Approuvés ({approved.length})
              </h2>
              <div className="space-y-3">
                {approved.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            </section>
          )}

          {rejected.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                <XCircle size={14} className="text-urgency" />
                Rejetés ({rejected.length})
              </h2>
              <div className="space-y-3">
                {rejected.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
