import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from "@/lib/validations";
import { getStripe, PRICE_MOUTON } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/utils";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendPaymentReminder } from "@/lib/resend";
import { PRICE_AMOUNT } from "@/lib/constants";
import type { Order } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);
    const supabase = createServiceRoleClient();

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
                description: `Sacrifice au nom de ${data.niyyah} · Aïd el-Kébir 2026`,
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

      const { error: insertError } = await supabase.from("orders").insert({
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
      });

      if (insertError) {
        console.error("Order insert failed (stripe path):", insertError);
      }

      return NextResponse.json({ checkout_url: session.url });
    }

    if (data.payment_method === "virement") {
      const { data: inserted, error: insertError } = await supabase
        .from("orders")
        .insert({
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          telephone: data.telephone || "",
          intention: data.intention,
          niyyah: data.niyyah,
          payment_status: "pending",
          payment_method: "virement",
          amount: PRICE_AMOUNT,
        })
        .select()
        .single();

      if (insertError || !inserted) {
        console.error("Order insert failed (virement path):", insertError);
        return NextResponse.json(
          { error: "Erreur lors de la création de la commande." },
          { status: 500 }
        );
      }

      try {
        await sendPaymentReminder(inserted as Order);
      } catch (emailError) {
        console.error("Payment reminder email failed:", emailError);
      }

      return NextResponse.json({
        checkout_url: `/confirmation?method=virement&ref=${inserted.id}`,
      });
    }

    // PayPal : stub inchangé — TODO sprint ultérieur (implémenter SDK PayPal + insert DB)
    return NextResponse.json({
      checkout_url: `/confirmation?method=paypal`,
    });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande." },
      { status: 400 }
    );
  }
}
