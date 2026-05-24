"use client";

// Graphe principal historique + forecast avec bande de confiance.
// SVG natif, responsive via viewBox. Cohérent avec le design system
// (Tailwind tokens : gold / emerald / urgency / gray-200).

import { useMemo, useState } from "react";

type Point = { date: string; value: number };

export type SalesForecastChartProps = {
  history: { date: string; count: number }[];
  forecast: { date: string; p10: number; p50: number; p90: number }[];
  aidDateKey: string; // YYYY-MM-DD
  todayKey: string;
  unit?: "ventes" | "€";
};

const MARGIN = { top: 16, right: 24, bottom: 32, left: 40 };
const WIDTH = 800;
const HEIGHT = 320;

function fmtDateShort(iso: string): string {
  // "2026-05-27" → "27/05"
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

export default function SalesForecastChart({
  history,
  forecast,
  aidDateKey,
  todayKey,
  unit = "ventes",
}: SalesForecastChartProps) {
  const [hover, setHover] = useState<{ x: number; y: number; label: string } | null>(null);

  const all = useMemo(() => {
    const h: Point[] = history.map((p) => ({ date: p.date, value: p.count }));
    const f: Point[] = forecast.map((p) => ({ date: p.date, value: p.p50 }));
    return { combined: [...h, ...f], history: h, forecast: f };
  }, [history, forecast]);

  const xLabels = all.combined.map((p) => p.date);
  const xIndex = (date: string) => xLabels.indexOf(date);
  const xMax = Math.max(1, xLabels.length - 1);

  const yMax = useMemo(() => {
    const hMax = Math.max(0, ...history.map((p) => p.count));
    const fMax = Math.max(0, ...forecast.map((p) => p.p90));
    return Math.max(1, Math.ceil((Math.max(hMax, fMax) * 1.15) / 5) * 5);
  }, [history, forecast]);

  const xScale = (i: number) =>
    MARGIN.left + (i / xMax) * (WIDTH - MARGIN.left - MARGIN.right);
  const yScale = (v: number) =>
    HEIGHT - MARGIN.bottom - (v / yMax) * (HEIGHT - MARGIN.top - MARGIN.bottom);

  // Path historique (continu, doré)
  const historyPath = history
    .map((p, i) => {
      const x = xScale(xIndex(p.date));
      const y = yScale(p.count);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  // Path forecast P50 (pointillé)
  const lastHistory = history[history.length - 1];
  const forecastStart = lastHistory
    ? [{ date: lastHistory.date, p10: lastHistory.count, p50: lastHistory.count, p90: lastHistory.count }]
    : [];
  const forecastFull = [...forecastStart, ...forecast];

  const forecastPath = forecastFull
    .map((p, i) => {
      const x = xScale(xIndex(p.date));
      const y = yScale(p.p50);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  // Bande de confiance P10-P90 (area)
  const bandPath = (() => {
    if (forecastFull.length === 0) return "";
    const top = forecastFull
      .map((p, i) => {
        const x = xScale(xIndex(p.date));
        const y = yScale(p.p90);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
    const bottom = forecastFull
      .slice()
      .reverse()
      .map((p) => {
        const x = xScale(xIndex(p.date));
        const y = yScale(p.p10);
        return `L ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
    return `${top} ${bottom} Z`;
  })();

  // Y-axis ticks
  const yTicks = Array.from({ length: 5 }, (_, i) => (yMax / 4) * i);
  // X-axis ticks (max 8 labels pour éviter overlap)
  const xStep = Math.max(1, Math.ceil(xLabels.length / 8));
  const xTickIndexes = xLabels
    .map((_, i) => i)
    .filter((i) => i % xStep === 0 || i === xLabels.length - 1);

  const todayX = todayKey && xIndex(todayKey) >= 0 ? xScale(xIndex(todayKey)) : null;
  const aidX = aidDateKey && xIndex(aidDateKey) >= 0 ? xScale(xIndex(aidDateKey)) : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
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

        {/* Bande de confiance forecast */}
        {bandPath && (
          <path
            d={bandPath}
            fill="#d4a574"
            fillOpacity={0.15}
            stroke="none"
          />
        )}

        {/* Ligne historique */}
        <path
          d={historyPath}
          fill="none"
          stroke="#d4a574"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Ligne forecast P50 */}
        <path
          d={forecastPath}
          fill="none"
          stroke="#d4a574"
          strokeWidth={2}
          strokeDasharray="6 4"
          opacity={0.85}
        />

        {/* Points historique */}
        {history.map((p) => {
          const x = xScale(xIndex(p.date));
          const y = yScale(p.count);
          return (
            <circle
              key={p.date}
              cx={x}
              cy={y}
              r={3}
              fill="#d4a574"
              onMouseEnter={() =>
                setHover({
                  x,
                  y,
                  label: `${fmtDateShort(p.date)} · ${Math.round(p.count)} ${unit}`,
                })
              }
            />
          );
        })}

        {/* Marker aujourd'hui */}
        {todayX !== null && (
          <g>
            <line
              x1={todayX}
              x2={todayX}
              y1={MARGIN.top}
              y2={HEIGHT - MARGIN.bottom}
              stroke="#10b981"
              strokeWidth={1}
              strokeDasharray="2 2"
            />
            <text
              x={todayX}
              y={MARGIN.top + 10}
              textAnchor="middle"
              fontSize={9}
              fill="#10b981"
              fontWeight={700}
            >
              Aujourd&apos;hui
            </text>
          </g>
        )}

        {/* Marker Aïd */}
        {aidX !== null && (
          <g>
            <line
              x1={aidX}
              x2={aidX}
              y1={MARGIN.top}
              y2={HEIGHT - MARGIN.bottom}
              stroke="#dc2626"
              strokeWidth={1.5}
            />
            <text
              x={aidX}
              y={MARGIN.top + 10}
              textAnchor="middle"
              fontSize={9}
              fill="#dc2626"
              fontWeight={700}
            >
              Aïd
            </text>
          </g>
        )}

        {/* X-axis labels */}
        {xTickIndexes.map((i) => (
          <text
            key={i}
            x={xScale(i)}
            y={HEIGHT - MARGIN.bottom + 14}
            textAnchor="middle"
            fontSize={9}
            fill="#6b7280"
          >
            {fmtDateShort(xLabels[i])}
          </text>
        ))}
      </svg>

      {hover && (
        <div
          className="absolute pointer-events-none bg-text-primary text-white text-xs px-2 py-1 rounded shadow-lg"
          style={{
            left: `${(hover.x / WIDTH) * 100}%`,
            top: `${(hover.y / HEIGHT) * 100}%`,
            transform: "translate(-50%, -130%)",
          }}
        >
          {hover.label}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3 text-xs text-text-muted-light">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-[#d4a574] rounded" />
          Historique
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-[#d4a574] rounded" style={{ borderTop: "1px dashed #d4a574" }} />
          Prédiction (médiane)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-2 bg-[#d4a574] rounded opacity-25" />
          Intervalle de confiance 80%
        </span>
      </div>
    </div>
  );
}
