import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Qurbani online: ¿cómo funciona realmente?",
  description:
    "Guía completa para delegar tu sacrificio del Eid al-Adha por internet. Proceso paso a paso, conformidad islámica, video personalizado. Todo lo que necesitas saber.",
  keywords: [
    "qurbani online 2026",
    "delegar sacrificio eid",
    "cómo funciona qurbani online",
    "sacrificio cordero online",
    "sacrificio eid al adha online",
    "tawkil sacrificio",
    "servicio qurbani españa",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/es/blog/qurbani-online-como-funciona",
    languages: blogHreflangAlternates("sacrifice-aid-en-ligne-comment-ca-marche"),
  },
  openGraph: {
    title: "Qurbani online: ¿cómo funciona realmente?",
    description:
      "Guía completa para delegar tu sacrificio del Eid por internet. Proceso, conformidad, video.",
    url: "https://qurbaniya.fr/es/blog/qurbani-online-como-funciona",
    type: "article",
    locale: "es",
    publishedTime: "2026-03-10T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Qurbani online: ¿cómo funciona realmente?",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-10",
    dateModified: "2026-03-10",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/es/blog/qurbani-online-como-funciona",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticleQurbaniOnlineEs() {
  return (
    <>
      <ArticleJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Inicio", url: "https://qurbaniya.fr/es" },
        { name: "Blog", url: "https://qurbaniya.fr/es/blog" },
        { name: "Qurbani online", url: "https://qurbaniya.fr/es/blog/qurbani-online-como-funciona" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/es" className="hover:text-gold transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/es/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Qurbani online</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="sacrifice-aid-en-ligne-comment-ca-marche"
          currentLocale="es"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Guía práctica</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 10 de marzo de 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min de lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Qurbani online: <span className="text-gold">¿cómo funciona realmente?</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          Cada vez más musulmanes en Europa eligen delegar su sacrificio del Eid al-Adha por internet. Pero ¿es realmente conforme a la Sunnah? ¿Cómo funciona en la práctica? Esta guía responde a todas tus preguntas.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Es válida la delegación del sacrificio en el Islam?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Sí, totalmente. La delegación del sacrificio (llamada <strong className="text-text-primary">tawkil</strong>) está reconocida unánimemente como válida por las cuatro escuelas jurídicas del Islam (hanafí, malikí, shafií y hanbalí).
            </p>
            <p className="text-text-muted leading-relaxed">
              El Profeta ﷺ delegó él mismo algunos sacrificios. Ali ibn Abi Talib (que Allah esté complacido con él) fue encargado de supervisar el resto de los sacrificios durante la Peregrinación de la Despedida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">El proceso en 4 pasos sencillos</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Realizas el pedido online", desc: "Elige el tipo de sacrificio (Qurbani, Aqiqa, Sadaqa), indica el nombre por el que se hará el sacrificio y paga con total seguridad." },
                { step: "2", title: "Tu cordero queda reservado", desc: "Se selecciona y reserva en tu nombre un cordero que cumple los criterios islámicos (edad, salud, ausencia de defectos)." },
                { step: "3", title: "El sacrificio se realiza el día del Eid", desc: "El día del Eid, un sheikh cualificado ejecuta el sacrificio según las reglas de la Sunnah: orientación hacia la Qibla, mención del nombre de Allah y de tu nombre, método conforme." },
                { step: "4", title: "Recibes tu video personalizado", desc: "Un video con tu nombre del sacrificio se envía por WhatsApp en menos de 24 horas. La carne se distribuye íntegramente entre familias necesitadas." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-bg-secondary rounded-xl p-5 border border-gold/10">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white font-bold flex items-center justify-center font-inter">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-text-primary font-bold mb-1">{item.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Las condiciones de conformidad con la Sunnah</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Para que un sacrificio sea válido, deben cumplirse varias condiciones. En Qurbaniya, cada punto se verifica con rigor:
            </p>
            <ul className="space-y-2">
              {[
                "El animal debe tener la edad requerida (mínimo 1 año en el caso del cordero)",
                "El animal debe estar libre de defectos aparentes",
                "El sacrificio debe realizarse durante el periodo válido (del 10 al 13 de Dhul Hijjah)",
                "El sacrificador debe pronunciar el nombre de Allah (Bismillah, Allahu Akbar)",
                "Debe pronunciarse el nombre de la persona por la que se realiza el sacrificio",
                "El animal debe estar orientado hacia la Qibla",
                "El método debe ser rápido y respetuoso con el animal",
              ].map((condition, i) => (
                <li key={i} className="flex items-start gap-2 text-text-muted text-sm font-inter">
                  <Check size={16} className="text-emerald flex-shrink-0 mt-0.5" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Un sacrificio conforme, sencillo y transparente
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Sheikh cualificado · Video personalizado · Carne distribuida · 140€
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Reservar mi qurbani <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Por qué delegar en lugar de hacerlo uno mismo?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              En Europa, organizar tu propio sacrificio es cada vez más complicado: normas sanitarias estrictas, mataderos saturados durante el Eid, costes elevados (350–400€ de media) y la logística del transporte y la conservación de la carne.
            </p>
            <p className="text-text-muted leading-relaxed">
              Delegar tu qurbani te permite cumplir esta obligación religiosa con la intención (niyyah) adecuada, conforme a la Sunnah, a un coste menor y con un impacto social directo: la carne se reparte a familias necesitadas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">El video personalizado: tu prueba del sacrificio</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Esto es lo que distingue un servicio serio de uno dudoso. En Qurbaniya, cada sacrificio se filma de forma individual. El video muestra:
            </p>
            <ul className="space-y-2 text-text-muted text-sm font-inter">
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> La mención de tu nombre antes del sacrificio</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> El sacrificio realizado según las reglas</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> La distribución de la carne entre las familias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {[
                { q: "¿Puedo encargar el sacrificio para otra persona?", a: "Sí, puedes indicar el nombre de cualquier persona al hacer el pedido. El sacrificio se realizará en su nombre con la intención adecuada." },
                { q: "¿Cuándo debo reservar?", a: "Lo antes posible. Las plazas son limitadas y los precios suben a medida que se acerca el Eid. Recomendamos reservar con al menos 2 semanas de antelación." },
                { q: "¿Y si quiero cancelar?", a: "Puedes cancelar hasta 7 días antes del Eid con reembolso íntegro. Contáctanos por correo electrónico o WhatsApp." },
              ].map((faq, i) => (
                <div key={i} className="bg-bg-secondary rounded-xl p-5 border border-gray-100">
                  <h3 className="text-text-primary font-bold mb-2 text-sm">{faq.q}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Read more — internal linking */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Para profundizar</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/es/blog/fecha-eid-al-adha-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Fecha del Eid al-Adha 2026: miércoles 27 de mayo
                </Link>
              </li>
              <li>
                <Link href="/es/blog/precio-cordero-francia-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Precio del cordero en Francia 2026: el comparativo
                </Link>
              </li>
              <li>
                <Link href="/es/blog/cuanto-cuesta-cordero-eid-2026-francia" className="text-text-primary hover:text-gold transition-colors">
                  → ¿Cuánto cuesta un cordero del Eid 2026?
                </Link>
              </li>
              <li>
                <Link href="/es/blog/dia-de-arafah-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Día de Arafah 2026: ayuno, virtudes y du&apos;as
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="sacrifice-aid-en-ligne-comment-ca-marche"
          currentLocale="es"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/es/blog/fecha-eid-al-adha-2026" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Fecha del Eid 2026
          </Link>
          <Link
            href="/es/blog/precio-cordero-francia-2026"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Precio del cordero en Francia <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
