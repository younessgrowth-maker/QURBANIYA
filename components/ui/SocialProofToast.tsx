"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { STOCK } from "@/lib/constants";

const notifications = [
  { emoji: "🎉", text: "Youssef de Marseille vient de réserver", time: "il y a 4 min" },
  { emoji: "🎉", text: "Fatima de Paris vient de réserver", time: "il y a 7 min" },
  { emoji: "🎉", text: "Ahmed de Lyon vient de réserver", time: "il y a 12 min" },
  { emoji: "📦", text: "18 moutons réservés aujourd'hui", time: "" },
  { emoji: "⭐", text: "\"Vidéo reçue le jour même, top !\" — Amina, Paris", time: "" },
  { emoji: "🎉", text: "Mohamed de Toulouse vient de réserver", time: "il y a 3 min" },
  { emoji: "🔥", text: `Plus que ${STOCK.remaining} moutons disponibles`, time: "" },
  { emoji: "⭐", text: "\"4ème année, toujours aussi bien\" — Karim, Lyon", time: "" },
  { emoji: "🎉", text: "Samira de Strasbourg vient de réserver", time: "il y a 9 min" },
  { emoji: "📦", text: "23 moutons réservés cette semaine", time: "" },
  { emoji: "🎉", text: "Omar de Bordeaux vient de réserver", time: "il y a 6 min" },
  { emoji: "⭐", text: "\"Service exemplaire, merci\" — Nadia, Lille", time: "" },
];

export default function SocialProofToast() {
  const [current, setCurrent] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const showNext = useCallback(() => {
    const idx = Math.floor(Math.random() * notifications.length);
    setCurrent(idx);
    setVisible(true);

    setTimeout(() => setVisible(false), 5000);
  }, []);

  useEffect(() => {
    const firstDelay = setTimeout(showNext, 8000);

    const interval = setInterval(() => {
      showNext();
    }, 20000 + Math.random() * 15000);

    return () => {
      clearTimeout(firstDelay);
      clearInterval(interval);
    };
  }, [showNext]);

  const notif = current !== null ? notifications[current] : null;

  return (
    <AnimatePresence>
      {visible && notif && (
        <motion.div
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 z-50 max-w-[320px] bg-white rounded-xl shadow-elevated border border-gray-100 p-4 font-inter md:bottom-6 md:left-6"
        >
          <button
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors"
            aria-label="Fermer"
          >
            <X size={14} />
          </button>
          <div className="flex items-start gap-3 pr-4">
            <span className="text-xl flex-shrink-0">{notif.emoji}</span>
            <div>
              <p className="text-sm text-text-primary font-medium leading-snug">{notif.text}</p>
              {notif.time && (
                <p className="text-xs text-text-muted-light mt-1">{notif.time}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
