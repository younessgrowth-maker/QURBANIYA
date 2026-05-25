import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { normalizePhone } from "@/lib/whatsapp";

// PATCH /api/admin/orders/phone
// Body : { order_id: string, telephone: string }
//
// Mise à jour rapide du téléphone d'une commande depuis le dashboard admin.
// Utilisé spécifiquement à J-2/J-1 de l'Aïd quand les clients qui n'ont pas
// renseigné leur tel à la commande répondent à l'email "on a besoin de ton
// numéro pour la vidéo" avec leur numéro.
//
// Le numéro est normalisé (format international sans + ni espaces) via
// normalizePhone() pour qu'il soit immédiatement utilisable par
// /api/admin/videos/send (livraison WA jeudi 28 mai).
//
// Pas d'authentification webhook ou batch : 1 commande = 1 PATCH = 1 admin
// qui clique. Auth standard admin.

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  // Auth admin
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    order_id?: string;
    telephone?: string;
  };

  if (!body.order_id) {
    return NextResponse.json({ error: "order_id required" }, { status: 400 });
  }

  const raw = (body.telephone ?? "").trim();
  // Permet de "vider" le téléphone si l'admin envoie une string vide explicite.
  let normalized: string | null = null;
  if (raw.length > 0) {
    const cleaned = normalizePhone(raw);
    if (!cleaned) {
      return NextResponse.json(
        {
          error:
            "Numéro invalide. Format attendu : +33XXXXXXXXX, 0XXXXXXXXX, ou international (8-15 chiffres).",
        },
        { status: 400 },
      );
    }
    // On stocke avec le préfixe + pour la cohérence d'affichage et de lecture.
    normalized = `+${cleaned}`;
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ telephone: normalized ?? "" })
    .eq("id", body.order_id)
    .select("id, prenom, nom, telephone")
    .maybeSingle();

  if (error) {
    console.error("admin/orders/phone PATCH failed", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, order: data });
}
