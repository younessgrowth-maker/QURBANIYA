import { NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  createServiceRoleClient,
} from "@/lib/supabase/server";
import type { Order } from "@/types";

export const dynamic = "force-dynamic";

// GET /api/account/orders
//
// Renvoie les commandes du client AUTHENTIFIÉ, rattachées par son email
// vérifié. Les commandes ne portent pas de `user_id` (la plupart sont
// passées sans être connecté), donc la RLS `auth.uid() = user_id` ne matche
// jamais → la page /mes-commandes était vide pour tout le monde. On résout
// par l'email de la session SERVEUR (auth.getUser), jamais un input client
// → pas d'IDOR. Le service role bypass la RLS, mais le filtre email reste
// borné à l'utilisateur authentifié.
export async function GET() {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.email.trim().toLowerCase();
  // Échappe les jokers LIKE (% _ \), légaux dans un email, pour éviter un
  // sur-matching (un email tiers ne doit jamais être retourné).
  const likePattern = email.replace(/[\\%_]/g, "\\$&");

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .ilike("email", likePattern)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Account orders fetch failed:", error.message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ orders: (data ?? []) as Order[] });
}
