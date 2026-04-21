import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "gold" | "emerald" | "urgency";

const TONE_STYLES: Record<Tone, { icon: string; bg: string }> = {
  neutral: { icon: "text-text-muted", bg: "bg-bg-tertiary" },
  gold: { icon: "text-gold", bg: "bg-gold/10" },
  emerald: { icon: "text-emerald", bg: "bg-emerald/10" },
  urgency: { icon: "text-urgency", bg: "bg-urgency/10" },
};

export function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: Tone;
}) {
  const styles = TONE_STYLES[tone];
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-text-muted text-xs uppercase tracking-wider font-semibold">{label}</span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", styles.bg)}>
          <Icon size={16} className={styles.icon} />
        </div>
      </div>
      <div className="text-2xl font-black text-text-primary leading-none">{value}</div>
      {hint && <p className="text-text-muted-light text-xs mt-2">{hint}</p>}
    </div>
  );
}
