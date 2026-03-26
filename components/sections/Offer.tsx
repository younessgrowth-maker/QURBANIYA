"use client";

import { motion } from "framer-motion";
import { Check, Lock, CreditCard, Zap } from "lucide-react";
import StockGauge from "@/components/ui/StockGauge";
import PricingTiers from "@/components/ui/PricingTiers";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

const inclusions = [
  "Mouton sélectionné conforme aux critères islamiques",
  "Sacrifice effectué par notre cheikh le jour de l'Aïd",
  "Preuve vidéo nominative envoyée par WhatsApp",
  "Distribution de la viande aux familles dans le besoin",
  "Reçu numérique de votre sacrifice",
];

export default function Offer() {
  return (
    <section className="bg-bg-secondary section-padding" id="offre">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="VOTRE SACRIFICE COMPLET"
          accent="COMPLET"
          subtitle="Tout est inclus. Aucune surprise."
        />

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-[560px] mx-auto"
        >
          {/* Limited places sticker */}
          <div className="absolute -top-3 -right-3 z-20">
            <div className="bg-urgency text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full rotate-[8deg] shadow-lg">
              Places limitées
            </div>
          </div>

          <div className="relative overflow-hidden rounded-card bg-white shadow-elevated gradient-border">
            {/* Top label */}
            <div className="bg-gold/10 border-b border-gold/20 px-6 py-3 text-center">
              <span className="text-gold text-sm font-bold uppercase tracking-wider">
                Offre Aïd el-Kébir 2025
              </span>
            </div>

            <div className="p-8 md:p-10">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="text-[72px] md:text-[80px] font-black leading-none text-gradient-gold">
                  140€
                </div>
                <p className="text-text-muted text-sm mt-2">
                  Tout inclus · TVA incluse
                </p>
              </div>

              {/* Inclusions */}
              <ul className="space-y-4 mb-10">
                {inclusions.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3"
                  >
                    <Check size={18} className="text-emerald flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-text-primary text-[15px] leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Stock gauge */}
              <div className="mb-6">
                <StockGauge variant="compact" />
              </div>

              {/* CTA */}
              <Link href="/commander" className="block">
                <Button size="lg" variant="primary" className="w-full text-base glow-pulse">
                  RÉSERVER MON SACRIFICE MAINTENANT
                </Button>
              </Link>

              {/* Micro-text */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-3 text-text-muted-light text-xs">
                <span className="flex items-center gap-1">
                  <Lock size={11} />
                  Paiement sécurisé
                </span>
                <span>&middot;</span>
                <span>Vidéo garantie</span>
                <span>&middot;</span>
                <span className="flex items-center gap-1 text-gold font-semibold">
                  <Zap size={11} className="fill-current" />
                  53 moutons restants
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Early Bird Pricing Tiers */}
        <PricingTiers className="mt-10" />

        {/* Payment icons */}
        <div className="flex items-center justify-center gap-6 mt-8 text-text-muted-light/50">
          <span className="text-xs font-semibold uppercase tracking-wider">Visa</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Mastercard</span>
          <CreditCard size={18} className="opacity-50" />
          <span className="text-xs font-semibold uppercase tracking-wider">PayPal</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Stripe</span>
        </div>
      </div>
    </section>
  );
}
