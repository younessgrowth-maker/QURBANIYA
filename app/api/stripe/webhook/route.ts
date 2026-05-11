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
        // Notre DB stocke `amount = 140€` (le prix tarif) au moment de la
        // création de l'order. Le client peut avoir appliqué un code promo
        // Stripe (allow_promotion_codes=true) ou un coupon parrainage, ce
        // qui réduit le `session.amount_total`. On synchronise `discount_amount`
        // avec la réalité Stripe pour que /confirmation + email affichent
        // le bon montant payé.
        const amountTotalCents = session.amount_total ?? 0;
        const amountPaidEuros = Math.round(amountTotalCents / 100);
        const calculatedDiscount = Math.max(0, 140 - amountPaidEuros);

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

        const { error: rpcError } = await supabase.rpc("decrement_slots", {
          target_year: CURRENT_YEAR,
        });
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
