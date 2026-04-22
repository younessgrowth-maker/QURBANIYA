import { NextResponse } from "next/server";
import { renderToStream, type DocumentProps } from "@react-pdf/renderer";
import React from "react";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { CURRENT_YEAR } from "@/lib/constants";
import { getBaseUrl } from "@/lib/utils";
import LabelsPdf from "@/lib/labels/LabelsPdf";
import type { Order } from "@/types";

// Année hijri correspondant à l'Aïd al-Adha de l'année grégorienne courante.
// Aïd al-Adha 2026 = 10 Dhul Hijjah 1447.
const HIJRI_YEAR_BY_GREGORIAN: Record<number, number> = {
  2025: 1446,
  2026: 1447,
  2027: 1448,
};

export const dynamic = "force-dynamic";

export async function GET() {
  // Auth : admin uniquement.
  const authClient = createServerSupabaseClient();
  const { data: { user } } = await authClient.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch toutes les commandes payées de l'année, triées par created_at ASC :
  // N°1 = premier payeur (ordre chronologique, stable dans le temps).
  const supabase = createServiceRoleClient();
  const yearStart = new Date(`${CURRENT_YEAR}-01-01T00:00:00Z`).toISOString();
  const yearEnd = new Date(`${CURRENT_YEAR + 1}-01-01T00:00:00Z`).toISOString();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "paid")
    .gte("created_at", yearStart)
    .lt("created_at", yearEnd)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Labels: orders fetch failed:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }

  if (!orders || orders.length === 0) {
    return NextResponse.json(
      { error: "Aucune commande payée à imprimer." },
      { status: 404 }
    );
  }

  const labelOrders = (orders as Order[]).map((order, idx) => ({
    orderNumber: idx + 1,
    fullName: `${order.prenom} ${order.nom}`.toUpperCase(),
  }));

  const logoUrl = `${getBaseUrl()}/logos/export/qurbaniya-symbol-1024.png`;
  const hijriYear = HIJRI_YEAR_BY_GREGORIAN[CURRENT_YEAR] ?? CURRENT_YEAR;

  const pdfStream = await renderToStream(
    React.createElement(LabelsPdf, {
      orders: labelOrders,
      logoUrl,
      year: CURRENT_YEAR,
      hijriYear,
    }) as React.ReactElement<DocumentProps>
  );

  return new NextResponse(pdfStream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="etiquettes-qurbaniya-${CURRENT_YEAR}.pdf"`,
    },
  });
}
