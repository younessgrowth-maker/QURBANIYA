import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { CURRENT_YEAR } from "@/lib/constants";

// Génère un signed upload URL Supabase Storage valide ~60 secondes. Le client
// uploade ensuite directement depuis le navigateur sans passer par Vercel
// (contourne la limite de 4.5/50 MB sur les routes Next.js serverless).

const signSchema = z.object({
  filename: z.string().min(1).max(200),
});

function sanitize(filename: string): string {
  return filename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export async function POST(req: NextRequest) {
  const authClient = createServerSupabaseClient();
  const { data: { user } } = await authClient.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = signSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const cleanName = sanitize(parsed.data.filename);
  const uniqueName = `${Date.now()}-${cleanName}`;
  const path = `${CURRENT_YEAR}/${uniqueName}`;

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.storage
    .from("sacrifice-videos")
    .createSignedUploadUrl(path);

  if (error || !data) {
    console.error("Signed upload URL failed:", error);
    return NextResponse.json({ error: "Signed URL failed" }, { status: 500 });
  }

  return NextResponse.json({
    path,
    token: data.token,
    signed_url: data.signedUrl,
  });
}
