import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Zap, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🚨 Reserva de Última Hora del Cordero del Eid 2026: 2 Minutos",
  description:
    "⏳ ¿Aún no ha reservado para el Eid 2026? Aquí cómo reservar su qurbani a último momento (D-15 a D-1) con tranquilidad. Plazos reales, opciones disponibles, lo que debe saber antes de hacer clic.",
  keywords: [
    "reserva ultima hora cordero eid 2026",
    "qurbani urgente 2026",
    "reservar cordero eid ultimo momento",
    "qurbani de ultima hora",
    "reserva cordero eid al adha 2026",
    "reserva urgente cordero eid",
    "qurbani ultima hora online",
    "reservar sacrificio eid 2026 ultima hora",
    "reserva qurbani online 2026",
    "pedido cordero eid ultima hora",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/es/blog/reserva-ultima-hora-cordero-eid-2026",
    languages: blogHreflangAlternates("reserver-mouton-aid-derniere-minute-2026"),
  },
  openGraph: {
    title: "🚨 Reserva de Última Hora del Cordero del Eid 2026: 2 Minutos",
    description:
      "⏳ Cómo reservar un sacrificio justo antes del Eid 2026. Plazos, opciones, todo lo que necesita saber 🐑",
    url: "https://qurbaniya.fr/es/blog/reserva-ultima-hora-cordero-eid-2026",
    type: "article",
    locale: "es",
    publishedTime: "2026-05-12T00:00:00Z",
    modifiedTime: "2026-05-25T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Reserva de Última Hora del Cordero del Eid 2026",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-12",
    dateModified: "2026-05-25",
    inLanguage: "es",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/es/blog/reserva-ultima-hora-cordero-eid-2026",
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
        name: "¿Puedo aún reservar un cordero para el Eid 2026 a pocos días de la fiesta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, mientras haya plazas disponibles. En Qurbaniya, las reservas permanecen abiertas hasta el miércoles 27 de mayo de 2026 a las 3 de la madrugada (hora de París), solo unas horas antes del sacrificio. Como el sacrificio se delega en Madagascar, no hay limitaciones logísticas en Francia: el pedido se valida en línea en 2 minutos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo tarda una reserva de última hora?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El formulario online tarda 2 minutos: nombre, apellido, email, número de WhatsApp, intención (para usted / familia / sadaqa), niyyah (nombre pronunciado durante el sacrificio). Pago instantáneo con tarjeta vía Stripe. Confirmación por email en menos de un minuto.",
        },
      },
      {
        "@type": "Question",
        name: "¿Existe el riesgo de agotamiento de stock justo antes del Eid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Cada año, las plazas se agotan en la última semana. El stock es limitado porque cada sacrificio se prepara físicamente con antelación en Madagascar. El contador de plazas disponibles se muestra en tiempo real en el sitio.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué pasa si reservo el día antes del Eid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El sacrificio se realiza el 27 de mayo de 2026 (día del Eid) en su nombre, igual que para los pedidos anteriores. Recibirá el video personalizado en las 24 horas siguientes vía WhatsApp.",
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

export default function ArticleReservaUltimaHora() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://qurbaniya.fr/es" },
          { name: "Blog", url: "https://qurbaniya.fr/es/blog" },
          {
            name: "Reserva de última hora",
            url: "https://qurbaniya.fr/es/blog/reserva-ultima-hora-cordero-eid-2026",
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
          <span className="text-text-primary">Reserva de última hora</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="reserver-mouton-aid-derniere-minute-2026"
          currentLocale="es"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-urgency bg-urgency/10 px-2.5 py-1 rounded-full font-inter flex items-center gap-1">
            <Zap size={11} className="fill-current" /> Urgente
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Publicado el 12 de mayo de 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 5 min de lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Reserve su cordero del Eid 2026 a <span className="text-gold">última hora</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          El Eid al-Adha 2026 cae en <strong className="text-text-primary">menos de dos semanas</strong> (miércoles 27 de mayo de 2026). Si aún no ha reservado su sacrificio, aquí está la guía completa para hacerlo <strong className="text-text-primary">rápido</strong>, <strong className="text-text-primary">correctamente</strong>, y <strong className="text-text-primary">en plena conformidad religiosa</strong>.
        </p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⏳ Sí, aún es posible
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Contrariamente a la creencia popular, reservar su cordero en la última semana — incluso la misma noche anterior al Eid — es totalmente posible <strong className="text-text-primary">mientras haya plazas disponibles</strong>. En Qurbaniya, el contador en tiempo real de la página de inicio muestra el stock disponible. Las reservas se cierran automáticamente el <strong className="text-text-primary">27 de mayo de 2026 a las 3 de la madrugada</strong> (hora de París), unas horas antes del sacrificio.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold">
              <p className="text-text-muted leading-relaxed text-sm">
                <strong className="text-text-primary">A tener en cuenta:</strong> cada año, las últimas 30-40 plazas se agotan en las 48 horas previas al Eid. Si ve el contador caer por debajo de 20, no espere.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⚡ El proceso de reserva en 2 minutos
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El proceso es intencionalmente corto porque la mayoría de las reservas se hacen desde el móvil — desde el trabajo, el metro o la hora del almuerzo:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span>
                  <strong className="text-text-primary">Rellenar el formulario</strong> — nombre, apellido, email, número de WhatsApp (para recibir el video), intención (para usted, su familia o sadaqa), niyyah (nombre pronunciado durante el sacrificio).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span>
                  <strong className="text-text-primary">Pago con tarjeta</strong> — 140 € todo incluido vía Stripe seguro (Visa, Mastercard, Apple Pay, Google Pay).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <span>
                  <strong className="text-text-primary">Confirmación instantánea por email</strong> — su plaza está asegurada. El sacrificio se realizará el 27 de mayo en su nombre.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <span>
                  <strong className="text-text-primary">Video personalizado en 24 horas</strong> — recibe la prueba en video por WhatsApp con su nombre pronunciado durante la <em>tasmiyah</em>.
                </span>
              </li>
            </ol>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Reserve ahora antes del cierre
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Conforme a la Sunnah · Video personalizado · Carne distribuida a familias necesitadas · 140 € todo incluido
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Reservar en 2 minutos <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ✅ Por qué la delegación sigue siendo válida a último momento
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El <em>tawkil</em> (delegación del sacrificio) es <strong className="text-text-primary">reconocido por las cuatro escuelas jurídicas sunitas</strong> (Hanafi, Maliki, Shafi&apos;i, Hanbali). Se remonta a los Compañeros del Profeta ﷺ — varios de ellos delegaron su propio sacrificio durante su vida.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Desde una perspectiva religiosa, lo que importa es:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>La intención sincera (<em>niyyah</em>) en nombre del mandante.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>Un animal conforme (edad mínima, buena salud, sin defectos).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>El sacrificio ritual realizado por un musulmán, según la Sunnah.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>El sacrificio realizado entre el 27 y el 30 de mayo de 2026 inclusive.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>La distribución de la carne (familia, allegados, personas necesitadas).</span>
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              Todo esto está garantizado por Qurbaniya, tanto si reserva 3 meses como 3 días antes del Eid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              💡 Consejos para evitar errores de última hora
            </h2>
            <ul className="space-y-3 text-text-muted font-inter text-sm">
              <li>
                <strong className="text-text-primary">📱 Prepare su tarjeta con antelación</strong> — compruebe el límite con su banco (140 € no debería ser un problema, pero algunas tarjetas prepago pueden ser rechazadas).
              </li>
              <li>
                <strong className="text-text-primary">📞 Verifique dos veces su número de WhatsApp</strong> — el video llegará allí, así que introduzca exactamente el número donde quiere recibirlo.
              </li>
              <li>
                <strong className="text-text-primary">🤲 Prepare su niyyah</strong> — decida con antelación en nombre de quién se ofrece el sacrificio (usted, su padre, su madre, su familia, sadaqa por un fallecido).
              </li>
              <li>
                <strong className="text-text-primary">💬 Guarde el número de soporte</strong> — si tiene alguna duda después de su pedido, puede escribirnos por WhatsApp y respondemos el mismo día.
              </li>
              <li>
                <strong className="text-text-primary">📧 Revise su carpeta de spam</strong> — el email de confirmación viene de <code>noreply@qurbaniya.fr</code>. A veces se filtra, no se preocupe.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              🐑 ¿Y si quiero comparar primero?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Si está sopesando comprar un cordero vivo en Francia (350-450 € + papeleo de matadero) frente a delegar online (140 € todo incluido), nuestra <Link href="/es/blog/precio-cordero-francia-2026" className="text-gold hover:underline">guía completa de precios del cordero en 2026</Link> lo cubre todo: criterios islámicos, costes ocultos, comparación de conformidad.
            </p>
            <p className="text-text-muted leading-relaxed">
              A D-15 del Eid, la mayoría de los criadores locales ya no tienen corderos disponibles o han subido sus precios. La delegación sigue siendo la opción más accesible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ❓ Preguntas frecuentes de los que reservan tarde
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  ¿El stock está realmente limitado?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Sí. Cada sacrificio corresponde a un animal preparado físicamente en Madagascar. El contador muestra las plazas restantes en tiempo real. Cuando está en 0, está en 0 — no abrimos plazas adicionales.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  ¿Puedo hacer el pedido para otra persona?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Sí, en modo «regalo» durante el pago: indique el nombre del beneficiario, paga, y la confirmación se puede enviar a su destinatario si lo desea.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  ¿Qué pasa si reservo el 27 de mayo a las 2:59 de la madrugada?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Su pedido es aceptado si es validado y pagado antes de las 3:00. A las 3:00 exactas, la API rechaza cualquier nuevo pedido para 2026, y abriremos las reservas del Eid 2027 a principios del año que viene.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  Después del pago, ¿ya está todo listo?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Sí. No hay nada más que hacer. Un email de confirmación, un recordatorio a D-7, y el video personalizado llega en las 24 horas siguientes al 27 de mayo. Puede concentrarse en la oración y la celebración.
                </p>
              </div>
            </div>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="reserver-mouton-aid-derniere-minute-2026"
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
