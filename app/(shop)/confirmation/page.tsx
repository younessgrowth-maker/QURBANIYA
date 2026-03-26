"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Mail, Video, Calendar, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
      <ConfirmationContent />
    </Suspense>
  );
}

/* ── Confetti particles (subtle, client-only to avoid hydration mismatch) ── */
function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      left: `${10 + Math.round(i * 6.7 + 3)}%`,
      delay: i * 0.12,
      duration: 2 + (i % 4) * 0.5,
      size: 4 + (i % 3) * 2,
      color: i % 3 === 0 ? "#C9A84C" : i % 3 === 1 ? "#2D6A4F" : "#E8C96A",
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: [0, 400, 600], opacity: [0, 0.7, 0], rotate: [0, 180, 360] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

const nextSteps = [
  { icon: Mail, text: "Email de confirmation immédiat" },
  { icon: Calendar, text: "Rappel 7 jours avant le sacrifice" },
  { icon: Check, text: "Notification le jour du sacrifice" },
  { icon: Video, text: "Preuve vidéo envoyée par WhatsApp sous 24h" },
];

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const isVirement = method === "virement";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16 px-4">
        <div className="relative max-w-lg mx-auto text-center">
          <Confetti />

          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald/15 border-2 border-emerald flex items-center justify-center mx-auto mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            >
              <Check size={36} className="text-emerald" strokeWidth={3} />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-black uppercase mb-3">
              BARAKALLAH <span className="text-gold">FIKOUM</span>
            </h1>

            <p className="text-text-muted text-lg leading-relaxed mb-8">
              {isVirement
                ? "Votre commande a été enregistrée. Les coordonnées bancaires vous ont été envoyées par email."
                : "Votre sacrifice a été enregistré avec succès."}
            </p>
          </motion.div>

          {/* Order recap card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-bg-secondary border border-gold/20 rounded-xl p-6 text-left mb-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gold/10">
              <span className="text-text-primary font-semibold">Sacrifice Mouton</span>
              <span className="text-gold font-bold">140,00€</span>
            </div>
            <div className="pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Année</span>
                <span className="text-text-primary">Aïd el-Kébir 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Paiement</span>
                <span className={isVirement ? "text-yellow-400" : "text-emerald"}>
                  {isVirement ? "Virement en attente" : "Confirmé"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Next steps */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="bg-bg-secondary border border-gold/10 rounded-xl p-6 text-left mb-8"
          >
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-4">
              Prochaines étapes
            </h3>
            <ol className="space-y-3">
              {nextSteps.map((step, i) => (
                <li key={i} className="flex items-center gap-3 text-text-muted text-sm">
                  <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <step.icon size={14} className="text-gold" />
                  </div>
                  {step.text}
                </li>
              ))}
            </ol>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <Link href="/mes-commandes">
              <Button size="lg" variant="secondary" className="w-full">
                SUIVRE MA COMMANDE <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>

            <Link
              href="/"
              className="inline-block text-text-muted-light text-sm mt-4 hover:text-gold transition-colors"
            >
              ← Retour à l&apos;accueil
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
