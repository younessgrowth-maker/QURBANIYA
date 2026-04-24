"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Mail,
  Video,
  Calendar,
  ArrowRight,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Printer,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { orderRef } from "@/lib/utils";
import { whatsappUrl } from "@/lib/constants";
import type { Intention, PaymentMethod, PaymentStatus } from "@/types";

type OrderPublic = {
  id: string;
  prenom: string;
  email: string;
  niyyah: string;
  intention: Intention;
  amount: number;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  created_at: string;
};

const MAX_POLL_ATTEMPTS = 15; // ~30s total (2s interval)
const POLL_INTERVAL_MS = 2000;

/* ──────────────────────────────────────────────────────────
   Root
   ────────────────────────────────────────────────────────── */
export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const method = searchParams.get("method");
  const orderIdParam = searchParams.get("ref");
  const isVirement = method === "virement";

  if (isVirement) return <VirementView orderId={orderIdParam} />;
  if (!sessionId) return <MissingSessionView />;
  return <StripeConfirmationView sessionId={sessionId} />;
}

/* ──────────────────────────────────────────────────────────
   Stripe path — dynamic with polling
   ────────────────────────────────────────────────────────── */
function StripeConfirmationView({ sessionId }: { sessionId: string }) {
  const [order, setOrder] = useState<OrderPublic | null>(null);
  const [fetchError, setFetchError] = useState<"not_found" | "network" | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [paidAt, setPaidAt] = useState<number | null>(null);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/orders/by-session?session_id=${encodeURIComponent(sessionId)}`,
        { cache: "no-store" }
      );
      if (res.status === 404) {
        setFetchError("not_found");
        return null;
      }
      if (!res.ok) {
        setFetchError("network");
        return null;
      }
      const data = await res.json();
      setFetchError(null);
      setOrder(data.order as OrderPublic);
      return data.order as OrderPublic;
    } catch {
      setFetchError("network");
      return null;
    }
  }, [sessionId]);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const result = await fetchOrder();
      if (cancelled) return;
      const shouldKeepPolling =
        (!result || result.payment_status === "pending") && attempts < MAX_POLL_ATTEMPTS;
      if (shouldKeepPolling) {
        timerRef.current = setTimeout(() => setAttempts((n) => n + 1), POLL_INTERVAL_MS);
      }
    };
    tick();
    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [attempts, fetchOrder]);

  useEffect(() => {
    if (order?.payment_status === "paid" && !paidAt) setPaidAt(Date.now());
  }, [order, paidAt]);

  const handleResend = useCallback(async () => {
    setResendState("sending");
    setResendMessage(null);
    try {
      const res = await fetch("/api/orders/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResendState("error");
        setResendMessage(data.error || "Erreur lors de l'envoi. Réessayez plus tard.");
        return;
      }
      setResendState("sent");
      setResendMessage(`Email renvoyé à ${data.email}.`);
    } catch {
      setResendState("error");
      setResendMessage("Erreur réseau. Réessayez plus tard.");
    }
  }, [sessionId]);

  const isPaid = order?.payment_status === "paid";
  const isPending = !order || order.payment_status === "pending";
  const timedOut = isPending && attempts >= MAX_POLL_ATTEMPTS;

  return (
    <>
      <div className="print:hidden">
        <Header />
      </div>
      <main className="min-h-screen bg-bg-primary pt-24 pb-16 px-4 print:pt-4 print:bg-white print:text-black">
        <div className="relative max-w-lg mx-auto text-center">
          {isPaid && (
            <div className="print:hidden">
              <Confetti />
            </div>
          )}

          <ProgressSteps isPaid={!!isPaid} timedOut={timedOut} />

          <HeroIcon isPaid={!!isPaid} timedOut={timedOut} />

          <AnimatePresence mode="wait">
            {isPaid ? (
              <PaidHeading key="paid" prenom={order!.prenom} />
            ) : timedOut ? (
              <TimedOutHeading key="timedout" />
            ) : (
              <PendingHeading key="pending" email={order?.email} />
            )}
          </AnimatePresence>

          {fetchError === "not_found" && !order && (
            <div className="bg-bg-secondary border border-red-500/30 rounded-xl p-6 text-left mb-8 print:hidden">
              <p className="text-red-400 text-sm">
                Nous n&apos;avons pas retrouvé cette commande. Si votre paiement a été débité,
                contactez-nous à{" "}
                <a href="mailto:contact@qurbaniya.fr" className="text-gold underline">
                  contact@qurbaniya.fr
                </a>
                .
              </p>
            </div>
          )}

          {order && <OrderRecapCard order={order} isPaid={!!isPaid} />}

          {isPaid && order && <NiyyahCard niyyah={order.niyyah} intention={order.intention} />}

          {isPaid && order && (
            <EmailBanner
              email={order.email}
              paidAt={paidAt}
              resendState={resendState}
              resendMessage={resendMessage}
              onResend={handleResend}
            />
          )}

          {isPaid && <NextStepsCard />}

          {timedOut && <WhatsAppFallback orderId={order?.id} />}

          {isPaid && (
            <div className="print:hidden">
              <ActionButtons onPrint={() => window.print()} />
            </div>
          )}

          <Link
            href="/"
            className="inline-block text-text-muted-light text-sm mt-4 hover:text-gold transition-colors print:hidden"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   Virement path — now dynamic
   ────────────────────────────────────────────────────────── */
function VirementView({ orderId }: { orderId: string | null }) {
  const [order, setOrder] = useState<OrderPublic | null>(null);

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders/by-session?order_id=${encodeURIComponent(orderId)}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setOrder(data.order as OrderPublic))
      .catch(() => {});
  }, [orderId]);

  const waMessage = order
    ? `Bonjour, j'ai fait un virement pour la commande ${orderRef(order.id)}. Pouvez-vous confirmer sa réception ?`
    : "Bonjour, j'ai fait un virement pour ma commande Qurbaniya.";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16 px-4">
        <div className="relative max-w-lg mx-auto text-center">
          <PendingIcon tone="gold" />
          <h1 className="text-3xl md:text-4xl font-black uppercase mb-3">
            COMMANDE <span className="text-gold">ENREGISTRÉE</span>
          </h1>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            Les coordonnées bancaires vous ont été envoyées par email. Votre place sera réservée
            dès réception du virement (délai 3 jours ouvrés).
          </p>

          {order && (
            <div className="bg-bg-secondary border border-gold/20 rounded-xl p-6 text-left mb-6">
              <div className="flex items-center justify-between pb-4 border-b border-gold/10">
                <span className="text-text-primary font-semibold">Virement en attente</span>
                <span className="text-gold font-bold">{formatAmount(order.amount)}</span>
              </div>
              <div className="pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Référence à rappeler</span>
                  <span className="text-gold font-mono font-bold">{orderRef(order.id)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Envoyé à</span>
                  <span className="text-text-primary truncate ml-2">{order.email}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gold/10">
                <p className="text-xs text-text-muted-light leading-relaxed">
                  Les coordonnées IBAN/BIC et le montant exact sont dans l&apos;email que nous
                  venons de vous envoyer. Pensez à indiquer la référence{" "}
                  <span className="text-gold font-mono">{orderRef(order.id)}</span> dans le motif
                  du virement.
                </p>
              </div>
            </div>
          )}

          <a
            href={whatsappUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold py-3 px-6 rounded-button transition-colors mb-4"
          >
            <MessageCircle size={18} />
            Contacter le support WhatsApp
          </a>

          <Link href="/">
            <Button size="lg" variant="secondary" className="w-full">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   Missing session
   ────────────────────────────────────────────────────────── */
function MissingSessionView() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <WarningIcon />
          <h1 className="text-2xl font-black uppercase mb-3">Lien invalide</h1>
          <p className="text-text-muted mb-8">
            Cette page de confirmation n&apos;a pas de référence de commande. Si votre paiement a
            été débité, contactez-nous à{" "}
            <a href="mailto:contact@qurbaniya.fr" className="text-gold underline">
              contact@qurbaniya.fr
            </a>
            .
          </p>
          <Link href="/">
            <Button size="lg" variant="secondary">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────── */

function ProgressSteps({ isPaid, timedOut }: { isPaid: boolean; timedOut: boolean }) {
  // Step 1: paid received (always done on this page)
  // Step 2: bank validation (active while pending, done once paid, warning if timedOut)
  // Step 3: order confirmed (done only when paid)
  const step2State: "active" | "done" | "warning" = isPaid
    ? "done"
    : timedOut
    ? "warning"
    : "active";
  const step3State: "done" | "idle" = isPaid ? "done" : "idle";

  return (
    <div className="flex items-center justify-between max-w-md mx-auto mb-10 print:hidden">
      <StepDot label="Paiement" state="done" />
      <StepLine active={!timedOut && !isPaid ? false : isPaid} warning={timedOut} />
      <StepDot label="Validation" state={step2State} />
      <StepLine active={isPaid} warning={false} />
      <StepDot label="Confirmée" state={step3State} />
    </div>
  );
}

function StepDot({
  label,
  state,
}: {
  label: string;
  state: "done" | "active" | "warning" | "idle";
}) {
  const classes =
    state === "done"
      ? "bg-emerald border-emerald text-white"
      : state === "active"
      ? "bg-gold/15 border-gold text-gold"
      : state === "warning"
      ? "bg-yellow-500/15 border-yellow-500 text-yellow-400"
      : "bg-bg-secondary border-text-muted-light/30 text-text-muted-light";

  const labelClasses =
    state === "done"
      ? "text-emerald"
      : state === "active"
      ? "text-gold"
      : state === "warning"
      ? "text-yellow-400"
      : "text-text-muted-light";

  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <div
        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors ${classes}`}
      >
        {state === "done" ? (
          <Check size={16} strokeWidth={3} />
        ) : state === "active" ? (
          <Loader2 size={14} className="animate-spin" strokeWidth={2.5} />
        ) : state === "warning" ? (
          <AlertTriangle size={14} strokeWidth={2.5} />
        ) : (
          <span className="text-xs font-bold">·</span>
        )}
      </div>
      <span className={`text-[11px] uppercase tracking-wider font-semibold ${labelClasses}`}>
        {label}
      </span>
    </div>
  );
}

function StepLine({ active, warning }: { active: boolean; warning: boolean }) {
  const color = warning ? "bg-yellow-500" : active ? "bg-emerald" : "bg-text-muted-light/20";
  return <div className={`flex-1 h-0.5 mx-2 mb-6 transition-colors ${color}`} />;
}

function HeroIcon({ isPaid, timedOut }: { isPaid: boolean; timedOut: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {isPaid ? (
        <motion.div
          key="paid"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-full bg-emerald/15 border-2 border-emerald flex items-center justify-center mx-auto mb-6 relative"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald/20"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", repeat: 2 }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            <Check size={42} className="text-emerald" strokeWidth={3} />
          </motion.div>
        </motion.div>
      ) : timedOut ? (
        <motion.div
          key="timedout"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full bg-yellow-500/10 border-2 border-yellow-500/50 flex items-center justify-center mx-auto mb-6"
        >
          <AlertTriangle size={40} className="text-yellow-400" strokeWidth={2.5} />
        </motion.div>
      ) : (
        <motion.div
          key="pending"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center mx-auto mb-6"
        >
          <Loader2 size={40} className="text-gold animate-spin" strokeWidth={2.5} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PaidHeading({ prenom }: { prenom: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-black uppercase mb-3">
        BARAKALLAH <span className="text-gold">FIKOUM</span>
      </h1>
      <p className="text-text-muted text-lg leading-relaxed mb-8">
        {prenom}, votre sacrifice a bien été enregistré.
      </p>
    </motion.div>
  );
}

function PendingHeading({ email }: { email?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl md:text-3xl font-black uppercase mb-3">
        Validation du paiement…
      </h1>
      <p className="text-text-muted text-base leading-relaxed mb-2">
        Nous finalisons votre commande, merci de patienter quelques secondes.
      </p>
      {email && (
        <p className="text-text-muted-light text-sm mb-8">
          Validation en cours pour <span className="text-gold">{email}</span>
        </p>
      )}
      {!email && <div className="mb-8" />}
    </motion.div>
  );
}

function TimedOutHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl md:text-3xl font-black uppercase mb-3">
        Validation plus longue que prévu
      </h1>
      <p className="text-text-muted text-base leading-relaxed mb-8">
        Certaines banques prennent quelques minutes à valider. Si votre paiement a été débité,
        contactez-nous via WhatsApp, nous vérifions sous 5 min.
      </p>
    </motion.div>
  );
}

function OrderRecapCard({ order, isPaid }: { order: OrderPublic; isPaid: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-bg-secondary border border-gold/20 rounded-xl p-6 text-left mb-8 print:bg-white print:border-gray-300"
    >
      <div className="flex items-center justify-between pb-4 border-b border-gold/10 print:border-gray-200">
        <span className="text-text-primary font-semibold print:text-black">Sacrifice Mouton</span>
        <span className="text-gold font-bold">{formatAmount(order.amount)}</span>
      </div>
      <div className="pt-4 space-y-2 text-sm">
        <RecapRow label="Commande" value={orderRef(order.id)} highlight />
        <RecapRow label="Intention" value={intentionLabel(order.intention)} />
        <RecapRow label="Année" value="Aïd el-Kébir 2026" />
        <RecapRow
          label="Paiement"
          value={isPaid ? "Confirmé" : "En attente de validation"}
          color={isPaid ? "text-emerald" : "text-yellow-400"}
        />
      </div>
    </motion.div>
  );
}

function RecapRow({
  label,
  value,
  color,
  highlight,
}: {
  label: string;
  value: string;
  color?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-text-muted print:text-gray-600">{label}</span>
      <span
        className={`${color || "text-text-primary print:text-black"} ${
          highlight ? "font-mono font-bold" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function NiyyahCard({ niyyah, intention }: { niyyah: string; intention: Intention }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="relative bg-gradient-to-br from-bg-secondary to-bg-primary border border-gold/30 rounded-xl p-8 text-center mb-8 overflow-hidden print:bg-white print:border-gray-400"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-gold/50 text-xs">✦</span>
        <p className="text-gold text-xs uppercase tracking-[0.2em] font-bold print:text-black">
          Votre niyyah
        </p>
        <span className="text-gold/50 text-xs">✦</span>
      </div>

      <p className="text-text-primary text-xl md:text-2xl font-serif italic leading-relaxed mb-4 print:text-black">
        &laquo; {niyyah} &raquo;
      </p>

      <p className="text-text-muted-light text-xs italic print:text-gray-600">
        {intentionLabel(intention)} · Qu&apos;Allah l&apos;accepte de vous
      </p>
    </motion.div>
  );
}

function EmailBanner({
  email,
  paidAt,
  resendState,
  resendMessage,
  onResend,
}: {
  email: string;
  paidAt: number | null;
  resendState: "idle" | "sending" | "sent" | "error";
  resendMessage: string | null;
  onResend: () => void;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!paidAt) return;
    const update = () => setElapsed(Math.floor((Date.now() - paidAt) / 1000));
    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [paidAt]);

  const elapsedLabel =
    elapsed < 10
      ? "à l'instant"
      : elapsed < 60
      ? `il y a ${elapsed}s`
      : elapsed < 3600
      ? `il y a ${Math.floor(elapsed / 60)} min`
      : `il y a ${Math.floor(elapsed / 3600)}h`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="bg-emerald/5 border border-emerald/30 rounded-xl p-5 text-left mb-8 print:hidden"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald/15 flex items-center justify-center">
          <Mail size={16} className="text-emerald" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <p className="text-text-primary font-semibold text-sm">Email de confirmation</p>
            <span className="text-emerald text-xs">{elapsedLabel}</span>
          </div>
          <p className="text-text-muted text-sm break-all">
            Envoyé à <strong className="text-gold">{email}</strong>
          </p>
          <p className="text-text-muted-light text-xs mt-1">
            Pensez à vérifier vos spams — il peut mettre 1 à 2 min à arriver.
          </p>
        </div>
      </div>
      <div className="pt-3 border-t border-emerald/20">
        {resendState === "sent" ? (
          <p className="text-emerald text-sm">✓ {resendMessage}</p>
        ) : (
          <div>
            <button
              type="button"
              onClick={onResend}
              disabled={resendState === "sending"}
              className="text-sm text-gold hover:text-gold-light inline-flex items-center gap-2 disabled:opacity-50"
            >
              {resendState === "sending" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <RefreshCw size={14} />
              )}
              Je n&apos;ai pas reçu l&apos;email
            </button>
            {resendState === "error" && resendMessage && (
              <p className="text-red-400 text-xs mt-2">{resendMessage}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function NextStepsCard() {
  const steps = [
    { icon: Mail, text: "Email de confirmation envoyé immédiatement" },
    { icon: Calendar, text: "Rappel 7 jours avant le sacrifice" },
    { icon: Check, text: "Notification le jour du sacrifice" },
    { icon: Video, text: "Preuve vidéo envoyée sous 24h" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      className="bg-bg-secondary border border-gold/10 rounded-xl p-6 text-left mb-8 print:hidden"
    >
      <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-4">
        Prochaines étapes
      </h3>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-center gap-3 text-text-muted text-sm">
            <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <step.icon size={14} className="text-gold" />
            </div>
            {step.text}
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

function WhatsAppFallback({ orderId }: { orderId?: string }) {
  const refLabel = orderId ? orderRef(orderId) : "inconnue";
  const message = `Bonjour, mon paiement pour la commande ${refLabel} ne semble pas confirmé. Pouvez-vous vérifier ?`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-5 text-left mb-8"
    >
      <p className="text-text-primary text-sm font-semibold mb-2">
        Que faire maintenant ?
      </p>
      <p className="text-text-muted text-sm mb-4 leading-relaxed">
        Contactez-nous sur WhatsApp en donnant votre référence, nous vérifions votre paiement
        manuellement sous 5 min.
      </p>
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold py-3 px-6 rounded-button transition-colors"
      >
        <MessageCircle size={18} />
        Contacter le support WhatsApp
      </a>
    </motion.div>
  );
}

function ActionButtons({ onPrint }: { onPrint: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.4 }}
      className="space-y-3"
    >
      <Link href="/mes-commandes" className="block">
        <Button size="lg" variant="secondary" className="w-full">
          SUIVRE MA COMMANDE <ArrowRight size={16} className="ml-1" />
        </Button>
      </Link>
      <button
        type="button"
        onClick={onPrint}
        className="inline-flex items-center justify-center gap-2 w-full border border-gold/30 text-gold hover:bg-gold/5 font-semibold py-3 px-6 rounded-button transition-colors"
      >
        <Printer size={16} />
        Imprimer / Sauvegarder en PDF
      </button>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   Confetti + icons
   ────────────────────────────────────────────────────────── */
function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 14 }).map((_, i) => ({
      left: `${8 + Math.round(i * 6.2 + 3)}%`,
      delay: i * 0.1,
      duration: 2 + (i % 4) * 0.5,
      size: 4 + (i % 3) * 2,
      color: i % 3 === 0 ? "#C9A84C" : i % 3 === 1 ? "#2D6A4F" : "#E8C96A",
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: [0, 400, 600], opacity: [0, 0.7, 0], rotate: [0, 180, 360] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function PendingIcon({ tone = "gold" }: { tone?: "gold" }) {
  return (
    <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center mx-auto mb-8">
      <Loader2 size={36} className={`${tone === "gold" ? "text-gold" : ""} animate-spin`} strokeWidth={2.5} />
    </div>
  );
}

function WarningIcon() {
  return (
    <div className="w-20 h-20 rounded-full bg-yellow-500/10 border-2 border-yellow-500/40 flex items-center justify-center mx-auto mb-8">
      <AlertTriangle size={36} className="text-yellow-400" strokeWidth={2.5} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────── */
const intentionLabel = (intention: Intention): string => {
  if (intention === "pour_moi") return "Pour vous-même";
  if (intention === "famille") return "Pour votre famille";
  return "En sadaqa";
};

const formatAmount = (amount: number): string =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);
