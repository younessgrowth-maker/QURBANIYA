"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { AID_DATE } from "@/lib/constants";

type Props = {
  inventory: { remaining: number; total: number };
};

// Bannière d'urgence haute conversion. Combine 3 leviers réels :
//   1) Countdown live jusqu'à l'Aïd (mise à jour 60s)
//   2) Stock restant chiffré + barre de progression visuelle
//   3) Single CTA fort
//
// Tous les chiffres viennent de sources vérifiables (table inventory
// Supabase + AID_DATE constant) — pas de fake urgency.

function computeTimeLeft(target: Date): {
  days: number;
  hours: number;
  minutes: number;
  totalHours: number;
  isClosed: boolean;
} {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, totalHours: 0, isClosed: true };
  }
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(diff / 3_600_000);
  return { days, hours, minutes, totalHours, isClosed: false };
}

export default function StickyTopBar({ inventory }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => computeTimeLeft(AID_DATE));

  useEffect(() => {
    // Affichage : dès que la page existe (pas besoin de scroll dans
    // les derniers jours), MAIS dismissed reste persistant pendant la
    // session (via state local — pas de localStorage pour rester ré-engagé
    // si refresh).
    const reveal = setTimeout(() => setVisible(true), 600);
    const tick = setInterval(() => {
      setTimeLeft(computeTimeLeft(AID_DATE));
    }, 60_000);
    return () => {
      clearTimeout(reveal);
      clearInterval(tick);
    };
  }, []);

  if (dismissed || timeLeft.isClosed) return null;

  const { remaining, total } = inventory;
  const reserved = Math.max(0, total - remaining);
  const filledPct = total > 0 ? Math.min(100, (reserved / total) * 100) : 0;
  const stockCritical = remaining <= 50;
  const stockLow = remaining <= 100;

  // Format countdown
  const countdownDisplay =
    timeLeft.totalHours < 24
      ? `${timeLeft.totalHours}h${String(timeLeft.minutes).padStart(2, "0")}`
      : `${timeLeft.days}j ${timeLeft.hours}h`;

  const countdownLabel = timeLeft.days === 0 ? "AUJOURD'HUI" : "Avant l'Aïd";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-urgency via-[#b91c1c] to-urgency text-white shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-3 md:px-4 py-2.5 md:py-2 flex items-center gap-3 md:gap-5 font-inter">
            {/* ── Countdown ────────────────────────────────────────── */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden sm:flex w-2 h-2 rounded-full bg-white"
                aria-hidden
              />
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-base md:text-lg leading-none tabular-nums tracking-tight">
                  {countdownDisplay}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-wider opacity-90 hidden md:inline">
                  {countdownLabel}
                </span>
              </div>
            </div>

            {/* Séparateur */}
            <span className="hidden md:block w-px h-6 bg-white/25" aria-hidden />

            {/* ── Stock + barre de progression ─────────────────────── */}
            <div className="flex-1 min-w-0 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  {stockCritical && (
                    <AlertTriangle
                      size={13}
                      className="text-amber-200 flex-shrink-0"
                    />
                  )}
                  <span className="text-xs md:text-sm font-semibold leading-tight truncate">
                    <span className="hidden sm:inline">
                      Plus que{" "}
                    </span>
                    <strong className="tabular-nums text-base md:text-base">
                      {remaining}
                    </strong>{" "}
                    <span className="opacity-80">/ {total}</span>{" "}
                    <span className="hidden sm:inline opacity-90">
                      places restantes
                    </span>
                    <span className="sm:hidden opacity-90">places</span>
                  </span>
                </div>
                {/* Progress bar */}
                <div
                  className="h-1.5 bg-white/20 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={Math.round(filledPct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Stock réservé"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${filledPct}%` }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full ${
                      stockCritical
                        ? "bg-amber-300"
                        : stockLow
                        ? "bg-white"
                        : "bg-white/80"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <Link
              href="/commander"
              className="flex-shrink-0 bg-white text-urgency font-bold text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-amber-50 hover:shadow-md transition-all whitespace-nowrap"
            >
              Réserver
              <span className="ml-1" aria-hidden>
                →
              </span>
            </Link>

            <button
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 p-1 -m-1 text-white/60 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
