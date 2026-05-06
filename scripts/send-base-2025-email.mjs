// One-shot script: envoie un email de remerciement + code promo MERCI2025
// à la base clients Aïd 2025.
//
// Usage:
//   RESEND_API_KEY=re_xxx node scripts/send-base-2025-email.mjs --contacts /path/to/base-2025-contacts.json [--dry-run|--send] [--limit N]
//
// Par défaut --dry-run : n'envoie rien, affiche juste qui recevrait quoi.
// --send : envoie réellement (1 email par contact, sleep 200ms entre chaque pour rester sous le rate limit Resend).
// --limit N : ne traite que les N premiers contacts (utile pour test).

import fs from "node:fs";
import { Resend } from "resend";

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

const CONTACTS_PATH = args.contacts;
const DRY_RUN = !args.send;
const LIMIT = args.limit ? parseInt(args.limit, 10) : null;

if (!CONTACTS_PATH && !args.preview) {
  console.error("❌ Manque --contacts /path/to/base-2025-contacts.json (ou --preview pour juste générer le HTML)");
  process.exit(1);
}
if (!DRY_RUN && !process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY non défini (requis avec --send)");
  process.exit(1);
}

const FROM = "Qurbaniya <noreply@qurbaniya.fr>";
const SUPPORT_EMAIL = "support@qurbaniya.fr";
const WHATSAPP_LINK = "https://wa.me/33744798883";
const WHATSAPP_NUMBER = "+33 7 44 79 88 83";
const PROMO_CODE = "MERCI2025";
const PROMO_AMOUNT = "10€";
const PROMO_EXPIRY = "24 mai 2026";
const GOOGLE_REVIEW_LINK = "https://g.page/r/CQT3MFQZ9CcfEBM/review";
const ORDER_LINK = "https://qurbaniya.fr/commander";
const REVIEW_PAGE_LINK = "https://qurbaniya.fr/avis";
const UNSUB_LINK = "mailto:support@qurbaniya.fr?subject=Désinscription%20emails%20Qurbaniya";

function emailLayout(content) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:#F7F3ED;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FEFCF8;border-radius:16px;box-shadow:0 4px 24px rgba(26,26,24,0.06);overflow:hidden;">
  <tr><td style="background:#1B4332;padding:28px 24px;text-align:center;">
    <span style="font-family:Georgia,serif;font-size:26px;font-weight:bold;letter-spacing:0.5px;">
      <span style="color:#FEFCF8;">QURBANI</span><span style="color:#D4A843;">YA</span>
    </span>
    <p style="margin:6px 0 0;color:#D4A843;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-family:Helvetica,Arial,sans-serif;">Sacrifice de l'Aïd al-Adha</p>
  </td></tr>
  <tr><td style="padding:40px 32px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;color:#1A1A18;">
    ${content}
  </td></tr>
  <tr><td style="background:#EFE9DF;padding:28px 24px;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#5C5347;line-height:1.7;border-top:1px solid #E5DCC9;">
    <p style="margin:0 0 12px;font-weight:bold;color:#1A1A18;">Qurbaniya.fr</p>
    <p style="margin:0 0 12px;color:#5C5347;">Votre sacrifice conforme à la Sunnah</p>
    <p style="margin:0 0 16px;">
      <a href="mailto:${SUPPORT_EMAIL}" style="color:#1B4332;text-decoration:none;font-weight:bold;">${SUPPORT_EMAIL}</a>
      <span style="color:#8C8279;">&nbsp;·&nbsp;</span>
      <a href="${WHATSAPP_LINK}" style="color:#1B4332;text-decoration:none;font-weight:bold;">WhatsApp ${WHATSAPP_NUMBER}</a>
    </p>
    <p style="margin:0 0 8px;font-size:11px;color:#8C8279;">
      Vous recevez cet email car vous avez confié votre sacrifice à Qurbaniya en 2025.
    </p>
    <p style="margin:0;font-size:11px;color:#8C8279;">
      <a href="${UNSUB_LINK}" style="color:#8C8279;text-decoration:underline;">Se désinscrire</a>
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildHtml(prenom) {
  const greeting = prenom ? `, ${prenom}` : "";
  return emailLayout(`
    <h1 style="color:#1A1A18;font-size:26px;margin:0 0 12px;font-weight:bold;font-family:Georgia,serif;text-align:center;">
      Merci pour votre confiance${greeting}
    </h1>
    <p style="margin:0 0 24px;color:#B8860B;font-size:15px;font-style:italic;font-family:Georgia,serif;text-align:center;">
      Taqabbal Allahou minna wa minkoum
    </p>

    <p style="margin:0 0 20px;color:#5C5347;font-size:15px;line-height:1.7;">
      L'an dernier, vous nous avez confié votre sacrifice de l'Aïd al-Adha. C'était une responsabilité immense, et votre confiance a été le moteur de toute notre organisation.
    </p>

    <p style="margin:0 0 28px;color:#5C5347;font-size:15px;line-height:1.7;">
      Aïd 2026 approche (le 27 mai). En guise de remerciement, nous vous offrons <strong style="color:#B8860B;">${PROMO_AMOUNT} de réduction</strong> sur votre prochain sacrifice.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;border:2px dashed #D4A843;border-radius:12px;margin:0 0 28px;">
      <tr><td style="padding:24px;text-align:center;">
        <p style="margin:0 0 8px;color:#8C8279;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">Votre code de réduction</p>
        <p style="margin:0 0 12px;color:#1A1A18;font-size:32px;font-weight:bold;font-family:monospace;letter-spacing:3px;">${PROMO_CODE}</p>
        <p style="margin:0;color:#5C5347;font-size:13px;">
          ${PROMO_AMOUNT} de remise · valable jusqu'au ${PROMO_EXPIRY}
        </p>
      </td></tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px auto;">
      <tr><td align="center" style="background:#B8860B;border-radius:10px;box-shadow:0 4px 12px rgba(184,134,11,0.25);">
        <a href="${ORDER_LINK}" target="_blank" style="display:inline-block;padding:16px 36px;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;color:#FEFCF8;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">
          Réserver mon sacrifice
        </a>
      </td></tr>
    </table>

    <p style="margin:0 0 12px;color:#5C5347;font-size:13px;line-height:1.6;text-align:center;">
      Saisissez le code <strong style="color:#1A1A18;font-family:monospace;">${PROMO_CODE}</strong> au moment du paiement.
    </p>

    <hr style="border:0;border-top:1px solid #EFE9DF;margin:36px 0;">

    <h2 style="color:#1A1A18;font-size:17px;margin:0 0 12px;font-weight:bold;font-family:Georgia,serif;">
      Une faveur, si vous avez quelques secondes
    </h2>

    <p style="margin:0 0 16px;color:#5C5347;font-size:14px;line-height:1.7;">
      Si l'expérience Aïd 2025 vous a satisfait, un avis Google nous aide énormément à toucher d'autres familles musulmanes qui cherchent un service de confiance.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;">
      <tr><td align="center" style="background:#2D6A4F;border-radius:10px;">
        <a href="${GOOGLE_REVIEW_LINK}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#FEFCF8;text-decoration:none;">
          ⭐ Laisser un avis Google
        </a>
      </td></tr>
    </table>

    <p style="margin:0;color:#5C5347;font-size:13px;line-height:1.7;">
      Vous préférez écrire directement sur le site ?
      <a href="${REVIEW_PAGE_LINK}" style="color:#1B4332;text-decoration:underline;font-weight:bold;">Laissez votre témoignage ici.</a>
    </p>

    <hr style="border:0;border-top:1px solid #EFE9DF;margin:36px 0;">

    <p style="margin:0;color:#5C5347;font-size:14px;text-align:center;line-height:1.7;">
      Une question ? Écrivez à <a href="mailto:${SUPPORT_EMAIL}" style="color:#1B4332;text-decoration:none;font-weight:bold;">${SUPPORT_EMAIL}</a><br>
      ou contactez-nous sur <a href="${WHATSAPP_LINK}" style="color:#1B4332;text-decoration:none;font-weight:bold;">WhatsApp</a>.
    </p>

    <p style="margin:24px 0 0;color:#B8860B;font-size:13px;text-align:center;font-style:italic;font-family:Georgia,serif;">
      Qu'Allah vous accorde un Aïd béni — toute l'équipe Qurbaniya.
    </p>
  `);
}

function buildText(prenom) {
  const greeting = prenom ? `, ${prenom}` : "";
  return `Merci pour votre confiance${greeting}.

Taqabbal Allahou minna wa minkoum.

L'an dernier, vous nous avez confié votre sacrifice de l'Aïd al-Adha. En guise de remerciement, nous vous offrons ${PROMO_AMOUNT} de réduction sur votre prochain sacrifice.

VOTRE CODE : ${PROMO_CODE}
Valable jusqu'au ${PROMO_EXPIRY}, à saisir au moment du paiement.

Réservez votre sacrifice : ${ORDER_LINK}

---

Si l'expérience Aïd 2025 vous a satisfait, un avis Google nous aide énormément :
${GOOGLE_REVIEW_LINK}

Ou laissez votre témoignage sur le site : ${REVIEW_PAGE_LINK}

---

Une question ? ${SUPPORT_EMAIL} · WhatsApp ${WHATSAPP_NUMBER}

Qu'Allah vous accorde un Aïd béni.

—
Vous recevez cet email car vous avez confié votre sacrifice à Qurbaniya en 2025.
Pour vous désinscrire : répondez à ce mail avec "désinscription".
`;
}

function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

async function main() {
  if (args.preview) {
    const previewName = "Youness";
    const html = buildHtml(previewName);
    const out = "/tmp/qurbaniya-base-2025-preview.html";
    fs.writeFileSync(out, html);
    console.log(`✅ Preview écrit dans ${out}`);
    console.log(`   Ouvre-le dans le navigateur : open ${out}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(CONTACTS_PATH, "utf-8"));
  let contacts = data.contacts_with_email || [];
  if (LIMIT) contacts = contacts.slice(0, LIMIT);

  console.log("");
  console.log("─────────────────────────────────────────────");
  console.log("  Qurbaniya — Email base 2025");
  console.log("─────────────────────────────────────────────");
  console.log(`  Source: ${CONTACTS_PATH}`);
  console.log(`  Total contacts: ${contacts.length}`);
  console.log(`  Mode: ${DRY_RUN ? "🟡 DRY-RUN (rien envoyé)" : "🔴 LIVE (envoi réel)"}`);
  console.log(`  From: ${FROM}`);
  console.log(`  Sujet: Merci pour Aïd 2025 — votre cadeau pour Aïd 2026`);
  console.log("─────────────────────────────────────────────\n");

  if (DRY_RUN) {
    console.log("Aperçu des 5 premiers destinataires :");
    contacts.slice(0, 5).forEach((c, i) => {
      const prenom = capitalize(c.first_name);
      console.log(`  ${i + 1}. ${c.email} → "Merci pour votre confiance, ${prenom}"`);
    });
    console.log(`\n  ... et ${Math.max(0, contacts.length - 5)} autres.`);
    console.log("\nPour envoyer pour de vrai : ajoute --send");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  let ok = 0;
  let ko = 0;
  const errors = [];

  for (let i = 0; i < contacts.length; i++) {
    const c = contacts[i];
    const prenom = capitalize(c.first_name);
    const html = buildHtml(prenom);
    const text = buildText(prenom);

    try {
      const r = await resend.emails.send({
        from: FROM,
        to: c.email,
        subject: "Merci pour Aïd 2025 — votre cadeau pour Aïd 2026",
        html,
        text,
        headers: {
          "List-Unsubscribe": `<${UNSUB_LINK}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      if (r.error) {
        ko++;
        errors.push({ email: c.email, error: r.error });
        console.log(`  ❌ ${i + 1}/${contacts.length} ${c.email} — ${r.error.message || JSON.stringify(r.error)}`);
      } else {
        ok++;
        console.log(`  ✅ ${i + 1}/${contacts.length} ${c.email}`);
      }
    } catch (e) {
      ko++;
      errors.push({ email: c.email, error: String(e) });
      console.log(`  ❌ ${i + 1}/${contacts.length} ${c.email} — ${e.message}`);
    }

    // Rate limit Resend free = 2 req/sec → on espace de 600ms par sécurité
    await new Promise((res) => setTimeout(res, 600));
  }

  console.log("\n─────────────────────────────────────────────");
  console.log(`  ✅ Envoyés : ${ok}`);
  console.log(`  ❌ Erreurs : ${ko}`);
  console.log("─────────────────────────────────────────────");
  if (errors.length) {
    console.log("\nDétails erreurs :");
    errors.forEach((e) => console.log(`  - ${e.email}: ${JSON.stringify(e.error)}`));
  }
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
