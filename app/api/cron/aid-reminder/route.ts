import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendAidReminder } from "@/lib/resend";
import type { Order } from "@/types";

// Cron Vercel — envoie un rappel "sacrifice imminent + confirme WhatsApp"
// aux commandes payées non encore rappelées.
//
// - Cherche orders payment_status='paid' et aid_reminder_sent_at IS NULL
// - Marque aid_reminder_sent_at = now() après envoi (idempotent)
// - Fenêtre active : entre J-7 et J-1 inclus (sinon no-op, sauf override ?force=1)
//
// Sécurisé par Authorization: Bearer $CRON_SECRET (header injecté
// automatiquement par Vercel Cron à partir de la variable d'env).
//
// Déclenchement manuel possible :
//   curl -H "Authorization: Bearer $CRON_SECRET" \
//        https://qurbaniya.fr/api/cron/aid-reminder?force=1

export const dynamic = "force-dynamic";

// Aïd al-Adha 2026 — mercredi 27 mai 2026 (UTC midi pour éviter dérive TZ)
const AID_DATE = new Date("2026-05-27T12:00:00Z");

function daysUntilAid(now: Date): number {
  const ms = AID_DATE.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const days = daysUntilAid(now);
  const force = req.nextUrl.searchParams.get("force") === "1";

  // Fenêtre normale : J-7 → J-1. Hors fenêtre, no-op (l'année prochaine
  // le cron quotidien ne tirera que pendant cette semaine).
  if (!force && (days > 7 || days < 1)) {
    return NextResponse.json({
      ok: true,
      skipped: "outside-window",
      days_until_aid: days,
    });
  }

  const supabase = createServiceRoleClient();

  const { data: candidates, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "paid")
    .is("aid_reminder_sent_at", null);

  if (error) {
    console.error("[cron/aid-reminder] DB query failed:", error);
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
      await sendAidReminder(order);

      await supabase
        .from("orders")
        .update({ aid_reminder_sent_at: new Date().toISOString() })
        .eq("id", order.id)
        .is("aid_reminder_sent_at", null);

      sent++;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`[cron/aid-reminder] failed for ${order.id}:`, msg);
      errors.push({ id: order.id, reason: msg });
    }
  }

  return NextResponse.json({
    ok: true,
    days_until_aid: days,
    candidates: orders.length,
    sent,
    skipped,
    errors,
  });
}
