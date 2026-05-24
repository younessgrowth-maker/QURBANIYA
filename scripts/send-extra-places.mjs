// ─── Broadcast "100 places exceptionnelles débloquées" ─────────────────
// One-shot script J-3 Aïd 2026 (24-26 mai 2026).
//
// Cibles :
//   - clients2026 : 194 clients payés Aïd 2026 (query Supabase orders)
//     Angle : "partage ton code parrain" (15€ filleul / 20€ avoir parrain 2027)
//   - base2025    : ~94 emails / ~100 phones de l'ancienne base (JSON)
//     Angle : "places rouvertes, dernière fenêtre 48h"
//
// Canaux :
//   - email : Resend (1 req/sec naturel via sleep)
//   - wa    : Whapi (1 req/sec + jitter pour minimiser détection spam)
//
// Idempotence : chaque succès est append immédiatement dans un fichier log
// JSON local (scripts/.logs/extra-places-{audience}-{channel}.json). Un retry
// après crash skip automatiquement ceux déjà envoyés.
//
// Usage :
//   node scripts/send-extra-places.mjs \
//     --audience clients2026|base2025 \
//     --channel email|wa \
//     [--send] [--limit N] [--only email@example.com]
//
// Par défaut : --dry-run (n'envoie rien, liste juste les destinataires).
// Pour envoyer pour de vrai : ajouter --send
//
// Env vars requis :
//   - Pour email     : RESEND_API_KEY
//   - Pour wa        : WHAPI_TOKEN
//   - Pour clients2026 : NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS_DIR = path.join(__dirname, ".logs");

// ─── CLI args ────────────────────────────────────────────────────────────
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

const AUDIENCE = args.audience;
const CHANNEL = args.channel;
const SEND = !!args.send;
const LIMIT = args.limit ? parseInt(args.limit, 10) : null;
const ONLY = args.only ? String(args.only).toLowerCase() : null;

if (!["clients2026", "base2025"].includes(AUDIENCE)) {
  console.error("❌ --audience doit être clients2026 ou base2025");
  process.exit(1);
}
if (!["email", "wa"].includes(CHANNEL)) {
  console.error("❌ --channel doit être email ou wa");
  process.exit(1);
}

// ─── Constantes ──────────────────────────────────────────────────────────
const FROM_EMAIL = "Qurbaniya <noreply@qurbaniya.fr>";
const REPLY_TO = "support@qurbaniya.fr";
const ORDER_LINK = "https://qurbaniya.fr/commander";
const BASE_2025_EMAILS = "/Users/youssefmrabet/Downloads/base-2025-contacts.json";
const BASE_2025_PHONES = "/Users/youssefmrabet/Downloads/qurbaniya-base-2025-phones.json";
const WHAPI_BASE = "https://gate.whapi.cloud";
const SLEEP_MS = CHANNEL === "wa" ? 1200 : 250; // WA plus lent pour éviter re-flag

// ─── Templates ───────────────────────────────────────────────────────────

function emailLayoutClients(prenom, referralCode) {
  const refUrl = `https://qurbaniya.fr/?ref=${referralCode}`;
  return {
    subject: "100 places exceptionnelles débloquées — partage avec tes proches 🐑",
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
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;">Bonne nouvelle : notre fournisseur vient de nous libérer <strong>100 moutons supplémentaires</strong> pour l'Aïd 2026.</p>
    <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;">Les réservations étaient complètes ce matin — elles ré-ouvrent jusqu'au <strong>mercredi 27 mai 3h du matin</strong>, quelques heures avant le sacrifice.</p>
    <div style="background:#F7F3ED;border:1px solid #E5DFD3;border-radius:8px;padding:20px;margin:20px 0;">
      <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;">Si tu connais des proches qui attendaient pour réserver, partage-leur <strong>ton code parrain :</strong></p>
      <div style="text-align:center;font-size:28px;font-weight:bold;color:#B8860B;letter-spacing:3px;padding:8px 0;font-family:Menlo,Monaco,'Courier New',monospace;">${referralCode}</div>
      <ul style="margin:12px 0 0 0;padding-left:20px;font-size:14px;line-height:1.7;">
        <li><strong>-15 €</strong> pour eux sur leur commande</li>
        <li><strong>20 € d'avoir</strong> pour toi, à utiliser sur ta commande Aïd 2027</li>
      </ul>
    </div>
    <p style="text-align:center;margin:24px 0;">
      <a href="${refUrl}" style="display:inline-block;background:#2D6A4F;color:#FFFFFF;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:8px;font-size:15px;">Partager mon lien parrain</a>
    </p>
    <p style="margin:0 0 8px 0;font-size:13px;color:#6B7280;text-align:center;">Ton lien direct : <a href="${refUrl}" style="color:#2D6A4F;">qurbaniya.fr/?ref=${referralCode}</a></p>
    <p style="margin:24px 0 0 0;font-size:15px;line-height:1.6;">Qu'Allah accepte ton sacrifice et le leur.</p>
    <p style="margin:8px 0 0 0;font-size:15px;line-height:1.6;">— Le fondateur de Qurbaniya</p>
  </td></tr>
  <tr><td style="padding:24px 32px;border-top:1px solid #E5DFD3;font-size:12px;color:#6B7280;text-align:center;">
    Une question ? <a href="mailto:${REPLY_TO}" style="color:#2D6A4F;">${REPLY_TO}</a>
  </td></tr>
</table></td></tr></table></body></html>`,
    text: `Salam ${prenom},

Bonne nouvelle : notre fournisseur vient de nous libérer 100 moutons supplémentaires pour l'Aïd 2026.

Les réservations étaient complètes ce matin — elles ré-ouvrent jusqu'au mercredi 27 mai 3h du matin, quelques heures avant le sacrifice.

Si tu connais des proches qui attendaient pour réserver, partage-leur ton code parrain ${referralCode} :
- -15 € pour eux sur leur commande
- 20 € d'avoir pour toi, à utiliser sur ta commande Aïd 2027

Ton lien direct : ${refUrl}

Qu'Allah accepte ton sacrifice et le leur.
— Le fondateur de Qurbaniya`,
  };
}

function emailLayoutBase2025(prenom) {
  return {
    subject: "Aïd al-Adha 2026 — 100 places exceptionnelles rouvertes",
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
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;">J'espère que tu vas bien. L'an dernier, tu nous as confié ton sacrifice — qu'Allah l'ait accepté.</p>
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;">Pour l'Aïd 2026 (mercredi 27 mai), notre service était <strong>complet</strong> depuis ce matin. Notre fournisseur vient de libérer <strong>100 moutons exceptionnels</strong> — les réservations ré-ouvrent pour 48h seulement.</p>
    <div style="background:#F7F3ED;border:1px solid #E5DFD3;border-radius:8px;padding:20px;margin:20px 0;text-align:center;">
      <p style="margin:0;font-size:14px;line-height:1.7;">🐑 Sacrifice conforme à la Sounnah<br>📹 Vidéo nominative WhatsApp<br><strong>140 € tout inclus</strong></p>
    </div>
    <p style="text-align:center;margin:24px 0;">
      <a href="${ORDER_LINK}" style="display:inline-block;background:#2D6A4F;color:#FFFFFF;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:8px;font-size:15px;">Réserver ma place</a>
    </p>
    <p style="margin:24px 0 8px 0;font-size:14px;line-height:1.6;color:#6B7280;">Si tu as déjà réservé ailleurs cette année, transmets ce mail à un proche qui hésite — c'est vraiment la dernière fenêtre.</p>
    <p style="margin:24px 0 0 0;font-size:15px;line-height:1.6;">— Le fondateur de Qurbaniya</p>
  </td></tr>
  <tr><td style="padding:24px 32px;border-top:1px solid #E5DFD3;font-size:12px;color:#6B7280;text-align:center;">
    Pour ne plus recevoir ces emails, réponds simplement « stop » à ce message.
  </td></tr>
</table></td></tr></table></body></html>`,
    text: `Salam ${prenom},

J'espère que tu vas bien. L'an dernier, tu nous as confié ton sacrifice — qu'Allah l'ait accepté.

Pour l'Aïd 2026 (mercredi 27 mai), notre service était complet depuis ce matin. Notre fournisseur vient de libérer 100 moutons exceptionnels — les réservations ré-ouvrent pour 48h seulement.

🐑 Sacrifice conforme à la Sounnah · Vidéo nominative WhatsApp · 140 € tout inclus

👉 Réserver : ${ORDER_LINK}

Si tu as déjà réservé ailleurs cette année, transmets ce mail à un proche qui hésite — c'est vraiment la dernière fenêtre.

— Le fondateur de Qurbaniya

Pour ne plus recevoir ces emails, réponds simplement « stop ».`,
  };
}

function waMessageClients(prenom, referralCode) {
  return `Salam ${prenom} 🌙

Bonne nouvelle : on a débloqué *100 places en plus* pour l'Aïd 2026 (dernières 48h).

Partage ton code parrain à tes proches qui n'ont pas encore réservé :
• -15€ pour eux 🎁
• 20€ d'avoir pour toi sur l'Aïd 2027 🤝

👉 https://qurbaniya.fr/?ref=${referralCode}

Baraka Allahu fik 🙏`;
}

function waMessageBase2025(prenom) {
  return `Salam ${prenom} 🌙

C'est de la part de Qurbaniya. L'an dernier tu nous avais confié ton sacrifice 🙏

Pour l'Aïd 2026 on était complet ce matin — notre fournisseur vient de débloquer *100 places exceptionnelles* (48h restantes, l'Aïd est mercredi).

Réserve ici : https://qurbaniya.fr/commander

Pas intéressé ? Ignore ce message, je ne te recontacterai plus 🤝`;
}

// ─── Phone normalize (port de lib/whatsapp.ts) ───────────────────────────
function normalizePhone(raw) {
  if (!raw) return null;
  let p = String(raw).trim();
  if (p.startsWith("+")) p = p.slice(1);
  p = p.replace(/[^0-9]/g, "");
  if (p.startsWith("00")) p = p.slice(2);
  if (p.length === 10 && p.startsWith("0")) p = "33" + p.slice(1);
  if (p.length < 8 || p.length > 15) return null;
  return p;
}

// ─── Resolve recipients ──────────────────────────────────────────────────
async function getRecipients() {
  if (AUDIENCE === "clients2026") {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      console.error("❌ NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis pour clients2026");
      process.exit(1);
    }
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("orders")
      .select("email, prenom, telephone, referral_code")
      .eq("payment_status", "paid")
      .not("referral_code", "is", null)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("❌ Supabase query failed:", error.message);
      process.exit(1);
    }
    // Dédup par email (un client peut avoir commandé 2x)
    const seen = new Set();
    const recipients = [];
    for (const row of data || []) {
      const emailKey = (row.email || "").toLowerCase();
      if (!emailKey || seen.has(emailKey)) continue;
      seen.add(emailKey);
      recipients.push({
        identifier: CHANNEL === "email" ? emailKey : normalizePhone(row.telephone),
        email: row.email,
        phone: normalizePhone(row.telephone),
        prenom: row.prenom || "",
        referral_code: row.referral_code,
      });
    }
    return recipients;
  }

  // base2025
  if (CHANNEL === "email") {
    const raw = fs.readFileSync(BASE_2025_EMAILS, "utf-8");
    const json = JSON.parse(raw);
    const list = json.contacts_with_email || [];
    return list
      .filter((c) => c.email)
      .map((c) => ({
        identifier: c.email.toLowerCase(),
        email: c.email,
        prenom: c.first_name || "",
      }));
  }
  // wa
  const raw = fs.readFileSync(BASE_2025_PHONES, "utf-8");
  const json = JSON.parse(raw);
  const list = json.contacts || [];
  return list
    .map((c) => ({
      identifier: normalizePhone(c.phone),
      phone: normalizePhone(c.phone),
      prenom: c.first_name || "",
    }))
    .filter((c) => c.identifier);
}

// ─── Log idempotence ─────────────────────────────────────────────────────
function logPath() {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
  return path.join(LOGS_DIR, `extra-places-${AUDIENCE}-${CHANNEL}.json`);
}

function loadSent() {
  const p = logPath();
  if (!fs.existsSync(p)) return new Set();
  try {
    const arr = JSON.parse(fs.readFileSync(p, "utf-8"));
    return new Set(arr.map((x) => x.identifier));
  } catch {
    return new Set();
  }
}

function appendSent(entry) {
  const p = logPath();
  let arr = [];
  if (fs.existsSync(p)) {
    try {
      arr = JSON.parse(fs.readFileSync(p, "utf-8"));
    } catch {
      arr = [];
    }
  }
  arr.push({ ...entry, sent_at: new Date().toISOString() });
  fs.writeFileSync(p, JSON.stringify(arr, null, 2));
}

// ─── Senders ─────────────────────────────────────────────────────────────
async function sendEmail(recipient) {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const tpl =
    AUDIENCE === "clients2026"
      ? emailLayoutClients(recipient.prenom, recipient.referral_code)
      : emailLayoutBase2025(recipient.prenom);
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

async function sendWa(recipient) {
  const token = process.env.WHAPI_TOKEN;
  if (!token) throw new Error("WHAPI_TOKEN missing");
  const body =
    AUDIENCE === "clients2026"
      ? waMessageClients(recipient.prenom, recipient.referral_code)
      : waMessageBase2025(recipient.prenom);
  const res = await fetch(`${WHAPI_BASE}/messages/text`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to: recipient.phone, body }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Whapi ${res.status}: ${t.slice(0, 200)}`);
  }
  const data = await res.json();
  if (!data.sent) throw new Error(`Whapi response: ${JSON.stringify(data).slice(0, 200)}`);
  return { id: data.message?.id };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Main ────────────────────────────────────────────────────────────────
(async () => {
  console.log(`\n🐑 Broadcast extra-places`);
  console.log(`   audience=${AUDIENCE} channel=${CHANNEL} send=${SEND}${LIMIT ? ` limit=${LIMIT}` : ""}${ONLY ? ` only=${ONLY}` : ""}\n`);

  let recipients = await getRecipients();
  console.log(`📋 ${recipients.length} destinataires totaux trouvés`);

  // Filtre identifiant manquant
  recipients = recipients.filter((r) => r.identifier);
  console.log(`   → ${recipients.length} avec identifiant valide (${CHANNEL === "email" ? "email" : "téléphone"})`);

  if (ONLY) {
    recipients = recipients.filter((r) => r.identifier.toLowerCase() === ONLY);
    console.log(`   → filtré --only ${ONLY} : ${recipients.length}`);
  }

  // Skip déjà envoyés (idempotence)
  const sent = loadSent();
  const before = recipients.length;
  recipients = recipients.filter((r) => !sent.has(r.identifier));
  console.log(`   → ${before - recipients.length} déjà envoyés (skipped via log), ${recipients.length} restants à traiter`);

  if (LIMIT) {
    recipients = recipients.slice(0, LIMIT);
    console.log(`   → limit ${LIMIT} appliqué`);
  }

  if (!SEND) {
    console.log(`\n🧪 DRY-RUN — aucun envoi. Premier·s 5 destinataires :`);
    recipients.slice(0, 5).forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.identifier} (${r.prenom})${r.referral_code ? ` ref=${r.referral_code}` : ""}`);
    });
    console.log(`\n   Pour envoyer pour de vrai : relance avec --send`);
    return;
  }

  console.log(`\n🚀 ENVOI RÉEL — ${recipients.length} messages, sleep ${SLEEP_MS}ms entre chaque\n`);
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < recipients.length; i++) {
    const r = recipients[i];
    const tag = `[${i + 1}/${recipients.length}]`;
    try {
      const result = CHANNEL === "email" ? await sendEmail(r) : await sendWa(r);
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

  console.log(`\n📊 Bilan : ${ok} envoyés · ${fail} échecs · log → ${logPath()}`);
})().catch((e) => {
  console.error("\n💥 Crash:", e);
  process.exit(1);
});
