import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { sendAbandonedCartReminder } from "@/lib/resend";
import type { Order } from "@/types";

// Cron Vercel — relance les paniers Stripe abandonnés.
// - Cherche les orders payment_status='pending' créés entre 1h et 23h
//   (avant 1h : laisse au client le temps de payer ; après 23h : Stripe
//   session expirée, mieux vaut re-créer un parcours).
// - Envoie un seul email de relance par commande (reminder_sent_at).
// - Récupère l'URL Stripe Checkout encore valide pour repasser direct au paiement.
//
// Sécurisé par le header Authorization: Bearer $CRON_SECRET (Vercel Cron
// le définit automatiquement à partir de la variable d'env CRON_SECRET).

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceRoleClient();
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000).toISOString();

  const { data: candidates, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "pending")
    .eq("payment_method", "stripe")
    .is("reminder_sent_at", null)
    .lte("created_at", oneHourAgo)
    .gte("created_at", twentyThreeHoursAgo);

  if (error) {
    console.error("[cron/abandoned-cart] DB query failed:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const orders = (candidates as Order[]) ?? [];
  let sent = 0;
  let skipped = 0;
  const errors: { id: string; reason: string }[] = [];

  const stripe = getStripe();

  for (const order of orders) {
    if (!order.stripe_session_id || !order.email) {
      skipped++;
      continue;
    }
    try {
      const session = await stripe.checkout.sessions.retrieve(order.stripe_session_id);
      // Skip si la session a déjà bougé (paid/expired) — le webhook s'en occupe.
      if (session.status !== "open" || session.payment_status === "paid") {
        skipped++;
        continue;
      }
      const resumeUrl = session.url;
      if (!resumeUrl) {
        skipped++;
        continue;
      }

      await sendAbandonedCartReminder(order, resumeUrl);

      await supabase
        .from("orders")
        .update({ reminder_sent_at: new Date().toISOString() })
        .eq("id", order.id);

      sent++;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`[cron/abandoned-cart] failed for ${order.id}:`, msg);
      errors.push({ id: order.id, reason: msg });
    }
  }

  return NextResponse.json({
    ok: true,
    candidates: orders.length,
    sent,
    skipped,
    errors,
  });
}
