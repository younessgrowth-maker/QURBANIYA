"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { track } from "@/lib/track";
import { useInventory } from "@/components/providers/InventoryProvider";

// Sticky bottom CTA mobile-only. Apparaît après 500px de scroll.
// Masqué sur /commander (déjà sur la page d'achat) et /confirmation.
// Donne un CTA toujours visible pendant le scroll — c'est le principal
// levier de conversion sur smartphone (où la barre du haut est moins
// présente à l'esprit).

export default function MobileStickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const { isSoldOut } = useInventory();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pas afficher sur /commander, /confirmation, /admin, /login, /mes-commandes
  const HIDDEN_PREFIXES = ["/commander", "/confirmation", "/admin", "/login", "/mes-commandes", "/auth"];
  if (pathname && HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <AlertTriangle size={12} className="text-urgency flex-shrink-0" />
                <span className="text-[11px] font-bold text-urgency uppercase tracking-wide leading-none">
                  {isSoldOut ? "Complet pour 2026" : "Stock quasi épuisé"}
                </span>
              </div>
              <div className="text-[13px] text-text-primary font-semibold leading-tight mt-1">
                {isSoldOut ? (
                  <>Réservez votre place pour <span className="text-gold">Aïd 2027</span></>
                ) : (
                  <>Sacrifice à <span className="text-gold">140€</span> · <span className="text-text-muted font-normal">Vidéo garantie</span></>
                )}
              </div>
            </div>
            <Link
              href="/commander"
              onClick={() =>
                track("cta_click", { source: "mobile_sticky_bottom" })
              }
              className="flex-shrink-0 bg-urgency text-white font-bold uppercase text-xs px-4 py-3 rounded-full hover:opacity-95 transition-opacity whitespace-nowrap"
            >
              {isSoldOut ? "M'inscrire →" : "Réserver →"}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
