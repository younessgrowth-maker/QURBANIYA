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
} from "@/lib/referral";
import { computeSelfPromo, hasRedeemedSelfPromo } from "@/lib/self-promo";
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
    const quantity = Math.max(1, Math.min(5, data.quantity ?? 1));

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
    if (inventory && inventory.remaining < quantity) {
      return NextResponse.json(
        {
          error: `Il ne reste que ${inventory.remaining} mouton(s) disponible(s). Vous avez demandé ${quantity}. Ajustez votre commande ou contactez-nous via WhatsApp.`,
          code: "inventory_insufficient",
        },
        { status: 403 }
      );
    }

    // Pré-génération du UUID de la commande. Permet de l'embarquer dans le
    // success_url Stripe pour que /confirmation et /api/orders/by-session
    // exigent à la fois session_id ET order_id (PII protégée par 122 bits
    // d'entropie supplémentaires, contre lookup par session_id seul).
    const orderId = randomUUID();

    // ─── Codes : résoudre le rôle du code saisi (filleul vs self-promo) ───
    // On ne fait confiance qu'à un code dont la commande propriétaire est
    // `paid`. Fail-open silencieux : si le code est invalide/inconnu/non
    // éligible, on continue sans réduction (l'utilisateur n'est jamais bloqué).
    //
    // Deux rôles possibles pour un même code :
    //  - code d'UN AUTRE client  → rôle filleul (−15€, cf. migration 0011)
    //  - SON PROPRE code         → promo retour client (10/20€, migration 0021),
    //                              usage unique, saison courante seulement.
    const requestedCode = sanitizeReferralCode(data.referred_by_code);
    let referredByCode: string | null = null;
    let referrerOrderId: string | null = null;
    let selfPromoCode: string | null = null;
    let selfPromoAmount = 0;
    let discountAmount = 0;

    if (requestedCode) {
      const { data: owner } = await supabase
        .from("orders")
        .select("id, payment_status, email")
        .eq("referral_code", requestedCode)
        .maybeSingle();

      if (owner && owner.payment_status === "paid") {
        const sameEmail = owner.email?.toLowerCase() === data.email.toLowerCase();
        if (sameEmail) {
          // ── Promo retour client : le client utilise SON propre code ──
          // Éligibilité calculée sur l'activité de la saison précédente,
          // puis verrou d'usage unique pour la saison courante.
          const promo = await computeSelfPromo(supabase, data.email, CURRENT_YEAR);
          if (promo.amountEur > 0) {
            const alreadyUsed = await hasRedeemedSelfPromo(
              supabase,
              data.email,
              CURRENT_YEAR
            );
            if (!alreadyUsed) {
              selfPromoCode = requestedCode;
              selfPromoAmount = promo.amountEur;
              discountAmount = promo.amountEur;
            }
          }
        } else {
          // ── Rôle filleul : code d'un autre client ──
          referredByCode = requestedCode;
          referrerOrderId = owner.id;
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

    // ─── Création d'un coupon Stripe ad-hoc si une réduction s'applique ───
    // Coupon "once" rattaché à la session via `discounts`. Couvre les deux
    // cas (filleul ou promo retour client) — un seul code par commande, donc
    // un seul coupon. Plus traçable dans le dashboard Stripe que d'ajuster
    // unit_amount à la main.
    // NB: incompatible avec `allow_promotion_codes` (Stripe refuse les deux
    // en même temps), donc on désactive la saisie d'autre code promo dès
    // qu'une réduction est déjà appliquée.
    let stripeDiscounts: { coupon: string }[] | undefined;
    if (discountAmount > 0) {
      const couponName = referredByCode
        ? `Parrainage ${referredByCode}`
        : `Retour client ${selfPromoCode}`;
      const coupon = await stripe.coupons.create({
        amount_off: discountAmount * 100,
        currency: "eur",
        duration: "once",
        max_redemptions: 1,
        name: couponName,
        metadata: {
          order_id: orderId,
          ...(referredByCode ? { referred_by_code: referredByCode } : {}),
          ...(selfPromoCode ? { self_promo_code: selfPromoCode } : {}),
        },
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
              name:
                quantity === 1
                  ? "Sacrifice Mouton — Qurbaniya"
                  : `Sacrifice ${quantity} Moutons — Qurbaniya`,
              description:
                quantity === 1
                  ? `Sacrifice au nom de ${data.sacrifices[0]?.niyyah ?? ""} · Aïd el-Kébir 2026`
                  : `${quantity} sacrifices · Aïd el-Kébir 2026 · noms : ${data.sacrifices
                      .map((s) => s.niyyah)
                      .join(", ")}`,
            },
            unit_amount: PRICE_MOUTON,
          },
          // Multi-moutons : Stripe multiplie unit_amount par quantity côté
          // facturation. La somme totale chargée = PRICE_MOUTON × quantity
          // − (discount éventuel sur la session).
          quantity,
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
        // On garde intention/niyyah top-level (1er sacrifice) en métadata
        // pour faciliter la lecture rapide dans le dashboard Stripe.
        intention: data.sacrifices[0]?.intention ?? "pour_moi",
        niyyah: data.sacrifices[0]?.niyyah ?? "",
        // Quantité (visible dans le dashboard Stripe + lue par le webhook
        // pour décrémenter l'inventaire de N slots).
        quantity: String(quantity),
        // Mode cadeau (visible dans le dashboard Stripe)
        is_gift: isGift ? "1" : "0",
        ...(recipientName ? { recipient_name: recipientName } : {}),
        ...(recipientEmail ? { recipient_email: recipientEmail } : {}),
        // Parrainage (visible dans le dashboard Stripe)
        ...(referredByCode ? { referred_by_code: referredByCode } : {}),
        // Promo retour client (visible dans le dashboard Stripe)
        ...(selfPromoCode ? { self_promo_code: selfPromoCode } : {}),
      },
    });

    const { error: insertError } = await supabase.from("orders").insert({
      id: orderId,
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone || "",
      // Top-level miroir : 1er sacrifice. /admin et /admin/analytics
      // continuent à fonctionner sans changement (lecture simple).
      // La liste complète est dans la colonne sacrifices (jsonb).
      intention: data.sacrifices[0]?.intention ?? "pour_moi",
      niyyah: data.sacrifices[0]?.niyyah ?? "",
      sacrifices: data.sacrifices,
      quantity,
      payment_status: "pending",
      payment_method: "stripe",
      stripe_session_id: session.id,
      // amount reste le PRIX UNITAIRE (140€). Le total payé = amount ×
      // quantity − discount_amount, lu cohérence /admin et /admin/analytics.
      amount: PRICE_AMOUNT,
      is_gift: isGift,
      recipient_name: recipientName,
      recipient_message: recipientMessage,
      notify_recipient: notifyRecipient,
      recipient_email: recipientEmail,
      referred_by_code: referredByCode,
      referrer_order_id: referrerOrderId,
      discount_amount: discountAmount,
      // Édition de la commande (sert au calcul de la promo retour client).
      season: CURRENT_YEAR,
      // Promo retour client (self-promo) : son propre code + montant.
      self_promo_code: selfPromoCode,
      self_promo_amount: selfPromoAmount,
      // Affiliation : passthrough du code (cookie qrb_aff). Aucune
      // incidence sur le prix/Stripe — la commission est attribuée
      // au webhook après paiement si l'affilié est approuvé.
      affiliate_code: sanitizeAffiliateCode(data.affiliate_code),
    });

    if (insertError) {
      // Échec FATAL : on ne renvoie PAS checkout_url. Sans ligne en DB, un
      // paiement deviendrait une commande fantôme — le webhook ne trouverait
      // rien à réconcilier (ni email, ni décrément d'inventaire, ni code
      // parrain) : client débité, aucune trace. Mieux vaut un retry client.
      // La session Stripe créée mais non utilisée expire d'elle-même (~24h)
      // et reste invisible de notre DB.
      console.error("Order insert failed:", insertError);
      return NextResponse.json(
        {
          error:
            "Impossible d'enregistrer la commande. Réessayez dans quelques instants.",
          code: "order_insert_failed",
        },
        { status: 500 }
      );
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
