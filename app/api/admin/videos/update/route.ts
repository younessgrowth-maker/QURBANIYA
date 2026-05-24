import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// Appelé par le dashboard admin après upload d'une vidéo dans Supabase Storage.
// Associe le chemin de la vidéo au sacrifice (position `sacrifice_index` dans
// la commande). Stocke dans orders.video_paths[idx] (jsonb array, migration 0020).
// Maintient orders.video_url en miroir de video_paths[0] pour backward compat.
//
// N'envoie pas l'email — l'envoi se fait via /api/admin/videos/send.

const updateSchema = z.object({
  order_id: z.string().uuid(),
  // Position dans sacrifices[] / video_paths[]. 0 pour single-mouton, 0..N-1
  // pour multi. Default 0 pour rétrocompat avec un éventuel ancien client.
  sacrifice_index: z.number().int().min(0).max(4).optional().default(0),
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
  const { order_id, sacrifice_index, video_path } = parsed.data;

  // Fetch la commande pour connaître quantity (longueur cible de l'array)
  // et l'array video_paths existant qu'on va merger.
  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("id, quantity, video_paths, video_url")
    .eq("id", order_id)
    .maybeSingle();

  if (fetchError) {
    console.error("Order fetch failed:", fetchError);
    return NextResponse.json(
      { error: "Fetch failed", details: fetchError.message, code: fetchError.code },
      { status: 500 }
    );
  }
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const qty = (order.quantity as number | null | undefined) ?? 1;
  if (sacrifice_index >= qty) {
    return NextResponse.json(
      { error: `sacrifice_index ${sacrifice_index} hors borne (quantity=${qty})` },
      { status: 400 }
    );
  }

  // Reconstruit l'array video_paths complet (longueur quantity, "" pour les
  // positions pas encore uploadées). Plus simple que jsonb_set côté Postgres
  // et garantit la longueur.
  const existing = Array.isArray(order.video_paths) ? (order.video_paths as string[]) : [];
  const nextPaths: string[] = Array.from({ length: qty }, (_, i) => {
    if (i === sacrifice_index) return video_path;
    return existing[i] ?? "";
  });

  // Miroir : video_url = video_paths[0] (legacy code reading video_url
  // continue de fonctionner pour single-mouton + premier sacrifice du multi).
  const mirrorVideoUrl =
    sacrifice_index === 0 ? video_path : order.video_url ?? null;

  const { data, error } = await supabase
    .from("orders")
    .update({
      video_paths: nextPaths,
      video_url: mirrorVideoUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", order_id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Video update failed:", error);
    return NextResponse.json(
      {
        error: "Update failed",
        details: error.message,
        code: error.code,
        hint: error.hint,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, order: data });
}
