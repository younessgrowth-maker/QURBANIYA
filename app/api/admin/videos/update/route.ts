import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// Appelé par le dashboard admin après upload d'une vidéo dans Supabase Storage.
// Associe le chemin de la vidéo à la commande (orders.video_url).
// N'envoie pas l'email — l'envoi se fait via /api/admin/videos/send.

const updateSchema = z.object({
  order_id: z.string().uuid(),
  video_path: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const { data: { user } } = await authClient.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ video_url: parsed.data.video_path, updated_at: new Date().toISOString() })
    .eq("id", parsed.data.order_id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Video update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, order: data });
}
