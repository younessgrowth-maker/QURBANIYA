import type { LucideIcon } from "lucide-react";
import {
  Euro,
  TrendingUp,
  ShoppingBag,
  Receipt,
  AlertTriangle,
  Target,
  Zap,
  Clock,
  CalendarClock,
  Brain,
  Sparkles,
} from "lucide-react";
import { KpiCard } from "@/components/admin/KpiCard";
import SalesForecastChart from "@/components/admin/charts/SalesForecastChart";
import RevenueAreaChart from "@/components/admin/charts/RevenueAreaChart";
import {
  WeekdayChart,
  HourlyChart,
  HourlyAxis,
} from "@/components/admin/charts/DistributionCharts";
import type { StripeAnalytics } from "@/lib/stripe-analytics";
import type { ForecastResult } from "@/lib/forecasting";

const fmtEur = (n: number) =>
  n.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

const fmtDate = (iso: string) => {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};

const fmtPct = (p: number) => `${Math.round(p * 100)}%`;

type Insight = {
  tone: "success" | "warning" | "danger" | "info";
  text: string;
};

function buildInsights(
  analytics: StripeAnalytics,
  forecast: ForecastResult,
  daysUntilAid: number
): Insight[] {
  const out: Insight[] = [];
  const { pacing, projection, stockout, diagnostics } = forecast;

  // Stock-out
  if (stockout.probability > 0.7 && stockout.remainingNow > 0) {
    out.push({
      tone: "warning",
      text: `Forte probabilité (${fmtPct(stockout.probability)}) de rupture de stock avant l'Aïd${
        stockout.expectedDate ? ` — autour du ${fmtDate(stockout.expectedDate)}` : ""
      }. Envisagez d'ouvrir +20 places ou d'augmenter le prix.`,
    });
  } else if (stockout.probability < 0.2 && stockout.remainingNow > 30) {
    out.push({
      tone: "info",
      text: `Stock confortable : ~${fmtPct(1 - stockout.probability)} de chance qu'il reste des moutons après l'Aïd. Pousser l'acquisition (ads, parrainage) reste rentable.`,
    });
  }

  // Accélération
  if (pacing.accelerationFactor > 2.5 && pacing.daysRemaining > 0) {
    out.push({
      tone: "success",
      text: `Ventes en accélération forte : ×${pacing.accelerationFactor.toFixed(1)} attendu sur les ${pacing.daysRemaining} prochains jours vs vélocité actuelle (${pacing.velocityRecent.toFixed(1)}/j → ${pacing.velocityProjected.toFixed(1)}/j).`,
    });
  }

  // Run-rate vs objectif
  if (projection.finalTotalSalesP50 > 0) {
    out.push({
      tone: "info",
      text: `Projection P50 : ~${projection.finalTotalSalesP50} ventes totales (${fmtEur(projection.finalTotalRevenueP50Eur)} de CA) à la clôture. Fourchette 80% : ${pacing.actualSoFar + forecast.projection.additionalSalesP10} – ${pacing.actualSoFar + forecast.projection.additionalSalesP90}.`,
    });
  }

  // Refunds
  if (analytics.totals.refundsCount > 0) {
    const refundRate =
      analytics.totals.refundsEur / Math.max(1, analytics.totals.grossEur);
    if (refundRate > 0.05) {
      out.push({
        tone: "danger",
        text: `Taux de remboursement élevé : ${fmtPct(refundRate)} du CA (${analytics.totals.refundsCount} remboursements). Investiguer la cause.`,
      });
    }
  }

  // Disputes
  if (analytics.totals.disputesCount > 0) {
    out.push({
      tone: "danger",
      text: `${analytics.totals.disputesCount} litige(s) Stripe en cours — risque sur le compte marchand. Traiter en priorité.`,
    });
  }

  // Frais Stripe
  if (analytics.totals.grossEur > 0) {
    const feeRate =
      analytics.totals.feesEur / Math.max(1, analytics.totals.grossEur);
    out.push({
      tone: "info",
      text: `Frais Stripe effectifs : ${fmtPct(feeRate)} du CA brut (${fmtEur(analytics.totals.feesEur)} sur ${fmtEur(analytics.totals.grossEur)}). Net réel encaissé : ${fmtEur(analytics.totals.netEur)}.`,
    });
  }

  // Pic horaire
  const topHour = [...analytics.hourlyDistribution].sort(
    (a, b) => b.count - a.count
  )[0];
  if (topHour && topHour.count > 0) {
    out.push({
      tone: "info",
      text: `Pic d'achat à ${String(topHour.hour).padStart(2, "0")}h (${topHour.count} ventes). Planifier les pushs WhatsApp / emails 1h avant.`,
    });
  }

  // Calibration du modèle
  if (diagnostics.aidMultiplierLearned > 1.3) {
    out.push({
      tone: "success",
      text: `Le modèle détecte un effet Aïd ×${diagnostics.aidMultiplierLearned.toFixed(2)} au-dessus de la baseline théorique — l'urgence se transforme bien en conversions.`,
    });
  } else if (
    diagnostics.aidMultiplierLearned < 0.7 &&
    pacing.actualSoFar > 10
  ) {
    out.push({
      tone: "warning",
      text: `Effet Aïd sous-performant (×${diagnostics.aidMultiplierLearned.toFixed(2)}) — les visiteurs ne convertissent pas autant qu'attendu sur la dernière ligne droite. Tester un rappel urgence ou un bonus dernière minute.`,
    });
  }

  // Days until Aïd
  if (daysUntilAid <= 3 && daysUntilAid > 0) {
    out.push({
      tone: "warning",
      text: `J-${daysUntilAid} avant l'Aïd : c'est la fenêtre de conversion finale. Sur les ${pacing.daysRemaining} jours restants, ${projection.additionalSalesP50} ventes attendues (P50).`,
    });
  }

  return out;
}

const TONE_STYLES: Record<
  Insight["tone"],
  { bg: string; border: string; icon: LucideIcon }
> = {
  success: {
    bg: "bg-emerald/5",
    border: "border-emerald/30",
    icon: Sparkles,
  },
  warning: {
    bg: "bg-gold/5",
    border: "border-gold/30",
    icon: Zap,
  },
  danger: {
    bg: "bg-urgency/5",
    border: "border-urgency/30",
    icon: AlertTriangle,
  },
  info: {
    bg: "bg-bg-tertiary",
    border: "border-gray-200",
    icon: Brain,
  },
};

export default function StripeAnalyticsDashboard({
  analytics,
  forecast,
  daysUntilAid,
  aidDateKey,
  todayKey,
}: {
  analytics: StripeAnalytics;
  forecast: ForecastResult;
  daysUntilAid: number;
  aidDateKey: string;
  todayKey: string;
}) {
  const { totals } = analytics;
  const insights = buildInsights(analytics, forecast, daysUntilAid);

  return (
    <div className="space-y-8">
      {/* ── KPI ligne 1 : argent réel ─────────────────────────────── */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Euro size={18} className="text-gold" />
            Cash encaissé (Stripe direct)
          </h2>
          <span className="text-text-muted-light text-xs">
            {analytics.rangeStart} → {analytics.rangeEnd} ·{" "}
            {totals.paidSessions} ventes payées
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard
            label="CA brut"
            value={fmtEur(totals.grossEur)}
            hint={`${totals.paidSessions} paiements réussis`}
            icon={Euro}
            tone="gold"
          />
          <KpiCard
            label="Net encaissé"
            value={fmtEur(totals.netEur)}
            hint={`après ${fmtEur(totals.feesEur)} de frais Stripe`}
            icon={Receipt}
            tone="emerald"
          />
          <KpiCard
            label="Panier moyen"
            value={fmtEur(totals.aovEur)}
            hint={`${totals.sessions} sessions au total`}
            icon={ShoppingBag}
            tone="neutral"
          />
          <KpiCard
            label="Remboursements"
            value={
              totals.refundsCount > 0
                ? `${totals.refundsCount} (${fmtEur(totals.refundsEur)})`
                : "0"
            }
            hint={`${totals.disputesCount} litige(s)`}
            icon={AlertTriangle}
            tone={totals.refundsCount > 0 || totals.disputesCount > 0 ? "urgency" : "neutral"}
          />
        </div>
      </div>

      {/* ── KPI ligne 2 : prédictions ─────────────────────────────── */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Brain size={18} className="text-gold" />
            Projection à J-Aïd (modèle Monte Carlo · 1 000 simulations)
          </h2>
          <span className="text-text-muted-light text-xs">
            J-{daysUntilAid} · médiane (P50) + intervalle 80%
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard
            label="Ventes totales attendues"
            value={forecast.projection.finalTotalSalesP50}
            hint={`Fourchette : ${forecast.pacing.actualSoFar + forecast.projection.additionalSalesP10}–${forecast.pacing.actualSoFar + forecast.projection.additionalSalesP90}`}
            icon={Target}
            tone="gold"
          />
          <KpiCard
            label="CA final attendu"
            value={fmtEur(forecast.projection.finalTotalRevenueP50Eur)}
            hint={`${fmtEur(forecast.projection.additionalRevenueP50Eur)} à venir`}
            icon={TrendingUp}
            tone="emerald"
          />
          <KpiCard
            label="Vélocité projetée"
            value={`${forecast.pacing.velocityProjected.toFixed(1)}/j`}
            hint={`vs ${forecast.pacing.velocityRecent.toFixed(1)}/j actuel (×${forecast.pacing.accelerationFactor > 99 ? "∞" : forecast.pacing.accelerationFactor.toFixed(1)})`}
            icon={Zap}
            tone="neutral"
          />
          <KpiCard
            label="Risque rupture"
            value={
              forecast.stockout.remainingNow > 0
                ? fmtPct(forecast.stockout.probability)
                : "—"
            }
            hint={
              forecast.stockout.expectedDate
                ? `Sold-out probable : ${fmtDate(forecast.stockout.expectedDate)}`
                : `${forecast.stockout.remainingNow} places restantes`
            }
            icon={CalendarClock}
            tone={forecast.stockout.probability > 0.5 ? "urgency" : "neutral"}
          />
        </div>
      </div>

      {/* ── Graphe principal ──────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="text-base font-bold text-text-primary">
            Courbe ventes/jour & prédiction
          </h3>
          <span className="text-text-muted-light text-xs">
            Source : Stripe API · cache 5min
          </span>
        </div>
        <SalesForecastChart
          history={analytics.daily.map((d) => ({
            date: d.date,
            count: d.count,
          }))}
          forecast={forecast.forecast}
          aidDateKey={aidDateKey}
          todayKey={todayKey}
          unit="ventes"
        />
      </div>

      {/* ── CA brut vs net ────────────────────────────────────────── */}
      {analytics.daily.some((d) => d.grossEur > 0) && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-base font-bold text-text-primary">
              CA quotidien (brut vs net après frais)
            </h3>
            <span className="text-text-muted-light text-xs">
              Frais Stripe = balance_transactions.fee
            </span>
          </div>
          <RevenueAreaChart
            daily={analytics.daily.map((d) => ({
              date: d.date,
              grossEur: d.grossEur,
              netEur: d.netEur,
            }))}
          />
        </div>
      )}

      {/* ── Distributions temporelles ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
            <CalendarClock size={14} className="text-gold" />
            Ventes par jour de la semaine
          </h3>
          <WeekdayChart data={analytics.weekdayDistribution} />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
            <Clock size={14} className="text-gold" />
            Ventes par heure (Europe/Paris)
          </h3>
          <HourlyChart data={analytics.hourlyDistribution} />
          <HourlyAxis />
        </div>
      </div>

      {/* ── Insights ML ───────────────────────────────────────────── */}
      {insights.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-gold" />
            Insights automatiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {insights.map((ins, i) => {
              const style = TONE_STYLES[ins.tone];
              const Icon = style.icon;
              return (
                <div
                  key={i}
                  className={`border rounded-xl p-4 flex items-start gap-3 ${style.bg} ${style.border}`}
                >
                  <Icon size={16} className="text-text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-text-primary leading-relaxed">
                    {ins.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Top customers ─────────────────────────────────────────── */}
      {analytics.topCustomers.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3">
            Top clients (par CA)
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-muted-light uppercase tracking-wider">
                <th className="pb-2 font-semibold">Email</th>
                <th className="pb-2 font-semibold text-right">Commandes</th>
                <th className="pb-2 font-semibold text-right">CA</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topCustomers.map((c) => (
                <tr key={c.email} className="border-t border-gray-100">
                  <td className="py-2 text-text-primary truncate max-w-xs">
                    {c.email}
                  </td>
                  <td className="py-2 text-right tabular-nums text-text-muted">
                    {c.count}
                  </td>
                  <td className="py-2 text-right tabular-nums font-bold text-gold">
                    {fmtEur(c.grossEur)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Diagnostics modèle (déplié, transparence) ─────────────── */}
      <details className="bg-bg-tertiary border border-gray-200 rounded-xl p-4">
        <summary className="cursor-pointer text-xs text-text-muted-light font-semibold uppercase tracking-wider">
          Diagnostics du modèle de prédiction
        </summary>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-text-muted-light">Panier moyen utilisé</div>
            <div className="font-bold text-text-primary">
              {fmtEur(forecast.diagnostics.aovEur)}
            </div>
          </div>
          <div>
            <div className="text-text-muted-light">Baseline quotidienne</div>
            <div className="font-bold text-text-primary">
              {forecast.diagnostics.baselineDaily.toFixed(2)} ventes/j
            </div>
          </div>
          <div>
            <div className="text-text-muted-light">Multiplicateur Aïd appris</div>
            <div className="font-bold text-text-primary">
              ×{forecast.diagnostics.aidMultiplierLearned.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-text-muted-light">Bruit résiduel (σ)</div>
            <div className="font-bold text-text-primary">
              ±{forecast.diagnostics.residualStdDev.toFixed(2)}
            </div>
          </div>
        </div>
        <p className="text-text-muted-light text-xs mt-3 leading-relaxed">
          Modèle : baseline lissée EWMA (demi-vie 14j) × multiplicateur d&apos;urgence
          Aïd calibré sur points connus du marché religieux, ré-ajusté par
          moindres carrés sur l&apos;historique récent. Incertitude estimée par
          bootstrap Monte Carlo (1 000 scénarios, bruit gaussien sur résidus).
        </p>
      </details>
    </div>
  );
}
