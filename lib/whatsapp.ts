// ─── Helpers WhatsApp via Whapi.cloud ────────────────────────────────
// Whapi expose une API REST simple : POST /messages/text avec un token
// Bearer. Le compte WhatsApp utilisé est celui connecté côté Whapi via
// scan QR. Les messages partent du numéro réel de l'utilisateur Whapi
// (en l'occurrence le numéro pro Qurbaniya).
//
// Free trial : suffisant pour le broadcast one-shot des 39 clients. Si
// besoin de monter, il faudra passer en plan payant Whapi (~30€/mois).

const WHAPI_BASE = "https://gate.whapi.cloud";

/**
 * Normalise un numéro de téléphone au format international sans préfixe.
 * Exemples :
 *  - "+33614168415"     → "33614168415"
 *  - "0699635266"       → "33699635266"  (assume FR si 10 chiffres avec 0)
 *  - "0033627933085"    → "33627933085"
 *  - "+32484825861"     → "32484825861"  (Belgique)
 *  - "33784102379"      → "33784102379"  (déjà bon)
 * Retourne null si invalide.
 */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let p = raw.trim();
  // + initial → 00 (puis on retire 00)
  if (p.startsWith("+")) p = p.slice(1);
  // Retire tout sauf digits
  p = p.replace(/[^0-9]/g, "");
  // Préfixe international 00xx → xx
  if (p.startsWith("00")) p = p.slice(2);
  // Numéro français 10 chiffres avec 0 initial → 33 + 9 chiffres
  if (p.length === 10 && p.startsWith("0")) p = "33" + p.slice(1);
  if (p.length < 8 || p.length > 15) return null;
  return p;
}

interface SendOptions {
  to: string; // numéro normalisé, sans + ni espaces
  body: string;
}

/** Envoie un message texte via Whapi. Throw si erreur réseau ou API. */
export async function sendWhatsAppText({ to, body }: SendOptions): Promise<{ id: string }> {
  const token = process.env.WHAPI_TOKEN;
  if (!token) {
    throw new Error("WHAPI_TOKEN env var missing");
  }

  const res = await fetch(`${WHAPI_BASE}/messages/text`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, body }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Whapi ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = (await res.json()) as { sent?: boolean; message?: { id: string } };
  if (!data.sent || !data.message?.id) {
    throw new Error(`Whapi unexpected response: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return { id: data.message.id };
}

/** Template du message de relance panier abandonné (WhatsApp court). */
export function abandonedCartMessage(prenom: string, resumeUrl: string): string {
  return `Salam ${prenom} 🌙

Tu as commencé une commande pour le sacrifice de l'Aïd al-Adha sur Qurbaniya mais le paiement n'a pas été finalisé.

L'Aïd c'est le mercredi 27 mai 2026, in sha Allah. Il reste encore des places mais elles partent vite.

👉 Reprends ton paiement directement :
${resumeUrl}

Si tu as une question, réponds à ce message.

— L'équipe Qurbaniya`;
}

/** Template du message de livraison vidéo de sacrifice. */
export function videoDeliveryMessage(
  prenom: string,
  niyyah: string,
  videoUrl: string,
): string {
  return `Salam ${prenom} 🌙

Aïd Moubarak ! La vidéo nominative de votre sacrifice au nom de *${niyyah}* est prête.

👉 Regardez ou téléchargez ici (lien valide 90 jours) :
${videoUrl}

Qu'Allah accepte de vous et de votre famille.
Taqabbal Allahou minna wa minkoum.

— L'équipe Qurbaniya`;
}

/** Template du message d'annonce du programme parrainage. */
export function referralLaunchMessage(prenom: string, code: string): string {
  return `Salam ${prenom} 🌙

On a lancé le programme parrainage Qurbaniya pour l'Aïd 2026 (un email t'a aussi été envoyé, au cas où tu serais passé à côté).

🎁 Ton code : *${code}*

• Tes proches qui l'utilisent ont −15€ sur leur commande
• Tu reçois 20€ d'avoir pour ta commande Aïd 2027 dès ton 1er filleul payé

👉 Ton lien à partager directement :
https://qurbaniya.fr/?ref=${code}

Tu peux transférer ce message tel quel à ta famille et tes amis 🙏

Aïd Moubarak en avance,
— L'équipe Qurbaniya`;
}
