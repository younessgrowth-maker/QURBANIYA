"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Zap } from "lucide-react";

export default function CTAFinal() {
  return (
    <section className="relative overflow-hidden py-20 px-5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary-light animated-gradient-bg" style={{ backgroundSize: "200% 200%" }} />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[80px]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } },
          }}
          className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6"
        >
          <Zap size={22} className="text-white fill-current" />
        </motion.div>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="font-playfair font-bold text-3xl md:text-5xl mb-4 text-white"
        >
          {`Ne manquez pas `}
          <span className="text-gold-light">votre sacrifice</span>
        </motion.h2>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="text-white/70 text-lg mb-10 max-w-xl mx-auto font-light"
        >
          Les places partent vite. Réservez maintenant pour être sûr d&apos;avoir votre mouton le jour J.
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <Link href="/commander">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-5 uppercase glow-pulse">
              Réserver mon sacrifice — 140€
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
