"use client";

import { useEffect } from "react";

/**
 * Safety net contre les éléments Framer Motion stuck à opacity:0.
 *
 * Bug observé J-1 via audit Chrome MCP : sur de nombreuses sections de la
 * home (ProblemSolution 11 éléments, HowItWorks 11, ImpactCalculator 2,
 * Sheikh 3, etc.), des éléments `motion.div` avec `initial={{opacity:0}}
 * whileInView={{opacity:1}}` restaient stuck à opacity:0 même après
 * scroll. Cause probable : IntersectionObserver capricieux + race
 * condition framer-motion sur le path d'hydration. Pas reproductible
 * à 100% mais observé sur tous les viewports testés.
 *
 * Fix idéal : refactor des 9 composants concernés. Trop risqué J-1.
 *
 * Fix pragmatique (ce composant) : après 3s, on scan le DOM et on force
 * `opacity:1 transform:none` sur tous les `motion.X` stuck à opacity:0.
 * Si l'animation a fonctionné normalement (99% des cas), les éléments
 * sont déjà à opacity:1 et le scan ne fait rien. Si elle est stuck,
 * on garantit que le contenu reste lisible.
 *
 * Pourquoi 3s : laisse le temps aux animations légitimes (max
 * staggerChildren ~840ms + duration 700ms + marge IntersectionObserver).
 */
export default function FramerMotionFallback() {
  useEffect(() => {
    const FALLBACK_DELAY_MS = 3000;
    const id = setTimeout(() => {
      // Sélecteur : tous les éléments qui ont un style inline contenant
      // opacity:0 (typique de framer-motion qui injecte du style).
      const stuck = document.querySelectorAll<HTMLElement>('[style*="opacity"]');
      let fixed = 0;
      stuck.forEach((el) => {
        const op = parseFloat(getComputedStyle(el).opacity);
        if (op < 0.05) {
          // Garde les autres styles inline et force juste opacity + transform
          el.style.opacity = "1";
          el.style.transform = "none";
          fixed++;
        }
      });
      if (fixed > 0 && process.env.NODE_ENV !== "production") {
        console.warn(`[FramerMotionFallback] fixed ${fixed} stuck element(s)`);
      }
    }, FALLBACK_DELAY_MS);
    return () => clearTimeout(id);
  }, []);
  return null;
}
