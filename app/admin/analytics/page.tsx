import { Suspense } from "react";
import { BarChart3 } from "lucide-react";
import StripeAnalyticsDashboard from "@/components/admin/StripeAnalyticsDashboard";
import RefreshButton from "@/components/admin/RefreshButton";
import { fetchYearOverYearAnalytics } from "@/lib/stripe-analytics";
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
    if (!data) return 200;
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

async function AnalyticsContent() {
  const now = new Date();
  const daysUntilAid = daysBetween(now, AID_DATE);

  let yoy;
  let error: string | null = null;
  try {
    yoy = await fetchYearOverYearAnalytics(CURRENT_YEAR, CURRENT_YEAR - 1);
  } catch (e) {
    error =
      e instanceof Error
        ? `Impossible de joindre Stripe : ${e.message}`
        : "Erreur Stripe inconnue.";
  }

  const stockRemaining = await fetchStockRemaining();

  let forecast: ForecastResult | null = null;
  if (yoy) {
    forecast = buildForecast({
      current: yoy.current.daily,
      previous: yoy.previous?.daily,
      aidDate: AID_DATE,
      now,
      stockRemaining,
      aovEurOverride:
        yoy.current.totals.aovEur > 0 ? yoy.current.totals.aovEur : 140,
      simulations: 1000,
      // Distribution horaire pour l'ajustement bayésien time-of-day
      // sur la prédiction du jour partiel (aujourd'hui).
      hourlyDistribution: yoy.current.hourlyDistribution,
    });
  }

  const fetchedAt = yoy
    ? new Date(yoy.fetchedAt).toLocaleString("fr-FR", {
        timeZone: "Europe/Paris",
      })
    : null;

  return (
    <>
      {error && (
        <div className="mb-6 border border-urgency/30 bg-urgency/5 rounded-xl p-4 text-sm text-text-primary">
          <strong className="text-urgency">Erreur :</strong> {error}
          <p className="text-text-muted-light text-xs mt-2">
            Vérifier que <code>STRIPE_SECRET_KEY</code> est défini en
            production et a accès aux endpoints checkout_sessions /
            balance_transactions / refunds / disputes.
          </p>
        </div>
      )}

      {yoy && forecast && (
        <StripeAnalyticsDashboard
          yoy={yoy}
          forecast={forecast}
          daysUntilAid={daysUntilAid}
        />
      )}

      {fetchedAt && (
        <p className="mt-8 text-center text-xs text-text-muted-light">
          Données rafraîchies à {fetchedAt} · cache 5 min (utilise le bouton
          ci-dessus pour invalider immédiatement)
        </p>
      )}
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
      <div className="bg-white border border-gray-200 rounded-xl p-5 h-96 animate-pulse" />
      <div className="bg-white border border-gray-200 rounded-xl p-5 h-64 animate-pulse" />
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
            Vérité du compte marchand · Comparaison année-sur-année · Forecast
            Aïd-aware avec prior an dernier
          </p>
        </div>
        <RefreshButton />
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <AnalyticsContent />
      </Suspense>
    </div>
  );
}
