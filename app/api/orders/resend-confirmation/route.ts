import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendOrderConfirmation } from "@/lib/resend";
import type { Order } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("stripe_session_id", session_id)
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
