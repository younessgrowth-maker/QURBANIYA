import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, Package, ShoppingBag, Video, MessageCircle, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { AID_DATE, whatsappUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Order } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Suivi de mon sacrifice",
  description:
    "Suivez l'avancement de votre sacrifice pour l'Aïd al-Adha 2026 : paiement, sourcing de l'animal, sacrifice, vidéo nominative.",
  robots: { index: false, follow: false }, // page privée par commande
};

type Step = {
  id: string;
  label: string;
  description: string;
  Icon: typeof Check;
  status: "done" | "current" | "pending";
  doneAt?: string | null;
};

function formatDateFr(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildSteps(order: Order, now: Date): Step[] {
  const aidPassed = now.getTime() >= AID_DATE.getTime();
  const isPaid = order.payment_status === "paid";
  const videoSent = order.video_sent === true;
  const videoReady = !!order.video_url;

  const steps: Step[] = [];

  // 1. Commande reçue
  steps.push({
    id: "received",
    label: "Commande reçue",
    description: "Votre commande a bien été enregistrée.",
    Icon: ShoppingBag,
    status: "done",
    doneAt: order.created_at,
  });

  // 2. Paiement confirmé
  steps.push({
    id: "paid",
    label: "Paiement confirmé",
    description: isPaid
      ? "Votre paiement a été validé par notre prestataire bancaire."
      : "En attente de la confirmation de paiement Stripe.",
    Icon: Check,
    status: isPaid ? "done" : "current",
    doneAt: isPaid ? order.updated_at : null,
  });

  // 3. Sacrifice prévu / effectué le jour de l'Aïd
  steps.push({
    id: "sacrifice",
    label: "Sacrifice effectué",
    description: aidPassed
      ? "Votre sacrifice a été effectué en votre nom par le cheikh, conformément à la Sounnah."
      : "Sacrifice prévu le mercredi 27 mai 2026, jour de l'Aïd al-Adha.",
    Icon: Calendar,
    status: aidPassed ? "done" : isPaid ? "pending" : "pending",
    doneAt: aidPassed ? AID_DATE.toISOString() : null,
  });

  // 4. Vidéo nominative
  steps.push({
    id: "video",
    label: "Vidéo nominative",
    description: videoSent
      ? "Votre vidéo a été envoyée par WhatsApp."
      : videoReady
        ? "La vidéo est prête, envoi par WhatsApp imminent."
        : "Vidéo envoyée par WhatsApp dans les 24h après le sacrifice.",
    Icon: Video,
    status: videoSent ? "done" : videoReady ? "current" : "pending",
    doneAt: videoSent ? order.updated_at : null,
  });

  // Marquer la première étape "pending" comme "current" si aucune n'est current
  const hasCurrent = steps.some((s) => s.status === "current");
  if (!hasCurrent) {
    const firstPending = steps.findIndex((s) => s.status === "pending");
    if (firstPending !== -1) steps[firstPending].status = "current";
  }

  return steps;
}

export default async function OrderTrackingPage({
  params,
}: {
  params: { orderId: string };
}) {
  const supabase = createServiceRoleClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select(
      "id, prenom, niyyah, intention, amount, payment_status, video_sent, video_url, created_at, updated_at"
    )
    .eq("id", params.orderId)
    .single();

  if (error || !order) {
    notFound();
  }

  const typed = order as Pick<
    Order,
    "id" | "prenom" | "niyyah" | "intention" | "amount" | "payment_status" | "video_sent" | "video_url" | "created_at" | "updated_at"
  >;

  const now = new Date();
  const steps = buildSteps(typed as Order, now);

  const intentionLabel =
    typed.intention === "pour_moi"
      ? "Pour vous-même"
      : typed.intention === "famille"
        ? "Pour votre famille"
        : "En sadaqa";

  const ref = `QRB-2026-${typed.id.slice(0, 4).toUpperCase()}`;

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
          <section className="bg-white border border-gray-100/80 rounded-card p-5 md:p-8 shadow-soft mb-8">
            <h2 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <Package size={18} className="text-gold" />
              Suivi du sacrifice
            </h2>
            <ol className="relative">
              {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                return (
                  <li key={step.id} className="flex gap-4 pb-6 last:pb-0 relative">
                    {/* Ligne verticale entre les étapes */}
                    {!isLast && (
                      <div
                        className={cn(
                          "absolute left-[19px] top-10 w-0.5 h-full -z-0",
                          step.status === "done" ? "bg-emerald" : "bg-gray-200"
                        )}
                        aria-hidden="true"
                      />
                    )}
                    {/* Bulle */}
                    <div
                      className={cn(
                        "relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2",
                        step.status === "done" && "bg-emerald border-emerald text-white",
                        step.status === "current" && "bg-gold/15 border-gold text-gold animate-pulse",
                        step.status === "pending" && "bg-bg-tertiary border-gray-200 text-text-muted-light"
                      )}
                    >
                      {step.status === "done" ? (
                        <Check size={18} strokeWidth={3} />
                      ) : step.status === "current" ? (
                        <Clock size={16} />
                      ) : (
                        <step.Icon size={16} />
                      )}
                    </div>
                    {/* Texte */}
                    <div className="flex-1 pt-1.5">
                      <p
                        className={cn(
                          "font-bold mb-0.5",
                          step.status === "done"
                            ? "text-text-primary"
                            : step.status === "current"
                              ? "text-gold"
                              : "text-text-muted"
                        )}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {step.description}
                      </p>
                      {step.doneAt && step.status === "done" && (
                        <p className="text-xs text-text-muted-light mt-1 font-inter">
                          {formatDateFr(step.doneAt)}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

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
