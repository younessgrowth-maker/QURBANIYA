import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from "@/lib/validations";
import { getStripe, PRICE_MOUTON } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/utils";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getInventory } from "@/lib/supabase/queries";
import { PRICE_AMOUNT, CURRENT_YEAR } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
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
      console.error("Order insert failed:", insertError);
    }

    return NextResponse.json({ checkout_url: session.url });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande." },
      { status: 400 }
    );
  }
}
