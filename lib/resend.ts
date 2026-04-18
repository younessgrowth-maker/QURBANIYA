import { Resend } from "resend";
import type { Order } from "@/types";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM = "Qurbaniya <noreply@qurbaniya.fr>";

/* ── Base template wrapper ── */
function emailLayout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0C0F0A;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0C0F0A;">
<tr><td align="center" style="padding:24px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0C0F0A;">

  <!-- Header -->
  <tr><td style="padding:32px 24px 24px;text-align:center;border-bottom:1px solid #1C2318;">
    <span style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:900;letter-spacing:-0.5px;">
      <span style="color:#F5F0E8;">QURBANI</span><span style="color:#C9A84C;">YA</span>
    </span>
  </td></tr>

  <!-- Content -->
  <tr><td style="padding:32px 24px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:#F5F0E8;">
    ${content}
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:24px;border-top:1px solid #1C2318;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#7A7268;line-height:1.6;">
    <p style="margin:0 0 8px;">Qurbaniya.fr — Votre sacrifice conforme à la Sunnah</p>
    <p style="margin:0 0 8px;">
      <a href="mailto:contact@qurbaniya.fr" style="color:#C9A84C;text-decoration:none;">contact@qurbaniya.fr</a>
      &nbsp;·&nbsp;WhatsApp : +33 6 XX XX XX XX
    </p>
    <p style="margin:0;">
      <a href="https://qurbaniya.fr" style="color:#7A7268;text-decoration:underline;font-size:12px;">Se désabonner</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/* ── Helper: gold button ── */
function goldButton(text: string, href: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0;">
<tr><td align="center" style="background:#C9A84C;border-radius:6px;">
  <a href="${href}" target="_blank" style="display:inline-block;padding:16px 32px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#0C0F0A;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;">
    ${text}
  </a>
</td></tr>
</table>`;
}

/* ── Helper: step item ── */
function stepItem(num: string, text: string): string {
  return `
<tr>
  <td style="padding:8px 12px 8px 0;vertical-align:top;width:32px;">
    <span style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;background:rgba(201,168,76,0.15);color:#C9A84C;font-weight:bold;font-size:13px;">${num}</span>
  </td>
  <td style="padding:8px 0;color:#B8B0A0;font-size:15px;">${text}</td>
</tr>`;
}

/* ── Helper: order ref ── */
function orderRef(order: Order): string {
  return `QRB-2026-${order.id.slice(0, 4).toUpperCase()}`;
}

/* ═══════════════════════════════════════════
   EMAIL 1 — CONFIRMATION DE COMMANDE
   ═══════════════════════════════════════════ */
export async function sendOrderConfirmation(order: Order) {
  const ref = orderRef(order);
  const intentionLabel =
    order.intention === "pour_moi" ? "Pour vous-même" :
    order.intention === "famille" ? "Pour votre famille" : "En sadaqa";

  const html = emailLayout(`
    <h1 style="color:#C9A84C;font-size:22px;margin:0 0 20px;font-weight:bold;">
      Barakallah fikoum, ${order.prenom} !
    </h1>

    <p style="margin:0 0 24px;">
      Votre sacrifice a bien été enregistré. Qu'Allah l'accepte de vous. Voici le récapitulatif de votre commande :
    </p>

    <!-- Recap box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#141A11;border:1px solid #1C2318;border-radius:8px;margin:0 0 28px;">
      <tr><td style="padding:20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#7A7268;font-size:13px;padding:4px 0;">Commande</td>
            <td style="color:#F5F0E8;font-size:13px;padding:4px 0;text-align:right;font-weight:bold;">${ref}</td>
          </tr>
          <tr>
            <td style="color:#7A7268;font-size:13px;padding:4px 0;">Montant</td>
            <td style="color:#C9A84C;font-size:13px;padding:4px 0;text-align:right;font-weight:bold;">140,00€</td>
          </tr>
          <tr>
            <td style="color:#7A7268;font-size:13px;padding:4px 0;">Intention</td>
            <td style="color:#F5F0E8;font-size:13px;padding:4px 0;text-align:right;">${intentionLabel}</td>
          </tr>
          <tr>
            <td style="color:#7A7268;font-size:13px;padding:4px 0;">Niyyah</td>
            <td style="color:#C9A84C;font-size:13px;padding:4px 0;text-align:right;font-weight:bold;">${order.niyyah}</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <h2 style="color:#F5F0E8;font-size:17px;margin:0 0 16px;font-weight:bold;">Ce qui se passe ensuite :</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      ${stepItem("1", "Vous recevrez un rappel 7 jours avant l'Aïd.")}
      ${stepItem("2", "Le jour de l'Aïd, votre sacrifice sera effectué par notre cheikh.")}
      ${stepItem("3", "Vous recevrez la preuve vidéo par WhatsApp dans les 24h.")}
    </table>

    <p style="margin:0 0 8px;color:#B8B0A0;font-size:14px;">
      <strong style="color:#2D6A4F;">&#10003;</strong> Assurez-vous que votre numéro WhatsApp est bien celui indiqué lors de la commande.
    </p>

    ${goldButton("SUIVRE MA COMMANDE", "https://qurbaniya.fr/mes-commandes")}

    <p style="margin:0;color:#7A7268;font-size:14px;">
      Une question ? Contactez-nous à <a href="mailto:contact@qurbaniya.fr" style="color:#C9A84C;text-decoration:none;">contact@qurbaniya.fr</a>
      ou par WhatsApp.
    </p>
  `);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    subject: `✅ Votre sacrifice Aïd 2026 est confirmé — Qurbaniya`,
    html,
  });

  console.log("Email confirmation sent:", result);
  return result;
}

/* ═══════════════════════════════════════════
   EMAIL 2 — VIREMENT EN ATTENTE
   ═══════════════════════════════════════════ */
export async function sendPaymentReminder(order: Order) {
  const ref = orderRef(order);

  const html = emailLayout(`
    <h1 style="color:#C9A84C;font-size:22px;margin:0 0 20px;font-weight:bold;">
      Finalisez votre commande, ${order.prenom}
    </h1>

    <p style="margin:0 0 24px;">
      Votre commande <strong style="color:#C9A84C;">${ref}</strong> est en attente de paiement par virement bancaire.
      Votre place sera réservée dès réception du virement.
    </p>

    <!-- Bank details box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#141A11;border:1px solid #C9A84C;border-radius:8px;margin:0 0 28px;">
      <tr><td style="padding:20px;">
        <h3 style="color:#C9A84C;font-size:14px;margin:0 0 16px;text-transform:uppercase;letter-spacing:1px;">Coordonnées bancaires</h3>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#7A7268;font-size:13px;padding:6px 0;">Bénéficiaire</td>
            <td style="color:#F5F0E8;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;">SAS Qurbaniya</td>
          </tr>
          <tr>
            <td style="color:#7A7268;font-size:13px;padding:6px 0;">IBAN</td>
            <td style="color:#F5F0E8;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;font-family:monospace;">FR76 XXXX XXXX XXXX XXXX XXXX XXX</td>
          </tr>
          <tr>
            <td style="color:#7A7268;font-size:13px;padding:6px 0;">BIC</td>
            <td style="color:#F5F0E8;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;font-family:monospace;">XXXXXXXX</td>
          </tr>
          <tr>
            <td style="color:#7A7268;font-size:13px;padding:6px 0;">Montant</td>
            <td style="color:#C9A84C;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;">140,00€</td>
          </tr>
          <tr>
            <td style="color:#7A7268;font-size:13px;padding:6px 0;">Référence</td>
            <td style="color:#E8533C;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;">${ref}</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(232,83,60,0.08);border-left:3px solid #E8533C;border-radius:0 6px 6px 0;margin:0 0 24px;">
      <tr><td style="padding:12px 16px;">
        <p style="margin:0;color:#E8533C;font-size:14px;font-weight:bold;">
          &#9888; Important : indiquez la référence "${ref}" dans le motif du virement.
        </p>
        <p style="margin:4px 0 0;color:#B8B0A0;font-size:13px;">
          Délai de traitement : 3 jours ouvrés après réception.
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#7A7268;font-size:14px;">
      Un doute ? Contactez-nous à <a href="mailto:contact@qurbaniya.fr" style="color:#C9A84C;text-decoration:none;">contact@qurbaniya.fr</a>
    </p>
  `);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    subject: `⏳ Finalisez votre commande Qurbaniya — Informations de virement`,
    html,
  });

  console.log("Email virement sent:", result);
  return result;
}

/* ═══════════════════════════════════════════
   EMAIL 3 — JOUR DU SACRIFICE
   ═══════════════════════════════════════════ */
export async function sendSacrificeDay(order: Order) {
  const html = emailLayout(`
    <div style="text-align:center;margin:0 0 28px;">
      <span style="font-size:40px;">&#127769;</span>
    </div>

    <h1 style="color:#C9A84C;font-size:24px;margin:0 0 8px;font-weight:bold;text-align:center;">
      Aïd Moubarak, ${order.prenom} !
    </h1>

    <p style="text-align:center;margin:0 0 28px;color:#B8B0A0;font-size:15px;">
      Taqabbal Allahou minna wa minkoum
    </p>

    <p style="margin:0 0 20px;">
      Votre sacrifice au nom de <strong style="color:#C9A84C;">${order.niyyah}</strong> est actuellement effectué
      par notre cheikh, dans le respect total de la Sunnah.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(45,106,79,0.1);border-left:3px solid #2D6A4F;border-radius:0 6px 6px 0;margin:0 0 28px;">
      <tr><td style="padding:16px;">
        <p style="margin:0;color:#3D8C69;font-size:15px;">
          <strong>&#128249; Preuve vidéo</strong><br>
          Vous recevrez votre vidéo nominative par <strong>WhatsApp</strong> dans les prochaines heures, in sha Allah.
        </p>
      </td></tr>
    </table>

    <!-- Du'a box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#141A11;border:1px solid rgba(201,168,76,0.2);border-radius:8px;margin:0 0 28px;">
      <tr><td style="padding:20px;text-align:center;">
        <p style="margin:0 0 8px;color:#C9A84C;font-size:14px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Du'a pour vous</p>
        <p style="margin:0;color:#F5F0E8;font-size:15px;font-style:italic;line-height:1.8;">
          "Qu'Allah accepte votre sacrifice, vous accorde Sa miséricorde
          et vous réunisse avec vos proches au Paradis."
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#7A7268;font-size:14px;text-align:center;">
      Aïd Moubarak de toute l'équipe Qurbaniya
    </p>
  `);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    subject: `🌙 Votre sacrifice est en cours — Aïd Moubarak !`,
    html,
  });

  console.log("Email sacrifice day sent:", result);
  return result;
}
