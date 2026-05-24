// ─── Relance "dernière chance" aux orders failed/pending non-converties ──
// One-shot script J-3 Aïd 2026. Gisement identifié : 46 clients qui ont
// essayé d'acheter (failed ou pending) mais n'ont JAMAIS finalisé via une
// autre commande. Ce sont des leads chauds prouvés (intention forte) à
// activer une dernière fois avec un angle "100 places exceptionnelles".
//
// Logique :
//   1. fetch toutes les orders failed + pending
//   2. fetch tous les emails déjà payés (exclusion)
//   3. dédupliquer par email (garde la tentative la plus récente)
//   4. envoyer email "dernière chance" via Resend
//   5. log idempotence dans scripts/.logs/relance-failed-email.json
//
// Usage :
//   node scripts/send-relance-failed.mjs [--send] [--limit N] [--only email]
// Par défaut --dry-run.
//
// Env requis : RESEND_API_KEY + NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS_DIR = path.join(__dirname, ".logs");
const LOG_FILE = path.join(LOGS_DIR, "relance-failed-email.json");

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith("--")) {
      const key = cur.replace(/^--/, "");
      const next = arr[i + 1];
      if (!next || next.startsWith("--")) acc.push([key, true]);
      else acc.push([key, next]);
    }
    return acc;
  }, [])
);
const SEND = !!args.send;
const LIMIT = args.limit ? parseInt(args.limit, 10) : null;
const ONLY = args.only ? String(args.only).toLowerCase() : null;
const SLEEP_MS = 250;

const FROM_EMAIL = "Qurbaniya <noreply@qurbaniya.fr>";
const REPLY_TO = "support@qurbaniya.fr";
const ORDER_LINK = "https://qurbaniya.fr/commander";

// ─── Templates ───────────────────────────────────────────────────────────
function emailTemplate(prenom, daysAgo) {
  // Adapte un poil le ton selon l'ancienneté de la tentative
  const dayLabel =
    daysAgo < 1 ? "tout à l'heure" : daysAgo === 1 ? "hier" : `il y a ${daysAgo} jours`;

  return {
    subject: `${prenom}, votre place pour l'Aïd 2026 vous attend toujours`,
    html: `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F7F3ED;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1F2937;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
  <tr><td style="padding:32px 32px 16px 32px;text-align:center;">
    <div style="font-size:24px;font-weight:bold;color:#2D6A4F;letter-spacing:0.5px;">QURBANIYA</div>
  </td></tr>
  <tr><td style="padding:0 32px 8px 32px;">
    <h1 style="margin:0 0 16px 0;font-size:22px;color:#1F2937;line-height:1.3;">Salam ${prenom},</h1>
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;">J'ai vu que vous aviez commencé une réservation pour l'Aïd al-Adha 2026 <strong>${dayLabel}</strong>, sans la finaliser.</p>
    <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;">Bonne nouvelle : notre fournisseur vient de nous libérer <strong>100 moutons supplémentaires</strong>. Il reste donc des places jusqu'au <strong>mercredi 27 mai 3h du matin</strong>, quelques heures avant le sacrifice — c'est vraiment la dernière fenêtre.</p>
    <div style="background:#F7F3ED;border:1px solid #E5DFD3;border-radius:8px;padding:18px 20px;margin:18px 0;text-align:center;">
      <p style="margin:0;font-size:14px;line-height:1.7;">🐑 Sacrifice mercredi 27 mai<br>📹 Vidéo nominative WhatsApp<br><strong>140 € tout inclus</strong></p>
    </div>
    <p style="text-align:center;margin:24px 0;">
      <a href="${ORDER_LINK}" style="display:inline-block;background:#2D6A4F;color:#FFFFFF;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:8px;font-size:15px;">Finaliser ma réservation</a>
    </p>
    <p style="margin:24px 0 8px 0;font-size:14px;line-height:1.6;color:#6B7280;">Si vous avez eu un blocage technique au paiement (carte refusée, PayPal manquant, hésitation…) répondez simplement à ce mail, je gère personnellement.</p>
    <p style="margin:24px 0 0 0;font-size:15px;line-height:1.6;">— Le fondateur de Qurbaniya</p>
  </td></tr>
  <tr><td style="padding:24px 32px;border-top:1px solid #E5DFD3;font-size:12px;color:#6B7280;text-align:center;">
    Une question ? <a href="mailto:${REPLY_TO}" style="color:#2D6A4F;">${REPLY_TO}</a>
  </td></tr>
</table></td></tr></table></body></html>`,
    text: `Salam ${prenom},

J'ai vu que vous aviez commencé une réservation pour l'Aïd al-Adha 2026 ${dayLabel}, sans la finaliser.

Bonne nouvelle : notre fournisseur vient de nous libérer 100 moutons supplémentaires. Il reste donc des places jusqu'au mercredi 27 mai 3h du matin, quelques heures avant le sacrifice — c'est vraiment la dernière fenêtre.

🐑 Sacrifice mercredi 27 mai
📹 Vidéo nominative WhatsApp
140€ tout inclus

👉 Finaliser ma réservation : ${ORDER_LINK}

Si vous avez eu un blocage technique au paiement (carte refusée, PayPal manquant, hésitation…) répondez simplement à ce mail, je gère personnellement.

— Le fondateur de Qurbaniya`,
  };
}

// ─── Recipients ──────────────────────────────────────────────────────────
async function getRecipients() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis");
    process.exit(1);
  }
  const supabase = createClient(url, key);

  // 1. Tous les emails déjà payés
  const { data: paid, error: e1 } = await supabase
    .from("orders")
    .select("email")
    .eq("payment_status", "paid");
  if (e1) {
    console.error("❌ Fetch paid emails failed:", e1.message);
    process.exit(1);
  }
  const paidEmails = new Set(paid.map((o) => (o.email || "").toLowerCase()).filter(Boolean));

  // 2. Tous les failed + pending
  const { data: failed, error: e2 } = await supabase
    .from("orders")
    .select("id,prenom,email,created_at,payment_status")
    .in("payment_status", ["failed", "pending"])
    .order("created_at", { ascending: false });
  if (e2) {
    console.error("❌ Fetch failed/pending failed:", e2.message);
    process.exit(1);
  }

  // 3. Filtre exclusion (déjà payés) + dédup par email (garde le plus récent)
  const byEmail = new Map();
  for (const o of failed) {
    const e = (o.email || "").toLowerCase();
    if (!e || paidEmails.has(e)) continue;
    if (!byEmail.has(e) || o.created_at > byEmail.get(e).created_at) {
      byEmail.set(e, o);
    }
  }

  return Array.from(byEmail.values()).map((o) => ({
    identifier: (o.email || "").toLowerCase(),
    email: o.email,
    prenom: o.prenom || "Salam",
    created_at: o.created_at,
  }));
}

function loadSent() {
  if (!fs.existsSync(LOG_FILE)) return new Set();
  try {
    return new Set(JSON.parse(fs.readFileSync(LOG_FILE, "utf-8")).map((x) => x.identifier));
  } catch {
    return new Set();
  }
}

function appendSent(entry) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
  let arr = [];
  if (fs.existsSync(LOG_FILE)) {
    try {
      arr = JSON.parse(fs.readFileSync(LOG_FILE, "utf-8"));
    } catch {
      arr = [];
    }
  }
  arr.push({ ...entry, sent_at: new Date().toISOString() });
  fs.writeFileSync(LOG_FILE, JSON.stringify(arr, null, 2));
}

async function sendEmail(recipient) {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const daysAgo = Math.floor(
    (Date.now() - new Date(recipient.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );
  const tpl = emailTemplate(recipient.prenom, daysAgo);
  const res = await resend.emails.send({
    from: FROM_EMAIL,
    to: [recipient.email],
    replyTo: REPLY_TO,
    subject: tpl.subject,
    html: tpl.html,
    text: tpl.text,
  });
  if (res.error) throw new Error(`Resend: ${res.error.message ?? "unknown"}`);
  return { id: res.data?.id };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

(async () => {
  console.log(`\n🔥 Relance failed/pending — derniers leads chauds`);
  console.log(`   send=${SEND}${LIMIT ? ` limit=${LIMIT}` : ""}${ONLY ? ` only=${ONLY}` : ""}\n`);

  let recipients = await getRecipients();
  console.log(`📋 ${recipients.length} clients failed/pending non-payés identifiés`);

  if (ONLY) {
    recipients = recipients.filter((r) => r.identifier === ONLY);
    console.log(`   → filtré --only ${ONLY} : ${recipients.length}`);
  }

  const sent = loadSent();
  const before = recipients.length;
  recipients = recipients.filter((r) => !sent.has(r.identifier));
  console.log(`   → ${before - recipients.length} déjà relancés (skip via log), ${recipients.length} à traiter`);

  if (LIMIT) {
    recipients = recipients.slice(0, LIMIT);
    console.log(`   → limit ${LIMIT} appliqué`);
  }

  if (!SEND) {
    console.log(`\n🧪 DRY-RUN — aucun envoi. Premiers 10 destinataires :`);
    recipients.slice(0, 10).forEach((r, i) => {
      const days = Math.floor((Date.now() - new Date(r.created_at).getTime()) / 86400000);
      console.log(`   ${i + 1}. ${r.identifier} (${r.prenom}, J-${days})`);
    });
    console.log(`\n   Pour envoyer pour de vrai : relance avec --send`);
    return;
  }

  console.log(`\n🚀 ENVOI RÉEL — ${recipients.length} messages, sleep ${SLEEP_MS}ms\n`);
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < recipients.length; i++) {
    const r = recipients[i];
    const tag = `[${i + 1}/${recipients.length}]`;
    try {
      const result = await sendEmail(r);
      appendSent({
        identifier: r.identifier,
        prenom: r.prenom,
        provider_id: result.id ?? null,
      });
      ok++;
      console.log(`${tag} ✅ ${r.identifier}`);
    } catch (e) {
      fail++;
      console.log(`${tag} ❌ ${r.identifier} — ${e instanceof Error ? e.message : "unknown"}`);
    }
    if (i < recipients.length - 1) await sleep(SLEEP_MS);
  }

  console.log(`\n📊 Bilan : ${ok} envoyés · ${fail} échecs · log → ${LOG_FILE}`);
})().catch((e) => {
  console.error("\n💥 Crash:", e);
  process.exit(1);
});
