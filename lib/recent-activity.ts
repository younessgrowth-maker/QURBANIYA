// Récupère les commandes payées récentes pour alimenter la preuve sociale
// "live" (toast tournant + activity feed). Anonymise les noms (prénom seul)
// pour le respect de la vie privée + filtre les emails de test.
//
// Server-only. Appelé depuis le marketing layout (revalidate à chaque render).

import "server-only";
import { createServiceRoleClient } from "@/lib/supabase/server";

export type RecentActivity = {
  firstName: string;
  city: string | null;
  createdAt: string; // ISO
  ageMinutes: number;
};

const TEST_EMAILS = new Set(
  [
    "yousse.fmrabet24@gmail.com",
    "younessgrowth@gmail.com",
    ...((process.env.ANALYTICS_TEST_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean) as string[]),
  ].map((e) => e.toLowerCase())
);

function capitalize(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export async function fetchRecentActivities(
  limit: number = 8
): Promise<RecentActivity[]> {
  try {
    const supabase = createServiceRoleClient();
    // Fenêtre : 24 dernières heures pour avoir des activités récentes
    // sans risque de remonter trop loin dans le temps.
    const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const { data, error } = await supabase
      .from("orders")
      .select("prenom, email, created_at")
      .eq("payment_status", "paid")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(limit * 2); // marge après filtre

    if (error || !data) return [];

    const now = Date.now();
    const out: RecentActivity[] = [];
    for (const row of data as Array<{
      prenom: string | null;
      email: string | null;
      created_at: string;
    }>) {
      if (out.length >= limit) break;
      if (row.email && TEST_EMAILS.has(row.email.toLowerCase())) continue;
      const firstName = capitalize((row.prenom ?? "").trim().split(/\s+/)[0]);
      if (!firstName) continue;
      const ageMs = now - new Date(row.created_at).getTime();
      const ageMinutes = Math.max(1, Math.round(ageMs / 60_000));
      out.push({
        firstName,
        city: null, // on n'a pas la ville en DB pour le moment
        createdAt: row.created_at,
        ageMinutes,
      });
    }
    return out;
  } catch (e) {
    console.error("[recent-activity] fetch failed", e);
    return [];
  }
}
