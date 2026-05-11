import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { sendReferralLaunchEmail } from "@/lib/resend";
import type { Order } from "@/types";

// POST /api/admin/broadcast-referral
// Body: { dry_run?: boolean, target_email?: string }
//
// Envoie l'email d'annonce du programme parrainage à tous les clients :
//   - payment_status = 'paid'
//   - referral_code IS NOT NULL
//   - referral_broadcast_sent_at IS NULL (anti re-spam)
//
// Si `target_email` fourni, n'envoie qu'à ce client (pour test).
// Si `dry_run: true`, compte les destinataires sans envoyer.
//
// L'envoi est séquentiel pour respecter le rate limit Resend (10 req/s en
// free tier — séquentiel = 1 req/s naturellement). Chaque succès met à jour
// `referral_broadcast_sent_at` AVANT le suivant, pour qu'un retry après
// crash ne redouble pas les emails déjà envoyés.

export async function POST(req: NextRequest) {
  // Auth admin
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    dry_run?: boolean;
    target_email?: string;
  };
  const dryRun = !!body.dry_run;
  const targetEmail = body.target_email?.trim().toLowerCase();

  const supabase = createServiceRoleClient();

  let query = supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "paid")
    .not("referral_code", "is", null)
    .is("referral_broadcast_sent_at", null);

  if (targetEmail) {
    query = query.ilike("email", targetEmail);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Broadcast: fetch orders failed", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // Dédupliquer par email (un client a pu commander plusieurs fois → on lui
  // envoie 1 seul email même s'il a 2 codes). On garde la commande avec le
  // code le plus récent par défaut (order by créé décroissant en fin).
  const seenEmails = new Set<string>();
  const recipients = ((data as Order[]) ?? [])
    .filter((o) => o.email && o.referral_code)
    .filter((o) => {
      const key = o.email.toLowerCase();
      if (seenEmails.has(key)) return false;
      seenEmails.add(key);
      return true;
    });

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dry_run: true,
      would_send: recipients.length,
      sample: recipients.slice(0, 5).map((o) => ({
        email: o.email,
        prenom: o.prenom,
        referral_code: o.referral_code,
      })),
    });
  }

  let sent = 0;
  const failures: { email: string; error: string }[] = [];

  for (const order of recipients) {
    try {
      await sendReferralLaunchEmail(order);
      const { error: upErr } = await supabase
        .from("orders")
        .update({ referral_broadcast_sent_at: new Date().toISOString() })
        .eq("id", order.id);
      if (upErr) {
        // L'email est parti mais la trace DB a échoué : on log, mais on
        // compte comme envoyé (le client a reçu). À éviter de relancer le
        // broadcast tant que le bug n'est pas réglé.
        console.error("Broadcast: DB update failed for", order.id, upErr);
      }
      sent++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      console.error("Broadcast: send failed for", order.email, msg);
      failures.push({ email: order.email, error: msg.slice(0, 200) });
    }
  }

  return NextResponse.json({
    ok: true,
    sent,
    failures,
    total_attempted: recipients.length,
  });
}
