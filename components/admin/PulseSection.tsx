// Section "Pulse · Live" en tête du dashboard analytics.
// Vue temps réel orientée comparaison cyclique :
//   - Ventes aujourd'hui vs hier à la même heure (Paris)
//   - Vs même jour de la semaine dernière à la même heure
//   - Fenêtres glissantes 1h / 24h / 7j vs 7j précédents
//   - Run rate horaire, projection fin de journée
//   - Dernière vente, nouveau clients, conversion 24h
//
// Pensée pour être très lisible : un héros visuel à gauche
// (gros chiffre + delta), une sparkline 24h à droite (today vs hier),
// puis une grille de mini-KPI dense.

import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Clock,
  Euro,
  Flame,
  Heart,
  Sparkles,
  TrendingUp,
  User,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Intention, PulseStats } from "@/lib/pulse-stats";

const fmtEur = (n: number) =>
  n.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

const INTENTION_LABEL: Record<Intention, string> = {
  pour_moi: "Pour soi",
  famille: "Famille",
  sadaqa: "Sadaqa",
};

const INTENTION_ICON: Record<Intention, LucideIcon> = {
  pour_moi: User,
  famille: Users,
  sadaqa: Heart,
};

function DeltaPill({
  pct,
  invertColors = false,
  size = "sm",
}: {
  pct: number | null;
  invertColors?: boolean; // true pour métriques où moins = mieux
  size?: "sm" | "lg";
}) {
  if (pct === null) {
    return (
      <span className="inline-flex items-center gap-1 text-text-muted-light text-xs font-semibold">
        <ArrowRight size={size === "lg" ? 16 : 12} />
        n/a
      </span>
    );
  }
  const rounded = Math.round(pct);
  const positive = rounded >= 0;
  const good = invertColors ? !positive : positive;
  const Icon = rounded === 0 ? ArrowRight : positive ? ArrowUp : ArrowDown;
  const cls = good
    ? "bg-emerald/10 text-emerald"
    : "bg-urgency/10 text-urgency";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold tabular-nums ${cls} ${
        size === "lg" ? "text-sm px-2.5 py-1" : "text-[11px] px-2 py-0.5"
      }`}
    >
      <Icon size={size === "lg" ? 14 : 11} strokeWidth={3} />
      {positive ? "+" : ""}
      {rounded}%
    </span>
  );
}

// Sparkline duale (today vs yesterday), 24 buckets horaires.
function HourSparkline({
  today,
  yesterday,
  currentHour,
}: {
  today: number[];
  yesterday: number[];
  currentHour: number;
}) {
  const max = Math.max(1, ...today, ...yesterday);
  const w = 360;
  const h = 64;
  const barW = w / 24;
  return (
    <svg
      viewBox={`0 0 ${w} ${h + 14}`}
      preserveAspectRatio="none"
      className="w-full h-20"
      role="img"
      aria-label="Ventes par heure : aujourd'hui vs hier"
    >
      {/* hier (gris) en arrière-plan */}
      {yesterday.map((v, i) => {
        const bh = (v / max) * h;
        return (
          <rect
            key={`y-${i}`}
            x={i * barW + 1}
            y={h - bh}
            width={Math.max(0, barW - 2)}
            height={bh}
            rx={1.5}
            className="fill-gray-300"
          />
        );
      })}
      {/* aujourd'hui (gold) au premier plan, légèrement plus fin */}
      {today.map((v, i) => {
        const bh = (v / max) * h;
        const isFuture = i > currentHour;
        return (
          <rect
            key={`t-${i}`}
            x={i * barW + barW * 0.25}
            y={h - bh}
            width={Math.max(0, barW * 0.5)}
            height={bh}
            rx={1.5}
            className={isFuture ? "fill-gold/20" : "fill-gold"}
          />
        );
      })}
      {/* Repère heure actuelle */}
      <line
        x1={(currentHour + 0.5) * barW}
        x2={(currentHour + 0.5) * barW}
        y1={0}
        y2={h}
        className="stroke-text-primary/30"
        strokeWidth={1}
        strokeDasharray="2 2"
      />
      {/* Axe : 0h, 6h, 12h, 18h, 23h */}
      {[0, 6, 12, 18, 23].map((hh) => (
        <text
          key={hh}
          x={(hh + 0.5) * barW}
          y={h + 11}
          fontSize={9}
          textAnchor="middle"
          className="fill-text-muted-light"
        >
          {hh}h
        </text>
      ))}
    </svg>
  );
}

function MiniStat({
  label,
  value,
  hint,
  icon: Icon,
  tone = "neutral",
  delta,
  deltaInvert,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: "neutral" | "gold" | "emerald" | "urgency";
  delta?: number | null;
  deltaInvert?: boolean;
}) {
  const toneClasses = {
    neutral: { iconBg: "bg-bg-tertiary", icon: "text-text-muted" },
    gold: { iconBg: "bg-gold/15", icon: "text-gold" },
    emerald: { iconBg: "bg-emerald/15", icon: "text-emerald" },
    urgency: { iconBg: "bg-urgency/15", icon: "text-urgency" },
  }[tone];
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5">
      <div className="flex items-start justify-between mb-2">
        <div
          className={`w-7 h-7 rounded-md flex items-center justify-center ${toneClasses.iconBg}`}
        >
          <Icon size={14} className={toneClasses.icon} />
        </div>
        {delta !== undefined && (
          <DeltaPill pct={delta ?? null} invertColors={deltaInvert} />
        )}
      </div>
      <div className="text-text-muted text-[10px] uppercase tracking-wider font-semibold leading-tight">
        {label}
      </div>
      <div className="text-xl font-black text-text-primary leading-tight mt-0.5 tabular-nums">
        {value}
      </div>
      {hint && (
        <div className="text-text-muted-light text-[11px] mt-1 leading-tight">
          {hint}
        </div>
      )}
    </div>
  );
}

function formatLastSale(minutesAgo: number): string {
  if (minutesAgo < 1) return "à l'instant";
  if (minutesAgo < 60) return `il y a ${minutesAgo} min`;
  const hours = Math.floor(minutesAgo / 60);
  const mins = minutesAgo % 60;
  if (hours < 24)
    return mins === 0 ? `il y a ${hours} h` : `il y a ${hours}h${String(mins).padStart(2, "0")}`;
  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}

export default function PulseSection({ pulse }: { pulse: PulseStats }) {
  const {
    parisNow,
    today,
    yesterdaySameTime,
    sameWeekdayLastWeek,
    deltaVsYesterdayPct,
    deltaVsSameWeekdayPct,
    lastHour,
    last24h,
    last7d,
    previous7d,
    deltaVs7dPct,
    lastSale,
    runRatePerHour,
    estEndOfDayP50,
    hoursRemainingToday,
    conversion24h,
    newCustomersToday,
  } = pulse;

  const currentHour = parseInt(parisNow.time.split(":")[0] ?? "0", 10);

  // % de complétion d'hier (visuel rapide : "déjà à X% de la journée d'hier")
  const yesterdayCompletionPct =
    yesterdaySameTime.fullDaySales > 0
      ? Math.round(
          (today.sales / Math.max(1, yesterdaySameTime.fullDaySales)) * 100
        )
      : null;

  return (
    <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-emerald/5 border-2 border-gold/30 rounded-2xl p-5 md:p-6 shadow-soft">
      {/* En-tête Pulse Live */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3" aria-hidden>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald" />
          </span>
          <div>
            <h2 className="text-base md:text-lg font-black text-text-primary uppercase tracking-wide leading-tight flex items-center gap-2">
              Pulse <span className="text-gold">Live</span>
            </h2>
            <p className="text-text-muted-light text-xs leading-tight">
              {parisNow.date} · {parisNow.time} (Paris) · rafraîchi toutes les
              60 s
            </p>
          </div>
        </div>
        {lastSale && (
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur rounded-lg px-3 py-2 border border-gray-200">
            <Flame size={14} className="text-gold" />
            <div className="text-xs leading-tight">
              <div className="text-text-muted-light">Dernière vente</div>
              <div className="font-bold text-text-primary">
                {formatLastSale(lastSale.minutesAgo)} ·{" "}
                <span className="text-text-muted">
                  {lastSale.prenom || "—"} ·{" "}
                  {INTENTION_LABEL[lastSale.intention]}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Héros : ventes aujourd'hui vs hier même heure + sparkline */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-5">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gold/30 shadow-soft">
          <div className="text-text-muted text-xs uppercase tracking-wider font-semibold mb-1">
            Ventes aujourd&apos;hui
          </div>
          <div className="flex items-end gap-3 mb-3">
            <span className="text-6xl font-black text-text-primary leading-none tabular-nums">
              {today.sales}
            </span>
            <div className="flex flex-col gap-1 mb-1">
              <DeltaPill pct={deltaVsYesterdayPct} size="lg" />
              <span className="text-text-muted-light text-[11px] leading-tight">
                vs <span className="font-bold">{yesterdaySameTime.sales}</span>{" "}
                hier à {parisNow.time}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-bg-tertiary rounded-lg px-3 py-2">
              <div className="text-text-muted-light leading-tight">
                CA aujourd&apos;hui
              </div>
              <div className="font-black text-gold tabular-nums">
                {fmtEur(today.revenueEur)}
              </div>
            </div>
            <div className="bg-bg-tertiary rounded-lg px-3 py-2">
              <div className="text-text-muted-light leading-tight">
                Moutons réservés
              </div>
              <div className="font-black text-text-primary tabular-nums">
                {today.quantityTotal}
              </div>
            </div>
          </div>
          {yesterdayCompletionPct !== null && (
            <p className="text-text-muted-light text-[11px] mt-3 leading-relaxed">
              {yesterdayCompletionPct >= 100
                ? `Déjà ${yesterdayCompletionPct}% du total d'hier (${yesterdaySameTime.fullDaySales} ventes sur la journée complète).`
                : `${yesterdayCompletionPct}% du total d'hier (${yesterdaySameTime.fullDaySales} ventes sur la journée complète).`}
            </p>
          )}
        </div>

        <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-text-primary text-sm font-bold flex items-center gap-2">
              <Activity size={14} className="text-gold" />
              Aujourd&apos;hui vs hier · par heure
            </div>
            <div className="flex items-center gap-3 text-[11px] text-text-muted-light">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-sm bg-gold" />
                Aujourd&apos;hui
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-sm bg-gray-300" />
                Hier
              </span>
            </div>
          </div>
          <HourSparkline
            today={today.hourly}
            yesterday={yesterdaySameTime.hourly}
            currentHour={currentHour}
          />
          <div className="grid grid-cols-3 gap-2 text-xs mt-2">
            <div className="text-center">
              <div className="text-text-muted-light leading-tight">
                Rythme actuel
              </div>
              <div className="font-black text-text-primary tabular-nums">
                {runRatePerHour.toFixed(1)}/h
              </div>
            </div>
            <div className="text-center">
              <div className="text-text-muted-light leading-tight">
                Estim. fin de journée
              </div>
              <div className="font-black text-gold tabular-nums">
                {Math.round(estEndOfDayP50)}
                <span className="text-text-muted-light font-normal text-[10px] ml-1">
                  · {hoursRemainingToday.toFixed(1)} h restantes
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-text-muted-light leading-tight">
                Pic horaire
              </div>
              <div className="font-black text-text-primary tabular-nums">
                {today.topHour
                  ? `${String(today.topHour.hour).padStart(2, "0")}h`
                  : "—"}
                {today.topHour && (
                  <span className="text-text-muted-light font-normal text-[10px] ml-1">
                    · {today.topHour.count} vente
                    {today.topHour.count > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grille mini-KPI dense */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <MiniStat
          label="Dernière heure"
          value={lastHour.sales}
          hint={lastHour.sales > 0 ? fmtEur(lastHour.revenueEur) : "aucune"}
          icon={Zap}
          tone={lastHour.sales > 0 ? "gold" : "neutral"}
        />
        <MiniStat
          label="24h glissantes"
          value={last24h.sales}
          hint={fmtEur(last24h.revenueEur)}
          icon={Clock}
          tone="neutral"
        />
        <MiniStat
          label="7j glissants"
          value={last7d.sales}
          hint={`vs ${previous7d.sales} les 7j précédents · ${fmtEur(last7d.revenueEur)}`}
          icon={TrendingUp}
          tone="emerald"
          delta={deltaVs7dPct}
        />
        <MiniStat
          label="J-7 même heure"
          value={sameWeekdayLastWeek.sales}
          hint={fmtEur(sameWeekdayLastWeek.revenueEur)}
          icon={Activity}
          tone="neutral"
          delta={deltaVsSameWeekdayPct}
        />
        <MiniStat
          label="Hier même heure"
          value={yesterdaySameTime.sales}
          hint={fmtEur(yesterdaySameTime.revenueEur)}
          icon={Sparkles}
          tone="neutral"
          delta={deltaVsYesterdayPct}
        />
        <MiniStat
          label="Panier moyen 24h"
          value={
            last24h.sales > 0
              ? fmtEur(last24h.revenueEur / last24h.sales)
              : "—"
          }
          hint={`${last24h.sales} vente${last24h.sales > 1 ? "s" : ""} payée${last24h.sales > 1 ? "s" : ""}`}
          icon={Euro}
          tone="gold"
        />

        {today.topIntention &&
          (() => {
            const Icon = INTENTION_ICON[today.topIntention.intention];
            return (
              <MiniStat
                label="Top intention"
                value={INTENTION_LABEL[today.topIntention.intention]}
                hint={`${today.topIntention.count} sur ${today.sales} ventes`}
                icon={Icon}
                tone="gold"
              />
            );
          })()}
        <MiniStat
          label="Nouveaux clients"
          value={newCustomersToday}
          hint={
            today.sales > 0
              ? `${Math.round(
                  (newCustomersToday / today.sales) * 100
                )}% des ventes du jour`
              : "aujourd'hui"
          }
          icon={UserPlus}
          tone={newCustomersToday > 0 ? "emerald" : "neutral"}
        />
        <MiniStat
          label="Pour soi · auj."
          value={today.intentions.pour_moi}
          icon={User}
          tone="neutral"
        />
        <MiniStat
          label="Famille · auj."
          value={today.intentions.famille}
          icon={Users}
          tone="neutral"
        />
        <MiniStat
          label="Sadaqa · auj."
          value={today.intentions.sadaqa}
          icon={Heart}
          tone="neutral"
        />
        <MiniStat
          label="Sessions 24h"
          value={
            conversion24h.paidSales +
            conversion24h.pendingSales +
            conversion24h.failedSales
          }
          hint={`${conversion24h.paidSales} payées · ${conversion24h.pendingSales} pending · ${conversion24h.failedSales} failed`}
          icon={Flame}
          tone={
            conversion24h.failedSales > conversion24h.paidSales / 2
              ? "urgency"
              : "neutral"
          }
        />
      </div>
    </div>
  );
}
