import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { escapeLike } from "@/lib/utils";
import type { Order } from "@/types";

// GET /api/admin/referral-lookup?q=...
//
// Cherche les commandes correspondant à `q` (téléphone, email ou nom)
// et renvoie pour chaque candidat :
//   - infos de base (id, prenom, nom, email, telephone, referral_code)
//   - referrer_reward_paid_at (récompense créditée ?)
//   - liste des filleuls (commandes avec referred_by_code = candidat.referral_code)
//     avec leur statut paiement et la réduction appliquée
//
// Heuristique de matching :
//   1. q contient ≥ 6 digits → recherche par téléphone (LIKE %digits)
//   2. q contient @ → recherche par email (ILIKE %q%)
//   3. sinon → recherche par prénom OU nom (ILIKE %q%)
//
// Limite : 5 candidats max, 50 filleuls par candidat (sanity caps).

export const dynamic = "force-dynamic";

const MAX_CANDIDATES = 5;
const MAX_FILLEULS_PER_CANDIDATE = 50;

interface Candidate {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  referral_code: string | null;
  referrer_reward_paid_at: string | null;
  referred_by_code: string | null;
  payment_status: string;
  amount: number;
  quantity: number;
  discount_amount: number;
  created_at: string;
  filleuls: Array<{
    id: string;
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    payment_status: string;
    amount: number;
    quantity: number;
    discount_amount: number;
    created_at: string;
  }>;
}

export async function GET(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  if (q.length < 3) {
    return NextResponse.json({ error: "Query trop courte (min 3 caractères)" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  // Détermine la stratégie de matching
  const digitsOnly = q.replace(/[^0-9]/g, "");
  let candidatesQuery = supabase.from("orders").select("*");

  if (digitsOnly.length >= 6) {
    // Recherche par téléphone : on compare les digits seulement.
    // PostgreSQL : regexp_replace(telephone, '[^0-9]', '', 'g') LIKE '%digits%'
    candidatesQuery = candidatesQuery.filter(
      "telephone",
      "ilike",
      `%${digitsOnly}%`,
    );
    // ↑ Imparfait (ne normalise pas les +/00/espaces côté DB), mais le LIKE
    // sur la version raw matche la plupart des cas (téléphone stocké avec
    // ou sans préfixe). Pour les rares cas avec espacement bizarre, on
    // pourra élargir avec une RPC SQL plus tard.
  } else if (q.includes("@")) {
    candidatesQuery = candidatesQuery.ilike("email", `%${escapeLike(q)}%`);
  } else {
    // Recherche par nom : q est interpolé dans la grammaire `.or()` de
    // PostgREST. On retire les caractères structurels de cette grammaire et
    // les jokers LIKE — virgule, parenthèses, %, _, ", \, *, : — qui
    // altéreraient le filtre. Les lettres accentuées/espaces/'/- sont
    // préservés (liste noire plutôt que blanche pour éviter \p{L}, qui
    // exigerait une cible TS es6+).
    const safeName = q.replace(/[,()%_"\\:*]/g, "").trim();
    if (!safeName) {
      return NextResponse.json({ ok: true, q, candidates: [] });
    }
    candidatesQuery = candidatesQuery.or(
      `prenom.ilike.%${safeName}%,nom.ilike.%${safeName}%`,
    );
  }

  const { data: candidatesData, error: candidatesError } = await candidatesQuery
    .order("created_at", { ascending: false })
    .limit(MAX_CANDIDATES);

  if (candidatesError) {
    console.error("[referral-lookup] DB query failed:", candidatesError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const candidates: Order[] = (candidatesData as Order[]) ?? [];
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, q, candidates: [] });
  }

  // Pour chaque candidat, récupère ses filleuls (s'il a un referral_code).
  const enriched: Candidate[] = await Promise.all(
    candidates.map(async (c) => {
      let filleuls: Candidate["filleuls"] = [];
      if (c.referral_code) {
        const { data: filleulData } = await supabase
          .from("orders")
          .select("id, prenom, nom, email, telephone, payment_status, amount, quantity, discount_amount, created_at")
          .eq("referred_by_code", c.referral_code)
          .order("created_at", { ascending: false })
          .limit(MAX_FILLEULS_PER_CANDIDATE);

        filleuls = (filleulData ?? []).map((f) => ({
          id: f.id as string,
          prenom: f.prenom as string,
          nom: f.nom as string,
          email: f.email as string,
          telephone: (f.telephone as string) ?? "",
          payment_status: f.payment_status as string,
          amount: f.amount as number,
          quantity: (f.quantity as number) ?? 1,
          discount_amount: (f.discount_amount as number) ?? 0,
          created_at: f.created_at as string,
        }));
      }

      return {
        id: c.id,
        prenom: c.prenom,
        nom: c.nom,
        email: c.email,
        telephone: c.telephone ?? "",
        referral_code: c.referral_code,
        referrer_reward_paid_at: c.referrer_reward_paid_at,
        referred_by_code: c.referred_by_code,
        payment_status: c.payment_status,
        amount: c.amount,
        quantity: c.quantity ?? 1,
        discount_amount: c.discount_amount ?? 0,
        created_at: c.created_at,
        filleuls,
      };
    }),
  );

  return NextResponse.json({ ok: true, q, candidates: enriched });
}
