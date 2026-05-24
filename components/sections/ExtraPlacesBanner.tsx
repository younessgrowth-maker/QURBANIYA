import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { AID_DATE, CURRENT_YEAR, ORDER_CUTOFF_DATE, isOrderingOpen } from "@/lib/constants";
import { getInventory } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";

// Bandeau "+100 places exceptionnelles rouvertes" affiché sur la home pendant
// le sprint final (J-4 → J-0). Contexte : le fournisseur a débloqué 100 moutons
// supplémentaires le 24 mai (J-3) après que le stock initial de 200 ait été
// quasi-écoulé. On veut maximiser le FOMO sur le trafic organique entrant.
//
// Condition d'affichage :
//   1. Commandes ouvertes (avant l'Aïd)
//   2. <= 4 jours restants avant l'Aïd (sinon trop tôt pour ce ton "exceptionnel")
//   3. Inventaire dispo > 0 (sinon SoldOutPanel prend le relais sur /commander)
//
// Composant server — lit l'inventaire à chaque revalidation de la home (60s).
// À supprimer / passer sur autre angle après l'Aïd 2026.

interface ExtraPlacesBannerProps {
  className?: string;
}

export default async function ExtraPlacesBanner({ className }: ExtraPlacesBannerProps) {
  if (!isOrderingOpen()) return null;

  const now = new Date();
  const msToAid = AID_DATE.getTime() - now.getTime();
  const hoursToAid = msToAid / (1000 * 60 * 60);
  // On veut ce bandeau visible dans la dernière ligne droite : <= 96h (J-4)
  if (hoursToAid > 96) return null;

  const inv = await getInventory(CURRENT_YEAR);
  if (!inv || !inv.isOpen) return null;
  if (inv.remaining <= 0) return null;

  // Compte à rebours simple : on calque sur ORDER_CUTOFF_DATE (27 mai 03h00
  // depuis le push J-3, cf. constants.ts).
  const hoursToCutoff = Math.max(
    0,
    Math.ceil((ORDER_CUTOFF_DATE.getTime() - now.getTime()) / (1000 * 60 * 60))
  );

  return (
    <div
      className={cn(
        "max-w-3xl mx-auto rounded-xl border-2 px-5 py-4 flex items-center justify-between gap-4 flex-wrap",
        "bg-gradient-to-r from-gold/10 via-gold/15 to-gold/10 border-gold/40 text-gold-dark",
        className
      )}
      role="region"
      aria-label="Annonce 100 places supplémentaires"
    >
      <div className="flex items-center gap-3">
        <Sparkles size={20} className="flex-shrink-0 text-gold animate-pulse" />
        <div>
          <p className="font-bold text-sm md:text-base">
            100 places exceptionnelles débloquées
          </p>
          <p className="text-xs opacity-80 font-inter mt-0.5">
            Notre fournisseur vient d&apos;ouvrir un stock supplémentaire — dernières{" "}
            <strong>{hoursToCutoff}h</strong> pour réserver
          </p>
        </div>
      </div>
      <Link
        href="/commander"
        className="inline-flex items-center gap-1.5 text-white font-bold uppercase text-xs md:text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0 bg-gold"
      >
        Réserver <ArrowRight size={14} />
      </Link>
    </div>
  );
}
