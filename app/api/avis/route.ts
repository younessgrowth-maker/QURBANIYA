import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { reviewSchema } from "@/lib/validations";

/* ── Rate limit en mémoire (1 review par IP par heure) ── */
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1h
const recentSubmissions = new Map<string, number>();

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Cleanup vieilles entrées (évite la croissance infinie de la Map)
  Array.from(recentSubmissions.entries()).forEach(([key, timestamp]) => {
    if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
      recentSubmissions.delete(key);
    }
  });
  const last = recentSubmissions.get(ip);
  if (last && now - last < RATE_LIMIT_WINDOW_MS) {
    return true;
  }
  recentSubmissions.set(ip, now);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Vous avez déjà envoyé un avis récemment. Merci de votre patience." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Données invalides" },
        { status: 400 }
      );
    }

    const { website, ville, email, year, ...rest } = parsed.data;

    // Honeypot — si rempli, c'est un bot
    if (website && website.length > 0) {
      // On retourne 200 pour ne pas signaler au bot que la trappe est détectée
      return NextResponse.json({ ok: true });
    }

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("reviews").insert({
      ...rest,
      ville: ville || null,
      email: email || null,
      year: year || null,
      status: "pending",
    });

    if (error) {
      console.error("Review insert failed:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement. Réessayez plus tard." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Review API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
