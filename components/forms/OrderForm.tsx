"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, type OrderFormValues } from "@/lib/validations";
import { User, Users, Heart, CreditCard, Check, Gift, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import type { LucideIcon } from "lucide-react";

// ─── Lecture du cookie qrb_ref posé par le middleware ─────────────
function readReferralCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)qrb_ref=([A-Z0-9]{6})/);
  return match ? match[1] : "";
}

type ReferralState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "valid"; ownerPrenom: string; discountEur: number }
  | { status: "invalid"; reason: string };

/* ── Field wrapper ── */
function Field({ label, error, optional, hint, children }: {
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
        {optional && <span className="text-text-muted-light ml-1 font-normal">(optionnel)</span>}
      </label>
      {hint && <p className="text-text-muted-light text-xs mb-1.5">{hint}</p>}
      {children}
      {error && <p className="text-urgency text-sm mt-1.5">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-bg-tertiary border border-gray-200 text-text-primary rounded-lg px-4 py-3.5 text-[15px] placeholder:text-text-muted-light/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all duration-250 input-glow";

/* ── Radio card ── */
function RadioCard({ label, icon: Icon, description, selected, onSelect }: {
  label: string;
  icon: LucideIcon;
  description?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      animate={selected ? { scale: [1, 1.015, 1] } : {}}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-250 text-left w-full hover:-translate-y-0.5 hover:shadow-soft",
        selected
          ? "border-gold bg-gold/5"
          : "border-gray-200 bg-white hover:border-gold/30"
      )}
      aria-pressed={selected}
    >
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
        selected ? "bg-gold/20 text-gold" : "bg-bg-tertiary text-text-muted"
      )}>
        <Icon size={18} />
      </div>
      <div>
        <span className={cn("font-semibold text-sm block", selected ? "text-gold" : "text-text-primary")}>
          {label}
        </span>
        {description && <span className="text-text-muted-light text-xs">{description}</span>}
      </div>
      <div className={cn(
        "ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
        selected ? "border-gold" : "border-text-muted-light/30"
      )}>
        {selected && <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="w-2.5 h-2.5 rounded-full bg-gold"
        />}
      </div>
    </motion.button>
  );
}

export default function OrderForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referralState, setReferralState] = useState<ReferralState>({ status: "idle" });
  // Guard double-submit synchrone : react-hook-form's isSubmitting set le bouton
  // disabled très vite, mais un useRef évite toute fenêtre de race entre clic
  // et passage en isSubmitting (et survit aux re-renders sans bouger).
  const inFlightRef = useRef(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      payment_method: "stripe",
      intention: "pour_moi",
      is_gift: false,
      notify_recipient: false,
      referred_by_code: "",
    },
    mode: "onSubmit",
  });

  const intention = watch("intention");
  const isGift = watch("is_gift");
  const notifyRecipient = watch("notify_recipient");
  const referralCode = watch("referred_by_code") || "";

  // Auto-fill depuis le cookie posé par le middleware (?ref=XXX)
  useEffect(() => {
    const fromCookie = readReferralCookie();
    if (fromCookie) {
      setValue("referred_by_code", fromCookie);
    }
  }, [setValue]);

  // Validation live du code parrain (debounce 400ms)
  useEffect(() => {
    const cleaned = referralCode.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleaned.length === 0) {
      setReferralState({ status: "idle" });
      return;
    }
    if (cleaned.length < 6) {
      setReferralState({ status: "idle" });
      return;
    }
    setReferralState({ status: "checking" });
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/referral/validate?code=${cleaned}`);
        const data = await res.json();
        if (data.valid) {
          setReferralState({
            status: "valid",
            ownerPrenom: data.ownerPrenom,
            discountEur: data.discountEur,
          });
        } else {
          setReferralState({ status: "invalid", reason: data.reason || "unknown" });
        }
      } catch {
        setReferralState({ status: "invalid", reason: "network" });
      }
    }, 400);
    return () => clearTimeout(t);
  }, [referralCode]);

  async function onSubmit(data: OrderFormValues) {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    try {
      track("order_submitted", {
        payment_method: data.payment_method,
        intention: data.intention,
        is_gift: data.is_gift,
      });
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.checkout_url) {
        track("payment_started", { payment_method: data.payment_method });
        setSubmitSuccess(true);
        // Brief success animation before redirect
        setTimeout(() => {
          window.location.href = result.checkout_url;
        }, 800);
      } else {
        // L'API a refusé (inventaire plein, aid_closed, validation, etc.).
        // On relâche le verrou pour permettre à l'utilisateur de retenter.
        inFlightRef.current = false;
      }
    } catch {
      inFlightRef.current = false;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* ── Informations ── */}
      <div>
        <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide mb-5">
          Vos informations
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Prénom" error={errors.prenom?.message}>
              <input {...register("prenom")} className={inputClass} placeholder="Mohamed" />
            </Field>
            <Field label="Nom" error={errors.nom?.message}>
              <input {...register("nom")} className={inputClass} placeholder="Ben Ali" />
            </Field>
          </div>
          <Field label="Email" error={errors.email?.message}>
            <input {...register("email")} type="email" className={inputClass} placeholder="votre@email.com" />
          </Field>
          <Field label="Téléphone" error={errors.telephone?.message} hint="WhatsApp — pour recevoir la vidéo de votre sacrifice">
            <input {...register("telephone")} type="tel" className={inputClass} placeholder="+33 6 12 34 56 78" />
          </Field>
        </div>
      </div>

      {/* ── Intention ── */}
      <div>
        <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide mb-5">
          Intention du sacrifice
        </h3>
        {errors.intention && <p className="text-urgency text-sm mb-3">{errors.intention.message}</p>}
        <div className="space-y-3">
          <RadioCard
            label="Pour moi"
            icon={User}
            selected={intention === "pour_moi"}
            onSelect={() => setValue("intention", "pour_moi")}
          />
          <RadioCard
            label="Pour ma famille"
            icon={Users}
            description="Épouse, parents, enfants..."
            selected={intention === "famille"}
            onSelect={() => setValue("intention", "famille")}
          />
          <RadioCard
            label="En sadaqa"
            icon={Heart}
            description="Pour un proche décédé ou vivant"
            selected={intention === "sadaqa"}
            onSelect={() => setValue("intention", "sadaqa")}
          />
        </div>
      </div>

      {/* ── Mode cadeau ── */}
      <div>
        <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide mb-5">
          Mode
        </h3>
        <div className="flex rounded-lg border-2 border-gray-200 overflow-hidden mb-4">
          <button
            type="button"
            onClick={() => setValue("is_gift", false)}
            className={`flex-1 py-3 text-sm font-semibold font-inter transition-all ${!isGift ? "bg-primary text-white" : "bg-white text-text-muted hover:bg-gray-50"}`}
            aria-pressed={!isGift}
          >
            Pour moi
          </button>
          <button
            type="button"
            onClick={() => setValue("is_gift", true)}
            className={`flex-1 py-3 text-sm font-semibold font-inter transition-all ${isGift ? "bg-primary text-white" : "bg-white text-text-muted hover:bg-gray-50"}`}
            aria-pressed={!!isGift}
          >
            🎁 Offrir à un proche
          </button>
        </div>

        {isGift && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mb-4"
          >
            <Field label="Nom du bénéficiaire" error={errors.recipient_name?.message}>
              <input
                {...register("recipient_name")}
                className={inputClass}
                placeholder="Prénom et nom du bénéficiaire"
              />
            </Field>
            <Field label="Message personnalisé" optional error={errors.recipient_message?.message} hint="Apparaîtra sur la confirmation envoyée au bénéficiaire (max. 500 caractères)">
              <textarea
                {...register("recipient_message")}
                className={`${inputClass} resize-none`}
                rows={2}
                placeholder="Un petit message pour accompagner le cadeau..."
              />
            </Field>
            <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
              <input
                type="checkbox"
                {...register("notify_recipient")}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              Envoyer la confirmation et la vidéo au bénéficiaire par email
            </label>
            {notifyRecipient && (
              <Field label="Email du bénéficiaire" error={errors.recipient_email?.message}>
                <input
                  {...register("recipient_email")}
                  type="email"
                  className={inputClass}
                  placeholder="email@du.beneficiaire"
                />
              </Field>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Niyyah ── */}
      <div>
        <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide mb-2">
          Niyyah <span className="text-text-muted font-normal normal-case text-sm">(intention)</span>
        </h3>
        <p className="text-text-muted-light text-sm mb-4">
          Ce prénom sera mentionné lors du sacrifice.
        </p>
        <Field label="Prénom pour le sacrifice" error={errors.niyyah?.message}>
          <input {...register("niyyah")} className={inputClass} placeholder="Prénom de la personne" />
        </Field>
      </div>

      {/* ── Code parrain ── */}
      <div>
        <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide mb-5 flex items-center gap-2">
          <Gift size={18} className="text-gold" /> Code parrain
          <span className="text-text-muted font-normal normal-case text-sm">(optionnel)</span>
        </h3>
        <Field
          label="Vous avez un code parrain ?"
          error={errors.referred_by_code?.message}
          hint="6 caractères — vous bénéficiez de −15€"
        >
          <div className="relative">
            <input
              {...register("referred_by_code", {
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
                },
              })}
              className={cn(
                inputClass,
                "uppercase tracking-widest font-mono pr-12",
                referralState.status === "valid" && "border-emerald focus:border-emerald focus:ring-emerald/30",
                referralState.status === "invalid" && referralCode.length === 6 && "border-urgency focus:border-urgency focus:ring-urgency/30"
              )}
              placeholder="ABC123"
              maxLength={6}
              autoComplete="off"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {referralState.status === "checking" && (
                <Loader2 size={18} className="text-text-muted animate-spin" />
              )}
              {referralState.status === "valid" && (
                <Check size={18} className="text-emerald" strokeWidth={3} />
              )}
              {referralState.status === "invalid" && referralCode.length === 6 && (
                <X size={18} className="text-urgency" strokeWidth={3} />
              )}
            </div>
          </div>
        </Field>

        <AnimatePresence>
          {referralState.status === "valid" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 flex items-center gap-3 p-3 rounded-lg bg-emerald/10 border border-emerald/30"
            >
              <Check size={18} className="text-emerald flex-shrink-0" strokeWidth={3} />
              <div className="text-sm">
                <span className="font-semibold text-emerald">Code valide</span>
                <span className="text-text-muted"> · −{referralState.discountEur}€ appliqués grâce à {referralState.ownerPrenom}</span>
              </div>
            </motion.div>
          )}
          {referralState.status === "invalid" && referralCode.length === 6 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 text-sm text-urgency"
            >
              Code parrain inconnu — vérifiez l&apos;orthographe.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Paiement ── */}
      <div>
        <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide mb-5">
          Paiement
        </h3>
        <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-gold bg-gold/5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gold/20 text-gold">
            <CreditCard size={18} />
          </div>
          <div>
            <span className="font-semibold text-sm block text-gold">Carte bancaire</span>
            <span className="text-text-muted-light text-xs">
              Visa, Mastercard — paiement sécurisé via Stripe
            </span>
          </div>
        </div>
        {referralState.status === "valid" && (
          <div className="mt-3 flex items-center justify-between p-3 rounded-lg bg-bg-secondary border border-gold/20">
            <span className="text-sm text-text-muted">Total après réduction parrain</span>
            <span className="font-bold text-text-primary">
              <span className="text-text-muted-light line-through mr-2 font-normal">140€</span>
              <span className="text-emerald">{140 - referralState.discountEur}€</span>
            </span>
          </div>
        )}
      </div>

      {/* ── Submit ── */}
      <div>
        <AnimatePresence mode="wait">
          {submitSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex items-center justify-center gap-3 bg-emerald text-white font-semibold text-base px-8 py-4 rounded-button"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
              >
                <Check size={20} strokeWidth={3} />
              </motion.div>
              Redirection en cours...
            </motion.div>
          ) : (
            <Button type="submit" size="lg" variant="primary" className="w-full" loading={isSubmitting}>
              {referralState.status === "valid"
                ? `FINALISER MA COMMANDE — ${140 - referralState.discountEur}€`
                : "FINALISER MA COMMANDE — 140€"}
            </Button>
          )}
        </AnimatePresence>
        <p className="flex items-center justify-center gap-1.5 text-text-muted-light text-xs mt-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Paiement 100% sécurisé · Données chiffrées SSL
        </p>
      </div>
    </form>
  );
}
