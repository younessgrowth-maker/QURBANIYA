"use client";

import { useMemo, useState } from "react";
import { Search, Download, Filter, RotateCcw, Loader2, Send, Pencil, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Order } from "@/types";

// ─── Inline editor pour le téléphone d'une commande ──────────────────────
// Affiché à la place du téléphone dans le tableau admin. Clic sur le
// téléphone (ou sur "—" si vide) → input éditable → Enter ou check
// → PATCH /api/admin/orders/phone.
//
// Use case principal : à J-2/J-1 de l'Aïd, beaucoup de clients qui n'ont
// pas mis leur téléphone à la commande répondent à l'email "envoie-nous
// ton numéro" avec leur numéro. L'admin a juste à le coller ici.
function PhoneInline({
  order,
  onUpdated,
}: {
  order: Order;
  onUpdated: (telephone: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(order.telephone || "");
  const [state, setState] = useState<"idle" | "saving" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function save() {
    setState("saving");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/orders/phone", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: order.id, telephone: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setErrorMsg(data.error || "Erreur");
        return;
      }
      onUpdated(data.order.telephone ?? "");
      setEditing(false);
      setState("idle");
    } catch {
      setState("error");
      setErrorMsg("Réseau indisponible");
    }
  }

  function cancel() {
    setValue(order.telephone || "");
    setEditing(false);
    setState("idle");
    setErrorMsg(null);
  }

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        title="Cliquer pour modifier le téléphone"
        className="group inline-flex items-center gap-1 text-text-muted-light text-xs hover:text-gold transition-colors"
      >
        <span>{order.telephone || "— ajouter"}</span>
        <Pencil size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <input
          type="tel"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              save();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              cancel();
            }
          }}
          autoFocus
          placeholder="+336XXXXXXXX"
          className="px-2 py-0.5 border border-gold/40 rounded text-xs w-32 focus:outline-none focus:ring-1 focus:ring-gold"
          disabled={state === "saving"}
        />
        <button
          type="button"
          onClick={save}
          disabled={state === "saving"}
          className="p-0.5 rounded text-emerald hover:bg-emerald/10 disabled:opacity-40"
          title="Sauvegarder (Entrée)"
        >
          {state === "saving" ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
        </button>
        <button
          type="button"
          onClick={cancel}
          disabled={state === "saving"}
          className="p-0.5 rounded text-urgency hover:bg-urgency/10 disabled:opacity-40"
          title="Annuler (Échap)"
        >
          <X size={12} />
        </button>
      </div>
      {errorMsg && <span className="text-urgency text-xs">{errorMsg}</span>}
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-400/10 text-yellow-700 border-yellow-400/30",
  paid: "bg-emerald/10 text-emerald border-emerald/30",
  failed: "bg-urgency/10 text-urgency border-urgency/30",
  refunded: "bg-gray-200 text-gray-600 border-gray-300",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "En attente",
  paid: "Payée",
  failed: "Échec",
  refunded: "Remboursée",
};

function RefundButton({ order }: { order: Order }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  if (order.payment_status !== "paid") return null;

  async function handleRefund() {
    const totalPaid =
      order.amount * (order.quantity ?? 1) - (order.discount_amount ?? 0);
    const reason = window.prompt(
      `Rembourser la commande de ${order.prenom} ${order.nom} (${totalPaid.toFixed(2)} € payés) ?\n\nMotif (visible dans Stripe + DB):`,
      ""
    );
    if (reason === null) return; // cancel
    if (!window.confirm("Confirmer le remboursement ? Cette action est irréversible.")) {
      return;
    }
    setState("loading");
    setErrMsg(null);
    try {
      const res = await fetch("/api/admin/orders/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: order.id, reason }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setErrMsg(data.detail || data.error || "Erreur");
        return;
      }
      setState("done");
      // Refresh the page to show updated status everywhere
      window.location.reload();
    } catch {
      setState("error");
      setErrMsg("Réseau indisponible");
    }
  }

  return (
    <button
      type="button"
      onClick={handleRefund}
      disabled={state === "loading" || state === "done"}
      title={errMsg ?? "Émettre un remboursement Stripe"}
      className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-urgency hover:text-urgency text-xs font-semibold px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {state === "loading" ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <RotateCcw size={12} />
      )}
      Rembourser
    </button>
  );
}

// État du bouton après réponse API :
// - "full" : email + WhatsApp Whapi répond `sent:true` (le plus probable
//   quand le compte WA n'est pas restreint). Affiché vert plein.
// - "email-only" : email envoyé mais WA n'a pas pu être tenté (téléphone
//   invalide / Whapi 401 / channel offline). Affiché doré "attention" pour
//   que l'admin sache qu'un WA manuel est probablement nécessaire.
// - "error" : email lui-même a échoué ou skip Stripe (session expirée, etc.)
type RelanceState = "idle" | "loading" | "full" | "email-only" | "error";

function RelanceButton({ order }: { order: Order }) {
  const [state, setState] = useState<RelanceState>("idle");
  const [msg, setMsg] = useState<string | null>(null);

  // N'apparaît que pour les pending Stripe avec une session existante.
  if (order.payment_status !== "pending") return null;
  if (order.payment_method !== "stripe" || !order.stripe_session_id) return null;

  async function handleRelance() {
    if (!window.confirm(
      `Relancer ${order.prenom} ${order.nom} par email + WhatsApp ?\n\nLe message contient le lien Stripe pour reprendre le paiement.`
    )) return;

    setState("loading");
    setMsg(null);
    try {
      const res = await fetch("/api/admin/relance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: order.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setMsg(data.error || "Erreur");
        return;
      }
      const r = data.result;
      if (r.skipped) {
        setState("error");
        setMsg(r.skipped);
        return;
      }
      // Email OK + WA répond sent:true côté Whapi → état complet "full".
      // Note : Whapi peut renvoyer sent:true mais le message reste pending
      // côté WhatsApp pendant des heures/jours quand le compte est en
      // shadow-ban algorithmique. On affiche "WA ✓" car la requête API a
      // été acceptée, pas pour garantir la délivrance finale.
      if (r.email_sent && r.wa_sent) {
        setState("full");
        setMsg("Email envoyé · WA accepté par Whapi (délivrance via WhatsApp non garantie pendant restriction).");
      } else if (r.email_sent) {
        setState("email-only");
        setMsg(
          r.wa_error
            ? `Email envoyé · WA non transmis : ${r.wa_error.slice(0, 80)} — pense au WA manuel depuis ton phone.`
            : "Email envoyé · WA non tenté (téléphone manquant ou invalide).",
        );
      } else {
        setState("error");
        setMsg("Email non envoyé");
      }
    } catch {
      setState("error");
      setMsg("Réseau indisponible");
    }
  }

  // Compose le label dynamique avec 2 micro-indicateurs distincts pour
  // qu'on voie d'un coup d'œil quel canal est parti — au lieu d'un
  // unique "Relancé" qui cache l'éventuel échec WhatsApp silencieux.
  const label =
    state === "loading"
      ? null
      : state === "full"
        ? "Email ✓ · WA ✓"
        : state === "email-only"
          ? "Email ✓ · WA ⋯"
          : state === "error"
            ? "Erreur"
            : "Relancer";

  return (
    <button
      type="button"
      onClick={handleRelance}
      disabled={state === "loading"}
      title={msg ?? "Renvoyer email + WhatsApp avec lien de paiement"}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border text-xs font-semibold px-2 py-1 mr-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
        state === "full"
          ? "border-emerald/40 bg-emerald/10 text-emerald"
          : state === "email-only"
            ? "border-gold/40 bg-gold/10 text-gold"
            : state === "error"
              ? "border-urgency/40 bg-urgency/10 text-urgency"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gold/10 hover:border-gold hover:text-gold"
      )}
    >
      {state === "loading" ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <Send size={12} />
      )}
      {label}
    </button>
  );
}

function RelanceAllButton({ orders }: { orders: Order[] }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [summary, setSummary] = useState<string | null>(null);

  const eligible = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.payment_status === "pending" &&
          o.payment_method === "stripe" &&
          o.stripe_session_id &&
          !o.reminder_sent_at, // anti re-spam : exclut les pending déjà relancés (cron auto ou bouton manuel)
      ),
    [orders],
  );

  if (eligible.length === 0) return null;

  async function handleRelanceAll() {
    if (!window.confirm(
      `Relancer les ${eligible.length} commande(s) en attente (non encore relancées) par email + WhatsApp ?\n\nUn seul envoi par commande grâce au flag reminder_sent_at. Délai 1.5s entre chaque envoi.`
    )) return;

    setState("loading");
    setSummary(null);
    try {
      const res = await fetch("/api/admin/relance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSummary(data.error || "Erreur");
        setState("idle");
        return;
      }
      // On affiche distinctement email vs WA pour que l'admin sache quels
      // canaux ont effectivement été tentés. wa_sent = nombre de requêtes
      // que Whapi a accepté (sent:true), pas forcément le nombre de
      // messages effectivement délivrés côté WhatsApp (peut prendre des
      // heures/jours pendant une période de restriction algorithmique).
      const parts: string[] = [
        `${data.email_sent}/${data.total} emails ✓`,
        `${data.wa_sent} WA tentés`,
      ];
      if (data.skipped) parts.push(`${data.skipped} sautés`);
      setSummary(parts.join(" · "));
      setState("done");
    } catch {
      setSummary("Réseau indisponible");
      setState("idle");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleRelanceAll}
        disabled={state === "loading"}
        className="h-9 px-3 text-sm font-semibold bg-gold/10 text-gold border border-gold/30 rounded-lg hover:bg-gold/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
      >
        {state === "loading" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Send size={14} />
        )}
        Relancer pending ({eligible.length})
      </button>
      {summary && <span className="text-xs text-text-muted">{summary}</span>}
    </div>
  );
}

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
    "Quantite",
    "Montant (EUR)",
    "Stripe Session",
    "Video envoyee",
    "ID",
  ];
  const rows = orders.map((o) => {
    const q = o.quantity ?? 1;
    return [
      o.created_at,
      o.prenom,
      o.nom,
      o.email,
      o.telephone,
      INTENTION_LABEL[o.intention] || o.intention,
      o.niyyah,
      STATUS_LABEL[o.payment_status] || o.payment_status,
      METHOD_LABEL[o.payment_method] || o.payment_method,
      String(q),
      (o.amount * q - (o.discount_amount ?? 0)).toFixed(2),
      o.stripe_session_id || "",
      o.video_sent ? "Oui" : "Non",
      o.id,
    ];
  });
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
  // Patch local des téléphones édités via PhoneInline. On stocke {orderId:
  // newPhone} et on l'applique en surcouche des `orders` server-props pour
  // que le tableau reflète l'édition sans recharger la page. Quand la
  // page revalide (server side), ce state est reset (et l'edit confirmé
  // est déjà persisté en BDD, donc rien à perdre).
  const [phoneOverrides, setPhoneOverrides] = useState<Record<string, string>>({});

  const ordersWithEdits = useMemo(
    () =>
      orders.map((o) =>
        phoneOverrides[o.id] !== undefined
          ? { ...o, telephone: phoneOverrides[o.id] }
          : o,
      ),
    [orders, phoneOverrides],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ordersWithEdits.filter((o) => {
      if (status !== "all" && o.payment_status !== status) return false;
      if (method !== "all" && o.payment_method !== method) return false;
      if (q) {
        const hay = `${o.prenom} ${o.nom} ${o.email} ${o.telephone}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [ordersWithEdits, search, status, method]);

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
        <RelanceAllButton orders={orders} />
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
              <th className="text-right px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-text-muted-light">
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
                    <PhoneInline
                      order={o}
                      onUpdated={(tel) =>
                        setPhoneOverrides((prev) => ({ ...prev, [o.id]: tel }))
                      }
                    />
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
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {(() => {
                      const q = o.quantity ?? 1;
                      const gross = o.amount * q;
                      const discount = o.discount_amount ?? 0;
                      const net = gross - discount;
                      return (
                        <div className="inline-flex flex-col items-end leading-tight">
                          {discount > 0 ? (
                            <span className="flex items-baseline gap-1.5">
                              <span className="text-text-muted-light line-through text-xs font-normal">
                                {gross.toFixed(2)}€
                              </span>
                              <span className="font-bold text-emerald">
                                {net.toFixed(2)} €
                              </span>
                            </span>
                          ) : (
                            <span className="font-bold text-text-primary">
                              {net.toFixed(2)} €
                            </span>
                          )}
                          {q > 1 && (
                            <span className="text-[10px] text-text-muted-light mt-0.5">
                              {q} × {o.amount.toFixed(0)}€
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <RelanceButton order={o} />
                    <RefundButton order={o} />
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
