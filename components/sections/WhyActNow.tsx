"use client";

import { motion } from "framer-motion";
import { Clock, TrendingDown, DollarSign, Video, Heart, XCircle } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import type { LucideIcon } from "lucide-react";

interface Reason {
  icon: LucideIcon;
  title: string;
  text: string;
  color: string;
}

const reasons: Reason[] = [
  { icon: Clock, title: "L'Aïd est dans 61 jours", text: "Les moutons partent chaque jour", color: "#C0392B" },
  { icon: TrendingDown, title: "Stock limité", text: "Nous ne pouvons sacrifier qu'un nombre limité de bêtes", color: "#B8860B" },
  { icon: DollarSign, title: "Le prix augmente bientôt", text: "Réserve au tarif Early Bird", color: "#2D6A4F" },
  { icon: Video, title: "Vidéo nominative garantie", text: "Mais seulement si tu réserves à temps", color: "#1B4332" },
  { icon: Heart, title: "Chaque mouton = 15 repas", text: "Pour des familles dans le besoin", color: "#2D6A4F" },
  { icon: XCircle, title: "L'an dernier, des gens ont raté", text: "Parce qu'ils ont attendu trop longtemps", color: "#C0392B" },
];

export default function WhyActNow() {
  return (
    <section className="bg-bg-primary section-padding dot-pattern" id="pourquoi-agir">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="POURQUOI AGIR MAINTENANT"
          accent="MAINTENANT"
          subtitle="Ne remets pas à demain ce que tu peux accomplir aujourd'hui."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-5 shadow-soft hover:shadow-medium transition-shadow duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${reason.color}10`, color: reason.color }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-inter font-bold text-text-primary text-sm mb-0.5">
                    {reason.title}
                  </h4>
                  <p className="text-text-muted text-sm">{reason.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
