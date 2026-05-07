"use client";

import { useState } from "react";
import { AlertTriangle, Mail, Check, Loader2 } from "lucide-react";
import type { Order } from "@/types";

type ResendState = "idle" | "sending" | "sent" | "error";

export default function EmailFailuresPanel({ orders }: { orders: Order[] }) {
  // Commandes payées qui n'ont pas reçu de confirmation, OU qui ont eu une erreur.
  const failures = orders.filter(
    (o) =>
      o.payment_status === "paid" &&
      (o.confirmation_email_sent_at === null || o.confirmation_email_error)
  );

  const [stateById, setStateById] = useState<Record<string, ResendState>>({});
  const [errorById, setErrorById] = useState<Record<string, string>>({});

  if (failures.length === 0) return null;

  async function resend(orderId: string) {
    setStateById((s) => ({ ...s, [orderId]: "sending" }));
    try {
      const res = await fetch("/api/admin/orders/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorById((e) => ({
          ...e,
          [orderId]: data.detail || data.error || "Erreur",
        }));
        setStateById((s) => ({ ...s, [orderId]: "error" }));
        return;
      }
      setStateById((s) => ({ ...s, [orderId]: "sent" }));
    } catch {
      setErrorById((e) => ({ ...e, [orderId]: "Réseau indisponible" }));
      setStateById((s) => ({ ...s, [orderId]: "error" }));
    }
  }

  return (
    <section className="mb-6 rounded-lg border border-yellow-400/40 bg-yellow-50/60 p-4">
      <div className="flex items-start gap-3 mb-3">
        <AlertTriangle className="text-yellow-700 mt-0.5 flex-shrink-0" size={18} />
        <div>
          <h3 className="font-bold text-yellow-900">
            {failures.length} commande{failures.length > 1 ? "s" : ""} payée
            {failures.length > 1 ? "s" : ""} sans confirmation envoyée
          </h3>
          <p className="text-yellow-900/80 text-sm">
            L&apos;email de confirmation Resend a échoué ou n&apos;a jamais été
            tenté. Cliquez sur « Relancer » pour renvoyer manuellement.
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {failures.map((o) => {
          const state = stateById[o.id] ?? "idle";
          const error = errorById[o.id];
          return (
            <li
              key={o.id}
              className="flex items-center justify-between gap-3 rounded-md bg-white border border-yellow-200/80 px-3 py-2 text-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-text-primary truncate">
                  {o.prenom} {o.nom} — {o.email}
                </div>
                {o.confirmation_email_error && (
                  <div className="text-xs text-yellow-900/70 mt-0.5 truncate">
                    Dernière erreur : {o.confirmation_email_error}
                  </div>
                )}
                {error && (
                  <div className="text-xs text-red-700 mt-0.5">
                    Échec relance : {error}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => resend(o.id)}
                disabled={state === "sending" || state === "sent"}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary text-white text-xs font-semibold px-3 py-1.5 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {state === "sending" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Envoi…
                  </>
                ) : state === "sent" ? (
                  <>
                    <Check size={14} /> Envoyé
                  </>
                ) : (
                  <>
                    <Mail size={14} /> Relancer
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
