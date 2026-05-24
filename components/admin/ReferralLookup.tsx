"use client";

import { useState } from "react";
import { Search, Loader2, Users, Gift, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Filleul {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  payment_status: string;
  amount: number;
  quantity: number;
  discount_amount: number;
  created_at: string;
}

interface Candidate {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  referral_code: string | null;
  referrer_reward_paid_at: string | null;
  referred_by_code: string | null;
  payment_status: string;
  amount: number;
  quantity: number;
  discount_amount: number;
  created_at: string;
  filleuls: Filleul[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

const STATUS_LABEL: Record<string, string> = {
  pending: "En attente",
  paid: "Payée",
  failed: "Échec",
  refunded: "Remboursée",
};

const STATUS_TONE: Record<string, string> = {
  pending: "text-yellow-700 bg-yellow-400/10 border-yellow-400/30",
  paid: "text-emerald bg-emerald/10 border-emerald/30",
  failed: "text-urgency bg-urgency/10 border-urgency/30",
  refunded: "text-gray-600 bg-gray-200 border-gray-300",
};

export default function ReferralLookup() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    const query = q.trim();
    if (query.length < 3) {
      setError("Tape au moins 3 caractères (nom, email ou téléphone).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/referral-lookup?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur de recherche");
        setCandidates(null);
        return;
      }
      setCandidates(data.candidates ?? []);
    } catch {
      setError("Réseau indisponible");
      setCandidates(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Gift size={16} className="text-gold" />
        <h3 className="text-sm font-bold text-text-primary">Recherche parrain / filleuls</h3>
      </div>
      <p className="text-xs text-text-muted mb-3">
        Cherche par nom, email ou téléphone. Si la personne est parraine, ses filleuls
        apparaîtront avec leur statut paiement et la réduction appliquée.
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ex : warda, lindabouz@hotmail.fr, 0784102379"
            className="w-full h-9 pl-8 pr-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-9 px-4 text-sm font-bold uppercase bg-text-primary text-white rounded-lg hover:bg-text-primary/90 disabled:opacity-50 flex items-center gap-1.5"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          Chercher
        </button>
      </form>

      {error && (
        <div className="text-xs text-urgency bg-urgency/10 border border-urgency/30 rounded-lg p-3 mb-2">
          {error}
        </div>
      )}

      {candidates !== null && candidates.length === 0 && (
        <p className="text-xs text-text-muted italic">Aucune commande trouvée.</p>
      )}

      {candidates !== null && candidates.length > 0 && (
        <div className="space-y-3">
          {candidates.length > 1 && (
            <p className="text-xs text-text-muted italic">
              {candidates.length} résultats correspondent — sélectionne le bon parrain ci-dessous.
            </p>
          )}
          {candidates.map((c) => (
            <CandidateCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function CandidateCard({ c }: { c: Candidate }) {
  const filleulsPaid = c.filleuls.filter((f) => f.payment_status === "paid");
  const filleulsPending = c.filleuls.filter((f) => f.payment_status === "pending");

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-bg-tertiary/30">
      {/* Header parrain */}
      <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
        <div>
          <p className="text-sm font-bold text-text-primary">
            {c.prenom} {c.nom}
          </p>
          <p className="text-xs text-text-muted">
            {c.email} · {c.telephone || "—"} · cmd du {formatDate(c.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border",
              STATUS_TONE[c.payment_status] || STATUS_TONE.pending,
            )}
          >
            {STATUS_LABEL[c.payment_status] || c.payment_status}
          </span>
          {c.referral_code && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-gold/10 text-gold border border-gold/30 font-mono">
              <Gift size={11} /> {c.referral_code}
            </span>
          )}
          {c.referred_by_code && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-text-muted border border-gray-300">
              filleul de <span className="font-mono font-bold">{c.referred_by_code}</span>
            </span>
          )}
        </div>
      </div>

      {/* Récompense */}
      {c.referral_code && (
        <div className="text-xs flex items-center gap-1.5 mb-3">
          {c.referrer_reward_paid_at ? (
            <>
              <CheckCircle2 size={12} className="text-emerald" />
              <span className="text-text-muted">
                Récompense 20€ versée le {formatDate(c.referrer_reward_paid_at)}
              </span>
            </>
          ) : (
            <>
              <XCircle size={12} className="text-text-muted-light" />
              <span className="text-text-muted-light">Récompense parrain non encore versée</span>
            </>
          )}
        </div>
      )}

      {/* Filleuls */}
      {c.referral_code && (
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs">
            <Users size={12} className="text-text-muted" />
            <span className="font-semibold text-text-primary">
              {c.filleuls.length === 0
                ? "Aucun filleul"
                : `${c.filleuls.length} filleul${c.filleuls.length > 1 ? "s" : ""}`}
            </span>
            {c.filleuls.length > 0 && (
              <span className="text-text-muted">
                · {filleulsPaid.length} payé{filleulsPaid.length > 1 ? "s" : ""}
                {filleulsPending.length > 0 && ` · ${filleulsPending.length} en attente`}
              </span>
            )}
          </div>
          {c.filleuls.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="text-text-muted-light">
                  <tr>
                    <th className="text-left px-2 py-1 font-semibold">Date</th>
                    <th className="text-left px-2 py-1 font-semibold">Filleul</th>
                    <th className="text-left px-2 py-1 font-semibold">Email</th>
                    <th className="text-left px-2 py-1 font-semibold">Statut</th>
                    <th className="text-right px-2 py-1 font-semibold">Payé</th>
                    <th className="text-right px-2 py-1 font-semibold">Réduc.</th>
                  </tr>
                </thead>
                <tbody>
                  {c.filleuls.map((f) => (
                    <tr key={f.id} className="border-t border-gray-100">
                      <td className="px-2 py-1 text-text-muted whitespace-nowrap">
                        {formatDate(f.created_at)}
                      </td>
                      <td className="px-2 py-1 text-text-primary font-semibold">
                        {f.prenom} {f.nom}
                      </td>
                      <td className="px-2 py-1 text-text-muted">{f.email}</td>
                      <td className="px-2 py-1">
                        <span
                          className={cn(
                            "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border",
                            STATUS_TONE[f.payment_status] || STATUS_TONE.pending,
                          )}
                        >
                          {STATUS_LABEL[f.payment_status] || f.payment_status}
                        </span>
                      </td>
                      <td className="px-2 py-1 text-right font-semibold text-text-primary whitespace-nowrap">
                        {(f.amount * (f.quantity ?? 1) - (f.discount_amount ?? 0)).toFixed(2)}€
                        {(f.quantity ?? 1) > 1 && (
                          <span className="ml-1 text-[10px] text-text-muted-light font-normal">
                            ({f.quantity}×)
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-1 text-right text-emerald whitespace-nowrap">
                        {f.discount_amount > 0 ? `−${f.discount_amount.toFixed(2)}€` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
