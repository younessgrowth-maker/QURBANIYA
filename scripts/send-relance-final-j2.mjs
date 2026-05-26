// ─── Relance "J-2 ultime" — 2e vague aux failed/pending non-converties ───
// 25 mai 2026 — Aïd dans 2 jours. Une 1ère vague a tourné le 24/05 sur les
// 46 failed/pending d'alors. Depuis on a nettoyé la liste (doublons +
// ceux qui ont finalement payé), il reste ~47 vrais leads chauds.
//
// Ce script est volontairement SÉPARÉ du précédent (send-relance-failed)
// pour deux raisons :
//   1. Message court "J-2 dépêchez-vous" différent du précédent (cooldown
//      anti-spam — pas 2x la même creative en 24h)
//   2. Log indépendant (.logs/relance-final-j2.json) → idempotent même si
//      on relance plusieurs fois ce script
//
// Logique identique au précédent : fetch failed+pending, exclut paid,
// dédup par email, envoie via Resend.
//
// Usage :
//   node scripts/send-relance-final-j2.mjs --send
// Par défaut --dry-run.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS_DIR = path.join(__dirname, ".logs");
const LOG_FILE = path.join(LOGS_DIR, "relance-final-j2.json");

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

// ─── Template — court, sans emoji, urgence stock + J-2 ───────────────────
function emailTemplate(prenom) {
  return {
    subject: `${prenom}, plus que 2 jours — il reste très peu de moutons`,
    html: `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F7F3ED;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1F2937;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
  <tr><td style="padding:32px 32px 16px 32px;text-align:center;">
    <div style="font-size:24px;font-weight:bold;color:#2D6A4F;letter-spacing:0.5px;">QURBANIYA</div>
  </td></tr>
  <tr><td style="padding:0 32px 24px 32px;">
    <h1 style="margin:0 0 16px 0;font-size:22px;color:#1F2937;line-height:1.3;">Salam ${prenom},</h1>
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;">Plus que <strong>2 jours</strong> avant l'Aïd al-Adha, et il ne reste quasiment plus de moutons disponibles.</p>
    <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;">Vous aviez tenté de réserver récemment. Si c'est encore d'actualité, c'est vraiment maintenant ou jamais — les dernières places vont partir dans la journée.</p>
    <p style="text-align:center;margin:24px 0;">
      <a href="${ORDER_LINK}" style="display:inline-block;background:#2D6A4F;color:#FFFFFF;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:8px;font-size:15px;">Réserver mon mouton</a>
    </p>
    <p style="margin:24px 0 8px 0;font-size:14px;line-height:1.6;color:#6B7280;">Un blocage technique ou une question ? Répondez à ce mail, je gère personnellement.</p>
    <p style="margin:16px 0 0 0;font-size:15px;line-height:1.6;">— Youness, fondateur Qurbaniya</p>
  </td></tr>
  <tr><td style="padding:24px 32px;border-top:1px solid #E5DFD3;font-size:12px;color:#6B7280;text-align:center;">
    <a href="mailto:${REPLY_TO}" style="color:#2D6A4F;">${REPLY_TO}</a>
  </td></tr>
</table></td></tr></table></body></html>`,
    text: `Salam ${prenom},

Plus que 2 jours avant l'Aïd al-Adha, et il ne reste quasiment plus de moutons disponibles.

Vous aviez tenté de réserver récemment. Si c'est encore d'actualité, c'est vraiment maintenant ou jamais — les dernières places vont partir dans la journée.

Réserver mon mouton : ${ORDER_LINK}

Un blocage technique ou une question ? Répondez à ce mail, je gère personnellement.

— Youness, fondateur Qurbaniya`,
  };
}

async function getRecipients() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis");
    process.exit(1);
  }
  const supabase = createClient(url, key);

  const { data: paid, error: e1 } = await supabase
    .from("orders")
    .select("email")
    .eq("payment_status", "paid");
  if (e1) {
    console.error("❌ Fetch paid emails failed:", e1.message);
    process.exit(1);
  }
  const paidEmails = new Set(paid.map((o) => (o.email || "").toLowerCase()).filter(Boolean));

  const { data: failed, error: e2 } = await supabase
    .from("orders")
    .select("id,prenom,email,created_at,payment_status")
    .in("payment_status", ["failed", "pending"])
    .order("created_at", { ascending: false });
  if (e2) {
    console.error("❌ Fetch failed/pending failed:", e2.message);
    process.exit(1);
  }

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
  const tpl = emailTemplate(recipient.prenom);
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  console.log(`\n🔥 Relance FINAL J-2 — 2e vague ultime`);
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
  console.log(`   → ${before - recipients.length} déjà relancés ce round (skip log), ${recipients.length} à traiter`);

  if (LIMIT) {
    recipients = recipients.slice(0, LIMIT);
    console.log(`   → limit ${LIMIT} appliqué`);
  }

  if (!SEND) {
    console.log(`\n🧪 DRY-RUN — aucun envoi. Premiers 10 :`);
    recipients.slice(0, 10).forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.identifier} (${r.prenom})`);
    });
    console.log(`\n   Pour envoyer pour de vrai : --send`);
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
      appendSent({ identifier: r.identifier, prenom: r.prenom, provider_id: result.id ?? null });
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
