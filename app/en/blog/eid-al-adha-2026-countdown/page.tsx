import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";
import { AID_DATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "🌙 Eid al-Adha 2026 Countdown: How Many Days Left?",
  description:
    "📅 Eid al-Adha 2026 falls on Wednesday 27 May 2026. How many days until Eid? Full calendar (Arafah, Tashriq) and how to book your qurbani before the cutoff 🐑",
  keywords: [
    "eid al adha 2026 countdown",
    "how many days until eid",
    "how many days until eid al adha 2026",
    "when is eid 2026",
    "when is eid al adha 2026",
    "eid 2026 date",
    "27 may 2026 eid",
    "eid may 2026",
    "eid al adha countdown",
    "days until eid 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/en/blog/eid-al-adha-2026-countdown",
    languages: blogHreflangAlternates("aid-al-adha-2026-dans-combien-de-jours"),
  },
  openGraph: {
    title: "🌙 Eid al-Adha 2026 Countdown: How Many Days Left?",
    description:
      "Wednesday 27 May 2026. Countdown, full calendar and how to book your qurbani 🐑",
    url: "https://qurbaniya.fr/en/blog/eid-al-adha-2026-countdown",
    type: "article",
    locale: "en",
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
    headline: "Eid al-Adha 2026 Countdown: How Many Days Left?",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/en/blog/eid-al-adha-2026-countdown",
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
        name: "How many days until Eid al-Adha 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Eid al-Adha 2026 falls on Wednesday 27 May 2026. There ${daysLeft === 1 ? "is" : "are"} ${daysLeft} day${daysLeft > 1 ? "s" : ""} left before the Feast of Sacrifice (10 Dhul Hijjah 1447).`,
        },
      },
      {
        "@type": "Question",
        name: "When is Eid al-Adha in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eid al-Adha 2026 (also called Eid al-Kabir or Tabaski) is celebrated on Wednesday 27 May 2026. The Day of Arafah is Tuesday 26 May, and the days of Tashriq run from Thursday 28 to Saturday 30 May 2026.",
        },
      },
      {
        "@type": "Question",
        name: "Until when can I book a sacrifice for Eid 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Qurbaniya bookings for Eid 2026 close on 27 May 2026 at 3:00 AM (Paris time), a few hours before the sacrifice. There ${daysLeft === 1 ? "is" : "are"} ${daysLeft} day${daysLeft > 1 ? "s" : ""} left to book, but slots are limited: we recommend not waiting.`,
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
          { name: "Home", url: "https://qurbaniya.fr/en" },
          { name: "Blog", url: "https://qurbaniya.fr/en/blog" },
          {
            name: "Eid al-Adha 2026 Countdown",
            url: "https://qurbaniya.fr/en/blog/eid-al-adha-2026-countdown",
          },
        ]}
      />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/en" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/en/blog" className="hover:text-gold transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-text-primary">Eid al-Adha 2026 Countdown</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="aid-al-adha-2026-dans-combien-de-jours"
          currentLocale="en"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
            Countdown
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Auto-updated
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 4 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Eid al-Adha 2026: <span className="text-gold">how many days left</span>?
        </h1>

        {/* Big countdown box */}
        {aidPassed ? (
          <div className="bg-bg-secondary border-2 border-gold rounded-card p-6 md:p-8 text-center mb-8">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-2 font-inter">
              Eid al-Adha 2026 has passed
            </p>
            <p className="text-text-primary font-bold text-lg">
              The next edition (Eid 2027) will be around 16 May 2027 according to astronomical calculations.
            </p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-bg-secondary border-2 border-gold rounded-card p-6 md:p-10 text-center mb-8">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-3 font-inter">
              Exactly
            </p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-6xl md:text-8xl font-black text-gold leading-none">
                {daysLeft}
              </span>
              <span className="text-2xl md:text-3xl font-bold text-text-primary">
                day{daysLeft > 1 ? "s" : ""} left
              </span>
            </div>
            <p className="text-text-muted leading-relaxed mb-1">
              before Eid al-Adha 2026
            </p>
            <p className="text-text-primary font-bold">
              📅 Wednesday 27 May 2026
            </p>
          </div>
        )}

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          <strong className="text-text-primary">Eid al-Adha 2026</strong> — also known as <strong className="text-text-primary">Eid al-Kabir</strong>, <strong className="text-text-primary">Tabaski</strong> or the <strong className="text-text-primary">Feast of Sacrifice</strong> — falls on <strong className="text-text-primary">Wednesday 27 May 2026</strong> in France. This corresponds to 10 Dhul Hijjah 1447 in the Hijri calendar.
        </p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              📅 Full Eid 2026 calendar
            </h2>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">26 May 2026</span>
                  <span>
                    <strong className="text-text-primary">Tuesday · Day of Arafah</strong> — Fasting strongly recommended for non-pilgrims
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">27 May 2026</span>
                  <span>
                    <strong className="text-text-primary">Wednesday · Day of Eid</strong> — Morning prayer + sacrifice (Yawm an-Nahr)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">28 May 2026</span>
                  <span>1st day of Tashriq · the sacrifice remains valid</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">29 May 2026</span>
                  <span>2nd day of Tashriq</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold font-bold w-32 flex-shrink-0">30 May 2026</span>
                  <span>3rd and final day of Tashriq</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Why 27 May this year?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Eid al-Adha is celebrated every year on <strong className="text-text-primary">10 Dhul Hijjah</strong>, the last month of the Hijri calendar. Since the Islamic calendar is lunar (~354 days), the date of Eid advances by ~11 days each year in the Gregorian calendar.
            </p>
            <p className="text-text-muted leading-relaxed">
              In 2026, the month of Dhul Hijjah 1447 begins on 17 May 2026 according to official astronomical calculations (the <em>Umm al-Qura</em> calendar). The 10th of Dhul Hijjah — day of the sacrifice — therefore falls on Wednesday 27 May 2026.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⏳ {daysLeft} day{daysLeft > 1 ? "s" : ""} left — what to do now?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              If you plan to perform the Eid 2026 sacrifice, here are the actions to prioritise in order:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span>
                  <strong className="text-text-primary">Book your sacrifice</strong> — Every year, slots run out in the final days. See our <Link href="/en/blog/sheep-price-france-2026" className="text-gold hover:underline">2026 sheep price guide</Link>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span>
                  <strong className="text-text-primary">Prepare your intentions (niyyah)</strong> — Decide in whose name you wish to perform the sacrifice (yourself, family, sadaqah for a loved one).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <span>
                  <strong className="text-text-primary">Check the Eid prayer details</strong> — Confirm the time and location with your local mosque (usually 7am-10am).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <span>
                  <strong className="text-text-primary">Fast on the Day of Arafah (26 May)</strong> — A strongly recommended Sunnah for non-pilgrims. According to an authentic hadith, this fast expiates the sins of the past year and the year to come.
                </span>
              </li>
            </ol>
          </section>

          {/* CTA mid-article */}
          {!aidPassed && (
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
              <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
                {daysLeft} day{daysLeft > 1 ? "s" : ""} left — book before the cutoff
              </h3>
              <p className="text-white/70 text-sm mb-4 font-inter">
                Sacrifice compliant with the Sunnah · Personalised WhatsApp video · €140 all-inclusive
              </p>
              <Link
                href="/commander"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
              >
                Book my sacrifice <ArrowRight size={14} />
              </Link>
            </div>
          )}

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              What about neighbouring countries?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Almost all Muslim countries observe Eid al-Adha 2026 on <strong className="text-text-primary">Wednesday 27 May 2026</strong>, following the Saudi <em>Umm al-Qura</em> calendar. Slight one-day shifts may exist depending on the local method of moon sighting:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1">
              <li>• <strong className="text-text-primary">France, Belgium, Switzerland</strong>: 27 May 2026 (majority alignment)</li>
              <li>• <strong className="text-text-primary">Morocco, Algeria, Tunisia</strong>: 27 May 2026 (sometimes +1 day based on local sighting)</li>
              <li>• <strong className="text-text-primary">Senegal, Mali, Côte d&apos;Ivoire (Tabaski)</strong>: generally aligned</li>
              <li>• <strong className="text-text-primary">Saudi Arabia, UAE, Egypt</strong>: 27 May 2026 confirmed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Going further
            </h2>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li>
                • <Link href="/en/blog/eid-al-adha-2026-date" className="text-gold hover:underline">Full Eid al-Adha 2026 date (Day of Arafah, Tashriq, timings)</Link>
              </li>
              <li>
                • <Link href="/en/blog/sheep-price-france-2026" className="text-gold hover:underline">2026 sheep price guide in France</Link>
              </li>
              <li>
                • <Link href="/en/blog/online-qurbani-how-it-works" className="text-gold hover:underline">How does online qurbani work?</Link>
              </li>
              <li>
                • <Link href="/en/blog/tabaski-2026-france" className="text-gold hover:underline">Tabaski 2026 in France: delegating your sacrifice from mainland France</Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="aid-al-adha-2026-dans-combien-de-jours"
          currentLocale="en"
          className="mt-12 mb-6"
        />

        {/* Bottom nav */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/en/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
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
