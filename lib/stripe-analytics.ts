// Server-only — récupère et agrège les ventes réelles depuis Stripe.
// Utilisé par /admin/analytics. Bypass la table `orders` Supabase
// (qui dépend du webhook pas encore branché en prod) et tire directement
// de l'API Stripe pour avoir la vérité du compte marchand.

import "server-only";
import { unstable_cache } from "next/cache";
import { getStripe } from "@/lib/stripe";

export type DailyBucket = {
  date: string; // YYYY-MM-DD (Europe/Paris)
  count: number;
  grossEur: number; // somme amount_total / 100
  netEur: number; // amount - fees (via balance_transactions)
  feesEur: number;
  refundsEur: number;
};

export type StripeAnalytics = {
  fetchedAt: string; // ISO
  rangeStart: string; // YYYY-MM-DD
  rangeEnd: string; // YYYY-MM-DD (= aujourd'hui Paris)
  daily: DailyBucket[]; // tri ascendant, un bucket par jour calendaire
  totals: {
    sessions: number;
    paidSessions: number;
    grossEur: number;
    netEur: number;
    feesEur: number;
    refundsEur: number;
    refundsCount: number;
    disputesCount: number;
    aovEur: number; // panier moyen brut sur paid sessions
  };
  hourlyDistribution: { hour: number; count: number }[]; // 0..23
  weekdayDistribution: { weekday: number; count: number }[]; // 0..6 (0 = lundi)
  topCustomers: { email: string; count: number; grossEur: number }[];
  recentSessions: {
    id: string;
    createdAt: string; // ISO
    email: string | null;
    amountEur: number;
    status: string;
    niyyah?: string;
  }[];
};

// ── Helpers timezone ─────────────────────────────────────────────────────
// On veut grouper par jour calendaire Europe/Paris. Stripe renvoie des
// timestamps UTC ; on convertit via Intl pour rester correct l'année entière
// (heure d'été comprise).
const PARIS_TZ = "Europe/Paris";

const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
  timeZone: PARIS_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const hourFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: PARIS_TZ,
  hour: "2-digit",
  hour12: false,
});

function parisDateKey(date: Date): string {
  return dateFormatter.format(date); // YYYY-MM-DD
}

function parisHour(date: Date): number {
  const h = hourFormatter.format(date);
  return parseInt(h, 10);
}

function parisWeekday(date: Date): number {
  // Lundi = 0 ... Dimanche = 6
  const wd = new Intl.DateTimeFormat("en-GB", {
    timeZone: PARIS_TZ,
    weekday: "short",
  }).format(date);
  const map: Record<string, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  return map[wd] ?? 0;
}

function enumerateDays(start: Date, end: Date): string[] {
  const out: string[] = [];
  const cursor = new Date(start);
  cursor.setUTCHours(12, 0, 0, 0); // milieu de journée pour éviter sauts DST
  while (cursor.getTime() <= end.getTime()) {
    out.push(parisDateKey(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

// ── Fetch paginé Stripe ──────────────────────────────────────────────────
// `auto_paging` Stripe est dispo via .autoPagingEach. On l'utilise pour
// récupérer toutes les pages sans gérer les cursors manuellement.

async function fetchAllCheckoutSessions(sinceUnix: number) {
  const stripe = getStripe();
  const out: import("stripe").Stripe.Checkout.Session[] = [];
  for await (const s of stripe.checkout.sessions.list({
    created: { gte: sinceUnix },
    limit: 100,
  })) {
    out.push(s);
    if (out.length >= 5000) break; // garde-fou
  }
  return out;
}

async function fetchAllBalanceTransactions(sinceUnix: number) {
  const stripe = getStripe();
  const out: import("stripe").Stripe.BalanceTransaction[] = [];
  for await (const t of stripe.balanceTransactions.list({
    created: { gte: sinceUnix },
    limit: 100,
  })) {
    out.push(t);
    if (out.length >= 10000) break;
  }
  return out;
}

async function fetchAllRefunds(sinceUnix: number) {
  const stripe = getStripe();
  const out: import("stripe").Stripe.Refund[] = [];
  for await (const r of stripe.refunds.list({
    created: { gte: sinceUnix },
    limit: 100,
  })) {
    out.push(r);
    if (out.length >= 5000) break;
  }
  return out;
}

async function fetchDisputesCount(sinceUnix: number): Promise<number> {
  const stripe = getStripe();
  let n = 0;
  for await (const _d of stripe.disputes.list({
    created: { gte: sinceUnix },
    limit: 100,
  })) {
    void _d;
    n++;
    if (n >= 5000) break;
  }
  return n;
}

// ── Agrégation ───────────────────────────────────────────────────────────

async function buildAnalytics(daysBack: number): Promise<StripeAnalytics> {
  const now = new Date();
  const since = new Date(now.getTime() - daysBack * 86_400_000);
  const sinceUnix = Math.floor(since.getTime() / 1000);

  const [sessions, balanceTxs, refunds, disputesCount] = await Promise.all([
    fetchAllCheckoutSessions(sinceUnix),
    fetchAllBalanceTransactions(sinceUnix),
    fetchAllRefunds(sinceUnix),
    fetchDisputesCount(sinceUnix),
  ]);

  // Map paymentIntent → fees from balance_transactions
  // Une charge a un balance_transaction avec fee/net (en centimes, devise compte).
  const feesByPaymentIntent = new Map<string, { fee: number; net: number }>();
  for (const tx of balanceTxs) {
    if (tx.type !== "charge") continue;
    const src = typeof tx.source === "string" ? tx.source : tx.source?.id;
    if (!src) continue;
    // On stocke par charge_id ; on résoudra via charge.payment_intent.
    feesByPaymentIntent.set(src, { fee: tx.fee, net: tx.net });
  }

  // Pour mapper charge → payment_intent → checkout_session, on lit les
  // sessions et on utilise payment_intent direct. Stripe expose
  // session.payment_intent et session.amount_total. Pour les fees on
  // utilise plutôt le total fees par jour via balance_transactions
  // (type=charge), pour éviter d'avoir à fetch chaque charge.

  // ── Buckets quotidiens ─────────────────────────────────────────────────
  const dayKeys = enumerateDays(since, now);
  const dailyMap = new Map<string, DailyBucket>();
  for (const d of dayKeys) {
    dailyMap.set(d, {
      date: d,
      count: 0,
      grossEur: 0,
      netEur: 0,
      feesEur: 0,
      refundsEur: 0,
    });
  }

  // Sessions
  const paidSessions = sessions.filter(
    (s) => s.payment_status === "paid" && (s.amount_total ?? 0) > 0
  );

  const hourCounts = new Array(24).fill(0);
  const weekdayCounts = new Array(7).fill(0);
  const customerAgg = new Map<string, { count: number; grossEur: number }>();

  for (const s of paidSessions) {
    const created = new Date(s.created * 1000);
    const dk = parisDateKey(created);
    const bucket = dailyMap.get(dk);
    if (!bucket) continue;
    const amount = (s.amount_total ?? 0) / 100;
    bucket.count += 1;
    bucket.grossEur += amount;

    hourCounts[parisHour(created)] += 1;
    weekdayCounts[parisWeekday(created)] += 1;

    const email =
      s.customer_details?.email ?? s.customer_email ?? "(sans email)";
    const cust = customerAgg.get(email) ?? { count: 0, grossEur: 0 };
    cust.count += 1;
    cust.grossEur += amount;
    customerAgg.set(email, cust);
  }

  // Fees & net : on agrège balance_transactions par jour
  for (const tx of balanceTxs) {
    if (tx.type !== "charge") continue;
    const created = new Date(tx.created * 1000);
    const dk = parisDateKey(created);
    const bucket = dailyMap.get(dk);
    if (!bucket) continue;
    bucket.feesEur += tx.fee / 100;
    bucket.netEur += tx.net / 100;
  }

  // Refunds
  let refundsCount = 0;
  let refundsTotalEur = 0;
  for (const r of refunds) {
    refundsCount += 1;
    refundsTotalEur += (r.amount ?? 0) / 100;
    const created = new Date(r.created * 1000);
    const dk = parisDateKey(created);
    const bucket = dailyMap.get(dk);
    if (bucket) bucket.refundsEur += (r.amount ?? 0) / 100;
  }

  const daily = Array.from(dailyMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const totalGross = paidSessions.reduce(
    (sum, s) => sum + (s.amount_total ?? 0) / 100,
    0
  );
  const totalFees = balanceTxs
    .filter((t) => t.type === "charge")
    .reduce((sum, t) => sum + t.fee / 100, 0);
  const totalNet = balanceTxs
    .filter((t) => t.type === "charge")
    .reduce((sum, t) => sum + t.net / 100, 0);

  const topCustomers = Array.from(customerAgg.entries())
    .map(([email, v]) => ({ email, count: v.count, grossEur: v.grossEur }))
    .sort((a, b) => b.grossEur - a.grossEur)
    .slice(0, 10);

  const recentSessions = sessions
    .slice()
    .sort((a, b) => b.created - a.created)
    .slice(0, 20)
    .map((s) => ({
      id: s.id,
      createdAt: new Date(s.created * 1000).toISOString(),
      email: s.customer_details?.email ?? s.customer_email ?? null,
      amountEur: (s.amount_total ?? 0) / 100,
      status: s.payment_status,
      niyyah:
        typeof s.metadata?.niyyah === "string" ? s.metadata.niyyah : undefined,
    }));

  return {
    fetchedAt: now.toISOString(),
    rangeStart: parisDateKey(since),
    rangeEnd: parisDateKey(now),
    daily,
    totals: {
      sessions: sessions.length,
      paidSessions: paidSessions.length,
      grossEur: totalGross,
      netEur: totalNet,
      feesEur: totalFees,
      refundsEur: refundsTotalEur,
      refundsCount,
      disputesCount,
      aovEur: paidSessions.length > 0 ? totalGross / paidSessions.length : 0,
    },
    hourlyDistribution: hourCounts.map((count, hour) => ({ hour, count })),
    weekdayDistribution: weekdayCounts.map((count, weekday) => ({
      weekday,
      count,
    })),
    topCustomers,
    recentSessions,
  };
}

// Cache 5 minutes : un refresh par page-load coûterait des dizaines d'appels
// Stripe (sessions + balance + refunds + disputes) pour rien.
export const fetchStripeAnalytics = unstable_cache(
  async (daysBack: number = 90) => buildAnalytics(daysBack),
  ["stripe-analytics-v1"],
  { revalidate: 300, tags: ["stripe-analytics"] }
);

export const EMPTY_STRIPE_ANALYTICS: StripeAnalytics = {
  fetchedAt: new Date(0).toISOString(),
  rangeStart: "",
  rangeEnd: "",
  daily: [],
  totals: {
    sessions: 0,
    paidSessions: 0,
    grossEur: 0,
    netEur: 0,
    feesEur: 0,
    refundsEur: 0,
    refundsCount: 0,
    disputesCount: 0,
    aovEur: 0,
  },
  hourlyDistribution: Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    count: 0,
  })),
  weekdayDistribution: Array.from({ length: 7 }, (_, w) => ({
    weekday: w,
    count: 0,
  })),
  topCustomers: [],
  recentSessions: [],
};
