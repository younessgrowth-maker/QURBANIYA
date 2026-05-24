import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "🌙 Jour d'Arafat 2026 : mardi 26 mai · Jeûne, vertus, dou'as",
  description:
    "📅 Le jour d'Arafat 2026 tombe le mardi 26 mai (9 Dhoul Hijja 1447). Jeûne fortement recommandé, vertus immenses (pardon de 2 années de péchés), dou'as et lien avec l'Aïd al-Adha du 27 mai 🐑",
  keywords: [
    "jour d'arafat 2026",
    "date arafat 2026",
    "date arafat 2026 france",
    "jeune arafat 2026",
    "jeuner arafat 2026",
    "vertus jour arafat",
    "recompense jour arafat",
    "doua jour arafat",
    "dou'a jour d'arafat",
    "9 dhoul hijja 2026",
    "yawm arafa",
    "yawm arafat",
    "arafat aid al adha",
    "comment jeuner arafat",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/blog/jour-arafat-2026",
  },
  openGraph: {
    title: "🌙 Jour d'Arafat 2026 : mardi 26 mai · Jeûne, vertus, dou'as",
    description:
      "📅 Le jour d'Arafat 2026 tombe le mardi 26 mai 2026. Jeûne fortement recommandé, dou'as et lien avec l'Aïd al-Adha 🐑",
    url: "https://qurbaniya.fr/blog/jour-arafat-2026",
    type: "article",
    publishedTime: "2026-05-24T00:00:00Z",
    modifiedTime: "2026-05-24T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Jour d'Arafat 2026 : c'est le mardi 26 mai — jeûne, vertus et dou'as",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: {
        "@type": "ImageObject",
        url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg",
      },
    },
    mainEntityOfPage: "https://qurbaniya.fr/blog/jour-arafat-2026",
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
        name: "Quelle est la date du jour d'Arafat en 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le jour d'Arafat 2026 tombe le mardi 26 mai 2026, correspondant au 9 Dhoul Hijja 1447 du calendrier hégirien. C'est la veille de l'Aïd al-Adha (mercredi 27 mai 2026).",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il jeûner le jour d'Arafat ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le jeûne du jour d'Arafat est fortement recommandé (sounnah mou'akkadah) pour tous les musulmans qui ne sont pas en pèlerinage. Selon un hadith authentique rapporté par Muslim, ce jeûne expie les péchés de l'année passée et de l'année à venir. Les pèlerins du Hajj, eux, ne jeûnent pas ce jour-là.",
        },
      },
      {
        "@type": "Question",
        name: "À quelle heure commence et finit le jeûne d'Arafat ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le jeûne du jour d'Arafat suit les mêmes règles que tout jeûne islamique : de l'aube (Fajr) au coucher du soleil (Maghrib). En France métropolitaine le 26 mai 2026, l'aube se situe vers 4h00-4h30 et le coucher du soleil vers 21h30-21h45 selon la ville. Consultez les horaires de prière de votre mosquée locale pour les horaires exacts.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la meilleure dou'a à faire le jour d'Arafat ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Selon le Prophète ﷺ : « La meilleure invocation est celle du jour d'Arafat, et la meilleure parole que j'ai prononcée moi-même ainsi que les prophètes avant moi est : La ilaha illa Allah wahdahou la charika lah, lahou-l-moulk wa lahou-l-hamd wa houwa 'ala koulli chay'in qadir » (Tirmidhi). Il est également recommandé de multiplier le rappel d'Allah (dhikr), la demande de pardon (istighfar) et les invocations personnelles tout au long de la journée.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le lien entre le jour d'Arafat et l'Aïd al-Adha ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le jour d'Arafat est la veille immédiate de l'Aïd al-Adha. C'est le 9 Dhoul Hijja, le jour le plus important du pèlerinage du Hajj : les pèlerins se rassemblent sur le mont Arafat pour invoquer Allah. Le lendemain (10 Dhoul Hijja, mercredi 27 mai 2026), c'est l'Aïd al-Adha avec le sacrifice rituel.",
        },
      },
      {
        "@type": "Question",
        name: "Peut-on jeûner seulement le jour d'Arafat sans les autres jours de Dhoul Hijja ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, parfaitement. Le jeûne du jour d'Arafat seul est une sounnah à part entière, indépendante du jeûne des 9 premiers jours de Dhoul Hijja (qui lui aussi est recommandé mais facultatif). Beaucoup de musulmans jeûnent uniquement le jour d'Arafat en raison de l'immense récompense annoncée par le Prophète ﷺ.",
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

export default function ArticleJourArafat() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Blog", url: "https://qurbaniya.fr/blog" },
          {
            name: "Jour d'Arafat 2026",
            url: "https://qurbaniya.fr/blog/jour-arafat-2026",
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
          <span className="text-text-primary">Jour d&apos;Arafat 2026</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
            Guide religieux
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Publié le 24 mai 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min de lecture
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Jour d&apos;Arafat 2026 : c&apos;est le{" "}
          <span className="text-gold">mardi 26 mai 2026</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          Le jour d&apos;Arafat — <em>Yawm &apos;Arafa</em>, le{" "}
          <strong className="text-text-primary">9 Dhoul Hijja 1447</strong>{" "}
          — tombe le <strong className="text-text-primary">mardi 26 mai 2026</strong>, veille de l&apos;Aïd al-Adha. C&apos;est l&apos;un des jours les plus bénis de l&apos;année islamique : le jeûne y est fortement recommandé et expie les péchés de deux années. Voici tout ce qu&apos;il faut savoir.
        </p>

        {/* Quick summary card */}
        <div className="bg-bg-secondary rounded-xl p-6 border border-gold/10 mb-10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">
            L&apos;essentiel en 30 secondes
          </h2>
          <ul className="space-y-2 text-text-muted text-sm font-inter">
            <li>
              📅 <strong className="text-text-primary">Date :</strong> mardi 26 mai 2026 (9 Dhoul Hijja 1447)
            </li>
            <li>
              🌙 <strong className="text-text-primary">Veille de :</strong> l&apos;Aïd al-Adha (mercredi 27 mai 2026)
            </li>
            <li>
              🤲 <strong className="text-text-primary">Recommandé :</strong> jeûner et multiplier les invocations
            </li>
            <li>
              ✨ <strong className="text-text-primary">Récompense :</strong> expiation des péchés de l&apos;année passée et de l&apos;année à venir
            </li>
            <li>
              🚫 <strong className="text-text-primary">Exception :</strong> les pèlerins du Hajj ne jeûnent pas ce jour-là
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Quand exactement tombe le jour d&apos;Arafat en 2026 ?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le jour d&apos;Arafat est célébré le{" "}
              <strong className="text-text-primary">9 Dhoul Hijja</strong> de chaque année hégirienne. En 2026, cela correspond au{" "}
              <strong className="text-text-primary">mardi 26 mai 2026</strong> selon les calculs astronomiques retenus par la majorité des fédérations musulmanes en France et à l&apos;international.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Cette date est cohérente avec la date confirmée pour l&apos;Aïd al-Adha (mercredi 27 mai 2026), puisque Arafat tombe toujours la veille du jour du sacrifice (<em>Yawm an-Nahr</em>).
            </p>
            <p className="text-text-muted leading-relaxed">
              Pour les pèlerins présents à La Mecque, le 9 Dhoul Hijja est le jour de la grande station sur le{" "}
              <strong className="text-text-primary">mont Arafat</strong>, à environ 20 km de La Mecque. C&apos;est le rite central du Hajj : sans cette station (<em>wouqouf</em>), le pèlerinage est invalide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Pourquoi le jour d&apos;Arafat est-il si important ?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le jour d&apos;Arafat est, selon de nombreux savants, <strong className="text-text-primary">le meilleur jour de l&apos;année islamique</strong>. Plusieurs hadiths authentiques en soulignent l&apos;importance exceptionnelle :
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                « Il n&apos;y a pas de jour où Allah affranchit autant de serviteurs du Feu que le jour d&apos;Arafat. »
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Rapporté par Muslim (n° 1348), d&apos;après &apos;Aïcha رضي الله عنها
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              C&apos;est également ce jour-là, lors du Pèlerinage d&apos;Adieu (10 H), que fut révélé au Prophète Muhammad ﷺ le verset complétant la religion :
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                « Aujourd&apos;hui, J&apos;ai parachevé pour vous votre religion, et accompli sur vous Mon bienfait, et agréé pour vous l&apos;Islam comme religion. »
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Coran, sourate Al-Maïda (5:3)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed">
              Ce verset, descendu un vendredi sur le mont Arafat, marque l&apos;achèvement de la révélation. Le jour d&apos;Arafat porte ainsi à la fois une dimension historique, spirituelle et eschatologique majeure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Le jeûne du jour d&apos;Arafat : règles et récompense
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le jeûne du jour d&apos;Arafat est une{" "}
              <strong className="text-text-primary">sounnah mou&apos;akkadah</strong> (sounnah confirmée) pour tous les musulmans qui ne sont pas en pèlerinage. Le Prophète ﷺ a dit :
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                « Le jeûne du jour d&apos;Arafat — j&apos;espère d&apos;Allah qu&apos;il expie les péchés de l&apos;année passée et ceux de l&apos;année à venir. »
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Rapporté par Muslim (n° 1162), d&apos;après Abou Qatada رضي الله عنه
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Concrètement, le jeûne suit les mêmes règles que tout jeûne islamique :
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Début :</strong> à l&apos;apparition de l&apos;aube (Fajr) — en France le 26 mai 2026, vers 4h00-4h30 selon la ville
              </li>
              <li>
                • <strong className="text-text-primary">Fin :</strong> au coucher du soleil (Maghrib) — vers 21h30-21h45 en France
              </li>
              <li>
                • <strong className="text-text-primary">Intention :</strong> formulée la veille au soir ou avant l&apos;aube (<em>niyyah</em>)
              </li>
              <li>
                • <strong className="text-text-primary">Interdits :</strong> manger, boire, fumer, et les rapports conjugaux pendant la journée
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">Important :</strong> les pèlerins présents à Arafat <em>ne jeûnent pas</em> ce jour-là, conformément à la sounnah du Prophète ﷺ qui ne l&apos;a pas jeûné lors du Pèlerinage d&apos;Adieu. Le jeûne est réservé aux non-pèlerins.
            </p>
            <p className="text-text-muted leading-relaxed">
              Pour les femmes en période de menstrues, post-partum, les malades, voyageurs, ou personnes âgées qui ne peuvent jeûner : il n&apos;y a aucune obligation, et la récompense des bonnes actions du jour reste accessible par d&apos;autres voies (dhikr, sadaqa, dou&apos;as).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Les dou&apos;as et invocations recommandées
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le Prophète ﷺ a dit :
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                « La meilleure invocation est celle du jour d&apos;Arafat, et la meilleure parole que j&apos;ai prononcée, moi et les prophètes avant moi, est :
              </p>
              <p className="text-text-primary font-bold mt-3 leading-relaxed">
                « La ilaha illa Allah, wahdahou la charika lah, lahou-l-moulk wa lahou-l-hamd, wa houwa &apos;ala koulli chay&apos;in qadir »
              </p>
              <p className="text-text-muted text-sm mt-2 italic">
                (Il n&apos;y a de divinité digne d&apos;adoration qu&apos;Allah, Seul sans associé. À Lui la royauté, à Lui la louange, et Il est Omnipotent sur toute chose.)
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Rapporté par Tirmidhi (n° 3585)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              En plus de cette parole de tawhid, il est recommandé de profiter de cette journée pour :
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • Multiplier le <strong className="text-text-primary">dhikr</strong> (Subhana Allah, Al-hamdoulillah, Allahou Akbar)
              </li>
              <li>
                • Demander le <strong className="text-text-primary">pardon (istighfar)</strong> pour soi, sa famille, et toute la communauté
              </li>
              <li>
                • Faire des <strong className="text-text-primary">dou&apos;as personnelles</strong> — c&apos;est un jour où les invocations sont particulièrement exaucées
              </li>
              <li>
                • <strong className="text-text-primary">Lire le Coran</strong> et méditer sur ses sens
              </li>
              <li>
                • Donner la <strong className="text-text-primary">sadaqa</strong> aux nécessiteux
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Beaucoup de savants recommandent de consacrer particulièrement les heures qui précèdent le coucher du soleil aux invocations, car c&apos;est le moment où les pèlerins à Arafat sont eux-mêmes en pleine station de dou&apos;a.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Le lien entre le jour d&apos;Arafat et l&apos;Aïd al-Adha
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le jour d&apos;Arafat n&apos;est pas un événement isolé : il est le <strong className="text-text-primary">prélude direct</strong> à l&apos;Aïd al-Adha. La séquence des 3 jours clés :
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10 mb-4">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">8 Dhoul Hijja</span>
                  <span>
                    <strong className="text-text-primary">Lundi 25 mai 2026</strong> — <em>Yawm at-Tarwiya</em>, jour où les pèlerins se rendent à Mina
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">9 Dhoul Hijja</span>
                  <span>
                    <strong className="text-text-primary">Mardi 26 mai 2026</strong> — <em>Yawm &apos;Arafa</em>, jour d&apos;Arafat (jeûne et invocations)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">10 Dhoul Hijja</span>
                  <span>
                    <strong className="text-text-primary">Mercredi 27 mai 2026</strong> — <em>Yawm an-Nahr</em>, Aïd al-Adha et sacrifice rituel
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Le <strong className="text-text-primary">sacrifice (qurbani)</strong> est l&apos;acte central du jour de l&apos;Aïd. Selon les quatre écoles juridiques sunnites, il peut être effectué par soi-même ou délégué à un tiers (<em>tawkil</em>) — une pratique qui remonte aux compagnons du Prophète ﷺ.
            </p>
            <p className="text-text-muted leading-relaxed">
              Si vous n&apos;avez pas encore organisé votre sacrifice, le jour d&apos;Arafat est{" "}
              <strong className="text-text-primary">le dernier moment idéal</strong> pour le faire — la veille du jour J. Le sacrifice est valide pendant les 4 jours qui suivent Arafat (27, 28, 29 et 30 mai 2026), mais l&apos;essentiel est qu&apos;il soit organisé avant que vous n&apos;entamiez cette journée bénie.
            </p>
          </section>

          {/* CTA Box — central conversion bridge */}
          <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-gold/10 rounded-2xl border-2 border-gold/30 p-6 md:p-8 my-10">
            <h3 className="text-xl md:text-2xl font-black text-text-primary mb-3">
              Pas encore réservé votre sacrifice pour l&apos;Aïd 2026 ?
            </h3>
            <p className="text-text-muted leading-relaxed mb-5">
              Qurbaniya organise votre sacrifice à Madagascar selon les règles de la Sounnah, avec <strong className="text-text-primary">vidéo nominative WhatsApp dans les 24h</strong>. La viande est distribuée aux familles dans le besoin sur place.
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter mb-5">
              <li>✓ 140 € tout inclus</li>
              <li>✓ Sacrifice conforme à la Sounnah, supervisé par un cheikh</li>
              <li>✓ Vidéo nominative envoyée par WhatsApp + email</li>
              <li>✓ Réservation ouverte jusqu&apos;au mercredi 27 mai 3h du matin</li>
            </ul>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
            >
              Réserver mon sacrifice <ArrowRight size={16} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Et après Arafat ? Les jours de tachriq
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Juste après l&apos;Aïd al-Adha (27 mai) viennent les{" "}
              <strong className="text-text-primary">jours de tachriq</strong> (28, 29 et 30 mai 2026). Pendant ces 3 jours :
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • Le <strong className="text-text-primary">sacrifice reste valide</strong> jusqu&apos;au coucher du soleil du 30 mai
              </li>
              <li>
                • Le <strong className="text-text-primary">takbir</strong> (Allahou Akbar, Allahou Akbar, La ilaha illa Allah…) est maintenu après chaque prière obligatoire, jusqu&apos;à la prière du &apos;Asr du 30 mai inclus
              </li>
              <li>
                • Le <strong className="text-text-primary">jeûne y est interdit</strong> selon la majorité des écoles, car ce sont des « jours de manger et de boire et d&apos;évoquer Allah »
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Pour aller plus loin sur le calendrier complet de Dhoul Hijja, consultez notre{" "}
              <Link
                href="/blog/date-aid-al-adha-2026"
                className="text-gold hover:underline font-semibold"
              >
                article dédié à la date de l&apos;Aïd al-Adha 2026
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Que faire si je ne peux pas jeûner le jour d&apos;Arafat ?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le jeûne n&apos;est qu&apos;une des nombreuses portes d&apos;adoration ouvertes ce jour-là. Si vous êtes empêché·e de jeûner (maladie, voyage, menstrues, post-partum, allaitement…), vous pouvez tout à fait bénéficier de la baraka du jour d&apos;Arafat à travers :
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Multiplier les invocations</strong> personnelles — c&apos;est le jour où elles sont les plus exaucées
              </li>
              <li>
                • <strong className="text-text-primary">Faire la sadaqa</strong> : donner aux nécessiteux, soutenir une cause religieuse
              </li>
              <li>
                • <strong className="text-text-primary">Réciter et méditer</strong> le Coran
              </li>
              <li>
                • <strong className="text-text-primary">Maintenir le dhikr</strong> toute la journée, particulièrement la formule de tawhid
              </li>
              <li>
                • <strong className="text-text-primary">Préparer son sacrifice de l&apos;Aïd</strong> (qurbani) si ce n&apos;est pas encore fait — c&apos;est un acte d&apos;adoration majeur en lui-même
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              L&apos;intention sincère et l&apos;effort que vous mettez ce jour-là sont eux-mêmes des actes d&apos;adoration récompensés, quelle que soit la forme qu&apos;ils prennent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Questions fréquentes sur le jour d&apos;Arafat
            </h2>
            <div className="space-y-4">
              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Le jeûne d&apos;Arafat est-il obligatoire ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Non, ce n&apos;est pas une obligation (<em>fard</em>), mais une <strong className="text-text-primary">sounnah mou&apos;akkadah</strong> (sounnah confirmée). Le Prophète ﷺ a fortement encouragé ce jeûne en mentionnant sa récompense unique (expiation des péchés de 2 années). Ne pas le jeûner n&apos;est pas un péché, mais c&apos;est passer à côté d&apos;une opportunité spirituelle exceptionnelle.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Faut-il jeûner aussi les 8 jours qui précèdent Arafat ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Le jeûne des <strong className="text-text-primary">9 premiers jours de Dhoul Hijja</strong> (du 17 au 25 mai 2026 en France) est une sounnah selon plusieurs hadiths. Le Prophète ﷺ a dit que les actes de ces 10 premiers jours sont les plus aimés d&apos;Allah. Mais ce jeûne n&apos;est pas conditionnel : on peut tout à fait jeûner uniquement le jour d&apos;Arafat (9 Dhoul Hijja) si on ne peut pas faire les autres.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Le jour d&apos;Arafat tombe le même jour partout dans le monde ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  La <em>majorité</em> des pays s&apos;alignent sur la date saoudienne (mardi 26 mai 2026), car c&apos;est le jour où les pèlerins effectuent la station d&apos;Arafat à La Mecque. Certains pays peuvent décaler d&apos;un jour selon l&apos;observation locale du croissant lunaire. En France, la plupart des fédérations suivent la date saoudienne, donc le mardi 26 mai 2026.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Que faire si j&apos;oublie de formuler l&apos;intention de jeûner la veille ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Pour un jeûne surérogatoire comme celui d&apos;Arafat, l&apos;intention peut être formulée <strong className="text-text-primary">dans la journée</strong>, tant que vous n&apos;avez ni mangé ni bu depuis l&apos;aube. C&apos;est une facilité accordée pour le jeûne volontaire. Si vous vous réveillez au matin du 26 mai 2026 et n&apos;avez encore rien consommé, vous pouvez formuler l&apos;intention à ce moment-là et entamer le jeûne.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Quelle est la différence entre Arafat et le pèlerinage du Hajj ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Le <strong className="text-text-primary">Hajj</strong> est le pèlerinage complet à La Mecque (5e pilier de l&apos;Islam), qui s&apos;étend sur plusieurs jours (du 8 au 13 Dhoul Hijja). Le <strong className="text-text-primary">jour d&apos;Arafat</strong> (9 Dhoul Hijja) est <em>une journée précise</em> du Hajj, considérée comme son rite central. Pour les non-pèlerins, c&apos;est une journée d&apos;adoration intense par le jeûne et les invocations, sans avoir à se déplacer.
                </p>
              </details>
            </div>
          </section>
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
            <ArrowLeft size={14} /> Retour au blog
          </Link>
          <Link
            href="/blog/date-aid-al-adha-2026"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Article suivant : Date de l&apos;Aïd al-Adha 2026 <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
