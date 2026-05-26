"use client";

import { useEffect } from "react";

/**
 * Safety net pour 2 bugs J-1 production :
 *
 * 1. Éléments Framer Motion stuck à opacity:0 (bug observé sur la home
 *    via audit Chrome MCP — ProblemSolution 11 éléments, HowItWorks 11,
 *    ImpactCalculator 2, Sheikh 3). Pattern `initial={{opacity:0}}
 *    whileInView` qui ne déclenche pas l'animation à cause de race
 *    conditions IntersectionObserver + hydration.
 *
 * 2. ChunkLoadError après redéploiement Vercel. Quand un visiteur a
 *    chargé la page avant un deploy puis navigue côté client (push
 *    state), Next.js tente de fetch un chunk JS dont le hash a changé
 *    → erreur, page d'erreur React. Common Next.js issue. Fix : on
 *    catch l'erreur globalement et on full-reload pour récupérer le
 *    nouveau manifest.
 */
export default function FramerMotionFallback() {
  useEffect(() => {
    // ─── Bug 1 : Framer Motion stuck ───────────────────────────────
    const FALLBACK_DELAY_MS = 3000;
    const id = setTimeout(() => {
      const stuck = document.querySelectorAll<HTMLElement>('[style*="opacity"]');
      let fixed = 0;
      stuck.forEach((el) => {
        const op = parseFloat(getComputedStyle(el).opacity);
        if (op < 0.05) {
          el.style.opacity = "1";
          el.style.transform = "none";
          fixed++;
        }
      });
      if (fixed > 0 && process.env.NODE_ENV !== "production") {
        console.warn(`[FramerMotionFallback] fixed ${fixed} stuck element(s)`);
      }
    }, FALLBACK_DELAY_MS);

    // ─── Bug 2 : ChunkLoadError → full reload ───────────────────────
    // On évite les boucles de reload via sessionStorage : si on a déjà
    // tenté un reload pour cause de chunk error dans cette session,
    // on n'essaie pas une 2e fois (sinon boucle si vraie panne réseau).
    const onChunkError = (event: ErrorEvent | PromiseRejectionEvent) => {
      const err = ("reason" in event ? event.reason : event.error) as unknown;
      const msg = err instanceof Error ? err.message : String(err || "");
      const isChunkError =
        msg.includes("ChunkLoadError") || msg.includes("Loading chunk");
      if (!isChunkError) return;
      const reloadKey = "__qrb_chunk_reload";
      if (sessionStorage.getItem(reloadKey)) return; // déjà tenté
      sessionStorage.setItem(reloadKey, "1");
      // Délai court pour laisser les autres handlers tourner d'abord
      setTimeout(() => window.location.reload(), 200);
    };
    window.addEventListener("error", onChunkError);
    window.addEventListener("unhandledrejection", onChunkError);

    return () => {
      clearTimeout(id);
      window.removeEventListener("error", onChunkError);
      window.removeEventListener("unhandledrejection", onChunkError);
    };
  }, []);
  return null;
}
