import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const orderId = req.nextUrl.searchParams.get("order_id");

  if (!sessionId && !orderId) {
    return NextResponse.json(
      { error: "Missing session_id or order_id" },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();
  const base = supabase
    .from("orders")
    .select(
      "id, prenom, email, niyyah, intention, amount, payment_status, payment_method, created_at"
    );

  const { data, error } = await (sessionId
    ? base.eq("stripe_session_id", sessionId)
    : base.eq("id", orderId!)
  ).single();

  if (error || !data) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order: data });
}
