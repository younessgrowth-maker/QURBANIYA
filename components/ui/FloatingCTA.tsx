"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getUrgencyMessage } from "@/lib/constants";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const urgency = getUrgencyMessage();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/60 px-4 py-3 safe-area-bottom">
            <Link href="/commander" className="block">
              <button className="w-full bg-primary hover:bg-primary-light text-white font-inter font-bold text-sm py-3.5 rounded-button shadow-glow-primary transition-all duration-300 flex items-center justify-center gap-2">
                <span>&#x1F411;</span>
                <span>Réserver mon sacrifice</span>
                <span className="text-white/60 text-xs">&middot; {urgency.short}</span>
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
