import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";
import { AID_DATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "🌙 Cuenta regresiva Eid al-Adha 2026: ¿Cuántos días faltan?",
  description:
    "📅 El Eid al-Adha 2026 cae el miércoles 27 de mayo de 2026 en Francia. ¿Cuántos días faltan para Eid? Calendario completo (Arafah, tashriq) y cómo reservar tu sacrificio antes del cierre 🐑",
  keywords: [
    "cuenta regresiva eid al adha 2026",
    "cuántos días faltan para eid",
    "cuántos días faltan para eid al adha 2026",
    "cuándo es eid 2026",
    "cuándo es eid al adha 2026",
    "fecha eid al adha 2026",
    "27 mayo 2026 eid",
    "eid mayo 2026",
    "días para eid 2026",
    "fiesta del sacrificio 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/es/blog/eid-al-adha-2026-cuenta-regresiva",
    languages: blogHreflangAlternates("aid-al-adha-2026-dans-combien-de-jours"),
  },
  openGraph: {
    title: "🌙 Cuenta regresiva Eid al-Adha 2026: ¿Cuántos días faltan?",
    description:
      "Miércoles 27 de mayo de 2026. Cuenta regresiva, calendario completo y cómo reservar tu sacrificio 🐑",
    url: "https://qurbaniya.fr/es/blog/eid-al-adha-2026-cuenta-regresiva",
    type: "article",
    locale: "es",
    publishedTime: "2026-05-12T00:00:00Z",
    modifiedTime: "2026-05-12T00:00:00Z",
  },
};

// Revalidate every 6 hours so the countdown stays close to real
export const revalidate = 21600;

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Cuenta regresiva Eid al-Adha 2026: ¿Cuántos días faltan?",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/es/blog/eid-al-adha-2026-cuenta-regresiva",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleFaqJsonLd(daysLeft: number) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuántos días faltan para el Eid al-Adha 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `El Eid al-Adha 2026 cae el miércoles 27 de mayo de 2026 en Francia. ${daysLeft === 1 ? "Falta" : "Faltan"} ${daysLeft} día${daysLeft > 1 ? "s" : ""} para la Fiesta del Sacrificio (10 de Dhul Hijjah 1447).`,
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo es el Eid al-Adha en 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El Eid al-Adha 2026 (Eid el-Kebir, Tabaski) se celebra el miércoles 27 de mayo de 2026 en Francia. El día de Arafah es el martes 26 de mayo, y los días de tashriq van del jueves 28 al sábado 30 de mayo de 2026.",
        },
      },
      {
        "@type": "Question",
        name: "¿Hasta cuándo puedo reservar un sacrificio para el Eid 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Las reservas de Qurbaniya para el Eid 2026 cierran el 27 de mayo de 2026 a las 03:00 (hora de París), unas horas antes del sacrificio. ${daysLeft === 1 ? "Falta" : "Faltan"} ${daysLeft} día${daysLeft > 1 ? "s" : ""} para reservar, pero las plazas son limitadas: recomendamos no esperar.`,
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

export default function ArticleCountdown() {
  const now = new Date();
  const aid = new Date(AID_DATE);
  const msPerDay = 86_400_000;
  const daysLeft = Math.max(
    0,
    Math.ceil((aid.getTime() - now.getTime()) / msPerDay)
  );
  const aidPassed = daysLeft === 0;

  return (
    <>
      <ArticleJsonLd />
      {ArticleFaqJsonLd(daysLeft)}
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://qurbaniya.fr/es" },
          { name: "Blog", url: "https://qurbaniya.fr/es/blog" },
          {
            name: "Cuenta regresiva Eid al-Adha 2026",
            url: "https://qurbaniya.fr/es/blog/eid-al-adha-2026-cuenta-regresiva",
          },
        ]}
      />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/es" className="hover:text-gold transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/es/blog" className="hover:text-gold transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-text-primary">Cuenta regresiva Eid al-Adha 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="aid-al-adha-2026-dans-combien-de-jours"
          currentLocale="es"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
            Cuenta regresiva
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Actualización automática
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 4 min de lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Eid al-Adha 2026: <span className="text-gold">¿cuántos días faltan</span>?
        </h1>

        {/* Big countdown box */}
        {aidPassed ? (
          <div className="bg-bg-secondary border-2 border-gold rounded-card p-6 md:p-8 text-center mb-8">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-2 font-inter">
              El Eid al-Adha 2026 ya pasó
            </p>
            <p className="text-text-primary font-bold text-lg">
              La próxima edición (Eid 2027) será alrededor del 16 de mayo de 2027 según los cálculos astronómicos.
            </p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-bg-secondary border-2 border-gold rounded-card p-6 md:p-10 text-center mb-8">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-3 font-inter">
              Faltan exactamente
            </p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-6xl md:text-8xl font-black text-gold leading-none">
                {daysLeft}
              </span>
              <span className="text-2xl md:text-3xl font-bold text-text-primary">
                día{daysLeft > 1 ? "s" : ""}
              </span>
            </div>
            <p className="text-text-muted leading-relaxed mb-1">
              para el Eid al-Adha 2026
            </p>
            <p className="text-text-primary font-bold">
              📅 Miércoles 27 de mayo de 2026
            </p>
          </div>
        )}

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          El <strong className="text-text-primary">Eid al-Adha 2026</strong> — también llamado <strong className="text-text-primary">Eid el-Kebir</strong>, <strong className="text-text-primary">Tabaski</strong> o <strong className="text-text-primary">Fiesta del Sacrificio</strong> — cae el <strong className="text-text-primary">miércoles 27 de mayo de 2026</strong> en Francia. Esto corresponde al 10 de Dhul Hijjah 1447 del calendario hégira.
        </p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              📅 Calendario completo del Eid 2026
            </h2>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">26 mayo 2026</span>
                  <span>
                    <strong className="text-text-primary">Martes · Día de Arafah</strong> — Ayuno muy recomendado para los no peregrinos
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">27 mayo 2026</span>
                  <span>
                    <strong className="text-text-primary">Miércoles · Día del Eid</strong> — Oración matutina + sacrificio (Yawm an-Nahr)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">28 mayo 2026</span>
                  <span>1.er día de tashriq · el sacrificio sigue siendo válido</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">29 mayo 2026</span>
                  <span>2.º día de tashriq</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">30 mayo 2026</span>
                  <span>3.er y último día de tashriq</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ¿Por qué el 27 de mayo este año?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El Eid al-Adha se celebra cada año el <strong className="text-text-primary">10 de Dhul Hijjah</strong>, el último mes del calendario hégira. Como el calendario islámico es lunar (~354 días), la fecha del Eid avanza ~11 días cada año en el calendario gregoriano.
            </p>
            <p className="text-text-muted leading-relaxed">
              En 2026, el mes de Dhul Hijjah 1447 comienza el 17 de mayo de 2026 según los cálculos astronómicos oficiales (calendario <em>Umm al-Qura</em>). El 10 de Dhul Hijjah — día del sacrificio — cae por lo tanto el miércoles 27 de mayo de 2026.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⏳ {daysLeft === 1 ? "Falta" : "Faltan"} {daysLeft} día{daysLeft > 1 ? "s" : ""} — ¿qué hacer ahora?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Si planeas realizar el sacrificio del Eid 2026, aquí están las acciones a priorizar en orden:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span>
                  <strong className="text-text-primary">Reserva tu sacrificio</strong> — Cada año, las plazas se agotan en los últimos días. Consulta nuestra <Link href="/es/blog/precio-cordero-francia-2026" className="text-gold hover:underline">guía de precios del cordero 2026</Link>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span>
                  <strong className="text-text-primary">Prepara tus intenciones (niyyah)</strong> — Decide en nombre de quién quieres realizar el sacrificio (tú, familia, sadaqa por un ser querido).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <span>
                  <strong className="text-text-primary">Infórmate sobre la oración del Eid</strong> — Verifica el horario y el lugar con tu mezquita local (generalmente de 7 a 10 de la mañana).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <span>
                  <strong className="text-text-primary">Ayuna el día de Arafah (26 de mayo)</strong> — Sunnah muy recomendada para los no peregrinos. Según un hadiz auténtico, este ayuno expía los pecados del año pasado y del año venidero.
                </span>
              </li>
            </ol>
          </section>

          {/* CTA mid-article */}
          {!aidPassed && (
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
              <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
                {daysLeft === 1 ? "Falta" : "Faltan"} {daysLeft} día{daysLeft > 1 ? "s" : ""} — reserva antes del cierre
              </h3>
              <p className="text-white/70 text-sm mb-4 font-inter">
                Sacrificio conforme a la Sunnah · Video personal por WhatsApp · 140€ todo incluido
              </p>
              <Link
                href="/commander"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
              >
                Reservar mi sacrificio <ArrowRight size={14} />
              </Link>
            </div>
          )}

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ¿Y en los países vecinos?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              La casi totalidad de los países musulmanes observan el Eid al-Adha 2026 el <strong className="text-text-primary">miércoles 27 de mayo de 2026</strong>, siguiendo el calendario saudí <em>Umm al-Qura</em>. Pueden existir desfases de un día según el método local de observación del creciente lunar:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1">
              <li>• <strong className="text-text-primary">Francia, Bélgica, Suiza</strong>: 27 de mayo de 2026 (alineación mayoritaria)</li>
              <li>• <strong className="text-text-primary">Marruecos, Argelia, Túnez</strong>: 27 de mayo de 2026 (a veces +1 día según observación local)</li>
              <li>• <strong className="text-text-primary">Senegal, Mali, Costa de Marfil (Tabaski)</strong>: generalmente alineado</li>
              <li>• <strong className="text-text-primary">Arabia Saudí, Emiratos, Egipto</strong>: 27 de mayo de 2026 confirmado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Para ir más lejos
            </h2>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li>
                • <Link href="/es/blog/fecha-eid-al-adha-2026" className="text-gold hover:underline">Fecha completa del Eid al-Adha 2026 (día de Arafah, tashriq, horarios)</Link>
              </li>
              <li>
                • <Link href="/es/blog/precio-cordero-francia-2026" className="text-gold hover:underline">Guía de precios del cordero en Francia 2026</Link>
              </li>
              <li>
                • <Link href="/es/blog/qurbani-online-como-funciona" className="text-gold hover:underline">¿Cómo funciona el sacrificio en línea?</Link>
              </li>
              <li>
                • <Link href="/es/blog/tabaski-2026-francia" className="text-gold hover:underline">Tabaski 2026 en Francia: delegar tu sacrificio desde la metrópoli</Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="aid-al-adha-2026-dans-combien-de-jours"
          currentLocale="es"
          className="mt-12 mb-6"
        />

        {/* Bottom nav */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/es/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
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
