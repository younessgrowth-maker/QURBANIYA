"use client";

import { useState } from "react";
import { Users, Loader2, Check, AlertTriangle } from "lucide-react";

export type AffiliateSummary = {
  id: string;
  code: string;
  name: string;
  approved: boolean;
  pendingCount: number;
  pendingTotal: number;
  paidCount: number;
  paidTotal: number;
};

type RowState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; count: number; totalEur: number }
  | { kind: "error"; message: string };

export default function AffiliatesPanel({
  affiliates,
}: {
  affiliates: AffiliateSummary[];
}) {
  const [states, setStates] = useState<Record<string, RowState>>({});

  const totalDue = affiliates.reduce((s, a) => s + a.pendingTotal, 0);

  async function markPaid(a: AffiliateSummary) {
    if (states[a.id]?.kind === "loading") return;
    const confirmed = window.confirm(
      `Confirmer que le virement de ${a.pendingTotal}€ à "${a.name}" (${a.pendingCount} vente(s)) a bien été effectué ?\n\nCeci marque les commissions comme payées. Ça NE déclenche AUCUN virement — à faire à la main au préalable.`
    );
    if (!confirmed) return;
    setStates((s) => ({ ...s, [a.id]: { kind: "loading" } }));
    try {
      const res = await fetch("/api/admin/affiliate-payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliate_id: a.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStates((s) => ({
          ...s,
          [a.id]: { kind: "error", message: data.error ?? "Erreur" },
        }));
        return;
      }
      setStates((s) => ({
        ...s,
        [a.id]: { kind: "done", count: data.count, totalEur: data.totalEur },
      }));
    } catch (err) {
      setStates((s) => ({
        ...s,
        [a.id]: {
          kind: "error",
          message: err instanceof Error ? err.message : "Erreur réseau",
        },
      }));
    }
  }

  return (
    <div className="bg-bg-secondary border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <Users size={14} className="text-gold" /> Affiliés — commissions
        </h3>
        <span className="text-xs text-text-muted">
          Total dû :{" "}
          <span className="font-bold text-text-primary">{totalDue}€</span>
        </span>
      </div>

      <p className="text-xs text-text-muted mb-3">
        Versements <strong>manuels</strong> par virement. Le bouton « Marquer
        payé » ne fait que solder la dette comptable après ton virement — il ne
        transfère jamais d&apos;argent.
      </p>

      {affiliates.length === 0 ? (
        <p className="text-xs text-text-muted italic">
          Aucun affilié enregistré. Ajoute des partenaires approuvés en base
          (table <span className="font-mono">affiliates</span>,{" "}
          <span className="font-mono">approved = true</span>).
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-text-muted-light border-b border-gray-200">
                <th className="text-left font-semibold py-2">Affilié</th>
                <th className="text-left font-semibold py-2">Code</th>
                <th className="text-right font-semibold py-2">Ventes dues</th>
                <th className="text-right font-semibold py-2">Montant dû</th>
                <th className="text-right font-semibold py-2">Déjà payé</th>
                <th className="text-right font-semibold py-2"></th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((a) => {
                const st = states[a.id] ?? { kind: "idle" };
                return (
                  <tr
                    key={a.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-2 text-text-primary font-medium">
                      {a.name}
                      {!a.approved && (
                        <span className="ml-1.5 text-[10px] uppercase text-urgency font-bold">
                          non approuvé
                        </span>
                      )}
                    </td>
                    <td className="py-2 font-mono text-text-muted">{a.code}</td>
                    <td className="py-2 text-right text-text-primary">
                      {a.pendingCount}
                    </td>
                    <td className="py-2 text-right font-bold text-text-primary">
                      {a.pendingTotal}€
                    </td>
                    <td className="py-2 text-right text-text-muted">
                      {a.paidTotal}€{" "}
                      <span className="text-text-muted-light">
                        ({a.paidCount})
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      {st.kind === "done" ? (
                        <span className="inline-flex items-center gap-1 text-emerald font-semibold">
                          <Check size={12} strokeWidth={3} /> {st.totalEur}€
                          soldés
                        </span>
                      ) : st.kind === "error" ? (
                        <span className="inline-flex items-center gap-1 text-urgency">
                          <AlertTriangle size={12} /> {st.message}
                        </span>
                      ) : a.pendingCount > 0 ? (
                        <button
                          type="button"
                          onClick={() => markPaid(a)}
                          disabled={st.kind === "loading"}
                          className="text-[11px] font-bold uppercase bg-text-primary hover:bg-text-primary/90 text-white px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
                        >
                          {st.kind === "loading" ? (
                            <>
                              <Loader2 size={12} className="animate-spin" /> …
                            </>
                          ) : (
                            <>Marquer payé</>
                          )}
                        </button>
                      ) : (
                        <span className="text-text-muted-light">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
