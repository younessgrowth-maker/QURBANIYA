"use client";

import { useState } from "react";
import { Sparkles, Loader2, Check, AlertTriangle } from "lucide-react";

type Result =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "dry"; stale: number; sample: { id: string; email: string; prenom: string; created_at: string }[] }
  | { kind: "done"; cleaned: number; stale: number }
  | { kind: "error"; message: string };

export default function CleanupStalePendingButton({ pendingCount }: { pendingCount: number }) {
  const [state, setState] = useState<Result>({ kind: "idle" });

  async function call(dryRun: boolean) {
    if (state.kind === "loading") return;
    if (!dryRun) {
      const confirmed = window.confirm(
        "Marquer les commandes pending obsolètes (où l'email a déjà payé) comme 'failed' ? Action réversible manuellement en SQL si besoin."
      );
      if (!confirmed) return;
    }
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/admin/cleanup-stale-pending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dry_run: dryRun }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ kind: "error", message: data.error ?? "Erreur inconnue" });
        return;
      }
      if (dryRun) {
        setState({ kind: "dry", stale: data.stale, sample: data.sample ?? [] });
      } else {
        setState({ kind: "done", cleaned: data.cleaned, stale: data.stale });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur réseau";
      setState({ kind: "error", message: msg });
    }
  }

  return (
    <div className="bg-bg-secondary border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <Sparkles size={14} className="text-gold" /> Nettoyer les pending obsolètes
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Marque comme &quot;failed&quot; les commandes pending dont l&apos;email a déjà payé via une autre commande. Évite les faux spams du cron &quot;panier abandonné&quot; et assainit le taux de conversion. ({pendingCount} pending au total)
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => call(true)}
            disabled={state.kind === "loading"}
            className="text-xs font-semibold text-text-muted hover:text-gold px-3 py-2 rounded-lg border border-gray-200 hover:border-gold/40 transition-colors disabled:opacity-50"
          >
            Simuler
          </button>
          <button
            type="button"
            onClick={() => call(false)}
            disabled={state.kind === "loading"}
            className="text-xs font-bold uppercase bg-text-primary hover:bg-text-primary/90 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            {state.kind === "loading" ? (
              <>
                <Loader2 size={14} className="animate-spin" /> En cours…
              </>
            ) : (
              <>Nettoyer</>
            )}
          </button>
        </div>
      </div>

      {state.kind === "dry" && (
        <div className="text-xs bg-bg-primary border border-gray-200 rounded-lg p-3 mt-2">
          <p className="font-semibold text-text-primary mb-1">
            Simulation : {state.stale} commande(s) seraient passées en &quot;failed&quot;
          </p>
          {state.stale > 0 ? (
            <ul className="text-text-muted space-y-0.5">
              {state.sample.map((s) => (
                <li key={s.id}>
                  {new Date(s.created_at).toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  · {s.prenom} · <span className="font-mono">{s.email}</span>
                </li>
              ))}
              {state.stale > state.sample.length && (
                <li className="text-text-muted-light italic">
                  … et {state.stale - state.sample.length} autres
                </li>
              )}
            </ul>
          ) : (
            <p className="text-text-muted italic">Aucune pending obsolète détectée.</p>
          )}
        </div>
      )}

      {state.kind === "done" && (
        <div className="text-xs bg-emerald/10 border border-emerald/30 rounded-lg p-3 mt-2 flex items-start gap-2">
          <Check size={14} className="text-emerald flex-shrink-0 mt-0.5" strokeWidth={3} />
          <p className="text-emerald font-semibold">
            ✓ {state.cleaned}/{state.stale} commande(s) marquées comme &quot;failed&quot;. Recharge la page pour voir les KPIs mis à jour.
          </p>
        </div>
      )}

      {state.kind === "error" && (
        <div className="text-xs bg-urgency/10 border border-urgency/30 rounded-lg p-3 mt-2 flex items-start gap-2">
          <AlertTriangle size={14} className="text-urgency flex-shrink-0 mt-0.5" />
          <p className="text-urgency font-semibold">Erreur : {state.message}</p>
        </div>
      )}
    </div>
  );
}
