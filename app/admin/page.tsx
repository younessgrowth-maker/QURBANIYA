import { createServiceRoleClient } from "@/lib/supabase/server";
import { ShoppingBag, CheckCircle2, Euro, TrendingUp, Package, Clock, CreditCard, Heart, Printer } from "lucide-react";
import { KpiCard } from "@/components/admin/KpiCard";
import OrdersTable from "@/components/admin/OrdersTable";
import AnalyticsSection from "@/components/admin/AnalyticsSection";
import { fetchAnalyticsSummary, EMPTY_ANALYTICS } from "@/lib/analytics-queries";
import { STATS, CURRENT_YEAR, PRICE_AMOUNT } from "@/lib/constants";
import type { Order, Inventory } from "@/types";

export const dynamic = "force-dynamic";

type OrderRow = Order;

async function fetchData(): Promise<{ orders: OrderRow[]; inventory: Inventory | null }> {
  const supabase = createServiceRoleClient();
  const [ordersRes, inventoryRes] = await Promise.all([
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
    supabase.from("inventory").select("*").eq("year", CURRENT_YEAR).maybeSingle(),
  ]);
  return {
    orders: (ordersRes.data as OrderRow[]) ?? [],
    inventory: (inventoryRes.data as Inventory) ?? null,
  };
}

export default async function AdminDashboardPage() {
  const [{ orders, inventory }, analytics] = await Promise.all([
    fetchData(),
    fetchAnalyticsSummary().catch(() => EMPTY_ANALYTICS),
  ]);

  const paid = orders.filter((o) => o.payment_status === "paid");
  const pending = orders.filter((o) => o.payment_status === "pending");
  const failed = orders.filter((o) => o.payment_status === "failed");

  // `orders.amount` est stocké en euros (cf. PRICE_AMOUNT dans lib/constants.ts).
  // Pas de division par 100 ici — la conversion cents↔euros se fait côté Stripe.
  const revenueEuros = paid.reduce((sum, o) => sum + o.amount, 0);
  const aov = paid.length > 0 ? revenueEuros / paid.length : 0;
  const conversion = orders.length > 0 ? (paid.length / orders.length) * 100 : 0;

  const byMethod = {
    stripe: orders.filter((o) => o.payment_method === "stripe").length,
    paypal: orders.filter((o) => o.payment_method === "paypal").length,
    virement: orders.filter((o) => o.payment_method === "virement").length,
  };
  const byIntention = {
    pour_moi: orders.filter((o) => o.intention === "pour_moi").length,
    famille: orders.filter((o) => o.intention === "famille").length,
    sadaqa: orders.filter((o) => o.intention === "sadaqa").length,
  };

  const remaining = inventory
    ? inventory.total_slots - inventory.reserved_slots
    : STATS.sacrificesCompleted > 0
    ? null
    : null;
  const totalSlots = inventory?.total_slots ?? 200;
  const reservedSlots = inventory?.reserved_slots ?? 0;
  const remainingDisplay = remaining ?? totalSlots - reservedSlots;

  const fmtEuros = (n: number) =>
    n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black uppercase text-text-primary">
          Tableau de bord <span className="text-gold">Qurbaniya</span>
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Vue d&apos;ensemble des ventes · Aïd al-Adha {CURRENT_YEAR}
        </p>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <KpiCard
          label="Commandes payées"
          value={paid.length}
          hint={`${orders.length} commandes totales`}
          icon={CheckCircle2}
          tone="emerald"
        />
        <KpiCard
          label="Chiffre d'affaires"
          value={fmtEuros(revenueEuros)}
          hint={`Panier moyen : ${fmtEuros(aov)}`}
          icon={Euro}
          tone="gold"
        />
        <KpiCard
          label="Stock restant"
          value={`${remainingDisplay} / ${totalSlots}`}
          hint={`${reservedSlots} réservés`}
          icon={Package}
          tone={remainingDisplay < 20 ? "urgency" : "neutral"}
        />
        <KpiCard
          label="Taux de conversion"
          value={`${conversion.toFixed(1)}%`}
          hint={`${pending.length} en attente · ${failed.length} échecs`}
          icon={TrendingUp}
          tone="neutral"
        />
      </div>

      {/* KPIs secondaires : répartitions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <KpiCard
          label="CB (Stripe)"
          value={byMethod.stripe}
          hint={`${orders.length > 0 ? ((byMethod.stripe / orders.length) * 100).toFixed(0) : 0}% des commandes`}
          icon={CreditCard}
          tone="neutral"
        />
        <KpiCard
          label="Virement"
          value={byMethod.virement}
          hint={`${orders.length > 0 ? ((byMethod.virement / orders.length) * 100).toFixed(0) : 0}% des commandes`}
          icon={CreditCard}
          tone="neutral"
        />
        <KpiCard
          label="En attente"
          value={pending.length}
          hint={`${fmtEuros((pending.length * PRICE_AMOUNT))} potentiel`}
          icon={Clock}
          tone={pending.length > 0 ? "urgency" : "neutral"}
        />
        <KpiCard
          label="Pour la famille"
          value={byIntention.famille + byIntention.sadaqa}
          hint={`${byIntention.pour_moi} pour soi · ${byIntention.sadaqa} sadaqa`}
          icon={Heart}
          tone="neutral"
        />
      </div>

      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <ShoppingBag size={18} className="text-gold" />
          Toutes les commandes
        </h2>
        <a
          href="/api/admin/labels"
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-3 py-2 hover:bg-primary/90 transition-colors"
        >
          <Printer size={16} />
          Télécharger les étiquettes PDF ({paid.length})
        </a>
      </div>

      <OrdersTable orders={orders} />

      <AnalyticsSection data={analytics} />
    </div>
  );
}
