"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { X, Clock } from "lucide-react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        const dismissed = sessionStorage.getItem("exit-popup-dismissed");
        if (!dismissed) {
          triggered = true;
          setShow(true);
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("exit-popup-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[70] backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-5 text-center">
              <Clock size={28} className="text-gold-light mx-auto mb-2" />
              <h3 className="text-white font-playfair font-bold text-xl md:text-2xl">
                Attends ! Tu allais oublier ton sacrifice
              </h3>
            </div>

            {/* Body */}
            <div className="p-6 text-center">
              <p className="text-text-muted mb-6 font-inter">
                Il ne reste que <strong className="text-urgency">53 moutons</strong> disponibles.
                <br />
                Le prix augmente bientôt.
              </p>

              <Link href="/commander" onClick={dismiss}>
                <Button size="lg" variant="secondary" className="w-full uppercase glow-pulse">
                  Réserver maintenant →
                </Button>
              </Link>

              <p className="text-text-muted-light text-xs mt-4 font-inter">
                Rejoins les +800 contributeurs satisfaits
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
