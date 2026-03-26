"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, DURATION } from "@/lib/animations";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
      whileHover={hover ? { y: -4, transition: { duration: 0.25, ease: EASE_OUT_EXPO } } : undefined}
      className={cn(
        "bg-white rounded-card p-7",
        "border border-gray-100/80",
        "shadow-soft transition-all duration-300",
        hover && "hover:shadow-elevated hover:border-gold/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
