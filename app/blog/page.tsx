import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Blog — Guides et conseils sur le sacrifice de l'Aïd",
  description:
    "Guides complets sur le sacrifice de l'Aïd al-Adha : dates, prix, règles islamiques, conseils pratiques. Tout savoir avant de commander.",
  alternates: {
    canonical: "https://qurbaniya.fr/blog",
  },
  openGraph: {
    title: "Blog Qurbaniya — Guides sur le sacrifice de l'Aïd",
    description: "Guides complets sur le sacrifice de l'Aïd al-Adha : dates, prix, règles, conseils.",
    url: "https://qurbaniya.fr/blog",
  },
};

const articles = [
  {
    slug: "date-aid-al-adha-2026",
    title: "Date de l'Aïd al-Adha 2026 : tout ce qu'il faut savoir",
    excerpt:
      "L'Aïd al-Adha 2026 est prévu le 27 mai. Découvrez les dates exactes, les jours de tachriq, et comment bien préparer votre sacrifice cette année.",
    date: "15 mars 2026",
    readTime: "5 min",
    category: "Guide",
  },
  {
    slug: "sacrifice-aid-en-ligne-comment-ca-marche",
    title: "Sacrifice de l'Aïd en ligne : comment ça marche ?",
    excerpt:
      "Déléguer son sacrifice en ligne est conforme à la Sunnah. Voici le processus étape par étape, de la commande à la réception de votre vidéo nominative.",
    date: "10 mars 2026",
    readTime: "7 min",
    category: "Guide pratique",
  },
  {
    slug: "prix-mouton-france-2026",
    title: "Prix du mouton en France 2026 : pourquoi déléguer est plus malin",
    excerpt:
      "Comparatif détaillé des prix : acheter un mouton en France (350-400€) vs déléguer son sacrifice en ligne (140€). Les avantages vont bien au-delà du prix.",
    date: "5 mars 2026",
    readTime: "6 min",
    category: "Comparatif",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://qurbaniya.fr" },
        { name: "Blog", url: "https://qurbaniya.fr/blog" },
      ]} />
      {/* Page header */}
      <div className="text-center mb-12">
        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block font-inter">
          Blog
        </span>
        <h1 className="text-3xl md:text-4xl font-black uppercase mb-4">
          GUIDES & <span className="text-gold">CONSEILS</span>
        </h1>
        <p className="text-text-muted max-w-xl mx-auto">
          Tout ce que vous devez savoir sur le sacrifice de l&apos;Aïd al-Adha, les règles islamiques, et comment bien préparer votre commande.
        </p>
      </div>

      {/* Articles grid */}
      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block bg-white rounded-xl border border-gray-100 p-6 md:p-8 hover:border-gold/20 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
                <Calendar size={12} />
                {article.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
                <Clock size={12} />
                {article.readTime}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-gold transition-colors mb-3">
              {article.title}
            </h2>

            <p className="text-text-muted leading-relaxed mb-4">
              {article.excerpt}
            </p>

            <span className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm font-inter group-hover:gap-2.5 transition-all">
              Lire l&apos;article
              <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center bg-gradient-to-r from-primary to-primary-light rounded-xl p-8 md:p-10">
        <h3 className="text-white font-bold text-xl md:text-2xl mb-3 font-playfair">
          Prêt à réserver votre sacrifice ?
        </h3>
        <p className="text-white/70 mb-6 font-inter">
          Mouton conforme à la Sounnah, vidéo nominative, à partir de 140€.
        </p>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          Commander mon sacrifice →
        </Link>
      </div>
    </div>
  );
}
