import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "gold" | "emerald" | "urgency";

const TONE_STYLES: Record<Tone, { icon: string; bg: string }> = {
  neutral: { icon: "text-text-muted", bg: "bg-bg-tertiary" },
  gold: { icon: "text-gold", bg: "bg-gold/10" },
  emerald: { icon: "text-emerald", bg: "bg-emerald/10" },
  urgency: { icon: "text-urgency", bg: "bg-urgency/10" },
};

export default function YoYKpiCard({
  label,
  value,
  previousValue,
  deltaPct,
  hint,
  icon: Icon,
  tone = "neutral",
  invertColor = false,
}: {
  label: string;
  value: string | number;
  previousValue?: string | number;
  deltaPct?: number | null;
  hint?: string;
  icon: LucideIcon;
  tone?: Tone;
  invertColor?: boolean; // true si une augmentation est mauvaise (refunds, etc)
}) {
  const styles = TONE_STYLES[tone];
  const hasDelta = deltaPct !== undefined && deltaPct !== null;
  const positiveIsGood = !invertColor;
  const isPositive = hasDelta && (deltaPct as number) > 0;
  const isNegative = hasDelta && (deltaPct as number) < 0;
  const good = (positiveIsGood && isPositive) || (!positiveIsGood && isNegative);
  const bad = (positiveIsGood && isNegative) || (!positiveIsGood && isPositive);

  const deltaColor = good
    ? "text-emerald"
    : bad
    ? "text-urgency"
    : "text-text-muted-light";

  const ArrowIcon = isPositive ? ArrowUpRight : isNegative ? ArrowDownRight : Minus;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-text-muted text-xs uppercase tracking-wider font-semibold">
          {label}
        </span>
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            styles.bg
          )}
        >
          <Icon size={16} className={styles.icon} />
        </div>
      </div>
      <div className="text-2xl font-black text-text-primary leading-none">
        {value}
      </div>
      {hasDelta && (
        <div className="flex items-center gap-1 mt-2">
          <ArrowIcon size={12} className={deltaColor} />
          <span className={cn("text-xs font-bold", deltaColor)}>
            {(deltaPct as number) >= 0 ? "+" : ""}
            {(deltaPct as number).toFixed(1)}%
          </span>
          {previousValue !== undefined && (
            <span className="text-text-muted-light text-xs">
              vs {previousValue}
            </span>
          )}
        </div>
      )}
      {!hasDelta && hint && (
        <p className="text-text-muted-light text-xs mt-2">{hint}</p>
      )}
    </div>
  );
}
