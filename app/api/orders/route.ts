import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { orderSchema } from "@/lib/validations";
import { getStripe, PRICE_MOUTON } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/utils";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getInventory } from "@/lib/supabase/queries";
import { PRICE_AMOUNT, CURRENT_YEAR, isOrderingOpen } from "@/lib/constants";
import {
  sanitizeReferralCode,
  REFERRAL_DISCOUNT_EUR,
  REFERRAL_DISCOUNT_CENTS,
} from "@/lib/referral";
import { sanitizeAffiliateCode } from "@/lib/affiliate";

export async function POST(req: NextRequest) {
  try {
    // Hard cutoff : aucune commande après le jour de l'Aïd. Vérifié AVANT le parse
    // pour court-circuiter Stripe et la DB si la fenêtre est fermée.
    if (!isOrderingOpen()) {
      return NextResponse.json(
        {
          error:
            "Les réservations pour l'Aïd al-Adha 2026 sont closes. La prochaine édition ouvrira début 2027.",
          code: "aid_closed",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const data = orderSchema.parse(body);
    const supabase = createServiceRoleClient();

    // Garde-fou : refuser la commande si les réservations sont closes ou complètes.
    // Fail-open si Supabase injoignable (inventory null) — on préfère accepter une
    // commande qu'on pourra gérer manuellement plutôt que bloquer tout le tunnel
    // sur un glitch Supabase.
    const inventory = await getInventory(CURRENT_YEAR);
    if (inventory && (!inventory.isOpen || inventory.remaining <= 0)) {
      return NextResponse.json(
        {
          error: "Les réservations pour l'Aïd 2026 sont complètes. Contactez-nous pour être inscrit sur liste d'attente.",
          code: "inventory_full",
        },
        { status: 403 }
      );
    }

    // Pré-génération du UUID de la commande. Permet de l'embarquer dans le
    // success_url Stripe pour que /confirmation et /api/orders/by-session
    // exigent à la fois session_id ET order_id (PII protégée par 122 bits
    // d'entropie supplémentaires, contre lookup par session_id seul).
    const orderId = randomUUID();

    // ─── Parrainage : valider le code et résoudre la commande du parrain ───
    // On ne fait confiance qu'à un code dont la commande parrain est `paid`.
    // Fail-open silencieux : si le code est invalide ou inconnu, on continue
    // sans réduction (l'utilisateur n'est pas bloqué).
    const requestedCode = sanitizeReferralCode(data.referred_by_code);
    let referredByCode: string | null = null;
    let referrerOrderId: string | null = null;
    let discountAmount = 0;

    if (requestedCode) {
      const { data: referrer } = await supabase
        .from("orders")
        .select("id, payment_status, email")
        .eq("referral_code", requestedCode)
        .maybeSingle();

      if (referrer && referrer.payment_status === "paid") {
        // Garde-fou anti-self-referral : un client ne peut pas utiliser son
        // propre code (même email). On compare insensiblement à la casse.
        if (referrer.email?.toLowerCase() !== data.email.toLowerCase()) {
          referredByCode = requestedCode;
          referrerOrderId = referrer.id;
          discountAmount = REFERRAL_DISCOUNT_EUR;
        }
      }
    }

    // Mode cadeau : nettoyer/normaliser les champs avant persistance.
    const isGift = !!data.is_gift && !!data.recipient_name?.trim();
    const recipientName = isGift ? data.recipient_name?.trim() || null : null;
    const recipientMessage = isGift ? data.recipient_message?.trim() || null : null;
    const notifyRecipient = isGift && !!data.notify_recipient;
    const recipientEmail = notifyRecipient ? data.recipient_email?.trim() || null : null;

    const stripe = getStripe();

    // ─── Création d'un coupon Stripe ad-hoc si parrainage valide ───
    // Coupon "once" rattaché à la session via `discounts`. Plus traçable
    // dans le dashboard Stripe que d'ajuster unit_amount à la main.
    // NB: incompatible avec `allow_promotion_codes` (Stripe refuse les deux
    // en même temps), donc on désactive la saisie d'autre code promo si
    // un parrainage est déjà appliqué.
    let stripeDiscounts: { coupon: string }[] | undefined;
    if (referredByCode) {
      const coupon = await stripe.coupons.create({
        amount_off: REFERRAL_DISCOUNT_CENTS,
        currency: "eur",
        duration: "once",
        max_redemptions: 1,
        name: `Parrainage ${referredByCode}`,
        metadata: { referred_by_code: referredByCode, order_id: orderId },
      });
      stripeDiscounts = [{ coupon: coupon.id }];
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      ...(stripeDiscounts
        ? { discounts: stripeDiscounts }
        : { allow_promotion_codes: true }),
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Sacrifice Mouton — Qurbaniya",
              description: `Sacrifice au nom de ${data.niyyah} · Aïd el-Kébir 2026`,
            },
            unit_amount: PRICE_MOUTON,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${getBaseUrl()}/confirmation?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${getBaseUrl()}/commander`,
      customer_email: data.email,
      metadata: {
        order_id: orderId,
        prenom: data.prenom,
        nom: data.nom,
        telephone: data.telephone || "",
        intention: data.intention,
        niyyah: data.niyyah,
        // Mode cadeau (visible dans le dashboard Stripe)
        is_gift: isGift ? "1" : "0",
        ...(recipientName ? { recipient_name: recipientName } : {}),
        ...(recipientEmail ? { recipient_email: recipientEmail } : {}),
        // Parrainage (visible dans le dashboard Stripe)
        ...(referredByCode ? { referred_by_code: referredByCode } : {}),
      },
    });

    const { error: insertError } = await supabase.from("orders").insert({
      id: orderId,
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone || "",
      intention: data.intention,
      niyyah: data.niyyah,
      payment_status: "pending",
      payment_method: "stripe",
      stripe_session_id: session.id,
      amount: PRICE_AMOUNT,
      is_gift: isGift,
      recipient_name: recipientName,
      recipient_message: recipientMessage,
      notify_recipient: notifyRecipient,
      recipient_email: recipientEmail,
      referred_by_code: referredByCode,
      referrer_order_id: referrerOrderId,
      discount_amount: discountAmount,
      // Affiliation : passthrough du code (cookie qrb_aff). Aucune
      // incidence sur le prix/Stripe — la commission est attribuée
      // au webhook après paiement si l'affilié est approuvé.
      affiliate_code: sanitizeAffiliateCode(data.affiliate_code),
    });

    if (insertError) {
      console.error("Order insert failed:", insertError);
    }

    return NextResponse.json({ checkout_url: session.url });
  } catch (error) {
    // Ne JAMAIS logger l'objet error brut: Zod errors contiennent les valeurs
    // soumises par l'utilisateur (email, téléphone, niyyah). Vercel logs sont
    // exportables → fuite PII.
    if (error instanceof Error) {
      console.error("Order error:", error.name, error.message);
    } else {
      console.error("Order error: unknown");
    }
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande." },
      { status: 400 }
    );
  }
}
