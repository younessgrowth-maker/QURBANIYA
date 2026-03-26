import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Sacrifice de l'Aid en ligne : comment ca marche ?",
  description:
    "Guide complet pour deleguer son sacrifice de l'Aid al-Adha en ligne. Processus etape par etape, conformite islamique, video nominative. Tout ce qu'il faut savoir.",
  keywords: [
    "sacrifice aid en ligne",
    "comment faire sacrifice aid en france",
    "deleguer sacrifice aid",
    "sacrifice mouton en ligne",
    "sacrifice aid al adha en ligne",
    "tawkil sacrifice",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/blog/sacrifice-aid-en-ligne-comment-ca-marche",
  },
  openGraph: {
    title: "Sacrifice de l'Aid en ligne : comment ca marche ?",
    description: "Guide complet pour deleguer son sacrifice en ligne. Processus, conformite, video.",
    url: "https://qurbaniya.fr/blog/sacrifice-aid-en-ligne-comment-ca-marche",
    type: "article",
    publishedTime: "2026-03-10T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sacrifice de l'Aid en ligne : comment ca marche ?",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-10",
    dateModified: "2026-03-10",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/blog/sacrifice-aid-en-ligne-comment-ca-marche",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticleSacrificeEnLigne() {
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
          <span className="text-text-primary">Sacrifice en ligne</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Guide pratique</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 10 mars 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min de lecture
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Sacrifice de l&apos;Aid en ligne : <span className="text-gold">comment ca marche ?</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          De plus en plus de musulmans en France choisissent de deleguer leur sacrifice de l&apos;Aid al-Adha en ligne. Mais est-ce vraiment conforme ? Comment ca fonctionne concretement ? Ce guide repond a toutes vos questions.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">La delegation du sacrifice est-elle valide en Islam ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Oui, absolument. La delegation du sacrifice (appelee <strong className="text-text-primary">tawkil</strong>) est unanimement reconnue comme valide par les quatre ecoles juridiques de l&apos;Islam (hanafite, malikite, chafiite et hanbalite).
            </p>
            <p className="text-text-muted leading-relaxed">
              Le Prophete (paix et benedictions sur lui) a lui-meme delegue des sacrifices. Ali ibn Abi Talib (qu&apos;Allah l&apos;agree) a ete mandate pour superviser les sacrifices restants lors du pelerinage d&apos;adieu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Le processus en 4 etapes simples</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Vous commandez en ligne", desc: "Choisissez votre type de sacrifice (Aid, Aqiqa, Sadaqa), indiquez le nom pour lequel le sacrifice sera effectue, et payez en toute securite." },
                { step: "2", title: "Votre mouton est reserve", desc: "Un mouton repondant aux criteres islamiques (age, sante, absence de defauts) est selectionne et reserve en votre nom." },
                { step: "3", title: "Le sacrifice est effectue le jour J", desc: "Le jour de l\u2019Aid, un cheikh diplome effectue le sacrifice selon les regles de la Sunnah : orientation vers la Qibla, mention du nom d\u2019Allah et de votre nom, methode conforme." },
                { step: "4", title: "Vous recevez votre video", desc: "Une video nominative du sacrifice est envoyee par WhatsApp dans les 24h. La viande est integralement distribuee aux familles dans le besoin." },
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
            <h2 className="text-2xl font-bold text-text-primary mb-4">Les conditions de conformite a la Sunnah</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Pour qu&apos;un sacrifice soit valide, plusieurs conditions doivent etre respectees. Chez Qurbaniya, chaque point est scrupuleusement verifie :
            </p>
            <ul className="space-y-2">
              {[
                "L\u2019animal doit avoir l\u2019age requis (minimum 1 an pour un mouton)",
                "L\u2019animal doit etre exempt de defauts apparents",
                "Le sacrifice doit etre effectue pendant la periode valide (du 10 au 13 Dhoul Hijja)",
                "Le sacrificateur doit mentionner le nom d\u2019Allah (Bismillah, Allahu Akbar)",
                "Le nom de la personne pour laquelle le sacrifice est fait doit etre prononce",
                "L\u2019animal doit etre oriente vers la Qibla",
                "La methode doit etre rapide et respectueuse de l\u2019animal",
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
              Un sacrifice conforme, simple et transparent
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Cheikh diplome &middot; Video nominative &middot; Viande distribuee &middot; 140&euro;
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Commander mon sacrifice <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Pourquoi choisir de deleguer plutot que de faire soi-meme ?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              En France, organiser son propre sacrifice devient de plus en plus complexe : normes sanitaires strictes, abattoirs surcharges pendant l&apos;Aid, couts eleves (350-400&euro; en moyenne), et logistique de transport et de stockage de la viande.
            </p>
            <p className="text-text-muted leading-relaxed">
              Deleguer son sacrifice permet d&apos;accomplir cette obligation religieuse de maniere conforme, a moindre cout, tout en ayant un impact social direct : la viande est distribuee a des familles dans le besoin.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">La video nominative : votre preuve de sacrifice</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              C&apos;est ce qui distingue un service serieux d&apos;un service douteux. Chez Qurbaniya, chaque sacrifice est filme individuellement. La video montre :
            </p>
            <ul className="space-y-2 text-text-muted text-sm font-inter">
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> La mention de votre nom avant le sacrifice</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> Le sacrifice effectue selon les regles</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> La distribution de la viande aux familles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Questions frequentes</h2>
            <div className="space-y-4">
              {[
                { q: "Puis-je commander pour quelqu\u2019un d\u2019autre ?", a: "Oui, vous pouvez indiquer le nom de n\u2019importe quelle personne lors de la commande. Le sacrifice sera effectue en son nom." },
                { q: "Quand dois-je commander ?", a: "Le plus tot possible. Les places sont limitees et les prix augmentent a l\u2019approche de l\u2019Aid. Nous recommandons de reserver au moins 2 semaines avant." },
                { q: "Et si je veux annuler ?", a: "Vous pouvez annuler jusqu\u2019a 7 jours avant l\u2019Aid pour un remboursement complet. Contactez-nous par email ou WhatsApp." },
              ].map((faq, i) => (
                <div key={i} className="bg-bg-secondary rounded-xl p-5 border border-gray-100">
                  <h3 className="text-text-primary font-bold mb-2 text-sm">{faq.q}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/blog/date-aid-al-adha-2026" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Date de l&apos;Aid 2026
          </Link>
          <Link
            href="/blog/prix-mouton-france-2026"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Prix du mouton en France <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
