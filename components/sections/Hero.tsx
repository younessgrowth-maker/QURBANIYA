"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Lock, Zap, Play, ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";

interface HeroProps {
  remainingSlots?: number;
  aidDate?: string;
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
};

const HERO_IMAGE = "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=1600&q=80";

export default function Hero({ remainingSlots = 47, aidDate = "Juin 2025" }: HeroProps) {
  return (
    <>
      {/* Fullscreen Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <Image src={HERO_IMAGE} alt="" fill className="object-cover" priority sizes="100vw" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332]/92 via-[#1B4332]/78 to-[#1B4332]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 py-32 md:py-40 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">

            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-[11px] font-inter font-semibold uppercase tracking-widest mb-8 border border-white/15 backdrop-blur-sm">
                {`A\u00efd el-K\u00e9bir ${aidDate}`}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-playfair font-bold text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              <motion.span className="inline-block" variants={fadeUp}>
                {`D\u00e9l\u00e9guez`}
              </motion.span>{" "}
              <motion.span className="inline-block" variants={fadeUp}>
                {`votre`}
              </motion.span>
              <br />
              <motion.span
                className="inline-block text-gold-light"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: easeOutExpo } },
                }}
              >
                sacrifice
              </motion.span>
              <br />
              <motion.span
                className="inline-block font-light text-white/70"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)" }}
                variants={fadeUp}
              >
                en toute confiance
              </motion.span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/65 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-8">
              {`Confiez votre qurban \u00e0 notre cheikh dipl\u00f4m\u00e9. Sacrifice conforme \u00e0 la Sunnah, film\u00e9 et envoy\u00e9 en preuve vid\u00e9o par WhatsApp.`}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              {[`Conforme \u00e0 la Sunnah`, `Preuve vid\u00e9o WhatsApp`, `Cheikh dipl\u00f4m\u00e9`].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 text-white/85 text-[11px] font-inter font-medium border border-white/12 backdrop-blur-sm">
                  {`\u2713 ${t}`}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link href="/commander">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto uppercase glow-pulse">
                  {`Commander \u2014 140\u20ac`}
                </Button>
              </Link>
              <Link href="#comment-ca-marche">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/8">
                  {`Comment \u00e7a marche`}
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-5 text-sm">
              <span className="flex items-center gap-1.5 text-white/40">
                <Lock size={13} />
                {`Paiement s\u00e9curis\u00e9`}
              </span>
              <span className="flex items-center gap-2 text-gold-light font-semibold font-inter">
                <Zap size={13} className="fill-current" />
                {`${remainingSlots} places restantes`}
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30">
          <ArrowDown size={20} />
        </motion.div>
      </section>

      {/* Video section */}
      <section className="bg-bg-primary section-padding !py-10 md:!py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="relative max-w-3xl mx-auto rounded-card overflow-hidden bg-bg-secondary border border-text-primary/6 shadow-medium" style={{ aspectRatio: "16/7" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="group w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-glow-primary transition-all duration-300" aria-label="Lire le message du cheikh">
                <Play size={26} className="ml-1 group-hover:scale-110 transition-transform" fill="currentColor" />
              </motion.button>
              <p className="mt-4 text-sm md:text-base text-text-muted font-medium">
                Message du cheikh — <span className="text-primary font-semibold">Regardez avant de commander</span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
