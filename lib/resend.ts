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
const SUPPORT_EMAIL = "support@qurbaniya.fr";
const WHATSAPP_NUMBER = "+33 7 44 79 88 83";
const WHATSAPP_LINK = "https://wa.me/33744798883";

/* ── Base template wrapper — fond crème, hero accueillant ── */
function emailLayout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
</head>
<body style="margin:0;padding:0;background:#F7F3ED;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FEFCF8;border-radius:16px;box-shadow:0 4px 24px rgba(26,26,24,0.06);overflow:hidden;">

  <!-- Header vert foncé -->
  <tr><td style="background:#1B4332;padding:28px 24px;text-align:center;">
    <span style="font-family:Georgia,serif;font-size:26px;font-weight:bold;letter-spacing:0.5px;">
      <span style="color:#FEFCF8;">QURBANI</span><span style="color:#D4A843;">YA</span>
    </span>
    <p style="margin:6px 0 0;color:#D4A843;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-family:Helvetica,Arial,sans-serif;">Sacrifice de l'Aïd al-Adha</p>
  </td></tr>

  <!-- Content -->
  <tr><td style="padding:40px 32px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;color:#1A1A18;">
    ${content}
  </td></tr>

  <!-- Footer crème -->
  <tr><td style="background:#EFE9DF;padding:28px 24px;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#5C5347;line-height:1.7;border-top:1px solid #E5DCC9;">
    <p style="margin:0 0 12px;font-weight:bold;color:#1A1A18;">Qurbaniya.fr</p>
    <p style="margin:0 0 12px;color:#5C5347;">Votre sacrifice conforme à la Sunnah</p>
    <p style="margin:0 0 16px;">
      <a href="mailto:${SUPPORT_EMAIL}" style="color:#1B4332;text-decoration:none;font-weight:bold;">${SUPPORT_EMAIL}</a>
      <span style="color:#8C8279;">&nbsp;·&nbsp;</span>
      <a href="${WHATSAPP_LINK}" style="color:#1B4332;text-decoration:none;font-weight:bold;">WhatsApp ${WHATSAPP_NUMBER}</a>
    </p>
    <p style="margin:0;font-size:11px;color:#8C8279;">
      Vous recevez cet email suite à votre commande sur qurbaniya.fr
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/* ── Helper: bouton or principal ── */
function goldButton(text: string, href: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px auto;">
<tr><td align="center" style="background:#B8860B;border-radius:10px;box-shadow:0 4px 12px rgba(184,134,11,0.25);">
  <a href="${href}" target="_blank" style="display:inline-block;padding:16px 36px;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;color:#FEFCF8;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">
    ${text}
  </a>
</td></tr>
</table>`;
}

/* ── Helper: étape numérotée ── */
function stepItem(num: string, title: string, text: string): string {
  return `
<tr>
  <td style="padding:12px 14px 12px 0;vertical-align:top;width:40px;">
    <span style="display:inline-block;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;background:#1B4332;color:#D4A843;font-weight:bold;font-size:14px;font-family:Helvetica,Arial,sans-serif;">${num}</span>
  </td>
  <td style="padding:12px 0;font-family:Helvetica,Arial,sans-serif;">
    <p style="margin:0 0 4px;color:#1A1A18;font-size:15px;font-weight:bold;">${title}</p>
    <p style="margin:0;color:#5C5347;font-size:14px;line-height:1.6;">${text}</p>
  </td>
</tr>`;
}

/* ── Helper: référence commande ── */
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
    <!-- Hero coche verte -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr><td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="background:#E8F0EB;width:80px;height:80px;border-radius:50%;text-align:center;vertical-align:middle;">
            <span style="font-size:42px;line-height:80px;color:#2D6A4F;">&#10003;</span>
          </td></tr>
        </table>
      </td></tr>
    </table>

    <h1 style="color:#1A1A18;font-size:26px;margin:0 0 12px;font-weight:bold;text-align:center;font-family:Georgia,serif;">
      Barakallah fikoum, ${order.prenom} !
    </h1>

    <p style="margin:0 0 32px;color:#5C5347;font-size:16px;text-align:center;line-height:1.6;">
      Votre sacrifice a bien été enregistré.<br>
      <em style="color:#B8860B;">Qu'Allah l'accepte de vous.</em>
    </p>

    <!-- Récap commande -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;border:1px solid #EFE9DF;border-radius:12px;margin:0 0 32px;">
      <tr><td style="padding:24px;">
        <p style="margin:0 0 16px;color:#8C8279;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">Récapitulatif</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Commande</td>
            <td style="color:#1A1A18;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;font-family:monospace;">${ref}</td>
          </tr>
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Montant payé</td>
            <td style="color:#1B4332;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;">140,00 €</td>
          </tr>
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Intention</td>
            <td style="color:#1A1A18;font-size:14px;padding:6px 0;text-align:right;">${intentionLabel}</td>
          </tr>
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Niyyah</td>
            <td style="color:#B8860B;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;font-family:Georgia,serif;font-style:italic;">${order.niyyah}</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- Cheikh -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FEFCF8;border:1px solid #EFE9DF;border-radius:12px;margin:0 0 32px;">
      <tr><td style="padding:20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:middle;width:72px;padding-right:16px;">
              <img src="https://qurbaniya.fr/cheikhChamsouddin.jpg" alt="Cheikh Chamsouddin" width="64" height="64" style="display:block;width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid #D4A843;">
            </td>
            <td style="vertical-align:middle;">
              <p style="margin:0 0 4px;color:#8C8279;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">Votre sacrifice supervisé par</p>
              <p style="margin:0 0 2px;color:#1A1A18;font-size:16px;font-weight:bold;">Cheikh Chamsouddin</p>
              <p style="margin:0;color:#5C5347;font-size:13px;">Conformité Sunnah garantie</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>

    <h2 style="color:#1A1A18;font-size:18px;margin:0 0 8px;font-weight:bold;font-family:Georgia,serif;">
      Ce qui se passe ensuite
    </h2>
    <p style="margin:0 0 20px;color:#5C5347;font-size:14px;">
      Vous n'avez plus rien à faire. Voici le déroulé :
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      ${stepItem("1", "Rappel à J-7", "Un email pour vous rappeler la date du sacrifice et confirmer votre numéro WhatsApp.")}
      ${stepItem("2", "Jour de l'Aïd", "Le sacrifice est effectué en votre nom par le cheikh, dans le respect total de la Sunnah.")}
      ${stepItem("3", "Vidéo nominative", "Vous recevez la preuve vidéo par WhatsApp dans les 24 heures qui suivent.")}
    </table>

    <!-- Encart WhatsApp important -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8F0EB;border-left:4px solid #2D6A4F;border-radius:0 8px 8px 0;margin:0 0 28px;">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0 0 4px;color:#1B4332;font-size:14px;font-weight:bold;">
          📱 Vérifiez votre numéro WhatsApp
        </p>
        <p style="margin:0;color:#1B4332;font-size:13px;line-height:1.6;">
          La vidéo de votre sacrifice sera envoyée au numéro indiqué lors de la commande. Si vous avez un doute, écrivez-nous.
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#5C5347;font-size:14px;text-align:center;line-height:1.7;">
      Une question ? Écrivez à <a href="mailto:${SUPPORT_EMAIL}" style="color:#1B4332;text-decoration:none;font-weight:bold;">${SUPPORT_EMAIL}</a><br>
      ou contactez-nous sur <a href="${WHATSAPP_LINK}" style="color:#1B4332;text-decoration:none;font-weight:bold;">WhatsApp</a>.
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
    <h1 style="color:#1A1A18;font-size:24px;margin:0 0 12px;font-weight:bold;font-family:Georgia,serif;">
      Finalisez votre commande, ${order.prenom}
    </h1>

    <p style="margin:0 0 28px;color:#5C5347;font-size:15px;line-height:1.7;">
      Votre commande <strong style="color:#1A1A18;font-family:monospace;">${ref}</strong> est en attente de paiement par virement bancaire.
      Votre place sera réservée dès réception du virement.
    </p>

    <!-- Coordonnées bancaires -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;border:1px solid #D4A843;border-radius:12px;margin:0 0 24px;">
      <tr><td style="padding:24px;">
        <p style="margin:0 0 16px;color:#B8860B;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">Coordonnées bancaires</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Bénéficiaire</td>
            <td style="color:#1A1A18;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;">SAS Qurbaniya</td>
          </tr>
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">IBAN</td>
            <td style="color:#1A1A18;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;font-family:monospace;">FR76 XXXX XXXX XXXX XXXX XXXX XXX</td>
          </tr>
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">BIC</td>
            <td style="color:#1A1A18;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;font-family:monospace;">XXXXXXXX</td>
          </tr>
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Montant</td>
            <td style="color:#1B4332;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;">140,00 €</td>
          </tr>
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Référence</td>
            <td style="color:#C0392B;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;font-family:monospace;">${ref}</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- Avertissement référence -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FBE9E5;border-left:4px solid #C0392B;border-radius:0 8px 8px 0;margin:0 0 28px;">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0 0 4px;color:#C0392B;font-size:14px;font-weight:bold;">
          ⚠ Indiquez la référence dans le motif du virement
        </p>
        <p style="margin:0;color:#5C5347;font-size:13px;line-height:1.6;">
          Sans la référence <strong style="color:#1A1A18;font-family:monospace;">${ref}</strong>, nous ne pourrons pas associer le paiement à votre commande. Délai de traitement : 3 jours ouvrés après réception.
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#5C5347;font-size:14px;text-align:center;line-height:1.7;">
      Un doute ? Écrivez à <a href="mailto:${SUPPORT_EMAIL}" style="color:#1B4332;text-decoration:none;font-weight:bold;">${SUPPORT_EMAIL}</a>
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
    <div style="text-align:center;margin:0 0 20px;">
      <span style="font-size:48px;">🌙</span>
    </div>

    <h1 style="color:#1A1A18;font-size:28px;margin:0 0 8px;font-weight:bold;text-align:center;font-family:Georgia,serif;">
      Aïd Moubarak, ${order.prenom} !
    </h1>

    <p style="text-align:center;margin:0 0 28px;color:#B8860B;font-size:15px;font-style:italic;font-family:Georgia,serif;">
      Taqabbal Allahou minna wa minkoum
    </p>

    <p style="margin:0 0 24px;color:#5C5347;font-size:15px;line-height:1.7;text-align:center;">
      Votre sacrifice au nom de <strong style="color:#1A1A18;font-family:Georgia,serif;font-style:italic;">${order.niyyah}</strong> est actuellement effectué par notre cheikh, dans le respect total de la Sunnah.
    </p>

    <!-- Encart vidéo à venir -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8F0EB;border-left:4px solid #2D6A4F;border-radius:0 8px 8px 0;margin:0 0 28px;">
      <tr><td style="padding:18px 22px;">
        <p style="margin:0 0 6px;color:#1B4332;font-size:15px;font-weight:bold;">
          📹 Votre vidéo nominative arrive
        </p>
        <p style="margin:0;color:#1B4332;font-size:13px;line-height:1.6;">
          Vous la recevrez par <strong>WhatsApp</strong> dans les 24 heures, in sha Allah.
        </p>
      </td></tr>
    </table>

    <!-- Du'a -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;border:1px solid #EFE9DF;border-radius:12px;margin:0 0 28px;">
      <tr><td style="padding:24px;text-align:center;">
        <p style="margin:0 0 12px;color:#B8860B;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;">Du'a pour vous</p>
        <p style="margin:0;color:#1A1A18;font-size:16px;font-style:italic;line-height:1.8;font-family:Georgia,serif;">
          « Qu'Allah accepte votre sacrifice, vous accorde Sa miséricorde<br>
          et vous réunisse avec vos proches au Paradis. »
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#5C5347;font-size:14px;text-align:center;font-family:Georgia,serif;font-style:italic;">
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

/* ═══════════════════════════════════════════
   EMAIL 4 — LIVRAISON DE LA VIDÉO
   ═══════════════════════════════════════════ */
export async function sendVideoDelivery(order: Order, videoUrl: string) {
  const html = emailLayout(`
    <div style="text-align:center;margin:0 0 20px;">
      <span style="font-size:48px;">📹</span>
    </div>

    <h1 style="color:#1A1A18;font-size:26px;margin:0 0 8px;font-weight:bold;text-align:center;font-family:Georgia,serif;">
      Votre vidéo est prête, ${order.prenom}
    </h1>

    <p style="text-align:center;margin:0 0 28px;color:#B8860B;font-size:15px;font-style:italic;font-family:Georgia,serif;">
      Taqabbal Allahou minna wa minkoum
    </p>

    <p style="margin:0 0 24px;color:#5C5347;font-size:15px;line-height:1.7;text-align:center;">
      Votre sacrifice au nom de <strong style="color:#1A1A18;font-family:Georgia,serif;font-style:italic;">${order.niyyah}</strong> a été accompli dans le respect total de la Sunnah. Voici la preuve vidéo nominative que nous vous avions promise.
    </p>

    ${goldButton("VOIR MA VIDÉO", videoUrl)}

    <!-- Avertissement délai -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF6E3;border-left:4px solid #D4A843;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0 0 4px;color:#8B6508;font-size:14px;font-weight:bold;">
          ⏱ Ce lien reste valable 90 jours
        </p>
        <p style="margin:0;color:#5C5347;font-size:13px;line-height:1.6;">
          Pensez à télécharger la vidéo sur votre téléphone ou ordinateur pour la conserver durablement.
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#5C5347;font-size:14px;text-align:center;line-height:1.7;">
      Qu'Allah accepte votre sacrifice.<br>
      <em style="color:#B8860B;font-family:Georgia,serif;">Aïd Moubarak de toute l'équipe Qurbaniya.</em>
    </p>
  `);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    subject: `📹 Votre vidéo de sacrifice est prête — Qurbaniya`,
    html,
  });

  console.log("Email video delivery sent:", result);
  return result;
}
