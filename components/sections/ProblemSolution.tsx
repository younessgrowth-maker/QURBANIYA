"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle, Video } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import InlineCTA from "@/components/ui/InlineCTA";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

interface Pillar {
  icon: LucideIcon;
  title: string;
  text: string;
}

const pillars: Pillar[] = [
  {
    icon: Zap,
    title: "SIMPLE",
    text: "Commandez en 2 minutes, nous gérons tout le reste pour vous.",
  },
  {
    icon: CheckCircle,
    title: "CONFORME",
    text: "Cheikh diplômé, animaux sélectionnés conformes à la Sunnah.",
  },
  {
    icon: Video,
    title: "TRAÇABLE",
    text: "Vous recevez la preuve vidéo nominative par WhatsApp le jour J.",
  },
];

export default function ProblemSolution() {
  return (
    <section className="bg-bg-primary section-padding dot-pattern" id="probleme">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="ACCOMPLISSEZ VOTRE SACRIFICE, NOURRISSEZ DES FAMILLES"
          accent="NOURRISSEZ"
          subtitle="Même à distance, votre obligation est accomplie et votre récompense est double."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="space-y-6 mb-16"
        >
          {/* Constat */}
          <motion.div
            variants={fadeUp}
            className="border-l-4 border-gold bg-gold/5 rounded-r-lg p-6 md:p-8"
          >
            <h3 className="text-gold font-bold uppercase text-sm tracking-wider mb-3">Vous souhaitez accomplir votre sacrifice</h3>
            <p className="text-text-primary leading-relaxed text-base md:text-lg">
              Mais en France, c&apos;est devenu très difficile : pas d&apos;abattoir accessible,
              pas de cheikh qualifié à proximité, une législation contraignante.
              Beaucoup de musulmans finissent par ne pas accomplir leur sacrifice, faute de solution.
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            variants={fadeUp}
            className="border-l-4 border-emerald bg-emerald/5 rounded-r-lg p-6 md:p-8"
          >
            <h3 className="text-emerald font-bold uppercase text-sm tracking-wider mb-3">Avec Qurbaniya, vous ne renoncez plus</h3>
            <p className="text-text-primary leading-relaxed text-base md:text-lg">
              Nous réalisons votre sacrifice à Madagascar, supervisé par un cheikh diplômé,
              dans le respect strict de la Sunnah. Vous recevez la <strong>vidéo nominative</strong> comme
              preuve. Et la viande est <strong>intégralement distribuée à des familles dans le besoin</strong> —
              jusqu&apos;à 30 personnes nourries par mouton.
            </p>
          </motion.div>
        </motion.div>

        {/* 3 Piliers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <Card key={pillar.title} className="text-center p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: easeOutExpo }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald/10 mb-5">
                  <pillar.icon size={24} className="text-emerald" />
                </div>
                <h3 className="text-text-primary font-black text-xl uppercase tracking-wide mb-3">
                  {pillar.title}
                </h3>
                <p className="text-text-muted leading-relaxed">{pillar.text}</p>
              </motion.div>
            </Card>
          ))}
        </div>

        <InlineCTA
          variant="primary"
          text="Accomplir mon sacrifice — 140€"
          subtitle="Simple, conforme et traçable."
        />
      </div>
    </section>
  );
}
