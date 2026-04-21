import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_METADATA_BYTES = 2000;
const ALLOWED_EVENTS = new Set([
  "page_view",
  "cta_click",
  "whatsapp_click",
  "phone_click",
  "order_started",
  "order_submitted",
  "payment_started",
  "exit_popup_shown",
  "exit_popup_conversion",
  "lead_captured",
  "video_play",
  "faq_open",
]);

function hashUserAgent(ua: string): string {
  // Petit hash léger, non-crypto — juste pour grouper les sessions sans stocker l'UA complet
  let h = 0;
  for (let i = 0; i < ua.length; i++) {
    h = (Math.imul(31, h) + ua.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event_name = String(body.event_name || "").slice(0, 64);
    if (!event_name || !ALLOWED_EVENTS.has(event_name)) {
      return NextResponse.json({ ok: false, error: "invalid_event" }, { status: 400 });
    }

    const path = body.path ? String(body.path).slice(0, 256) : null;
    const referrer = body.referrer ? String(body.referrer).slice(0, 512) : null;
    const session_id = body.session_id ? String(body.session_id).slice(0, 64) : null;
    const ua = request.headers.get("user-agent") || "";
    const user_agent_hash = ua ? hashUserAgent(ua) : null;

    let metadata = body.metadata && typeof body.metadata === "object" ? body.metadata : {};
    const metaStr = JSON.stringify(metadata);
    if (metaStr.length > MAX_METADATA_BYTES) {
      metadata = { truncated: true };
    }

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("analytics_events").insert({
      event_name,
      path,
      referrer,
      session_id,
      user_agent_hash,
      metadata,
    });

    if (error) {
      console.error("[track] insert error", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track] error", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
