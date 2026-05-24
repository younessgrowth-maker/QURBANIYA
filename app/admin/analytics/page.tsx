import { Suspense } from "react";
import { BarChart3, RefreshCw } from "lucide-react";
import StripeAnalyticsDashboard from "@/components/admin/StripeAnalyticsDashboard";
import {
  fetchStripeAnalytics,
  EMPTY_STRIPE_ANALYTICS,
  type StripeAnalytics,
} from "@/lib/stripe-analytics";
import { buildForecast, type ForecastResult } from "@/lib/forecasting";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { AID_DATE, CURRENT_YEAR } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchStockRemaining(): Promise<number> {
  try {
    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("inventory")
      .select("total_slots, reserved_slots")
      .eq("year", CURRENT_YEAR)
      .maybeSingle();
    if (!data) return 200; // fallback STOCK.total
    return Math.max(
      0,
      (data.total_slots ?? 200) - (data.reserved_slots ?? 0)
    );
  } catch {
    return 200;
  }
}

function daysBetween(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

function dateKey(d: Date): string {
  // YYYY-MM-DD en UTC (suffisant pour comparer avec les buckets jour Paris)
  return d.toISOString().slice(0, 10);
}

async function loadData(): Promise<{
  analytics: StripeAnalytics;
  forecast: ForecastResult;
  stockRemaining: number;
  daysUntilAid: number;
  aidDateKey: string;
  todayKey: string;
  error: string | null;
}> {
  const now = new Date();
  const aidDateKey = dateKey(AID_DATE);
  const todayKey = dateKey(now);
  const daysUntilAid = daysBetween(now, AID_DATE);

  let analytics: StripeAnalytics = EMPTY_STRIPE_ANALYTICS;
  let error: string | null = null;

  try {
    analytics = await fetchStripeAnalytics(90);
  } catch (e) {
    error =
      e instanceof Error
        ? `Impossible de joindre Stripe : ${e.message}`
        : "Erreur inconnue lors de la récupération des données Stripe.";
  }

  const stockRemaining = await fetchStockRemaining();

  const forecast = buildForecast({
    daily: analytics.daily,
    aidDate: AID_DATE,
    now,
    stockRemaining,
    aovEurOverride:
      analytics.totals.aovEur > 0 ? analytics.totals.aovEur : 140,
    simulations: 1000,
  });

  return {
    analytics,
    forecast,
    stockRemaining,
    daysUntilAid,
    aidDateKey,
    todayKey,
    error,
  };
}

async function AnalyticsContent() {
  const data = await loadData();
  const fetchedAt = new Date(data.analytics.fetchedAt).toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
  });

  return (
    <>
      {data.error && (
        <div className="mb-6 border border-urgency/30 bg-urgency/5 rounded-xl p-4 text-sm text-text-primary">
          <strong className="text-urgency">Erreur :</strong> {data.error}
          <p className="text-text-muted-light text-xs mt-2">
            Vérifiez que <code>STRIPE_SECRET_KEY</code> est bien défini en
            production et a accès aux endpoints checkout_sessions /
            balance_transactions.
          </p>
        </div>
      )}

      <StripeAnalyticsDashboard
        analytics={data.analytics}
        forecast={data.forecast}
        daysUntilAid={data.daysUntilAid}
        aidDateKey={data.aidDateKey}
        todayKey={data.todayKey}
      />

      <p className="mt-8 text-center text-xs text-text-muted-light">
        Données rafraîchies à {fetchedAt} (cache 5 min · prochaine actualisation
        automatique).
      </p>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-5 h-28 animate-pulse"
          />
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 h-80 animate-pulse" />
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black uppercase text-text-primary flex items-center gap-3">
            <BarChart3 size={28} className="text-gold" />
            Analytics <span className="text-gold">Stripe</span>
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Vérité du compte marchand · Prédictions Aïd-aware · Insights ML
          </p>
        </div>
        <form action="/admin/analytics" method="GET">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-text-primary text-white text-sm font-semibold px-3 py-2 hover:opacity-90 transition-opacity"
          >
            <RefreshCw size={14} />
            Rafraîchir
          </button>
        </form>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <AnalyticsContent />
      </Suspense>
    </div>
  );
}
