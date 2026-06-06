"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Video, Download, AlertCircle, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { OrderStep } from "@/lib/order-status";
import OrderTimeline from "@/components/orders/OrderTimeline";

type LookupResult =
  | { status: "ready"; prenom: string; reference: string; videos: { niyyah: string; url: string; downloadUrl: string }[] }
  | { status: "tracking"; prenom: string; reference: string; orderId: string; steps: OrderStep[] }
  | { status: "not_found" | "rate_limited" | "error"; message: string };

export default function VideoFinder() {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/orders/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reference }),
      });
      const data = (await res.json()) as LookupResult;
      setResult(data);
    } catch {
      setResult({
        status: "error",
        message: "Connexion impossible. Vérifiez votre réseau et réessayez.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Formulaire de recherche ── */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100/80 rounded-card p-5 md:p-6 shadow-soft space-y-4"
      >
        <div>
          <label htmlFor="vf-email" className="block text-sm font-semibold text-text-primary mb-1.5">
            Email de la commande
          </label>
          <input
            id="vf-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-text-primary focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="vf-ref" className="block text-sm font-semibold text-text-primary mb-1.5">
            Numéro de commande
          </label>
          <input
            id="vf-ref"
            type="text"
            required
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="QRB-2026-XXXXXXXX"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 font-mono uppercase text-text-primary focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder:font-mono placeholder:normal-case"
          />
          <p className="text-xs text-text-muted-light mt-1.5">
            Indiqué sur votre confirmation de commande et dans l&apos;email reçu après paiement.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-4 py-3 rounded-lg transition-colors font-inter",
            loading && "opacity-60 cursor-not-allowed"
          )}
        >
          <Search size={16} />
          {loading ? "Recherche…" : "Voir ma vidéo"}
        </button>
      </form>

      {/* ── Résultat ── */}
      {result?.status === "ready" && (
        <div className="space-y-5">
          <div className="text-center">
            <p className="text-text-primary font-bold text-lg">
              As-salâmu ʿalaykum {result.prenom},
            </p>
            <p className="text-text-muted text-sm">
              Voici votre vidéo nominative · {result.reference}
            </p>
          </div>
          {result.videos.map((v, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100/80 rounded-card p-4 md:p-5 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-3">
                <Video size={16} className="text-gold" />
                <p className="font-bold text-text-primary">
                  Sacrifice au nom de <span className="text-gold">{v.niyyah}</span>
                </p>
              </div>
              <video
                controls
                playsInline
                preload="metadata"
                src={v.url}
                className="w-full rounded-lg bg-black aspect-video"
              />
              <a
                href={v.downloadUrl}
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-gold transition-colors mt-3 font-semibold"
              >
                <Download size={14} /> Télécharger la vidéo
              </a>
            </div>
          ))}
          <p className="text-xs text-text-muted-light text-center">
            Les liens de visionnage sont temporaires (2 h). Rechargez la page pour
            les régénérer si besoin.
          </p>
        </div>
      )}

      {result?.status === "tracking" && (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-text-primary font-bold text-lg">
              As-salâmu ʿalaykum {result.prenom},
            </p>
            <p className="text-text-muted text-sm">
              Votre vidéo n&apos;est pas encore disponible. Voici où en est votre
              commande · {result.reference}
            </p>
          </div>
          <OrderTimeline steps={result.steps} />
          <div className="text-center bg-bg-secondary rounded-card p-4 border border-gray-100/80">
            <p className="text-sm text-text-muted mb-3">
              Vous recevrez aussi votre vidéo par WhatsApp dès qu&apos;elle sera prête.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                href={`/ma-commande/${result.orderId}`}
                className="inline-flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold/5 font-bold uppercase text-xs px-4 py-2 rounded-lg transition-colors font-inter"
              >
                Suivi détaillé
              </Link>
              <a
                href={whatsappUrl(
                  `Bonjour, une question sur ma commande ${result.reference}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold uppercase text-xs px-4 py-2 rounded-lg transition-colors font-inter"
              >
                <MessageCircle size={14} /> Nous écrire
              </a>
            </div>
          </div>
        </div>
      )}

      {result && (result.status === "not_found" || result.status === "rate_limited" || result.status === "error") && (
        <InfoCard tone="muted" icon={AlertCircle} title="Vidéo introuvable">
          {result.message}
          <div className="mt-3">
            <a
              href={whatsappUrl("Bonjour, je n'arrive pas à retrouver ma vidéo de sacrifice.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold uppercase text-xs px-4 py-2 rounded-lg transition-colors font-inter"
            >
              <MessageCircle size={14} /> Nous écrire sur WhatsApp
            </a>
          </div>
        </InfoCard>
      )}
    </div>
  );
}

function InfoCard({
  tone,
  icon: Icon,
  title,
  children,
}: {
  tone: "gold" | "muted";
  icon: typeof AlertCircle;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-card p-5 border shadow-soft",
        tone === "gold" ? "bg-gold/5 border-gold/20" : "bg-bg-secondary border-gray-100/80"
      )}
    >
      <div className="flex items-start gap-3">
        <Icon size={20} className={tone === "gold" ? "text-gold mt-0.5" : "text-text-muted mt-0.5"} />
        <div>
          <p className="font-bold text-text-primary mb-1">{title}</p>
          <p className="text-sm text-text-muted leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}
