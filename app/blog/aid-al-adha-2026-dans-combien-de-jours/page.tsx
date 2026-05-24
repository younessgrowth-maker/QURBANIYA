import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { AID_DATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "🌙 Aïd al-Adha 2026 dans combien de jours ? Compte à rebours officiel",
  description:
    "📅 L'Aïd al-Adha 2026 tombe le mercredi 27 mai 2026 en France. Combien de jours restent ? Calendrier complet (Arafat, tachriq) et comment réserver votre sacrifice avant la clôture 🐑",
  keywords: [
    "aid 2026 dans combien de jours",
    "aid 2026 mai",
    "27 mai 2026 aid",
    "aid mai 2026",
    "aid 27 mai",
    "quand aid adha 2026",
    "l'aid mai 2026",
    "27 mai aid",
    "aid mai 2026 date",
    "compte à rebours aid 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/blog/aid-al-adha-2026-dans-combien-de-jours",
  },
  openGraph: {
    title: "🌙 Aïd al-Adha 2026 dans combien de jours ?",
    description:
      "Mercredi 27 mai 2026. Compte à rebours, calendrier complet et comment réserver votre sacrifice 🐑",
    url: "https://qurbaniya.fr/blog/aid-al-adha-2026-dans-combien-de-jours",
    type: "article",
    publishedTime: "2026-05-12T00:00:00Z",
    modifiedTime: "2026-05-12T00:00:00Z",
  },
};

// Revalidate every 6 hours so the countdown stays close to real
export const revalidate = 21600;

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Aïd al-Adha 2026 dans combien de jours ? Compte à rebours",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/blog/aid-al-adha-2026-dans-combien-de-jours",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleFaqJsonLd(daysLeft: number) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "L'Aïd al-Adha 2026 c'est dans combien de jours ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `L'Aïd al-Adha 2026 tombe le mercredi 27 mai 2026 en France. Il reste ${daysLeft} jour${daysLeft > 1 ? "s" : ""} avant la fête du sacrifice (10 Dhoul Hijja 1447).`,
        },
      },
      {
        "@type": "Question",
        name: "Quand est l'Aïd al-Adha en 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'Aïd al-Adha 2026 (Aïd el-Kébir, Tabaski) est célébré le mercredi 27 mai 2026 en France. Le jour d'Arafat est le mardi 26 mai, et les jours de tachriq s'étendent du jeudi 28 au samedi 30 mai 2026.",
        },
      },
      {
        "@type": "Question",
        name: "Jusqu'à quand peut-on réserver un sacrifice pour l'Aïd 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les réservations Qurbaniya pour l'Aïd 2026 ferment le 27 mai 2026 à 03h00 (heure de Paris), quelques heures avant le sacrifice. Il reste ${daysLeft} jour${daysLeft > 1 ? "s" : ""} pour réserver, mais les places sont limitées : nous recommandons de ne pas attendre.`,
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

export default function ArticleCountdown() {
  const now = new Date();
  const aid = new Date(AID_DATE);
  const msPerDay = 86_400_000;
  const daysLeft = Math.max(
    0,
    Math.ceil((aid.getTime() - now.getTime()) / msPerDay)
  );
  const aidPassed = daysLeft === 0;

  return (
    <>
      <ArticleJsonLd />
      {ArticleFaqJsonLd(daysLeft)}
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Blog", url: "https://qurbaniya.fr/blog" },
          {
            name: "Aïd 2026 dans combien de jours",
            url: "https://qurbaniya.fr/blog/aid-al-adha-2026-dans-combien-de-jours",
          },
        ]}
      />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/" className="hover:text-gold transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-text-primary">Aïd 2026 dans combien de jours</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
            Compte à rebours
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Mis à jour automatiquement
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 4 min de lecture
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Aïd al-Adha 2026 dans <span className="text-gold">combien de jours</span> ?
        </h1>

        {/* Big countdown box */}
        {aidPassed ? (
          <div className="bg-bg-secondary border-2 border-gold rounded-card p-6 md:p-8 text-center mb-8">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-2 font-inter">
              L&apos;Aïd al-Adha 2026 est passé
            </p>
            <p className="text-text-primary font-bold text-lg">
              La prochaine édition (Aïd 2027) sera vers le 16 mai 2027 selon les calculs astronomiques.
            </p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-bg-secondary border-2 border-gold rounded-card p-6 md:p-10 text-center mb-8">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-3 font-inter">
              Il reste exactement
            </p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-6xl md:text-8xl font-black text-gold leading-none">
                {daysLeft}
              </span>
              <span className="text-2xl md:text-3xl font-bold text-text-primary">
                jour{daysLeft > 1 ? "s" : ""}
              </span>
            </div>
            <p className="text-text-muted leading-relaxed mb-1">
              avant l&apos;Aïd al-Adha 2026
            </p>
            <p className="text-text-primary font-bold">
              📅 Mercredi 27 mai 2026
            </p>
          </div>
        )}

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          L&apos;<strong className="text-text-primary">Aïd al-Adha 2026</strong> — aussi appelé <strong className="text-text-primary">Aïd el-Kébir</strong>, <strong className="text-text-primary">Tabaski</strong> ou <strong className="text-text-primary">fête du sacrifice</strong> — tombe le <strong className="text-text-primary">mercredi 27 mai 2026</strong> en France. Cela correspond au 10 Dhoul Hijja 1447 du calendrier hégirien.
        </p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              📅 Calendrier complet de l&apos;Aïd 2026
            </h2>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">26 mai 2026</span>
                  <span>
                    <strong className="text-text-primary">Mardi · Jour d&apos;Arafat</strong> — Jeûne fortement recommandé pour les non-pèlerins
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">27 mai 2026</span>
                  <span>
                    <strong className="text-text-primary">Mercredi · Jour de l&apos;Aïd</strong> — Prière du matin + sacrifice (Yawm an-Nahr)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">28 mai 2026</span>
                  <span>1ᵉʳ jour de tachriq · le sacrifice reste valide</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">29 mai 2026</span>
                  <span>2ᵉ jour de tachriq</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">30 mai 2026</span>
                  <span>3ᵉ et dernier jour de tachriq</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Pourquoi le 27 mai cette année ?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              L&apos;Aïd al-Adha est célébré chaque année le <strong className="text-text-primary">10 Dhoul Hijja</strong>, le dernier mois du calendrier hégirien. Le calendrier islamique étant lunaire (~354 jours), la date de l&apos;Aïd avance de ~11 jours chaque année dans le calendrier grégorien.
            </p>
            <p className="text-text-muted leading-relaxed">
              En 2026, le mois de Dhoul Hijja 1447 commence le 17 mai 2026 selon les calculs astronomiques officiels (calendrier <em>Umm al-Qura</em>). Le 10 Dhoul Hijja — jour du sacrifice — tombe donc le mercredi 27 mai 2026.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⏳ Il reste {daysLeft} jour{daysLeft > 1 ? "s" : ""} — que faire maintenant ?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Si vous comptez accomplir le sacrifice de l&apos;Aïd 2026, voici les actions à prioriser dans l&apos;ordre :
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span>
                  <strong className="text-text-primary">Réservez votre sacrifice</strong> — Chaque année, les places s&apos;épuisent dans les derniers jours. Voir notre <Link href="/blog/prix-mouton-france-2026" className="text-gold hover:underline">guide des prix du mouton 2026</Link>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span>
                  <strong className="text-text-primary">Préparez vos intentions (niyyah)</strong> — Décidez au nom de qui vous voulez accomplir le sacrifice (vous, famille, sadaqa pour un proche).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <span>
                  <strong className="text-text-primary">Renseignez-vous sur la prière de l&apos;Aïd</strong> — Vérifiez l&apos;horaire et le lieu auprès de votre mosquée locale (généralement 7h-10h le matin).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <span>
                  <strong className="text-text-primary">Jeûnez le jour d&apos;Arafat (26 mai)</strong> — Sounnah fortement recommandée pour les non-pèlerins. Selon un hadith authentique, ce jeûne expie les péchés de l&apos;année passée et de celle à venir.
                </span>
              </li>
            </ol>
          </section>

          {/* CTA mid-article */}
          {!aidPassed && (
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
              <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
                Il reste {daysLeft} jour{daysLeft > 1 ? "s" : ""} — réservez avant la clôture
              </h3>
              <p className="text-white/70 text-sm mb-4 font-inter">
                Sacrifice conforme à la Sunnah · Vidéo nominative WhatsApp · 140€ tout inclus
              </p>
              <Link
                href="/commander"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
              >
                Réserver mon sacrifice <ArrowRight size={14} />
              </Link>
            </div>
          )}

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Et les pays voisins ?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              La quasi-totalité des pays musulmans observe l&apos;Aïd al-Adha 2026 le <strong className="text-text-primary">mercredi 27 mai 2026</strong>, en suivant le calendrier saoudien <em>Umm al-Qura</em>. Quelques décalages d&apos;un jour peuvent exister selon la méthode locale d&apos;observation du croissant lunaire :
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1">
              <li>• <strong className="text-text-primary">France, Belgique, Suisse</strong> : 27 mai 2026 (alignement majoritaire)</li>
              <li>• <strong className="text-text-primary">Maroc, Algérie, Tunisie</strong> : 27 mai 2026 (parfois +1 jour selon observation locale)</li>
              <li>• <strong className="text-text-primary">Sénégal, Mali, Côte d&apos;Ivoire (Tabaski)</strong> : généralement aligné</li>
              <li>• <strong className="text-text-primary">Arabie Saoudite, Émirats, Égypte</strong> : 27 mai 2026 confirmé</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Pour aller plus loin
            </h2>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li>
                • <Link href="/blog/date-aid-al-adha-2026" className="text-gold hover:underline">Date complète Aïd al-Adha 2026 (jour d&apos;Arafat, tachriq, horaires)</Link>
              </li>
              <li>
                • <Link href="/blog/prix-mouton-france-2026" className="text-gold hover:underline">Guide des prix du mouton en France 2026</Link>
              </li>
              <li>
                • <Link href="/blog/sacrifice-aid-en-ligne-comment-ca-marche" className="text-gold hover:underline">Comment fonctionne le sacrifice en ligne ?</Link>
              </li>
              <li>
                • <Link href="/blog/tabaski-2026-france" className="text-gold hover:underline">Tabaski 2026 en France : déléguer son sacrifice depuis l&apos;Hexagone</Link>
              </li>
            </ul>
          </section>
        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
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
