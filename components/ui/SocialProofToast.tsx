"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { getUrgencyMessage } from "@/lib/constants";
import type { RecentActivity } from "@/lib/recent-activity";

type Notif =
  | { kind: "static"; emoji: string; text: string }
  | { kind: "live"; firstName: string; ageMinutes: number };

function buildStaticNotifications(): Notif[] {
  const urgency = getUrgencyMessage();
  return [
    { kind: "static", emoji: "🔥", text: urgency.short },
    {
      kind: "static",
      emoji: "📹",
      text: "Chaque sacrifice est filmé et envoyé par WhatsApp le jour J",
    },
    {
      kind: "static",
      emoji: "✅",
      text: "Sacrifice conforme à la Sunnah, effectué par un cheikh diplômé",
    },
    {
      kind: "static",
      emoji: "🤲",
      text: "Confiez votre sacrifice, concentrez-vous sur la spiritualité",
    },
  ];
}

function formatAge(min: number): string {
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  return `il y a ${h}h`;
}

export default function SocialProofToast({
  recentActivities = [],
}: {
  recentActivities?: RecentActivity[];
}) {
  const [current, setCurrent] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  // Mix d'activités live (commandes réelles anonymisées) + notifications
  // statiques (rappels métier). Les live sont prioritaires en début de
  // rotation pour donner immédiatement le sentiment d'activité.
  const notifications = useMemo<Notif[]>(() => {
    const live: Notif[] = recentActivities.map((a) => ({
      kind: "live",
      firstName: a.firstName,
      ageMinutes: a.ageMinutes,
    }));
    const statics = buildStaticNotifications();
    // Intercaler live et statiques (live d'abord), pour rotation engageante.
    return [...live, ...statics];
  }, [recentActivities]);

  const showNext = useCallback(() => {
    if (notifications.length === 0) return;
    const idx = Math.floor(Math.random() * notifications.length);
    setCurrent(idx);
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  }, [notifications.length]);

  useEffect(() => {
    const firstDelay = setTimeout(showNext, 8000);
    const interval = setInterval(
      () => showNext(),
      20000 + Math.random() * 15000
    );
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
          className="fixed bottom-4 left-4 z-50 max-w-[340px] bg-white rounded-xl shadow-elevated border border-gray-100 p-4 font-inter md:bottom-6 md:left-6"
        >
          <button
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors"
            aria-label="Fermer"
          >
            <X size={14} />
          </button>

          {notif.kind === "live" ? (
            <div className="flex items-start gap-3 pr-4">
              <div className="w-9 h-9 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={18} className="text-emerald" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-text-primary leading-snug">
                  <strong>{notif.firstName}</strong> vient de réserver son
                  sacrifice
                </p>
                <p className="text-xs text-text-muted-light mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                  {formatAge(notif.ageMinutes)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 pr-4">
              <span className="text-xl flex-shrink-0" aria-hidden>
                {notif.emoji}
              </span>
              <div>
                <p className="text-sm text-text-primary font-medium leading-snug">
                  {notif.text}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
