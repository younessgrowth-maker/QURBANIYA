"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Check, Quote } from "lucide-react";
import Badge from "@/components/ui/Badge";
import InlineCTA from "@/components/ui/InlineCTA";

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
            {/* Photo */}
            <div className="relative rounded-xl border-2 border-gold overflow-hidden bg-bg-tertiary group cursor-default"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src="/cheikhChamsouddin.jpg"
                alt="Cheikh Chamsouddin, ambassadeur Qurbaniya"
                fill
                sizes="(max-width: 1024px) 360px, 360px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                priority={false}
              />
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
                <span className="text-emerald text-sm font-bold whitespace-nowrap">Ambassadeur Qurbaniya</span>
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
              Notre ambassadeur
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-text-primary leading-tight mb-6">
              CHEIKH CHAMSOUDDIN,{" "}
              <span className="text-gold">VOTRE GARANT</span> DE CONFIANCE
            </h2>

            <p className="text-text-muted leading-relaxed text-base md:text-lg mb-6">
              Cheikh Chamsouddin accompagne Qurbaniya en tant qu&apos;ambassadeur.
              Fort de sa formation en sciences islamiques, il veille à ce que
              chaque sacrifice soit nominatif, accompli selon les conditions de
              la Sunnah, et filmé pour que vous receviez la preuve vidéo.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="gold">Formation Charia</Badge>
              <Badge variant="gold">Ambassadeur Qurbaniya</Badge>
              <Badge variant="gold">Sacrifice nominatif</Badge>
            </div>

            {/* Quote */}
            <div className="relative bg-bg-tertiary border-l-4 border-gold rounded-r-lg p-5 md:p-6">
              <Quote size={20} className="text-gold/30 absolute top-4 right-4" />
              <p className="text-text-primary italic leading-relaxed">
                &ldquo;Je recommande Qurbaniya à la communauté musulmane de France :
                un sacrifice conforme à la Sunnah, transparent, et accompli comme
                si vous étiez présent.&rdquo;
              </p>
              <p className="text-text-muted text-sm mt-3 font-semibold">
                — Cheikh Chamsouddin
              </p>
            </div>
          </motion.div>
        </div>

        <InlineCTA
          text="Confier mon sacrifice au cheikh — 140€"
        />
      </div>
    </section>
  );
}
