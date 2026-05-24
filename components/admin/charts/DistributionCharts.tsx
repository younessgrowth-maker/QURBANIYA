"use client";

// Deux mini-charts : par jour de la semaine et par heure de la journée.
// Heatmap-style colorée, SVG natif.

const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function WeekdayChart({
  data,
}: {
  data: { weekday: number; count: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {data.map((d) => {
        const intensity = d.count / max;
        const opacity = 0.15 + intensity * 0.85;
        return (
          <div key={d.weekday} className="text-center">
            <div
              className="rounded-md bg-gold mb-1 mx-auto"
              style={{
                height: `${20 + intensity * 50}px`,
                opacity,
              }}
              title={`${WEEKDAY_LABELS[d.weekday]} : ${d.count} ventes`}
            />
            <div className="text-[10px] text-text-muted-light font-semibold">
              {WEEKDAY_LABELS[d.weekday]}
            </div>
            <div className="text-xs text-text-primary font-bold tabular-nums">
              {d.count}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function HourlyChart({
  data,
}: {
  data: { hour: number; count: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex items-end gap-[2px] h-20">
      {data.map((d) => {
        const h = Math.max(2, (d.count / max) * 100);
        const isPeak = d.count >= max * 0.7 && d.count > 0;
        return (
          <div key={d.hour} className="flex-1 group relative flex flex-col justify-end">
            <div
              className={`rounded-sm transition-colors ${isPeak ? "bg-gold" : "bg-gold/40"}`}
              style={{ height: `${h}%` }}
              title={`${String(d.hour).padStart(2, "0")}h : ${d.count} ventes`}
            />
          </div>
        );
      })}
      {/* Axis labels en dessous, séparés */}
    </div>
  );
}

export function HourlyAxis() {
  return (
    <div className="flex gap-[2px] mt-1">
      {Array.from({ length: 24 }, (_, h) => (
        <div
          key={h}
          className="flex-1 text-center text-[9px] text-text-muted-light"
        >
          {h % 3 === 0 ? `${h}h` : ""}
        </div>
      ))}
    </div>
  );
}
