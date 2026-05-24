"use client";

import { useState } from "react";
import { Package, CheckCircle2, MessageCircle, Mail, Loader2 } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";

// Panneau "Réservations complètes — inscription liste d'attente" affiché sur
// /commander quand inventory.isFull = true. Volontairement plus court et plus
// rassurant que le panneau "Aïd passé / réservations closes" (cas calendaire) :
// on parle ici d'un sold-out qui PEUT se débloquer si le fournisseur libère
// des places.
//
// Le POST est best-effort côté UX : un email déjà inscrit renvoie 200 et on
// montre quand même l'écran "Merci" pour éviter de faire douter l'utilisateur.
export default function SoldOutPanel() {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!prenom.trim() || !email.trim()) {
      setError("Prénom et email obligatoires.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: prenom.trim(),
          email: email.trim(),
          telephone: telephone.trim() || undefined,
          source: "commander_soldout",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.ok === false) {
        setError(json.error ?? "Erreur d'enregistrement. Réessaie.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Erreur réseau. Réessaie dans quelques instants.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-gray-100/80 rounded-card p-8 md:p-12 shadow-soft text-center">
        <CheckCircle2 className="text-emerald mx-auto mb-5" size={48} />
        <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4">
          Vous êtes sur la liste d&apos;attente
        </h2>
        <p className="text-text-muted leading-relaxed mb-2">
          Nous vous écrivons par email <strong className="text-text-primary">dès qu&apos;une place se libère</strong>. Notre fournisseur peut débloquer du stock supplémentaire jusqu&apos;à la veille de l&apos;Aïd.
        </p>
        <p className="text-text-muted leading-relaxed mb-6">
          Pour augmenter vos chances, contactez-nous aussi sur WhatsApp — la priorité va aux personnes que nous avons en direct.
        </p>
        <a
          href={whatsappUrl("Salam, je suis sur la liste d'attente Aïd 2026, prévenez-moi en priorité si une place se libère 🙏")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald/90 text-white font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
        >
          <MessageCircle size={16} /> Me prévenir sur WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-100/80 rounded-card p-8 md:p-10 shadow-soft">
      <div className="text-center mb-6">
        <Package className="text-urgency mx-auto mb-4" size={44} />
        <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
          Réservations complètes pour l&apos;Aïd 2026
        </h2>
        <p className="text-text-muted leading-relaxed">
          Tous les moutons disponibles ont été réservés. <strong className="text-text-primary">Une place peut se libérer</strong> (annulation, stock supplémentaire débloqué par notre fournisseur). Inscrivez-vous sur la liste d&apos;attente, nous vous écrivons dès qu&apos;une réservation est de nouveau possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">
              Prénom
            </label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              placeholder="Mohamed"
              autoComplete="given-name"
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              placeholder="vous@email.com"
              autoComplete="email"
              required
              disabled={submitting}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">
            Téléphone <span className="text-text-muted-light font-normal">(optionnel — WhatsApp pour priorité)</span>
          </label>
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            placeholder="06 12 34 56 78"
            autoComplete="tel"
            disabled={submitting}
          />
        </div>

        {error && (
          <p className="text-urgency text-sm" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold uppercase text-sm py-3 rounded-xl transition-colors font-inter inline-flex items-center justify-center gap-2"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? "Inscription…" : "M'inscrire sur la liste d'attente"}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-text-muted-light mb-3">
          Une question ? Contactez-nous directement :
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsappUrl("Salam, je voudrais des nouvelles concernant la liste d'attente Aïd 2026")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-emerald text-emerald hover:bg-emerald/5 font-bold uppercase text-xs px-4 py-2 rounded-xl transition-colors font-inter"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a
            href="mailto:support@qurbaniya.fr?subject=Liste%20d'attente%20A%C3%AFd%202026"
            className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold hover:bg-gold/5 font-bold uppercase text-xs px-4 py-2 rounded-xl transition-colors font-inter"
          >
            <Mail size={14} /> support@qurbaniya.fr
          </a>
        </div>
      </div>
    </div>
  );
}
