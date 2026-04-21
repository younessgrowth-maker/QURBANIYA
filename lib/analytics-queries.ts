import { createServiceRoleClient } from "@/lib/supabase/server";

export type AnalyticsSummary = {
  pageviewsToday: number;
  pageviews7d: number;
  pageviews30d: number;
  uniqueSessions7d: number;
  topPages: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  eventCounts7d: Record<string, number>;
  dailyPageviews14d: { date: string; count: number }[];
};

export const EMPTY_ANALYTICS: AnalyticsSummary = {
  pageviewsToday: 0,
  pageviews7d: 0,
  pageviews30d: 0,
  uniqueSessions7d: 0,
  topPages: [],
  topReferrers: [],
  eventCounts7d: {},
  dailyPageviews14d: [],
};

function startOfToday(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  const supabase = createServiceRoleClient();

  // On fetch les 30 derniers jours, on agrège côté JS
  const sinceMs30d = daysAgo(30);
  const { data, error } = await supabase
    .from("analytics_events")
    .select("event_name, path, referrer, session_id, created_at")
    .gte("created_at", sinceMs30d)
    .limit(50000);

  if (error || !data) {
    return EMPTY_ANALYTICS;
  }

  const today = new Date(startOfToday()).getTime();
  const since7d = new Date(daysAgo(7)).getTime();

  let pageviewsToday = 0;
  let pageviews7d = 0;
  let pageviews30d = 0;
  const pageCounts = new Map<string, number>();
  const referrerCounts = new Map<string, number>();
  const eventCounts7d = new Map<string, number>();
  const sessions7d = new Set<string>();
  const dailyBucket = new Map<string, number>();

  for (const row of data) {
    const ts = new Date(row.created_at as string).getTime();

    if (row.event_name === "page_view") {
      pageviews30d++;
      if (ts >= since7d) {
        pageviews7d++;
        if (row.path) {
          pageCounts.set(row.path, (pageCounts.get(row.path) || 0) + 1);
        }
        if (row.referrer) {
          const host = safeHost(row.referrer);
          if (host) referrerCounts.set(host, (referrerCounts.get(host) || 0) + 1);
        }
        // Daily bucket (14d)
        const day = (row.created_at as string).slice(0, 10);
        dailyBucket.set(day, (dailyBucket.get(day) || 0) + 1);
      }
      if (ts >= today) pageviewsToday++;
    }

    if (ts >= since7d) {
      eventCounts7d.set(row.event_name, (eventCounts7d.get(row.event_name) || 0) + 1);
      if (row.session_id) sessions7d.add(row.session_id as string);
    }
  }

  // Build daily series for last 14 days
  const daily: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const key = d.toISOString().slice(0, 10);
    daily.push({ date: key, count: dailyBucket.get(key) || 0 });
  }

  const topPages = Array.from(pageCounts.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const topReferrers = Array.from(referrerCounts.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    pageviewsToday,
    pageviews7d,
    pageviews30d,
    uniqueSessions7d: sessions7d.size,
    topPages,
    topReferrers,
    eventCounts7d: Object.fromEntries(eventCounts7d),
    dailyPageviews14d: daily,
  };
}

function safeHost(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}
