"use client";

import { useState } from "react";
import { Gift, Copy, Check, MessageCircle, Mail } from "lucide-react";
import {
  shareUrl,
  shareWhatsAppMessage,
  shareEmailSubject,
  shareEmailBody,
  REFERRAL_DISCOUNT_EUR,
  REFERRER_REWARD_EUR,
} from "@/lib/referral";

interface Props {
  code: string;
  prenom?: string;
}

export default function ReferralCard({ code, prenom }: Props) {
  const [copied, setCopied] = useState(false);

  const url = shareUrl(code);
  const waText = shareWhatsAppMessage(code, prenom);
  const waLink = `https://wa.me/?text=${encodeURIComponent(waText)}`;
  const mailLink = `mailto:?subject=${encodeURIComponent(shareEmailSubject())}&body=${encodeURIComponent(shareEmailBody(code, prenom))}`;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API peut être bloquée (Safari iOS sans HTTPS, etc.) — fallback silencieux
    }
  }

  return (
    <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-bg-secondary border-2 border-gold/30 rounded-card p-6 md:p-8 shadow-soft">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
          <Gift size={22} className="text-gold" />
        </div>
        <div>
          <h3 className="text-xl font-black text-text-primary uppercase tracking-tight">
            Parrainez vos proches
          </h3>
          <p className="text-text-muted text-sm mt-1">
            Vos filleuls bénéficient de <strong className="text-text-primary">−{REFERRAL_DISCOUNT_EUR}€</strong> (sans limite). Vous recevez <strong className="text-text-primary">{REFERRER_REWARD_EUR}€</strong> de cashback pour votre 1ᵉʳ filleul, versés après l&apos;Aïd.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gold/20 rounded-xl p-4 mb-4">
        <p className="text-xs uppercase tracking-wider text-text-muted-light font-semibold mb-2">
          Votre code parrain
        </p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl md:text-3xl font-black tracking-[0.25em] font-mono text-gold">
            {code}
          </span>
          <button
            type="button"
            onClick={copyCode}
            className="flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-gold transition-colors px-3 py-2 rounded-lg hover:bg-gold/5"
            aria-label="Copier le lien de partage"
          >
            {copied ? (
              <>
                <Check size={14} strokeWidth={3} className="text-emerald" />
                <span className="text-emerald">Copié</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                Copier le lien
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1FB957] text-white font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
        >
          <MessageCircle size={16} /> Partager sur WhatsApp
        </a>
        <a
          href={mailLink}
          className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gold text-gold hover:bg-gold/5 font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
        >
          <Mail size={16} /> Envoyer par email
        </a>
      </div>

      <p className="text-xs text-text-muted-light mt-4 text-center">
        Côté filleul : pas de limite, chaque proche qui commande économise {REFERRAL_DISCOUNT_EUR}€. Côté parrain : un seul cashback de {REFERRER_REWARD_EUR}€ versé après l&apos;Aïd al-Adha.
      </p>
    </div>
  );
}
