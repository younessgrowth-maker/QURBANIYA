import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { sendVideoDelivery } from "@/lib/resend";
import type { Order } from "@/types";

// Envoie au client l'email avec le lien signé vers sa vidéo (expire 90 jours).
// Conditions : order payée + video_url présente. Idempotent côté email —
// video_sent passe à true après envoi réussi.

const sendSchema = z.object({
  order_id: z.string().uuid(),
});

const SIGNED_URL_TTL_SECONDS = 90 * 24 * 60 * 60; // 90 jours

export async function POST(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const { data: { user } } = await authClient.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = sendSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", parsed.data.order_id)
    .maybeSingle();

  if (fetchError) {
    console.error("Order fetch failed:", fetchError);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.payment_status !== "paid") {
    return NextResponse.json({ error: "Order not paid" }, { status: 400 });
  }

  if (!order.video_url) {
    return NextResponse.json({ error: "No video uploaded for this order" }, { status: 400 });
  }

  const { data: signed, error: signError } = await supabase.storage
    .from("sacrifice-videos")
    .createSignedUrl(order.video_url, SIGNED_URL_TTL_SECONDS);

  if (signError || !signed) {
    console.error("Signed URL failed:", signError);
    return NextResponse.json({ error: "Signed URL failed" }, { status: 500 });
  }

  try {
    await sendVideoDelivery(order as Order, signed.signedUrl);
  } catch (emailError) {
    console.error("Video delivery email failed:", emailError);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }

  await supabase
    .from("orders")
    .update({ video_sent: true, updated_at: new Date().toISOString() })
    .eq("id", order.id);

  return NextResponse.json({ ok: true });
}
