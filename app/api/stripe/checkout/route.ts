import { NextRequest, NextResponse } from "next/server";
import { getStripe, PRICE_MOUTON } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { email, niyyah, metadata } = await req.json();

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Sacrifice Mouton — Qurbaniya",
              description: `Sacrifice au nom de ${niyyah}`,
            },
            unit_amount: PRICE_MOUTON,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${getBaseUrl()}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl()}/commander`,
      customer_email: email,
      metadata: metadata || {},
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement." },
      { status: 500 }
    );
  }
}
