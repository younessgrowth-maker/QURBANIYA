"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Check, Quote } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function Sheikh() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="bg-bg-secondary section-padding" id="cheikh">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-10 lg:gap-16 items-center">

          {/* Photo column */}
          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto lg:mx-0 max-w-[360px] w-full"
          >
            {/* Photo placeholder */}
            <div className="relative rounded-xl border-2 border-gold overflow-hidden bg-bg-tertiary group cursor-default"
              style={{ aspectRatio: "3/4" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                <div className="w-24 h-24 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mb-4">
                  <span className="text-gold text-3xl font-black">CH</span>
                </div>
                <span className="text-text-muted-light text-sm uppercase tracking-wider font-medium">
                  Photo du cheikh
                </span>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
            >
              <div className="flex items-center gap-2 bg-bg-primary border border-emerald rounded-full px-5 py-2.5 shadow-lg">
                <Check size={14} className="text-emerald" strokeWidth={3} />
                <span className="text-emerald text-sm font-bold whitespace-nowrap">Diplômé en Charia</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Notre cheikh
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-text-primary leading-tight mb-6">
              UNE GARANTIE DE{" "}
              <span className="text-gold">CONFIANCE</span> ET DE SÉRIEUX
            </h2>

            <p className="text-text-muted leading-relaxed text-base md:text-lg mb-6">
              Notre cheikh possède une formation en sciences islamiques et effectue
              les sacrifices dans les règles de l&apos;art depuis plus de 5 ans.
              Chaque sacrifice est nominatif, effectué selon les conditions de la Sunnah,
              et filmé pour vous.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="gold">Formation Charia</Badge>
              <Badge variant="gold">5+ ans</Badge>
              <Badge variant="gold">Sacrifice nominatif</Badge>
            </div>

            {/* Quote */}
            <div className="relative bg-bg-tertiary border-l-4 border-gold rounded-r-lg p-5 md:p-6">
              <Quote size={20} className="text-gold/30 absolute top-4 right-4" />
              <p className="text-text-primary italic leading-relaxed">
                &ldquo;Nous prenons votre confiance au sérieux. Votre sacrifice sera accompli
                comme si vous étiez présent.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
