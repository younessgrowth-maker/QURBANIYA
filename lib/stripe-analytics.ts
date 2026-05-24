// Server-only — récupère et agrège les ventes réelles depuis Stripe,
// avec comparaison année-sur-année alignée par jours avant l'Aïd.
//
// Architecture :
//  - fetchStripeYear(year) → données d'une année (90j avant l'Aïd à +7j)
//  - fetchYearOverYear() → 2025 + 2026 alignées par daysBeforeAid
//  - fetchStripeAnalytics() → kept for backward compat (legacy /admin)

import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { getStripe } from "@/lib/stripe";

// ── Filtre des paiements de test ─────────────────────────────────────────
// Emails à exclure systématiquement des stats (paiements de test, internes,
// QA, etc.). Source : valeur par défaut + env var ANALYTICS_TEST_EMAILS
// (CSV) pour ajout sans redéploiement.
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

// ── Dates des Aïds par année (Aïd al-Adha) ───────────────────────────────
// Source : calendriers officiels. Année lunaire ≈ 354j → ~11j plus tôt chaque
// année grégorienne. On garde les dates exactes ici, source unique.
export const AID_DATES_BY_YEAR: Record<number, string> = {
  2023: "2023-06-28",
  2024: "2024-06-16",
  2025: "2025-06-06",
  2026: "2026-05-27",
};

export type AlignedBucket = {
  daysBeforeAid: number; // -90 à 0 (0 = jour de l'Aïd)
  date: string; // YYYY-MM-DD réelle de cette année
  count: number;
  grossEur: number;
  netEur: number;
  feesEur: number;
  refundsEur: number;
};

export type ConversionFunnel = {
  sessionsTotal: number;
  sessionsPaid: number;
  sessionsExpired: number;
  sessionsOpen: number;
  rate: number; // paid / total
};

export type PromoCodeStat = {
  code: string;
  count: number;
  totalDiscountEur: number;
};

export type YearStats = {
  year: number;
  aidDate: string; // YYYY-MM-DD
  rangeStart: string;
  rangeEnd: string;
  daily: AlignedBucket[]; // aligné par daysBeforeAid (asc, de -90 vers 0)
  totals: {
    sessions: number;
    paidSessions: number;
    grossEur: number;
    netEur: number;
    feesEur: number;
    refundsEur: number;
    refundsCount: number;
    disputesCount: number;
    aovEur: number;
  };
  hourlyDistribution: { hour: number; count: number }[];
  weekdayDistribution: { weekday: number; count: number }[];
  topCustomers: { email: string; count: number; grossEur: number }[];
  topPromoCodes: PromoCodeStat[];
  conversionFunnel: ConversionFunnel;
  medianTimeToPaySec: number | null; // null si pas assez de data
};

export type YoYAnalytics = {
  fetchedAt: string;
  current: YearStats;
  previous: YearStats | null;
  yoy: {
    salesGrowthPct: number | null;
    revenueGrowthPct: number | null;
    aovGrowthPct: number | null;
    conversionGrowthPct: number | null;
  };
  recentSessions: {
    id: string;
    createdAt: string;
    email: string | null;
    amountEur: number;
    status: string;
    niyyah?: string;
  }[];
};

// ── Helpers timezone ─────────────────────────────────────────────────────
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
  return dateFormatter.format(date);
}

function parisHour(date: Date): number {
  const h = hourFormatter.format(date);
  return parseInt(h, 10);
}

function parisWeekday(date: Date): number {
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

function daysBetween(a: Date, b: Date): number {
  // Différence en jours calendaires (négatif si a > b).
  const aMs = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const bMs = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.round((bMs - aMs) / 86_400_000);
}

// ── Fetch Stripe paginé sur fenêtre arbitraire ───────────────────────────
// On query `charges.list()` (et non `checkout.sessions.list()`) car les
// charges sont la source de vérité unifiée pour TOUS les paiements
// encaissés, quelle que soit leur origine : Stripe Checkout, Stripe
// Payment Links, intégration Shopify (qui crée des PaymentIntents puis
// Charges directement via API), paiements manuels, etc.
// Les sessions Checkout sont conservées en parallèle pour le funnel de
// conversion (uniquement pertinent pour le trafic du nouveau site).
async function fetchAllCharges(fromUnix: number, toUnix: number) {
  const stripe = getStripe();
  const out: import("stripe").Stripe.Charge[] = [];
  for await (const c of stripe.charges.list({
    created: { gte: fromUnix, lte: toUnix },
    limit: 100,
  })) {
    out.push(c);
    if (out.length >= 10000) break;
  }
  return out;
}

async function fetchAllCheckoutSessions(fromUnix: number, toUnix: number) {
  const stripe = getStripe();
  const out: import("stripe").Stripe.Checkout.Session[] = [];
  for await (const s of stripe.checkout.sessions.list({
    created: { gte: fromUnix, lte: toUnix },
    limit: 100,
    expand: ["data.total_details"],
  })) {
    out.push(s);
    if (out.length >= 5000) break;
  }
  return out;
}

async function fetchAllBalanceTransactions(fromUnix: number, toUnix: number) {
  const stripe = getStripe();
  const out: import("stripe").Stripe.BalanceTransaction[] = [];
  for await (const t of stripe.balanceTransactions.list({
    created: { gte: fromUnix, lte: toUnix },
    limit: 100,
  })) {
    out.push(t);
    if (out.length >= 10000) break;
  }
  return out;
}

async function fetchAllRefunds(fromUnix: number, toUnix: number) {
  const stripe = getStripe();
  const out: import("stripe").Stripe.Refund[] = [];
  for await (const r of stripe.refunds.list({
    created: { gte: fromUnix, lte: toUnix },
    limit: 100,
  })) {
    out.push(r);
    if (out.length >= 5000) break;
  }
  return out;
}

async function fetchDisputesCount(
  fromUnix: number,
  toUnix: number
): Promise<number> {
  const stripe = getStripe();
  let n = 0;
  for await (const _d of stripe.disputes.list({
    created: { gte: fromUnix, lte: toUnix },
    limit: 100,
  })) {
    void _d;
    n++;
    if (n >= 5000) break;
  }
  return n;
}

// ── Construction des stats d'une année alignée sur son Aïd ───────────────
async function buildYearStats(
  year: number,
  options: { daysBefore: number; daysAfter: number }
): Promise<YearStats | null> {
  const aidStr = AID_DATES_BY_YEAR[year];
  if (!aidStr) return null;
  const aidDate = new Date(aidStr + "T12:00:00Z");

  const fromDate = new Date(aidDate);
  fromDate.setUTCDate(fromDate.getUTCDate() - options.daysBefore);
  const toDate = new Date(aidDate);
  toDate.setUTCDate(toDate.getUTCDate() + options.daysAfter);

  // Clamp la fenêtre actuelle au temps présent (inutile de fetch le futur).
  const now = new Date();
  const clampedTo = toDate.getTime() > now.getTime() ? now : toDate;

  const fromUnix = Math.floor(fromDate.getTime() / 1000);
  const toUnix = Math.floor(clampedTo.getTime() / 1000);

  if (toUnix <= fromUnix) {
    // Aïd dans le futur sans data : retourner stats vides.
    return emptyYearStats(year, aidStr, fromDate, clampedTo);
  }

  const [charges, sessions, balanceTxs, refunds, disputesCount] =
    await Promise.all([
      fetchAllCharges(fromUnix, toUnix),
      fetchAllCheckoutSessions(fromUnix, toUnix),
      fetchAllBalanceTransactions(fromUnix, toUnix),
      fetchAllRefunds(fromUnix, toUnix),
      fetchDisputesCount(fromUnix, toUnix),
    ]);

  // ── Construction des buckets alignés ─────────────────────────────────
  const bucketsByDaysBefore = new Map<number, AlignedBucket>();
  for (let d = -options.daysBefore; d <= options.daysAfter; d++) {
    const dayDate = new Date(aidDate);
    dayDate.setUTCDate(dayDate.getUTCDate() + d);
    if (dayDate.getTime() > now.getTime() + 86_400_000) break;
    const dk = parisDateKey(dayDate);
    bucketsByDaysBefore.set(d, {
      daysBeforeAid: d,
      date: dk,
      count: 0,
      grossEur: 0,
      netEur: 0,
      feesEur: 0,
      refundsEur: 0,
    });
  }

  // Mapper date YYYY-MM-DD → daysBeforeAid
  const dateToDaysBefore = new Map<string, number>();
  bucketsByDaysBefore.forEach((b, dba) => {
    dateToDaysBefore.set(b.date, dba);
  });

  // ── Source de vérité : charges Stripe (couvre Shopify, Checkout,
  //    Payment Links, manuel — tout ce qui a généré un encaissement). ──
  // Filtre :
  //  - status succeeded + captured (paiement effectif)
  //  - amount > 0 (exclut les autorisations à 0€)
  //  - email pas dans la blacklist de tests
  const paidCharges = charges.filter((c) => {
    if (c.status !== "succeeded") return false;
    if (c.captured !== true) return false;
    if ((c.amount ?? 0) <= 0) return false;
    const email = c.billing_details?.email ?? c.receipt_email ?? null;
    if (isTestEmail(email)) return false;
    return true;
  });

  const hourCounts = new Array(24).fill(0);
  const weekdayCounts = new Array(7).fill(0);
  const customerAgg = new Map<string, { count: number; grossEur: number }>();

  for (const c of paidCharges) {
    const created = new Date(c.created * 1000);
    const dk = parisDateKey(created);
    const dba = dateToDaysBefore.get(dk);
    if (dba === undefined) continue;
    const bucket = bucketsByDaysBefore.get(dba)!;
    const amount = (c.amount ?? 0) / 100;
    bucket.count += 1;
    bucket.grossEur += amount;

    hourCounts[parisHour(created)] += 1;
    weekdayCounts[parisWeekday(created)] += 1;

    const email =
      c.billing_details?.email ??
      c.receipt_email ??
      (typeof c.customer === "string" ? c.customer : c.customer?.id) ??
      "(sans email)";
    const cust = customerAgg.get(email) ?? { count: 0, grossEur: 0 };
    cust.count += 1;
    cust.grossEur += amount;
    customerAgg.set(email, cust);
  }

  // ── Funnel + codes promo : depuis les sessions Checkout uniquement ──
  // (les charges Shopify ne passent pas par Checkout donc n'ont pas de
  // notion de "session ouverte/expirée". Pour l'année actuelle qui
  // utilise notre Checkout, ces métriques restent pertinentes.)
  // On exclut les sessions de test (mêmes emails que la blacklist).
  const realSessions = sessions.filter((s) => {
    const email = s.customer_details?.email ?? s.customer_email ?? null;
    return !isTestEmail(email);
  });
  const paidSessions = realSessions.filter(
    (s) => s.payment_status === "paid" && (s.amount_total ?? 0) > 0
  );
  const expiredSessions = realSessions.filter((s) => s.status === "expired");
  const openSessions = realSessions.filter((s) => s.status === "open");

  const promoCodeAgg = new Map<
    string,
    { count: number; totalDiscountEur: number }
  >();
  for (const s of paidSessions) {
    const discounts = s.total_details?.breakdown?.discounts ?? [];
    for (const d of discounts) {
      const promoLike = d.discount as unknown as {
        promotion_code?: string | { code?: string };
        coupon?: { name?: string; id?: string };
      };
      let code: string | null = null;
      if (typeof promoLike?.promotion_code === "string") {
        code = promoLike.promotion_code;
      } else if (
        typeof promoLike?.promotion_code === "object" &&
        promoLike.promotion_code?.code
      ) {
        code = promoLike.promotion_code.code;
      } else if (promoLike?.coupon?.name) {
        code = promoLike.coupon.name;
      } else if (promoLike?.coupon?.id) {
        code = promoLike.coupon.id;
      }
      if (code) {
        const cur = promoCodeAgg.get(code) ?? {
          count: 0,
          totalDiscountEur: 0,
        };
        cur.count += 1;
        cur.totalDiscountEur += (d.amount ?? 0) / 100;
        promoCodeAgg.set(code, cur);
      }
    }
  }

  // Fees & net
  for (const tx of balanceTxs) {
    if (tx.type !== "charge") continue;
    const created = new Date(tx.created * 1000);
    const dk = parisDateKey(created);
    const dba = dateToDaysBefore.get(dk);
    if (dba === undefined) continue;
    const bucket = bucketsByDaysBefore.get(dba);
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
    const dba = dateToDaysBefore.get(dk);
    if (dba === undefined) continue;
    const bucket = bucketsByDaysBefore.get(dba);
    if (bucket) bucket.refundsEur += (r.amount ?? 0) / 100;
  }

  const daily = Array.from(bucketsByDaysBefore.values()).sort(
    (a, b) => a.daysBeforeAid - b.daysBeforeAid
  );

  const totalGross = paidCharges.reduce(
    (sum, c) => sum + (c.amount ?? 0) / 100,
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

  const topPromoCodes = Array.from(promoCodeAgg.entries())
    .map(([code, v]) => ({
      code,
      count: v.count,
      totalDiscountEur: v.totalDiscountEur,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Funnel : ne s'applique qu'aux sessions Checkout (notre nouveau site).
  // Pour les charges venues d'ailleurs (Shopify 2025), pas de notion
  // "abandoned cart" disponible — on les compte juste comme payées.
  const sessionsTotal = Math.max(realSessions.length, paidCharges.length);
  const sessionsPaid = paidCharges.length;
  const sessionsExpired = expiredSessions.length;
  const sessionsOpen = openSessions.length;

  const conversionFunnel: ConversionFunnel = {
    sessionsTotal,
    sessionsPaid,
    sessionsExpired,
    sessionsOpen,
    rate: sessionsTotal > 0 ? sessionsPaid / sessionsTotal : 0,
  };

  return {
    year,
    aidDate: aidStr,
    rangeStart: parisDateKey(fromDate),
    rangeEnd: parisDateKey(clampedTo),
    daily,
    totals: {
      sessions: sessionsTotal,
      paidSessions: paidCharges.length,
      grossEur: totalGross,
      netEur: totalNet,
      feesEur: totalFees,
      refundsEur: refundsTotalEur,
      refundsCount,
      disputesCount,
      aovEur:
        paidCharges.length > 0 ? totalGross / paidCharges.length : 0,
    },
    hourlyDistribution: hourCounts.map((count, hour) => ({ hour, count })),
    weekdayDistribution: weekdayCounts.map((count, weekday) => ({
      weekday,
      count,
    })),
    topCustomers,
    topPromoCodes,
    conversionFunnel,
    medianTimeToPaySec: null, // non calculé sans fetch supplémentaire des PI
  };
}

function emptyYearStats(
  year: number,
  aidStr: string,
  fromDate: Date,
  toDate: Date
): YearStats {
  return {
    year,
    aidDate: aidStr,
    rangeStart: parisDateKey(fromDate),
    rangeEnd: parisDateKey(toDate),
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
    topPromoCodes: [],
    conversionFunnel: {
      sessionsTotal: 0,
      sessionsPaid: 0,
      sessionsExpired: 0,
      sessionsOpen: 0,
      rate: 0,
    },
    medianTimeToPaySec: null,
  };
}

function growthPct(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return ((current - previous) / previous) * 100;
}

async function buildYoY(
  currentYear: number,
  previousYear: number
): Promise<YoYAnalytics> {
  const [current, previous] = await Promise.all([
    buildYearStats(currentYear, { daysBefore: 90, daysAfter: 7 }),
    buildYearStats(previousYear, { daysBefore: 90, daysAfter: 7 }),
  ]);

  if (!current) {
    throw new Error(
      `Aïd date inconnue pour l'année ${currentYear}, ajouter à AID_DATES_BY_YEAR`
    );
  }

  const yoy = {
    salesGrowthPct: previous
      ? growthPct(current.totals.paidSessions, previous.totals.paidSessions)
      : null,
    revenueGrowthPct: previous
      ? growthPct(current.totals.grossEur, previous.totals.grossEur)
      : null,
    aovGrowthPct: previous
      ? growthPct(current.totals.aovEur, previous.totals.aovEur)
      : null,
    conversionGrowthPct: previous
      ? growthPct(
          current.conversionFunnel.rate,
          previous.conversionFunnel.rate
        )
      : null,
  };

  // Sessions récentes globales (cross-année, prises de l'année en cours)
  // Reconstruites depuis l'API uniquement pour l'année en cours.
  // On fetch 40 pour laisser de la marge après filtre tests, et on
  // garde les 20 plus récentes non-test.
  const stripe = getStripe();
  const recentRaw: import("stripe").Stripe.Checkout.Session[] = [];
  for await (const s of stripe.checkout.sessions.list({ limit: 40 })) {
    recentRaw.push(s);
    if (recentRaw.length >= 40) break;
  }
  const recentSessions = recentRaw
    .filter((s) => {
      const email = s.customer_details?.email ?? s.customer_email ?? null;
      return !isTestEmail(email);
    })
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
    fetchedAt: new Date().toISOString(),
    current,
    previous: previous ?? null,
    yoy,
    recentSessions,
  };
}

// ── Cache & API publique ─────────────────────────────────────────────────
const YOY_TAG = "stripe-yoy-v1";

export const fetchYearOverYearAnalytics = unstable_cache(
  async (currentYear: number, previousYear: number) =>
    buildYoY(currentYear, previousYear),
  ["stripe-yoy-v1"],
  { revalidate: 300, tags: [YOY_TAG] }
);

export async function invalidateStripeAnalyticsCache() {
  revalidateTag(YOY_TAG);
}

// ── Helpers ré-exposés pour les composants ───────────────────────────────
export function compareTotals(
  current: YearStats,
  previous: YearStats | null
): {
  salesDelta: number | null;
  revenueDelta: number | null;
  aovDelta: number | null;
  conversionDelta: number | null;
} {
  if (!previous) {
    return {
      salesDelta: null,
      revenueDelta: null,
      aovDelta: null,
      conversionDelta: null,
    };
  }
  return {
    salesDelta: current.totals.paidSessions - previous.totals.paidSessions,
    revenueDelta: current.totals.grossEur - previous.totals.grossEur,
    aovDelta: current.totals.aovEur - previous.totals.aovEur,
    conversionDelta:
      current.conversionFunnel.rate - previous.conversionFunnel.rate,
  };
}

// ── Backward compat avec l'ancien dashboard ──────────────────────────────
// Le dashboard /admin (legacy) attendait fetchStripeAnalytics + DailyBucket.
// On les conserve en delegant à la nouvelle implémentation.
export type DailyBucket = {
  date: string;
  count: number;
  grossEur: number;
  netEur: number;
  feesEur: number;
  refundsEur: number;
};

export type StripeAnalytics = {
  fetchedAt: string;
  rangeStart: string;
  rangeEnd: string;
  daily: DailyBucket[];
  totals: YearStats["totals"];
  hourlyDistribution: { hour: number; count: number }[];
  weekdayDistribution: { weekday: number; count: number }[];
  topCustomers: { email: string; count: number; grossEur: number }[];
  recentSessions: YoYAnalytics["recentSessions"];
};

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

// Compat layer : on aplatit la YoY current year en DailyBucket via dates absolues
export async function fetchStripeAnalytics(
  daysBack: number = 90
): Promise<StripeAnalytics> {
  void daysBack;
  const yoy = await fetchYearOverYearAnalytics(
    new Date().getUTCFullYear(),
    new Date().getUTCFullYear() - 1
  );
  const c = yoy.current;
  const daily: DailyBucket[] = c.daily.map((b) => ({
    date: b.date,
    count: b.count,
    grossEur: b.grossEur,
    netEur: b.netEur,
    feesEur: b.feesEur,
    refundsEur: b.refundsEur,
  }));
  return {
    fetchedAt: yoy.fetchedAt,
    rangeStart: c.rangeStart,
    rangeEnd: c.rangeEnd,
    daily,
    totals: c.totals,
    hourlyDistribution: c.hourlyDistribution,
    weekdayDistribution: c.weekdayDistribution,
    topCustomers: c.topCustomers,
    recentSessions: yoy.recentSessions,
  };
}

// Helper exporté pour calculer le daysBeforeAid d'une date donnée
export function computeDaysBeforeAid(date: Date, year: number): number | null {
  const aidStr = AID_DATES_BY_YEAR[year];
  if (!aidStr) return null;
  const aid = new Date(aidStr + "T12:00:00Z");
  return daysBetween(date, aid) * -1; // négatif = avant l'Aïd → on inverse pour avoir négatif AVANT
}
