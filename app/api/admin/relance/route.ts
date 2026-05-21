import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { getStripe } from "@/lib/stripe";
import { sendAbandonedCartReminder } from "@/lib/resend";
import { abandonedCartMessage, normalizePhone, sendWhatsAppText } from "@/lib/whatsapp";
import type { Order } from "@/types";

// POST /api/admin/relance
// Body:
//   { order_id: string }   → relance une seule commande pending
//   { all: true }          → relance toutes les commandes pending éligibles
//
// Pour chaque commande :
//   - Récupère la session Stripe (skip si expirée / payée)
//   - Envoie email (bloquant — l'admin attend la confirmation)
//   - Envoie WhatsApp (best-effort — un 401 Whapi ou un numéro invalide
//     ne doit pas faire échouer la relance email)
//   - Set reminder_sent_at = now() (idempotence côté cron auto)
//
// Garde-fous sur le mode 'all' :
//   - Délai 1.5s entre 2 commandes (WA-friendly)
//   - maxDuration = 60s (compatible plan Hobby) → suffisant pour ~10
//     commandes max ; au-delà on saute les plus anciennes (à re-cliquer)
//   - Échec individuel n'interrompt pas le batch

export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

interface RelanceResult {
  order_id: string;
  prenom: string;
  email_sent: boolean;
  wa_sent: boolean;
  wa_error?: string;
  skipped?: string;
}

async function relanceOne(
  order: Order,
  stripe: ReturnType<typeof getStripe>,
  supabase: ReturnType<typeof createServiceRoleClient>,
): Promise<RelanceResult> {
  const result: RelanceResult = {
    order_id: order.id,
    prenom: order.prenom,
    email_sent: false,
    wa_sent: false,
  };

  if (!order.stripe_session_id) {
    result.skipped = "no Stripe session";
    return result;
  }

  // Récupère la Stripe session pour avoir l'URL de reprise du checkout.
  let resumeUrl: string | null = null;
  try {
    const session = await stripe.checkout.sessions.retrieve(order.stripe_session_id);
    if (session.payment_status === "paid") {
      result.skipped = "already paid";
      return result;
    }
    if (session.status !== "open") {
      result.skipped = `session ${session.status}`;
      return result;
    }
    resumeUrl = session.url ?? null;
  } catch (e) {
    result.skipped = `Stripe retrieve failed: ${e instanceof Error ? e.message : "unknown"}`;
    return result;
  }

  if (!resumeUrl) {
    result.skipped = "no resume URL";
    return result;
  }

  // 1. Email (bloquant)
  try {
    await sendAbandonedCartReminder(order, resumeUrl);
    result.email_sent = true;
  } catch (e) {
    result.skipped = `email failed: ${e instanceof Error ? e.message : "unknown"}`;
    return result;
  }

  // 2. WhatsApp (best-effort — n'échoue pas la relance si Whapi 401 / restriction)
  const phone = normalizePhone(order.telephone);
  if (phone) {
    try {
      const body = abandonedCartMessage(order.prenom, resumeUrl);
      await sendWhatsAppText({ to: phone, body });
      result.wa_sent = true;
    } catch (e) {
      result.wa_error = e instanceof Error ? e.message.slice(0, 200) : "unknown";
    }
  } else {
    result.wa_error = "phone invalid";
  }

  // 3. Trace en DB
  await supabase
    .from("orders")
    .update({ reminder_sent_at: new Date().toISOString() })
    .eq("id", order.id);

  return result;
}

export async function POST(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    order_id?: string;
    all?: boolean;
  };

  const supabase = createServiceRoleClient();
  const stripe = getStripe();

  // ─── Mode 'single' ───
  if (body.order_id) {
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", body.order_id)
      .eq("payment_status", "pending")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
    if (!order) {
      return NextResponse.json({ error: "Order not found or not pending" }, { status: 404 });
    }

    const result = await relanceOne(order as Order, stripe, supabase);
    return NextResponse.json({ ok: true, result });
  }

  // ─── Mode 'all' ───
  if (!body.all) {
    return NextResponse.json({ error: "order_id or all=true required" }, { status: 400 });
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "pending")
    .eq("payment_method", "stripe")
    .not("stripe_session_id", "is", null)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const list = (orders as Order[]) ?? [];
  const results: RelanceResult[] = [];

  for (const o of list) {
    const r = await relanceOne(o, stripe, supabase);
    results.push(r);
    await sleep(1500);
  }

  return NextResponse.json({
    ok: true,
    total: results.length,
    email_sent: results.filter((r) => r.email_sent).length,
    wa_sent: results.filter((r) => r.wa_sent).length,
    skipped: results.filter((r) => r.skipped).length,
    results,
  });
}
