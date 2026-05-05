"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Video, Shield, MessageCircle, Heart, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

interface Guarantee {
  icon: typeof Video;
  title: string;
  text: string;
}

const guarantees: Guarantee[] = [
  {
    icon: Video,
    title: "Vidéo nominative",
    text: "Une preuve vidéo individuelle envoyée par WhatsApp dans les 24h suivant le sacrifice.",
  },
  {
    icon: Shield,
    title: "Supervision Sunnah",
    text: "Sacrifice effectué par notre cheikh dans le respect total des règles religieuses.",
  },
  {
    icon: Heart,
    title: "Viande distribuée",
    text: "La viande est répartie entre votre intention et les familles dans le besoin.",
  },
  {
    icon: MessageCircle,
    title: "Support WhatsApp",
    text: "Une question, un doute ? Notre équipe vous répond directement par message.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bg-primary section-padding" id="temoignages">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="NOTRE ENGAGEMENT ENVERS VOUS"
          accent="ENGAGEMENT"
          subtitle="Un service pensé pour la sérénité des familles musulmanes"
        />

        {/* Cheikh card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-soft"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
            <Image
              src="/cheikhChamsouddin.jpg"
              alt="Cheikh Chamsouddin"
              fill
              sizes="(max-width: 768px) 128px, 160px"
              className="rounded-full object-cover border-4 border-gold/30"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <p className="text-text-muted-light text-xs uppercase tracking-[1.5px] font-semibold mb-2">
              Votre sacrifice supervisé par
            </p>
            <h3 className="text-text-primary text-2xl md:text-3xl font-bold font-playfair mb-2">
              Cheikh Chamsouddin
            </h3>
            <p className="text-text-muted text-base leading-relaxed">
              Garant de la conformité religieuse de chaque sacrifice : choix de l&apos;animal,
              récitation, gestes, distribution. Aucun raccourci, aucune approximation.
            </p>
          </div>
        </motion.div>

        {/* Guarantees grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {guarantees.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gold/30 hover:shadow-soft transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-emerald/10 flex items-center justify-center mb-4">
                <g.icon size={20} className="text-emerald" />
              </div>
              <h4 className="text-text-primary text-base font-bold mb-2">{g.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{g.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Reviews invitation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 bg-bg-secondary rounded-xl border border-gold/20 p-6 md:p-8 text-center"
        >
          <h4 className="text-text-primary text-lg md:text-xl font-bold mb-2">
            Vous avez confié votre sacrifice à Qurbaniya ?
          </h4>
          <p className="text-text-muted text-sm md:text-base mb-5 max-w-xl mx-auto">
            Votre retour aide d&apos;autres familles à choisir en confiance. Partagez votre
            témoignage en quelques mots.
          </p>
          <a
            href="/avis"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold px-6 py-3 rounded-button transition-colors"
          >
            Laisser un avis
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
