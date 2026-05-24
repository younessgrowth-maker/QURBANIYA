import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Blog — Guías de Sacrificio Eid al-Adha | Qurbaniya",
  description:
    "Guías completas sobre el sacrificio del Eid al-Adha: fechas, precios, normas islámicas, consejos prácticos. Todo lo que necesita saber antes de reservar su qurbani.",
  alternates: {
    canonical: "https://qurbaniya.fr/es/blog",
    languages: {
      "fr-FR": "https://qurbaniya.fr/blog",
      en: "https://qurbaniya.fr/en/blog",
      ar: "https://qurbaniya.fr/ar/blog",
      tr: "https://qurbaniya.fr/tr/blog",
      es: "https://qurbaniya.fr/es/blog",
    },
  },
  openGraph: {
    title: "Blog Qurbaniya — Guías de Sacrificio Eid al-Adha",
    description:
      "Guías completas sobre el sacrificio del Eid al-Adha: fechas, precios, normas, consejos.",
    url: "https://qurbaniya.fr/es/blog",
    locale: "es",
  },
};

const articles = [
  {
    slug: "dia-de-arafah-2026",
    title: "🌙 Día de Arafah 2026: Martes 26 de mayo · Ayuno, Virtudes, Du'as",
    excerpt:
      "El 9 de Dhul Hijjah 2026 cae el martes 26 de mayo. Todo sobre el ayuno de Arafah (expiación de 2 años de pecados), virtudes, du'as recomendados y su vínculo con el Eid al-Adha.",
    date: "24 mayo 2026",
    readTime: "7 min",
    category: "Guía religiosa",
  },
  {
    slug: "eid-al-adha-2026-cuenta-regresiva",
    title: "🌙 ¿Cuántos días faltan para el Eid al-Adha 2026?",
    excerpt:
      "Cuenta regresiva oficial al Eid al-Adha 2026 (miércoles 27 de mayo). Calendario completo (Arafah, tashriq), por qué el 27 de mayo y qué hacer ahora.",
    date: "12 mayo 2026",
    readTime: "4 min",
    category: "Cuenta regresiva",
  },
  {
    slug: "reserva-ultima-hora-cordero-eid-2026",
    title: "🚨 Reserva de última hora del cordero del Eid 2026",
    excerpt: "¿Aún no ha reservado? Aquí cómo pedir a último momento (D-15 a D-1) con tranquilidad. Plazos, opciones, consejos para no fallar.",
    date: "12 mayo 2026",
    readTime: "5 min",
    category: "Urgente",
  },
  {
    slug: "tabaski-2026-francia",
    title: "Tabaski 2026 en Francia: Delegar su sacrificio desde Francia",
    excerpt: "¿Lejos de su país este año para el Tabaski 2026? La delegación del sacrificio es reconocida por las 4 escuelas. Fecha, mecánica y cómo reservar desde Francia.",
    date: "11 mayo 2026",
    readTime: "7 min",
    category: "Diáspora África Occidental",
  },
  {
    slug: "cuanto-cuesta-cordero-eid-2026-francia",
    title: "¿Cuánto cuesta un cordero del Eid al-Adha 2026 en Francia?",
    excerpt: "De 140 € (en línea) a 450 €+ (vivo + matadero certificado): comparativa completa de las 3 formas de obtener un cordero para el Eid 2026 en Francia.",
    date: "7 mayo 2026",
    readTime: "7 min",
    category: "Comparativa precios",
  },
  {
    slug: "fecha-eid-al-adha-2026",
    title: "Fecha del Eid al-Adha 2026: Todo lo que necesita saber",
    excerpt: "El Eid al-Adha 2026 está previsto para el 27 de mayo. Descubra las fechas exactas, los días de tashriq y cómo preparar su sacrificio este año.",
    date: "15 marzo 2026",
    readTime: "5 min",
    category: "Guía",
  },
  {
    slug: "qurbani-online-como-funciona",
    title: "Sacrificio del Eid en línea: ¿cómo funciona?",
    excerpt: "Delegar su sacrificio en línea es conforme a la Sunnah. Aquí el proceso paso a paso, desde el pedido hasta la recepción de su video personalizado.",
    date: "10 marzo 2026",
    readTime: "7 min",
    category: "Guía práctica",
  },
  {
    slug: "precio-cordero-francia-2026",
    title: "Precio del cordero en Francia 2026: por qué delegar es más inteligente",
    excerpt: "Comparativa detallada de precios: comprar un cordero en Francia (350-400 €) vs delegar su sacrificio en línea (140 €). Las ventajas van más allá del precio.",
    date: "5 marzo 2026",
    readTime: "6 min",
    category: "Comparativa",
  },
];

export default function EsBlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://qurbaniya.fr/es" },
          { name: "Blog", url: "https://qurbaniya.fr/es/blog" },
        ]}
      />
      <div className="text-center mb-12">
        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block font-inter">
          Blog
        </span>
        <h1 className="text-3xl md:text-4xl font-black uppercase mb-4">
          GUÍAS Y <span className="text-gold">CONSEJOS</span>
        </h1>
        <p className="text-text-muted max-w-xl mx-auto">
          Todo lo que necesita saber sobre el sacrificio del Eid al-Adha, las normas islámicas y cómo preparar bien su pedido.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/es/blog/${article.slug}`}
            className="group block bg-white rounded-xl border border-gray-100 p-6 md:p-8 hover:border-gold/20 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
                <Calendar size={12} />
                {article.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
                <Clock size={12} />
                {article.readTime}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-gold transition-colors mb-3">
              {article.title}
            </h2>

            <p className="text-text-muted leading-relaxed mb-4">
              {article.excerpt}
            </p>

            <span className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm font-inter group-hover:gap-2.5 transition-all">
              Leer artículo
              <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center bg-gradient-to-r from-primary to-primary-light rounded-xl p-8 md:p-10">
        <h3 className="text-white font-bold text-xl md:text-2xl mb-3 font-playfair">
          ¿Listo para reservar su sacrificio?
        </h3>
        <p className="text-white/70 mb-6 font-inter">
          Cordero conforme a la Sunnah, video personalizado, desde 140 €.
        </p>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          Reservar mi sacrificio <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
