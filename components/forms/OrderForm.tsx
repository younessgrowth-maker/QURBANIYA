"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, type OrderFormValues } from "@/lib/validations";
import { User, Users, Heart, CreditCard, Landmark, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/* ── Field wrapper ── */
function Field({ label, error, optional, children }: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
        {optional && <span className="text-text-muted-light ml-1 font-normal">(optionnel)</span>}
      </label>
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

/* ── PayPal icon placeholder ── */
function PayPalIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.654h6.1c2.09 0 3.6.52 4.48 1.55.83.96 1.12 2.29.86 3.95l-.03.19v.54l.42.24c.36.19.64.4.86.65.37.42.6.96.7 1.6.09.67.05 1.45-.13 2.33-.22 1.01-.57 1.89-1.06 2.62-.45.67-1.01 1.21-1.67 1.62-.63.38-1.37.66-2.2.82-.8.16-1.7.24-2.68.24h-.64a1.15 1.15 0 0 0-1.14.97l-.04.24-.68 4.33-.03.18c-.02.11-.06.19-.11.24a.28.28 0 0 1-.2.08z" />
    </svg>
  );
}

export default function OrderForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
    },
    mode: "onSubmit",
  });

  const intention = watch("intention");
  const paymentMethod = watch("payment_method");

  async function onSubmit(data: OrderFormValues) {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.checkout_url) {
      setSubmitSuccess(true);
      // Brief success animation before redirect
      setTimeout(() => {
        window.location.href = result.checkout_url;
      }, 800);
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
          <Field label="Téléphone" error={errors.telephone?.message} optional>
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

      {/* ── Paiement ── */}
      <div>
        <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide mb-5">
          Moyen de paiement
        </h3>
        {errors.payment_method && <p className="text-urgency text-sm mb-3">{errors.payment_method.message}</p>}
        <div className="space-y-3">
          <RadioCard
            label="Carte bancaire"
            icon={CreditCard}
            description="Visa, Mastercard — via Stripe"
            selected={paymentMethod === "stripe"}
            onSelect={() => setValue("payment_method", "stripe")}
          />
          <RadioCard
            label="PayPal"
            icon={PayPalIcon as unknown as LucideIcon}
            selected={paymentMethod === "paypal"}
            onSelect={() => setValue("payment_method", "paypal")}
          />
          <RadioCard
            label="Virement bancaire"
            icon={Landmark}
            description="Coordonnées envoyées par email"
            selected={paymentMethod === "virement"}
            onSelect={() => setValue("payment_method", "virement")}
          />
        </div>
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
              FINALISER MA COMMANDE — 140€
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
