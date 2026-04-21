"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import InlineCTA from "@/components/ui/InlineCTA";

interface CounterItem {
  emoji: string;
  value: number;
  suffix: string;
  label: string;
}

const counters: CounterItem[] = [
  { emoji: "🐑", value: 300, suffix: "+", label: "sacrifices réalisés" },
  { emoji: "🍽️", value: 9000, suffix: "+", label: "repas distribués" },
  { emoji: "👨‍👩‍👧‍👦", value: 1500, suffix: "+", label: "familles nourries" },
  { emoji: "⭐", value: 4.8, suffix: "/5", label: "satisfaction" },
];

function useCountUp(target: number, started: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isDecimal ? parseFloat((target * eased).toFixed(1)) : Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration, isDecimal]);

  return count;
}

function CounterCard({ item, started, index }: { item: CounterItem; started: boolean; index: number }) {
  const count = useCountUp(item.value, started);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center text-center px-6 py-8"
    >
      {/* Gold halo behind emoji */}
      <div className="relative mb-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gold/15 blur-md scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <span className="relative text-4xl md:text-5xl leading-none">{item.emoji}</span>
      </div>

      <span className="text-4xl md:text-5xl font-black text-primary leading-none tabular-nums font-inter">
        {item.value >= 1000 ? count.toLocaleString("fr-FR") : count}
        <span className="text-gold">{item.suffix}</span>
      </span>

      <span className="text-text-muted text-sm mt-3 font-medium uppercase tracking-wider">
        {item.label}
      </span>
    </motion.div>
  );
}

export default function ImpactCounters() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-bg-secondary section-padding" id="impact">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="NOTRE IMPACT CONCRET"
          accent="CONCRET"
          subtitle="Chaque sacrifice compte. Voici ce que nous avons accompli ensemble."
        />

        {/* Grille 4 colonnes centrées, avec séparateurs verticaux sur desktop */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-0 md:divide-x md:divide-primary/10 place-items-stretch max-w-5xl mx-auto">
          {counters.map((item, i) => (
            <CounterCard key={item.label} item={item} started={isInView} index={i} />
          ))}
        </div>

        <InlineCTA
          text="Ajouter votre impact — 140€"
          subtitle="Chaque sacrifice compte."
        />
      </div>
    </section>
  );
}
