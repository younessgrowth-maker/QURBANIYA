import { NextResponse } from "next/server";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import React from "react";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { CURRENT_YEAR } from "@/lib/constants";
import { getBaseUrl } from "@/lib/utils";
import LabelsPdf from "@/lib/labels/LabelsPdf";
import type { Order } from "@/types";

// PDF generation peut prendre plusieurs secondes pour 171+ commandes,
// surtout avec Font.register qui charge la police arabe via HTTPS.
export const maxDuration = 60;

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
    niyyah: order.niyyah?.trim() || `${order.prenom} ${order.nom}`,
    intention: order.intention,
  }));

  const logoUrl = `${getBaseUrl()}/logos/export/qurbaniya-symbol-1024.png`;
  const arabicFontUrl = `${getBaseUrl()}/fonts/NotoNaskhArabic.ttf`;
  const hijriYear = HIJRI_YEAR_BY_GREGORIAN[CURRENT_YEAR] ?? CURRENT_YEAR;

  // renderToBuffer (vs renderToStream) attend que tout le PDF soit généré
  // avant de retourner — permet un try/catch propre. Avec renderToStream,
  // si Font.register échoue async, le stream se ferme silencieusement et
  // le client reçoit un fichier vide (bug constaté en prod le 2026-05-23).
  let buffer: Buffer;
  try {
    buffer = await renderToBuffer(
      React.createElement(LabelsPdf, {
        orders: labelOrders,
        logoUrl,
        arabicFontUrl,
        year: CURRENT_YEAR,
        hijriYear,
      }) as React.ReactElement<DocumentProps>
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    console.error("[labels] renderToBuffer failed:", msg, e);
    return NextResponse.json(
      { error: `PDF generation failed: ${msg}` },
      { status: 500 }
    );
  }

  if (!buffer || buffer.length === 0) {
    console.error("[labels] renderToBuffer returned empty buffer");
    return NextResponse.json(
      { error: "PDF buffer is empty" },
      { status: 500 }
    );
  }

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(buffer.length),
      "Content-Disposition": `attachment; filename="etiquettes-qurbaniya-${CURRENT_YEAR}.pdf"`,
    },
  });
}
