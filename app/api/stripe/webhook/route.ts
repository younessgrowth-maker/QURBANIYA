import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendOrderConfirmation } from "@/lib/resend";
import { CURRENT_YEAR } from "@/lib/constants";
import { generateReferralCode } from "@/lib/referral-server";
import type { Order } from "@/types";

// ─── Génération du code parrain unique (anti-collision) ────────────
// Espace 30^6 ≈ 729M combinaisons, collision quasi-impossible. On boucle
// max 5x au cas où, sinon on log et on continue sans code (la commande
// reste valide, le client n'aura juste pas de code à partager).
async function assignReferralCode(
  supabase: ReturnType<typeof createServiceRoleClient>,
  orderId: string
): Promise<string | null> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateReferralCode();
    const { error } = await supabase
      .from("orders")
      .update({ referral_code: code })
      .eq("id", orderId)
      .is("referral_code", null);
    if (!error) return code;
    // 23505 = unique violation → collision, retry. Autre = on abandonne.
    if ((error as { code?: string }).code !== "23505") {
      console.error("Referral code assign failed:", error);
      return null;
    }
  }
  console.error("Referral code assign: 5 collisions, abandon. order:", orderId);
  return null;
}

// ─── Attribution commission affilié ────────────────────────────────
// Si la commande payée porte un code affilié ET que cet affilié est
// APPROUVÉ, on enregistre une conversion `pending` (commission = snapshot
// du barème de l'affilié). AUCUN versement : l'admin paie à la main puis
// marque `paid`. La contrainte unique(order_id) rend l'opération idempotente
// (retry webhook → pas de double commission). Échec non-bloquant : la
// commande reste valide même si l'attribution échoue.
async function attributeAffiliateCommission(
  supabase: ReturnType<typeof createServiceRoleClient>,
  orderId: string,
  affiliateCode: string | null | undefined
): Promise<void> {
  if (!affiliateCode) return;
  const { data: affiliate, error: affErr } = await supabase
    .from("affiliates")
    .select("id, commission_eur, approved")
    .eq("code", affiliateCode)
    .maybeSingle();

  if (affErr) {
    console.error("Affiliate lookup failed:", affiliateCode, affErr);
    return;
  }
  // Code inconnu ou affilié non approuvé → pas de commission (silencieux).
  if (!affiliate || !affiliate.approved) return;

  const { error: insErr } = await supabase
    .from("affiliate_conversions")
    .insert({
      affiliate_id: affiliate.id,
      order_id: orderId,
      commission_eur: affiliate.commission_eur,
      status: "pending",
    });

  // 23505 = unique(order_id) violation → conversion déjà créée (retry
  // webhook), c'est normal et idempotent. Toute autre erreur = log.
  if (insErr && (insErr as { code?: string }).code !== "23505") {
    console.error("Affiliate conversion insert failed:", orderId, insErr);
  }
}

// ─── Rédemption promo retour client (usage unique) ─────────────────
// Quand une commande payée porte une promo retour client (self_promo),
// on enregistre la rédemption (email normalisé, saison). La contrainte
// unique(email, season) rend l'opération idempotente (retry webhook → pas
// de double ligne) et matérialise le verrou d'usage unique. Échec non
// bloquant : la commande reste valide.
async function recordSelfPromoRedemption(
  supabase: ReturnType<typeof createServiceRoleClient>,
  order: {
    id: string;
    email?: string | null;
    season?: number | null;
    self_promo_amount?: number | null;
  }
): Promise<void> {
  const amount = order.self_promo_amount ?? 0;
  if (amount <= 0 || !order.email || !order.season) return;

  const { error } = await supabase.from("self_promo_redemptions").insert({
    email: order.email.trim().toLowerCase(),
    season: order.season,
    order_id: order.id,
    amount_eur: amount,
  });

  // 23505 = unique(email, season) → déjà enregistré (retry), idempotent.
  if (error && (error as { code?: string }).code !== "23505") {
    console.error("Self-promo redemption insert failed:", order.id, error);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const supabase = createServiceRoleClient();

    // ─── Idempotency: bloquer les retry Stripe ───
    // Stripe peut renvoyer le même event (timeout, 5xx transitoire). On marque
    // l'event_id comme traité AVANT tout side effect. Un PK conflict (23505)
    // = duplicate, on retourne 200 pour éviter d'autres retry.
    const { error: idempError } = await supabase
      .from("stripe_webhook_events")
      .insert({ event_id: event.id, event_type: event.type });

    if (idempError) {
      if (idempError.code === "23505") {
        // Already processed — return 200, Stripe stops retrying.
        console.log(`Stripe webhook duplicate skipped: ${event.id} (${event.type})`);
        return NextResponse.json({ received: true, idempotent: true });
      }
      // Autre erreur DB: fail-closed pour que Stripe retry
      console.error("Idempotency insert failed:", idempError);
      return NextResponse.json(
        { error: "Idempotency check failed" },
        { status: 500 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        // ─── Calcul du discount réel à partir du montant payé Stripe ───
        // Notre DB stocke `amount = 140€` (le prix unitaire tarif) au moment de
        // la création de l'order. Le total facial = `amount × quantity`. Le
        // client peut avoir appliqué un code promo Stripe (allow_promotion_codes)
        // ou un coupon parrainage, ce qui réduit `session.amount_total`. On
        // synchronise `discount_amount` avec la réalité Stripe pour que
        // /confirmation + email affichent le bon montant payé.
        //
        // On lit `quantity` depuis session.metadata (set au create) plutôt que
        // depuis la DB, parce que la commande n'est pas encore fetched à ce
        // stade. Fallback 1 si métadata absente (commandes pre-0018).
        const qtyFromMeta = parseInt(
          session.metadata?.quantity ?? "1",
          10
        );
        const qty = Number.isFinite(qtyFromMeta) && qtyFromMeta >= 1
          ? qtyFromMeta
          : 1;
        const amountTotalCents = session.amount_total ?? 0;
        const amountPaidEuros = Math.round(amountTotalCents / 100);
        const calculatedDiscount = Math.max(0, 140 * qty - amountPaidEuros);

        // Conditional update : on ne passe à 'paid' que si la commande est
        // encore 'pending'. Si elle est déjà 'paid' (race condition entre
        // 2 events ou retry qui aurait quand même passé l'idempotency check),
        // .single() retourne PGRST116 et on skip les side effects.
        const { data: order, error: updateError } = await supabase
          .from("orders")
          .update({
            payment_status: "paid",
            discount_amount: calculatedDiscount,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_session_id", session.id)
          .eq("payment_status", "pending")
          .select()
          .single();

        if (updateError || !order) {
          // PGRST116 = "no rows" → commande déjà paid (skip silencieux)
          // Autre erreur → log mais on rend 200 pour ne pas bloquer Stripe
          if (updateError && updateError.code !== "PGRST116") {
            console.error("Order update failed on completed:", session.id, updateError);
          } else {
            console.log(`Order already paid or not found: ${session.id}`);
          }
          return NextResponse.json({ received: true });
        }

        // Multi-moutons : décrémente N slots (quantity de la commande, défaut 1).
        // On préfère lire depuis la DB (source de vérité après insert) mais on
        // fallback sur la métadata si le champ n'existe pas (migration 0018
        // pas appliquée).
        const dbQty =
          (order as { quantity?: number }).quantity ?? qty;
        let rpcError: { message: string } | null = null;
        const { error: rpcByError } = await supabase.rpc("decrement_slots_by", {
          target_year: CURRENT_YEAR,
          n: dbQty,
        });
        if (rpcByError) {
          // Si decrement_slots_by n'existe pas (migration pas appliquée),
          // on retombe sur l'ancienne, appelée dbQty fois.
          console.warn(
            "decrement_slots_by failed, falling back to decrement_slots × qty:",
            rpcByError.message
          );
          for (let i = 0; i < dbQty; i++) {
            const { error: legacyErr } = await supabase.rpc("decrement_slots", {
              target_year: CURRENT_YEAR,
            });
            if (legacyErr) {
              rpcError = legacyErr;
              break;
            }
          }
        }
        if (rpcError) {
          console.error("Inventory decrement failed:", rpcError);
        }

        // ─── Parrainage : générer le code de CE client (qu'il pourra partager)
        // Échec non-bloquant : la commande reste valide même sans code.
        const referralCode = await assignReferralCode(supabase, order.id);
        const orderWithCode = referralCode
          ? { ...order, referral_code: referralCode }
          : order;

        try {
          await sendOrderConfirmation(orderWithCode as Order);
          // Trace succès en DB pour que /admin sache que c'est OK.
          await supabase
            .from("orders")
            .update({
              confirmation_email_sent_at: new Date().toISOString(),
              confirmation_email_error: null,
            })
            .eq("id", order.id);
        } catch (emailError) {
          // Trace échec en DB (message tronqué, pas la stack) pour qu'un
          // admin puisse relancer manuellement depuis /admin.
          const msg =
            emailError instanceof Error
              ? emailError.message.slice(0, 200)
              : "unknown error";
          console.error("Confirmation email failed:", msg);
          await supabase
            .from("orders")
            .update({ confirmation_email_error: msg })
            .eq("id", order.id);
        }

        // Attribution affilié (non-bloquant, idempotent). Ne touche ni
        // le prix, ni l'email, ni le statut de la commande.
        try {
          await attributeAffiliateCommission(
            supabase,
            order.id,
            (order as { affiliate_code?: string | null }).affiliate_code
          );
        } catch (affError) {
          console.error(
            "Affiliate attribution error:",
            affError instanceof Error ? affError.message : "unknown"
          );
        }

        // Promo retour client : matérialise l'usage unique (non-bloquant,
        // idempotent). Ne touche ni le prix, ni l'email, ni le statut.
        try {
          await recordSelfPromoRedemption(
            supabase,
            order as {
              id: string;
              email?: string | null;
              season?: number | null;
              self_promo_amount?: number | null;
            }
          );
        } catch (spError) {
          console.error(
            "Self-promo redemption error:",
            spError instanceof Error ? spError.message : "unknown"
          );
        }

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        const { error: updateError } = await supabase
          .from("orders")
          .update({ payment_status: "failed", updated_at: new Date().toISOString() })
          .eq("stripe_session_id", session.id)
          .eq("payment_status", "pending");

        if (updateError && updateError.code !== "PGRST116") {
          console.error("Order update failed on expired:", session.id, updateError);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 }
    );
  }
}
