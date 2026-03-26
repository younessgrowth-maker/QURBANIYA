"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface CountdownBadgeProps {
  remaining: number;
  className?: string;
}

export default function CountdownBadge({ remaining, className }: CountdownBadgeProps) {
  const isUrgent = remaining < 20;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "font-bold text-sm uppercase tracking-wide",
        "border",
        isUrgent
          ? "bg-urgency/10 text-urgency border-urgency/30 animate-pulse-gold"
          : "bg-urgency/10 text-urgency border-urgency/30",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`${remaining} places restantes`}
    >
      <Zap size={14} className={cn("fill-current", isUrgent && "animate-pulse")} />
      <span>{remaining} places restantes</span>
    </motion.div>
  );
}
