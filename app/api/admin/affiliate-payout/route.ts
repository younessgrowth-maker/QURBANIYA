import { NextRequest, NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  createServiceRoleClient,
} from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// POST /api/admin/affiliate-payout
// Body: { affiliate_id: string, dry_run?: boolean }
//
// Marque TOUTES les conversions `pending` d'un affilié comme `paid`
// (paid_at = now). À utiliser APRÈS avoir effectué le virement à la main.
//
// Le système ne verse JAMAIS d'argent : cette route ne fait que mettre à
// jour le statut comptable. Idempotent : le filtre `status = 'pending'`
// garantit qu'un double-clic ne repaye pas et ne change pas paid_at des
// conversions déjà soldées.

export async function POST(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    affiliate_id?: string;
    dry_run?: boolean;
  };
  const affiliateId = body.affiliate_id;
  const dryRun = !!body.dry_run;

  if (!affiliateId) {
    return NextResponse.json(
      { error: "affiliate_id requis" },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  const { data: pending, error: pendErr } = await supabase
    .from("affiliate_conversions")
    .select("id, commission_eur")
    .eq("affiliate_id", affiliateId)
    .eq("status", "pending");

  if (pendErr) {
    console.error("Affiliate payout: fetch pending failed", pendErr);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const count = pending?.length ?? 0;
  const totalEur = (pending ?? []).reduce(
    (sum, c) => sum + (c.commission_eur ?? 0),
    0
  );

  if (dryRun) {
    return NextResponse.json({ ok: true, dry_run: true, count, totalEur });
  }

  if (count === 0) {
    return NextResponse.json({ ok: true, count: 0, totalEur: 0 });
  }

  const { error: updErr, count: updated } = await supabase
    .from("affiliate_conversions")
    .update(
      { status: "paid", paid_at: new Date().toISOString() },
      { count: "exact" }
    )
    .eq("affiliate_id", affiliateId)
    .eq("status", "pending");

  if (updErr) {
    console.error("Affiliate payout: update failed", updErr);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    count: updated ?? count,
    totalEur,
  });
}
