import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from "@/lib/validations";
import { getStripe, PRICE_MOUTON } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    // TODO: Save order in Supabase with status 'pending'
    // const { data: order } = await supabase.from('orders').insert({...}).select().single();

    if (data.payment_method === "stripe") {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Sacrifice Mouton — Qurbaniya",
                description: `Sacrifice au nom de ${data.niyyah} · Aïd el-Kébir 2025`,
              },
              unit_amount: PRICE_MOUTON,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${getBaseUrl()}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${getBaseUrl()}/commander`,
        customer_email: data.email,
        metadata: {
          prenom: data.prenom,
          nom: data.nom,
          telephone: data.telephone || "",
          intention: data.intention,
          niyyah: data.niyyah,
        },
      });

      return NextResponse.json({ checkout_url: session.url });
    }

    if (data.payment_method === "paypal") {
      // TODO: Create PayPal order via API
      return NextResponse.json({
        checkout_url: `/confirmation?method=paypal`,
      });
    }

    // Virement — show bank details on confirmation page
    return NextResponse.json({
      checkout_url: `/confirmation?method=virement`,
    });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande." },
      { status: 400 }
    );
  }
}
