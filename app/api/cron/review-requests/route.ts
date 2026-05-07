import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendReviewRequest } from "@/lib/resend";
import type { Order } from "@/types";

// Cron Vercel — relance les clients pour un avis Google J+3 après réception
// de la vidéo. Une seule relance par commande grâce à review_request_sent_at.
//
// Critères d'éligibilité:
//   - video_sent_at NOT NULL
//   - video_sent_at < now() - 3 days  (laisse le temps de regarder la vidéo)
//   - video_sent_at > now() - 30 days (ne ressuscite pas des vieux clients)
//   - review_request_sent_at IS NULL  (jamais relancé)
//   - payment_status = 'paid'
//
// Sécurisé par le header Authorization: Bearer $CRON_SECRET (Vercel Cron
// le définit automatiquement).

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceRoleClient();
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { data: candidates, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "paid")
    .is("review_request_sent_at", null)
    .lte("video_sent_at", threeDaysAgo)
    .gte("video_sent_at", thirtyDaysAgo);

  if (error) {
    console.error("[cron/review-requests] DB query failed:", error.message);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const orders = (candidates as Order[]) ?? [];
  let sent = 0;
  let skipped = 0;
  const errors: { id: string; reason: string }[] = [];

  for (const order of orders) {
    if (!order.email) {
      skipped++;
      continue;
    }
    try {
      await sendReviewRequest(order);
      await supabase
        .from("orders")
        .update({ review_request_sent_at: new Date().toISOString() })
        .eq("id", order.id);
      sent++;
    } catch (err) {
      const msg = err instanceof Error ? err.message.slice(0, 200) : "unknown error";
      console.error(`[cron/review-requests] failed for ${order.id}:`, msg);
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
