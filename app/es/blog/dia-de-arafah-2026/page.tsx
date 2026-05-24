import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🌙 Día de Arafah 2026: martes 26 de mayo · Ayuno, virtudes, du'as",
  description:
    "📅 El Día de Arafah 2026 cae el martes 26 de mayo (9 de Dhul Hijjah 1447). Ayuno altamente recomendado, virtudes inmensas (perdón de 2 años de pecados), du'as y vínculo con el Eid al-Adha del 27 de mayo 🐑",
  keywords: [
    "día de arafah 2026",
    "ayuno de arafah 2026",
    "9 dhul hijjah 2026",
    "duas día de arafah",
    "eid al adha 2026",
    "yawm arafah significado",
    "día de arafat 2026",
    "yawm arafa",
    "virtudes día de arafah",
    "recompensa día de arafah",
    "cómo ayunar arafah",
    "fecha arafah 2026",
    "arafah eid al adha",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/es/blog/dia-de-arafah-2026",
    languages: blogHreflangAlternates("jour-arafat-2026"),
  },
  openGraph: {
    title: "🌙 Día de Arafah 2026: martes 26 de mayo · Ayuno, virtudes, du'as",
    description:
      "📅 El Día de Arafah 2026 cae el martes 26 de mayo de 2026. Ayuno altamente recomendado, du'as y vínculo con el Eid al-Adha 🐑",
    url: "https://qurbaniya.fr/es/blog/dia-de-arafah-2026",
    type: "article",
    locale: "es",
    publishedTime: "2026-05-24T00:00:00Z",
    modifiedTime: "2026-05-24T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Día de Arafah 2026: es el martes 26 de mayo — ayuno, virtudes y du'as",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: {
        "@type": "ImageObject",
        url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg",
      },
    },
    mainEntityOfPage: "https://qurbaniya.fr/es/blog/dia-de-arafah-2026",
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
        name: "¿Cuál es la fecha del Día de Arafah en 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El Día de Arafah 2026 cae el martes 26 de mayo de 2026, correspondiente al 9 de Dhul Hijjah 1447 del calendario hégira. Es la víspera del Eid al-Adha (miércoles 27 de mayo de 2026).",
        },
      },
      {
        "@type": "Question",
        name: "¿Hay que ayunar el Día de Arafah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El ayuno del Día de Arafah es altamente recomendado (sunnah mu'akkadah, es decir, sunnah confirmada) para todos los musulmanes que no estén realizando la peregrinación. Según un hadiz auténtico transmitido por Muslim, este ayuno expía los pecados del año pasado y del año venidero. Los peregrinos del Hach, en cambio, no ayunan ese día.",
        },
      },
      {
        "@type": "Question",
        name: "¿A qué hora comienza y termina el ayuno de Arafah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El ayuno del Día de Arafah sigue las mismas reglas que cualquier ayuno islámico: desde el alba (Fajr) hasta la puesta del sol (Maghrib). En la Francia metropolitana el 26 de mayo de 2026, el alba se sitúa hacia las 4:00-4:30 y la puesta de sol hacia las 21:30-21:45 según la ciudad. Consulte los horarios de oración de su mezquita local para los horarios exactos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuál es la mejor du'a para hacer el Día de Arafah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Según el Profeta Muhammad ﷺ: «La mejor súplica es la del Día de Arafah, y las mejores palabras que he dicho yo y los profetas anteriores a mí son: La ilaha illa Allah, wahdahou la charika lah, lahou-l-moulk wa lahou-l-hamd wa houwa 'ala koulli chay'in qadir» (Tirmidhi). También se recomienda multiplicar el recuerdo de Allah (dhikr), la búsqueda de perdón (istighfar) y las súplicas personales a lo largo de todo el día.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuál es el vínculo entre el Día de Arafah y el Eid al-Adha?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El Día de Arafah es la víspera inmediata del Eid al-Adha. Es el 9 de Dhul Hijjah, el día más importante de la peregrinación del Hach: los peregrinos se reúnen en el monte Arafah para invocar a Allah. Al día siguiente (10 de Dhul Hijjah, miércoles 27 de mayo de 2026) se celebra el Eid al-Adha con el sacrificio ritual.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se puede ayunar solo el Día de Arafah sin los otros días de Dhul Hijjah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, perfectamente. El ayuno del Día de Arafah por sí solo es una sunnah completa, independiente del ayuno de los 9 primeros días de Dhul Hijjah (que también es recomendado pero facultativo). Muchos musulmanes ayunan únicamente el Día de Arafah debido a la inmensa recompensa anunciada por el Profeta ﷺ.",
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

export default function ArticleDiaDeArafah() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://qurbaniya.fr/es" },
          { name: "Blog", url: "https://qurbaniya.fr/es/blog" },
          {
            name: "Día de Arafah 2026",
            url: "https://qurbaniya.fr/es/blog/dia-de-arafah-2026",
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
          <span className="text-text-primary">Día de Arafah 2026</span>
        </nav>

        {/* Language switcher (top) */}
        <LanguageSwitcher
          canonicalSlug="jour-arafat-2026"
          currentLocale="es"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
            Guía religiosa
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Publicado el 24 de mayo de 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min de lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Día de Arafah 2026: el{" "}
          <span className="text-gold">martes 26 de mayo de 2026</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          El Día de Arafah — <em>Yawm &apos;Arafa</em>, el{" "}
          <strong className="text-text-primary">9 de Dhul Hijjah 1447</strong>{" "}
          — cae el <strong className="text-text-primary">martes 26 de mayo de 2026</strong>, víspera del Eid al-Adha. Es uno de los días más bendecidos del año islámico: el ayuno está altamente recomendado y expía los pecados de dos años. Esto es todo lo que hay que saber.
        </p>

        {/* Quick summary card */}
        <div className="bg-bg-secondary rounded-xl p-6 border border-gold/10 mb-10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">
            Lo esencial en 30 segundos
          </h2>
          <ul className="space-y-2 text-text-muted text-sm font-inter">
            <li>
              📅 <strong className="text-text-primary">Fecha:</strong> martes 26 de mayo de 2026 (9 de Dhul Hijjah 1447)
            </li>
            <li>
              🌙 <strong className="text-text-primary">Víspera de:</strong> el Eid al-Adha (miércoles 27 de mayo de 2026)
            </li>
            <li>
              🤲 <strong className="text-text-primary">Recomendado:</strong> ayunar y multiplicar las súplicas
            </li>
            <li>
              ✨ <strong className="text-text-primary">Recompensa:</strong> expiación de los pecados del año pasado y del año venidero
            </li>
            <li>
              🚫 <strong className="text-text-primary">Excepción:</strong> los peregrinos del Hach no ayunan ese día
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ¿Cuándo cae exactamente el Día de Arafah en 2026?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El Día de Arafah se celebra el{" "}
              <strong className="text-text-primary">9 de Dhul Hijjah</strong> de cada año hégira. En 2026, esto corresponde al{" "}
              <strong className="text-text-primary">martes 26 de mayo de 2026</strong> según los cálculos astronómicos adoptados por la mayoría de las federaciones musulmanas en Francia y a nivel internacional.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Esta fecha es coherente con la fecha confirmada para el Eid al-Adha (miércoles 27 de mayo de 2026), ya que Arafah siempre cae la víspera del día del sacrificio (<em>Yawm an-Nahr</em>).
            </p>
            <p className="text-text-muted leading-relaxed">
              Para los peregrinos presentes en La Meca, el 9 de Dhul Hijjah es el día de la gran estación en el{" "}
              <strong className="text-text-primary">monte Arafah</strong>, a unos 20 km de La Meca. Es el rito central del Hach: sin esta estación (<em>wuqūf</em>), la peregrinación es inválida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ¿Por qué el Día de Arafah es tan importante?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El Día de Arafah es, según muchos sabios, <strong className="text-text-primary">el mejor día del año islámico</strong>. Varios hadices auténticos subrayan su importancia excepcional:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «No hay día en el que Allah libere a tantos siervos del Fuego como en el Día de Arafah.»
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Transmitido por Muslim (n.º 1348), según &apos;Aisha رضي الله عنها
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              También fue ese día, durante la Peregrinación de la Despedida (año 10 H), cuando le fue revelado al Profeta Muhammad ﷺ el versículo que completa la religión:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «Hoy os he perfeccionado vuestra religión, he completado Mi gracia sobre vosotros y os he aprobado el Islam como religión.»
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Corán, sura Al-Ma&apos;ida (5:3)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed">
              Este versículo, descendido un viernes en el monte Arafah, marca la culminación de la revelación. El Día de Arafah lleva así una dimensión histórica, espiritual y escatológica mayor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              El ayuno del Día de Arafah: reglas y recompensa
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El ayuno del Día de Arafah es una{" "}
              <strong className="text-text-primary">sunnah mu&apos;akkadah</strong> (sunnah confirmada) para todos los musulmanes que no se encuentren en peregrinación. El Profeta ﷺ dijo:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «El ayuno del Día de Arafah, espero de Allah que expíe los pecados del año pasado y los del año venidero.»
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Transmitido por Muslim (n.º 1162), según Abu Qatada رضي الله عنه
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              En la práctica, el ayuno sigue las mismas reglas que cualquier ayuno islámico:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Inicio:</strong> con la aparición del alba (Fajr) — en Francia, el 26 de mayo de 2026, hacia las 4:00-4:30 según la ciudad
              </li>
              <li>
                • <strong className="text-text-primary">Final:</strong> con la puesta del sol (Maghrib) — hacia las 21:30-21:45 en Francia
              </li>
              <li>
                • <strong className="text-text-primary">Intención:</strong> formulada la víspera por la noche o antes del alba (<em>niyyah</em>)
              </li>
              <li>
                • <strong className="text-text-primary">Prohibido:</strong> comer, beber, fumar y las relaciones conyugales durante el día
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">Importante:</strong> los peregrinos presentes en Arafah <em>no ayunan</em> ese día, conforme a la sunnah del Profeta ﷺ, que no lo ayunó durante la Peregrinación de la Despedida. El ayuno está reservado a los no peregrinos.
            </p>
            <p className="text-text-muted leading-relaxed">
              Para las mujeres en período de menstruación o posparto, los enfermos, viajeros o personas mayores que no puedan ayunar: no hay ninguna obligación, y la recompensa de las buenas acciones del día sigue siendo accesible a través de otras vías (dhikr, sadaqa, du&apos;as).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Las du&apos;as e invocaciones recomendadas
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El Profeta ﷺ dijo:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                «La mejor súplica es la del Día de Arafah, y las mejores palabras que he dicho yo y los profetas anteriores a mí son:
              </p>
              <p className="text-text-primary font-bold mt-3 leading-relaxed">
                «La ilaha illa Allah, wahdahou la charika lah, lahou-l-moulk wa lahou-l-hamd, wa houwa &apos;ala koulli chay&apos;in qadir»
              </p>
              <p className="text-text-muted text-sm mt-2 italic">
                (No hay divinidad digna de adoración excepto Allah, único sin asociados. Suyo es el reino, suya es la alabanza, y Él es Omnipotente sobre todas las cosas.)
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Transmitido por Tirmidhi (n.º 3585)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Además de esta palabra de tawhid, se recomienda aprovechar este día para:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • Multiplicar el <strong className="text-text-primary">dhikr</strong> (Subhana Allah, Al-hamdulillah, Allahu Akbar)
              </li>
              <li>
                • Pedir el <strong className="text-text-primary">perdón (istighfar)</strong> para uno mismo, la familia y toda la comunidad
              </li>
              <li>
                • Hacer <strong className="text-text-primary">du&apos;as personales</strong> — es un día en el que las súplicas son especialmente atendidas
              </li>
              <li>
                • <strong className="text-text-primary">Leer el Corán</strong> y meditar sobre sus significados
              </li>
              <li>
                • Dar la <strong className="text-text-primary">sadaqa</strong> a los necesitados
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Muchos sabios recomiendan dedicar especialmente las horas previas a la puesta del sol a las súplicas, ya que es el momento en el que los peregrinos en Arafah están ellos mismos en plena estación de du&apos;a.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              El vínculo entre el Día de Arafah y el Eid al-Adha
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El Día de Arafah no es un acontecimiento aislado: es el <strong className="text-text-primary">preludio directo</strong> del Eid al-Adha. La secuencia de los 3 días clave:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10 mb-4">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">8 de Dhul Hijjah</span>
                  <span>
                    <strong className="text-text-primary">Lunes 25 de mayo de 2026</strong> — <em>Yawm at-Tarwiya</em>, día en que los peregrinos se dirigen a Mina
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">9 de Dhul Hijjah</span>
                  <span>
                    <strong className="text-text-primary">Martes 26 de mayo de 2026</strong> — <em>Yawm &apos;Arafa</em>, Día de Arafah (ayuno e invocaciones)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">10 de Dhul Hijjah</span>
                  <span>
                    <strong className="text-text-primary">Miércoles 27 de mayo de 2026</strong> — <em>Yawm an-Nahr</em>, Eid al-Adha y sacrificio ritual
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              El <strong className="text-text-primary">sacrificio (qurbani)</strong> es el acto central del día del Eid. Según las cuatro escuelas jurídicas sunnitas, puede ser efectuado por uno mismo o delegado a un tercero (<em>tawkil</em>) — una práctica que se remonta a los compañeros del Profeta ﷺ.
            </p>
            <p className="text-text-muted leading-relaxed">
              Si aún no ha organizado su sacrificio, el Día de Arafah es{" "}
              <strong className="text-text-primary">el último momento ideal</strong> para hacerlo — la víspera del día clave. El sacrificio es válido durante los 4 días que siguen a Arafah (27, 28, 29 y 30 de mayo de 2026), pero lo esencial es que esté organizado antes de que comience este día bendito.
            </p>
          </section>

          {/* CTA Box — central conversion bridge */}
          <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-gold/10 rounded-2xl border-2 border-gold/30 p-6 md:p-8 my-10">
            <h3 className="text-xl md:text-2xl font-black text-text-primary mb-3">
              ¿Aún no ha reservado su sacrificio para el Eid 2026?
            </h3>
            <p className="text-text-muted leading-relaxed mb-5">
              Qurbaniya organiza su sacrificio en Madagascar según las reglas de la Sunnah, con <strong className="text-text-primary">video personalizado por WhatsApp en menos de 24 h</strong>. La carne se distribuye a las familias necesitadas en el lugar.
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter mb-5">
              <li>✓ 140 € todo incluido</li>
              <li>✓ Sacrificio conforme a la Sunnah, supervisado por un jeque</li>
              <li>✓ Video personalizado enviado por WhatsApp y correo electrónico</li>
              <li>✓ Reserva abierta hasta el miércoles 27 de mayo a las 3 de la madrugada</li>
            </ul>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
            >
              Reservar mi sacrificio <ArrowRight size={16} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ¿Y después de Arafah? Los días de tashriq
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Justo después del Eid al-Adha (27 de mayo) llegan los{" "}
              <strong className="text-text-primary">días de tashriq</strong> (28, 29 y 30 de mayo de 2026). Durante estos 3 días:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • El <strong className="text-text-primary">sacrificio sigue siendo válido</strong> hasta la puesta del sol del 30 de mayo
              </li>
              <li>
                • El <strong className="text-text-primary">takbir</strong> (Allahu Akbar, Allahu Akbar, La ilaha illa Allah…) se mantiene después de cada oración obligatoria, hasta la oración del &apos;Asr del 30 de mayo incluido
              </li>
              <li>
                • El <strong className="text-text-primary">ayuno está prohibido</strong> en estos días según la mayoría de las escuelas, ya que son «días de comer, beber y evocar a Allah»
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Para profundizar en el calendario completo de Dhul Hijjah, consulte nuestro{" "}
              <Link
                href="/es/blog/fecha-eid-al-adha-2026"
                className="text-gold hover:underline font-semibold"
              >
                artículo dedicado a la fecha del Eid al-Adha 2026
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ¿Qué hacer si no puedo ayunar el Día de Arafah?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El ayuno es solo una de las muchas puertas de adoración abiertas en este día. Si está impedido de ayunar (enfermedad, viaje, menstruación, posparto, lactancia…), puede beneficiarse plenamente de la baraka del Día de Arafah a través de:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Multiplicar las súplicas</strong> personales — es el día en que son más atendidas
              </li>
              <li>
                • <strong className="text-text-primary">Dar sadaqa</strong>: donar a los necesitados, apoyar una causa religiosa
              </li>
              <li>
                • <strong className="text-text-primary">Recitar y meditar</strong> el Corán
              </li>
              <li>
                • <strong className="text-text-primary">Mantener el dhikr</strong> durante todo el día, especialmente la fórmula de tawhid
              </li>
              <li>
                • <strong className="text-text-primary">Preparar su sacrificio del Eid</strong> (qurbani) si aún no lo ha hecho — es un acto de adoración mayor en sí mismo
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              La intención sincera y el esfuerzo que ponga ese día son ellos mismos actos de adoración recompensados, cualquiera que sea la forma que adopten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Preguntas frecuentes sobre el Día de Arafah
            </h2>
            <div className="space-y-4">
              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  ¿El ayuno de Arafah es obligatorio?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  No, no es una obligación (<em>fard</em>), sino una <strong className="text-text-primary">sunnah mu&apos;akkadah</strong> (sunnah confirmada). El Profeta ﷺ animó fuertemente a este ayuno mencionando su recompensa única (expiación de los pecados de 2 años). No ayunarlo no es un pecado, pero es perderse una oportunidad espiritual excepcional.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  ¿Hay que ayunar también los 8 días anteriores a Arafah?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  El ayuno de los <strong className="text-text-primary">9 primeros días de Dhul Hijjah</strong> (del 17 al 25 de mayo de 2026 en Francia) es una sunnah según varios hadices. El Profeta ﷺ dijo que las acciones de estos 10 primeros días son las más amadas por Allah. Pero este ayuno no es condicional: se puede ayunar perfectamente solo el Día de Arafah (9 de Dhul Hijjah) si no se pueden hacer los demás.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  ¿El Día de Arafah cae el mismo día en todo el mundo?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  La <em>mayoría</em> de los países se alinean con la fecha saudí (martes 26 de mayo de 2026), ya que es el día en que los peregrinos efectúan la estación de Arafah en La Meca. Algunos países pueden desplazar la fecha un día según la observación local del creciente lunar. En Francia, la mayoría de las federaciones siguen la fecha saudí, por lo que será el martes 26 de mayo de 2026.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  ¿Qué hacer si olvido formular la intención de ayunar la víspera?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Para un ayuno supererogatorio como el de Arafah, la intención puede formularse <strong className="text-text-primary">durante el día</strong>, siempre que no haya comido ni bebido desde el alba. Es una facilidad concedida para el ayuno voluntario. Si se despierta la mañana del 26 de mayo de 2026 y aún no ha consumido nada, puede formular la intención en ese momento y comenzar el ayuno.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  ¿Cuál es la diferencia entre Arafah y la peregrinación del Hach?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  El <strong className="text-text-primary">Hach</strong> es la peregrinación completa a La Meca (5.º pilar del Islam), que se extiende a lo largo de varios días (del 8 al 13 de Dhul Hijjah). El <strong className="text-text-primary">Día de Arafah</strong> (9 de Dhul Hijjah) es <em>un día concreto</em> del Hach, considerado su rito central. Para los no peregrinos, es un día de adoración intensa mediante el ayuno y las súplicas, sin necesidad de desplazarse.
                </p>
              </details>
            </div>
          </section>
        </div>

        {/* Language switcher (bottom) */}
        <div className="mt-12">
          <LanguageSwitcher
            canonicalSlug="jour-arafat-2026"
            currentLocale="es"
            className="mb-6"
          />
        </div>

        {/* Bottom navigation */}
        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/es/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
            <ArrowLeft size={14} /> Volver al blog
          </Link>
          <Link
            href="/es/blog/fecha-eid-al-adha-2026"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Siguiente artículo: Fecha del Eid al-Adha 2026 <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
