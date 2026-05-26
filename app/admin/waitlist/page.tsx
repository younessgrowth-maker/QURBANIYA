import Link from "next/link";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { redirect } from "next/navigation";
import { Users, Mail, Phone, Download, ArrowLeft } from "lucide-react";

// ─── Liste d'attente Aïd 2027 ────────────────────────────────────────────
// Page admin qui affiche tous les visiteurs inscrits sur le SoldOutPanel
// quand le stock 2026 a été épuisé. Sert de base à la campagne early-bird
// 2027 (notification de l'ouverture + offre prioritaire).
//
// Données : table `waitlist` (migration 0010_waitlist.sql).

export const dynamic = "force-dynamic";

type WaitlistRow = {
  id: string;
  prenom: string | null;
  email: string;
  telephone: string | null;
  year: number;
  created_at: string;
};

export default async function AdminWaitlistPage() {
  // Auth admin
  const authClient = createServerSupabaseClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    redirect("/login?redirect=/admin/waitlist");
  }

  const supabase = createServiceRoleClient();
  const { data: rows } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (rows ?? []) as WaitlistRow[];
  const withPhone = list.filter((r) => r.telephone && r.telephone.trim().length > 5);

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/admin"
            className="text-text-muted hover:text-gold inline-flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={14} /> Retour admin
          </Link>
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
          Liste d&apos;attente <span className="text-gold">Aïd 2027</span>
        </h1>
        <p className="text-text-muted mb-8">
          Visiteurs inscrits depuis le SoldOutPanel après épuisement du stock 2026.
          Base early-bird pour la campagne 2027.
        </p>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <KpiCard icon={<Users size={18} />} label="Total inscrits" value={list.length} />
          <KpiCard icon={<Mail size={18} />} label="Avec email valide" value={list.length} />
          <KpiCard
            icon={<Phone size={18} />}
            label="Avec téléphone"
            value={`${withPhone.length} / ${list.length}`}
          />
        </div>

        {/* Export CSV */}
        <div className="flex justify-end mb-4">
          <Link
            href="/api/admin/waitlist/export"
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-3 py-2 hover:bg-primary/90 transition-colors"
            prefetch={false}
          >
            <Download size={16} />
            Export CSV
          </Link>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft">
          {list.length === 0 ? (
            <div className="p-10 text-center text-text-muted">
              Aucun inscrit pour l&apos;instant.
              <br />
              La liste se remplit automatiquement quand des visiteurs s&apos;inscrivent
              sur la page <code>/commander</code> en mode sold-out.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-muted text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Prénom</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Téléphone</th>
                    <th className="px-4 py-3 text-left">Année cible</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((row) => (
                    <tr key={row.id} className="border-t border-gray-100 hover:bg-bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 text-text-muted whitespace-nowrap">
                        {new Date(row.created_at).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3 font-semibold text-text-primary">
                        {row.prenom || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${row.email}`}
                          className="text-text-primary hover:text-gold"
                        >
                          {row.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-text-muted font-mono">
                        {row.telephone || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gold/10 text-gold text-xs font-semibold">
                          {row.year}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-text-muted-light text-xs uppercase tracking-wider font-semibold">
          {label}
        </span>
        <span className="text-gold">{icon}</span>
      </div>
      <div className="text-3xl font-black text-text-primary">{value}</div>
    </div>
  );
}
