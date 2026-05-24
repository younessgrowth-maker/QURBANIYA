import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Tabaski 2026 en France : 27 mai · Sacrifice halal à 140€ 🐑",
  description:
    "Tabaski 2026 confirmée mercredi 27 mai. Diaspora en France ? Sacrifice halal délégué, vidéo nominative, distribution aux familles dans le besoin. 140€ tout compris.",
  keywords: [
    "tabaski 2026 france",
    "fete de tabaski 2026 en france",
    "tabaski 2026 date france",
    "tabaski en france",
    "date tabaski 2026 france",
    "la fete de tabaski 2026 en france",
    "le jour de la fete de tabaski 2026",
    "tabaski 2026 date",
    "fete du mouton 2026 france",
    "sacrifice tabaski en ligne",
    "deleguer sacrifice tabaski",
    "tabaski senegal mali cote d'ivoire",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/blog/tabaski-2026-france",
  },
  openGraph: {
    title: "🐑 Tabaski 2026 — 27 mai · Sacrifice halal délégué depuis la France",
    description:
      "Diaspora en France pour la Tabaski 2026 ? Sacrifice halal délégué, vidéo nominative, distribution aux familles. 140€ tout compris.",
    url: "https://qurbaniya.fr/blog/tabaski-2026-france",
    type: "article",
    publishedTime: "2026-05-11T00:00:00Z",
    modifiedTime: "2026-05-11T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tabaski 2026 en France : déléguer son sacrifice depuis l'Hexagone",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-11",
    dateModified: "2026-05-11",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/blog/tabaski-2026-france",
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
        name: "Quelle est la date de la Tabaski 2026 en France ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La Tabaski 2026 (Aïd al-Adha, fête du mouton) tombe le mercredi 27 mai 2026 en France, correspondant au 10 Dhoul Hijja 1447 du calendrier hégirien. La même date est observée au Sénégal, au Mali, en Côte d'Ivoire et en Guinée, parfois décalée d'un jour selon l'observation locale du croissant lunaire.",
        },
      },
      {
        "@type": "Question",
        name: "Tabaski et Aïd al-Adha, c'est la même fête ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Tabaski est le nom utilisé en Afrique de l'Ouest francophone (Sénégal, Mali, Côte d'Ivoire, Guinée, Burkina Faso). Aïd al-Adha est le nom arabe officiel. Aïd el-Kébir est utilisé au Maghreb. Il s'agit toujours de la même célébration : le sacrifice du mouton le 10 Dhoul Hijja en commémoration d'Ibrahim (paix sur lui).",
        },
      },
      {
        "@type": "Question",
        name: "Peut-on faire la Tabaski depuis la France si on ne peut pas rentrer au pays ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, la délégation du sacrifice (tawkil) est parfaitement valide selon les quatre écoles juridiques sunnites. Vous pouvez déléguer votre sacrifice à un service de confiance qui l'effectue en votre nom, dans le respect des règles de la Sounnah. Vous recevez une preuve vidéo nominative et la viande est distribuée à des familles dans le besoin.",
        },
      },
      {
        "@type": "Question",
        name: "Combien coûte une délégation de sacrifice pour la Tabaski 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Chez Qurbaniya, la délégation du sacrifice pour la Tabaski 2026 coûte 140€ tout compris : mouton conforme à la Sounnah, sacrifice supervisé par un cheikh, vidéo nominative envoyée par WhatsApp, distribution caritative à des familles dans le besoin à Madagascar.",
        },
      },
      {
        "@type": "Question",
        name: "À quelle date dois-je réserver pour la Tabaski 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les réservations ferment le 27 mai 2026 à 03h00 (heure de Paris), quelques heures avant le sacrifice du jour de la Tabaski. Pour garantir votre sacrifice et la qualité du service, il est fortement recommandé de réserver au moins 7 à 15 jours à l'avance car les places sont limitées.",
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
        { name: "Accueil", url: "https://qurbaniya.fr" },
        { name: "Blog", url: "https://qurbaniya.fr/blog" },
        { name: "Tabaski 2026 France", url: "https://qurbaniya.fr/blog/tabaski-2026-france" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Tabaski 2026 France</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Guide</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Publié le 11 mai 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min de lecture
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Tabaski 2026 en France : déléguer son sacrifice depuis l&apos;Hexagone — <span className="text-gold">mercredi 27 mai</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          La <strong className="text-text-primary">Tabaski 2026</strong> tombe le <strong className="text-text-primary">mercredi 27 mai 2026</strong>. Vous vivez en France et ne pouvez pas rentrer au pays cette année ? La délégation du sacrifice est une solution reconnue par les quatre écoles juridiques de l&apos;Islam : votre sacrifice est accompli en votre nom, conformément à la Sounnah, et la viande nourrit des familles dans le besoin.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Date de la Tabaski 2026 en France</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              La <strong className="text-text-primary">Tabaski 2026</strong> est célébrée le <strong className="text-text-primary">mercredi 27 mai 2026</strong> en France, correspondant au 10 Dhoul Hijja 1447 du calendrier hégirien. La même date est observée dans la quasi-totalité des pays d&apos;Afrique de l&apos;Ouest (Sénégal, Mali, Côte d&apos;Ivoire, Guinée, Burkina Faso), avec parfois un décalage d&apos;un jour selon l&apos;observation locale du croissant lunaire.
            </p>
            <p className="text-text-muted leading-relaxed">
              Le sacrifice peut être effectué du 27 au 30 mai 2026 inclus (jour de l&apos;Aïd + trois jours de tachriq).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Tabaski, Aïd al-Adha, fête du mouton : c&apos;est la même chose</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Selon votre origine ou votre pays, vous entendrez plusieurs noms qui désignent la même célébration :
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li><strong className="text-text-primary">Tabaski</strong> — Sénégal, Mali, Côte d&apos;Ivoire, Guinée, Burkina Faso, Mauritanie.</li>
              <li><strong className="text-text-primary">Aïd al-Adha</strong> (عيد الأضحى) — nom arabe officiel, « fête du sacrifice ».</li>
              <li><strong className="text-text-primary">Aïd el-Kébir</strong> — Maghreb (Maroc, Algérie, Tunisie), « la grande fête ».</li>
              <li><strong className="text-text-primary">Fête du mouton</strong> — appellation francophone courante.</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              Toutes ces appellations renvoient à la même fête religieuse : la commémoration du sacrifice d&apos;Ibrahim (paix sur lui), célébrée chaque année le 10 Dhoul Hijja.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Pourquoi tant de familles francophones d&apos;Afrique délèguent leur sacrifice depuis la France</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Chaque année à la Tabaski, des milliers de Sénégalais, Maliens, Ivoiriens, Guinéens et Burkinabés vivant en France se retrouvent face au même dilemme : <strong className="text-text-primary">accomplir le devoir religieux du sacrifice sans pouvoir rentrer au pays</strong>.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Plusieurs raisons concrètes expliquent ce choix de déléguer :
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li>• <strong className="text-text-primary">Impossibilité de voyager</strong> — emploi, études, statut administratif, charges familiales.</li>
              <li>• <strong className="text-text-primary">Coût élevé du mouton sur place</strong> — les prix à Dakar, Bamako ou Abidjan flambent à l&apos;approche de la Tabaski.</li>
              <li>• <strong className="text-text-primary">Difficulté logistique en France</strong> — peu d&apos;abattoirs disponibles, créneaux saturés, démarches administratives complexes.</li>
              <li>• <strong className="text-text-primary">Volonté d&apos;agir caritativement</strong> — la viande du sacrifice nourrit directement des familles dans le besoin.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Comment fonctionne la délégation du sacrifice (tawkil) ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              La <em>tawkil</em> — délégation du sacrifice — est une pratique reconnue par <strong className="text-text-primary">les quatre écoles juridiques sunnites</strong> (hanafite, malékite, chaféite, hanbalite). Elle remonte aux compagnons du Prophète (paix sur lui), dont plusieurs ont délégué leur propre sacrifice.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Concrètement, vous mandatez un service de confiance qui effectue le sacrifice en votre nom le jour de la Tabaski, dans le respect strict des règles religieuses. Vous recevez ensuite une <strong className="text-text-primary">preuve vidéo nominative</strong> et la viande est distribuée à des familles dans le besoin.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Les conditions de validité (rappel)</h3>
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li>• Intention sincère (<em>niya</em>) au nom du mandant</li>
                <li>• Animal en bonne santé, conforme à l&apos;âge requis</li>
                <li>• Égorgement par une personne musulmane, dans les règles de la Sounnah</li>
                <li>• Sacrifice effectué entre le 27 et le 30 mai 2026 (jours valides)</li>
                <li>• Distribution de la viande, traditionnellement partagée en trois (famille, proches, nécessiteux)</li>
              </ul>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Tabaski 2026 — Réservez votre sacrifice en quelques clics
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Conforme à la Sounnah · Vidéo nominative · Distribution aux familles dans le besoin · 140€ tout compris
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Réserver mon sacrifice <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Qurbaniya pour la Tabaski 2026 : ce qu&apos;on fait pour vous</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Notre service est conçu pour les familles francophones d&apos;Afrique installées en France qui souhaitent accomplir leur sacrifice sans contrainte logistique :
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">Vous réservez en ligne</strong> — en 2 minutes, paiement sécurisé Stripe. Vous indiquez le nom complet de la personne au nom de laquelle est effectué le sacrifice.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Sacrifice supervisé par un cheikh</strong> — le jour de la Tabaski, votre mouton est égorgé conformément à la Sounnah, avec votre nom prononcé au moment de l&apos;intention.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">Preuve vidéo envoyée par WhatsApp</strong> — vous recevez une vidéo nominative confirmant l&apos;exécution.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">4</span>
                <span><strong className="text-text-primary">Distribution caritative à Madagascar</strong> — la viande nourrit des familles dans le besoin, conformément à l&apos;esprit du sacrifice.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Combien coûte la délégation pour la Tabaski 2026 ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le tarif unique chez Qurbaniya est de <strong className="text-text-primary">140€ tout compris</strong>. Ce prix inclut :
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1">
              <li>• L&apos;achat du mouton (conforme à l&apos;âge et à la santé exigés)</li>
              <li>• Le sacrifice supervisé par un cheikh</li>
              <li>• La préparation et la distribution de la viande à des familles dans le besoin</li>
              <li>• La vidéo nominative comme preuve</li>
              <li>• Aucun frais caché, aucun supplément</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              Pour rappel, le prix d&apos;un mouton de Tabaski au Sénégal ou au Mali peut dépasser 250 000 FCFA (≈380€) à l&apos;approche de la fête. Voir notre <Link href="/blog/prix-mouton-france-2026" className="text-gold hover:underline">guide complet des prix du mouton en France 2026</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Avant quelle date faut-il réserver ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Les réservations ferment automatiquement le <strong className="text-text-primary">27 mai 2026 à 03h00 (heure de Paris)</strong>, quelques heures avant le sacrifice du jour de la Tabaski. Mais ne tardez pas : les places sont limitées et partent rapidement à mesure que la fête approche. Nous recommandons de réserver au minimum 7 à 15 jours à l&apos;avance pour garantir votre sacrifice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Pour aller plus loin</h2>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li>• <Link href="/blog/date-aid-al-adha-2026" className="text-gold hover:underline">Date complète de l&apos;Aïd al-Adha / Tabaski 2026 (jour d&apos;Arafat, tachriq)</Link></li>
              <li>• <Link href="/blog/sacrifice-aid-en-ligne-comment-ca-marche" className="text-gold hover:underline">Comment fonctionne le sacrifice en ligne ?</Link></li>
              <li>• <Link href="/blog/combien-coute-mouton-aid-2026-france" className="text-gold hover:underline">Combien coûte un mouton pour la Tabaski/Aïd en France ?</Link></li>
              <li>• <Link href="/faq" className="text-gold hover:underline">Toutes les questions fréquentes sur la délégation du sacrifice</Link></li>
            </ul>
          </section>
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/blog" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Retour au blog
          </Link>
          <Link
            href="/commander"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Réserver mon sacrifice <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
