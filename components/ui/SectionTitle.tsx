"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { EASE_OUT_EXPO, DURATION } from "@/lib/animations";

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
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
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.medium, ease: EASE_OUT_EXPO, delay: 0.15 }}
          className="mt-4 text-text-muted text-base md:text-lg max-w-2xl leading-relaxed font-light mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
