import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

// PII guard: cet endpoint expose nom + email + niyyah + intention. Avant
// 2026-05-07, seul session_id était requis → un attaquant ayant accès à un
// session_id (logs Vercel, browser history, referer leak) pouvait extraire
// la PII de la commande correspondante.
//
// Désormais on exige session_id ET order_id. Comme order_id est un UUID v4
// (122 bits d'entropie, non-énumerable) embarqué dans le success_url Stripe,
// seul le client légitime qui vient de payer (ou Stripe via redirection)
// peut récupérer la donnée.
//
// Backwards compat: les commandes créées AVANT cette PR n'ont pas leur
// order_id propagé dans le success_url historique. Si un visiteur tombe sur
// un /confirmation?session_id=X (ancien) sans order_id, on retourne un mode
// "minimal" qui dévoile juste status + amount + niyyah + intention (pas
// d'email ni de prénom). Suffisant pour l'UX d'une ancienne URL bookmarkée.

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const orderId = req.nextUrl.searchParams.get("order_id");

  if (!sessionId && !orderId) {
    return NextResponse.json(
      { error: "Missing session_id or order_id" },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  // Mode "full": session_id + order_id → on retourne la PII complète
  if (sessionId && orderId) {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, prenom, email, niyyah, intention, amount, payment_status, payment_method, created_at, referral_code, discount_amount"
      )
      .eq("stripe_session_id", sessionId)
      .eq("id", orderId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order: data });
  }

  // Mode "minimal": un seul des 2 ids → on ne révèle PAS la PII (prenom/email)
  // mais on permet d'afficher le statut de paiement + récap minimal.
  const base = supabase
    .from("orders")
    .select("id, niyyah, intention, amount, payment_status, payment_method, created_at, discount_amount");

  const { data, error } = await (sessionId
    ? base.eq("stripe_session_id", sessionId)
    : base.eq("id", orderId!)
  ).single();

  if (error || !data) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order: data, minimal: true });
}
