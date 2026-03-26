import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, X, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Prix du mouton en France 2026 : pourquoi déléguer est plus malin",
  description:
    "Comparatif complet : acheter un mouton en France (350-400€) vs déléguer en ligne (140€). Économisez jusqu'à 260€ tout en ayant un impact social réel.",
  keywords: [
    "prix mouton aid 2026",
    "mouton aid pas cher",
    "prix sacrifice france",
    "sacrifice aid al adha pas cher",
    "acheter mouton aid en ligne france",
    "comparatif prix mouton",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/blog/prix-mouton-france-2026",
  },
  openGraph: {
    title: "Prix du mouton en France 2026 : pourquoi déléguer est plus malin",
    description: "Comparatif : mouton en France (350-400€) vs en ligne (140€). Économisez 260€.",
    url: "https://qurbaniya.fr/blog/prix-mouton-france-2026",
    type: "article",
    publishedTime: "2026-03-05T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Prix du mouton en France 2026 : pourquoi déléguer est plus malin",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-05",
    dateModified: "2026-03-05",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/blog/prix-mouton-france-2026",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticlePrixMouton() {
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
          <span className="text-text-primary">Prix mouton 2026</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Comparatif</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 5 mars 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 6 min de lecture
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Prix du mouton en France 2026 : <span className="text-gold">pourquoi déléguer est plus malin</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          Chaque année, les prix des moutons pour l&apos;Aïd flambent en France. En 2026, comptez entre 350€ et 450€ pour un mouton seul — sans compter la logistique. Voici un comparatif détaillé pour faire le meilleur choix.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Combien coûte un mouton en France en 2026 ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le prix d&apos;un mouton pour l&apos;Aïd al-Adha en France varie selon la race, le poids et la région. Voici les fourchettes de prix constatées :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <h3 className="text-red-700 font-bold text-sm uppercase tracking-wider mb-3 font-inter">En France</h3>
                <ul className="space-y-2 text-sm font-inter">
                  <li className="text-text-muted"><strong className="text-red-700">Mouton petit :</strong> 280 - 350€</li>
                  <li className="text-text-muted"><strong className="text-red-700">Mouton moyen :</strong> 350 - 420€</li>
                  <li className="text-text-muted"><strong className="text-red-700">Mouton gros :</strong> 420 - 500€+</li>
                  <li className="text-text-muted mt-3 text-xs">+ frais d&apos;abattoir, transport, stockage...</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <h3 className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-3 font-inter">Avec Qurbaniya</h3>
                <ul className="space-y-2 text-sm font-inter">
                  <li className="text-text-muted"><strong className="text-emerald-700">Mouton complet :</strong> 140€</li>
                  <li className="text-text-muted"><strong className="text-emerald-700">Tout inclus :</strong> sacrifice + vidéo</li>
                  <li className="text-text-muted"><strong className="text-emerald-700">Distribution :</strong> 100% de la viande</li>
                  <li className="text-text-muted mt-3 text-xs">Aucun frais caché · Paiement sécurisé</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Le vrai coût d&apos;un sacrifice en France (frais cachés)</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le prix du mouton n&apos;est que la partie visible de l&apos;iceberg. En France, il faut ajouter :
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex justify-between"><span>Prix du mouton</span><span className="text-text-primary font-bold">350 - 400€</span></li>
                <li className="flex justify-between"><span>Transport aller (marché → chez vous)</span><span className="text-text-primary font-bold">30 - 50€</span></li>
                <li className="flex justify-between"><span>Nourriture si gardé quelques jours</span><span className="text-text-primary font-bold">10 - 20€</span></li>
                <li className="flex justify-between"><span>Frais d&apos;abattoir agréé</span><span className="text-text-primary font-bold">40 - 80€</span></li>
                <li className="flex justify-between"><span>Transport retour (abattoir → chez vous)</span><span className="text-text-primary font-bold">20 - 40€</span></li>
                <li className="flex justify-between border-t border-gold/10 pt-3 mt-3"><span className="font-bold text-text-primary">Total réel estimé</span><span className="text-red-600 font-black text-lg">450 - 590€</span></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Comparatif détaillé : France vs Délégation en ligne</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse font-inter">
                <thead>
                  <tr className="border-b-2 border-gold/20">
                    <th className="text-left py-3 text-text-muted font-medium">Critère</th>
                    <th className="text-center py-3 text-red-600 font-bold">En France</th>
                    <th className="text-center py-3 text-emerald-700 font-bold">Qurbaniya</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  {[
                    { label: "Prix total", france: "450 - 590€", nous: "140€", bad: true },
                    { label: "Logistique", france: "À votre charge", nous: "On gère tout" },
                    { label: "Conformité", france: "Variable", nous: "Cheikh diplômé" },
                    { label: "Preuve", france: "Aucune", nous: "Vidéo nominative" },
                    { label: "Viande gaspillée", france: "Souvent", nous: "100% distribuée" },
                    { label: "Impact social", france: "Limité", nous: "+15 repas/mouton" },
                    { label: "Stress", france: "Élevé", nous: "Zéro" },
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
              Économisez jusqu&apos;à 260€ sur votre sacrifice
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              140€ tout inclus · Sacrifice conforme · Vidéo nominative · Viande distribuée
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Réserver à 140€ <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Les avantages au-delà du prix</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Déléguer son sacrifice, ce n&apos;est pas seulement une question d&apos;économies. C&apos;est aussi :
            </p>
            <ul className="space-y-3">
              {[
                { title: "Un impact social direct", desc: "Chaque mouton nourrit environ 15 personnes dans le besoin. La viande est intégralement distribuée, rien n'est gaspillé." },
                { title: "Zéro logistique", desc: "Pas de marché aux bestiaux, pas de transport, pas d'abattoir à trouver. Vous commandez en 2 minutes depuis votre canapé." },
                { title: "Une conformité garantie", desc: "Le sacrifice est effectué par un cheikh diplômé, selon les règles strictes de la Sunnah. Pas d'approximation." },
                { title: "Une preuve concrète", desc: "La vidéo nominative vous assure que votre sacrifice a bien été effectué en votre nom. Transparence totale." },
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
            <h2 className="text-2xl font-bold text-text-primary mb-4">Pourquoi les prix augmentent chaque année en France ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Plusieurs facteurs expliquent la hausse continue des prix des moutons en France : l&apos;inflation générale, la raréfaction des élevages ovins, les normes sanitaires de plus en plus strictes, et la forte demande concentrée sur quelques jours.
            </p>
            <p className="text-text-muted leading-relaxed">
              En déléguant dans des pays où l&apos;élevage ovin est plus développé et moins coûteux, vous bénéficiez d&apos;un prix juste tout en ayant un impact social considérable.
            </p>
          </section>
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/blog/sacrifice-aid-en-ligne-comment-ca-marche" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Sacrifice en ligne
          </Link>
          <Link href="/blog" className="flex items-center gap-2 text-gold font-semibold font-inter text-sm">
            Tous les articles <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
