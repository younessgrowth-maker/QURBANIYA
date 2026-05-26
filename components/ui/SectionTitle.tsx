"use client";

import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface SectionTitleProps {
  title: string;
  accent?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionTitle({
  title,
  accent,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [highlightVisible, setHighlightVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHighlightVisible(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const renderTitle = () => {
    if (!accent) return title;
    const parts = title.split(accent);
    if (parts.length === 1) return title;
    return (
      <>
        {parts[0]}
        <span className={cn("text-primary highlight-accent", highlightVisible && "is-visible")}>
          {accent}
        </span>
        {parts[1]}
      </>
    );
  };

  // BUG FIX 26/05 — Sections home invisibles :
  // L'animation `initial={{opacity:0}} whileInView` causait des stuck
  // opacity:0 sur de nombreuses sections de la home (ProblemSolution,
  // HowItWorks, ImpactCalculator, Sheikh, ComparisonTable, WhyActNow).
  // Comme SectionTitle est utilisé par TOUTES les sections, le bug
  // touchait au moins 11 éléments par section. Sur scroll lent, sur
  // mobile bas-de-gamme ou avec scroll programmatique, IntersectionObserver
  // ne déclenchait pas l'animation et le titre + le sous-titre restaient
  // invisibles. Fix : passer directement à l'état final (pas d'animation
  // d'entrée). La sous-animation `highlight-accent` du span gold reste.
  return (
    <div
      ref={ref}
      className={cn(
        align === "center" ? "text-center" : "text-left",
        "mb-14",
        className
      )}
    >
      <h2
        className={cn(
          "font-playfair font-bold tracking-tight",
          "text-3xl md:text-4xl lg:text-[2.75rem]",
          "leading-[1.1]",
          "text-text-primary"
        )}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-muted text-base md:text-lg max-w-2xl leading-relaxed font-light mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
