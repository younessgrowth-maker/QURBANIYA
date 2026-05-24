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
  Tag,
} from "lucide-react";
import { KpiCard } from "@/components/admin/KpiCard";
import YoYKpiCard from "@/components/admin/YoYKpiCard";
import SalesForecastChart from "@/components/admin/charts/SalesForecastChart";
import CumulativeChart from "@/components/admin/charts/CumulativeChart";
import ConversionFunnelCard from "@/components/admin/charts/ConversionFunnelCard";
import {
  WeekdayChart,
  HourlyChart,
  HourlyAxis,
} from "@/components/admin/charts/DistributionCharts";
import type { YoYAnalytics } from "@/lib/stripe-analytics";
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
  yoy: YoYAnalytics,
  forecast: ForecastResult,
  daysUntilAid: number
): Insight[] {
  const out: Insight[] = [];
  const { current, previous } = yoy;
  const { pacing, projection, stockout, diagnostics } = forecast;

  // YoY headline
  if (previous && yoy.yoy.salesGrowthPct !== null) {
    const g = yoy.yoy.salesGrowthPct;
    if (g > 30) {
      out.push({
        tone: "success",
        text: `Croissance ventes ×${(1 + g / 100).toFixed(2)} vs an dernier (${current.totals.paidSessions} cette année vs ${previous.totals.paidSessions} l'an dernier sur la même fenêtre J-${Math.abs(current.daily[0]?.daysBeforeAid ?? 90)} → aujourd'hui).`,
      });
    } else if (g < -10) {
      out.push({
        tone: "warning",
        text: `Recul ventes ${g.toFixed(0)}% vs an dernier (${current.totals.paidSessions} vs ${previous.totals.paidSessions}). Vérifier acquisition / pricing.`,
      });
    }
  }

  // Stock-out
  if (stockout.probability > 0.7 && stockout.remainingNow > 0) {
    out.push({
      tone: "warning",
      text: `Forte probabilité (${fmtPct(stockout.probability)}) de rupture avant l'Aïd${
        stockout.expectedDate ? ` — autour du ${fmtDate(stockout.expectedDate)}` : ""
      }. Envisagez +20 places ou pricing dynamique.`,
    });
  } else if (stockout.probability < 0.2 && stockout.remainingNow > 30) {
    out.push({
      tone: "info",
      text: `Stock confortable (~${fmtPct(1 - stockout.probability)} de chance qu'il en reste). Pousser l'acquisition reste rentable.`,
    });
  }

  // Accélération
  if (pacing.accelerationFactor > 2.5 && pacing.daysRemaining > 0) {
    out.push({
      tone: "success",
      text: `Accélération forte attendue : ×${pacing.accelerationFactor.toFixed(1)} sur les ${pacing.daysRemaining} jours restants (${pacing.velocityRecent.toFixed(1)}/j → ${pacing.velocityProjected.toFixed(1)}/j).`,
    });
  }

  // Projection
  if (projection.finalTotalSalesP50 > 0) {
    const range =
      pacing.actualSoFar +
      forecast.projection.additionalSalesP10 +
      " – " +
      (pacing.actualSoFar + forecast.projection.additionalSalesP90);
    out.push({
      tone: "info",
      text: `Projection P50 : ~${projection.finalTotalSalesP50} ventes (${fmtEur(projection.finalTotalRevenueP50Eur)}) à la clôture. Fourchette 80% : ${range}.`,
    });
  }

  // Refunds
  if (current.totals.refundsCount > 0) {
    const refundRate =
      current.totals.refundsEur / Math.max(1, current.totals.grossEur);
    if (refundRate > 0.05) {
      out.push({
        tone: "danger",
        text: `Taux de remboursement élevé : ${fmtPct(refundRate)} du CA (${current.totals.refundsCount} remboursements).`,
      });
    }
  }

  // Disputes
  if (current.totals.disputesCount > 0) {
    out.push({
      tone: "danger",
      text: `${current.totals.disputesCount} litige(s) Stripe en cours — risque sur le compte marchand.`,
    });
  }

  // Frais Stripe
  if (current.totals.grossEur > 0) {
    const feeRate =
      current.totals.feesEur / Math.max(1, current.totals.grossEur);
    out.push({
      tone: "info",
      text: `Frais Stripe effectifs : ${fmtPct(feeRate)} (${fmtEur(current.totals.feesEur)} sur ${fmtEur(current.totals.grossEur)}). Net : ${fmtEur(current.totals.netEur)}.`,
    });
  }

  // Pic horaire
  const topHour = [...current.hourlyDistribution].sort(
    (a, b) => b.count - a.count
  )[0];
  if (topHour && topHour.count > 0) {
    out.push({
      tone: "info",
      text: `Pic d'achat à ${String(topHour.hour).padStart(2, "0")}h (${topHour.count} ventes). Planifier les pushs 1h avant.`,
    });
  }

  // Méthode de forecast
  if (diagnostics.method === "prior-from-last-year") {
    out.push({
      tone: "info",
      text: `Forecast ancré sur la courbe réelle de l'an dernier (calibré ×${diagnostics.aidMultiplierLearned.toFixed(2)} pour matcher la trajectoire actuelle).`,
    });
  } else if (diagnostics.method === "empirical-aid-curve") {
    out.push({
      tone: "info",
      text: `Forecast basé sur multiplicateur Aïd empirique (pas assez de data an dernier pour servir de prior).`,
    });
  }

  // J-X
  if (daysUntilAid <= 3 && daysUntilAid > 0) {
    out.push({
      tone: "warning",
      text: `J-${daysUntilAid} : fenêtre de conversion finale. ${projection.additionalSalesP50} ventes attendues (P50) sur les ${pacing.daysRemaining} jours restants.`,
    });
  }

  return out;
}

const TONE_STYLES: Record<
  Insight["tone"],
  { bg: string; border: string; icon: LucideIcon }
> = {
  success: { bg: "bg-emerald/5", border: "border-emerald/30", icon: Sparkles },
  warning: { bg: "bg-gold/5", border: "border-gold/30", icon: Zap },
  danger: {
    bg: "bg-urgency/5",
    border: "border-urgency/30",
    icon: AlertTriangle,
  },
  info: { bg: "bg-bg-tertiary", border: "border-gray-200", icon: Brain },
};

export default function StripeAnalyticsDashboard({
  yoy,
  forecast,
  daysUntilAid,
}: {
  yoy: YoYAnalytics;
  forecast: ForecastResult;
  daysUntilAid: number;
}) {
  const { current, previous } = yoy;
  const insights = buildInsights(yoy, forecast, daysUntilAid);

  const previousLabel = previous ? `Aïd ${previous.year}` : undefined;
  const currentLabel = `Aïd ${current.year}`;

  return (
    <div className="space-y-8">
      {/* ── KPI YoY : argent réel ─────────────────────────────────── */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Euro size={18} className="text-gold" />
            Cash encaissé · {currentLabel}
            {previous && (
              <span className="text-xs font-normal text-text-muted-light ml-2">
                vs {previousLabel} (même fenêtre J-{Math.abs(current.daily[0]?.daysBeforeAid ?? 90)})
              </span>
            )}
          </h2>
          <span className="text-text-muted-light text-xs">
            {current.rangeStart} → {current.rangeEnd}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <YoYKpiCard
            label="Ventes payées"
            value={current.totals.paidSessions}
            previousValue={previous?.totals.paidSessions}
            deltaPct={yoy.yoy.salesGrowthPct}
            icon={ShoppingBag}
            tone="gold"
          />
          <YoYKpiCard
            label="CA brut"
            value={fmtEur(current.totals.grossEur)}
            previousValue={
              previous ? fmtEur(previous.totals.grossEur) : undefined
            }
            deltaPct={yoy.yoy.revenueGrowthPct}
            icon={Euro}
            tone="gold"
          />
          <YoYKpiCard
            label="Net après frais"
            value={fmtEur(current.totals.netEur)}
            previousValue={
              previous ? fmtEur(previous.totals.netEur) : undefined
            }
            deltaPct={
              previous && previous.totals.netEur > 0
                ? ((current.totals.netEur - previous.totals.netEur) /
                    previous.totals.netEur) *
                  100
                : null
            }
            icon={Receipt}
            tone="emerald"
            hint={
              !previous
                ? `frais : ${fmtEur(current.totals.feesEur)}`
                : undefined
            }
          />
          <YoYKpiCard
            label="Panier moyen"
            value={fmtEur(current.totals.aovEur)}
            previousValue={
              previous ? fmtEur(previous.totals.aovEur) : undefined
            }
            deltaPct={yoy.yoy.aovGrowthPct}
            icon={Target}
            tone="neutral"
          />
        </div>
      </div>

      {/* ── KPI : projections forecast ────────────────────────────── */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Brain size={18} className="text-gold" />
            Projection à J-Aïd (Monte Carlo · 1 000 simulations)
          </h2>
          <span className="text-text-muted-light text-xs">
            J-{daysUntilAid} · méthode :{" "}
            {forecast.diagnostics.method === "prior-from-last-year"
              ? "prior an dernier"
              : "courbe empirique"}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard
            label="Ventes totales attendues"
            value={forecast.projection.finalTotalSalesP50}
            hint={`Fourchette 80% : ${forecast.pacing.actualSoFar + forecast.projection.additionalSalesP10}–${forecast.pacing.actualSoFar + forecast.projection.additionalSalesP90}`}
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

      {/* ── Graphe principal : YoY + forecast ─────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
          <h3 className="text-base font-bold text-text-primary">
            Ventes/jour · {currentLabel}
            {previous && ` vs ${previousLabel}`}
          </h3>
          <span className="text-text-muted-light text-xs">
            Aligné par jours avant l&apos;Aïd · Source Stripe
          </span>
        </div>
        <SalesForecastChart
          current={current.daily.map((b) => ({
            daysBeforeAid: b.daysBeforeAid,
            count: b.count,
          }))}
          previous={previous?.daily.map((b) => ({
            daysBeforeAid: b.daysBeforeAid,
            count: b.count,
          }))}
          forecast={forecast.forecast}
          currentYearLabel={currentLabel}
          previousYearLabel={previousLabel}
        />
      </div>

      {/* ── CA cumulé YoY ─────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
          <h3 className="text-base font-bold text-text-primary">
            CA cumulé jusqu&apos;à l&apos;Aïd
          </h3>
          <span className="text-text-muted-light text-xs">
            Trajectoire totale par campagne
          </span>
        </div>
        <CumulativeChart
          current={current.daily.map((b) => ({
            daysBeforeAid: b.daysBeforeAid,
            grossEur: b.grossEur,
          }))}
          previous={previous?.daily.map((b) => ({
            daysBeforeAid: b.daysBeforeAid,
            grossEur: b.grossEur,
          }))}
          currentYearLabel={currentLabel}
          previousYearLabel={previousLabel}
        />
      </div>

      {/* ── Funnel + Distributions ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ConversionFunnelCard
          current={current.conversionFunnel}
          previous={previous?.conversionFunnel}
        />
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
            <CalendarClock size={14} className="text-gold" />
            Ventes par jour de la semaine
          </h3>
          <WeekdayChart data={current.weekdayDistribution} />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
            <Clock size={14} className="text-gold" />
            Ventes par heure
          </h3>
          <HourlyChart data={current.hourlyDistribution} />
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
                  <Icon
                    size={16}
                    className="text-text-primary flex-shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-text-primary leading-relaxed">
                    {ins.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Top promo codes ─────────────────────────────────────── */}
      {current.topPromoCodes.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
            <Tag size={14} className="text-gold" />
            Codes promo utilisés ({currentLabel})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {current.topPromoCodes.map((p) => (
              <div key={p.code} className="bg-bg-tertiary rounded-lg p-3">
                <div className="font-mono text-xs text-text-primary font-bold">
                  {p.code}
                </div>
                <div className="text-xl font-black text-gold mt-1 tabular-nums">
                  {p.count}
                </div>
                <div className="text-text-muted-light text-[10px]">
                  −{fmtEur(p.totalDiscountEur)} accordés
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Top customers ─────────────────────────────────────────── */}
      {current.topCustomers.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3">
            Top clients ({currentLabel})
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
              {current.topCustomers.map((c) => (
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

      {/* ── Diagnostics modèle ────────────────────────────────────── */}
      <details className="bg-bg-tertiary border border-gray-200 rounded-xl p-4">
        <summary className="cursor-pointer text-xs text-text-muted-light font-semibold uppercase tracking-wider">
          Diagnostics du modèle de prédiction
        </summary>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-text-muted-light">Méthode</div>
            <div className="font-bold text-text-primary">
              {forecast.diagnostics.method === "prior-from-last-year"
                ? "Prior an dernier"
                : "Courbe Aïd empirique"}
            </div>
          </div>
          <div>
            <div className="text-text-muted-light">Panier moyen</div>
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
            <div className="text-text-muted-light">Calibration apprise</div>
            <div className="font-bold text-text-primary">
              ×{forecast.diagnostics.aidMultiplierLearned.toFixed(2)}
            </div>
          </div>
        </div>
        <p className="text-text-muted-light text-xs mt-3 leading-relaxed">
          {forecast.diagnostics.method === "prior-from-last-year"
            ? "Le forecast utilise la courbe réelle observée à l'Aïd dernier comme structure attendue (shape function), lissée par moyenne glissante 3 jours. Un facteur de calibration global est appris par moindres carrés pour matcher la trajectoire de l'année en cours. Bootstrap Monte Carlo (1000 scénarios, bruit gaussien sur résidus) pour les intervalles de confiance."
            : "Le forecast utilise une courbe d'urgence empirique (multiplicateur croissant à mesure que l'Aïd approche), calibrée sur des observations e-commerce religieux. Pas encore assez de data l'an dernier pour servir de prior."}
        </p>
      </details>
    </div>
  );
}
