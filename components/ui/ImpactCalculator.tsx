"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

import { MEALS_PER_SHEEP, FAMILIES_PER_SHEEP } from "@/lib/constants";

const PRICE_PER_SHEEP = 140;
const FRANCE_PRICE = 380;

const quantities = [1, 2, 3, 5, 10];

export default function ImpactCalculator() {
  const [qty, setQty] = useState(1);

  const meals = qty * MEALS_PER_SHEEP;
  const families = qty * FAMILIES_PER_SHEEP;
  const totalPrice = qty * PRICE_PER_SHEEP;
  const savings = qty * FRANCE_PRICE - totalPrice;

  return (
    <section className="bg-bg-primary section-padding" id="calculateur">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          title="CALCULEZ VOTRE IMPACT"
          accent="IMPACT"
          subtitle="Choisissez le nombre de moutons et voyez votre impact concret."
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
            <span className="text-sm text-text-muted">repas distribués</span>
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
            <span className="text-sm text-text-muted">familles nourries</span>
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
            <span className="text-sm text-text-muted">soit {savings}€ de moins qu&apos;en France</span>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/commander">
            <Button size="lg" variant="secondary" className="uppercase glow-pulse">
              Réserver {qty > 1 ? `mes ${qty} moutons` : "mon mouton"} →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
