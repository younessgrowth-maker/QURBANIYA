import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendOrderConfirmation } from "@/lib/resend";
import type { Order } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { session_id, order_id } = await req.json();
    // On exige session_id ET order_id (UUID v4, 122 bits) : sans ça, un
    // session_id Stripe qui fuite (Referer, historique) suffirait à
    // déclencher un renvoi d'email et à exposer l'email du client. Exiger
    // l'order_id = preuve de possession de la commande (même garde que
    // /api/orders/by-session en mode "full").
    if (!session_id || !order_id) {
      return NextResponse.json(
        { error: "Missing session_id or order_id" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("stripe_session_id", session_id)
      .eq("id", order_id)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Paiement non encore confirmé. Réessayez dans quelques secondes." },
        { status: 409 }
      );
    }

    await sendOrderConfirmation(order as Order);
    return NextResponse.json({ ok: true, email: order.email });
  } catch (err) {
    console.error("Resend confirmation error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
