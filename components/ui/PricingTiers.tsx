"use client";

import { motion } from "framer-motion";
import { Check, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tier {
  label: string;
  price: number;
  dateRange: string;
  color: "emerald" | "gold" | "urgency";
  icon: typeof Zap;
}

const tiers: Tier[] = [
  { label: "Early Bird", price: 129, dateRange: "Avant le 15 avril", color: "emerald", icon: Zap },
  { label: "Standard", price: 140, dateRange: "Du 15 avril au 1er mai", color: "gold", icon: Clock },
  { label: "Dernier moment", price: 155, dateRange: "Après le 1er mai", color: "urgency", icon: Clock },
];

function getActiveTierIndex(): number {
  const now = new Date();
  const tier1End = new Date("2026-04-15");
  const tier2End = new Date("2026-05-01");
  if (now < tier1End) return 0;
  if (now < tier2End) return 1;
  return 2;
}

function getDaysUntilNextTier(): number {
  const now = new Date();
  const tier1End = new Date("2026-04-15");
  const tier2End = new Date("2026-05-01");
  const activeTier = getActiveTierIndex();
  const target = activeTier === 0 ? tier1End : activeTier === 1 ? tier2End : null;
  if (!target) return 0;
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

export default function PricingTiers({ className }: { className?: string }) {
  const activeTier = getActiveTierIndex();
  const daysLeft = getDaysUntilNextTier();

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tiers.map((tier, i) => {
          const isActive = i === activeTier;
          const isPast = i < activeTier;
          const Icon = tier.icon;

          return (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative rounded-xl p-4 md:p-5 border-2 transition-all",
                isActive && `border-${tier.color} bg-${tier.color}/5 shadow-md`,
                isPast && "border-gray-200 bg-gray-50 opacity-60",
                !isActive && !isPast && "border-gray-200 bg-white"
              )}
              style={isActive ? {
                borderColor: tier.color === "emerald" ? "#2D6A4F" : tier.color === "gold" ? "#B8860B" : "#C0392B",
                backgroundColor: tier.color === "emerald" ? "rgba(45,106,79,0.05)" : tier.color === "gold" ? "rgba(184,134,11,0.05)" : "rgba(192,57,43,0.05)",
              } : isPast ? { borderColor: "#e5e7eb", backgroundColor: "#f9fafb" } : {}}
            >
              {isActive && (
                <span className="absolute -top-2.5 left-4 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border"
                  style={{ color: tier.color === "emerald" ? "#2D6A4F" : tier.color === "gold" ? "#B8860B" : "#C0392B", borderColor: tier.color === "emerald" ? "#2D6A4F" : tier.color === "gold" ? "#B8860B" : "#C0392B" }}
                >
                  Prix actuel
                </span>
              )}

              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className={isPast ? "text-gray-400" : ""} style={!isPast ? { color: tier.color === "emerald" ? "#2D6A4F" : tier.color === "gold" ? "#B8860B" : "#C0392B" } : {}} />
                <span className={cn("text-xs font-bold uppercase tracking-wider", isPast && "text-gray-400")}
                  style={!isPast ? { color: tier.color === "emerald" ? "#2D6A4F" : tier.color === "gold" ? "#B8860B" : "#C0392B" } : {}}
                >
                  {tier.label}
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className={cn("text-2xl md:text-3xl font-black", isPast && "line-through text-gray-400")}
                  style={!isPast ? { color: tier.color === "emerald" ? "#2D6A4F" : tier.color === "gold" ? "#B8860B" : "#C0392B" } : {}}
                >
                  {tier.price}€
                </span>
              </div>

              <p className={cn("text-xs", isPast ? "text-gray-400" : "text-text-muted")}>
                {tier.dateRange}
              </p>

              {isPast && (
                <div className="flex items-center gap-1 mt-2 text-gray-400 text-[10px]">
                  <Check size={10} />
                  <span>Expiré</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {daysLeft > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-inter mt-3"
          style={{ color: tiers[activeTier].color === "emerald" ? "#2D6A4F" : tiers[activeTier].color === "gold" ? "#B8860B" : "#C0392B" }}
        >
          Ce prix disparaît dans <strong>{daysLeft} jours</strong>
        </motion.p>
      )}
    </div>
  );
}
