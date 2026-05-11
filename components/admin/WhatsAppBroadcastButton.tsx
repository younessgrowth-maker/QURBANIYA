"use client";

import { useState } from "react";
import { MessageCircle, Loader2, Check, AlertTriangle } from "lucide-react";

type Result =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "dry"; would_send: number; sample: { prenom: string; telephone_raw: string; phone_normalized: string; referral_code: string }[] }
  | { kind: "done"; sent: number; total_attempted: number; failures: { phone: string; prenom: string; error: string }[] }
  | { kind: "error"; message: string };

export default function WhatsAppBroadcastButton({ remaining }: { remaining: number }) {
  const [state, setState] = useState<Result>({ kind: "idle" });

  async function call(dryRun: boolean) {
    if (state.kind === "loading") return;
    if (!dryRun) {
      const confirmed = window.confirm(
        `Envoyer le message WhatsApp d'annonce du programme parrainage à ${remaining} client(s) ? Action non réversible. Les messages partent de ton numéro Qurbaniya (connecté à Whapi).`
      );
      if (!confirmed) return;
    }
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/admin/broadcast-whatsapp", {
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
        setState({ kind: "dry", would_send: data.would_send, sample: data.sample });
      } else {
        setState({
          kind: "done",
          sent: data.sent,
          total_attempted: data.total_attempted,
          failures: data.failures,
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur réseau";
      setState({ kind: "error", message: msg });
    }
  }

  return (
    <div className="bg-bg-secondary border border-[#25D366]/30 rounded-xl p-4 mb-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <MessageCircle size={14} className="text-[#25D366]" /> Broadcast WhatsApp parrainage
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Envoie via Whapi le message d&apos;annonce + code à tous les clients payés non encore notifiés ({remaining} restants). Envoi séquentiel ~1s entre chaque pour éviter la détection de spam WhatsApp.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => call(true)}
            disabled={state.kind === "loading"}
            className="text-xs font-semibold text-text-muted hover:text-[#25D366] px-3 py-2 rounded-lg border border-gray-200 hover:border-[#25D366]/40 transition-colors disabled:opacity-50"
          >
            Simuler
          </button>
          <button
            type="button"
            onClick={() => call(false)}
            disabled={state.kind === "loading" || remaining === 0}
            className="text-xs font-bold uppercase bg-[#25D366] hover:bg-[#1FB957] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            {state.kind === "loading" ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Envoi…
              </>
            ) : (
              <>Envoyer ({remaining})</>
            )}
          </button>
        </div>
      </div>

      {state.kind === "dry" && (
        <div className="text-xs bg-bg-primary border border-gray-200 rounded-lg p-3 mt-2">
          <p className="font-semibold text-text-primary mb-1">
            Simulation : {state.would_send} destinataire(s) seraient notifiés
          </p>
          <ul className="text-text-muted space-y-0.5 font-mono">
            {state.sample.map((s) => (
              <li key={s.phone_normalized}>
                {s.prenom} · raw &quot;{s.telephone_raw}&quot; → +{s.phone_normalized} · <span className="text-gold">{s.referral_code}</span>
              </li>
            ))}
            {state.would_send > state.sample.length && (
              <li className="text-text-muted-light italic">
                … et {state.would_send - state.sample.length} autres
              </li>
            )}
          </ul>
        </div>
      )}

      {state.kind === "done" && (
        <div className="text-xs bg-emerald/10 border border-emerald/30 rounded-lg p-3 mt-2 flex items-start gap-2">
          <Check size={14} className="text-emerald flex-shrink-0 mt-0.5" strokeWidth={3} />
          <div>
            <p className="font-semibold text-emerald">
              ✓ {state.sent}/{state.total_attempted} WhatsApp envoyés
            </p>
            {state.failures.length > 0 && (
              <div className="text-urgency mt-1">
                <p className="font-semibold">{state.failures.length} échec(s) :</p>
                <ul className="space-y-0.5">
                  {state.failures.map((f, i) => (
                    <li key={i}>
                      {f.prenom} (+{f.phone}) : {f.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-text-muted mt-1">
              Recharge la page pour voir le compteur mis à jour.
            </p>
          </div>
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
