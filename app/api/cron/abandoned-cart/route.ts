import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { sendAbandonedCartReminder } from "@/lib/resend";
import type { Order } from "@/types";

// Cron Vercel — relance les paniers Stripe abandonnés.
// - Cherche les orders payment_status='pending' créés entre 1h et 24h
//   (avant 1h : laisse au client le temps de payer ; au-delà de 24h la
//   session Stripe est expirée et `session.status !== "open"` filtre).
// - Envoie un seul email de relance par commande (reminder_sent_at).
// - Récupère l'URL Stripe Checkout encore valide pour repasser direct au paiement.
//
// Sécurisé par le header Authorization: Bearer $CRON_SECRET (Vercel Cron
// le définit automatiquement à partir de la variable d'env CRON_SECRET).
//
// FIX 26/05 : la fenêtre était [now-23h, now-1h] et l'exclusion "déjà payé"
// ne couvrait pas les `refunded`. Conséquences :
//   1. Les commandes créées entre 23h et 24h passaient à travers (Stripe
//      session encore valide mais cron les ratait).
//   2. Un client remboursé recevait un email de relance avec un lien Stripe
//      actif → re-paiement involontaire possible. On filtre maintenant
//      `paid` OU `refunded` dans le check de session payée existante.

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
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const { data: candidates, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "pending")
    .eq("payment_method", "stripe")
    .is("reminder_sent_at", null)
    .lte("created_at", oneHourAgo)
    .gte("created_at", twentyFourHoursAgo);

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
      // ─── Skip si ce client a DÉJÀ une commande payée OU remboursée ───
      // Cas typique : le client crée 3 commandes pending (clic sans payer),
      // puis finit par payer via une 4ème commande. Sans cette vérif, le
      // cron envoie 3 emails "vous avez abandonné" alors qu'il a déjà
      // payé. On marque la pending obsolète comme failed pour ne plus la
      // repasser au cron suivant + assainir les KPIs admin.
      //
      // On inclut `refunded` car un client remboursé qui recevrait un
      // email de relance avec lien Stripe encore "open" pourrait re-payer
      // par accident → litige garanti.
      const { data: alreadyPaid } = await supabase
        .from("orders")
        .select("id")
        .ilike("email", order.email)
        .in("payment_status", ["paid", "refunded"])
        .limit(1)
        .maybeSingle();

      if (alreadyPaid) {
        await supabase
          .from("orders")
          .update({
            payment_status: "failed",
            reminder_sent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", order.id)
          .eq("payment_status", "pending");
        skipped++;
        continue;
      }

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
