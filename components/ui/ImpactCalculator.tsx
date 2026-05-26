"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

import { MEALS_PER_SHEEP, FAMILIES_PER_SHEEP, PRICE_AMOUNT } from "@/lib/constants";

// Prix de référence "France métropole" pour le calcul d'économies. Centralisé
// ici pour rester localisable (source : moyenne haute boucheries halal Paris
// banlieue, observée mars 2026).
const FRANCE_PRICE = 380;

const quantities = [1, 2, 3, 4, 5];

export default function ImpactCalculator() {
  const [qty, setQty] = useState(1);

  const meals = qty * MEALS_PER_SHEEP;
  const families = qty * FAMILIES_PER_SHEEP;
  const totalPrice = qty * PRICE_AMOUNT;
  const savings = qty * FRANCE_PRICE - totalPrice;

  return (
    <section className="bg-bg-primary section-padding" id="calculateur">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          title="DES FAMILLES QUI VONT SOURIRE GRÂCE À VOUS"
          accent="GRÂCE À VOUS"
          subtitle="À Madagascar, ce sacrifice est souvent l'unique vrai repas de l'année pour ces familles. Voyez ce que votre intention change concrètement."
        />

        {/* Quantity selector */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {quantities.map((q) => (
            <button
              key={q}
              onClick={() => setQty(q)}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl font-inter font-bold text-lg transition-all duration-200 ${
                qty === q
                  ? "bg-primary text-white shadow-glow-primary scale-110"
                  : "bg-white border-2 border-gray-200 text-text-primary hover:border-primary/30"
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Impact display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            key={`meals-${qty}`}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-soft"
          >
            <span className="text-3xl mb-2 block">🍽️</span>
            <motion.span
              key={meals}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black text-primary block"
            >
              {meals}
            </motion.span>
            <span className="text-sm text-text-muted leading-snug block mt-1">
              personnes qui rompent
              <br />
              leur jeûne avec du vrai mouton
            </span>
          </motion.div>

          <motion.div
            key={`families-${qty}`}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-soft"
          >
            <span className="text-3xl mb-2 block">👨‍👩‍👧‍👦</span>
            <motion.span
              key={families}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black text-primary block"
            >
              {families}
            </motion.span>
            <span className="text-sm text-text-muted leading-snug block mt-1">
              familles qui célèbrent
              <br />
              l&apos;Aïd dignement
            </span>
          </motion.div>

          <motion.div
            key={`price-${qty}`}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-soft"
          >
            <span className="text-3xl mb-2 block">💰</span>
            <motion.span
              key={totalPrice}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black text-gold block"
            >
              {totalPrice}€
            </motion.span>
            <span className="text-sm text-text-muted leading-snug block mt-1">
              soit {savings}€ de moins
              <br />
              qu&apos;en France
            </span>
          </motion.div>
        </div>

        {/* Citation émotionnelle */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm md:text-base text-text-muted italic max-w-xl mx-auto mb-8 leading-relaxed"
        >
          « Pour ces familles, ce n&apos;est pas un repas comme un autre.
          C&apos;est la viande qui manque toute l&apos;année, partagée le
          jour où elle compte le plus. »
        </motion.blockquote>

        {/* CTA — passe la quantité choisie en query param pour pré-remplir le form */}
        <div className="text-center">
          <Link href={qty > 1 ? `/commander?qty=${qty}` : "/commander"}>
            <Button size="lg" variant="secondary" className="uppercase glow-pulse">
              Réserver {qty > 1 ? `mes ${qty} moutons` : "mon mouton"} →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
