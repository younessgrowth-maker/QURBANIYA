// ─── Promo "retour client" (self-promo) — logique serveur ──────────
// Calcule le droit d'un client à utiliser SON PROPRE code de parrainage
// comme promo sur SA commande de l'édition courante, à partir de son
// activité de l'édition PRÉCÉDENTE (saison N-1).
//
// Règles (cf. migration 0021) :
//   - a commandé (payé) en saison N-1            → 10€
//   - a amené ≥1 filleul payant en saison N-1    → 20€ (remplace le 10€)
//   - sinon                                       → 0€ (non éligible)
//
// Usage unique : une rédemption max par (email, saison courante),
// matérialisée dans la table `self_promo_redemptions` (insérée au
// webhook après paiement). Verrou temporel naturel : l'éligibilité se
// recalcule à chaque édition sur l'activité de l'édition précédente, donc
// un code ne « vaut » que la saison qui suit l'activité qui l'a méritée.

import type { createServiceRoleClient } from "@/lib/supabase/server";
import {
  RETURNING_CUSTOMER_PROMO_EUR,
  RETURNING_REFERRER_PROMO_EUR,
} from "@/lib/referral";
import { escapeLike } from "@/lib/utils";

type ServiceClient = ReturnType<typeof createServiceRoleClient>;

export type SelfPromoEligibility = {
  /** Montant € applicable (0 si non éligible). */
  amountEur: number;
  /** Raison, pour debug/UX. */
  reason: "referrer" | "returning" | "not_eligible";
};

/**
 * Calcule le montant de promo retour client pour un email, en se basant
 * sur l'activité de la saison précédente (currentSeason - 1).
 *
 * Ne vérifie PAS l'usage unique (cf. hasRedeemedSelfPromo). Email
 * comparé en minuscules.
 */
export async function computeSelfPromo(
  supabase: ServiceClient,
  email: string,
  currentSeason: number
): Promise<SelfPromoEligibility> {
  const normalized = email.trim().toLowerCase();
  const previousSeason = currentSeason - 1;

  // 1. Récupérer les commandes payées de ce client en saison N-1 (+ leurs
  //    codes parrain, pour compter les filleuls). Match insensible à la casse
  //    via ilike. On échappe `%` et `_` (jokers LIKE) car ils sont légaux
  //    dans un email et provoqueraient un sur-matching.
  const likePattern = escapeLike(normalized);
  const { data: prevOrders, error: prevErr } = await supabase
    .from("orders")
    .select("referral_code")
    .ilike("email", likePattern)
    .eq("season", previousSeason)
    .eq("payment_status", "paid");

  if (prevErr) {
    console.error("computeSelfPromo prevOrders failed:", prevErr.message);
    return { amountEur: 0, reason: "not_eligible" };
  }

  // Pas de commande payée la saison précédente → aucun droit.
  if (!prevOrders || prevOrders.length === 0) {
    return { amountEur: 0, reason: "not_eligible" };
  }

  // 2. A-t-il amené ≥1 filleul payant en saison N-1 ? On compte les
  //    commandes payées de N-1 dont `referred_by_code` est l'un de ses codes.
  const ownCodes = prevOrders
    .map((o) => (o as { referral_code: string | null }).referral_code)
    .filter((c): c is string => !!c);

  if (ownCodes.length > 0) {
    const { count, error: filleulErr } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .in("referred_by_code", ownCodes)
      .eq("season", previousSeason)
      .eq("payment_status", "paid");

    if (filleulErr) {
      console.error("computeSelfPromo filleul count failed:", filleulErr.message);
      // Fail-closed : ça touche à l'argent. Sur erreur DB on refuse la
      // remise (0€) plutôt que d'accorder un palier non vérifié.
      return { amountEur: 0, reason: "not_eligible" };
    } else if ((count ?? 0) >= 1) {
      return { amountEur: RETURNING_REFERRER_PROMO_EUR, reason: "referrer" };
    }
  }

  // 3. A commandé mais pas de filleul → palier de base.
  return { amountEur: RETURNING_CUSTOMER_PROMO_EUR, reason: "returning" };
}

/**
 * Vrai si ce client a déjà utilisé sa promo retour client pour la saison
 * donnée (usage unique). Fail-closed : en cas d'erreur DB on renvoie `true`
 * (= considéré déjà utilisé → pas de remise), car ça touche à l'argent ; on
 * préfère refuser une remise que d'en accorder une non vérifiable.
 */
export async function hasRedeemedSelfPromo(
  supabase: ServiceClient,
  email: string,
  season: number
): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const { data, error } = await supabase
    .from("self_promo_redemptions")
    .select("id")
    .eq("email", normalized)
    .eq("season", season)
    .maybeSingle();

  if (error) {
    console.error("hasRedeemedSelfPromo failed:", error.message);
    return true;
  }
  return !!data;
}
