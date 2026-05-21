import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { getInventory } from "@/lib/supabase/queries";
import { CURRENT_YEAR } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface InventoryStatusProps {
  variant?: "banner" | "compact";
  showCta?: boolean;
  className?: string;
}

// Bandeau temps réel "X places restantes sur Y" basé sur la table inventory
// Supabase. Server component → la valeur est lue à chaque régénération de la
// page (revalidate = 60 sur la home).
//
// Comportement:
// - inventaire indisponible (Supabase down ou pas configuré) → null
// - is_open = false → null (les commandes sont fermées)
// - remaining > 75 places → null (pas d'urgence à afficher)
// - remaining ≤ 75 → bandeau visible, intensité visuelle selon le seuil
export default async function InventoryStatus({
  variant = "banner",
  showCta = true,
  className,
}: InventoryStatusProps) {
  const inv = await getInventory(CURRENT_YEAR);
  if (!inv || !inv.isOpen) return null;
  if (inv.remaining > 75) return null;

  const isCritical = inv.remaining <= 20;
  const isHigh = inv.remaining <= 50;

  const tone = isCritical
    ? "bg-urgency/10 border-urgency/30 text-urgency"
    : isHigh
      ? "bg-gold/10 border-gold/30 text-gold"
      : "bg-emerald/10 border-emerald/30 text-emerald";

  const ctaBg = isCritical ? "bg-urgency" : isHigh ? "bg-gold" : "bg-emerald";

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold font-inter",
          tone,
          className
        )}
        aria-live="polite"
      >
        <Package size={12} />
        Plus que <strong className="text-base leading-none">{inv.remaining}</strong>
        place{inv.remaining > 1 ? "s" : ""}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "max-w-3xl mx-auto rounded-xl border-2 px-5 py-4 flex items-center justify-between gap-4 flex-wrap",
        tone,
        className
      )}
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <Package size={20} className={cn("flex-shrink-0", isCritical && "animate-pulse")} />
        <div>
          <p className="font-bold text-sm md:text-base">
            Plus que <span className="text-lg md:text-xl">{inv.remaining}</span> place
            {inv.remaining > 1 ? "s" : ""} pour l&apos;Aïd al-Adha 2026
          </p>
          <p className="text-xs opacity-80 font-inter mt-0.5">
            {isCritical
              ? "Dernières places — réservez maintenant"
              : isHigh
                ? "Le stock baisse vite chaque jour"
                : "Sécurisez votre sacrifice à temps"}
          </p>
        </div>
      </div>
      {showCta && (
        <Link
          href="/commander"
          className={cn(
            "inline-flex items-center gap-1.5 text-white font-bold uppercase text-xs md:text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0",
            ctaBg
          )}
        >
          Réserver <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
