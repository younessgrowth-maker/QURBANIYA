import { Check, Clock, Package, ShoppingBag, Video, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStep, OrderStepId } from "@/lib/order-status";

// Composant présentationnel pur (aucun hook) → utilisable côté serveur
// (page /ma-commande) comme côté client (recherche /ma-video).

const STEP_ICONS: Record<OrderStepId, typeof Check> = {
  received: ShoppingBag,
  paid: Check,
  sacrifice: Calendar,
  video: Video,
};

function formatDateFr(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderTimeline({
  steps,
  title = "Suivi du sacrifice",
}: {
  steps: OrderStep[];
  title?: string;
}) {
  return (
    <section className="bg-white border border-gray-100/80 rounded-card p-5 md:p-8 shadow-soft">
      <h2 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
        <Package size={18} className="text-gold" />
        {title}
      </h2>
      <ol className="relative">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const Icon = STEP_ICONS[step.id];
          return (
            <li key={step.id} className="flex gap-4 pb-6 last:pb-0 relative">
              {/* Ligne verticale entre les étapes */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-[19px] top-10 w-0.5 h-full -z-0",
                    step.status === "done" ? "bg-emerald" : "bg-gray-200"
                  )}
                  aria-hidden="true"
                />
              )}
              {/* Bulle */}
              <div
                className={cn(
                  "relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2",
                  step.status === "done" && "bg-emerald border-emerald text-white",
                  step.status === "current" && "bg-gold/15 border-gold text-gold animate-pulse",
                  step.status === "pending" && "bg-bg-tertiary border-gray-200 text-text-muted-light"
                )}
              >
                {step.status === "done" ? (
                  <Check size={18} strokeWidth={3} />
                ) : step.status === "current" ? (
                  <Clock size={16} />
                ) : (
                  <Icon size={16} />
                )}
              </div>
              {/* Texte */}
              <div className="flex-1 pt-1.5">
                <p
                  className={cn(
                    "font-bold mb-0.5",
                    step.status === "done"
                      ? "text-text-primary"
                      : step.status === "current"
                        ? "text-gold"
                        : "text-text-muted"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
                {step.doneAt && step.status === "done" && (
                  <p className="text-xs text-text-muted-light mt-1 font-inter">
                    {formatDateFr(step.doneAt)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
