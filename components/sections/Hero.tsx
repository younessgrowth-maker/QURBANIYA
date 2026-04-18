"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Lock, Zap, ArrowDown, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import CountdownTimer from "@/components/ui/CountdownTimer";
import VideoPlaceholder from "@/components/ui/VideoPlaceholder";
import { STOCK } from "@/lib/constants";

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

export default function Hero({ remainingSlots = STOCK.remaining, aidDate = "Mai 2026" }: HeroProps) {
  return (
    <>
      {/* Fullscreen Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <Image src={HERO_IMAGE} alt="Mouton pour le sacrifice de l'Aïd al-Adha 2026 — Qurbaniya" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332]/92 via-[#1B4332]/78 to-[#1B4332]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 py-32 md:py-40 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">

            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-[11px] font-inter font-semibold uppercase tracking-widest mb-8 border border-white/15 backdrop-blur-sm">
                {`Aïd el-Kébir ${aidDate}`}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-playfair font-bold text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Déléguez votre
              <br />
              <span className="text-gold-light">sacrifice</span>
              <br />
              <span className="font-light text-white/70" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)" }}>
                en toute confiance
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/65 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-8">
              Confiez votre qurban à notre cheikh diplômé. Sacrifice conforme à la Sunnah, filmé et envoyé en preuve vidéo par WhatsApp.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              {["Conforme à la Sunnah", "Preuve vidéo WhatsApp", "Cheikh diplômé"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 text-white/85 text-[11px] font-inter font-medium border border-white/12 backdrop-blur-sm">
                  {`✓ ${t}`}
                </span>
              ))}
            </motion.div>

            {/* Countdown Timer */}
            <motion.div variants={fadeUp} className="mb-8">
              <CountdownTimer />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-5">
              <Link href="/commander">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto uppercase glow-pulse">
                  {`RÉSERVER MON SACRIFICE — 140€`}
                </Button>
              </Link>
              <Link href="#comment-ca-marche">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/8">
                  Comment ça marche
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-white/50">
                <Shield size={13} />
                Paiement sécurisé
              </span>
              <span className="flex items-center gap-1.5 text-white/50">
                <Lock size={13} />
                Vidéo garantie
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
          <VideoPlaceholder />
        </motion.div>
      </section>
    </>
  );
}
