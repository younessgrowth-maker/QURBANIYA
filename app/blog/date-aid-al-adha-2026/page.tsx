import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Aïd al-Adha 2026 : c'est le mercredi 27 mai en France",
  description:
    "L'Aïd al-Adha 2026 (Aïd el-Kébir, Tabaski) tombe le mercredi 27 mai 2026 en France. Jour d'Arafat le 26 mai, jours de tachriq du 28 au 30 mai. Calendrier complet.",
  keywords: [
    "date aid al adha 2026",
    "aid el kebir 2026",
    "aid 2026 mai",
    "27 mai 2026 aid",
    "le grand aid 2026",
    "tabaski 2026",
    "aid mouton 2026 date",
    "jours tachriq 2026",
    "jour arafat 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/blog/date-aid-al-adha-2026",
  },
  openGraph: {
    title: "Aïd al-Adha 2026 : mercredi 27 mai 2026 en France",
    description:
      "Date confirmée de l'Aïd al-Adha (Aïd el-Kébir / Tabaski) 2026 : mercredi 27 mai. Jour d'Arafat le 26 mai, tachriq du 28 au 30 mai.",
    url: "https://qurbaniya.fr/blog/date-aid-al-adha-2026",
    type: "article",
    publishedTime: "2026-03-15T00:00:00Z",
    modifiedTime: "2026-05-07T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Aïd al-Adha 2026 : c'est le mercredi 27 mai en France",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-15",
    dateModified: "2026-05-07",
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

function ArticleFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quelle est la date de l'Aïd al-Adha 2026 en France ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'Aïd al-Adha 2026 (aussi appelé Aïd el-Kébir ou Tabaski) tombe le mercredi 27 mai 2026 en France, correspondant au 10 Dhoul Hijja 1447 du calendrier hégirien.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les jours de tachriq en 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les jours de tachriq en 2026 sont les 28, 29 et 30 mai. Le sacrifice est valide du 27 au 30 mai 2026 inclus.",
        },
      },
      {
        "@type": "Question",
        name: "Quand est le jour d'Arafat en 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le jour d'Arafat 2026 tombe le mardi 26 mai 2026, veille de l'Aïd al-Adha. Le jeûne de ce jour est fortement recommandé pour les non-pèlerins.",
        },
      },
      {
        "@type": "Question",
        name: "Peut-on déléguer son sacrifice de l'Aïd al-Adha ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, la délégation du sacrifice (tawkil) est valide selon les quatre écoles juridiques sunnites. Cette pratique remonte aux compagnons du Prophète (paix sur lui).",
        },
      },
      {
        "@type": "Question",
        name: "Pourquoi l'Aïd al-Adha s'appelle aussi Tabaski ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tabaski est le nom donné à l'Aïd al-Adha en Afrique de l'Ouest (Sénégal, Mali, Côte d'Ivoire, Guinée). Il s'agit de la même fête religieuse, célébrée à la même date : le 27 mai 2026.",
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

export default function ArticleDateAid() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://qurbaniya.fr" },
        { name: "Blog", url: "https://qurbaniya.fr/blog" },
        { name: "Date Aïd al-Adha 2026", url: "https://qurbaniya.fr/blog/date-aid-al-adha-2026" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Date Aïd 2026</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Guide</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Mis à jour le 7 mai 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 5 min de lecture
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Aïd al-Adha 2026 : c&apos;est le <span className="text-gold">mercredi 27 mai 2026</span> en France
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          L&apos;Aïd al-Adha 2026 — aussi appelé <strong className="text-text-primary">Aïd el-Kébir</strong> ou <strong className="text-text-primary">Tabaski</strong> — tombe le <strong className="text-text-primary">mercredi 27 mai 2026</strong> en France. Voici le calendrier complet (jour d&apos;Arafat, tachriq) et tout ce qu&apos;il faut savoir pour préparer votre sacrifice.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Quelle est la date de l&apos;Aïd al-Adha 2026 ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Selon les calculs astronomiques, l&apos;Aïd al-Adha 2026 est prévu pour le <strong className="text-text-primary">mercredi 27 mai 2026</strong> (10 Dhoul Hijja 1447). Cette date correspond au jour du sacrifice (yawm an-nahr).
            </p>
            <p className="text-text-muted leading-relaxed">
              Comme chaque année, la date définitive sera confirmée par l&apos;observation du croissant lunaire. Elle pourrait varier d&apos;un jour selon les pays.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Aïd el-Kébir, Tabaski, Aïd al-Adha : c&apos;est la même fête</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Plusieurs noms désignent la même célébration religieuse selon les régions du monde musulman :
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li><strong className="text-text-primary">Aïd al-Adha</strong> (عيد الأضحى) — nom arabe officiel, littéralement « fête du sacrifice ».</li>
              <li><strong className="text-text-primary">Aïd el-Kébir</strong> (« la grande fête ») — nom courant au Maghreb et en France.</li>
              <li><strong className="text-text-primary">Tabaski</strong> — nom utilisé en Afrique de l&apos;Ouest (Sénégal, Mali, Côte d&apos;Ivoire, Guinée).</li>
              <li><strong className="text-text-primary">Le grand Aïd</strong> ou <strong className="text-text-primary">le 2ᵉ Aïd</strong> — par opposition à l&apos;Aïd al-Fitr qui marque la fin du Ramadan.</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              Quel que soit le nom utilisé, la date est la même partout : <strong className="text-text-primary">mercredi 27 mai 2026</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Les jours de tachriq : 28, 29 et 30 mai 2026</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Les trois jours qui suivent l&apos;Aïd sont les <strong className="text-text-primary">jours de tachriq</strong> (ayyam at-tachriq). Le sacrifice est valide pendant ces jours. Concrètement, vous avez du 27 au 30 mai 2026 pour effectuer votre sacrifice.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Calendrier complet</h3>
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li className="flex items-center gap-2"><span className="text-gold font-bold">27 mai</span> — Jour de l&apos;Aïd (Yawm an-Nahr)</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">28 mai</span> — 1er jour de tachriq</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">29 mai</span> — 2e jour de tachriq</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">30 mai</span> — 3e jour de tachriq (dernier jour)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Le jour d&apos;Arafat : 26 mai 2026</h2>
            <p className="text-text-muted leading-relaxed">
              La veille de l&apos;Aïd, le <strong className="text-text-primary">26 mai 2026</strong>, correspond au jour d&apos;Arafat. Le jeûne de ce jour est fortement recommandé pour les non-pèlerins. Selon un hadith authentique, il expie les péchés de l&apos;année passée et de l&apos;année à venir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Comment bien préparer son sacrifice ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Ne tardez pas à réserver votre mouton. Chaque année, les stocks s&apos;épuisent rapidement à l&apos;approche de l&apos;Aïd. Voici les étapes clés :
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">Réservez tôt</strong> — Les prix augmentent et les places se raréfient à l&apos;approche de l&apos;Aïd. Voir notre <Link href="/blog/prix-mouton-france-2026" className="text-gold hover:underline">guide des prix du mouton en France 2026</Link>.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Choisissez un service de confiance</strong> — Vérifiez que le sacrifice est conforme à la Sunnah et supervisé par un imam.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">Exigez une preuve</strong> — Une vidéo nominative est la meilleure garantie que votre sacrifice a bien été effectué.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Peut-on déléguer son sacrifice ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Oui, la délégation du sacrifice (tawkil) est parfaitement valide selon les quatre écoles juridiques de l&apos;Islam. C&apos;est d&apos;ailleurs la pratique de nombreux compagnons du Prophète (paix et bénédictions sur lui).
            </p>
            <p className="text-text-muted leading-relaxed">
              Avec Qurbaniya, votre sacrifice est effectué par un cheikh diplômé, conforme à la Sunnah, et vous recevez une vidéo nominative comme preuve.
            </p>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              L&apos;Aïd approche — Réservez votre sacrifice
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Mouton conforme à la Sounnah · Vidéo nominative · 140€ tout inclus
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Réserver mon sacrifice <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Les différences entre Aïd al-Adha et Aïd al-Fitr</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Il ne faut pas confondre les deux Aïds. L&apos;Aïd al-Fitr marque la fin du Ramadan, tandis que l&apos;Aïd al-Adha commémore le sacrifice d&apos;Ibrahim (paix sur lui) et coïncide avec le pèlerinage (Hajj).
            </p>
            <p className="text-text-muted leading-relaxed">
              L&apos;Aïd al-Adha est considéré comme la plus grande fête de l&apos;Islam. C&apos;est le jour où les musulmans qui en ont les moyens effectuent le sacrifice rituel.
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
            Article suivant : Comment ça marche ? <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
