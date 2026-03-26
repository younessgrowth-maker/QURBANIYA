"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Lock, Video, Check, Phone, RefreshCw, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrustItem {
  icon: LucideIcon;
  text: string;
}

const items: TrustItem[] = [
  { icon: Lock, text: "Paiement 100% sécurisé" },
  { icon: Video, text: "Vidéo nominative garantie" },
  { icon: Check, text: "Conforme à la Sunnah" },
  { icon: Phone, text: "Support WhatsApp réactif" },
  { icon: RefreshCw, text: "Remboursement si empêchement" },
  { icon: GraduationCap, text: "Supervisé par un imam diplômé" },
];

interface TrustBarProps {
  className?: string;
}

export default function TrustBar({ className }: TrustBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "w-full bg-bg-secondary border-y border-gold/10 py-4 px-4",
        className
      )}
      role="list"
      aria-label="Garanties de confiance"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="flex items-center justify-center gap-2 text-center"
            role="listitem"
          >
            <item.icon size={15} className="text-emerald flex-shrink-0" strokeWidth={2.5} />
            <span className="text-text-primary text-[11px] md:text-xs font-semibold whitespace-nowrap">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
