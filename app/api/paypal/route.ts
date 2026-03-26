import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // TODO: Implement PayPal order creation
    // 1. Create PayPal order via API
    // 2. Return approval URL

    return NextResponse.json({
      message: "PayPal integration coming soon",
      order: body,
    });
  } catch (error) {
    console.error("PayPal error:", error);
    return NextResponse.json(
      { error: "Erreur PayPal." },
      { status: 500 }
    );
  }
}
