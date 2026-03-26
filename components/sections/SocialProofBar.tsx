"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 800, suffix: "+", label: "familles servies" },
  { value: 4.8, suffix: "★", label: "note moyenne" },
  { value: 5, suffix: " ans", label: "d'expérience" },
  { value: 100, suffix: "%", label: "taux satisfaction" },
];

function useCountUp(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isDecimal ? parseFloat((target * eased).toFixed(1)) : Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration, isDecimal]);

  return count;
}

function StatItem({ stat, started, index }: { stat: Stat; started: boolean; index: number }) {
  const count = useCountUp(stat.value, started);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-4 py-3"
    >
      <span className={`text-3xl md:text-5xl font-black leading-none ${index % 2 === 0 ? "text-emerald" : "text-gold"}`}>
        {count}{stat.suffix}
      </span>
      <span className="text-text-muted text-sm mt-2">{stat.label}</span>
    </motion.div>
  );
}

export default function SocialProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-bg-secondary border-y border-gold/10 py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-gold/15">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} started={isInView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
