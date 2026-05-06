import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["approved", "rejected", "pending"]),
});

export async function PATCH(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const { data: { user } } = await authClient.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const update: { status: string; approved_at: string | null } = {
    status: parsed.data.status,
    approved_at: parsed.data.status === "approved" ? new Date().toISOString() : null,
  };

  const { data, error } = await supabase
    .from("reviews")
    .update(update)
    .eq("id", parsed.data.id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Review moderation failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, review: data });
}
