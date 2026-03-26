import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { headers } from "next/headers";

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

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const metadata = session.metadata || {};

        // TODO: Update order status to 'paid' in Supabase
        // await supabase.from('orders').update({ payment_status: 'paid' })
        //   .eq('stripe_session_id', session.id);

        // TODO: Decrement inventory
        // await supabase.rpc('decrement_slots', { year: 2025 });

        // TODO: Send confirmation email via Resend
        // await sendOrderConfirmation(session.customer_email, metadata.prenom, metadata.niyyah);

        console.log("Payment completed:", session.id, metadata);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        // TODO: Mark order as failed
        // await supabase.from('orders').update({ payment_status: 'failed' })
        //   .eq('stripe_session_id', session.id);
        console.log("Session expired:", session.id);
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
