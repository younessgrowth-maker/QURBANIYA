import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sanitizeReferralCode, REFERRAL_DISCOUNT_EUR } from "@/lib/referral";

// Endpoint public — validation d'un code parrain pour affichage instantané
// sur /commander. Ne révèle JAMAIS d'email/téléphone : juste le prénom du
// parrain (pour humaniser le message UX) et la réduction applicable.

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("code");
  const code = sanitizeReferralCode(raw);
  const email = req.nextUrl.searchParams.get("email")?.trim().toLowerCase() || null;

  if (!code) {
    return NextResponse.json(
      { valid: false, reason: "format" },
      { status: 200 }
    );
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("orders")
    .select("prenom, payment_status, email")
    .eq("referral_code", code)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json(
      { valid: false, reason: "not_found" },
      { status: 200 }
    );
  }

  // Sécurité : un code parrain n'est valide que si la commande du parrain
  // a effectivement été payée. Sinon n'importe qui pourrait générer un
  // code en initiant une commande non-payée.
  if (data.payment_status !== "paid") {
    return NextResponse.json(
      { valid: false, reason: "not_paid" },
      { status: 200 }
    );
  }

  // Anti-auto-parrainage : le même contrôle qu'à la création de commande
  // (app/api/orders/route.ts). Sans ça, l'UI afficherait une réduction qui
  // serait silencieusement annulée côté serveur → Stripe facture le plein
  // tarif et le client se sent trompé.
  if (email && data.email?.toLowerCase() === email) {
    return NextResponse.json(
      { valid: false, reason: "own_code" },
      { status: 200 }
    );
  }

  return NextResponse.json({
    valid: true,
    ownerPrenom: data.prenom,
    discountEur: REFERRAL_DISCOUNT_EUR,
  });
}
