"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface InlineCTAProps {
  text?: string;
  subtitle?: string;
  variant?: "primary" | "subtle";
}

export default function InlineCTA({
  text = "Réserver mon sacrifice — 140€",
  subtitle,
  variant = "subtle",
}: InlineCTAProps) {
  if (variant === "primary") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-center mt-10"
      >
        {subtitle && (
          <p className="text-text-muted text-sm mb-3">{subtitle}</p>
        )}
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-sm px-8 py-4 rounded-xl transition-all duration-200 shadow-glow-primary hover:shadow-lg"
        >
          {text}
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="text-center mt-10"
    >
      {subtitle && (
        <p className="text-text-muted text-sm mb-3">{subtitle}</p>
      )}
      <Link
        href="/commander"
        className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-dark transition-colors group"
      >
        {text}
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
