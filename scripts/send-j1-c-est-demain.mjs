// ─── J-1 "C'est demain" — relance ultime base 2025 non-acheteur 2026 ─────
// 26 mai 2026 — Aïd dans <24h. Cible : 69 anciens clients 2025 qui n'ont
// PAS racheté cette année (rétention 26.6% = 73% à reconquérir).
//
// Vérifications croisées AVANT envoi (idempotent) :
//   1. Exclusion stricte des 2026 paid (cross-check Supabase live)
//   2. Exclusion des 2026 failed/pending (relancés hier soir J-2)
//   3. Skip si déjà envoyé ce round (log local)
//
// Le mail précédent (extra-places, 14/05) avait touché ces 69 → c'est leur
// 2e email en 13 jours, donc anti-spam acceptable. On s'arrête là, pas de 3e.
//
// Usage :
//   node scripts/send-j1-c-est-demain.mjs            # dry-run
//   node scripts/send-j1-c-est-demain.mjs --send     # envoi réel

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS_DIR = path.join(__dirname, ".logs");
const LOG_FILE = path.join(LOGS_DIR, "j1-c-est-demain-email.json");
const BASE_FILE = "/Users/youssefmrabet/Downloads/base-2025-contacts.json";

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
const SLEEP_MS = 280;

const FROM_EMAIL = "Qurbaniya <noreply@qurbaniya.fr>";
const REPLY_TO = "support@qurbaniya.fr";
const ORDER_LINK = "https://qurbaniya.fr/commander";

// ─── Template ────────────────────────────────────────────────────────────
function emailTemplate(prenom) {
  return {
    subject: `${prenom}, c'est demain — 26 moutons restants`,
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
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;">Demain mercredi 27 mai, l'Aïd al-Adha sera célébré in shâ Allah.</p>
    <p style="margin:0 0 20px 0;font-size:15px;line-height:1.7;">Il reste seulement <strong>26 moutons disponibles</strong> avant que les réservations ne ferment cette nuit à <strong>3h du matin</strong>.</p>
    <p style="margin:0 0 20px 0;font-size:15px;line-height:1.7;">Si vous n'avez pas encore réservé, c'est maintenant ou jamais — le cheikh part dès demain matin pour le sacrifice.</p>
    <p style="text-align:center;margin:28px 0;">
      <a href="${ORDER_LINK}" style="display:inline-block;background:#2D6A4F;color:#FFFFFF;text-decoration:none;font-weight:bold;padding:14px 32px;border-radius:8px;font-size:15px;">Réserver mon mouton</a>
    </p>
    <p style="margin:24px 0 8px 0;font-size:14px;line-height:1.6;color:#6B7280;">Pour toute question, répondez à ce mail — je m'en occupe perso.</p>
    <p style="margin:16px 0 0 0;font-size:15px;line-height:1.6;">— Youness, fondateur Qurbaniya</p>
  </td></tr>
  <tr><td style="padding:24px 32px;border-top:1px solid #E5DFD3;font-size:12px;color:#6B7280;text-align:center;">
    <a href="mailto:${REPLY_TO}" style="color:#2D6A4F;">${REPLY_TO}</a>
  </td></tr>
</table></td></tr></table></body></html>`,
    text: `Salam ${prenom},

Demain mercredi 27 mai, l'Aïd al-Adha sera célébré in shâ Allah.

Il reste seulement 26 moutons disponibles avant que les réservations ne ferment cette nuit à 3h du matin.

Si vous n'avez pas encore réservé, c'est maintenant ou jamais — le cheikh part dès demain matin pour le sacrifice.

Réserver mon mouton : ${ORDER_LINK}

Pour toute question, répondez à ce mail — je m'en occupe perso.

— Youness, fondateur Qurbaniya`,
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

  // 1. Tous les emails déjà payés ou pending/failed 2026 → exclusion
  const { data: orders2026, error: e1 } = await supabase
    .from("orders")
    .select("email,payment_status");
  if (e1) {
    console.error("❌ Fetch orders failed:", e1.message);
    process.exit(1);
  }
  const excludedEmails = new Set(
    orders2026
      .filter((o) => ["paid", "pending", "failed"].includes(o.payment_status))
      .map((o) => (o.email || "").trim().toLowerCase())
      .filter(Boolean)
  );

  // 2. Base 2025 avec email
  if (!fs.existsSync(BASE_FILE)) {
    console.error(`❌ Fichier base 2025 introuvable : ${BASE_FILE}`);
    process.exit(1);
  }
  const base = JSON.parse(fs.readFileSync(BASE_FILE, "utf8"));
  const contacts = base.contacts_with_email || [];

  // 3. Filtre : exclu si dans orders 2026 (paid/pending/failed)
  const filtered = contacts.filter((c) => {
    const e = (c.email || "").trim().toLowerCase();
    return e && !excludedEmails.has(e);
  });

  return filtered.map((c) => ({
    identifier: (c.email || "").trim().toLowerCase(),
    email: c.email,
    prenom: c.first_name || "Salam",
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
  console.log(`\n🔥 J-1 "C'est demain" — base 2025 non-acheteur 2026`);
  console.log(`   send=${SEND}${LIMIT ? ` limit=${LIMIT}` : ""}${ONLY ? ` only=${ONLY}` : ""}\n`);

  let recipients = await getRecipients();
  console.log(`📋 ${recipients.length} contacts éligibles après cross-check Supabase`);

  if (ONLY) {
    recipients = recipients.filter((r) => r.identifier === ONLY);
    console.log(`   → filtré --only ${ONLY} : ${recipients.length}`);
  }

  const sent = loadSent();
  const before = recipients.length;
  recipients = recipients.filter((r) => !sent.has(r.identifier));
  console.log(`   → ${before - recipients.length} déjà envoyés ce round (skip log), ${recipients.length} à traiter`);

  if (LIMIT) {
    recipients = recipients.slice(0, LIMIT);
    console.log(`   → limit ${LIMIT} appliqué`);
  }

  if (!SEND) {
    console.log(`\n🧪 DRY-RUN — aucun envoi. Premiers 10 destinataires :`);
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
