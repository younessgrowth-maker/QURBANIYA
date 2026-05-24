import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Tabaski 2026 desde Francia: 27 de mayo · Sacrificio halal por 140€ 🐑",
  description:
    "Tabaski 2026 confirmado el miércoles 27 de mayo. ¿Diáspora africana en Francia o España? Sacrificio halal delegado, vídeo personalizado, distribución a familias necesitadas. 140€ todo incluido.",
  keywords: [
    "tabaski 2026",
    "tabaski 2026 francia",
    "fecha tabaski 2026",
    "tabaski delegar",
    "tabaski desde francia",
    "sacrificio halal online",
    "qurbani online 2026",
    "fiesta del cordero 2026",
    "tabaski senegal mali",
    "tabaski diaspora",
    "eid al-adha 2026 españa",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/es/blog/tabaski-2026-francia",
    languages: blogHreflangAlternates("tabaski-2026-france"),
  },
  openGraph: {
    title: "🐑 Tabaski 2026 — 27 de mayo · Sacrificio halal delegado desde Francia",
    description:
      "¿Diáspora africana en Francia para el Tabaski 2026? Sacrificio halal delegado, vídeo personalizado, distribución a familias. 140€ todo incluido.",
    url: "https://qurbaniya.fr/es/blog/tabaski-2026-francia",
    type: "article",
    locale: "es",
    publishedTime: "2026-05-11T00:00:00Z",
    modifiedTime: "2026-05-25T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tabaski 2026 desde Francia: delegar el sacrificio desde la diáspora",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-11",
    dateModified: "2026-05-25",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/es/blog/tabaski-2026-francia",
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
        name: "¿Cuál es la fecha del Tabaski 2026 en Francia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El Tabaski 2026 (Eid al-Adha, fiesta del sacrificio) cae el miércoles 27 de mayo de 2026 en Francia, correspondiente al 10 de Dhul Hiyya 1447 del calendario hégira. La misma fecha se observa en Senegal, Malí, Costa de Marfil y Guinea, a veces desplazada un día según la observación local del creciente lunar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Tabaski y Eid al-Adha son la misma fiesta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Tabaski es el nombre utilizado en África Occidental francófona (Senegal, Malí, Costa de Marfil, Guinea, Burkina Faso). Eid al-Adha es el nombre árabe oficial. Eid el-Kébir se usa en el Magreb. Todas designan la misma celebración: el sacrificio ritual el 10 de Dhul Hiyya, en conmemoración del profeta Ibrahim (la paz sea con él).",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo celebrar el Tabaski desde Francia si no puedo volver al país?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. La delegación del sacrificio (tawkil) es perfectamente válida según las cuatro escuelas jurídicas sunitas. Puedes delegar tu sacrificio a un servicio de confianza que lo realiza en tu nombre, conforme a las reglas de la Sunnah. Recibes una prueba en vídeo personalizada y la carne se distribuye a familias necesitadas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto cuesta delegar el sacrificio para el Tabaski 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En Qurbaniya, delegar el sacrificio para el Tabaski 2026 cuesta 140€ todo incluido: cordero conforme a la Sunnah, sacrificio supervisado por un sheij, vídeo personalizado enviado por WhatsApp y distribución caritativa a familias necesitadas en Madagascar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Hasta qué fecha debo reservar para el Tabaski 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Las reservas cierran el 27 de mayo de 2026 a las 03:00 (hora de París), unas horas antes del sacrificio del día del Tabaski. Para asegurar tu sacrificio y la calidad del servicio, se recomienda encarecidamente reservar con al menos 7 a 15 días de antelación, ya que las plazas son limitadas.",
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

export default function ArticleTabaski() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Inicio", url: "https://qurbaniya.fr/es" },
        { name: "Blog", url: "https://qurbaniya.fr/es/blog" },
        { name: "Tabaski 2026 Francia", url: "https://qurbaniya.fr/es/blog/tabaski-2026-francia" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/es" className="hover:text-gold transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/es/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Tabaski 2026 Francia</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="tabaski-2026-france"
          currentLocale="es"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Guía</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Publicado el 11 de mayo de 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min de lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Tabaski 2026 desde Francia: delegar el sacrificio desde la diáspora — <span className="text-gold">miércoles 27 de mayo</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          El <strong className="text-text-primary">Tabaski 2026</strong> cae el <strong className="text-text-primary">miércoles 27 de mayo de 2026</strong>. ¿Vives en Francia y no puedes volver al país este año? La delegación del sacrificio es una solución reconocida por las cuatro escuelas jurídicas del islam: tu sacrificio se realiza en tu nombre, conforme a la Sunnah, y la carne alimenta a familias necesitadas.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Fecha del Tabaski 2026 en Francia</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El <strong className="text-text-primary">Tabaski 2026</strong> se celebra el <strong className="text-text-primary">miércoles 27 de mayo de 2026</strong> en Francia, correspondiente al 10 de Dhul Hiyya 1447 del calendario hégira. La misma fecha se observa en casi todos los países de África Occidental (Senegal, Malí, Costa de Marfil, Guinea, Burkina Faso), a veces con un día de desfase según la observación local del creciente lunar.
            </p>
            <p className="text-text-muted leading-relaxed">
              El sacrificio puede realizarse del 27 al 30 de mayo de 2026 inclusive (día del Eid + tres días de tashriq).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Tabaski, Eid al-Adha, fiesta del cordero: es lo mismo</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Según tu origen o tu país, oirás varios nombres que designan la misma celebración:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li><strong className="text-text-primary">Tabaski</strong> — Senegal, Malí, Costa de Marfil, Guinea, Burkina Faso, Mauritania.</li>
              <li><strong className="text-text-primary">Eid al-Adha</strong> (عيد الأضحى) — nombre árabe oficial, «fiesta del sacrificio».</li>
              <li><strong className="text-text-primary">Eid el-Kébir</strong> — Magreb (Marruecos, Argelia, Túnez), «la gran fiesta».</li>
              <li><strong className="text-text-primary">Fiesta del cordero</strong> — denominación habitual en español y francés.</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              Todos estos nombres remiten a la misma festividad religiosa: la conmemoración del sacrificio del profeta Ibrahim (la paz sea con él), celebrada cada año el 10 de Dhul Hiyya.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Por qué tantas familias africanas francófonas delegan su sacrificio desde Francia</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Cada año, en el Tabaski, miles de senegaleses, malienses, marfileños, guineanos y burkineses que viven en Francia (y en España) se enfrentan al mismo dilema: <strong className="text-text-primary">cumplir con el deber religioso del sacrificio sin poder volver al país</strong>.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Varias razones concretas explican esta elección:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li>• <strong className="text-text-primary">Imposibilidad de viajar</strong> — empleo, estudios, situación administrativa, cargas familiares.</li>
              <li>• <strong className="text-text-primary">Precio elevado del cordero en el país</strong> — los precios en Dakar, Bamako o Abiyán se disparan cuando se acerca el Tabaski.</li>
              <li>• <strong className="text-text-primary">Dificultad logística en Francia</strong> — pocos mataderos disponibles, plazas saturadas, trámites administrativos complejos.</li>
              <li>• <strong className="text-text-primary">Voluntad de actuar caritativamente</strong> — la carne del sacrificio alimenta directamente a familias necesitadas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Cómo funciona la delegación del sacrificio (tawkil)?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              La <em>tawkil</em> — delegación del sacrificio — es una práctica reconocida por <strong className="text-text-primary">las cuatro escuelas jurídicas sunitas</strong> (hanafí, maliquí, chafií, hanbalí). Se remonta a los compañeros del Profeta (la paz sea con él), varios de los cuales delegaron su propio sacrificio.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              En la práctica, encargas a un servicio de confianza que realiza el sacrificio en tu nombre el día del Tabaski, respetando estrictamente las normas religiosas. Después recibes una <strong className="text-text-primary">prueba en vídeo personalizada</strong> y la carne se distribuye a familias necesitadas.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Condiciones de validez (recordatorio)</h3>
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li>• Intención sincera (<em>niyyah</em>) en nombre del mandante</li>
                <li>• Animal sano, conforme a la edad requerida</li>
                <li>• Degüello realizado por un musulmán, según las reglas de la Sunnah</li>
                <li>• Sacrificio efectuado entre el 27 y el 30 de mayo de 2026 (días válidos)</li>
                <li>• Distribución de la carne, tradicionalmente repartida en tres (familia, allegados, necesitados)</li>
              </ul>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Tabaski 2026 — Reserva tu sacrificio en unos clics
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Conforme a la Sunnah · Vídeo personalizado · Distribución a familias necesitadas · 140€ todo incluido
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Reservar mi sacrificio <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Qurbaniya para el Tabaski 2026: lo que hacemos por ti</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Nuestro servicio está diseñado para las familias africanas francófonas instaladas en Francia (y en toda Europa) que desean cumplir con su sacrificio sin complicaciones logísticas:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">Reserva en línea</strong> — en 2 minutos, pago seguro con Stripe. Indicas el nombre completo de la persona en cuyo nombre se realiza el sacrificio.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Sacrificio supervisado por un sheij</strong> — el día del Tabaski, tu cordero es degollado conforme a la Sunnah, pronunciando tu nombre en el momento de la intención.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">Prueba en vídeo por WhatsApp</strong> — recibes un vídeo personalizado que confirma la ejecución.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">4</span>
                <span><strong className="text-text-primary">Distribución caritativa en Madagascar</strong> — la carne alimenta a familias necesitadas, fiel al espíritu del sacrificio.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Cuánto cuesta la delegación para el Tabaski 2026?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              La tarifa única de Qurbaniya es de <strong className="text-text-primary">140€ todo incluido</strong>. Este precio incluye:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1">
              <li>• La compra del cordero (conforme a la edad y la salud exigidas)</li>
              <li>• El sacrificio supervisado por un sheij</li>
              <li>• La preparación y la distribución de la carne a familias necesitadas</li>
              <li>• El vídeo personalizado como prueba</li>
              <li>• Sin gastos ocultos, sin suplementos</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              Como recordatorio, el precio de un cordero de Tabaski en Senegal o Malí puede superar los 250.000 FCFA (≈ 380€) al acercarse la fiesta. Consulta nuestra <Link href="/es/blog/precio-cordero-francia-2026" className="text-gold hover:underline">guía completa de precios del cordero en Francia 2026</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Antes de qué fecha hay que reservar?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Las reservas se cierran automáticamente el <strong className="text-text-primary">27 de mayo de 2026 a las 03:00 (hora de París)</strong>, unas horas antes del sacrificio del día del Tabaski. Pero no esperes: las plazas son limitadas y se agotan rápido a medida que se acerca la fiesta. Recomendamos reservar con un mínimo de 7 a 15 días de antelación para asegurar tu sacrificio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Para ir más allá</h2>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li>• <Link href="/es/blog/fecha-eid-al-adha-2026" className="text-gold hover:underline">Fecha completa del Eid al-Adha / Tabaski 2026 (día de Arafa, tashriq)</Link></li>
              <li>• <Link href="/es/blog/qurbani-online-como-funciona" className="text-gold hover:underline">¿Cómo funciona el sacrificio en línea?</Link></li>
              <li>• <Link href="/es/blog/cuanto-cuesta-cordero-eid-2026-francia" className="text-gold hover:underline">¿Cuánto cuesta un cordero para el Tabaski / Eid en Francia?</Link></li>
              <li>• <Link href="/faq" className="text-gold hover:underline">Todas las preguntas frecuentes sobre la delegación del sacrificio</Link></li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="tabaski-2026-france"
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
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Reservar mi sacrificio <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
