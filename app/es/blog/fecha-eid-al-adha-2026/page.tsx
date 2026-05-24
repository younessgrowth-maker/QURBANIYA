import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🌙 Eid al-Adha 2026: miércoles 27 de mayo · Fecha confirmada + calendario completo",
  description:
    "📅 Fecha confirmada: miércoles 27 de mayo de 2026 (10 de Dhul Hijjah). Día de Arafah 26 de mayo, días de tashriq del 28 al 30 de mayo. Horarios de oración por ciudad y cómo reservar tu qurbani antes del cierre 🐑",
  keywords: [
    "fecha eid al adha 2026",
    "eid al adha 2026",
    "cuando es eid al adha 2026",
    "27 mayo 2026 eid",
    "fiesta del cordero 2026",
    "qurbani 2026",
    "tabaski 2026",
    "días de tashriq 2026",
    "día de arafah 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/es/blog/fecha-eid-al-adha-2026",
    languages: blogHreflangAlternates("date-aid-al-adha-2026"),
  },
  openGraph: {
    title: "🌙 Eid al-Adha 2026: miércoles 27 de mayo · Calendario completo",
    description:
      "📅 Fecha confirmada: 27 de mayo de 2026. Día de Arafah 26 de mayo, tashriq del 28 al 30 de mayo. Horarios de oración por ciudad + cómo reservar tu qurbani 🐑",
    url: "https://qurbaniya.fr/es/blog/fecha-eid-al-adha-2026",
    type: "article",
    locale: "es",
    publishedTime: "2026-03-15T00:00:00Z",
    modifiedTime: "2026-05-08T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Eid al-Adha 2026: es el miércoles 27 de mayo en Francia",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-15",
    dateModified: "2026-05-08",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/es/blog/fecha-eid-al-adha-2026",
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
        name: "¿Cuál es la fecha del Eid al-Adha 2026 en Francia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El Eid al-Adha 2026 (también llamado Eid el-Kebir o Tabaski) cae el miércoles 27 de mayo de 2026 en Francia, correspondiente al 10 de Dhul Hijjah 1447 del calendario hégira.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuáles son los días de tashriq en 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los días de tashriq en 2026 son el 28, 29 y 30 de mayo. El sacrificio es válido del 27 al 30 de mayo de 2026 inclusive.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo es el Día de Arafah en 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El Día de Arafah 2026 cae el martes 26 de mayo de 2026, víspera del Eid al-Adha. El ayuno de este día se recomienda fuertemente para los no peregrinos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se puede delegar el sacrificio del Eid al-Adha?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, la delegación del sacrificio (tawkil) es válida según las cuatro escuelas jurídicas sunníes. Esta práctica se remonta a los compañeros del Profeta (la paz sea con él).",
        },
      },
      {
        "@type": "Question",
        name: "¿Por qué el Eid al-Adha también se llama Tabaski?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tabaski es el nombre que se le da al Eid al-Adha en África Occidental (Senegal, Malí, Costa de Marfil, Guinea). Se trata de la misma celebración religiosa, celebrada en la misma fecha: el 27 de mayo de 2026.",
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

export default function ArticleFechaEidAlAdha() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Inicio", url: "https://qurbaniya.fr/es" },
        { name: "Blog", url: "https://qurbaniya.fr/es/blog" },
        { name: "Fecha Eid al-Adha 2026", url: "https://qurbaniya.fr/es/blog/fecha-eid-al-adha-2026" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/es" className="hover:text-gold transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/es/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Fecha Eid al-Adha 2026</span>
        </nav>

        <LanguageSwitcher canonicalSlug="date-aid-al-adha-2026" currentLocale="es" className="mb-6" />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Guía</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Actualizado el 8 de mayo de 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 8 min de lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Eid al-Adha 2026: es el <span className="text-gold">miércoles 27 de mayo de 2026</span> en Francia
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          El Eid al-Adha 2026 — también llamado <strong className="text-text-primary">Eid el-Kebir</strong> o <strong className="text-text-primary">Tabaski</strong> — cae el <strong className="text-text-primary">miércoles 27 de mayo de 2026</strong> en Francia. Aquí tienes el calendario completo (Día de Arafah, tashriq) y todo lo que necesitas saber para preparar tu qurbani.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Cuál es la fecha del Eid al-Adha 2026?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Según los cálculos astronómicos, el Eid al-Adha 2026 está previsto para el <strong className="text-text-primary">miércoles 27 de mayo de 2026</strong> (10 de Dhul Hijjah 1447). Esta fecha corresponde al día del sacrificio (yawm an-nahr).
            </p>
            <p className="text-text-muted leading-relaxed">
              Como cada año, la fecha definitiva se confirmará mediante la observación de la luna creciente. Puede variar un día según el país.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Por qué el Eid al-Adha 2026 cae el 27 de mayo?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El Eid al-Adha se celebra el <strong className="text-text-primary">10 de Dhul Hijjah</strong>, el duodécimo y último mes del calendario hégira. Como el calendario islámico es lunar, tiene aproximadamente 354 días al año, es decir, 11 días menos que el calendario gregoriano. Por eso la fecha del Eid al-Adha avanza unos 11 días cada año en el calendario civil.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              En 2026, el mes de Dhul Hijjah 1447 comienza el <strong className="text-text-primary">17 de mayo de 2026</strong> según los cálculos astronómicos (<em>Umm al-Qura</em>, el calendario oficial saudí). Así, el 10 de Dhul Hijjah, día del sacrificio, cae el miércoles 27 de mayo de 2026.
            </p>
            <p className="text-text-muted leading-relaxed">
              Los musulmanes utilizan dos métodos para confirmar la fecha: el <strong className="text-text-primary">cálculo astronómico</strong> (usado por la mayoría de los países musulmanes) o la <strong className="text-text-primary">observación directa de la luna creciente</strong> (<em>ru&apos;yat al-hilal</em>). En Francia, la Gran Mezquita de París sigue tradicionalmente la decisión del Consejo Teológico Musulmán, que puede basarse en uno u otro método según los años.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Eid el-Kebir, Tabaski, Eid al-Adha: la misma fiesta</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Varios nombres designan la misma celebración religiosa según las regiones del mundo musulmán:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li><strong className="text-text-primary">Eid al-Adha</strong> (عيد الأضحى) — nombre árabe oficial, literalmente «fiesta del sacrificio».</li>
              <li><strong className="text-text-primary">Eid el-Kebir</strong> («la gran fiesta») — nombre común en el Magreb y Francia.</li>
              <li><strong className="text-text-primary">Tabaski</strong> — nombre utilizado en África Occidental (Senegal, Malí, Costa de Marfil, Guinea).</li>
              <li><strong className="text-text-primary">El gran Eid</strong> o <strong className="text-text-primary">el 2º Eid</strong> — en contraposición al Eid al-Fitr, que marca el final del Ramadán.</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              Sea cual sea el nombre utilizado, la fecha es la misma en todas partes: <strong className="text-text-primary">miércoles 27 de mayo de 2026</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Los días de tashriq: 28, 29 y 30 de mayo de 2026</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Los tres días siguientes al Eid son los <strong className="text-text-primary">días de tashriq</strong> (ayyam at-tashriq). El sacrificio es válido durante estos días. En concreto, tienes del 27 al 30 de mayo de 2026 para realizar tu sacrificio.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Calendario completo</h3>
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li className="flex items-center gap-2"><span className="text-gold font-bold">27 de mayo</span> — Día del Eid (Yawm an-Nahr)</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">28 de mayo</span> — 1.er día de tashriq</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">29 de mayo</span> — 2.º día de tashriq</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">30 de mayo</span> — 3.er día de tashriq (último día)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">El Día de Arafah: 26 de mayo de 2026</h2>
            <p className="text-text-muted leading-relaxed">
              La víspera del Eid, el <strong className="text-text-primary">26 de mayo de 2026</strong>, corresponde al Día de Arafah. El ayuno de este día se recomienda fuertemente para los no peregrinos. Según un hadiz auténtico, expía los pecados del año pasado y del año por venir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Cuándo rezar la oración del Eid al-Adha 2026 en Francia?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              La oración del Eid (<em>Salat al-Eid</em>) se realiza la mañana del <strong className="text-text-primary">miércoles 27 de mayo de 2026</strong>, en congregación, después de la salida del sol y antes de que el sol llegue a su cenit. Es una <em>Sunnah mu&apos;akkadah</em> (Sunnah confirmada) según la mayoría de las escuelas jurídicas.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              En la Francia metropolitana, la franja horaria de la oración se extiende aproximadamente de <strong className="text-text-primary">07:00 a 11:00</strong> según la ciudad y la estación. Las grandes mezquitas suelen organizar varias rondas entre las 07:30 y las 10:00 para absorber la afluencia. Algunos ejemplos indicativos:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>• <strong className="text-text-primary">París / Île-de-France</strong>: generalmente entre las 07:00 y las 09:00</li>
              <li>• <strong className="text-text-primary">Lyon</strong>: franjas de 07:30 a 09:30</li>
              <li>• <strong className="text-text-primary">Marsella</strong>: 07:00-09:00 según las mezquitas</li>
              <li>• <strong className="text-text-primary">Toulouse, Burdeos, Niza</strong>: variable, 07:30-10:00</li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Infórmate directamente con tu mezquita local unos 7-10 días antes del Eid, cuando se publiquen los horarios exactos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Cómo preparar bien tu sacrificio?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              No tardes en reservar tu cordero. Cada año, las existencias se agotan rápidamente al acercarse el Eid. Aquí están los pasos clave:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">Reserva pronto</strong> — Los precios suben y las plazas escasean al acercarse el Eid. Consulta nuestra <Link href="/es/blog/precio-cordero-francia-2026" className="text-gold hover:underline">guía de precios del cordero en Francia 2026</Link>.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Elige un servicio de confianza</strong> — Verifica que el sacrificio sea conforme a la Sunnah y supervisado por un imán.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">Exige una prueba</strong> — Un vídeo personalizado es la mejor garantía de que tu sacrificio se ha realizado realmente.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Se puede delegar el sacrificio?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Sí, la delegación del sacrificio (tawkil) es perfectamente válida según las cuatro escuelas jurídicas del Islam. De hecho, es la práctica de muchos compañeros del Profeta (la paz y las bendiciones sean con él).
            </p>
            <p className="text-text-muted leading-relaxed">
              Con Qurbaniya, tu sacrificio lo realiza un sheikh diplomado, conforme a la Sunnah, y recibes un vídeo personalizado como prueba.
            </p>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              El Eid se acerca — Reserva tu sacrificio
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Cordero conforme a la Sunnah · Vídeo personalizado · 140€ todo incluido
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Reservar mi sacrificio <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Las diferencias entre Eid al-Adha y Eid al-Fitr</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              No hay que confundir los dos Eids. El Eid al-Fitr marca el final del Ramadán, mientras que el Eid al-Adha conmemora el sacrificio de Ibrahim (la paz sea con él) y coincide con el peregrinaje (Hach).
            </p>
            <p className="text-text-muted leading-relaxed">
              El Eid al-Adha se considera la fiesta más grande del Islam. Es el día en que los musulmanes que tienen los medios realizan el sacrificio ritual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">La historia del Eid al-Adha: el sacrificio de Ibrahim</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El Eid al-Adha conmemora la prueba de Ibrahim (Abraham, la paz sea con él), a quien Allah le pidió en un sueño que sacrificara a su hijo. Según la tradición islámica, este hijo es <strong className="text-text-primary">Ismael</strong> (Ismaíl). Padre e hijo aceptan la orden divina con total sumisión.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              En el momento del sacrificio, Allah sustituye a Ismael por un carnero enviado del paraíso, recompensando la fe inquebrantable de Ibrahim. Es en memoria de este acto de sumisión (<em>islam</em>) que los musulmanes sacrifican cada año un animal el 10 de Dhul Hijjah.
            </p>
            <p className="text-text-muted leading-relaxed">
              El relato se menciona en el Corán (sura As-Saffat, versículos 100-111). El sacrificio del Eid no es un simple rito: es la expresión de una obediencia total a Allah y una manera de compartir con los más necesitados (la carne se divide tradicionalmente en tres partes: familia, allegados, necesitados).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">El peregrinaje del Hach 2026: calendario completo</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El Eid al-Adha se inscribe en el ciclo más amplio del <strong className="text-text-primary">Hach</strong>, el gran peregrinaje a La Meca, quinto pilar del Islam. Aquí tienes el calendario completo de 2026 (correspondencia hégira ↔ gregoriano):
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10 mb-4">
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li><strong className="text-gold">8 de Dhul Hijjah</strong> (lunes 25 de mayo de 2026) — <em>Yawm at-Tarwiyah</em>, salida de los peregrinos hacia Mina</li>
                <li><strong className="text-gold">9 de Dhul Hijjah</strong> (martes 26 de mayo de 2026) — <em>Yawm &apos;Arafa</em>, Día de Arafah (ayuno recomendado para los no peregrinos)</li>
                <li><strong className="text-gold">10 de Dhul Hijjah</strong> (miércoles 27 de mayo de 2026) — <em>Yawm an-Nahr</em>, día del sacrificio y del Eid al-Adha</li>
                <li><strong className="text-gold">11 de Dhul Hijjah</strong> (jueves 28 de mayo) — 1.er día de tashriq</li>
                <li><strong className="text-gold">12 de Dhul Hijjah</strong> (viernes 29 de mayo) — 2.º día de tashriq</li>
                <li><strong className="text-gold">13 de Dhul Hijjah</strong> (sábado 30 de mayo) — 3.er y último día de tashriq</li>
              </ul>
            </div>
            <p className="text-text-muted leading-relaxed">
              Para los peregrinos, el 9 de Dhul Hijjah (Día de Arafah) es el momento más intenso del Hach: se reúnen en el monte Arafah para invocar a Allah. Para los no peregrinos, es un día fuertemente recomendado para el ayuno.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿El Eid al-Adha cae el mismo día en todo el mundo?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">No siempre.</strong> Aunque la mayoría de los países musulmanes se alinean con la decisión saudí (método astronómico <em>Umm al-Qura</em>), pueden existir desfases de un día según el método adoptado localmente.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              En 2026, las principales zonas geográficas deberían seguir este calendario:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>• <strong className="text-text-primary">Arabia Saudí, Emiratos, Egipto, Jordania</strong>: 27 de mayo de 2026 (cálculo astronómico)</li>
              <li>• <strong className="text-text-primary">Francia, Bélgica, Suiza</strong>: 27 de mayo de 2026 (alineación con la decisión saudí por la mayoría de las federaciones)</li>
              <li>• <strong className="text-text-primary">Magreb (Marruecos, Argelia, Túnez)</strong>: 27 de mayo de 2026, a veces +1 día según la observación local de la luna</li>
              <li>• <strong className="text-text-primary">África Occidental (Tabaski)</strong>: generalmente alineado, puede desfasarse 24 horas</li>
              <li>• <strong className="text-text-primary">Indonesia, Malasia, Pakistán</strong>: 27 de mayo de 2026 previsto, a confirmar por observación local</li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              La fecha definitiva siempre se confirma la víspera (el 26 de mayo de 2026), tras la observación oficial de la luna creciente en los países que siguen este método. En Francia, la <em>Noche de la duda</em> es anunciada por las instituciones musulmanas oficiales.
            </p>
          </section>
        </div>

        <LanguageSwitcher canonicalSlug="date-aid-al-adha-2026" currentLocale="es" className="mt-12 mb-6" />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/es/blog" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Volver al blog
          </Link>
          <Link
            href="/es/blog/qurbani-online-como-funciona"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Artículo siguiente: ¿Cómo funciona? <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
