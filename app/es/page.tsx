import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sacrificio Eid al-Adha 2026 desde Francia — Servicio Qurbani Online",
  description:
    "Delegue su sacrificio del Eid al-Adha 2026 desde Francia (miércoles 27 de mayo). Cordero sacrificado en su nombre bajo supervisión de un sheikh en Madagascar, prueba en video por WhatsApp, carne distribuida a familias necesitadas. 140 € todo incluido.",
  keywords: [
    "eid al adha 2026 francia",
    "qurbani 2026",
    "servicio qurbani online",
    "sacrificio cordero eid 2026",
    "qurban eid 2026 españa",
    "delegar sacrificio eid",
    "cordero sacrificio online",
    "qurbani francia",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/es",
    languages: {
      "fr-FR": "https://qurbaniya.fr",
      en: "https://qurbaniya.fr/en",
      ar: "https://qurbaniya.fr/ar",
      tr: "https://qurbaniya.fr/tr",
      es: "https://qurbaniya.fr/es",
    },
  },
  openGraph: {
    title: "Eid al-Adha 2026 — Servicio Qurbani Online desde Francia",
    description:
      "Delegue su sacrificio del Eid al-Adha 2026: supervisión de sheikh, prueba en video personal, distribución de carne en Madagascar. 27 de mayo de 2026.",
    url: "https://qurbaniya.fr/es",
    locale: "es",
    type: "website",
  },
};

export default function EsHomePage() {
  return (
    <article className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6 text-text-primary">
        Eid al-Adha 2026 desde Francia — Servicio{" "}
        <span className="text-gold">Qurbani Online</span>
      </h1>

      <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
        El Eid al-Adha 2026 cae el{" "}
        <strong className="text-text-primary">miércoles 27 de mayo de 2026</strong>.
        ¿Vive en Francia o Europa y no puede realizar el sacrificio usted mismo?
        Qurbaniya delega el sacrificio en su nombre bajo supervisión de un
        sheikh en Madagascar, le envía pruebas personales en video vía WhatsApp,
        y distribuye la carne a familias necesitadas.
      </p>

      <ul className="space-y-3 text-text-muted mb-10">
        <li className="flex items-start gap-3">
          <span className="text-gold font-bold mt-0.5">✓</span>
          <span>
            <strong className="text-text-primary">Conforme a la Sunnah</strong>{" "}
            — animal cualificado, ritual realizado por un sheikh certificado.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-gold font-bold mt-0.5">✓</span>
          <span>
            <strong className="text-text-primary">Prueba personal en video</strong>{" "}
            enviada por WhatsApp en 24 horas, su nombre pronunciado durante el
            sacrificio.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-gold font-bold mt-0.5">✓</span>
          <span>
            <strong className="text-text-primary">Carne distribuida</strong> a
            familias necesitadas en Madagascar — cumple completamente con su
            obligación religiosa.
          </span>
        </li>
      </ul>

      <div className="bg-bg-secondary rounded-card p-6 md:p-8 border border-gold/20 mb-10">
        <p className="text-text-muted leading-relaxed mb-5">
          <strong className="text-text-primary">140 € todo incluido.</strong>{" "}
          Reserva en 2 minutos, pago por tarjeta seguro vía Stripe.
        </p>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
        >
          Reservar mi sacrificio <ArrowRight size={16} />
        </Link>
      </div>

      <p className="text-sm text-text-muted-light italic">
        Servicio operado desde Francia (SIRET registrado), entregado en
        Madagascar bajo supervisión religiosa.
      </p>
    </article>
  );
}
