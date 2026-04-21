"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tier {
  label: string;
  price: number;
  endDate: string | null;
  endLabel: string;
}

const tiers: Tier[] = [
  { label: "Early Bird", price: 129, endDate: "2026-05-06T00:00:00", endLabel: "5 mai" },
  { label: "Standard", price: 140, endDate: "2026-05-20T00:00:00", endLabel: "19 mai" },
  { label: "Dernier moment", price: 155, endDate: "2026-05-27T00:00:00", endLabel: "26 mai · 23h59" },
];

function getActiveTierIndex(): number {
  const now = new Date();
  if (now < new Date(tiers[0].endDate!)) return 0;
  if (now < new Date(tiers[1].endDate!)) return 1;
  return 2;
}

function getDaysUntilNextTier(activeTier: number): number {
  if (activeTier >= tiers.length - 1) return 0;
  const target = new Date(tiers[activeTier].endDate!);
  const now = new Date();
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

const GOLD = "#B8860B";
const EMERALD = "#2D6A4F";
const URGENCY = "#C0392B";

export default function PricingTiers({ className }: { className?: string }) {
  const active = getActiveTierIndex();
  const daysLeft = getDaysUntilNextTier(active);
  const nextTier = active < tiers.length - 1 ? tiers[active + 1] : null;
  const priceJump = nextTier ? nextTier.price - tiers[active].price : 0;

  const activeColor = active === 0 ? EMERALD : active === 1 ? GOLD : URGENCY;
  const progressPercent = (active / (tiers.length - 1)) * 100;

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <TrendingUp size={16} style={{ color: GOLD }} />
        <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Le prix augmente à l&apos;approche de l&apos;Aïd
        </span>
      </div>

      {/* Timeline */}
      <div className="relative px-2 md:px-6 pt-12 pb-4">
        {/* Background track with filled progress inside */}
        <div className="absolute left-6 right-6 md:left-12 md:right-12 top-[4.25rem] h-[3px] bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progressPercent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(to right, ${EMERALD}, ${GOLD})`,
            }}
          />
        </div>

        {/* Markers */}
        <div className="relative flex justify-between items-start">
          {tiers.map((tier, i) => {
            const isPast = i < active;
            const isActive = i === active;
            const dotColor = isPast ? EMERALD : isActive ? activeColor : "#d1d5db";
            const textColor = isPast ? "#9ca3af" : isActive ? activeColor : "#6b7280";

            return (
              <div key={tier.label} className="relative flex flex-col items-center w-1/3">
                {/* "Vous êtes ici" badge */}
                <div className="h-7 mb-1 flex items-end">
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{
                        backgroundColor: activeColor,
                        color: "white",
                      }}
                    >
                      Vous êtes ici
                    </motion.span>
                  )}
                </div>

                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 rounded-full border-[3px] bg-white"
                  style={{
                    width: isActive ? 22 : 16,
                    height: isActive ? 22 : 16,
                    borderColor: dotColor,
                    backgroundColor: isPast ? EMERALD : isActive ? activeColor : "white",
                    boxShadow: isActive ? `0 0 0 6px ${activeColor}1a` : "none",
                  }}
                />

                {/* Active pulse ring */}
                {isActive && (
                  <motion.div
                    className="absolute left-1/2 top-[2rem] -translate-x-1/2 rounded-full pointer-events-none"
                    style={{
                      width: 22,
                      height: 22,
                      border: `2px solid ${activeColor}`,
                    }}
                    animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                {/* Label */}
                <div className="text-center mt-3 px-1">
                  <div
                    className="text-[10px] md:text-xs uppercase tracking-wider font-bold mb-0.5"
                    style={{ color: textColor }}
                  >
                    {tier.label}
                  </div>
                  <div
                    className={cn(
                      "text-xl md:text-2xl font-black tabular-nums",
                      isPast && "line-through decoration-2"
                    )}
                    style={{ color: textColor }}
                  >
                    {tier.price}€
                  </div>
                  <div className="text-[10px] md:text-xs text-text-muted mt-0.5">
                    {i === 0 && `jusqu'au ${tier.endLabel}`}
                    {i === 1 && `jusqu'au ${tier.endLabel}`}
                    {i === 2 && `jusqu'au ${tier.endLabel}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Urgency message */}
      {nextTier && daysLeft > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg mx-auto max-w-md"
          style={{
            backgroundColor: `${activeColor}0d`,
            border: `1px solid ${activeColor}33`,
          }}
        >
          <Clock size={16} style={{ color: activeColor }} />
          <span className="text-sm font-inter text-text-primary">
            Plus que{" "}
            <strong style={{ color: activeColor }}>
              {daysLeft} {daysLeft > 1 ? "jours" : "jour"}
            </strong>{" "}
            avant la hausse à <strong>{nextTier.price}€</strong>
            <span className="text-text-muted"> (+{priceJump}€)</span>
          </span>
        </motion.div>
      )}
    </div>
  );
}
