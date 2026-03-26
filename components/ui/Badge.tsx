"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Clock, Star } from "lucide-react";

type BadgeVariant = "trust" | "urgency" | "gold" | "emerald";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantConfig = {
  trust: {
    icon: Check,
    classes: "border-primary/30 text-primary bg-primary/6",
  },
  urgency: {
    icon: Clock,
    classes: "border-error/30 text-error bg-error/5",
  },
  gold: {
    icon: Star,
    classes: "border-gold/30 text-gold bg-gold/5",
  },
  emerald: {
    icon: Check,
    classes: "border-primary/30 text-primary bg-primary/6",
  },
} as const;

export default function Badge({ children, variant = "trust", className }: BadgeProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5",
        "border rounded-full",
        "text-[11px] font-semibold uppercase tracking-wider font-inter",
        config.classes,
        className
      )}
      role="status"
    >
      <Icon size={11} strokeWidth={2.5} />
      {children}
    </motion.span>
  );
}
