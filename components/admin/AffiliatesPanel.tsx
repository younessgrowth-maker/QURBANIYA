"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Loader2,
  Check,
  AlertTriangle,
  Plus,
  Pencil,
} from "lucide-react";

export type AffiliateSummary = {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string | null;
  commissionEur: number;
  approved: boolean;
  payoutNote: string | null;
  pendingCount: number;
  pendingTotal: number;
  paidCount: number;
  paidTotal: number;
};

type RowState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; totalEur: number }
  | { kind: "error"; message: string };

export default function AffiliatesPanel({
  affiliates,
}: {
  affiliates: AffiliateSummary[];
}) {
  const router = useRouter();
  const [states, setStates] = useState<Record<string, RowState>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createErr, setCreateErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);

  const totalDue = affiliates.reduce((s, a) => s + a.pendingTotal, 0);

  async function createAffiliate(form: HTMLFormElement) {
    const fd = new FormData(form);
    setBusy("create");
    setCreateErr(null);
    try {
      const res = await fetch("/api/admin/affiliates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: String(fd.get("code") || ""),
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          commission_eur: Number(fd.get("commission_eur") || 20),
          approved: fd.get("approved") === "on",
          payout_note: String(fd.get("payout_note") || ""),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateErr(data.error ?? "Erreur");
        return;
      }
      form.reset();
      setShowCreate(false);
      router.refresh();
    } catch {
      setCreateErr("Erreur réseau");
    } finally {
      setBusy(null);
    }
  }

  async function patchAffiliate(
    id: string,
    patch: { approved?: boolean; commission_eur?: number; payout_note?: string }
  ) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/affiliates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...patch }),
      });
      if (res.ok) {
        setEditing(null);
        router.refresh();
      }
    } finally {
      setBusy(null);
    }
  }

  async function markPaid(a: AffiliateSummary) {
    if (states[a.id]?.kind === "loading") return;
    const ok = window.confirm(
      `Confirmer que le virement de ${a.pendingTotal}€ à "${a.name}" (${a.pendingCount} vente(s)) a bien été effectué ?\n\nCeci solde la dette comptable. Ça NE déclenche AUCUN virement.`
    );
    if (!ok) return;
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
        [a.id]: { kind: "done", totalEur: data.totalEur },
      }));
      router.refresh();
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

  const inputCls =
    "w-full text-xs px-2 py-1.5 rounded-lg border border-gray-200 bg-bg-primary focus:border-gold focus:outline-none";

  return (
    <div className="bg-bg-secondary border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <Users size={14} className="text-gold" /> Affiliés — partenaires &
          commissions
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted">
            Total dû :{" "}
            <span className="font-bold text-text-primary">{totalDue}€</span>
          </span>
          <button
            type="button"
            onClick={() => setShowCreate((v) => !v)}
            className="text-[11px] font-bold uppercase bg-gold hover:bg-gold/90 text-white px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5"
          >
            <Plus size={12} /> Nouveau partenaire
          </button>
        </div>
      </div>

      <p className="text-xs text-text-muted mb-3">
        Versements <strong>manuels</strong> par virement. « Marquer payé »
        solde la dette comptable après ton virement — ne transfère jamais
        d&apos;argent. Un affilié <strong>non approuvé</strong> ne génère
        aucune commission.
      </p>

      {showCreate && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAffiliate(e.currentTarget);
          }}
          className="bg-bg-primary border border-gray-200 rounded-lg p-3 mb-4 grid grid-cols-2 md:grid-cols-3 gap-2"
        >
          <input
            name="code"
            required
            placeholder="CODE (ex: MOSQUEE-LYON)"
            className={inputCls}
          />
          <input
            name="name"
            required
            placeholder="Nom du partenaire"
            className={inputCls}
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className={inputCls}
          />
          <input name="phone" placeholder="Téléphone" className={inputCls} />
          <input
            name="commission_eur"
            type="number"
            min={0}
            defaultValue={20}
            placeholder="Commission €"
            className={inputCls}
          />
          <input
            name="payout_note"
            placeholder="IBAN / note versement"
            className={inputCls}
          />
          <label className="flex items-center gap-2 text-xs text-text-muted col-span-2 md:col-span-1">
            <input name="approved" type="checkbox" defaultChecked /> Approuvé
            (actif)
          </label>
          <div className="col-span-2 md:col-span-3 flex items-center gap-2">
            <button
              type="submit"
              disabled={busy === "create"}
              className="text-[11px] font-bold uppercase bg-text-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              {busy === "create" ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Création…
                </>
              ) : (
                "Créer"
              )}
            </button>
            {createErr && (
              <span className="text-xs text-urgency flex items-center gap-1">
                <AlertTriangle size={12} /> {createErr}
              </span>
            )}
          </div>
        </form>
      )}

      {affiliates.length === 0 ? (
        <p className="text-xs text-text-muted italic">
          Aucun affilié. Clique « Nouveau partenaire » pour en créer un.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-text-muted-light border-b border-gray-200">
                <th className="text-left font-semibold py-2">Partenaire</th>
                <th className="text-left font-semibold py-2">Code</th>
                <th className="text-center font-semibold py-2">Statut</th>
                <th className="text-right font-semibold py-2">€/vente</th>
                <th className="text-right font-semibold py-2">Dû</th>
                <th className="text-right font-semibold py-2">Payé</th>
                <th className="text-right font-semibold py-2"></th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((a) => {
                const st = states[a.id] ?? { kind: "idle" };
                const isEditing = editing === a.id;
                return (
                  <tr
                    key={a.id}
                    className="border-b border-gray-100 last:border-0 align-top"
                  >
                    <td className="py-2 text-text-primary font-medium">
                      {a.name}
                      <div className="text-text-muted-light font-normal">
                        {a.email}
                      </div>
                      {isEditing && (
                        <input
                          defaultValue={a.payoutNote ?? ""}
                          placeholder="IBAN / note versement"
                          className={inputCls + " mt-1"}
                          id={`payout-${a.id}`}
                        />
                      )}
                      {!isEditing && a.payoutNote && (
                        <div className="text-text-muted-light font-mono text-[10px] mt-0.5">
                          {a.payoutNote}
                        </div>
                      )}
                    </td>
                    <td className="py-2 font-mono text-text-muted">{a.code}</td>
                    <td className="py-2 text-center">
                      <button
                        type="button"
                        disabled={busy === a.id}
                        onClick={() =>
                          patchAffiliate(a.id, { approved: !a.approved })
                        }
                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                          a.approved
                            ? "bg-emerald/15 text-emerald"
                            : "bg-urgency/15 text-urgency"
                        }`}
                        title="Cliquer pour basculer"
                      >
                        {a.approved ? "Approuvé" : "Inactif"}
                      </button>
                    </td>
                    <td className="py-2 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          min={0}
                          defaultValue={a.commissionEur}
                          className={inputCls + " w-16 text-right"}
                          id={`comm-${a.id}`}
                        />
                      ) : (
                        <span className="text-text-primary">
                          {a.commissionEur}€
                        </span>
                      )}
                    </td>
                    <td className="py-2 text-right font-bold text-text-primary">
                      {a.pendingTotal}€
                      <span className="text-text-muted-light font-normal">
                        {" "}
                        ({a.pendingCount})
                      </span>
                    </td>
                    <td className="py-2 text-right text-text-muted">
                      {a.paidTotal}€
                    </td>
                    <td className="py-2 text-right whitespace-nowrap">
                      {isEditing ? (
                        <button
                          type="button"
                          disabled={busy === a.id}
                          onClick={() => {
                            const comm = (
                              document.getElementById(
                                `comm-${a.id}`
                              ) as HTMLInputElement | null
                            )?.value;
                            const note = (
                              document.getElementById(
                                `payout-${a.id}`
                              ) as HTMLInputElement | null
                            )?.value;
                            patchAffiliate(a.id, {
                              commission_eur: Number(comm),
                              payout_note: note ?? "",
                            });
                          }}
                          className="text-[11px] font-bold uppercase bg-text-primary text-white px-3 py-1.5 rounded-lg disabled:opacity-50"
                        >
                          {busy === a.id ? "…" : "Enregistrer"}
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditing(a.id)}
                            className="text-text-muted hover:text-gold p-1"
                            title="Modifier commission / IBAN"
                          >
                            <Pencil size={13} />
                          </button>
                          {st.kind === "done" ? (
                            <span className="inline-flex items-center gap-1 text-emerald font-semibold">
                              <Check size={12} strokeWidth={3} /> soldé
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
                              className="text-[11px] font-bold uppercase bg-text-primary hover:bg-text-primary/90 text-white px-3 py-1.5 rounded-lg disabled:opacity-50 inline-flex items-center gap-1.5"
                            >
                              {st.kind === "loading" ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                "Marquer payé"
                              )}
                            </button>
                          ) : (
                            <span className="text-text-muted-light">—</span>
                          )}
                        </div>
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
