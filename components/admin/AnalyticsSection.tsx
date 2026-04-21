import { Eye, Users, Globe, Zap } from "lucide-react";
import { KpiCard } from "@/components/admin/KpiCard";
import type { AnalyticsSummary } from "@/lib/analytics-queries";

const EVENT_LABELS: Record<string, string> = {
  page_view: "Pages vues",
  cta_click: "Clics CTA",
  whatsapp_click: "Clics WhatsApp",
  order_started: "Form. démarré",
  order_submitted: "Form. soumis",
  payment_started: "Paiement initié",
  exit_popup_shown: "Exit popup affiché",
  exit_popup_conversion: "Exit popup converti",
  lead_captured: "Leads capturés",
  video_play: "Vidéo jouée",
  faq_open: "FAQ ouverte",
};

function Sparkline({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d) => {
        const h = Math.max(2, (d.count / max) * 100);
        return (
          <div key={d.date} className="flex-1 group relative">
            <div
              className="bg-gold/70 hover:bg-gold rounded-sm transition-colors"
              style={{ height: `${h}%` }}
              title={`${d.date} : ${d.count} vues`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsSection({ data }: { data: AnalyticsSummary }) {
  const eventEntries = Object.entries(data.eventCounts7d)
    .filter(([k]) => k !== "page_view")
    .sort((a, b) => b[1] - a[1]);

  return (
    <section className="mt-10">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Zap size={18} className="text-gold" />
          Trafic & engagement
        </h2>
        <span className="text-text-muted-light text-xs">30 derniers jours</span>
      </div>

      {/* KPIs trafic */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <KpiCard
          label="Vues aujourd'hui"
          value={data.pageviewsToday}
          hint={`${data.pageviews7d} cette semaine`}
          icon={Eye}
          tone="gold"
        />
        <KpiCard
          label="Vues (7 jours)"
          value={data.pageviews7d}
          hint={`${data.pageviews30d} sur 30 jours`}
          icon={Eye}
          tone="neutral"
        />
        <KpiCard
          label="Visiteurs uniques"
          value={data.uniqueSessions7d}
          hint="Sessions distinctes · 7j"
          icon={Users}
          tone="emerald"
        />
        <KpiCard
          label="Sources"
          value={data.topReferrers.length}
          hint="Domaines référents distincts"
          icon={Globe}
          tone="neutral"
        />
      </div>

      {/* Sparkline + top pages/referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 lg:col-span-1">
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-sm font-bold text-text-primary">Évolution · 14 jours</h3>
            <span className="text-text-muted-light text-xs">Page views</span>
          </div>
          <Sparkline data={data.dailyPageviews14d} />
          <div className="flex justify-between mt-2 text-[10px] text-text-muted-light">
            <span>{data.dailyPageviews14d[0]?.date.slice(5)}</span>
            <span>{data.dailyPageviews14d[data.dailyPageviews14d.length - 1]?.date.slice(5)}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3">Pages les plus vues (7j)</h3>
          {data.topPages.length === 0 ? (
            <p className="text-text-muted-light text-xs">Aucune donnée pour le moment.</p>
          ) : (
            <ul className="space-y-2">
              {data.topPages.slice(0, 6).map((p) => (
                <li key={p.path} className="flex items-center justify-between gap-2 text-sm">
                  <code className="text-text-primary text-xs truncate">{p.path}</code>
                  <span className="text-gold font-bold tabular-nums">{p.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3">Sources de trafic (7j)</h3>
          {data.topReferrers.length === 0 ? (
            <p className="text-text-muted-light text-xs">
              Aucune donnée — la plupart des visites sont en accès direct.
            </p>
          ) : (
            <ul className="space-y-2">
              {data.topReferrers.map((r) => (
                <li key={r.referrer} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-text-primary text-xs truncate">{r.referrer}</span>
                  <span className="text-gold font-bold tabular-nums">{r.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Événements personnalisés */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-sm font-bold text-text-primary">Événements clés (7j)</h3>
          <span className="text-text-muted-light text-xs">Hors pages vues</span>
        </div>
        {eventEntries.length === 0 ? (
          <p className="text-text-muted-light text-xs">
            Aucun événement personnalisé encore enregistré — Les données apparaîtront au fil des
            interactions des visiteurs (CTAs, WhatsApp, exit popup, soumissions formulaire, etc.).
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {eventEntries.map(([name, count]) => (
              <div key={name} className="bg-bg-tertiary rounded-lg p-3">
                <div className="text-text-muted text-[10px] uppercase tracking-wider font-semibold">
                  {EVENT_LABELS[name] || name}
                </div>
                <div className="text-xl font-black text-text-primary mt-1">{count}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
