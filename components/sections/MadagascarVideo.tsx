"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, MapPin } from "lucide-react";

export default function MadagascarVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-bg-secondary section-padding" id="madagascar">
      <div className="max-w-4xl mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
            Preuve terrain
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-text-primary leading-tight mb-4">
            🐑 Nos moutons, <span className="text-gold">à Madagascar</span>
          </h2>
          <p className="text-text-muted leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
            Notre collaborateur sur place, au milieu du troupeau préparé pour l&apos;Aïd 2026. Chaque
            animal est nominatif — votre commande = votre mouton.
          </p>
          <p className="text-text-muted-light text-sm mt-3 flex items-center justify-center gap-1.5">
            <MapPin size={14} className="text-gold" />
            Tananarive, Madagascar
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video rounded-card overflow-hidden shadow-medium bg-black"
        >
          {!playing ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 group cursor-pointer"
              aria-label="Lancer la vidéo : nos moutons à Madagascar"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/videos/madagascar-poster.jpg"
                alt="Notre collaborateur au milieu du troupeau de moutons à Madagascar"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Play
                    size={36}
                    className="ml-1 text-primary"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm md:text-base font-medium drop-shadow-lg pointer-events-none">
                🎥 Vidéo prise sur place — durée 55 secondes
              </div>
            </button>
          ) : (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src="/videos/madagascar-troupeau.mp4"
              poster="/videos/madagascar-poster.jpg"
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
