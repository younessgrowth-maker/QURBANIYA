import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { sendAidReminder } from "@/lib/resend";
import type { Order } from "@/types";

// Re-envoi manuel du rappel J-X (sendAidReminder) à une commande payée.
// Utile pour les commandes dont l'aid_reminder a été envoyé avec un
// template buggé (ex: avant le fix multi-mouton de PR #125), ou pour
// les SAV (client signale qu'il n'a rien reçu).
//
// Auth admin uniquement.

export const dynamic = "force-dynamic";

const schema = z.object({
  order_id: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { data: order, error: fetchErr } = await supabase
    .from("orders")
    .select("*")
    .eq("id", parsed.data.order_id)
    .maybeSingle();

  if (fetchErr || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.payment_status !== "paid") {
    return NextResponse.json({ error: "Order not paid" }, { status: 400 });
  }

  try {
    await sendAidReminder(order as Order);

    // Met à jour aid_reminder_sent_at pour idempotency
    await supabase
      .from("orders")
      .update({ aid_reminder_sent_at: new Date().toISOString() })
      .eq("id", order.id);

    return NextResponse.json({
      ok: true,
      sent_to: order.email,
      order_id: order.id,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
