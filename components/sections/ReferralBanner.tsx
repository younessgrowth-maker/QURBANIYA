"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, ArrowRight, Check } from "lucide-react";
import { REFERRAL_DISCOUNT_EUR, REFERRER_REWARD_EUR } from "@/lib/referral";

function readReferralCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)qrb_ref=([A-Z0-9]{6})/);
  return match ? match[1] : "";
}

export default function ReferralBanner() {
  const [refCode, setRefCode] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRefCode(readReferralCookie());
  }, []);

  // SSR-stable render avant hydratation pour éviter mismatch.
  if (!mounted) return null;

  // Variante 1 : visiteur arrivé avec un code parrain valide en cookie
  if (refCode) {
    return (
      <section className="bg-gradient-to-r from-emerald/10 via-bg-secondary to-emerald/10 border-y border-emerald/30 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center sm:text-left">
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0">
              <Check size={18} className="text-emerald" strokeWidth={3} />
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary leading-tight">
                Code <span className="font-mono tracking-wider text-emerald">{refCode}</span> appliqué
              </p>
              <p className="text-xs text-text-muted">
                −{REFERRAL_DISCOUNT_EUR}€ sur votre commande
              </p>
            </div>
          </div>
          <Link
            href="/commander"
            className="inline-flex items-center gap-1.5 bg-emerald hover:bg-emerald/90 text-white font-bold uppercase text-xs px-4 py-2.5 rounded-lg transition-colors font-inter whitespace-nowrap"
          >
            Réserver à {140 - REFERRAL_DISCOUNT_EUR}€ <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    );
  }

  // Variante 2 : promotion du programme pour tous les autres visiteurs
  return (
    <section className="bg-gradient-to-r from-gold/10 via-bg-secondary to-gold/10 border-y border-gold/20 py-3 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center sm:text-left">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
            <Gift size={18} className="text-gold" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary leading-tight">
              Programme parrainage Aïd 2026
            </p>
            <p className="text-xs text-text-muted">
              Filleuls : <strong className="text-text-primary">−{REFERRAL_DISCOUNT_EUR}€</strong> sans limite · Parrain : <strong className="text-text-primary">{REFERRER_REWARD_EUR}€</strong> de cashback (une fois)
            </p>
          </div>
        </div>
        <Link
          href="/mes-commandes"
          className="inline-flex items-center gap-1.5 border-2 border-gold text-gold hover:bg-gold/5 font-bold uppercase text-xs px-4 py-2 rounded-lg transition-colors font-inter whitespace-nowrap"
        >
          Récupérer mon code <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}
