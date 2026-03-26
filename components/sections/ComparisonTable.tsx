"use client";

import { motion } from "framer-motion";
// icons available for future enhancement
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

const rows = [
  { label: "Prix moyen", france: "350€ - 400€", us: "À partir de 129€", highlight: true },
  { label: "Logistique", france: "Abattoir, transport, stockage", us: "On gère tout de A à Z" },
  { label: "Viande gaspillée", france: "Souvent", us: "100% distribuée" },
  { label: "Preuve", france: "Aucune", us: "Vidéo nominative par WhatsApp" },
  { label: "Impact", france: "Limité", us: "+15 repas distribués" },
  { label: "Conformité", france: "Variable", us: "Supervisé par un imam diplômé" },
];

export default function ComparisonTable() {
  return (
    <section className="bg-bg-secondary section-padding" id="comparatif">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="COMPAREZ ET DÉCIDEZ"
          accent="DÉCIDEZ"
          subtitle="Le choix est simple."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl border border-gray-100 shadow-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 text-center">
            <div className="p-4 md:p-5" />
            <div className="p-4 md:p-5 bg-urgency/5 border-b border-urgency/10">
              <span className="text-sm font-bold text-urgency">🇫🇷 En France</span>
            </div>
            <div className="p-4 md:p-5 bg-emerald/5 border-b border-emerald/10">
              <span className="text-sm font-bold text-emerald">🌍 Avec nous</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 border-b border-gray-50 last:border-0"
            >
              <div className="p-4 md:p-5 flex items-center">
                <span className="text-sm font-medium text-text-primary">{row.label}</span>
              </div>
              <div className="p-4 md:p-5 flex items-center justify-center bg-urgency/[0.02]">
                <span className={`text-sm text-center ${row.highlight ? "line-through text-urgency font-bold" : "text-text-muted"}`}>
                  {row.france}
                </span>
              </div>
              <div className="p-4 md:p-5 flex items-center justify-center bg-emerald/[0.02]">
                <span className={`text-sm text-center ${row.highlight ? "text-emerald font-bold text-lg" : "text-text-primary font-medium"}`}>
                  {row.us}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center mt-8"
        >
          <Link href="/commander">
            <Button size="lg" variant="primary" className="uppercase">
              Le choix est simple → Réserver maintenant
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
