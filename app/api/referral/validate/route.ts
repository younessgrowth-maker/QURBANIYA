import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sanitizeReferralCode, REFERRAL_DISCOUNT_EUR } from "@/lib/referral";
import { computeSelfPromo, hasRedeemedSelfPromo } from "@/lib/self-promo";
import { CURRENT_YEAR } from "@/lib/constants";

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

  // Son propre code : ce n'est plus un rejet sec. Si le client est éligible
  // à la promo retour client (a commandé/parrainé l'édition précédente) et
  // ne l'a pas déjà utilisée cette saison, on renvoie la réduction perso.
  // Sinon on retombe sur l'ancien message "own_code" (à partager aux proches).
  if (email && data.email?.toLowerCase() === email) {
    const promo = await computeSelfPromo(supabase, email, CURRENT_YEAR);
    if (promo.amountEur > 0) {
      const alreadyUsed = await hasRedeemedSelfPromo(supabase, email, CURRENT_YEAR);
      if (!alreadyUsed) {
        return NextResponse.json({
          valid: true,
          kind: "self_promo",
          ownerPrenom: data.prenom,
          discountEur: promo.amountEur,
        });
      }
    }
    return NextResponse.json(
      { valid: false, reason: "own_code" },
      { status: 200 }
    );
  }

  return NextResponse.json({
    valid: true,
    kind: "referral",
    ownerPrenom: data.prenom,
    discountEur: REFERRAL_DISCOUNT_EUR,
  });
}
