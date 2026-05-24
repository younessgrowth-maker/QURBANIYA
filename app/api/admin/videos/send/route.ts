import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { sendVideoDelivery } from "@/lib/resend";
import {
  normalizePhone,
  sendWhatsAppText,
  videoDeliveryMessage,
  videoDeliveryMessageMulti,
} from "@/lib/whatsapp";
import { expandOrderToSacrifices } from "@/lib/sacrifices";
import type { Order } from "@/types";

// Envoie au client l'email + WhatsApp avec les liens signés vers ses vidéos.
// Multi-mouton : 1 seul email/WA contenant les N liens (1 par sacrifice).
// Conditions : order payée + TOUTES les vidéos uploadées (video_paths[i]
// non vide pour i ∈ [0, quantity[).

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

  // Expanse la commande en N sacrifices (1 si single-mouton, N si multi).
  // expandOrderToSacrifices gère le fallback video_paths vide → [video_url].
  const items = expandOrderToSacrifices(order as Order, 0);
  const missingVideo = items.find((it) => !it.videoPath);
  if (missingVideo) {
    return NextResponse.json(
      {
        error: `Vidéo manquante pour le sacrifice ${
          missingVideo.sacrificeIndex + 1
        } / ${items.length}`,
      },
      { status: 400 }
    );
  }

  // Génère un signed URL par sacrifice (90j) — chaque vidéo a son propre
  // path Storage, donc N appels createSignedUrl.
  const videos: Array<{ niyyah: string; url: string }> = [];
  for (const it of items) {
    if (!it.videoPath) continue;
    const { data: signed, error: signError } = await supabase.storage
      .from("sacrifice-videos")
      .createSignedUrl(it.videoPath, SIGNED_URL_TTL_SECONDS);
    if (signError || !signed) {
      console.error("Signed URL failed for", it.videoPath, signError);
      return NextResponse.json(
        { error: `Signed URL failed for sacrifice ${it.sacrificeIndex + 1}` },
        { status: 500 }
      );
    }
    videos.push({ niyyah: it.niyyah, url: signed.signedUrl });
  }

  // ─── 1. Email (bloquant — l'email est la garantie principale de livraison) ───
  try {
    await sendVideoDelivery(order as Order, videos);
  } catch (emailError) {
    console.error("Video delivery email failed:", emailError);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }

  // ─── 2. WhatsApp (best-effort — n'échoue PAS la requête si ça plante) ───
  // Single : message classique. Multi : message qui liste les N vidéos.
  let waSent = false;
  let waError: string | null = null;
  const phone = normalizePhone((order as Order).telephone);
  if (phone) {
    try {
      const msg =
        videos.length > 1
          ? videoDeliveryMessageMulti((order as Order).prenom, videos)
          : videoDeliveryMessage(
              (order as Order).prenom,
              videos[0].niyyah || `${(order as Order).prenom} ${(order as Order).nom}`,
              videos[0].url
            );
      await sendWhatsAppText({ to: phone, body: msg });
      waSent = true;
    } catch (e) {
      waError = e instanceof Error ? e.message.slice(0, 200) : "unknown";
      console.warn("Video delivery WA failed:", waError);
    }
  } else {
    waError = "phone invalid";
  }

  const sentAt = new Date().toISOString();
  await supabase
    .from("orders")
    .update({ video_sent: true, video_sent_at: sentAt, updated_at: sentAt })
    .eq("id", order.id);

  return NextResponse.json({
    ok: true,
    email_sent: true,
    wa_sent: waSent,
    wa_error: waError,
    videos_count: videos.length,
  });
}
