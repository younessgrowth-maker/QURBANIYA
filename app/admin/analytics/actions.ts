"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

export async function refreshAnalytics() {
  // Guard admin
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    throw new Error("Non autorisé");
  }
  revalidateTag("stripe-yoy-v1");
  revalidateTag("pulse-stats-v1");
  revalidatePath("/admin/analytics");
}
