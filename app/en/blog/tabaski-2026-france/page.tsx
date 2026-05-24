import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Tabaski 2026 from France: 27 May · Halal sacrifice from £140 🐑",
  description:
    "Tabaski 2026 confirmed for Wednesday 27 May. West African diaspora in France or the UK? Delegated halal sacrifice, personalised video, distribution to families in need. €140 all-inclusive.",
  keywords: [
    "tabaski 2026",
    "tabaski 2026 date",
    "tabaski 2026 france",
    "tabaski from france",
    "tabaski delegate",
    "tabaski online sacrifice",
    "tabaski diaspora",
    "tabaski senegal mali",
    "tabaski ivory coast",
    "tabaski guinea",
    "tabaski uk diaspora",
    "delegate tabaski sacrifice",
    "online tabaski qurbani",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/en/blog/tabaski-2026-france",
    languages: blogHreflangAlternates("tabaski-2026-france"),
  },
  openGraph: {
    title: "🐑 Tabaski 2026 — 27 May · Delegated halal sacrifice from France",
    description:
      "West African diaspora in France for Tabaski 2026? Delegated halal sacrifice, personalised video, distribution to families. €140 all-inclusive.",
    url: "https://qurbaniya.fr/en/blog/tabaski-2026-france",
    type: "article",
    locale: "en",
    publishedTime: "2026-05-11T00:00:00Z",
    modifiedTime: "2026-05-25T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tabaski 2026 from France: delegating your sacrifice from abroad",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-11",
    dateModified: "2026-05-25",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/en/blog/tabaski-2026-france",
    inLanguage: "en",
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
        name: "What is the date of Tabaski 2026 in France?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tabaski 2026 (Eid al-Adha, the Festival of Sacrifice) falls on Wednesday 27 May 2026 in France, corresponding to 10 Dhul Hijjah 1447 in the Hijri calendar. The same date is observed in Senegal, Mali, Ivory Coast and Guinea, sometimes shifted by a day depending on local moon sighting.",
        },
      },
      {
        "@type": "Question",
        name: "Are Tabaski and Eid al-Adha the same festival?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Tabaski is the name used in French-speaking West Africa (Senegal, Mali, Ivory Coast, Guinea, Burkina Faso). Eid al-Adha is the official Arabic name. Eid el-Kebir is used in the Maghreb. They all refer to the same celebration: the ritual sacrifice on 10 Dhul Hijjah commemorating Ibrahim (peace be upon him).",
        },
      },
      {
        "@type": "Question",
        name: "Can I perform Tabaski from France if I cannot travel back home?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Delegation of the sacrifice (tawkil) is fully valid according to the four Sunni schools of jurisprudence. You can delegate your sacrifice to a trusted service that performs it on your behalf, in accordance with the rules of the Sunnah. You receive a personalised video as proof and the meat is distributed to families in need.",
        },
      },
      {
        "@type": "Question",
        name: "How much does delegating a Tabaski 2026 sacrifice cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At Qurbaniya, delegating your sacrifice for Tabaski 2026 costs €140 all-inclusive: a sheep compliant with the Sunnah, sacrifice supervised by a sheikh, personalised video sent via WhatsApp, and charitable distribution to families in need in Madagascar.",
        },
      },
      {
        "@type": "Question",
        name: "By when do I need to book for Tabaski 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bookings close on 27 May 2026 at 3:00 AM (Paris time), a few hours before the sacrifice on the day of Tabaski. To secure your sacrifice and quality of service, we strongly recommend booking at least 7 to 15 days in advance as places are limited.",
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
        { name: "Home", url: "https://qurbaniya.fr/en" },
        { name: "Blog", url: "https://qurbaniya.fr/en/blog" },
        { name: "Tabaski 2026 France", url: "https://qurbaniya.fr/en/blog/tabaski-2026-france" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/en" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/en/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Tabaski 2026 France</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="tabaski-2026-france"
          currentLocale="en"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Guide</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Published 11 May 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Tabaski 2026 from France: delegating your sacrifice from abroad — <span className="text-gold">Wednesday 27 May</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          <strong className="text-text-primary">Tabaski 2026</strong> falls on <strong className="text-text-primary">Wednesday 27 May 2026</strong>. You live in France (or anywhere in the diaspora) and can&apos;t travel back home this year? Delegating the sacrifice is a solution recognised by the four schools of Islamic jurisprudence: your sacrifice is performed on your behalf, in accordance with the Sunnah, and the meat feeds families in need.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Date of Tabaski 2026 in France</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">Tabaski 2026</strong> is celebrated on <strong className="text-text-primary">Wednesday 27 May 2026</strong> in France, corresponding to 10 Dhul Hijjah 1447 in the Hijri calendar. The same date is observed in almost all West African countries (Senegal, Mali, Ivory Coast, Guinea, Burkina Faso, Ghana, Nigeria), occasionally shifted by a day depending on local moon sighting.
            </p>
            <p className="text-text-muted leading-relaxed">
              The sacrifice can be performed from 27 to 30 May 2026 inclusive (Eid day + the three days of Tashriq).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Tabaski, Eid al-Adha, Festival of Sacrifice: same celebration</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Depending on where you come from, you&apos;ll hear several names that all refer to the same celebration:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li><strong className="text-text-primary">Tabaski</strong> — Senegal, Mali, Ivory Coast, Guinea, Burkina Faso, Mauritania (and widely used across the West African diaspora).</li>
              <li><strong className="text-text-primary">Eid al-Adha</strong> (عيد الأضحى) — official Arabic name, &ldquo;festival of sacrifice&rdquo;.</li>
              <li><strong className="text-text-primary">Eid el-Kebir</strong> — Maghreb (Morocco, Algeria, Tunisia), &ldquo;the great festival&rdquo;.</li>
              <li><strong className="text-text-primary">Sallah / Big Sallah</strong> — Nigeria, Ghana and English-speaking West Africa.</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              All these names point to the same religious festival: the commemoration of Ibrahim&apos;s sacrifice (peace be upon him), celebrated every year on 10 Dhul Hijjah.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Why so many West African families in France delegate their sacrifice</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Every year at Tabaski, thousands of Senegalese, Malians, Ivorians, Guineans and Burkinabe living in France face the same dilemma: <strong className="text-text-primary">fulfilling the religious duty of sacrifice without being able to travel back home</strong>.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Several concrete reasons explain why families choose to delegate:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li>• <strong className="text-text-primary">Unable to travel</strong> — work, studies, immigration status, family responsibilities.</li>
              <li>• <strong className="text-text-primary">Sheep prices skyrocket back home</strong> — prices in Dakar, Bamako or Abidjan surge as Tabaski approaches.</li>
              <li>• <strong className="text-text-primary">Logistical hurdles in France</strong> — few licensed abattoirs, fully booked slots, complex paperwork.</li>
              <li>• <strong className="text-text-primary">Desire to act charitably</strong> — the sacrificed meat directly feeds families in need.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">How does delegating the sacrifice (tawkil) work?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <em>Tawkil</em> — delegation of the sacrifice — is a practice recognised by <strong className="text-text-primary">the four Sunni schools of jurisprudence</strong> (Hanafi, Maliki, Shafi&apos;i, Hanbali). It goes back to the Companions of the Prophet (peace be upon him), several of whom delegated their own sacrifice.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              In practice, you appoint a trusted service to carry out the sacrifice on your behalf on the day of Tabaski, in strict accordance with religious rules. You then receive a <strong className="text-text-primary">personalised video as proof</strong> and the meat is distributed to families in need.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Conditions of validity (reminder)</h3>
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li>• Sincere intention (<em>niyyah</em>) on behalf of the principal</li>
                <li>• Healthy animal, meeting the required age</li>
                <li>• Slaughter performed by a Muslim, in accordance with the Sunnah</li>
                <li>• Sacrifice carried out between 27 and 30 May 2026 (valid days)</li>
                <li>• Distribution of the meat, traditionally shared in three parts (family, relatives, those in need)</li>
              </ul>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Tabaski 2026 — Book your sacrifice in a few clicks
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Compliant with the Sunnah · Personalised video · Distribution to families in need · €140 all-inclusive
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Book my sacrifice <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Qurbaniya for Tabaski 2026: what we do for you</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Our service is built for West African families settled in France (and the wider European diaspora) who want to fulfil their sacrifice without logistical headaches:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">You book online</strong> — in 2 minutes, secure Stripe payment. You provide the full name of the person on whose behalf the sacrifice will be performed.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Sacrifice supervised by a sheikh</strong> — on the day of Tabaski, your sheep is slaughtered according to the Sunnah, with your name pronounced at the moment of intention.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">Video proof sent via WhatsApp</strong> — you receive a personalised video confirming the execution.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">4</span>
                <span><strong className="text-text-primary">Charitable distribution in Madagascar</strong> — the meat feeds families in need, in line with the spirit of the sacrifice.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">How much does delegation cost for Tabaski 2026?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Qurbaniya&apos;s single price is <strong className="text-text-primary">€140 all-inclusive</strong>. This price covers:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1">
              <li>• Purchase of the sheep (compliant with required age and health)</li>
              <li>• Sacrifice supervised by a sheikh</li>
              <li>• Preparation and distribution of the meat to families in need</li>
              <li>• Personalised video as proof</li>
              <li>• No hidden fees, no extras</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              For context, the price of a Tabaski sheep in Senegal or Mali can exceed 250,000 CFA (≈ €380) in the run-up to the festival. See our <Link href="/en/blog/sheep-price-france-2026" className="text-gold hover:underline">full guide to sheep prices in France 2026</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">By when do you need to book?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Bookings automatically close on <strong className="text-text-primary">27 May 2026 at 3:00 AM (Paris time)</strong>, a few hours before the sacrifice on the day of Tabaski. But don&apos;t wait: places are limited and fill up fast as the festival approaches. We recommend booking at least 7 to 15 days in advance to secure your sacrifice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Going further</h2>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li>• <Link href="/en/blog/eid-al-adha-2026-date" className="text-gold hover:underline">Full date of Eid al-Adha / Tabaski 2026 (Day of Arafah, Tashriq)</Link></li>
              <li>• <Link href="/en/blog/online-qurbani-how-it-works" className="text-gold hover:underline">How does online qurbani work?</Link></li>
              <li>• <Link href="/en/blog/how-much-eid-sheep-2026-france" className="text-gold hover:underline">How much does a Tabaski / Eid sheep cost in France?</Link></li>
              <li>• <Link href="/faq" className="text-gold hover:underline">All frequently asked questions about sacrifice delegation</Link></li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="tabaski-2026-france"
          currentLocale="en"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/en/blog" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Back to blog
          </Link>
          <Link
            href="/commander"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Book my sacrifice <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
