"use client";

import { useMemo, useState } from "react";
import { Search, Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Order } from "@/types";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-400/10 text-yellow-700 border-yellow-400/30",
  paid: "bg-emerald/10 text-emerald border-emerald/30",
  failed: "bg-urgency/10 text-urgency border-urgency/30",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "En attente",
  paid: "Payée",
  failed: "Échec",
};

const METHOD_LABEL: Record<string, string> = {
  stripe: "CB",
  paypal: "PayPal",
  virement: "Virement",
};

const INTENTION_LABEL: Record<string, string> = {
  pour_moi: "Pour moi",
  famille: "Famille",
  sadaqa: "Sadaqa",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toCsv(orders: Order[]): string {
  const headers = [
    "Date",
    "Prenom",
    "Nom",
    "Email",
    "Telephone",
    "Intention",
    "Niyyah",
    "Statut",
    "Methode",
    "Montant (EUR)",
    "Stripe Session",
    "Video envoyee",
    "ID",
  ];
  const rows = orders.map((o) => [
    o.created_at,
    o.prenom,
    o.nom,
    o.email,
    o.telephone,
    INTENTION_LABEL[o.intention] || o.intention,
    o.niyyah,
    STATUS_LABEL[o.payment_status] || o.payment_status,
    METHOD_LABEL[o.payment_method] || o.payment_method,
    o.amount.toFixed(2),
    o.stripe_session_id || "",
    o.video_sent ? "Oui" : "Non",
    o.id,
  ]);
  const escape = (v: string) => {
    const s = String(v ?? "");
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  return [headers, ...rows].map((r) => r.map(escape).join(",")).join("\n");
}

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [method, setMethod] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      if (status !== "all" && o.payment_status !== status) return false;
      if (method !== "all" && o.payment_method !== method) return false;
      if (q) {
        const hay = `${o.prenom} ${o.nom} ${o.email} ${o.telephone}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [orders, search, status, method]);

  function handleExport() {
    const csv = toCsv(filtered);
    const date = new Date().toISOString().slice(0, 10);
    downloadCsv(csv, `qurbaniya-commandes-${date}.csv`);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom, email, téléphone..."
            className="w-full h-9 pl-8 pr-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-text-muted-light" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-9 px-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold bg-white"
          >
            <option value="all">Tous statuts</option>
            <option value="pending">En attente</option>
            <option value="paid">Payées</option>
            <option value="failed">Échecs</option>
          </select>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="h-9 px-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold bg-white"
          >
            <option value="all">Toutes méthodes</option>
            <option value="stripe">CB (Stripe)</option>
            <option value="paypal">PayPal</option>
            <option value="virement">Virement</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          disabled={filtered.length === 0}
          className="h-9 px-3 text-sm font-semibold bg-text-primary text-white rounded-lg hover:bg-text-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <Download size={14} />
          Export CSV ({filtered.length})
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-bg-tertiary">
            <tr className="text-text-muted text-xs uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-semibold">Date</th>
              <th className="text-left px-4 py-3 font-semibold">Client</th>
              <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Contact</th>
              <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Intention</th>
              <th className="text-left px-4 py-3 font-semibold">Statut</th>
              <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Méthode</th>
              <th className="text-right px-4 py-3 font-semibold">Montant</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-text-muted-light">
                  {orders.length === 0
                    ? "Aucune commande pour le moment."
                    : "Aucune commande ne correspond aux filtres."}
                </td>
              </tr>
            ) : (
              filtered.map((o) => (
                <tr key={o.id} className="border-t border-gray-100 hover:bg-bg-tertiary/40">
                  <td className="px-4 py-3 text-text-muted whitespace-nowrap">{formatDate(o.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-text-primary">
                      {o.prenom} {o.nom}
                    </div>
                    <div className="text-text-muted-light text-xs md:hidden">{o.email}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="text-text-primary text-xs">{o.email}</div>
                    <div className="text-text-muted-light text-xs">{o.telephone || "—"}</div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-text-muted">
                    {INTENTION_LABEL[o.intention] || o.intention}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border",
                        STATUS_STYLES[o.payment_status] || STATUS_STYLES.pending
                      )}
                    >
                      {STATUS_LABEL[o.payment_status] || o.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-text-muted">
                    {METHOD_LABEL[o.payment_method] || o.payment_method}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-text-primary whitespace-nowrap">
                    {o.amount.toFixed(2)} €
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
