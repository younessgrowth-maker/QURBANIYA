"use client";

// Graphe principal : courbes superposées année en cours + année dernière
// + zone de prédiction. Axe X = jours avant l'Aïd (alignement YoY).

import { useMemo, useState } from "react";

type Series = { daysBeforeAid: number; count: number }[];
type ForecastSeries = {
  daysBeforeAid: number;
  p10: number;
  p50: number;
  p90: number;
}[];

export type SalesForecastChartProps = {
  current: Series;
  previous?: Series;
  forecast: ForecastSeries;
  currentYearLabel: string;
  previousYearLabel?: string;
};

const MARGIN = { top: 20, right: 24, bottom: 36, left: 44 };
const WIDTH = 900;
const HEIGHT = 360;

const COLOR_CURRENT = "#d4a574"; // gold
const COLOR_PREVIOUS = "#94a3b8"; // slate-400
const COLOR_FORECAST = "#d4a574";

export default function SalesForecastChart({
  current,
  previous,
  forecast,
  currentYearLabel,
  previousYearLabel,
}: SalesForecastChartProps) {
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);

  // Domaine X commun : [min daysBeforeAid, max daysBeforeAid]
  const xDomain = useMemo(() => {
    const all: number[] = [];
    for (const p of current) all.push(p.daysBeforeAid);
    for (const p of previous ?? []) all.push(p.daysBeforeAid);
    for (const p of forecast) all.push(p.daysBeforeAid);
    if (all.length === 0) return { min: -90, max: 0 };
    return { min: Math.min(...all), max: Math.max(...all) };
  }, [current, previous, forecast]);

  const yMax = useMemo(() => {
    const vals: number[] = [];
    for (const p of current) vals.push(p.count);
    for (const p of previous ?? []) vals.push(p.count);
    for (const p of forecast) vals.push(p.p90);
    const m = Math.max(1, ...vals);
    return Math.max(1, Math.ceil((m * 1.15) / 5) * 5);
  }, [current, previous, forecast]);

  const xScale = (dba: number) => {
    const range = xDomain.max - xDomain.min || 1;
    return (
      MARGIN.left +
      ((dba - xDomain.min) / range) * (WIDTH - MARGIN.left - MARGIN.right)
    );
  };
  const yScale = (v: number) =>
    HEIGHT - MARGIN.bottom - (v / yMax) * (HEIGHT - MARGIN.top - MARGIN.bottom);

  const linePath = (data: { daysBeforeAid: number; count: number }[]) =>
    data
      .slice()
      .sort((a, b) => a.daysBeforeAid - b.daysBeforeAid)
      .map((p, i) => {
        const x = xScale(p.daysBeforeAid);
        const y = yScale(p.count);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

  const forecastLinePath = (key: "p10" | "p50" | "p90") =>
    forecast
      .slice()
      .sort((a, b) => a.daysBeforeAid - b.daysBeforeAid)
      .map((p, i) => {
        const x = xScale(p.daysBeforeAid);
        const y = yScale(p[key]);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

  const bandPath = (() => {
    if (forecast.length === 0) return "";
    const sorted = forecast.slice().sort((a, b) => a.daysBeforeAid - b.daysBeforeAid);
    const top = sorted
      .map((p, i) => {
        const x = xScale(p.daysBeforeAid);
        const y = yScale(p.p90);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
    const bottom = sorted
      .slice()
      .reverse()
      .map((p) => {
        const x = xScale(p.daysBeforeAid);
        const y = yScale(p.p10);
        return `L ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
    return `${top} ${bottom} Z`;
  })();

  const yTicks = Array.from({ length: 5 }, (_, i) => (yMax / 4) * i);
  // X-ticks : un par 7 jours dans la plage
  const xTicks: number[] = [];
  for (let v = Math.ceil(xDomain.min / 7) * 7; v <= xDomain.max; v += 7) {
    xTicks.push(v);
  }
  if (!xTicks.includes(0) && xDomain.min <= 0 && xDomain.max >= 0) xTicks.push(0);

  const fmtDba = (dba: number) => {
    if (dba === 0) return "Aïd";
    if (dba < 0) return `J${dba}`;
    return `J+${dba}`;
  };

  // Trouver le point "aujourd'hui" pour le current
  const sortedCurrent = current.slice().sort((a, b) => a.daysBeforeAid - b.daysBeforeAid);
  const lastObserved =
    sortedCurrent.length > 0 ? sortedCurrent[sortedCurrent.length - 1] : null;
  const todayX = lastObserved ? xScale(lastObserved.daysBeforeAid) : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        onMouseLeave={() => setHover(null)}
      >
        {/* Grille horizontale */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line
              x1={MARGIN.left}
              x2={WIDTH - MARGIN.right}
              y1={yScale(t)}
              y2={yScale(t)}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            <text
              x={MARGIN.left - 6}
              y={yScale(t) + 4}
              textAnchor="end"
              fontSize={10}
              fill="#9ca3af"
            >
              {Math.round(t)}
            </text>
          </g>
        ))}

        {/* Ligne verticale Aïd */}
        {xDomain.min <= 0 && xDomain.max >= 0 && (
          <g>
            <line
              x1={xScale(0)}
              x2={xScale(0)}
              y1={MARGIN.top}
              y2={HEIGHT - MARGIN.bottom}
              stroke="#dc2626"
              strokeWidth={1.5}
            />
            <text
              x={xScale(0)}
              y={MARGIN.top + 12}
              textAnchor="middle"
              fontSize={10}
              fill="#dc2626"
              fontWeight={700}
            >
              Aïd
            </text>
          </g>
        )}

        {/* Aujourd'hui (limite historique vs forecast) */}
        {todayX !== null && (
          <line
            x1={todayX}
            x2={todayX}
            y1={MARGIN.top}
            y2={HEIGHT - MARGIN.bottom}
            stroke="#10b981"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
        )}

        {/* Bande confiance forecast */}
        {bandPath && (
          <path
            d={bandPath}
            fill={COLOR_FORECAST}
            fillOpacity={0.15}
            stroke="none"
          />
        )}

        {/* Ligne année précédente (en arrière) */}
        {previous && previous.length > 0 && (
          <path
            d={linePath(previous)}
            fill="none"
            stroke={COLOR_PREVIOUS}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.75}
          />
        )}

        {/* Ligne année en cours */}
        <path
          d={linePath(current)}
          fill="none"
          stroke={COLOR_CURRENT}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Ligne forecast P50 */}
        <path
          d={forecastLinePath("p50")}
          fill="none"
          stroke={COLOR_FORECAST}
          strokeWidth={2}
          strokeDasharray="6 4"
          opacity={0.85}
        />

        {/* Points current pour hover */}
        {current.map((p) => {
          const x = xScale(p.daysBeforeAid);
          const y = yScale(p.count);
          return (
            <circle
              key={`c-${p.daysBeforeAid}`}
              cx={x}
              cy={y}
              r={3}
              fill={COLOR_CURRENT}
              onMouseEnter={() =>
                setHover({
                  x,
                  y,
                  label: `${currentYearLabel} · ${fmtDba(p.daysBeforeAid)} : ${p.count} ventes`,
                })
              }
            />
          );
        })}

        {/* Points previous pour hover */}
        {(previous ?? []).map((p) => {
          const x = xScale(p.daysBeforeAid);
          const y = yScale(p.count);
          return (
            <circle
              key={`p-${p.daysBeforeAid}`}
              cx={x}
              cy={y}
              r={2.5}
              fill={COLOR_PREVIOUS}
              onMouseEnter={() =>
                setHover({
                  x,
                  y,
                  label: `${previousYearLabel ?? "An dernier"} · ${fmtDba(p.daysBeforeAid)} : ${p.count} ventes`,
                })
              }
            />
          );
        })}

        {/* X-axis labels */}
        {xTicks.map((dba) => (
          <text
            key={dba}
            x={xScale(dba)}
            y={HEIGHT - MARGIN.bottom + 16}
            textAnchor="middle"
            fontSize={10}
            fill="#6b7280"
          >
            {fmtDba(dba)}
          </text>
        ))}
        <text
          x={(WIDTH - MARGIN.left - MARGIN.right) / 2 + MARGIN.left}
          y={HEIGHT - 4}
          textAnchor="middle"
          fontSize={10}
          fill="#9ca3af"
        >
          Jours avant l&apos;Aïd
        </text>
      </svg>

      {hover && (
        <div
          className="absolute pointer-events-none bg-text-primary text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap"
          style={{
            left: `${(hover.x / WIDTH) * 100}%`,
            top: `${(hover.y / HEIGHT) * 100}%`,
            transform: "translate(-50%, -130%)",
          }}
        >
          {hover.label}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3 text-xs text-text-muted-light flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5" style={{ background: COLOR_CURRENT }} />
          {currentYearLabel} (en cours)
        </span>
        {previous && previous.length > 0 && previousYearLabel && (
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5" style={{ background: COLOR_PREVIOUS }} />
            {previousYearLabel} (référence)
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span
            className="w-4 h-0.5"
            style={{
              background: `repeating-linear-gradient(90deg, ${COLOR_FORECAST} 0 4px, transparent 4px 8px)`,
            }}
          />
          Prédiction (P50)
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-4 h-2"
            style={{ background: COLOR_FORECAST, opacity: 0.25 }}
          />
          Intervalle 80%
        </span>
      </div>
    </div>
  );
}
