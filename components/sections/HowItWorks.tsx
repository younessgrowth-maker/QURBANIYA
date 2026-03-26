"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Calendar, Mail } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import type { LucideIcon } from "lucide-react";

interface Step {
  num: string;
  icon: LucideIcon;
  title: string;
  details: string[];
}

const steps: Step[] = [
  {
    num: "01",
    icon: ShoppingCart,
    title: "VOUS COMMANDEZ",
    details: ["En 2 minutes", "Paiement 100% sécurisé", "140€"],
  },
  {
    num: "02",
    icon: Calendar,
    title: "LE SACRIFICE EST EFFECTUÉ",
    details: ["Le jour de l'Aïd", "Par notre cheikh diplômé", "Selon la Sunnah"],
  },
  {
    num: "03",
    icon: Mail,
    title: "VOUS RECEVEZ LA PREUVE",
    details: ["Vidéo nominative", "Directement par WhatsApp", "Le jour même"],
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-bg-secondary section-padding dot-pattern" id="comment-ca-marche">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="3 ÉTAPES, C'EST TOUT"
          accent="C'EST TOUT"
          subtitle="Un processus simple, transparent et conforme."
        />

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid md:grid-cols-3 gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-[52px] left-[16.67%] right-[16.67%] h-px border-t-2 border-dashed border-gold/30 z-0" aria-hidden="true" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center text-center px-6"
            >
              {/* Large number */}
              <span className="text-[80px] font-black text-gold/15 leading-none select-none">
                {step.num}
              </span>

              {/* Icon circle */}
              <div className="w-14 h-14 rounded-full bg-emerald border-2 border-emerald flex items-center justify-center -mt-6 mb-5">
                <step.icon size={22} className="text-white" />
              </div>

              <h3 className="text-text-primary font-bold text-lg uppercase tracking-wide mb-4">
                {step.title}
              </h3>

              <ul className="space-y-1.5">
                {step.details.map((d) => (
                  <li key={d} className="text-text-muted text-sm flex items-center gap-2 justify-center">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-px border-l-2 border-dashed border-gold/30" aria-hidden="true" />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Dot on timeline */}
                <div className="absolute -left-8 top-1 w-[14px] h-[14px] rounded-full bg-gold border-2 border-bg-secondary" />

                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-black text-gold/15 leading-none">{step.num}</span>
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <step.icon size={16} className="text-gold" />
                  </div>
                </div>

                <h3 className="text-text-primary font-bold uppercase tracking-wide mb-2">
                  {step.title}
                </h3>

                <ul className="space-y-1">
                  {step.details.map((d) => (
                    <li key={d} className="text-text-muted text-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
