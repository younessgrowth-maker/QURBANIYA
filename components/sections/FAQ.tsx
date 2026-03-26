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
  {
    q: "Et si je change d\u2019avis ?",
    a: "Pas de souci. Vous pouvez modifier ou annuler votre commande jusqu\u2019\u00e0 7 jours avant l\u2019A\u00efd pour un remboursement int\u00e9gral. Apr\u00e8s cette date, contactez-nous pour trouver une solution.",
  },
  {
    q: "Comment \u00eatre s\u00fbr que mon sacrifice est bien fait ?",
    a: "Le sacrifice est effectu\u00e9 par un imam dipl\u00f4m\u00e9 en sciences islamiques, selon les r\u00e8gles strictes de la Sunnah. Vous recevez une vid\u00e9o nominative montrant l\u2019int\u00e9gralit\u00e9 du processus.",
  },
  {
    q: "Quand vais-je recevoir ma vid\u00e9o ?",
    a: "Votre vid\u00e9o nominative est envoy\u00e9e par WhatsApp dans les 24h suivant le sacrifice. G\u00e9n\u00e9ralement, vous la recevez le jour m\u00eame.",
  },
  {
    q: "Puis-je commander pour plusieurs personnes ?",
    a: "Oui ! Vous pouvez passer plusieurs commandes avec des noms diff\u00e9rents pour chaque sacrifice. Chaque sacrifice est film\u00e9 individuellement.",
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

      {/* WhatsApp CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="max-w-3xl mx-auto mt-8 text-center"
      >
        <a
          href="https://wa.me/33600000000?text=Salam%2C%20j%27ai%20une%20question%20concernant%20le%20sacrifice%20de%20l%27A%C3%AFd%202026"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald hover:text-emerald-light transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
          </svg>
          Une autre question ? Écris-nous sur WhatsApp →
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
