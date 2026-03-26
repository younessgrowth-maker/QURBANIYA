"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle, Video } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
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
          title="CHER FRÈRE, CHÈRE SŒUR"
          subtitle="Nous comprenons votre situation."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="space-y-6 mb-16"
        >
          {/* Problème */}
          <motion.div
            variants={fadeUp}
            className="border-l-4 border-urgency bg-urgency/5 rounded-r-lg p-6 md:p-8"
          >
            <h3 className="text-urgency font-bold uppercase text-sm tracking-wider mb-3">Le problème</h3>
            <p className="text-text-primary leading-relaxed text-base md:text-lg">
              Les moutons en France atteignent des prix prohibitifs : 350€, 380€, parfois 400€.
              Accomplir votre obligation islamique ne devrait pas être un luxe.
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            variants={fadeUp}
            className="border-l-4 border-emerald bg-emerald/5 rounded-r-lg p-6 md:p-8"
          >
            <h3 className="text-emerald font-bold uppercase text-sm tracking-wider mb-3">La solution</h3>
            <p className="text-text-primary leading-relaxed text-base md:text-lg">
              Depuis 5 ans, nous vous permettons d&apos;accomplir votre sacrifice en toute conformité
              avec la Sunnah, pour seulement <span className="text-gold font-bold">140€</span>, avec preuve vidéo.
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
      </div>
    </section>
  );
}
