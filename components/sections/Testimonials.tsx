"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

interface Testimonial {
  nom: string;
  ville: string;
  etoiles: 1 | 2 | 3 | 4 | 5;
  texte: string;
  date: string;
}

const testimonials: Testimonial[] = [
  { nom: "Karim B.", ville: "Lyon", etoiles: 5, texte: "Impeccable, j'ai reçu la vidéo le jour même. Je recommande à tous mes proches.", date: "Aïd 2024" },
  { nom: "Fatima L.", ville: "Paris", etoiles: 5, texte: "Très sérieux, la vidéo arrive bien. Le prix est imbattable comparé à la France.", date: "Aïd 2024" },
  { nom: "Mohamed R.", ville: "Marseille", etoiles: 5, texte: "4ème année consécutive, toujours aussi bien. Vraiment de confiance.", date: "Aïd 2024" },
  { nom: "Aïcha M.", ville: "Toulouse", etoiles: 5, texte: "Parfait. La démarche est simple et la preuve rassure vraiment. Barakallah fikoum.", date: "Aïd 2024" },
  { nom: "Youssef T.", ville: "Bordeaux", etoiles: 4, texte: "Très bon service. Juste quelques heures d'attente pour la vidéo mais elle est arrivée.", date: "Aïd 2024" },
  { nom: "Samira K.", ville: "Strasbourg", etoiles: 5, texte: "Je ne passe plus par ailleurs. Service exemplaire et équipe réactive.", date: "Aïd 2024" },
];

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const initials = t.nom
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col min-w-[280px] snap-center transition-shadow duration-300 hover:shadow-elevated hover:border-gold/15 cursor-default"
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4" aria-label={`${t.etoiles} étoiles sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              i < t.etoiles ? "text-gold fill-gold" : "text-text-muted-light"
            )}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-text-primary text-sm leading-relaxed italic flex-1 mb-5">
        &ldquo;{t.texte}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald/15 border border-emerald/30 flex items-center justify-center flex-shrink-0">
          <span className="text-emerald text-xs font-bold">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-text-primary text-sm font-semibold">{t.nom}</p>
          <p className="text-text-muted-light text-xs">{t.ville}</p>
        </div>
        <span className="text-text-muted-light text-[11px] bg-bg-tertiary px-2 py-1 rounded-full whitespace-nowrap">
          {t.date}
        </span>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-bg-primary section-padding" id="temoignages">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="ILS NOUS ONT FAIT CONFIANCE"
          accent="CONFIANCE"
          subtitle="+800 familles satisfaites · Note moyenne : 4.8/5"
        />

        {/* Desktop: 3x2 grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.nom} t={t} index={i} />
          ))}
        </div>

        {/* Mobile: horizontal scroll with snap */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.nom} t={t} index={i} />
            ))}
          </div>
          {/* Scroll hint */}
          <p className="text-text-muted-light text-xs text-center mt-2">
            ← Faites glisser pour voir plus →
          </p>
        </div>

        {/* Rating summary + link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Rating bar */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={cn(
                  i < 5 ? "text-gold fill-gold" : "text-text-muted-light"
                )} />
              ))}
            </div>
            <span className="text-text-primary text-sm font-semibold">4.8 sur 5</span>
            <span className="text-text-muted text-sm">· Basé sur 800+ avis</span>
          </div>

          {/* Link to reviews */}
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold hover:text-gold-light transition-colors"
          >
            Voir tous les avis
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
