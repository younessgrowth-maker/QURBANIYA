"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { STOCK } from "@/lib/constants";

interface StockGaugeProps {
  total?: number;
  reserved?: number;
  className?: string;
  variant?: "default" | "compact";
}

export default function StockGauge({
  total = STOCK.total,
  reserved = STOCK.reserved,
  className,
  variant = "default",
}: StockGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const remaining = total - reserved;
  const percent = Math.round((reserved / total) * 100);

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
        <p className="text-xs text-text-muted mt-1 font-inter">
          <span className="font-semibold text-text-primary">{remaining}</span> moutons restants
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-inter font-medium text-text-primary">
          <span className="text-lg">&#x1F411;</span>{" "}
          <span className="font-bold">{reserved}</span> réservés sur {total}
        </span>
        <span
          className={cn(
            "text-sm font-inter font-bold px-2.5 py-0.5 rounded-full",
            isUrgent
              ? "bg-urgency/10 text-urgency"
              : "bg-emerald/10 text-emerald"
          )}
        >
          {remaining} restants
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
        {percent}% des moutons sont déjà réservés pour l&apos;Aïd 2026
      </p>
    </div>
  );
}
