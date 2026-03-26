import type { Variants, Transition } from "framer-motion";

// ── Easing ──
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ── Durations ──
export const DURATION = {
  fast: 0.15,
  base: 0.25,
  medium: 0.5,
  slow: 0.6,
  slower: 0.7,
} as const;

// ── Shared transition ──
export const smoothTransition: Transition = {
  duration: DURATION.slow,
  ease: EASE_OUT_EXPO,
};

// ── Scroll Reveal Variants ──

/** Fade up (cards, blocks) — translateY 24px → 0 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Fade up subtle — translateY 16px → 0 */
export const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE_OUT_EXPO },
  },
};

/** Fade in + slide from left (section titles) — translateX -20px → 0 */
export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Fade in + slide from right */
export const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Fade in + scale (images, illustrations) — scale 0.95 → 1 */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Stagger parent — use with children that have their own variants */
export function staggerContainer(staggerMs = 120): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerMs / 1000,
      },
    },
  };
}

/** Stagger child — fade up */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE_OUT_EXPO },
  },
};

/** Stagger child — fade slide left */
export const staggerChildLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.medium, ease: EASE_OUT_EXPO },
  },
};

// ── Viewport config ──
export const viewportOnce = { once: true, margin: "-60px" as const };
export const viewportOnceClose = { once: true, margin: "-40px" as const };
