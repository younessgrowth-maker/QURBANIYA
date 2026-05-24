import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { CURRENT_YEAR } from "@/lib/constants";

export const runtime = "nodejs";

// ─── Inscription liste d'attente "stock complet" ─────────────────────────
// Appelé depuis SoldOutPanel (rendu sur /commander quand l'inventaire est
// fermé/épuisé). On capture juste de quoi recontacter le visiteur si le
// fournisseur libère des places (debloque 100 moutons, p.ex.).
//
// Dédup : si (year, email) existe déjà → 200 silencieux, on ne plante pas
// l'UX et on évite les doublons. Pas d'envoi d'email de confirmation pour
// l'instant (geste manuel quand le stock revient).

const schema = z.object({
  prenom: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(160),
  telephone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  source: z.string().trim().max(40).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const supabase = createServiceRoleClient();

    // Dédup soft : on regarde si on a déjà cet email pour l'année en cours
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("year", CURRENT_YEAR)
      .ilike("email", data.email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ ok: true, already: true });
    }

    const { error } = await supabase.from("waitlist").insert({
      year: CURRENT_YEAR,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone ?? null,
      source: data.source ?? "commander",
    });

    if (error) {
      console.error("waitlist insert failed", error);
      return NextResponse.json(
        { ok: false, error: "Erreur d'enregistrement. Réessaie dans quelques instants." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Vérifie ton prénom et ton email." },
        { status: 400 }
      );
    }
    console.error("waitlist route exception", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
