import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Eid al-Adha 2026 Sacrifice from France — Online Qurbani Service",
  description:
    "Delegate your Eid al-Adha 2026 sacrifice from France (Wednesday 27 May). Sheep sacrificed in your name under sheikh supervision in Madagascar, video proof on WhatsApp, meat distributed to families in need. €140 all-inclusive.",
  keywords: [
    "eid al adha 2026 france",
    "qurbani 2026",
    "online qurbani service",
    "eid ul adha 2026 in france",
    "qurban eid 2026",
    "delegate sacrifice eid",
    "sheep sacrifice online",
    "qurbani france",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/en",
    languages: {
      "fr-FR": "https://qurbaniya.fr",
      "ar": "https://qurbaniya.fr/ar",
      "tr": "https://qurbaniya.fr/tr",
      "en": "https://qurbaniya.fr/en",
    },
  },
  openGraph: {
    title: "Eid al-Adha 2026 — Online Qurbani Service from France",
    description:
      "Delegate your Eid al-Adha 2026 sacrifice from France: sheikh supervision, personal video proof, meat distribution in Madagascar. 27 May 2026.",
    url: "https://qurbaniya.fr/en",
    locale: "en",
    type: "website",
  },
};

export default function EnHomePage() {
  return (
    <article className="max-w-3xl mx-auto px-4">
      {/* Hero */}
      <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6 text-text-primary">
        Eid al-Adha 2026 from France — <span className="text-gold">Online Qurbani</span> Service
      </h1>

      <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
        Eid al-Adha 2026 falls on <strong className="text-text-primary">Wednesday 27 May 2026</strong>. Living in France or Europe and unable to perform the sacrifice yourself? Qurbaniya delegates the sacrifice in your name under sheikh supervision in Madagascar, sends you personal video proof via WhatsApp, and distributes the meat to families in need.
      </p>

      {/* 3 key bullets */}
      <div className="space-y-5 mb-10">
        <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2 font-inter">1 — Delegation is permissible</h2>
          <p className="text-text-muted leading-relaxed">
            Delegating the Eid sacrifice (tawkil) is valid according to all four major Sunni schools (Hanafi, Maliki, Shafi&apos;i, Hanbali). The Prophet (peace be upon him) himself delegated part of his sacrifice to Ali (may Allah be pleased with him).
          </p>
        </div>

        <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2 font-inter">2 — Documented execution</h2>
          <p className="text-text-muted leading-relaxed">
            The sacrifice is performed under sheikh supervision, in your full name, on the day of Eid. You receive a personal video via WhatsApp as proof of completion.
          </p>
        </div>

        <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-2 font-inter">3 — Charitable distribution</h2>
          <p className="text-text-muted leading-relaxed">
            The meat is distributed to families in need in Madagascar, in the true spirit of qurbani and sadaqah.
          </p>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center mb-10">
        <p className="text-white/80 text-sm uppercase tracking-wider mb-2 font-inter">All-inclusive price</p>
        <p className="text-white text-4xl font-black mb-4 font-playfair">€140</p>
        <p className="text-white/70 text-sm mb-5 font-inter">
          Sunnah-compliant sheep · Sheikh supervision · Personal video · Charitable distribution
        </p>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          Book My Qurbani Now <ArrowRight size={14} />
        </Link>
      </div>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary mb-5">Frequently Asked Questions</h2>

        <div className="space-y-5">
          <div>
            <h3 className="font-bold text-text-primary mb-2">When is Eid al-Adha 2026?</h3>
            <p className="text-text-muted leading-relaxed">
              Wednesday 27 May 2026 (10 Dhul Hijjah 1447). The sacrifice is valid from 27 to 30 May 2026 inclusive (Eid day + three tashriq days).
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">Is delegating the qurbani permissible?</h3>
            <p className="text-text-muted leading-relaxed">
              Yes, by consensus of the four Sunni schools of jurisprudence. The Prophet (peace be upon him) delegated the completion of his hady sacrifices to Ali (may Allah be pleased with him).
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">How will I know my sacrifice was performed?</h3>
            <p className="text-text-muted leading-relaxed">
              On the day of Eid, you receive a personal video via WhatsApp showing the sacrifice with your full name announced at the moment of intention.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">Where is the meat distributed?</h3>
            <p className="text-text-muted leading-relaxed">
              The meat is distributed to families in need in Madagascar by our local team.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-2">By when should I book?</h3>
            <p className="text-text-muted leading-relaxed">
              Bookings close automatically on 27 May 2026 at 06:00 (Paris time). We recommend booking at least 7-15 days in advance to guarantee your sacrifice as places are limited.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-center">
        <h3 className="text-white font-bold text-lg mb-3 font-playfair">
          Don&apos;t wait — places are limited
        </h3>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          Book My Qurbani Now <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
