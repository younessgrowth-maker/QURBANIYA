"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X } from "lucide-react";
import { STOCK, AID_DATE } from "@/lib/constants";

export default function StickyTopBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const diff = AID_DATE.getTime() - Date.now();
    setDaysLeft(Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))));

    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[60] bg-urgency text-white"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 md:gap-6 text-sm font-inter">
            <div className="flex items-center gap-2 font-medium">
              <Zap size={14} className="fill-current flex-shrink-0" />
              <span className="hidden sm:inline">
                Plus que <strong>{STOCK.remaining}</strong> moutons disponibles
                <span className="mx-1.5 opacity-50">&middot;</span>
                L&apos;Aïd est dans <strong>{daysLeft} jours</strong>
              </span>
              <span className="sm:hidden">
                <strong>{STOCK.remaining}</strong> moutons restants &middot; <strong>{daysLeft}j</strong>
              </span>
            </div>

            <Link
              href="/commander"
              className="flex-shrink-0 bg-white text-urgency font-bold text-xs px-3 py-1 rounded-full hover:bg-white/90 transition-colors"
            >
              Réserver →
            </Link>

            <button
              onClick={() => setDismissed(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors"
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
