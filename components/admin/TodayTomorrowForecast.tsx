// Bandeau en tête du dashboard : prédictions ciblées aujourd'hui & demain.
// Plus "actionable" qu'un KPI standard car indique ce qu'il reste à faire
// avant minuit et ce que demain devrait apporter.

import { Sunrise, Sun, Euro } from "lucide-react";
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
    weekday: "long",
    day: "2-digit",
    month: "short",
  });
};

function PredictionPanel({
  icon: Icon,
  title,
  subtitle,
  primary,
  primaryLabel,
  range,
  revenueEur,
  badge,
  tone,
}: {
  icon: typeof Sun;
  title: string;
  subtitle: string;
  primary: number;
  primaryLabel: string;
  range: { p10: number; p90: number };
  revenueEur: number;
  badge?: { text: string; tone: "emerald" | "urgency" | "neutral" };
  tone: "gold" | "neutral";
}) {
  const bgClass = tone === "gold" ? "bg-gold/5 border-gold/30" : "bg-white border-gray-200";
  const accentClass = tone === "gold" ? "text-gold" : "text-text-primary";
  const badgeColor =
    badge?.tone === "emerald"
      ? "bg-emerald/10 text-emerald"
      : badge?.tone === "urgency"
      ? "bg-urgency/10 text-urgency"
      : "bg-bg-tertiary text-text-muted";

  return (
    <div className={`border rounded-xl p-5 ${bgClass}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tone === "gold" ? "bg-gold/15" : "bg-bg-tertiary"}`}>
            <Icon size={18} className={accentClass} />
          </div>
          <div>
            <div className="text-text-primary font-bold text-sm leading-tight">
              {title}
            </div>
            <div className="text-text-muted-light text-xs leading-tight">
              {subtitle}
            </div>
          </div>
        </div>
        {badge && (
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeColor}`}
          >
            {badge.text}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className={`text-4xl font-black leading-none tabular-nums ${accentClass}`}>
          {Math.round(primary)}
        </span>
        <span className="text-text-muted text-sm font-semibold">
          {primaryLabel}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="text-text-muted-light">
          Fourchette 80% :{" "}
          <span className="font-semibold text-text-primary tabular-nums">
            {Math.round(range.p10)}–{Math.round(range.p90)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-text-muted">
          <Euro size={11} />
          <span className="font-semibold tabular-nums">
            ~{fmtEur(revenueEur)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TodayTomorrowForecast({
  today,
  tomorrow,
}: {
  today: ForecastResult["today"];
  tomorrow: ForecastResult["tomorrow"];
}) {
  if (!today && !tomorrow) {
    return (
      <div className="bg-bg-tertiary border border-gray-200 rounded-xl p-5 text-center text-text-muted text-sm">
        L&apos;Aïd est passé — pas de prédiction immédiate.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {today && (
        <PredictionPanel
          icon={Sun}
          title="Aujourd'hui"
          subtitle={fmtDate(today.date)}
          primary={today.remaining.p50}
          primaryLabel="ventes à venir d'ici minuit"
          range={today.remaining}
          revenueEur={today.revenueRemainingP50Eur}
          badge={{
            text: `${today.soFar} déjà · ~${Math.round(today.expectedTotal.p50)} attendues`,
            tone: today.soFar >= today.expectedTotal.p50 ? "emerald" : "neutral",
          }}
          tone="gold"
        />
      )}
      {tomorrow && (
        <PredictionPanel
          icon={Sunrise}
          title="Demain"
          subtitle={fmtDate(tomorrow.date)}
          primary={tomorrow.expected.p50}
          primaryLabel="ventes attendues"
          range={tomorrow.expected}
          revenueEur={tomorrow.revenueP50Eur}
          tone="neutral"
        />
      )}
    </div>
  );
}
