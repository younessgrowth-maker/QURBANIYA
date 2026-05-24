"use client";

import { motion } from "framer-motion";
import { Shield, Video, GraduationCap, Star, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { AID_DATE } from "@/lib/constants";

// Trust strip horizontal compact remplaçant l'ancienne carte 3-garanties
// trop verticale et vide. Inspiré du pattern "trust bar" des leaders du
// secteur (Stripe, Vercel, Apple Pay) :
//   - Mini-header urgence (countdown live)
//   - 4 colonnes égales : 3 garanties + 1 trust micro-stats
//   - Dividers fins (gap-px sur fond gris), look pro et premium
//   - Responsive : 4 cols desktop → 2x2 mobile

type Col = {
  icon: typeof Shield;
  title: string;
  subtitle: string;
  accent?: "gold" | "emerald";
};

const COLS: Col[] = [
  {
    icon: Shield,
    title: "Paiement 100% sécurisé",
    subtitle: "Stripe · Données protégées",
    accent: "emerald",
  },
  {
    icon: Video,
    title: "Vidéo nominative",
    subtitle: "Reçue par WhatsApp · jour J",
    accent: "emerald",
  },
  {
    icon: GraduationCap,
    title: "Imam diplômé",
    subtitle: "Cheikh Chamsouddin · Sunnah",
    accent: "emerald",
  },
  {
    icon: Star,
    title: "+300 sacrifices · 5 ans",
    subtitle: "4.8/5 (89 avis) · 100% satisfaction",
    accent: "gold",
  },
];

function formatCountdown(target: Date): string {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return "Aïd aujourd'hui";
  const totalHours = Math.floor(diff / 3_600_000);
  if (totalHours < 24) return `Aïd dans ${totalHours}h`;
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return `Aïd dans ${days}j ${hours}h`;
}

export default function HeroGuarantees() {
  const [countdown, setCountdown] = useState(() => formatCountdown(AID_DATE));

  useEffect(() => {
    const t = setInterval(() => setCountdown(formatCountdown(AID_DATE)), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Mini header urgence */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center gap-2 mb-5"
      >
        <Clock size={13} className="text-urgency flex-shrink-0" />
        <span className="text-[11px] md:text-xs uppercase tracking-[0.12em] font-bold text-urgency leading-none">
          {countdown}
        </span>
        <span className="text-text-muted-light text-xs leading-none hidden sm:inline">
          · Sécurisez votre sacrifice
        </span>
      </motion.div>

      {/* Trust strip — 4 colonnes avec dividers fins */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl bg-gray-200 overflow-hidden shadow-soft"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
          {COLS.map((col) => {
            const Icon = col.icon;
            const iconColor =
              col.accent === "gold" ? "text-gold" : "text-emerald";
            const iconBg =
              col.accent === "gold" ? "bg-gold/10" : "bg-emerald/10";
            return (
              <div
                key={col.title}
                className="bg-white p-5 md:p-6 flex flex-col items-start gap-3 transition-colors hover:bg-bg-tertiary/40"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}
                >
                  <Icon size={17} className={iconColor} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary leading-tight">
                    {col.title}
                  </div>
                  <div className="text-[11px] md:text-xs text-text-muted-light mt-1 leading-snug">
                    {col.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
