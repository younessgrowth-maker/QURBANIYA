import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Date de l\u2019A\u00efd al-Adha 2026 : tout ce qu\u2019il faut savoir",
  description:
    "L\u2019A\u00efd al-Adha 2026 est pr\u00e9vu le 27 mai. Dates exactes, jours de tachriq (28-30 mai), pr\u00e9parations, et comment r\u00e9server votre sacrifice \u00e0 temps.",
  keywords: [
    "date aid al adha 2026",
    "aid el kebir 2026",
    "quand est l'aid 2026",
    "f\u00eate du mouton 2026",
    "date sacrifice 2026",
    "jours tachriq 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/blog/date-aid-al-adha-2026",
  },
  openGraph: {
    title: "Date de l\u2019A\u00efd al-Adha 2026 : tout ce qu\u2019il faut savoir",
    description: "L\u2019A\u00efd al-Adha 2026 est pr\u00e9vu le 27 mai. Dates, tachriq, pr\u00e9parations.",
    url: "https://qurbaniya.fr/blog/date-aid-al-adha-2026",
    type: "article",
    publishedTime: "2026-03-15T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Date de l\u2019A\u00efd al-Adha 2026 : tout ce qu\u2019il faut savoir",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-15",
    dateModified: "2026-03-15",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/blog/date-aid-al-adha-2026",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticleDateAid() {
  return (
    <>
      <ArticleJsonLd />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Date A\u00efd 2026</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Guide</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 15 mars 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 5 min de lecture
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Date de l&apos;A\u00efd al-Adha 2026 : <span className="text-gold">tout ce qu&apos;il faut savoir</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          L&apos;A\u00efd al-Adha (ou A\u00efd el-K\u00e9bir) est le moment le plus important du calendrier musulman pour le sacrifice rituel. Voici toutes les informations pour bien vous pr\u00e9parer cette ann\u00e9e.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Quelle est la date de l&apos;A\u00efd al-Adha 2026 ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Selon les calculs astronomiques, l&apos;A\u00efd al-Adha 2026 est pr\u00e9vu pour le <strong className="text-text-primary">mercredi 27 mai 2026</strong> (10 Dhoul Hijja 1447). Cette date correspond au jour du sacrifice (yawm an-nahr).
            </p>
            <p className="text-text-muted leading-relaxed">
              Comme chaque ann\u00e9e, la date d\u00e9finitive sera confirm\u00e9e par l&apos;observation du croissant lunaire. Elle pourrait varier d&apos;un jour selon les pays.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Les jours de tachriq : 28, 29 et 30 mai 2026</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Les trois jours qui suivent l&apos;A\u00efd sont les <strong className="text-text-primary">jours de tachriq</strong> (ayyam at-tachriq). Le sacrifice est valide pendant ces jours. Concr\u00e8tement, vous avez du 27 au 30 mai 2026 pour effectuer votre sacrifice.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Calendrier complet</h3>
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li className="flex items-center gap-2"><span className="text-gold font-bold">27 mai</span> — Jour de l&apos;A\u00efd (Yawm an-Nahr)</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">28 mai</span> — 1er jour de tachriq</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">29 mai</span> — 2e jour de tachriq</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">30 mai</span> — 3e jour de tachriq (dernier jour)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Le jour d&apos;Arafat : 26 mai 2026</h2>
            <p className="text-text-muted leading-relaxed">
              La veille de l&apos;A\u00efd, le <strong className="text-text-primary">26 mai 2026</strong>, correspond au jour d&apos;Arafat. Le je\u00fbne de ce jour est fortement recommand\u00e9 pour les non-p\u00e8lerins. Selon un hadith authentique, il expie les p\u00e9ch\u00e9s de l&apos;ann\u00e9e pass\u00e9e et de l&apos;ann\u00e9e \u00e0 venir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Comment bien pr\u00e9parer son sacrifice ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Ne tardez pas \u00e0 r\u00e9server votre mouton. Chaque ann\u00e9e, les stocks s&apos;\u00e9puisent rapidement \u00e0 l&apos;approche de l&apos;A\u00efd. Voici les \u00e9tapes cl\u00e9s :
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">R\u00e9servez t\u00f4t</strong> — Les prix augmentent et les places se rar\u00e9fient \u00e0 l&apos;approche de l&apos;A\u00efd.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Choisissez un service de confiance</strong> — V\u00e9rifiez que le sacrifice est conforme \u00e0 la Sunnah et supervis\u00e9 par un imam.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">Exigez une preuve</strong> — Une vid\u00e9o nominative est la meilleure garantie que votre sacrifice a bien \u00e9t\u00e9 effectu\u00e9.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Peut-on d\u00e9l\u00e9guer son sacrifice ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Oui, la d\u00e9l\u00e9gation du sacrifice (tawkil) est parfaitement valide selon les quatre \u00e9coles juridiques de l&apos;Islam. C&apos;est d&apos;ailleurs la pratique de nombreux compagnons du Proph\u00e8te (paix et b\u00e9n\u00e9dictions sur lui).
            </p>
            <p className="text-text-muted leading-relaxed">
              Avec Qurbaniya, votre sacrifice est effectu\u00e9 par un cheikh dipl\u00f4m\u00e9, conforme \u00e0 la Sunnah, et vous recevez une vid\u00e9o nominative comme preuve.
            </p>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              L&apos;A\u00efd approche — R\u00e9servez votre sacrifice
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Mouton conforme \u00e0 la Sounnah \u00b7 Vid\u00e9o nominative \u00b7 140\u20ac tout inclus
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              R\u00e9server mon sacrifice <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Les diff\u00e9rences entre A\u00efd al-Adha et A\u00efd al-Fitr</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Il ne faut pas confondre les deux A\u00efds. L&apos;A\u00efd al-Fitr marque la fin du Ramadan, tandis que l&apos;A\u00efd al-Adha comm\u00e9more le sacrifice d&apos;Ibrahim (paix sur lui) et co\u00efncide avec le p\u00e8lerinage (Hajj).
            </p>
            <p className="text-text-muted leading-relaxed">
              L&apos;A\u00efd al-Adha est consid\u00e9r\u00e9 comme la plus grande f\u00eate de l&apos;Islam. C&apos;est le jour o\u00f9 les musulmans qui en ont les moyens effectuent le sacrifice rituel.
            </p>
          </section>
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/blog" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Retour au blog
          </Link>
          <Link
            href="/blog/sacrifice-aid-en-ligne-comment-ca-marche"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Article suivant : Comment \u00e7a marche ? <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
