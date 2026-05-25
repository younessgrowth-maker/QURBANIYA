// Server-only — calcule un instantané "Pulse" du jour, axé temps réel :
// comparaison J vs J-1 à la même heure (en heure Paris), même jour de la
// semaine dernière, fenêtres glissantes 1h/24h/7j, dernier paiement,
// run rate, projection fin de journée, top heure, top intention, etc.
//
// On lit Supabase orders (source partagée avec /admin et /admin/analytics
// pour 2026+) sur une fenêtre glissante de 14 jours suffisante pour
// toutes les comparaisons cycliques (J-7, J-14).

import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { createServiceRoleClient } from "@/lib/supabase/server";

// ── Filtre tests : aligné sur stripe-analytics.ts ──────────────────────
const DEFAULT_TEST_EMAILS = [
  "yousse.fmrabet24@gmail.com",
  "younessgrowth@gmail.com",
];

function getTestEmails(): Set<string> {
  const env = process.env.ANALYTICS_TEST_EMAILS ?? "";
  const extras = env
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return new Set(
    [...DEFAULT_TEST_EMAILS.map((e) => e.toLowerCase()), ...extras]
  );
}

function isTestEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getTestEmails().has(email.toLowerCase());
}

const PARIS_TZ = "Europe/Paris";

// Formatte un Date en parties Paris (YYYY-MM-DD + HH:MM:SS).
function parisDateTime(d: Date): { date: string; time: string; hour: number; minute: number } {
  const fmt = new Intl.DateTimeFormat("fr-CA", {
    timeZone: PARIS_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(d);
  let y = "", mo = "", da = "", h = "00", mi = "00", s = "00";
  for (const p of parts) {
    if (p.type === "year") y = p.value;
    else if (p.type === "month") mo = p.value;
    else if (p.type === "day") da = p.value;
    else if (p.type === "hour") h = p.value === "24" ? "00" : p.value;
    else if (p.type === "minute") mi = p.value;
    else if (p.type === "second") s = p.value;
  }
  return {
    date: `${y}-${mo}-${da}`,
    time: `${h}:${mi}:${s}`,
    hour: parseInt(h, 10),
    minute: parseInt(mi, 10),
  };
}

function addDaysIso(iso: string, days: number): string {
  // iso = "YYYY-MM-DD". On utilise un instant "midi UTC" pour éviter les
  // bascules DST autour de minuit.
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function pct(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return ((current - previous) / previous) * 100;
}

// ── Type retourné ──────────────────────────────────────────────────────
export type Intention = "pour_moi" | "famille" | "sadaqa";

export type PulseStats = {
  fetchedAt: string;
  parisNow: { date: string; time: string }; // "YYYY-MM-DD" / "HH:MM"

  // Aujourd'hui (00:00 Paris → maintenant)
  today: {
    sales: number;
    revenueEur: number;
    intentions: Record<Intention, number>;
    topIntention: { intention: Intention; count: number } | null;
    topHour: { hour: number; count: number } | null;
    hourly: number[]; // 24 buckets — count par heure
    quantityTotal: number; // somme des moutons
  };

  // Hier à la même heure (00:00 J-1 Paris → même HH:MM hier)
  yesterdaySameTime: {
    sales: number;
    revenueEur: number;
    hourly: number[]; // 24 buckets — journée complète d'hier
    fullDaySales: number;
  };

  // Même jour de la semaine la semaine dernière (J-7) à la même heure
  sameWeekdayLastWeek: {
    sales: number;
    revenueEur: number;
  };

  // Δ
  deltaVsYesterdayPct: number | null;
  deltaVsSameWeekdayPct: number | null;

  // Fenêtres glissantes
  lastHour: { sales: number; revenueEur: number };
  last24h: { sales: number; revenueEur: number };
  last7d: { sales: number; revenueEur: number };
  previous7d: { sales: number; revenueEur: number };
  deltaVs7dPct: number | null;

  // Dernière vente
  lastSale: {
    at: string;
    minutesAgo: number;
    prenom: string;
    intention: Intention;
    amountEur: number;
  } | null;

  // Vélocité instantanée
  runRatePerHour: number; // ventes/heure sur les 3 dernières heures
  estEndOfDayP50: number; // projection simple : ventes aujourd'hui + run rate × heures restantes
  hoursRemainingToday: number; // 24 - HH (en heures Paris, arrondi décimal)

  // Conversion 24h
  conversion24h: {
    paidSales: number;
    pendingSales: number;
    failedSales: number;
  };

  // Acquisition
  newCustomersToday: number; // emails non vus dans les 14 jours précédant aujourd'hui
};

type SupaOrder = {
  email: string;
  prenom: string;
  payment_status: "pending" | "paid" | "failed";
  amount: number;
  quantity: number | null;
  discount_amount: number | null;
  intention: Intention;
  created_at: string;
};

async function fetchOrdersLast14Days(): Promise<SupaOrder[]> {
  const supabase = createServiceRoleClient();
  const from = new Date();
  from.setUTCDate(from.getUTCDate() - 15);
  const { data, error } = await supabase
    .from("orders")
    .select(
      "email, prenom, payment_status, amount, quantity, discount_amount, intention, created_at"
    )
    .gte("created_at", from.toISOString())
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[pulse-stats] supabase error", error);
    return [];
  }
  return (data ?? []) as SupaOrder[];
}

function chargedEur(o: SupaOrder): number {
  // amount est le prix UNITAIRE en euros (cf migration 0018 + commentaire
  // stripe-analytics.ts:386). Total payé = amount × quantity − discount.
  const qty = o.quantity ?? 1;
  const disc = o.discount_amount ?? 0;
  return o.amount * qty - disc;
}

async function buildPulse(): Promise<PulseStats> {
  const orders = await fetchOrdersLast14Days();
  const now = new Date();
  const nowMs = now.getTime();
  const parisNow = parisDateTime(now);
  const todayKey = parisNow.date;
  const yesterdayKey = addDaysIso(todayKey, -1);
  const sameWeekdayKey = addDaysIso(todayKey, -7);
  const sevenDaysAgoMs = nowMs - 7 * 86_400_000;
  const fourteenDaysAgoMs = nowMs - 14 * 86_400_000;
  const oneHourAgoMs = nowMs - 3_600_000;
  const oneDayAgoMs = nowMs - 86_400_000;
  const threeHoursAgoMs = nowMs - 3 * 3_600_000;

  const paid = orders.filter(
    (o) => o.payment_status === "paid" && !isTestEmail(o.email)
  );
  const realOrders = orders.filter((o) => !isTestEmail(o.email));

  // Conversion 24h : on regarde TOUS les statuts sur 24h
  let paidSales24 = 0;
  let pendingSales24 = 0;
  let failedSales24 = 0;
  for (const o of realOrders) {
    const t = new Date(o.created_at).getTime();
    if (t < oneDayAgoMs) continue;
    if (o.payment_status === "paid") paidSales24++;
    else if (o.payment_status === "pending") pendingSales24++;
    else if (o.payment_status === "failed") failedSales24++;
  }

  // Init aujourd'hui
  const todayIntentions: Record<Intention, number> = {
    pour_moi: 0,
    famille: 0,
    sadaqa: 0,
  };
  const todayHourly = new Array(24).fill(0);
  const yesterdayHourly = new Array(24).fill(0);
  let todaySales = 0;
  let todayRevenue = 0;
  let todayQuantity = 0;

  let yesterdaySameSales = 0;
  let yesterdaySameRevenue = 0;
  let yesterdayFullSales = 0;

  let sameWeekdaySales = 0;
  let sameWeekdayRevenue = 0;

  let lastHourSales = 0;
  let lastHourRevenue = 0;
  let last24hSales = 0;
  let last24hRevenue = 0;
  let last7dSales = 0;
  let last7dRevenue = 0;
  let prev7dSales = 0;
  let prev7dRevenue = 0;

  let runRateSales3h = 0;

  let lastSale: PulseStats["lastSale"] = null;

  // Emails déjà vus dans les 14j précédant aujourd'hui (pour "new today")
  const seenBeforeToday = new Set<string>();
  for (const o of paid) {
    const dt = parisDateTime(new Date(o.created_at));
    if (dt.date < todayKey) {
      seenBeforeToday.add(o.email.toLowerCase());
    }
  }
  const newToday = new Set<string>();

  for (const o of paid) {
    const created = new Date(o.created_at);
    const t = created.getTime();
    const dt = parisDateTime(created);
    const charged = chargedEur(o);

    // Dernière vente : `paid` est trié desc par created_at → la première
    // hit valide est la plus récente.
    if (!lastSale) {
      lastSale = {
        at: o.created_at,
        minutesAgo: Math.max(0, Math.round((nowMs - t) / 60_000)),
        prenom: o.prenom,
        intention: o.intention,
        amountEur: charged,
      };
    }

    // Aujourd'hui
    if (dt.date === todayKey) {
      todaySales++;
      todayRevenue += charged;
      todayQuantity += o.quantity ?? 1;
      todayIntentions[o.intention] = (todayIntentions[o.intention] ?? 0) + 1;
      todayHourly[dt.hour] += 1;
      if (!seenBeforeToday.has(o.email.toLowerCase())) {
        newToday.add(o.email.toLowerCase());
      }
    }

    // Hier (jour complet, et "jusqu'à la même heure" pour comparaison)
    if (dt.date === yesterdayKey) {
      yesterdayFullSales++;
      yesterdayHourly[dt.hour] += 1;
      if (dt.time <= parisNow.time) {
        yesterdaySameSales++;
        yesterdaySameRevenue += charged;
      }
    }

    // Même jour de la semaine la semaine dernière, jusqu'à la même heure
    if (dt.date === sameWeekdayKey && dt.time <= parisNow.time) {
      sameWeekdaySales++;
      sameWeekdayRevenue += charged;
    }

    // Fenêtres glissantes en temps réel
    if (t >= oneHourAgoMs) {
      lastHourSales++;
      lastHourRevenue += charged;
    }
    if (t >= oneDayAgoMs) {
      last24hSales++;
      last24hRevenue += charged;
    }
    if (t >= sevenDaysAgoMs) {
      last7dSales++;
      last7dRevenue += charged;
    } else if (t >= fourteenDaysAgoMs) {
      prev7dSales++;
      prev7dRevenue += charged;
    }
    if (t >= threeHoursAgoMs) {
      runRateSales3h++;
    }
  }

  const topIntention = (Object.entries(todayIntentions) as [
    Intention,
    number,
  ][])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])[0];

  const topHourIdx = todayHourly.reduce(
    (best, val, i) => (val > todayHourly[best] ? i : best),
    0
  );

  const runRate = runRateSales3h / 3;
  const hoursRemaining = Math.max(
    0,
    24 - (parisNow.time.split(":")[0]
      ? parseInt(parisNow.time.split(":")[0], 10)
      : 0) -
      (parseInt(parisNow.time.split(":")[1] ?? "0", 10) / 60)
  );
  // Projection simple : ce qu'on a déjà fait + run rate × heures restantes.
  // Très conservateur — la vraie projection probabiliste est dans le
  // forecast Monte Carlo plus bas dans le dashboard.
  const estEndOfDayP50 = todaySales + runRate * hoursRemaining;

  return {
    fetchedAt: new Date().toISOString(),
    parisNow: {
      date: parisNow.date,
      time: parisNow.time.slice(0, 5),
    },
    today: {
      sales: todaySales,
      revenueEur: todayRevenue,
      intentions: todayIntentions,
      topIntention: topIntention
        ? { intention: topIntention[0], count: topIntention[1] }
        : null,
      topHour:
        todayHourly[topHourIdx] > 0
          ? { hour: topHourIdx, count: todayHourly[topHourIdx] }
          : null,
      hourly: todayHourly,
      quantityTotal: todayQuantity,
    },
    yesterdaySameTime: {
      sales: yesterdaySameSales,
      revenueEur: yesterdaySameRevenue,
      hourly: yesterdayHourly,
      fullDaySales: yesterdayFullSales,
    },
    sameWeekdayLastWeek: {
      sales: sameWeekdaySales,
      revenueEur: sameWeekdayRevenue,
    },
    deltaVsYesterdayPct: pct(todaySales, yesterdaySameSales),
    deltaVsSameWeekdayPct: pct(todaySales, sameWeekdaySales),
    lastHour: { sales: lastHourSales, revenueEur: lastHourRevenue },
    last24h: { sales: last24hSales, revenueEur: last24hRevenue },
    last7d: { sales: last7dSales, revenueEur: last7dRevenue },
    previous7d: { sales: prev7dSales, revenueEur: prev7dRevenue },
    deltaVs7dPct: pct(last7dSales, prev7dSales),
    lastSale,
    runRatePerHour: runRate,
    estEndOfDayP50,
    hoursRemainingToday: hoursRemaining,
    conversion24h: {
      paidSales: paidSales24,
      pendingSales: pendingSales24,
      failedSales: failedSales24,
    },
    newCustomersToday: newToday.size,
  };
}

const PULSE_TAG = "pulse-stats-v1";

export const fetchPulseStats = unstable_cache(
  async () => buildPulse(),
  ["pulse-stats-v1"],
  // 60s pour rester très frais sur la section "Live", tout en évitant un
  // hammering Supabase à chaque rafraîchissement onglet.
  { revalidate: 60, tags: [PULSE_TAG] }
);

export async function invalidatePulseStatsCache() {
  revalidateTag(PULSE_TAG);
}
