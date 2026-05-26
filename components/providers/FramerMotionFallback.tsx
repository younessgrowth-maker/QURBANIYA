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
    // Mise à jour de l'algo après audit Chrome MCP plus poussé :
    // La cause racine n'est PAS un simple `opacity: 0` inline figé. C'est
    // une `CSSTransition` (créée par framer-motion via transition CSS)
    // qui reste à `playState: running, currentTime: 0` indéfiniment —
    // probablement un timing/race condition de l'API Animation Web.
    // Conséquence : `getComputedStyle.opacity = 0` même si on force
    // `style.opacity = 1 !important` (l'animation override la valeur).
    //
    // Fix robuste : on appelle `.finish()` sur toutes les animations
    // stuck (currentTime 0 mais running). Ça avance la transition à
    // son état final → opacity:1 effective.
    const FALLBACK_DELAY_MS = 3000;
    const id = setTimeout(() => {
      const all = document.querySelectorAll<HTMLElement>("body *");
      let fixed = 0;
      all.forEach((el) => {
        const op = parseFloat(getComputedStyle(el).opacity);
        if (op >= 0.95) return; // déjà visible, on saute
        if ((el.textContent || "").trim().length < 5) return; // élément non textuel, on s'en fout

        // Force-fin de toutes les animations CSS / WAAPI en cours
        try {
          el.getAnimations().forEach((a) => {
            try { a.finish(); } catch { /* déjà finie */ }
          });
        } catch { /* getAnimations non supporté */ }

        // Force aussi opacity:1 inline en filet de sécurité supplémentaire
        el.style.opacity = "1";
        el.style.transform = "none";
        fixed++;
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
