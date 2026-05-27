import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// Vide la vidéo d'un sacrifice donné (ou de toute la commande si
// sacrifice_index est omis). Utile en cas d'upload par erreur :
//   - on a uploadé la vidéo d'un autre client sur la mauvaise commande
//   - on s'est trompé d'étiquette (OCR a matché un mauvais N°)
//   - on doit re-tourner la vidéo
//
// Reset aussi video_sent + video_sent_at pour permettre le re-envoi propre.
// Reset aid_reminder_sent_at NON — c'est un email différent (J-X).
//
// Auth admin only.

export const dynamic = "force-dynamic";

const schema = z.object({
  order_id: z.string().uuid(),
  // Si omis : vide TOUTES les vidéos de la commande (video_paths = []).
  // Si fourni : ne vide que cette position (remet "" dans l'array).
  sacrifice_index: z.number().int().min(0).max(4).optional(),
});

export async function POST(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();
  const { order_id, sacrifice_index } = parsed.data;

  // Fetch la commande pour connaître quantity + array existant.
  const { data: order, error: fetchErr } = await supabase
    .from("orders")
    .select("id, quantity, video_paths")
    .eq("id", order_id)
    .maybeSingle();

  if (fetchErr) {
    return NextResponse.json(
      { error: "Fetch failed", details: fetchErr.message },
      { status: 500 }
    );
  }
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const qty = (order.quantity as number | null | undefined) ?? 1;
  let nextPaths: string[] | null;

  if (typeof sacrifice_index === "number") {
    if (sacrifice_index >= qty) {
      return NextResponse.json(
        { error: `sacrifice_index ${sacrifice_index} hors borne (quantity=${qty})` },
        { status: 400 }
      );
    }
    // Vide seulement cette position, garde les autres.
    const existing = Array.isArray(order.video_paths)
      ? (order.video_paths as string[])
      : [];
    nextPaths = Array.from({ length: qty }, (_, i) => {
      if (i === sacrifice_index) return "";
      return existing[i] ?? "";
    });
  } else {
    // Vide TOUT.
    nextPaths = null;
  }

  // Si nextPaths est null OU ne contient que des chaînes vides → on remet
  // video_url à null aussi (miroir) + on reset video_sent + video_sent_at
  // pour que l'email puisse être réenvoyé proprement après le re-upload.
  const allEmpty =
    nextPaths === null || nextPaths.every((p) => !p || p.trim() === "");

  const update: Record<string, unknown> = {
    video_paths: nextPaths,
    updated_at: new Date().toISOString(),
  };
  if (allEmpty) {
    update.video_url = null;
    update.video_sent = false;
    update.video_sent_at = null;
  } else if (
    typeof sacrifice_index === "number" &&
    sacrifice_index === 0 &&
    nextPaths !== null
  ) {
    // Si on vide la position 0 mais qu'il reste d'autres vidéos, on remet
    // video_url sur la prochaine non vide pour cohérence du miroir legacy.
    const firstNonEmpty = nextPaths.find((p) => p && p.trim() !== "") ?? null;
    update.video_url = firstNonEmpty;
  }

  const { data, error } = await supabase
    .from("orders")
    .update(update)
    .eq("id", order_id)
    .select("id, video_paths, video_url, video_sent, video_sent_at")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: "Update failed", details: error.message, code: error.code },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    cleared: typeof sacrifice_index === "number" ? `index ${sacrifice_index}` : "all",
    order: data,
  });
}
