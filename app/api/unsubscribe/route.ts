import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { verifyEmailToken } from "@/lib/unsubscribe";

// GET  /api/unsubscribe?email=...&t=... → redirige vers /unsubscribe (UI)
// POST /api/unsubscribe?email=...&t=... → one-click RFC 8058 (Gmail/Outlook
//                                          envoient un POST sans body quand
//                                          l'utilisateur clique "Unsubscribe")
//
// Les 2 paths persistent en DB. POST renvoie 200 vide (exigence RFC 8058).
// GET fait un 302 vers /unsubscribe?email=... pour afficher une page de
// confirmation à l'humain qui clique le lien dans l'email.

export const dynamic = "force-dynamic";

async function persistUnsubscribe(email: string, source: "one_click" | "page") {
  const supabase = createServiceRoleClient();
  // Upsert pour idempotency : si l'email est déjà unsubscribed, on ne
  // remplace pas la date d'origine.
  const { error } = await supabase
    .from("email_unsubscribes")
    .upsert(
      { email: email.toLowerCase(), source },
      { onConflict: "email", ignoreDuplicates: true }
    );
  if (error) {
    console.error("Unsubscribe persist failed:", email, error);
  }
}

export async function POST(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.toLowerCase();
  const token = req.nextUrl.searchParams.get("t");

  if (!email || !token || !verifyEmailToken(email, token)) {
    // Returner 200 même si invalide pour ne pas alimenter une CSV interaction
    // avec des scanners d'emails. RFC 8058 ne nécessite pas d'erreur explicite.
    return new NextResponse(null, { status: 200 });
  }

  await persistUnsubscribe(email, "one_click");
  return new NextResponse(null, { status: 200 });
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.toLowerCase();
  const token = req.nextUrl.searchParams.get("t");

  if (!email || !token || !verifyEmailToken(email, token)) {
    return NextResponse.redirect(new URL("/unsubscribe?status=invalid", req.url));
  }

  await persistUnsubscribe(email, "page");
  return NextResponse.redirect(
    new URL(`/unsubscribe?status=ok&email=${encodeURIComponent(email)}`, req.url)
  );
}
