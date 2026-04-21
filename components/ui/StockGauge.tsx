"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { AID_DATE, getUrgencyMessage } from "@/lib/constants";

interface StockGaugeProps {
  className?: string;
  variant?: "default" | "compact";
}

// Période de réservation : du 1er avril 2026 jusqu'au jour de l'Aïd.
// La barre remplit progressivement en fonction de la date réelle — zéro
// chiffre inventé, la pression temporelle vient uniquement du calendrier.
const WINDOW_START = new Date("2026-04-01T00:00:00Z");

function computeWindowProgress(): { percent: number; daysLeft: number } {
  const now = Date.now();
  const start = WINDOW_START.getTime();
  const end = AID_DATE.getTime();
  const totalMs = end - start;
  const elapsedMs = Math.max(0, now - start);
  const percent = Math.min(100, Math.round((elapsedMs / totalMs) * 100));
  const daysLeft = Math.max(
    0,
    Math.ceil((end - now) / 86_400_000)
  );
  return { percent, daysLeft };
}

export default function StockGauge({
  className,
  variant = "default",
}: StockGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { percent, daysLeft } = computeWindowProgress();
  const urgency = getUrgencyMessage();

  const barColor =
    percent >= 75
      ? "bg-urgency"
      : percent >= 50
        ? "bg-gold"
        : "bg-emerald";

  const isUrgent = percent >= 70;

  if (variant === "compact") {
    return (
      <div className={cn("w-full", className)}>
        <div className="h-1.5 bg-gray-200/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${percent}%` } : { width: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn("h-full rounded-full", barColor, isUrgent && "animate-pulse")}
          />
        </div>
        <p className="text-xs text-text-muted mt-1 font-inter">{urgency.short}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-inter font-medium text-text-primary">
          <span className="text-lg">&#x1F411;</span>{" "}
          <span className="font-bold">Aïd dans {daysLeft} {daysLeft > 1 ? "jours" : "jour"}</span>
        </span>
        <span
          className={cn(
            "text-sm font-inter font-bold px-2.5 py-0.5 rounded-full",
            isUrgent
              ? "bg-urgency/10 text-urgency"
              : "bg-emerald/10 text-emerald"
          )}
        >
          27 mai 2026
        </span>
      </div>

      <div className="h-3 bg-gray-200/60 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={cn(
            "h-full rounded-full transition-colors",
            barColor,
            isUrgent && "animate-pulse"
          )}
        />
      </div>

      <p className="text-xs text-text-muted mt-2 font-inter text-center">
        {urgency.long}
      </p>
    </div>
  );
}
