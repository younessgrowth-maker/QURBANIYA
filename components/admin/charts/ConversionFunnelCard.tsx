// Carte funnel de conversion : Sessions ouvertes → payées (avec %).
// Affiche aussi expirées / open en attente pour le diagnostic.

import { TrendingUp } from "lucide-react";

export type FunnelData = {
  sessionsTotal: number;
  sessionsPaid: number;
  sessionsExpired: number;
  sessionsOpen: number;
  rate: number;
};

export default function ConversionFunnelCard({
  current,
  previous,
}: {
  current: FunnelData;
  previous?: FunnelData;
}) {
  const fmtPct = (r: number) => `${(r * 100).toFixed(1)}%`;
  const delta =
    previous && previous.rate > 0
      ? ((current.rate - previous.rate) / previous.rate) * 100
      : null;

  const segments = [
    {
      label: "Sessions ouvertes",
      value: current.sessionsTotal,
      width: 100,
      tone: "bg-gray-200",
    },
    {
      label: "Payées",
      value: current.sessionsPaid,
      width:
        current.sessionsTotal > 0
          ? (current.sessionsPaid / current.sessionsTotal) * 100
          : 0,
      tone: "bg-gold",
    },
  ];

  const lostExpired =
    current.sessionsTotal > 0
      ? (current.sessionsExpired / current.sessionsTotal) * 100
      : 0;
  const lostOpen =
    current.sessionsTotal > 0
      ? (current.sessionsOpen / current.sessionsTotal) * 100
      : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <TrendingUp size={14} className="text-gold" />
          Funnel de conversion Stripe
        </h3>
        <div className="text-right">
          <div className="text-2xl font-black text-gold tabular-nums">
            {fmtPct(current.rate)}
          </div>
          {delta !== null && (
            <div
              className={`text-xs font-semibold ${delta >= 0 ? "text-emerald" : "text-urgency"}`}
            >
              {delta >= 0 ? "+" : ""}
              {delta.toFixed(1)}% vs an dernier
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {segments.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-text-muted">{s.label}</span>
              <span className="text-text-primary font-bold tabular-nums">
                {s.value}
              </span>
            </div>
            <div className="h-3 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className={`h-full ${s.tone} rounded-full transition-all`}
                style={{ width: `${Math.min(100, s.width)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-text-muted-light">Sessions expirées</div>
          <div className="text-text-primary font-bold">
            {current.sessionsExpired}{" "}
            <span className="text-text-muted-light font-normal">
              ({lostExpired.toFixed(0)}%)
            </span>
          </div>
        </div>
        <div>
          <div className="text-text-muted-light">En attente</div>
          <div className="text-text-primary font-bold">
            {current.sessionsOpen}{" "}
            <span className="text-text-muted-light font-normal">
              ({lostOpen.toFixed(0)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
