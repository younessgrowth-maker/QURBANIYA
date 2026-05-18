import { NextRequest, NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  createServiceRoleClient,
} from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { sanitizeAffiliateCode, AFFILIATE_COMMISSION_EUR } from "@/lib/affiliate";

// Gestion des affiliés depuis le dashboard admin.
//   POST  → créer un affilié
//   PATCH → modifier un affilié existant (approved / commission / payout_note)
//
// Aucune incidence sur le tunnel de paiement. Auth admin obligatoire.

async function requireAdmin() {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  return !!user && isAdminEmail(user.email);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    code?: string;
    name?: string;
    email?: string;
    phone?: string;
    commission_eur?: number;
    approved?: boolean;
    payout_note?: string;
  };

  const code = sanitizeAffiliateCode(body.code);
  const name = body.name?.trim();
  const email = body.email?.trim();

  if (!code) {
    return NextResponse.json(
      { error: "Code invalide (3-24 caractères : lettres, chiffres, tirets)" },
      { status: 400 }
    );
  }
  if (!name) {
    return NextResponse.json({ error: "Nom requis" }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: "Email requis" }, { status: 400 });
  }

  const commission =
    Number.isFinite(body.commission_eur) && (body.commission_eur as number) >= 0
      ? Math.round(body.commission_eur as number)
      : AFFILIATE_COMMISSION_EUR;

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("affiliates")
    .insert({
      code,
      name,
      email,
      phone: body.phone?.trim() || "",
      commission_eur: commission,
      approved: !!body.approved,
      payout_note: body.payout_note?.trim() || null,
    })
    .select("id")
    .single();

  if (error) {
    // 23505 = code déjà pris (contrainte unique)
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json(
        { error: `Le code "${code}" est déjà utilisé.` },
        { status: 409 }
      );
    }
    console.error("Affiliate create failed:", error);
    return NextResponse.json({ error: "Erreur création" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id, code });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    id?: string;
    approved?: boolean;
    commission_eur?: number;
    payout_note?: string;
  };

  if (!body.id) {
    return NextResponse.json({ error: "id requis" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (typeof body.approved === "boolean") patch.approved = body.approved;
  if (
    Number.isFinite(body.commission_eur) &&
    (body.commission_eur as number) >= 0
  ) {
    patch.commission_eur = Math.round(body.commission_eur as number);
  }
  if (typeof body.payout_note === "string") {
    patch.payout_note = body.payout_note.trim() || null;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "Aucun champ à modifier" },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("affiliates")
    .update(patch)
    .eq("id", body.id);

  if (error) {
    console.error("Affiliate update failed:", error);
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
