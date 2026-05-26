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
    // Cause racine : `CSSTransition` (créée par framer-motion via transition
    // CSS) qui reste à `playState: running, currentTime: 0` indéfiniment.
    // `getComputedStyle.opacity = 0` même si on force `style.opacity = 1
    // !important` (l'animation override). Fix : appeler `.finish()` sur
    // les animations stuck.
    //
    // Stratégie : scan multi-passes (1.5s, 3s, 6s) car les sections en
    // dessous du fold peuvent passer à l'état stuck quand l'IntersectionObserver
    // se déclenche au scroll (donc APRÈS le 1er scan). Plus un scan déclenché
    // par scroll (throttlé), pour couvrir les sections révélées tardivement.
    function rescue() {
      const all = document.querySelectorAll<HTMLElement>("body *");
      let fixed = 0;
      all.forEach((el) => {
        const op = parseFloat(getComputedStyle(el).opacity);
        if (op >= 0.95) return;
        if ((el.textContent || "").trim().length < 5) return;
        try {
          el.getAnimations().forEach((a) => {
            try { a.finish(); } catch { /* déjà finie */ }
          });
        } catch { /* getAnimations non supporté */ }
        el.style.opacity = "1";
        el.style.transform = "none";
        fixed++;
      });
      if (fixed > 0 && process.env.NODE_ENV !== "production") {
        console.warn(`[FramerMotionFallback] rescued ${fixed} stuck element(s)`);
      }
    }

    const passes = [setTimeout(rescue, 1500), setTimeout(rescue, 3000), setTimeout(rescue, 6000)];

    // Scroll-triggered scan (throttlé à 500ms) — couvre les sections
    // qui deviennent stuck quand IntersectionObserver les active après scroll.
    let scrollTimer: number | undefined;
    const onScroll = () => {
      if (scrollTimer) return;
      scrollTimer = window.setTimeout(() => {
        scrollTimer = undefined;
        rescue();
      }, 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

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
      passes.forEach((p) => clearTimeout(p));
      if (scrollTimer) clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("error", onChunkError);
      window.removeEventListener("unhandledrejection", onChunkError);
    };
  }, []);
  return null;
}
