// ─── Stock & Inventory ───
// Fallback utilisé si Supabase est injoignable.
// Source de vérité prod : table `inventory` Supabase (cf. lib/supabase/queries.ts getInventory).
// La landing page charge le stock live en SSR et le passe en props. Les widgets
// client autonomes (FloatingCTA, ExitIntentPopup, …) utilisent encore ce fallback —
// prochain sprint : endpoint public /api/inventory + adaptation.
const TOTAL = 200;
const RESERVED = 147;

export const STOCK = {
  total: TOTAL,
  reserved: RESERVED,
  remaining: TOTAL - RESERVED,
} as const;

// ─── Impact per sheep (source : Cheikh Omar, mars 2026) ───
export const MEALS_PER_SHEEP = 30;
export const FAMILIES_PER_SHEEP = 5;

// ─── Pricing ───
export const PRICE_AMOUNT = 140;
export const PRICE_DISPLAY = "140€";
export const PRICE_CENTS = 14000; // Stripe amount in cents

// ─── Historical stats (source of truth) ───
export const STATS = {
  sacrificesCompleted: 300,
  mealsDistributed: 9000,   // 300 × MEALS_PER_SHEEP
  familiesFed: 1500,        // 300 × FAMILIES_PER_SHEEP
  rating: 4.8,
  yearsExperience: 5,
  satisfactionRate: 100,
} as const;

// ─── Dates ───
export const AID_DATE = new Date("2026-05-27T06:00:00+01:00");
export const AID_YEAR = "2026";
export const CURRENT_YEAR = 2026;
