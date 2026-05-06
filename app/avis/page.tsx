"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Check, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { reviewSchema, type ReviewFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full bg-bg-tertiary border border-gray-200 text-text-primary rounded-lg px-4 py-3.5 text-[15px] placeholder:text-text-muted-light/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all duration-250";

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="p-1 transition-transform hover:scale-110"
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
          >
            <Star
              size={32}
              className={cn(
                "transition-colors",
                filled ? "text-gold fill-gold" : "text-gray-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function AvisPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, prenom: "", text: "" },
  });

  const rating = watch("rating");

  async function onSubmit(data: ReviewFormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || "Erreur lors de l'envoi");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Erreur réseau. Réessayez plus tard.");
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 bg-bg-primary min-h-[60vh] flex items-center">
          <div className="max-w-xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
                <Check size={36} className="text-emerald" strokeWidth={3} />
              </div>
              <h1 className="text-text-primary text-3xl md:text-4xl font-bold font-playfair mb-4">
                Barakallah fikoum
              </h1>
              <p className="text-text-muted text-lg mb-8 leading-relaxed">
                Votre témoignage a bien été reçu. Il sera publié sur le site
                après une vérification rapide. Qu&apos;Allah vous récompense pour votre confiance.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light"
              >
                <ArrowLeft size={16} />
                Retour à l&apos;accueil
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-bg-primary">
        <div className="max-w-2xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm mb-6"
          >
            <ArrowLeft size={16} />
            Retour à l&apos;accueil
          </Link>

          <h1 className="text-text-primary text-3xl md:text-4xl font-bold font-playfair mb-3">
            Laissez votre témoignage
          </h1>
          <p className="text-text-muted text-base md:text-lg mb-8 leading-relaxed">
            Vous avez confié votre sacrifice à Qurbaniya ? Partagez votre expérience
            pour aider d&apos;autres familles musulmanes à choisir en confiance.
          </p>

          <div className="bg-bg-tertiary border border-gray-200 rounded-lg p-5 mb-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Star size={20} className="text-gold fill-gold" />
              </div>
              <div className="flex-1">
                <h2 className="text-text-primary font-semibold text-base mb-1">
                  Préférez-vous laisser un avis sur Google ?
                </h2>
                <p className="text-text-muted text-sm mb-3 leading-relaxed">
                  Un avis Google aide d&apos;autres familles à nous trouver. Cela prend 30 secondes.
                </p>
                <a
                  href="https://g.page/r/CQT3MFQZ9CcfEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald/90 text-white font-semibold text-sm px-4 py-2.5 rounded-button transition-colors"
                >
                  <Star size={16} className="fill-white" />
                  Laisser un avis Google
                </a>
              </div>
            </div>
          </div>

          <div className="text-center text-text-muted-light text-xs uppercase tracking-wider mb-6">
            — Ou utilisez le formulaire ci-dessous —
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Honeypot — caché aux humains, visible aux bots */}
            <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
              <label htmlFor="website">Site web (laissez vide)</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Votre note
              </label>
              <StarPicker
                value={rating || 0}
                onChange={(n) => setValue("rating", n, { shouldValidate: true })}
              />
              {errors.rating && (
                <p className="text-urgency text-sm mt-1.5">{errors.rating.message}</p>
              )}
            </div>

            {/* Prénom + Ville */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Prénom
                </label>
                <input {...register("prenom")} className={inputClass} placeholder="Mohamed" />
                {errors.prenom && (
                  <p className="text-urgency text-sm mt-1.5">{errors.prenom.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Ville
                  <span className="text-text-muted-light ml-1 font-normal">(optionnel)</span>
                </label>
                <input {...register("ville")} className={inputClass} placeholder="Paris" />
                {errors.ville && (
                  <p className="text-urgency text-sm mt-1.5">{errors.ville.message}</p>
                )}
              </div>
            </div>

            {/* Année */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Année du sacrifice
                <span className="text-text-muted-light ml-1 font-normal">(optionnel)</span>
              </label>
              <select
                {...register("year", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
                className={inputClass}
                defaultValue=""
              >
                <option value="">— Choisir une année —</option>
                <option value="2026">Aïd 2026</option>
                <option value="2025">Aïd 2025</option>
                <option value="2024">Aïd 2024</option>
                <option value="2023">Aïd 2023</option>
                <option value="2022">Aïd 2022</option>
              </select>
            </div>

            {/* Témoignage */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Votre témoignage
              </label>
              <p className="text-text-muted-light text-xs mb-2">
                Partagez quelques phrases sur votre expérience (min. 30 caractères)
              </p>
              <textarea
                {...register("text")}
                rows={5}
                className={cn(inputClass, "resize-y")}
                placeholder="Parlez de votre expérience : la simplicité, la vidéo nominative, la conformité, le rapport qualité-prix..."
              />
              {errors.text && (
                <p className="text-urgency text-sm mt-1.5">{errors.text.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Email
                <span className="text-text-muted-light ml-1 font-normal">(optionnel)</span>
              </label>
              <p className="text-text-muted-light text-xs mb-2">
                Pour vous tenir informé de la publication. Non affiché publiquement.
              </p>
              <input
                {...register("email")}
                type="email"
                className={inputClass}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="text-urgency text-sm mt-1.5">{errors.email.message}</p>
              )}
            </div>

            {serverError && (
              <div className="bg-urgency/10 border border-urgency/30 rounded-lg p-4">
                <p className="text-urgency text-sm">{serverError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold-light disabled:bg-gold/50 text-white font-bold py-4 rounded-button transition-colors uppercase tracking-wide"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer mon témoignage"}
            </button>

            <p className="text-text-muted-light text-xs text-center mt-4 leading-relaxed">
              Votre témoignage est modéré avant publication.
              Nous ne diffusons jamais votre email.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
