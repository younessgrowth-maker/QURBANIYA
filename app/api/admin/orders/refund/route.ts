import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { getStripe } from "@/lib/stripe";
import { CURRENT_YEAR } from "@/lib/constants";
import type { Order } from "@/types";

// POST /api/admin/orders/refund
// Body: { order_id: string, reason?: string }
//
// Émet un remboursement Stripe ET libère le slot d'inventaire.
// Idempotency: la contrainte unique sur stripe_refund_id empêche un
// double-refund même en cas de double-click.

export async function POST(req: NextRequest) {
  // Auth admin
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { order_id, reason } = await req.json();
    if (!order_id) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    const typed = order as Order;

    if (typed.payment_status === "refunded") {
      return NextResponse.json(
        { error: "Order already refunded" },
        { status: 409 }
      );
    }
    if (typed.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Only paid orders can be refunded" },
        { status: 409 }
      );
    }
    if (!typed.stripe_session_id) {
      return NextResponse.json(
        { error: "No Stripe session ID — cannot refund automatically" },
        { status: 422 }
      );
    }

    const stripe = getStripe();

    // Récupérer le payment_intent de la session pour émettre le refund.
    const session = await stripe.checkout.sessions.retrieve(typed.stripe_session_id);
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Stripe session has no payment_intent" },
        { status: 422 }
      );
    }

    // Émettre le refund. Stripe gère lui-même l'idempotency au niveau du
    // payment_intent (un PI ne peut pas être remboursé plus que le montant
    // capturé).
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: "requested_by_customer",
      metadata: {
        order_id: typed.id,
        admin_email: user.email ?? "",
        reason: reason?.slice(0, 200) ?? "",
      },
    });

    // Mettre à jour la commande en DB. Le .eq('payment_status','paid') joue
    // le rôle de garde-fou conditionnel : si entre-temps quelqu'un d'autre
    // a déjà refundé, on ne re-write pas par-dessus.
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: "refunded",
        refunded_at: new Date().toISOString(),
        refund_reason: reason?.slice(0, 500) ?? null,
        stripe_refund_id: refund.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", typed.id)
      .eq("payment_status", "paid");

    if (updateError) {
      // Le refund Stripe est passé, mais la DB est désynchronisée.
      // On loggue + on retourne 500 pour alerter l'admin manuellement.
      console.error("Refund DB update failed:", updateError.message);
      return NextResponse.json(
        {
          error: "Refund emitted but DB update failed",
          refund_id: refund.id,
        },
        { status: 500 }
      );
    }

    // Libérer le slot d'inventaire (decrement reserved_slots si > 0).
    // Pas critique si ça rate (les slots ne sont pas une vérité absolue,
    // juste un compteur d'affichage), donc on log mais on ne casse pas
    // la réponse au client.
    const { data: inv } = await supabase
      .from("inventory")
      .select("reserved_slots")
      .eq("year", CURRENT_YEAR)
      .single();
    if (inv && inv.reserved_slots > 0) {
      const { error: invErr } = await supabase
        .from("inventory")
        .update({ reserved_slots: inv.reserved_slots - 1 })
        .eq("year", CURRENT_YEAR);
      if (invErr) {
        console.error("Inventory release failed:", invErr.message);
      }
    }

    return NextResponse.json({
      ok: true,
      refund_id: refund.id,
      amount_refunded: refund.amount,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Admin refund error:", err.name, err.message);
      return NextResponse.json(
        { error: "Refund failed", detail: err.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
