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

    // Émettre le refund. `idempotencyKey` = order_id : si la DB échoue après
    // ce refund (cf. plus bas) et que l'admin re-clique, Stripe renvoie le
    // MÊME refund au lieu d'en créer un second (clé valable 24h). En plus du
    // garde-fou PI (on ne rembourse pas plus que le montant capturé).
    const refund = await stripe.refunds.create(
      {
        payment_intent: paymentIntentId,
        reason: "requested_by_customer",
        metadata: {
          order_id: typed.id,
          admin_email: user.email ?? "",
          reason: reason?.slice(0, 200) ?? "",
        },
      },
      { idempotencyKey: `refund_${typed.id}` }
    );

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

    // Libérer les slots d'inventaire de façon ATOMIQUE via RPC (greatest(0,
    // reserved - n)) au lieu d'un read-modify-write applicatif sujet aux lost
    // updates. On libère `quantity` slots (commandes multi-mouton) sur la
    // saison de la commande. Non critique si ça rate (compteur d'affichage),
    // donc on log sans casser la réponse.
    const qtyToRelease = typed.quantity ?? 1;
    const releaseYear = typed.season ?? CURRENT_YEAR;
    const { error: invErr } = await supabase.rpc("release_slots", {
      target_year: releaseYear,
      n: qtyToRelease,
    });
    if (invErr) {
      console.error("Inventory release failed:", invErr.message);
    } else {
      console.log(`Inventory released: -${qtyToRelease} slot(s) for refund ${typed.id}`);
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
