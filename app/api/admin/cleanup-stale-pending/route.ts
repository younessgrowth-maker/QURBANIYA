import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// POST /api/admin/cleanup-stale-pending
// Body: { dry_run?: boolean }
//
// Nettoie les commandes `pending` obsolètes : celles dont l'email a
// AUSSI une commande `paid`. Ces pending sont des "doublons" créés
// quand un client clique "Finaliser" plusieurs fois avant de payer
// effectivement (typiquement 2-3 tentatives Stripe avant le succès).
//
// Action : les passe à `payment_status = 'failed'`, ce qui :
//   - les rend invisibles dans le funnel "à relancer" du cron
//   - assainit le taux de conversion affiché dans /admin
//   - conserve la donnée historique (pas de suppression)
//
// Idempotent : peut être relancé sans risque, la query exclut déjà les
// orders qui ont changé d'état entre-temps.

export async function POST(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as { dry_run?: boolean };
  const dryRun = !!body.dry_run;

  const supabase = createServiceRoleClient();

  // Trouver tous les `pending` dont l'email a aussi un `paid`
  // Stratégie : query séparée pour récupérer la liste des emails payés
  // (généralement < 100 emails), puis filtrer côté code. Plus simple
  // qu'une jointure côté Supabase et lisible.
  const { data: paidEmails, error: paidErr } = await supabase
    .from("orders")
    .select("email")
    .eq("payment_status", "paid");

  if (paidErr) {
    console.error("Cleanup: fetch paid emails failed", paidErr);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const paidEmailSet = new Set(
    (paidEmails ?? []).map((r) => r.email.toLowerCase()).filter(Boolean)
  );

  if (paidEmailSet.size === 0) {
    return NextResponse.json({
      ok: true,
      dry_run: dryRun,
      stale: 0,
      cleaned: 0,
    });
  }

  const { data: pendings, error: pendErr } = await supabase
    .from("orders")
    .select("id, email, prenom, created_at, stripe_session_id")
    .eq("payment_status", "pending");

  if (pendErr) {
    console.error("Cleanup: fetch pending failed", pendErr);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const stale = (pendings ?? []).filter((o) =>
    paidEmailSet.has((o.email ?? "").toLowerCase())
  );

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dry_run: true,
      stale: stale.length,
      sample: stale.slice(0, 8).map((o) => ({
        id: o.id,
        email: o.email,
        prenom: o.prenom,
        created_at: o.created_at,
      })),
    });
  }

  if (stale.length === 0) {
    return NextResponse.json({ ok: true, stale: 0, cleaned: 0 });
  }

  // Update en batch via .in() — Supabase gère jusqu'à ~1000 IDs sans problème.
  // Le .eq('payment_status', 'pending') joue le rôle de garde conditionnel
  // pour ne pas écraser une commande qui aurait changé d'état entre-temps.
  const ids = stale.map((o) => o.id);
  const { error: updErr, count } = await supabase
    .from("orders")
    .update(
      {
        payment_status: "failed",
        reminder_sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { count: "exact" }
    )
    .in("id", ids)
    .eq("payment_status", "pending");

  if (updErr) {
    console.error("Cleanup: update failed", updErr);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    stale: stale.length,
    cleaned: count ?? 0,
  });
}
