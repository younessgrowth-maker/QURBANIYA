"use client";

// CA cumulé jusqu'au jour de l'Aïd, comparaison année en cours vs an dernier.
// Axe X par jours avant l'Aïd (négatif). SVG natif.

import { useMemo } from "react";

type Bucket = { daysBeforeAid: number; grossEur: number };

export type CumulativeChartProps = {
  current: Bucket[];
  previous?: Bucket[];
  currentYearLabel: string;
  previousYearLabel?: string;
};

const MARGIN = { top: 16, right: 24, bottom: 36, left: 56 };
const WIDTH = 900;
const HEIGHT = 260;

function fmtEur(n: number): string {
  if (n >= 10000) return `${Math.round(n / 1000)}k€`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k€`;
  return `${Math.round(n)}€`;
}

function cumulate(data: Bucket[]): { daysBeforeAid: number; cum: number }[] {
  const sorted = data.slice().sort((a, b) => a.daysBeforeAid - b.daysBeforeAid);
  let cum = 0;
  return sorted.map((b) => {
    cum += b.grossEur;
    return { daysBeforeAid: b.daysBeforeAid, cum };
  });
}

export default function CumulativeChart({
  current,
  previous,
  currentYearLabel,
  previousYearLabel,
}: CumulativeChartProps) {
  const cumCurrent = useMemo(() => cumulate(current), [current]);
  const cumPrevious = useMemo(
    () => (previous ? cumulate(previous) : []),
    [previous]
  );

  const xDomain = useMemo(() => {
    const all: number[] = [];
    for (const p of cumCurrent) all.push(p.daysBeforeAid);
    for (const p of cumPrevious) all.push(p.daysBeforeAid);
    if (all.length === 0) return { min: -90, max: 0 };
    return { min: Math.min(...all), max: Math.max(...all) };
  }, [cumCurrent, cumPrevious]);

  const yMax = useMemo(() => {
    const m = Math.max(
      1,
      ...cumCurrent.map((p) => p.cum),
      ...cumPrevious.map((p) => p.cum)
    );
    return Math.max(1, Math.ceil((m * 1.1) / 100) * 100);
  }, [cumCurrent, cumPrevious]);

  const xScale = (dba: number) => {
    const range = xDomain.max - xDomain.min || 1;
    return (
      MARGIN.left +
      ((dba - xDomain.min) / range) * (WIDTH - MARGIN.left - MARGIN.right)
    );
  };
  const yScale = (v: number) =>
    HEIGHT - MARGIN.bottom - (v / yMax) * (HEIGHT - MARGIN.top - MARGIN.bottom);

  const path = (data: { daysBeforeAid: number; cum: number }[]) =>
    data
      .map((p, i) => {
        const x = xScale(p.daysBeforeAid);
        const y = yScale(p.cum);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

  const yTicks = Array.from({ length: 4 }, (_, i) => (yMax / 3) * i);
  const xTicks: number[] = [];
  for (let v = Math.ceil(xDomain.min / 7) * 7; v <= xDomain.max; v += 7) {
    xTicks.push(v);
  }

  const fmtDba = (dba: number) => {
    if (dba === 0) return "Aïd";
    if (dba < 0) return `J${dba}`;
    return `J+${dba}`;
  };

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

        {xDomain.min <= 0 && xDomain.max >= 0 && (
          <line
            x1={xScale(0)}
            x2={xScale(0)}
            y1={MARGIN.top}
            y2={HEIGHT - MARGIN.bottom}
            stroke="#dc2626"
            strokeWidth={1.5}
          />
        )}

        {cumPrevious.length > 0 && (
          <path
            d={path(cumPrevious)}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={2}
            opacity={0.75}
          />
        )}
        <path
          d={path(cumCurrent)}
          fill="none"
          stroke="#d4a574"
          strokeWidth={2.5}
        />

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
      </svg>

      <div className="flex items-center gap-4 mt-2 text-xs text-text-muted-light flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-[#d4a574]" /> {currentYearLabel}
        </span>
        {cumPrevious.length > 0 && previousYearLabel && (
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#94a3b8]" /> {previousYearLabel}
          </span>
        )}
      </div>
    </div>
  );
}
