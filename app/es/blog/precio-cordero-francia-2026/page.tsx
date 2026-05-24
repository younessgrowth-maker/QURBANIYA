import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, X, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🐑 Precio del cordero en Francia 2026: 140€ a 450€ · Guía completa",
  description:
    "💰 Cordero vivo en Francia: 350-450€. Sacrificio en línea delegado: 140€ todo incluido. Comparativa detallada de precios para Eid al-Adha 2026, qué incluye y cómo elegir.",
  keywords: [
    "precio cordero eid 2026",
    "precio qurbani francia",
    "cuánto cuesta cordero sacrificio",
    "cordero eid barato francia",
    "comprar cordero eid online francia",
    "comparativa precio cordero eid",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/es/blog/precio-cordero-francia-2026",
    languages: blogHreflangAlternates("prix-mouton-france-2026"),
  },
  openGraph: {
    title: "🐑 Precio del cordero en Francia 2026: 140€ a 450€",
    description:
      "Comparativa completa: cordero vivo en Francia 350-450€ vs sacrificio en línea 140€. Todo lo que debes saber antes de elegir 🌙",
    url: "https://qurbaniya.fr/es/blog/precio-cordero-francia-2026",
    type: "article",
    locale: "es",
    publishedTime: "2026-03-05T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Precio del cordero en Francia 2026: por qué delegar es más inteligente",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-05",
    dateModified: "2026-03-05",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/es/blog/precio-cordero-francia-2026",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticlePrecioCordero() {
  return (
    <>
      <ArticleJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Inicio", url: "https://qurbaniya.fr/es" },
        { name: "Blog", url: "https://qurbaniya.fr/es/blog" },
        { name: "Precio cordero Francia 2026", url: "https://qurbaniya.fr/es/blog/precio-cordero-francia-2026" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/es" className="hover:text-gold transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/es/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Precio cordero 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="prix-mouton-france-2026"
          currentLocale="es"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Comparativa</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 5 de marzo de 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 6 min de lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Precio del cordero en Francia 2026: <span className="text-gold">por qué delegar es más inteligente</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          Cada año, los precios del cordero para Eid se disparan en Francia. En 2026, contempla entre 350€ y 450€ por un cordero solo — sin contar la logística. Aquí tienes una comparativa detallada para tomar la mejor decisión.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Cuánto cuesta un cordero en Francia en 2026?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El precio de un cordero para Eid al-Adha en Francia varía según la raza, el peso y la región. Estos son los rangos de precio observados:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <h3 className="text-red-700 font-bold text-sm uppercase tracking-wider mb-3 font-inter">En Francia</h3>
                <ul className="space-y-2 text-sm font-inter">
                  <li className="text-text-muted"><strong className="text-red-700">Cordero pequeño:</strong> 280 - 350€</li>
                  <li className="text-text-muted"><strong className="text-red-700">Cordero mediano:</strong> 350 - 420€</li>
                  <li className="text-text-muted"><strong className="text-red-700">Cordero grande:</strong> 420 - 500€+</li>
                  <li className="text-text-muted mt-3 text-xs">+ tasas de matadero, transporte, almacenamiento…</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <h3 className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-3 font-inter">Con Qurbaniya</h3>
                <ul className="space-y-2 text-sm font-inter">
                  <li className="text-text-muted"><strong className="text-emerald-700">Cordero completo:</strong> 140€</li>
                  <li className="text-text-muted"><strong className="text-emerald-700">Todo incluido:</strong> sacrificio + vídeo</li>
                  <li className="text-text-muted"><strong className="text-emerald-700">Distribución:</strong> 100% de la carne</li>
                  <li className="text-text-muted mt-3 text-xs">Sin tarifas ocultas · Pago seguro</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">El coste real de un sacrificio en Francia (gastos ocultos)</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              El precio del cordero es solo la punta del iceberg. En Francia, hay que sumar:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex justify-between"><span>Precio del cordero</span><span className="text-text-primary font-bold">350 - 400€</span></li>
                <li className="flex justify-between"><span>Transporte ida (mercado → casa)</span><span className="text-text-primary font-bold">30 - 50€</span></li>
                <li className="flex justify-between"><span>Alimentación si se guarda unos días</span><span className="text-text-primary font-bold">10 - 20€</span></li>
                <li className="flex justify-between"><span>Tasas de matadero homologado</span><span className="text-text-primary font-bold">40 - 80€</span></li>
                <li className="flex justify-between"><span>Transporte vuelta (matadero → casa)</span><span className="text-text-primary font-bold">20 - 40€</span></li>
                <li className="flex justify-between border-t border-gold/10 pt-3 mt-3"><span className="font-bold text-text-primary">Total real estimado</span><span className="text-red-600 font-black text-lg">450 - 590€</span></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Comparativa detallada: Francia vs Delegación online</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse font-inter">
                <thead>
                  <tr className="border-b-2 border-gold/20">
                    <th className="text-left py-3 text-text-muted font-medium">Criterio</th>
                    <th className="text-center py-3 text-red-600 font-bold">En Francia</th>
                    <th className="text-center py-3 text-emerald-700 font-bold">Qurbaniya</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  {[
                    { label: "Precio total", france: "450 - 590€", nous: "140€", bad: true },
                    { label: "Logística", france: "A tu cargo", nous: "Nos ocupamos de todo" },
                    { label: "Conformidad", france: "Variable", nous: "Jeque diplomado" },
                    { label: "Prueba", france: "Ninguna", nous: "Vídeo nominal" },
                    { label: "Carne desperdiciada", france: "Frecuente", nous: "100% distribuida" },
                    { label: "Impacto social", france: "Limitado", nous: "+30 comidas/cordero" },
                    { label: "Estrés", france: "Alto", nous: "Cero" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 font-medium text-text-primary">{row.label}</td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1">
                          <X size={14} className="text-red-400" />
                          <span className={row.bad ? "line-through text-red-400" : ""}>{row.france}</span>
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1">
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">{row.nous}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Ahorra hasta 260€ en tu sacrificio
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              140€ todo incluido · Sacrificio conforme · Vídeo nominal · Carne distribuida
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Reservar por 140€ <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Las ventajas más allá del precio</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Delegar tu sacrificio no es solo una cuestión de ahorro. También es:
            </p>
            <ul className="space-y-3">
              {[
                { title: "Un impacto social directo", desc: "Cada cordero alimenta hasta 30 personas necesitadas, alrededor de 5 familias. La carne se distribuye íntegramente, no se desperdicia nada." },
                { title: "Cero logística", desc: "Sin mercado de ganado, sin transporte, sin matadero que buscar. Pides en 2 minutos desde tu sofá." },
                { title: "Conformidad garantizada", desc: "El sacrificio lo realiza un jeque diplomado, según las reglas estrictas de la Sunnah. Sin aproximaciones." },
                { title: "Una prueba concreta", desc: "El vídeo nominal te asegura que tu sacrificio se ha realizado en tu nombre. Transparencia total." },
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <Check size={18} className="text-gold flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-text-primary">{item.title}</strong>
                    <p className="text-text-muted text-sm mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Por qué suben los precios cada año en Francia?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Varios factores explican el alza continua de los precios del cordero en Francia: la inflación general, la escasez de explotaciones ovinas, las normas sanitarias cada vez más estrictas y la fuerte demanda concentrada en pocos días alrededor del <Link href="/es/blog/fecha-eid-al-adha-2026" className="text-gold hover:underline">miércoles 27 de mayo de 2026, día de Eid al-Adha</Link>.
            </p>
            <p className="text-text-muted leading-relaxed">
              Al delegar en países donde la ganadería ovina está más desarrollada y es menos costosa, te beneficias de un precio justo a la vez que tienes un impacto social considerable.
            </p>
          </section>

          {/* Go further — internal linking */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Para profundizar</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/es/blog/fecha-eid-al-adha-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Fecha de Eid al-Adha 2026: el miércoles 27 de mayo
                </Link>
              </li>
              <li>
                <Link href="/es/blog/cuanto-cuesta-cordero-eid-2026-francia" className="text-text-primary hover:text-gold transition-colors">
                  → ¿Cuánto cuesta un cordero de Eid 2026? (comparativa detallada)
                </Link>
              </li>
              <li>
                <Link href="/es/blog/qurbani-online-como-funciona" className="text-text-primary hover:text-gold transition-colors">
                  → Sacrificio de Eid online: ¿cómo funciona?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-primary hover:text-gold transition-colors">
                  → FAQ Eid al-Adha 2026
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="prix-mouton-france-2026"
          currentLocale="es"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/es/blog/qurbani-online-como-funciona" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Sacrificio online
          </Link>
          <Link href="/es/blog" className="flex items-center gap-2 text-gold font-semibold font-inter text-sm">
            Todos los artículos <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
