"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Video, CalendarCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrustItem {
  icon: LucideIcon;
  text: string;
}

const items: TrustItem[] = [
  { icon: Check, text: "Conforme à la Sunnah" },
  { icon: Video, text: "Preuve vidéo WhatsApp" },
  { icon: CalendarCheck, text: "5 ans d'expérience" },
  { icon: Users, text: "+800 familles" },
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
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="flex items-center justify-center gap-2 text-center"
            role="listitem"
          >
            <item.icon size={16} className="text-emerald flex-shrink-0" strokeWidth={2.5} />
            <span className="text-text-primary text-xs md:text-sm font-semibold whitespace-nowrap">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
