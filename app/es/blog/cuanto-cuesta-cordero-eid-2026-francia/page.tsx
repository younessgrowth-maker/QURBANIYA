import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Check, X } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "¿Cuánto cuesta un cordero para el Eid 2026 en Francia? Comparativa de las 3 opciones",
  description:
    "¿Comprar un cordero vivo, ir a un matadero o delegar online? Comparativa completa de las 3 opciones para el Eid al-Adha 2026 en Francia: criterios, costes ocultos y consejos.",
  keywords: [
    "cuánto cuesta cordero eid 2026 francia",
    "precio sacrificio eid",
    "cuánto cuesta un cordero en francia",
    "precio cordero eid francia 2026",
    "coste qurbani 2026",
    "precio cordero vivo francia",
    "precio cordero por kilo",
    "tarifa matadero cordero",
    "coste cordero eid",
    "precio cordero entero francia",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/es/blog/cuanto-cuesta-cordero-eid-2026-francia",
    languages: blogHreflangAlternates("combien-coute-mouton-aid-2026-france"),
  },
  openGraph: {
    title: "¿Cuánto cuesta un cordero para el Eid 2026 en Francia? Comparativa de las 3 opciones",
    description:
      "Cordero vivo, carnicería halal o sacrificio delegado: ¿qué opción para el Eid 2026 en Francia? Comparativa de los 3 métodos con costes reales.",
    url: "https://qurbaniya.fr/es/blog/cuanto-cuesta-cordero-eid-2026-francia",
    type: "article",
    locale: "es",
    publishedTime: "2026-05-07T00:00:00Z",
    modifiedTime: "2026-05-07T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "¿Cuánto cuesta un cordero del Eid al-Adha en Francia 2026?",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-07",
    dateModified: "2026-05-07",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/es/blog/cuanto-cuesta-cordero-eid-2026-francia",
    inLanguage: "es",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto cuesta un cordero del Eid al-Adha en Francia en 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El precio de un cordero para el Eid al-Adha 2026 en Francia varía según la fórmula elegida: 140€ para un sacrificio delegado online (todo incluido), de 200 a 280€ para un cordero listo para consumir en una carnicería halal, de 350 a 450€ para un cordero vivo comprado en una granja con matadero privado.",
        },
      },
      {
        "@type": "Question",
        name: "¿Por qué un cordero cuesta 350€ en granja y 140€ online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un cordero vivo en Francia es caro porque hay que integrar el coste de la cría local (alimentación, veterinario), el transporte, el IVA y el margen del intermediario. El sacrificio delegado online es más barato porque el animal se compra directamente en origen (a menudo en el extranjero), sin transporte vivo ni intermediarios.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuál es el precio por kilo de un cordero del Eid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El precio por kilo de canal oscila entre 12 y 18€/kg según la carnicería y la región. Un cordero con 25 kg de carne sale, por tanto, entre 300 y 450€. Este precio no incluye el sacrificio ritual ni el despiece, que normalmente se facturan aparte.",
        },
      },
      {
        "@type": "Question",
        name: "¿El precio de 140€ en Qurbaniya es todo incluido?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, 140€ incluye: compra del animal conforme a los criterios islámicos, sacrificio ritual por un jeque diplomado, vídeo personalizado por WhatsApp y distribución íntegra de la carne a familias necesitadas. Sin costes ocultos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué opción elegir: cordero vivo, carnicería u online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cordero vivo: para quienes quieren asistir al sacrificio (pero requiere un matadero homologado, sacrificar uno mismo fuera del matadero es ilegal en Francia). Carnicería halal: para llevarse la carne a casa. Online: para cumplir la obligación religiosa de forma sencilla, con prueba en vídeo y sin restricciones logísticas. La elección depende de tu prioridad: participación física vs sencillez.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticleCuantoCuestaCordero() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Inicio", url: "https://qurbaniya.fr/es" },
        { name: "Blog", url: "https://qurbaniya.fr/es/blog" },
        { name: "Cuánto cuesta un cordero 2026", url: "https://qurbaniya.fr/es/blog/cuanto-cuesta-cordero-eid-2026-francia" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/es" className="hover:text-gold transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/es/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Cuánto cuesta un cordero 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="combien-coute-mouton-aid-2026-france"
          currentLocale="es"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Comparativa de precios</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 7 de mayo de 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min de lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          ¿Cuánto cuesta un cordero del <span className="text-gold">Eid al-Adha 2026</span> en Francia?
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          El precio de un cordero para el Eid al-Adha 2026 (miércoles 27 de mayo) varía en Francia de <strong className="text-text-primary">140€ a 450€</strong> según la fórmula elegida. Aquí tienes el desglose completo para entender la diferencia, qué se incluye y cómo elegir según tu situación.
        </p>

        {/* Quick answer */}
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-5 md:p-6 mb-10">
          <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Respuesta rápida</h3>
          <ul className="space-y-2 text-text-muted text-sm font-inter">
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">Sacrificio delegado online</strong>: 140€ todo incluido (animal + sacrificio halal + vídeo + distribución)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">Cordero listo para consumir</strong> en carnicería halal: de 200 a 280€ (canal despiezada)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">Cordero vivo + matadero privado</strong>: de 350 a 450€ (animal + transporte + sacrificio)</span></li>
          </ul>
        </div>

        <div className="prose-custom space-y-8">
          {/* Section 1 — The 3 options */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Las 3 formas de tener un cordero para el Eid 2026</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              En Francia coexisten tres fórmulas principales para realizar el sacrificio del Eid. Cada una tiene un precio, restricciones y un nivel de implicación diferentes.
            </p>

            <div className="space-y-4 mt-6">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">1. Sacrificio delegado online</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">140€</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  Pides online, el sacrificio se realiza en tu nombre por un jeque diplomado y recibes un vídeo personalizado por WhatsApp. La carne se distribuye a familias necesitadas.
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">Ventaja</strong>: cero logística, conforme a la Sunnah, prueba en vídeo. <strong className="text-text-primary">Inconveniente</strong>: no recibes la carne.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">2. Cordero listo para consumir (carnicería halal)</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">200-280€</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  Pides en una carnicería halal que se encarga del sacrificio ritual. Recoges la canal despiezada (con o sin cabeza, según tus preferencias).
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">Ventaja</strong>: te quedas con la carne para tu familia. <strong className="text-text-primary">Inconveniente</strong>: la trazabilidad del nombre (niyyah) sobre el animal exacto no siempre está garantizada sin reserva explícita.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">3. Cordero vivo + matadero homologado</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">350-450€</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  Compra de un cordero vivo en granja (≈250-350€), luego transporte a un matadero homologado que practica el sacrificio ritual (≈80-150€ adicionales en costes de sacrificio y despiece).
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">Ventaja</strong>: posibilidad de asistir al sacrificio. <strong className="text-text-primary">Inconveniente</strong>: sacrificar uno mismo en casa es <strong className="text-text-primary">ilegal en Francia</strong> (sanción penal, art. R214-78 del Código Rural). El sacrificio debe realizarse obligatoriamente en un matadero homologado.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 — Why this price gap */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Por qué tanta diferencia de precio (140€ vs 450€)?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              La diferencia entre 140€ y 450€ se explica por 4 factores principales:
            </p>
            <ul className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">Coste de cría local</strong> — Un cordero criado en Francia es caro (alimentación, terreno, veterinario, normativa). A nivel internacional, el coste de cría es muy inferior.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Transporte</strong> — Trasladar un animal vivo a un matadero homologado en Francia añade fácilmente entre 30 y 80€.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">IVA e intermediarios</strong> — El IVA del 5,5% sobre la carne + margen del ganadero + margen del carnicero suman un recargo del 20 al 35% sobre el coste base.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">4</span>
                <span><strong className="text-text-primary">Modelo económico</strong> — El sacrificio delegado online mutualiza los costes (un único punto de sacrificio, varios cientos de corderos), lo que permite alcanzar los 140€ todo incluido.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 — Comparison table */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Tabla comparativa detallada</h2>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-sm font-inter min-w-[640px] mx-4 md:mx-0">
                <thead>
                  <tr className="border-b-2 border-gold/30">
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Criterio</th>
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Online (140€)</th>
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Carnicería halal (200-280€)</th>
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Vivo + matadero (350-450€)</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Conforme a la Sunnah</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Vídeo personalizado</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Te quedas con la carne</td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Distribución a necesitados</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3">Opcional</td>
                    <td className="py-3 px-3">Hay que organizarla</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Logística requerida</td>
                    <td className="py-3 px-3">Ninguna</td>
                    <td className="py-3 px-3">Recogida en carnicería</td>
                    <td className="py-3 px-3">Granja + transporte + matadero</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Plazo de reserva</td>
                    <td className="py-3 px-3">D-1</td>
                    <td className="py-3 px-3">D-7 a D-15</td>
                    <td className="py-3 px-3">D-30+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              La opción más sencilla: 140€ todo incluido
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Sacrificio conforme · Vídeo personalizado por WhatsApp · Distribución a necesitados
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Reservar mi sacrificio <ArrowRight size={14} />
            </Link>
          </div>

          {/* Section 4 — Which choice for your situation */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Qué opción elegir según tu situación?</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-text-primary mb-2">→ Quieres cumplir la obligación sencillamente, sin complicaciones</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  El sacrificio delegado online es la opción más racional: 140€, conforme a la Sunnah según las 4 escuelas jurídicas, vídeo personalizado como prueba y la carne va directamente a familias necesitadas. Sin logística, sin despiece, sin gestión de congelador.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">→ Quieres la carne para tu familia</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  La carnicería halal es la buena elección. Reserva pronto (D-7 mínimo) con un carnicero de confianza. Comprueba que la <em>tasmiyah</em> mencione tu nombre y que la trazabilidad del animal esté garantizada.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">→ Quieres asistir al sacrificio</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Solo es posible a través de un matadero homologado que acepte particulares (raro en la práctica). <strong className="text-text-primary">Sacrificar un animal uno mismo fuera del matadero es ilegal en Francia</strong>, sujeto a sanciones penales (art. R214-78 y siguientes del Código Rural). Infórmate bien antes de elegir esta opción.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 — Price per kilo */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Y el precio por kilo de cordero en Francia?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Si compras en carnicería fuera de la temporada del Eid, el precio por kilo de canal oscila entre <strong className="text-text-primary">12 y 18€/kg</strong> según la región y la calidad (cordero de pré-salé, cordero de Sisteron, cordero estándar). Un cordero del Eid pesa de media entre 20 y 30 kg de carne, lo que da un precio de 240 a 540€, sin contar el sacrificio ritual ni el despiece.
            </p>
            <p className="text-text-muted leading-relaxed">
              En temporada de Eid los precios suben entre un 10 y un 25% por la demanda. Es justamente el atractivo del sacrificio delegado online: un precio fijo (140€), reservado fuera de los picos estacionales.
            </p>
          </section>

          {/* Section 6 — Internal links */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Para profundizar</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/es/blog/precio-cordero-francia-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Precio del cordero en Francia 2026: por qué delegar es más inteligente
                </Link>
              </li>
              <li>
                <Link href="/es/blog/fecha-eid-al-adha-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Fecha del Eid al-Adha 2026: el miércoles 27 de mayo
                </Link>
              </li>
              <li>
                <Link href="/es/blog/qurbani-online-como-funciona" className="text-text-primary hover:text-gold transition-colors">
                  → Sacrificio del Eid online: ¿cómo funciona?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-primary hover:text-gold transition-colors">
                  → FAQ Eid al-Adha 2026 — sacrificio del cordero online
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="combien-coute-mouton-aid-2026-france"
          currentLocale="es"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/es/blog" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Volver al blog
          </Link>
          <Link
            href="/commander"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-2.5 rounded-xl transition-colors font-inter"
          >
            Pedir por 140€ <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
