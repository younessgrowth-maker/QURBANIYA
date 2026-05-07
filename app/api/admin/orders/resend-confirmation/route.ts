import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { sendOrderConfirmation } from "@/lib/resend";
import type { Order } from "@/types";

// POST /api/admin/orders/resend-confirmation
// Body: { order_id: string }
//
// Endpoint admin-only pour relancer l'email de confirmation d'une commande.
// Différent de /api/orders/resend-confirmation (côté client, basé sur
// session_id) — celui-ci accepte order_id et exige une session admin.
//
// Met à jour confirmation_email_sent_at / confirmation_email_error en DB
// pour que la liste de commandes /admin reflète le nouvel état.

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
    const { order_id } = await req.json();
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

    if (order.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Order is not paid yet" },
        { status: 409 }
      );
    }

    try {
      await sendOrderConfirmation(order as Order);
      await supabase
        .from("orders")
        .update({
          confirmation_email_sent_at: new Date().toISOString(),
          confirmation_email_error: null,
        })
        .eq("id", order.id);
      return NextResponse.json({ ok: true });
    } catch (sendErr) {
      const msg =
        sendErr instanceof Error
          ? sendErr.message.slice(0, 200)
          : "unknown error";
      await supabase
        .from("orders")
        .update({ confirmation_email_error: msg })
        .eq("id", order.id);
      return NextResponse.json(
        { error: "Resend failed", detail: msg },
        { status: 500 }
      );
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Admin resend-confirmation error:", err.name, err.message);
    } else {
      console.error("Admin resend-confirmation error: unknown");
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
