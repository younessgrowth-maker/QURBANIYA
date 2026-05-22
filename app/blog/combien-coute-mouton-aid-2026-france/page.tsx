import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Check, X } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Combien coûte un mouton pour l'Aïd 2026 ? Comparatif des 3 options en France",
  description:
    "Acheter un mouton vivant, passer par un abattoir ou déléguer en ligne ? Comparatif complet des 3 options pour l'Aïd al-Adha 2026, avec critères, coûts cachés et conseils.",
  keywords: [
    "combien coute un mouton en france",
    "combien coute le mouton de l'aid en france",
    "combien coute un mouton",
    "prix d'un mouton vivant en france",
    "prix du mouton au kilo",
    "tarif abattoir mouton",
    "cout mouton",
    "prix mouton abattoir",
    "prix d'un mouton entier",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/blog/combien-coute-mouton-aid-2026-france",
  },
  openGraph: {
    title: "Combien coûte un mouton pour l'Aïd 2026 ? Comparatif des 3 options",
    description:
      "Mouton vivant, abattoir ou sacrifice délégué : quelle option pour l'Aïd 2026 en France ? Comparatif des 3 méthodes avec coûts réels.",
    url: "https://qurbaniya.fr/blog/combien-coute-mouton-aid-2026-france",
    type: "article",
    publishedTime: "2026-05-07T00:00:00Z",
    modifiedTime: "2026-05-07T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Combien coûte un mouton de l'Aïd al-Adha en France 2026 ?",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-07",
    dateModified: "2026-05-07",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/blog/combien-coute-mouton-aid-2026-france",
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
        name: "Combien coûte un mouton de l'Aïd al-Adha en France en 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le prix d'un mouton pour l'Aïd al-Adha 2026 en France varie selon la formule choisie : 140€ pour un sacrifice délégué en ligne (tout inclus), 200 à 280€ pour un mouton prêt-à-consommer chez un boucher halal, 350 à 450€ pour un mouton vivant acheté en élevage avec abattoir privé.",
        },
      },
      {
        "@type": "Question",
        name: "Pourquoi un mouton coûte-t-il 350€ en élevage et 140€ en ligne ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un mouton vivant en France coûte cher car il faut intégrer le coût de l'élevage local (alimentation, vétérinaire), le transport, la TVA, et la marge intermédiaire. Le sacrifice délégué en ligne est moins cher car l'animal est acheté directement à la source (souvent à l'étranger), sans transport vivant ni intermédiaire.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le prix au kilo d'un mouton de l'Aïd ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le prix au kilo carcasse oscille entre 12 et 18€/kg selon le boucher et la région. Un mouton de 25 kg de viande revient donc à 300 à 450€. Ce prix n'inclut pas l'abattage rituel ni la découpe, généralement facturés en supplément.",
        },
      },
      {
        "@type": "Question",
        name: "Le prix de 140€ chez Qurbaniya est-il tout compris ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, 140€ inclut : achat de l'animal conforme aux critères islamiques, abattage rituel par un cheikh diplômé, vidéo nominative WhatsApp, et distribution intégrale de la viande aux familles nécessiteuses. Aucun frais caché.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle option choisir : mouton vivant, boucherie ou en ligne ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mouton vivant : pour ceux qui veulent assister au sacrifice (mais nécessite un abattoir agréé, illégal de sacrifier soi-même hors abattoir en France). Boucherie halal : pour récupérer la viande à la maison. En ligne : pour accomplir l'obligation religieuse simplement, avec preuve vidéo, sans contrainte logistique. Le choix dépend de votre priorité : participation physique vs simplicité.",
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

export default function ArticleCombienCouteMouton() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://qurbaniya.fr" },
        { name: "Blog", url: "https://qurbaniya.fr/blog" },
        { name: "Combien coûte un mouton 2026", url: "https://qurbaniya.fr/blog/combien-coute-mouton-aid-2026-france" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Combien coûte un mouton 2026</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Comparatif prix</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 7 mai 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min de lecture
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Combien coûte un mouton de l&apos;<span className="text-gold">Aïd al-Adha 2026</span> en France ?
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          Le prix d&apos;un mouton pour l&apos;Aïd al-Adha 2026 (mercredi 27 mai) varie en France de <strong className="text-text-primary">140€ à 450€</strong> selon la formule choisie. Voici le détail complet pour comprendre l&apos;écart, ce qui est inclus, et comment choisir selon votre situation.
        </p>

        {/* Quick answer */}
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-5 md:p-6 mb-10">
          <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Réponse rapide</h3>
          <ul className="space-y-2 text-text-muted text-sm font-inter">
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">Sacrifice délégué en ligne</strong> : 140€ tout inclus (animal + abattage halal + vidéo + distribution)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">Mouton prêt-à-consommer</strong> chez boucher halal : 200 à 280€ (carcasse découpée)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">Mouton vivant + abattoir privé</strong> : 350 à 450€ (animal + transport + abattage)</span></li>
          </ul>
        </div>

        <div className="prose-custom space-y-8">
          {/* Section 1 — Les 3 options */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Les 3 façons d&apos;avoir un mouton pour l&apos;Aïd 2026</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              En France, trois formules principales coexistent pour accomplir le sacrifice de l&apos;Aïd. Chacune a un prix, des contraintes et un niveau d&apos;implication différents.
            </p>

            <div className="space-y-4 mt-6">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">1. Sacrifice délégué en ligne</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">140€</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  Vous commandez en ligne, le sacrifice est effectué en votre nom par un cheikh diplômé, vous recevez une vidéo nominative par WhatsApp. La viande est distribuée aux familles nécessiteuses.
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">Avantage</strong> : 0 contrainte logistique, conforme à la Sounnah, preuve vidéo. <strong className="text-text-primary">Inconvénient</strong> : vous ne récupérez pas la viande.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">2. Mouton prêt-à-consommer (boucherie halal)</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">200-280€</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  Vous commandez chez un boucher halal qui se charge de l&apos;abattage rituel. Vous récupérez la carcasse découpée (avec ou sans tête, selon vos préférences).
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">Avantage</strong> : vous gardez la viande pour votre famille. <strong className="text-text-primary">Inconvénient</strong> : la traçabilité du nom (niyyah) sur l&apos;animal exact n&apos;est pas toujours garantie sans réservation explicite.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">3. Mouton vivant + abattoir agréé</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">350-450€</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  Achat d&apos;un mouton vivant en élevage (≈250-350€), puis transport vers un abattoir agréé qui pratique l&apos;abattage rituel (≈80-150€ supplémentaires en frais d&apos;abattage et de découpe).
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">Avantage</strong> : possibilité d&apos;assister au sacrifice. <strong className="text-text-primary">Inconvénient</strong> : sacrifier soi-même chez soi est <strong className="text-text-primary">illégal en France</strong> (sanction pénale, art. R214-78 du Code rural). L&apos;abattage doit obligatoirement avoir lieu en abattoir agréé.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 — Pourquoi cet écart */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Pourquoi un tel écart de prix (140€ vs 450€) ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              L&apos;écart entre 140€ et 450€ s&apos;explique par 4 facteurs principaux :
            </p>
            <ul className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">Coût de l&apos;élevage local</strong> — Un mouton élevé en France coûte cher (alimentation, foncier, vétérinaire, normes). À l&apos;international, le coût d&apos;élevage est nettement inférieur.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Transport</strong> — Acheminer un animal vivant jusqu&apos;à l&apos;abattoir agréé en France ajoute facilement 30 à 80€.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">TVA et intermédiaires</strong> — TVA 5,5% sur la viande + marge éleveur + marge boucher cumulent une majoration de 20 à 35% sur le prix de revient.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">4</span>
                <span><strong className="text-text-primary">Modèle économique</strong> — Le sacrifice délégué en ligne mutualise les coûts (un seul site d&apos;abattage, plusieurs centaines de moutons), ce qui permet d&apos;atteindre 140€ tout inclus.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 — Tableau comparatif */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Tableau comparatif détaillé</h2>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-sm font-inter min-w-[640px] mx-4 md:mx-0">
                <thead>
                  <tr className="border-b-2 border-gold/30">
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Critère</th>
                    <th className="text-left py-3 px-3 font-bold text-text-primary">En ligne (140€)</th>
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Boucher halal (200-280€)</th>
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Vivant + abattoir (350-450€)</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Conformité Sounnah</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Vidéo nominative</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Vous récupérez la viande</td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Distribution aux nécessiteux</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3">Optionnel</td>
                    <td className="py-3 px-3">À organiser</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Logistique requise</td>
                    <td className="py-3 px-3">Aucune</td>
                    <td className="py-3 px-3">Récupération boucher</td>
                    <td className="py-3 px-3">Élevage + transport + abattoir</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Délai de réservation</td>
                    <td className="py-3 px-3">J-1</td>
                    <td className="py-3 px-3">J-7 à J-15</td>
                    <td className="py-3 px-3">J-30+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              L&apos;option la plus simple : 140€ tout inclus
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Sacrifice conforme · Vidéo nominative WhatsApp · Distribution aux nécessiteux
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Réserver mon sacrifice <ArrowRight size={14} />
            </Link>
          </div>

          {/* Section 4 — Quel choix selon votre situation */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Quelle option choisir selon votre situation ?</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-text-primary mb-2">→ Vous voulez accomplir l&apos;obligation simplement, sans contrainte</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Le sacrifice délégué en ligne est l&apos;option la plus rationnelle : 140€, conforme à la Sounnah selon les 4 écoles juridiques, vidéo nominative comme preuve, et la viande va directement aux familles dans le besoin. Pas de logistique, pas de découpe, pas de gestion du congélateur.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">→ Vous voulez la viande pour votre famille</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  La boucherie halal est le bon choix. Réservez tôt (J-7 minimum) avec un boucher de confiance. Vérifiez que la <em>tasmiyah</em> mentionne bien votre nom et que la traçabilité de l&apos;animal est garantie.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">→ Vous voulez assister au sacrifice</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  C&apos;est possible uniquement via un abattoir agréé qui accepte les particuliers (rare en pratique). <strong className="text-text-primary">Sacrifier un animal soi-même hors abattoir est illégal en France</strong>, passible de sanctions pénales (art. R214-78 et suivants du Code rural). Renseignez-vous bien avant de choisir cette option.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 — Et le prix au kilo ? */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Et le prix au kilo de mouton en France ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Si vous achetez en boucherie hors période d&apos;Aïd, le prix au kilo carcasse oscille entre <strong className="text-text-primary">12 et 18€/kg</strong> selon la région et la qualité (mouton de pré-salé, agneau de Sisteron, mouton standard). Un mouton de l&apos;Aïd pèse en moyenne 20 à 30 kg de viande, ce qui donne un prix de 240 à 540€ — sans compter l&apos;abattage rituel ni la découpe.
            </p>
            <p className="text-text-muted leading-relaxed">
              En période d&apos;Aïd, les prix grimpent de 10 à 25% à cause de la demande. C&apos;est précisément l&apos;intérêt du sacrifice délégué en ligne : un prix fixe (140€), réservé hors flambée saisonnière.
            </p>
          </section>

          {/* Section 6 — Liens internes */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Pour aller plus loin</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/blog/prix-mouton-france-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Prix du mouton en France 2026 : pourquoi déléguer est plus malin
                </Link>
              </li>
              <li>
                <Link href="/blog/date-aid-al-adha-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Date de l&apos;Aïd al-Adha 2026 : c&apos;est le mercredi 27 mai
                </Link>
              </li>
              <li>
                <Link href="/blog/sacrifice-aid-en-ligne-comment-ca-marche" className="text-text-primary hover:text-gold transition-colors">
                  → Sacrifice de l&apos;Aïd en ligne : comment ça marche ?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-primary hover:text-gold transition-colors">
                  → FAQ Aïd al-Adha 2026 — sacrifice du mouton en ligne
                </Link>
              </li>
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
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-2.5 rounded-xl transition-colors font-inter"
          >
            Commander à 140€ <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
