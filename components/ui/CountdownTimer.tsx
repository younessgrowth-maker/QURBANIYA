"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Aid al-Adha 2026 — 27 Mai 2026
const AID_DATE = new Date("2026-05-27T06:00:00+01:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = Math.max(0, AID_DATE.getTime() - now.getTime());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipDigit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          key={display}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg w-[52px] h-[52px] md:w-[64px] md:h-[64px]"
          style={{ perspective: 400 }}
        >
          <span className="text-white font-black text-2xl md:text-3xl font-inter tabular-nums">
            {display}
          </span>
        </motion.div>
      </div>
      <span className="text-white/50 text-[10px] md:text-xs font-inter uppercase tracking-wider mt-1.5">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col items-center justify-center pb-5">
      <span className="text-white/30 text-xl md:text-2xl font-bold">:</span>
    </div>
  );
}

interface CountdownTimerProps {
  className?: string;
  variant?: "hero" | "compact";
}

export default function CountdownTimer({ className = "", variant = "hero" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 text-sm font-inter ${className}`}>
        <span className="font-bold tabular-nums">
          {timeLeft.days}j {String(timeLeft.hours).padStart(2, "0")}h{" "}
          {String(timeLeft.minutes).padStart(2, "0")}m
        </span>
        <span className="opacity-70">avant l&apos;Aïd</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`${className}`}
    >
      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start">
        <FlipDigit value={timeLeft.days} label="jours" />
        <Separator />
        <FlipDigit value={timeLeft.hours} label="heures" />
        <Separator />
        <FlipDigit value={timeLeft.minutes} label="min" />
        <Separator />
        <FlipDigit value={timeLeft.seconds} label="sec" />
      </div>
      <p className="text-white/40 text-xs md:text-sm font-inter mt-3 text-center md:text-left">
        Chaque jour qui passe, c&apos;est un mouton de moins disponible
      </p>
    </motion.div>
  );
}
