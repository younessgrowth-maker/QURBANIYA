import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { normalizePhone, sendWhatsAppText, referralLaunchMessage } from "@/lib/whatsapp";
import type { Order } from "@/types";

// POST /api/admin/broadcast-whatsapp
// Body: { dry_run?: boolean, target_phone?: string }
//
// Envoie via Whapi le message d'annonce du programme parrainage à tous
// les clients :
//   - payment_status = 'paid'
//   - referral_code IS NOT NULL
//   - telephone IS NOT NULL et non vide
//   - whatsapp_broadcast_sent_at IS NULL (anti re-spam)
//
// Dédup par téléphone normalisé (un client avec 2 commandes = 1 seul WA).
// Envoi séquentiel avec délai ~800ms pour ressembler à un usage humain et
// éviter la détection de spam côté WhatsApp.

export const dynamic = "force-dynamic";

// Pour les broadcasts longs : 39 messages × ~1s chacun = ~40s.
// On force le runtime Node pour avoir un timeout plus long (60s par défaut
// vs 10s en Edge).
export const maxDuration = 60;

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!process.env.WHAPI_TOKEN) {
    return NextResponse.json(
      { error: "WHAPI_TOKEN not configured on the server" },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => ({}))) as {
    dry_run?: boolean;
    target_phone?: string;
    test?: boolean;
  };
  const dryRun = !!body.dry_run;
  const targetPhone = body.target_phone ? normalizePhone(body.target_phone) : null;

  // ─── Mode test : bypass des filtres d'éligibilité ───
  // Envoie le message template avec un code factice "TESTAB" à un numéro
  // arbitraire (typiquement le numéro perso de l'admin pour vérifier que
  // Whapi est bien configuré). N'écrit RIEN en DB.
  if (body.test) {
    if (!targetPhone) {
      return NextResponse.json(
        { error: "target_phone required in test mode" },
        { status: 400 }
      );
    }
    try {
      const msg = referralLaunchMessage("Youness (test)", "TESTAB");
      const result = await sendWhatsAppText({ to: targetPhone, body: msg });
      return NextResponse.json({
        ok: true,
        test: true,
        sent_to: targetPhone,
        whapi_message_id: result.id,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      return NextResponse.json(
        { ok: false, test: true, error: msg },
        { status: 500 }
      );
    }
  }

  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "paid")
    .not("referral_code", "is", null)
    .not("telephone", "is", null)
    .neq("telephone", "")
    .is("whatsapp_broadcast_sent_at", null);

  if (error) {
    console.error("Broadcast WA: fetch failed", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // Dédup par téléphone normalisé. On garde l'order le plus récent (la
  // query est triée DESC par created_at via index DB par défaut → on
  // garde le premier rencontré).
  const seenPhones = new Set<string>();
  const recipients: Array<{ order: Order; phone: string }> = [];

  for (const o of (data as Order[]) ?? []) {
    if (!o.telephone || !o.referral_code) continue;
    const phone = normalizePhone(o.telephone);
    if (!phone) continue;
    if (targetPhone && phone !== targetPhone) continue;
    if (seenPhones.has(phone)) continue;
    seenPhones.add(phone);
    recipients.push({ order: o, phone });
  }

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dry_run: true,
      would_send: recipients.length,
      sample: recipients.slice(0, 5).map(({ order, phone }) => ({
        prenom: order.prenom,
        telephone_raw: order.telephone,
        phone_normalized: phone,
        referral_code: order.referral_code,
      })),
    });
  }

  let sent = 0;
  const failures: { phone: string; prenom: string; error: string }[] = [];

  for (const { order, phone } of recipients) {
    try {
      const msg = referralLaunchMessage(order.prenom, order.referral_code!);
      await sendWhatsAppText({ to: phone, body: msg });

      const { error: upErr } = await supabase
        .from("orders")
        .update({ whatsapp_broadcast_sent_at: new Date().toISOString() })
        .eq("id", order.id);
      if (upErr) {
        console.error("Broadcast WA: DB update failed for", order.id, upErr);
      }
      sent++;
      // Délai humain entre 2 envois pour éviter détection de spam.
      await sleep(800);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      console.error("Broadcast WA: send failed for", phone, msg);
      failures.push({ phone, prenom: order.prenom, error: msg.slice(0, 200) });
      // On continue malgré un échec individuel (numéro invalide, blacklist...)
      await sleep(300);
    }
  }

  return NextResponse.json({
    ok: true,
    sent,
    failures,
    total_attempted: recipients.length,
  });
}
