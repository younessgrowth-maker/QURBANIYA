"use client";

import { motion } from "framer-motion";
// icons available for future enhancement
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

const rows = [
  { obstacle: "Pas d'abattoir agréé accessible près de chez vous", solution: "Sacrifice réalisé sur place à Madagascar" },
  { obstacle: "Aucun cheikh qualifié disponible dans votre ville", solution: "Supervisé par un cheikh diplômé en sciences islamiques" },
  { obstacle: "Impossible de vérifier que les règles de la Sunnah sont respectées", solution: "Vidéo nominative envoyée par WhatsApp comme preuve" },
  { obstacle: "La législation française rend le sacrifice très compliqué", solution: "Tout est pris en charge dans le respect des lois locales" },
  { obstacle: "Résultat : beaucoup de musulmans n'accomplissent pas leur sacrifice", solution: "Accomplissez votre obligation ET nourrissez 30 personnes dans le besoin" },
];

export default function ComparisonTable() {
  return (
    <section className="bg-bg-secondary section-padding" id="comparatif">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="POURQUOI C'EST SI DIFFICILE EN FRANCE ?"
          accent="DIFFICILE"
          subtitle="Plutôt que de ne pas accomplir votre sacrifice, déléguez-le à Qurbaniya."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl border border-gray-100 shadow-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-2 text-center">
            <div className="p-4 md:p-5 bg-urgency/5 border-b border-urgency/10">
              <span className="text-sm font-bold text-urgency">❌ En France, c&apos;est compliqué</span>
            </div>
            <div className="p-4 md:p-5 bg-emerald/5 border-b border-emerald/10">
              <span className="text-sm font-bold text-emerald">✅ Avec Qurbaniya</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 border-b border-gray-50 last:border-0"
            >
              <div className="p-4 md:p-5 flex items-center justify-center bg-urgency/[0.02]">
                <span className="text-sm text-center text-text-muted">
                  {row.obstacle}
                </span>
              </div>
              <div className="p-4 md:p-5 flex items-center justify-center bg-emerald/[0.02]">
                <span className="text-sm text-center text-text-primary font-medium">
                  {row.solution}
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
              Accomplir mon sacrifice → 140€
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
