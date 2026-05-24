"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappUrl as buildWhatsappUrl } from "@/lib/constants";
import { track } from "@/lib/track";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [pillExpanded, setPillExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Le pill "Réponse < 2 min" se déploie 800ms après l'apparition du
  // bouton, pour attirer l'attention. Reste ouvert ensuite — informatif,
  // pas intrusif. Sur mobile/petits écrans il reste compact.
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setPillExpanded(true), 800);
    return () => clearTimeout(t);
  }, [visible]);

  const whatsappUrl = buildWhatsappUrl();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-2"
        >
          {/* Pill informatif "Réponse en < 2 min" */}
          <AnimatePresence>
            {pillExpanded && (
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("whatsapp_click", { source: "floating_pill" })
                }
                initial={{ opacity: 0, x: 20, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="hidden sm:flex items-center gap-2 bg-white text-text-primary px-3 py-2 rounded-full shadow-lg border border-gray-200 hover:shadow-xl hover:border-[#25D366]/40 transition-all"
                aria-label="Réponse en moins de 2 minutes sur WhatsApp"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                </span>
                <span className="text-xs font-semibold leading-none whitespace-nowrap">
                  Réponse en{" "}
                  <span className="text-[#25D366] font-bold">&lt; 2 min</span>
                </span>
              </motion.a>
            )}
          </AnimatePresence>

          {/* Bouton WhatsApp principal */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("whatsapp_click", { source: "floating_button" })
            }
            className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
            aria-label="Contacter sur WhatsApp"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
            </svg>

            {/* Sur mobile : badge compact "< 2 min" attaché au bouton
                (le pill complet est masqué `sm:hidden`). */}
            <span className="sm:hidden absolute -top-1.5 -right-1.5 bg-white text-[#25D366] text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-[#25D366]/30 whitespace-nowrap leading-none">
              &lt; 2 min
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
