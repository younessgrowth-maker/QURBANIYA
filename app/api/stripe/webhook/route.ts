import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendOrderConfirmation } from "@/lib/resend";
import { CURRENT_YEAR } from "@/lib/constants";
import type { Order } from "@/types";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const supabase = createServiceRoleClient();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const { data: order, error: updateError } = await supabase
          .from("orders")
          .update({ payment_status: "paid", updated_at: new Date().toISOString() })
          .eq("stripe_session_id", session.id)
          .select()
          .single();

        if (updateError || !order) {
          console.error("Order update failed on completed:", session.id, updateError);
          // Return 200 : Stripe ne doit pas retry si la ligne n'existe pas (commande hors-DB)
          return NextResponse.json({ received: true });
        }

        const { error: rpcError } = await supabase.rpc("decrement_slots", {
          target_year: CURRENT_YEAR,
        });
        if (rpcError) {
          console.error("Inventory decrement failed:", rpcError);
        }

        try {
          await sendOrderConfirmation(order as Order);
        } catch (emailError) {
          console.error("Confirmation email failed:", emailError);
        }

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        const { error: updateError } = await supabase
          .from("orders")
          .update({ payment_status: "failed", updated_at: new Date().toISOString() })
          .eq("stripe_session_id", session.id);

        if (updateError) {
          console.error("Order update failed on expired:", session.id, updateError);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 }
    );
  }
}
