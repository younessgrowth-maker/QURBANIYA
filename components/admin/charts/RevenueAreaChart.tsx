"use client";

// Aire empilée brut vs net (frais Stripe en transparence).
// SVG natif.

import { useMemo } from "react";

export type RevenueAreaChartProps = {
  daily: { date: string; grossEur: number; netEur: number }[];
};

const MARGIN = { top: 16, right: 24, bottom: 32, left: 48 };
const WIDTH = 800;
const HEIGHT = 220;

function fmtDateShort(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

function fmtEur(n: number): string {
  if (n >= 10000) return `${Math.round(n / 1000)}k€`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k€`;
  return `${Math.round(n)}€`;
}

export default function RevenueAreaChart({ daily }: RevenueAreaChartProps) {
  const yMax = useMemo(() => {
    const m = Math.max(0, ...daily.map((d) => d.grossEur));
    return Math.max(10, Math.ceil((m * 1.15) / 100) * 100);
  }, [daily]);

  const xMax = Math.max(1, daily.length - 1);
  const xScale = (i: number) =>
    MARGIN.left + (i / xMax) * (WIDTH - MARGIN.left - MARGIN.right);
  const yScale = (v: number) =>
    HEIGHT - MARGIN.bottom - (v / yMax) * (HEIGHT - MARGIN.top - MARGIN.bottom);

  const areaPath = (key: "grossEur" | "netEur") => {
    if (daily.length === 0) return "";
    const top = daily
      .map((p, i) => {
        const x = xScale(i);
        const y = yScale(p[key]);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
    const lastX = xScale(daily.length - 1);
    const firstX = xScale(0);
    const baseY = yScale(0);
    return `${top} L ${lastX.toFixed(1)} ${baseY.toFixed(1)} L ${firstX.toFixed(1)} ${baseY.toFixed(1)} Z`;
  };

  const linePath = (key: "grossEur" | "netEur") =>
    daily
      .map((p, i) => {
        const x = xScale(i);
        const y = yScale(p[key]);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

  const yTicks = Array.from({ length: 4 }, (_, i) => (yMax / 3) * i);
  const xStep = Math.max(1, Math.ceil(daily.length / 8));
  const xTickIndexes = daily
    .map((_, i) => i)
    .filter((i) => i % xStep === 0 || i === daily.length - 1);

  return (
    <div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
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
              {fmtEur(t)}
            </text>
          </g>
        ))}

        <path d={areaPath("grossEur")} fill="#d4a574" fillOpacity={0.18} />
        <path d={linePath("grossEur")} fill="none" stroke="#d4a574" strokeWidth={2} />

        <path d={areaPath("netEur")} fill="#10b981" fillOpacity={0.18} />
        <path d={linePath("netEur")} fill="none" stroke="#10b981" strokeWidth={2} />

        {xTickIndexes.map((i) => (
          <text
            key={i}
            x={xScale(i)}
            y={HEIGHT - MARGIN.bottom + 14}
            textAnchor="middle"
            fontSize={9}
            fill="#6b7280"
          >
            {fmtDateShort(daily[i].date)}
          </text>
        ))}
      </svg>

      <div className="flex items-center gap-4 mt-2 text-xs text-text-muted-light">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-2 bg-[#d4a574] rounded opacity-50" />
          Brut (avant frais Stripe)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-2 bg-[#10b981] rounded opacity-50" />
          Net (après frais)
        </span>
      </div>
    </div>
  );
}
