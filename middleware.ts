import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/mes-commandes", "/admin"];

// ─── Détection de la locale depuis l'URL ─────────────────────────────────
// On déduit la langue de la 1ère section du pathname (/en/..., /ar/..., etc.)
// pour que le root layout puisse définir un <html lang="xx" dir="..."> correct.
// Avant ce fix : toutes les pages déclaraient lang="fr" même /en /ar /es /tr
// → Google indexait dans la mauvaise langue + screen readers lisaient avec
// la mauvaise voix. Critique SEO/A11Y.
function detectLocaleFromPath(pathname: string): { lang: string; dir: "ltr" | "rtl" } {
  const seg = pathname.split("/")[1];
  switch (seg) {
    case "en": return { lang: "en", dir: "ltr" };
    case "ar": return { lang: "ar", dir: "rtl" };
    case "es": return { lang: "es", dir: "ltr" };
    case "tr": return { lang: "tr", dir: "ltr" };
    default:   return { lang: "fr", dir: "ltr" };
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const locale = detectLocaleFromPath(pathname);

  // If a Supabase magic-link code ends up anywhere other than /auth/callback
  // (e.g. because Supabase Site URL overrode emailRedirectTo), funnel it through
  // our callback handler so the session is established correctly.
  const code = searchParams.get("code");
  if (code && pathname !== "/auth/callback") {
    const callback = new URL("/auth/callback", request.url);
    callback.searchParams.set("code", code);
    callback.searchParams.set(
      "next",
      pathname === "/" ? "/mes-commandes" : pathname
    );
    return NextResponse.redirect(callback);
  }

  // ─── Attribution : capter ?ref= (parrainage) et ?aff= (affiliation) ───
  // Cookies 30j lus côté client sur /commander. Formats stricts pour
  // éviter la pollution cookie.
  //  - qrb_ref : code parrain client, 6 chars
  //  - qrb_aff : code partenaire affilié, 3-24 chars + tirets
  const ref = searchParams.get("ref");
  const aff = searchParams.get("aff");
  const hasRef = !!ref && /^[A-Z0-9]{6}$/i.test(ref);
  const hasAff = !!aff && /^[A-Z0-9-]{3,24}$/i.test(aff);
  if (hasRef || hasAff) {
    const response = NextResponse.next({ request });
    const cookieOpts = {
      maxAge: 60 * 60 * 24 * 30, // 30 jours
      sameSite: "lax" as const,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    };
    if (hasRef) response.cookies.set("qrb_ref", ref!.toUpperCase(), cookieOpts);
    if (hasAff) response.cookies.set("qrb_aff", aff!.toUpperCase(), cookieOpts);
    // Si la route n'est pas protégée on retourne tout de suite, sinon on
    // continue le check auth ci-dessous (cookies déjà posés sur la response).
    if (!PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
      return response;
    }
  }

  // Only check protected routes — pour les routes non-protégées, on ajoute
  // juste les headers x-locale/x-locale-dir et on laisse passer.
  if (!PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    const passthrough = NextResponse.next({ request });
    passthrough.headers.set("x-locale", locale.lang);
    passthrough.headers.set("x-locale-dir", locale.dir);
    return passthrough;
  }

  let response = NextResponse.next({ request });
  response.headers.set("x-locale", locale.lang);
  response.headers.set("x-locale-dir", locale.dir);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({ request });
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    // Protected routes
    "/mes-commandes/:path*",
    "/admin/:path*",
    // Catch magic-link code on any non-asset route
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
