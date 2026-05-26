import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// Export CSV de la table waitlist (Liste d'attente Aïd 2027).
// Réservé aux admins via auth + isAdminEmail.

export const dynamic = "force-dynamic";

export async function GET() {
  const authClient = createServerSupabaseClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceRoleClient();
  const { data: rows, error } = await supabase
    .from("waitlist")
    .select("created_at, prenom, email, telephone, year")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // CSV escape — wrap fields containing comma/quote/newline with quotes
  // and double internal quotes (RFC 4180).
  const esc = (v: unknown) => {
    const s = String(v ?? "");
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const header = "created_at,prenom,email,telephone,year";
  const lines = (rows ?? []).map((r) =>
    [esc(r.created_at), esc(r.prenom), esc(r.email), esc(r.telephone), esc(r.year)].join(",")
  );
  // BOM UTF-8 pour Excel
  const csv = "﻿" + [header, ...lines].join("\n");

  const today = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="waitlist-aid-2027-${today}.csv"`,
    },
  });
}
