"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Le sacrifice est-il vraiment conforme \u00e0 la Sunnah ?",
    a: "Oui. Le sacrifice est effectu\u00e9 par un cheikh dipl\u00f4m\u00e9, selon les r\u00e8gles islamiques strictes : animal \u00e9ligible, orientation vers la Qibla, mention du nom d\u2019Allah, et respect de l\u2019animal.",
  },
  {
    q: "Comment re\u00e7ois-je la preuve vid\u00e9o ?",
    a: "Vous recevez votre vid\u00e9o nominative directement par WhatsApp dans les 24h suivant le sacrifice. La vid\u00e9o montre le sacrifice de votre mouton sp\u00e9cifiquement. Assurez-vous que votre num\u00e9ro WhatsApp est correct lors de la commande.",
  },
  {
    q: "Puis-je commander pour quelqu\u2019un d\u2019autre ?",
    a: "Absolument. Lors de la commande, vous indiquez le nom de la personne pour laquelle le sacrifice est effectu\u00e9 (niyyah). Vous pouvez commander pour vous-m\u00eame, votre famille, ou en sadaqa.",
  },
  {
    q: "Quels sont les moyens de paiement accept\u00e9s ?",
    a: "Nous acceptons la carte bancaire (via Stripe), PayPal, et le virement bancaire. Le paiement est 100% s\u00e9curis\u00e9.",
  },
  {
    q: "Que devient la viande apr\u00e8s le sacrifice ?",
    a: "La viande est distribu\u00e9e aux familles n\u00e9cessiteuses sur place, conform\u00e9ment \u00e0 la tradition islamique. Environ 15 repas sont servis par mouton.",
  },
  {
    q: "Puis-je annuler ma commande ?",
    a: "Vous pouvez annuler jusqu\u2019\u00e0 7 jours avant la date du sacrifice pour un remboursement complet. Contactez-nous par email ou WhatsApp.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq">
      <SectionTitle
        title="QUESTIONS FRÉQUENTES"
        accent="FRÉQUENTES"
        subtitle="Tout ce que vous devez savoir avant de commander."
      />
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "bg-white rounded-xl overflow-hidden transition-all duration-300",
              "shadow-[0_1px_8px_rgba(44,36,24,0.04)]",
              openIndex === i ? "shadow-[0_4px_20px_rgba(44,36,24,0.08)] border border-gold/20" : "border border-gray-100"
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-bg-tertiary/30 transition-colors"
            >
              <span className="font-semibold text-text-primary pr-4">{faq.q}</span>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                openIndex === i ? "bg-gold text-white rotate-180" : "bg-bg-tertiary text-text-muted-light"
              )}>
                <ChevronDown size={16} />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="px-6 pb-5 text-text-muted leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
