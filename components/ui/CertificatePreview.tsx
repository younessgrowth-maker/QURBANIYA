"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

export default function CertificatePreview() {
  const [name, setName] = useState("");

  return (
    <section className="bg-bg-secondary section-padding" id="certificat">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          title="VISUALISEZ VOTRE CERTIFICAT"
          accent="CERTIFICAT"
          subtitle="Tapez votre prénom et voyez à quoi ressemblera votre certificat de sacrifice."
        />

        {/* Name input */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre prénom..."
            className="w-full bg-white border-2 border-gray-200 text-text-primary rounded-xl px-5 py-4 text-center text-lg font-inter font-medium placeholder:text-text-muted-light/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-250"
          />
        </div>

        {/* Certificate preview */}
        <AnimatePresence mode="wait">
          {name.trim().length > 0 && (
            <motion.div
              key="cert"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-lg mx-auto"
            >
              {/* Certificate card */}
              <div className="bg-white rounded-2xl border-2 border-gold/30 shadow-elevated overflow-hidden">
                {/* Gold header */}
                <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-b border-gold/20 px-6 py-4 text-center">
                  <p className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
                    Certificat de Sacrifice
                  </p>
                </div>

                <div className="p-8 md:p-10 text-center">
                  {/* Bismillah */}
                  <p className="text-2xl md:text-3xl text-gold/60 mb-6 font-playfair" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
                    بِسْمِ ٱللَّٰهِ
                  </p>

                  {/* Main text */}
                  <p className="text-text-muted text-sm mb-2">Sacrifice effectué au nom de</p>
                  <motion.p
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4"
                  >
                    {name.trim()}
                  </motion.p>

                  <div className="w-16 h-px bg-gold/30 mx-auto mb-4" />

                  <p className="text-text-muted text-sm">
                    Aïd al-Adha 2026 · Conforme à la Sunnah
                  </p>

                  {/* Decorative corners */}
                  <div className="absolute top-16 left-4 w-8 h-8 border-l-2 border-t-2 border-gold/20 rounded-tl-lg" />
                  <div className="absolute top-16 right-4 w-8 h-8 border-r-2 border-t-2 border-gold/20 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold/20 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold/20 rounded-br-lg" />
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-6">
                <Link href="/commander">
                  <Button size="lg" variant="secondary" className="uppercase glow-pulse">
                    Recevoir mon certificat et ma vidéo →
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
