import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🌙 Eid al-Adha 2026: Wednesday 27 May · Confirmed date + full calendar",
  description:
    "📅 Confirmed date: Wednesday 27 May 2026 (10 Dhul Hijjah). Day of Arafah 26 May, tashriq 28-30 May. Prayer times by city, and how to book your qurbani before registration closes 🐑",
  keywords: [
    "eid al adha 2026 date",
    "eid al adha 2026",
    "when is eid al adha 2026",
    "27 may 2026 eid",
    "eid ul adha 2026",
    "qurbani 2026 date",
    "bakra eid 2026",
    "tashriq days 2026",
    "day of arafah 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/en/blog/eid-al-adha-2026-date",
    languages: blogHreflangAlternates("date-aid-al-adha-2026"),
  },
  openGraph: {
    title: "🌙 Eid al-Adha 2026: Wednesday 27 May · Full calendar",
    description:
      "📅 Confirmed date: 27 May 2026. Day of Arafah 26 May, tashriq 28-30 May. Prayer times by city + how to book your qurbani 🐑",
    url: "https://qurbaniya.fr/en/blog/eid-al-adha-2026-date",
    type: "article",
    locale: "en",
    publishedTime: "2026-03-15T00:00:00Z",
    modifiedTime: "2026-05-08T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Eid al-Adha 2026: it's on Wednesday 27 May in France",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-15",
    dateModified: "2026-05-08",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/en/blog/eid-al-adha-2026-date",
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
        name: "What is the date of Eid al-Adha 2026 in France?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eid al-Adha 2026 (also called Eid el-Kebir or Tabaski) falls on Wednesday 27 May 2026 in France, corresponding to 10 Dhul Hijjah 1447 in the Hijri calendar.",
        },
      },
      {
        "@type": "Question",
        name: "What are the days of tashriq in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The days of tashriq in 2026 are 28, 29 and 30 May. The sacrifice is valid from 27 to 30 May 2026 inclusive.",
        },
      },
      {
        "@type": "Question",
        name: "When is the Day of Arafah in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Day of Arafah 2026 falls on Tuesday 26 May 2026, the eve of Eid al-Adha. Fasting on this day is highly recommended for non-pilgrims.",
        },
      },
      {
        "@type": "Question",
        name: "Can you delegate your Eid al-Adha sacrifice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, delegation of the sacrifice (tawkil) is valid according to all four Sunni schools of jurisprudence. This practice goes back to the Companions of the Prophet (peace be upon him).",
        },
      },
      {
        "@type": "Question",
        name: "Why is Eid al-Adha also called Tabaski?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tabaski is the name given to Eid al-Adha in West Africa (Senegal, Mali, Ivory Coast, Guinea). It is the same religious celebration, observed on the same date: 27 May 2026.",
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

export default function ArticleEidAlAdhaDate() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://qurbaniya.fr/en" },
        { name: "Blog", url: "https://qurbaniya.fr/en/blog" },
        { name: "Eid al-Adha 2026 Date", url: "https://qurbaniya.fr/en/blog/eid-al-adha-2026-date" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/en" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/en/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Eid al-Adha 2026 Date</span>
        </nav>

        <LanguageSwitcher canonicalSlug="date-aid-al-adha-2026" currentLocale="en" className="mb-6" />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Guide</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Updated 8 May 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 8 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Eid al-Adha 2026: it&apos;s on <span className="text-gold">Wednesday 27 May 2026</span> in France
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          Eid al-Adha 2026 — also called <strong className="text-text-primary">Eid el-Kebir</strong> or <strong className="text-text-primary">Tabaski</strong> — falls on <strong className="text-text-primary">Wednesday 27 May 2026</strong> in France. Here is the full calendar (Day of Arafah, tashriq) and everything you need to know to prepare your qurbani.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">What is the date of Eid al-Adha 2026?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              According to astronomical calculations, Eid al-Adha 2026 is scheduled for <strong className="text-text-primary">Wednesday 27 May 2026</strong> (10 Dhul Hijjah 1447). This date corresponds to the day of sacrifice (yawm an-nahr).
            </p>
            <p className="text-text-muted leading-relaxed">
              As every year, the final date will be confirmed by the sighting of the new crescent moon. It may vary by one day depending on the country.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Why does Eid al-Adha 2026 fall on 27 May?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Eid al-Adha is observed on the <strong className="text-text-primary">10th of Dhul Hijjah</strong>, the 12th and final month of the Hijri calendar. Because the Islamic calendar is lunar, it has about 354 days a year — 11 days fewer than the Gregorian calendar. This is why the date of Eid al-Adha moves forward by roughly 11 days each year in the civil calendar.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              In 2026, the month of Dhul Hijjah 1447 begins on <strong className="text-text-primary">17 May 2026</strong> according to astronomical calculations (<em>Umm al-Qura</em>, the official Saudi calendar). The 10th of Dhul Hijjah, day of sacrifice, therefore falls on Wednesday 27 May 2026.
            </p>
            <p className="text-text-muted leading-relaxed">
              Two methods are used by Muslims to confirm the date: <strong className="text-text-primary">astronomical calculation</strong> (used by most Muslim countries) or <strong className="text-text-primary">direct sighting of the crescent moon</strong> (<em>ru&apos;yat al-hilal</em>). In France, the Grand Mosque of Paris traditionally follows the decision of the Muslim Theological Council, which may rely on either method depending on the year.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Eid el-Kebir, Tabaski, Eid al-Adha: same celebration</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Several names refer to the same religious celebration depending on the region of the Muslim world:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li><strong className="text-text-primary">Eid al-Adha</strong> (عيد الأضحى) — official Arabic name, literally &ldquo;festival of the sacrifice&rdquo;.</li>
              <li><strong className="text-text-primary">Eid el-Kebir</strong> (&ldquo;the great festival&rdquo;) — common name in the Maghreb and France.</li>
              <li><strong className="text-text-primary">Tabaski</strong> — name used in West Africa (Senegal, Mali, Ivory Coast, Guinea).</li>
              <li><strong className="text-text-primary">The Greater Eid</strong> or <strong className="text-text-primary">the 2nd Eid</strong> — as opposed to Eid al-Fitr which marks the end of Ramadan.</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              Whichever name is used, the date is the same everywhere: <strong className="text-text-primary">Wednesday 27 May 2026</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">The days of tashriq: 28, 29 and 30 May 2026</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The three days following Eid are the <strong className="text-text-primary">days of tashriq</strong> (ayyam at-tashriq). The sacrifice remains valid during these days. In practice, you have from 27 to 30 May 2026 to perform your sacrifice.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Full calendar</h3>
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li className="flex items-center gap-2"><span className="text-gold font-bold">27 May</span> — Day of Eid (Yawm an-Nahr)</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">28 May</span> — 1st day of tashriq</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">29 May</span> — 2nd day of tashriq</li>
                <li className="flex items-center gap-2"><span className="text-gold font-bold">30 May</span> — 3rd day of tashriq (last day)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">The Day of Arafah: 26 May 2026</h2>
            <p className="text-text-muted leading-relaxed">
              The eve of Eid, <strong className="text-text-primary">26 May 2026</strong>, corresponds to the Day of Arafah. Fasting on this day is highly recommended for non-pilgrims. According to an authentic hadith, it expiates the sins of the past year and of the year to come.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">When to pray the Eid al-Adha 2026 prayer in France?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The Eid prayer (<em>Salat al-Eid</em>) is performed on the morning of <strong className="text-text-primary">Wednesday 27 May 2026</strong>, in congregation, after sunrise and before the sun reaches its zenith. It is a <em>Sunnah mu&apos;akkadah</em> (confirmed Sunnah) according to most schools of jurisprudence.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              In mainland France, the prayer window extends approximately from <strong className="text-text-primary">7:00 AM to 11:00 AM</strong> depending on the city and the season. Major mosques typically organise multiple waves between 7:30 and 10:00 AM to accommodate the crowd. A few examples:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>• <strong className="text-text-primary">Paris / Île-de-France</strong>: generally around 7:00-9:00 AM</li>
              <li>• <strong className="text-text-primary">Lyon</strong>: slots 7:30-9:30 AM</li>
              <li>• <strong className="text-text-primary">Marseille</strong>: 7:00-9:00 AM depending on the mosque</li>
              <li>• <strong className="text-text-primary">Toulouse, Bordeaux, Nice</strong>: variable, 7:30-10:00 AM</li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Check directly with your local mosque about 7-10 days before Eid, when precise timings are published.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">How to prepare your sacrifice properly?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Do not delay booking your sheep. Every year, stocks run out quickly as Eid approaches. Here are the key steps:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">Book early</strong> — Prices go up and availability shrinks as Eid approaches. See our <Link href="/en/blog/sheep-price-france-2026" className="text-gold hover:underline">guide to sheep prices in France 2026</Link>.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Choose a trusted service</strong> — Make sure the sacrifice is performed according to the Sunnah and supervised by an imam.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">Demand proof</strong> — A personalised video is the best guarantee that your sacrifice has indeed been carried out.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Can you delegate your sacrifice?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Yes, delegation of the sacrifice (tawkil) is perfectly valid according to all four schools of Islamic jurisprudence. It was the practice of many Companions of the Prophet (peace and blessings be upon him).
            </p>
            <p className="text-text-muted leading-relaxed">
              With Qurbaniya, your sacrifice is performed by a qualified sheikh, in accordance with the Sunnah, and you receive a personalised video as proof.
            </p>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Eid is approaching — Book your sacrifice
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Sheep compliant with the Sunnah · Personalised video · €140 all-inclusive
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Book my sacrifice <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">The differences between Eid al-Adha and Eid al-Fitr</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The two Eids should not be confused. Eid al-Fitr marks the end of Ramadan, while Eid al-Adha commemorates the sacrifice of Ibrahim (peace be upon him) and coincides with the pilgrimage (Hajj).
            </p>
            <p className="text-text-muted leading-relaxed">
              Eid al-Adha is considered the greatest celebration in Islam. It is the day when Muslims who have the means perform the ritual sacrifice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">The story of Eid al-Adha: the sacrifice of Ibrahim</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Eid al-Adha commemorates the trial of Ibrahim (Abraham, peace be upon him), whom Allah commanded in a dream to sacrifice his son. According to Islamic tradition, this son is <strong className="text-text-primary">Ismail</strong> (Ishmael). Father and son both accepted the divine order in total submission.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              At the moment of sacrifice, Allah substituted a ram sent from paradise in place of Ismail, rewarding Ibrahim&apos;s unwavering faith. It is in memory of this act of submission (<em>islam</em>) that Muslims sacrifice an animal every year on the 10th of Dhul Hijjah.
            </p>
            <p className="text-text-muted leading-relaxed">
              The account is mentioned in the Qur&apos;an (Surah As-Saffat, verses 100-111). The Eid sacrifice is not a mere ritual: it is the expression of total obedience to Allah and of sharing with those most in need (the meat is traditionally divided into three parts: family, relatives, the needy).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">The Hajj pilgrimage 2026: full calendar</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Eid al-Adha is part of the wider cycle of the <strong className="text-text-primary">Hajj</strong>, the great pilgrimage to Makkah, the fifth pillar of Islam. Here is the full 2026 calendar (Hijri ↔ Gregorian correspondence):
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10 mb-4">
              <ul className="space-y-2 text-text-muted text-sm font-inter">
                <li><strong className="text-gold">8 Dhul Hijjah</strong> (Monday 25 May 2026) — <em>Yawm at-Tarwiyah</em>, pilgrims set out for Mina</li>
                <li><strong className="text-gold">9 Dhul Hijjah</strong> (Tuesday 26 May 2026) — <em>Yawm &apos;Arafa</em>, Day of Arafah (fasting recommended for non-pilgrims)</li>
                <li><strong className="text-gold">10 Dhul Hijjah</strong> (Wednesday 27 May 2026) — <em>Yawm an-Nahr</em>, day of sacrifice and of Eid al-Adha</li>
                <li><strong className="text-gold">11 Dhul Hijjah</strong> (Thursday 28 May) — 1st day of tashriq</li>
                <li><strong className="text-gold">12 Dhul Hijjah</strong> (Friday 29 May) — 2nd day of tashriq</li>
                <li><strong className="text-gold">13 Dhul Hijjah</strong> (Saturday 30 May) — 3rd and last day of tashriq</li>
              </ul>
            </div>
            <p className="text-text-muted leading-relaxed">
              For pilgrims, the 9th of Dhul Hijjah (Day of Arafah) is the most intense moment of the Hajj: they gather on Mount Arafah to invoke Allah. For non-pilgrims, it is a day on which fasting is strongly recommended.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Does Eid al-Adha fall on the same day everywhere in the world?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">Not always.</strong> Although most Muslim countries align with the Saudi decision (the astronomical method <em>Umm al-Qura</em>), discrepancies of one day can exist depending on the method adopted locally.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              In 2026, the main regions are expected to follow this calendar:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>• <strong className="text-text-primary">Saudi Arabia, UAE, Egypt, Jordan</strong>: 27 May 2026 (astronomical calculation)</li>
              <li>• <strong className="text-text-primary">France, Belgium, Switzerland</strong>: 27 May 2026 (most federations align with the Saudi decision)</li>
              <li>• <strong className="text-text-primary">Maghreb (Morocco, Algeria, Tunisia)</strong>: 27 May 2026, sometimes +1 day depending on local moon sighting</li>
              <li>• <strong className="text-text-primary">West Africa (Tabaski)</strong>: generally aligned, may shift by 24 hours</li>
              <li>• <strong className="text-text-primary">Indonesia, Malaysia, Pakistan</strong>: 27 May 2026 expected, to be confirmed by local sighting</li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              The final date is always confirmed the day before (26 May 2026), after the official sighting of the new crescent moon in countries that follow this method. In France, the <em>Night of Doubt</em> is announced by the official Muslim institutions.
            </p>
          </section>
        </div>

        <LanguageSwitcher canonicalSlug="date-aid-al-adha-2026" currentLocale="en" className="mt-12 mb-6" />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/en/blog" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Back to blog
          </Link>
          <Link
            href="/en/blog/online-qurbani-how-it-works"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Next article: How it works <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
