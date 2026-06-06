import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { whatsappUrl } from "@/lib/constants";
import { orderRef } from "@/lib/utils";
import { buildOrderSteps } from "@/lib/order-status";
import OrderTimeline from "@/components/orders/OrderTimeline";
import type { Order } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Suivi de mon sacrifice",
  description:
    "Suivez l'avancement de votre sacrifice pour l'Aïd al-Adha 2026 : paiement, sourcing de l'animal, sacrifice, vidéo nominative.",
  robots: { index: false, follow: false }, // page privée par commande
};

export default async function OrderTrackingPage({
  params,
}: {
  params: { orderId: string };
}) {
  // Validation simple du format UUID — évite un appel Supabase si l'URL
  // est manifestement cassée (typo, tracker email malformé).
  const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(params.orderId)) {
    console.warn("[ma-commande] invalid UUID format:", params.orderId);
    notFound();
  }

  const supabase = createServiceRoleClient();
  // select("*") plutôt que liste explicite pour résister à d'éventuelles
  // colonnes manquantes en prod (migration non appliquée). Le service role
  // bypass la RLS de toute façon.
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", params.orderId)
    .maybeSingle();

  if (error) {
    console.error(
      "[ma-commande] Supabase query error for orderId",
      params.orderId,
      "code:",
      error.code,
      "message:",
      error.message
    );
    notFound();
  }
  if (!order) {
    console.warn("[ma-commande] no order found for orderId", params.orderId);
    notFound();
  }

  const typed = order as Order;

  const now = new Date();
  const steps = buildOrderSteps(typed as Order, now);

  const intentionLabel =
    typed.intention === "pour_moi"
      ? "Pour vous-même"
      : typed.intention === "famille"
        ? "Pour votre famille"
        : "En sadaqa";

  const ref = orderRef(typed.id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2 block font-inter">
              Référence {ref}
            </span>
            <h1 className="text-3xl md:text-4xl font-black mb-3">
              Bonjour <span className="text-gold">{typed.prenom}</span>
            </h1>
            <p className="text-text-muted">
              Voici l&apos;avancement de votre sacrifice pour l&apos;Aïd al-Adha 2026.
            </p>
          </div>

          {/* Récap commande */}
          <section className="bg-white border border-gray-100/80 rounded-card p-5 md:p-6 shadow-soft mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-muted-light text-xs uppercase tracking-wider mb-1">Niyyah</p>
                <p className="font-bold text-gold font-inter">{typed.niyyah}</p>
              </div>
              <div>
                <p className="text-text-muted-light text-xs uppercase tracking-wider mb-1">Intention</p>
                <p className="font-semibold text-text-primary">{intentionLabel}</p>
              </div>
              <div>
                <p className="text-text-muted-light text-xs uppercase tracking-wider mb-1">Montant</p>
                <p className="font-bold text-text-primary">{typed.amount.toFixed(2)} €</p>
              </div>
              <div>
                <p className="text-text-muted-light text-xs uppercase tracking-wider mb-1">Statut</p>
                <p className="font-semibold text-text-primary capitalize">
                  {typed.payment_status === "paid" ? "Payée" : typed.payment_status === "refunded" ? "Remboursée" : typed.payment_status}
                </p>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <div className="mb-8">
            <OrderTimeline steps={steps} />
          </div>

          {/* Aide */}
          <section className="text-center bg-bg-secondary rounded-card p-5 border border-gray-100/80">
            <p className="text-sm text-text-muted mb-3">
              Une question sur votre commande ?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href={whatsappUrl(`Bonjour, j'ai une question concernant ma commande ${ref}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold uppercase text-xs px-4 py-2 rounded-lg transition-colors font-inter"
              >
                <MessageCircle size={14} /> Nous écrire sur WhatsApp
              </a>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold/5 font-bold uppercase text-xs px-4 py-2 rounded-lg transition-colors font-inter"
              >
                Consulter la FAQ
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
