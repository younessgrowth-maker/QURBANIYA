import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/mes-commandes", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

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

  // ─── Parrainage : capter ?ref=XXX et poser un cookie 30j ───
  // Le cookie est lu côté client sur /commander pour pré-remplir le champ.
  // 6 chars uppercase strict, sinon on ignore (anti-pollution cookie).
  const ref = searchParams.get("ref");
  if (ref && /^[A-Z0-9]{6}$/i.test(ref)) {
    const response = NextResponse.next({ request });
    response.cookies.set("qrb_ref", ref.toUpperCase(), {
      maxAge: 60 * 60 * 24 * 30, // 30 jours
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    // Si la route n'est pas protégée on retourne tout de suite, sinon on
    // continue le check auth ci-dessous (cookie déjà posé sur la response).
    if (!PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
      return response;
    }
  }

  // Only check protected routes
  if (!PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

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
