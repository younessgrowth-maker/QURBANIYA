"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Video, GraduationCap } from "lucide-react";

// 3 garanties iconiques remplaçant le VideoPlaceholder "Message du cheikh"
// dans le Hero. Tant que la vidéo n'est pas tournée, on évite le placeholder
// "bientôt disponible" qui casse la confiance — on affiche du concret à la
// place : paiement sécurisé, vidéo nominative, supervision diplômée.

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "Paiement 100% sécurisé",
    body: "Stripe · Vos données ne sont jamais stockées chez nous",
  },
  {
    icon: Video,
    title: "Vidéo nominative garantie",
    body: "Filmée le jour J · Reçue par WhatsApp dans la soirée",
  },
  {
    icon: GraduationCap,
    title: "Supervisé par un imam diplômé",
    body: "Cheikh Chamsouddin · Conforme à la Sunnah · Halal certifié",
  },
] as const;

export default function HeroGuarantees() {
  return (
    <div className="bg-gradient-to-br from-emerald/5 via-bg-primary to-gold/5 border border-gray-100 rounded-2xl p-5 md:p-6 shadow-soft">
      <div className="space-y-4">
        {GUARANTEES.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0">
              <g.icon size={18} className="text-emerald" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-text-primary leading-tight">
                {g.title}
              </div>
              <div className="text-xs text-text-muted mt-0.5 leading-snug">
                {g.body}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-text-muted-light">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
        <span>+300 sacrifices déjà accomplis depuis 5 ans</span>
      </div>
    </div>
  );
}
