import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🌙 Day of Arafah 2026: Tuesday 26 May · Fasting, Virtues, Du'as",
  description:
    "📅 The Day of Arafah 2026 falls on Tuesday 26 May (9 Dhul Hijjah 1447). A highly recommended fast, immense virtues (forgiveness of two years of sins), du'as and the link with Eid al-Adha on 27 May 🐑",
  keywords: [
    "day of arafah 2026",
    "arafah date 2026",
    "arafah fast 2026",
    "fasting day of arafah",
    "virtues of day of arafah",
    "reward day of arafah",
    "arafah day du'as",
    "du'a day of arafah",
    "9 dhul hijjah 2026",
    "yawm arafah",
    "yawm 'arafa",
    "arafah eid al adha",
    "how to fast arafah",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/en/blog/day-of-arafah-2026",
    languages: blogHreflangAlternates("jour-arafat-2026"),
  },
  openGraph: {
    title: "🌙 Day of Arafah 2026: Tuesday 26 May · Fasting, Virtues, Du'as",
    description:
      "📅 The Day of Arafah 2026 falls on Tuesday 26 May 2026. A highly recommended fast, du'as and the link with Eid al-Adha 🐑",
    url: "https://qurbaniya.fr/en/blog/day-of-arafah-2026",
    type: "article",
    locale: "en",
    publishedTime: "2026-05-24T00:00:00Z",
    modifiedTime: "2026-05-24T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Day of Arafah 2026: it's on Tuesday 26 May — fasting, virtues and du'as",
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
    mainEntityOfPage: "https://qurbaniya.fr/en/blog/day-of-arafah-2026",
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
        name: "What is the date of the Day of Arafah in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Day of Arafah 2026 falls on Tuesday 26 May 2026, corresponding to 9 Dhul Hijjah 1447 in the Hijri calendar. It is the eve of Eid al-Adha (Wednesday 27 May 2026).",
        },
      },
      {
        "@type": "Question",
        name: "Should you fast on the Day of Arafah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fasting on the Day of Arafah is highly recommended (Sunnah mu'akkadah) for every Muslim who is not on pilgrimage. According to an authentic hadith reported by Muslim, this fast expiates the sins of the past year and the year to come. Pilgrims performing Hajj, however, do not fast on this day.",
        },
      },
      {
        "@type": "Question",
        name: "What time does the Arafah fast begin and end?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Day of Arafah fast follows the same rules as any Islamic fast: from dawn (Fajr) to sunset (Maghrib). In mainland France on 26 May 2026, dawn is around 4:00–4:30 AM and sunset around 9:30–9:45 PM depending on the city. Check your local mosque's prayer timetable for exact times.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best du'a to make on the Day of Arafah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "According to the Prophet ﷺ: \"The best supplication is that of the Day of Arafah, and the best thing that I and the prophets before me have said is: La ilaha illa Allah wahdahu la sharika lah, lahu-l-mulk wa lahu-l-hamd wa huwa 'ala kulli shay'in qadir\" (Tirmidhi). It is also recommended to multiply the remembrance of Allah (dhikr), seeking forgiveness (istighfar) and personal supplications throughout the day.",
        },
      },
      {
        "@type": "Question",
        name: "What is the link between the Day of Arafah and Eid al-Adha?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Day of Arafah is the immediate eve of Eid al-Adha. It is the 9th of Dhul Hijjah, the most important day of the Hajj pilgrimage: pilgrims gather on Mount Arafah to invoke Allah. The next day (10 Dhul Hijjah, Wednesday 27 May 2026) is Eid al-Adha with the ritual sacrifice.",
        },
      },
      {
        "@type": "Question",
        name: "Can you fast only the Day of Arafah without the other days of Dhul Hijjah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, absolutely. Fasting the Day of Arafah alone is a Sunnah in its own right, independent of fasting the first 9 days of Dhul Hijjah (which is also recommended but optional). Many Muslims fast only on the Day of Arafah because of the immense reward announced by the Prophet ﷺ.",
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

export default function ArticleDayOfArafah() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://qurbaniya.fr/en" },
          { name: "Blog", url: "https://qurbaniya.fr/en/blog" },
          {
            name: "Day of Arafah 2026",
            url: "https://qurbaniya.fr/en/blog/day-of-arafah-2026",
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
          <span className="text-text-primary">Day of Arafah 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="jour-arafat-2026"
          currentLocale="en"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">
            Religious guide
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Published on 24 May 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Day of Arafah 2026: it&apos;s on{" "}
          <span className="text-gold">Tuesday 26 May 2026</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          The Day of Arafah — <em>Yawm &apos;Arafa</em>, the{" "}
          <strong className="text-text-primary">9th of Dhul Hijjah 1447</strong>{" "}
          — falls on <strong className="text-text-primary">Tuesday 26 May 2026</strong>, the eve of Eid al-Adha. It is one of the most blessed days of the Islamic year: fasting is highly recommended and expiates the sins of two years. Here is everything you need to know.
        </p>

        {/* Quick summary card */}
        <div className="bg-bg-secondary rounded-xl p-6 border border-gold/10 mb-10">
          <h2 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">
            The essentials in 30 seconds
          </h2>
          <ul className="space-y-2 text-text-muted text-sm font-inter">
            <li>
              📅 <strong className="text-text-primary">Date:</strong> Tuesday 26 May 2026 (9 Dhul Hijjah 1447)
            </li>
            <li>
              🌙 <strong className="text-text-primary">Eve of:</strong> Eid al-Adha (Wednesday 27 May 2026)
            </li>
            <li>
              🤲 <strong className="text-text-primary">Recommended:</strong> fast and multiply supplications
            </li>
            <li>
              ✨ <strong className="text-text-primary">Reward:</strong> expiation of the sins of the past year and the year to come
            </li>
            <li>
              🚫 <strong className="text-text-primary">Exception:</strong> Hajj pilgrims do not fast on this day
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              When exactly does the Day of Arafah fall in 2026?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The Day of Arafah is observed on the{" "}
              <strong className="text-text-primary">9th of Dhul Hijjah</strong> every Hijri year. In 2026, this corresponds to{" "}
              <strong className="text-text-primary">Tuesday 26 May 2026</strong> according to the astronomical calculations adopted by the majority of Muslim federations in France and internationally.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              This date is consistent with the confirmed date for Eid al-Adha (Wednesday 27 May 2026), since Arafah always falls on the eve of the day of sacrifice (<em>Yawm an-Nahr</em>).
            </p>
            <p className="text-text-muted leading-relaxed">
              For pilgrims present in Makkah, the 9th of Dhul Hijjah is the day of the great standing on{" "}
              <strong className="text-text-primary">Mount Arafah</strong>, about 20 km from Makkah. It is the central rite of Hajj: without this standing (<em>wuquf</em>), the pilgrimage is invalid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Why is the Day of Arafah so important?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              According to many scholars, the Day of Arafah is <strong className="text-text-primary">the best day of the Islamic year</strong>. Several authentic hadiths underline its exceptional importance:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                &ldquo;There is no day on which Allah frees more of His servants from the Fire than the Day of Arafah.&rdquo;
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Reported by Muslim (no. 1348), on the authority of &apos;A&apos;ishah رضي الله عنها
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              It was also on this day, during the Farewell Pilgrimage (10 AH), that the verse completing the religion was revealed to the Prophet Muhammad ﷺ:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                &ldquo;This day I have perfected for you your religion and completed My favour upon you and have approved for you Islam as religion.&rdquo;
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Qur&apos;an, Surah Al-Ma&apos;idah (5:3)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed">
              This verse, revealed on a Friday upon Mount Arafah, marks the completion of revelation. The Day of Arafah thus carries a major historical, spiritual and eschatological dimension all at once.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              The fast of the Day of Arafah: rules and reward
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The fast of the Day of Arafah is a{" "}
              <strong className="text-text-primary">Sunnah mu&apos;akkadah</strong> (confirmed Sunnah) for every Muslim who is not on pilgrimage. The Prophet ﷺ said:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                &ldquo;Fasting the Day of Arafah — I hope from Allah that it expiates the sins of the past year and those of the year to come.&rdquo;
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Reported by Muslim (no. 1162), on the authority of Abu Qatadah رضي الله عنه
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              In practice, the fast follows the same rules as any Islamic fast:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Start:</strong> at the appearance of dawn (Fajr) — in France on 26 May 2026, around 4:00–4:30 AM depending on the city
              </li>
              <li>
                • <strong className="text-text-primary">End:</strong> at sunset (Maghrib) — around 9:30–9:45 PM in France
              </li>
              <li>
                • <strong className="text-text-primary">Intention:</strong> formulated the night before or before dawn (<em>niyyah</em>)
              </li>
              <li>
                • <strong className="text-text-primary">Prohibitions:</strong> eating, drinking, smoking and marital relations during the day
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong className="text-text-primary">Important:</strong> pilgrims present at Arafah <em>do not fast</em> on this day, in accordance with the Sunnah of the Prophet ﷺ, who did not fast during the Farewell Pilgrimage. The fast is reserved for non-pilgrims.
            </p>
            <p className="text-text-muted leading-relaxed">
              For women in menstruation or post-partum, the sick, travellers, or elderly people who cannot fast: there is no obligation, and the reward of good deeds on that day remains accessible through other means (dhikr, sadaqah, du&apos;as).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Recommended du&apos;as and supplications
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The Prophet ﷺ said:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold mb-4">
              <p className="text-text-primary italic leading-relaxed">
                &ldquo;The best supplication is that of the Day of Arafah, and the best thing that I and the prophets before me have said is:
              </p>
              <p className="text-text-primary font-bold mt-3 leading-relaxed">
                &ldquo;La ilaha illa Allah, wahdahu la sharika lah, lahu-l-mulk wa lahu-l-hamd, wa huwa &apos;ala kulli shay&apos;in qadir&rdquo;
              </p>
              <p className="text-text-muted text-sm mt-2 italic">
                (There is no deity worthy of worship except Allah, Alone with no partner. To Him belongs the dominion and to Him belongs all praise, and He is over all things omnipotent.)
              </p>
              <p className="text-text-muted-light text-sm mt-2 font-inter">
                — Reported by Tirmidhi (no. 3585)
              </p>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              In addition to this declaration of <em>tawhid</em>, it is recommended to use this day to:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • Multiply <strong className="text-text-primary">dhikr</strong> (Subhan Allah, Alhamdulillah, Allahu Akbar)
              </li>
              <li>
                • Seek <strong className="text-text-primary">forgiveness (istighfar)</strong> for yourself, your family and the whole community
              </li>
              <li>
                • Make <strong className="text-text-primary">personal du&apos;as</strong> — it is a day when supplications are particularly answered
              </li>
              <li>
                • <strong className="text-text-primary">Read the Qur&apos;an</strong> and reflect on its meanings
              </li>
              <li>
                • Give <strong className="text-text-primary">sadaqah</strong> to those in need
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Many scholars recommend dedicating especially the hours before sunset to supplication, as it is the moment when the pilgrims at Arafah are themselves in their peak standing of du&apos;a.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              The link between the Day of Arafah and Eid al-Adha
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The Day of Arafah is not an isolated event: it is the <strong className="text-text-primary">direct prelude</strong> to Eid al-Adha. The sequence of the 3 key days:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10 mb-4">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">8 Dhul Hijjah</span>
                  <span>
                    <strong className="text-text-primary">Monday 25 May 2026</strong> — <em>Yawm at-Tarwiyah</em>, the day pilgrims set out for Mina
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">9 Dhul Hijjah</span>
                  <span>
                    <strong className="text-text-primary">Tuesday 26 May 2026</strong> — <em>Yawm &apos;Arafa</em>, Day of Arafah (fasting and supplications)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold whitespace-nowrap">10 Dhul Hijjah</span>
                  <span>
                    <strong className="text-text-primary">Wednesday 27 May 2026</strong> — <em>Yawm an-Nahr</em>, Eid al-Adha and the ritual sacrifice
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              The <strong className="text-text-primary">sacrifice (qurbani)</strong> is the central act of the day of Eid. According to the four Sunni schools of jurisprudence, it can be performed by oneself or delegated to a third party (<em>tawkil</em>) — a practice that goes back to the Companions of the Prophet ﷺ.
            </p>
            <p className="text-text-muted leading-relaxed">
              If you have not yet arranged your sacrifice, the Day of Arafah is{" "}
              <strong className="text-text-primary">the last ideal moment</strong> to do so — the very eve of the day itself. The sacrifice remains valid during the 4 days that follow Arafah (27, 28, 29 and 30 May 2026), but the key point is to have it arranged before you enter this blessed day.
            </p>
          </section>

          {/* CTA Box — central conversion bridge */}
          <div className="bg-gradient-to-br from-gold/10 via-bg-secondary to-gold/10 rounded-2xl border-2 border-gold/30 p-6 md:p-8 my-10">
            <h3 className="text-xl md:text-2xl font-black text-text-primary mb-3">
              Haven&apos;t booked your Eid 2026 sacrifice yet?
            </h3>
            <p className="text-text-muted leading-relaxed mb-5">
              Qurbaniya arranges your sacrifice in Madagascar according to the rules of the Sunnah, with a <strong className="text-text-primary">personalised WhatsApp video within 24 hours</strong>. The meat is distributed to families in need on the ground.
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter mb-5">
              <li>✓ €140 all-inclusive</li>
              <li>✓ Sacrifice compliant with the Sunnah, supervised by a sheikh</li>
              <li>✓ Personalised video sent via WhatsApp + email</li>
              <li>✓ Registration open until Wednesday 27 May, 3 AM</li>
            </ul>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
            >
              Book my sacrifice <ArrowRight size={16} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              And after Arafah? The days of Tashriq
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Just after Eid al-Adha (27 May) come the{" "}
              <strong className="text-text-primary">days of Tashriq</strong> (28, 29 and 30 May 2026). During these 3 days:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • The <strong className="text-text-primary">sacrifice remains valid</strong> until sunset on 30 May
              </li>
              <li>
                • The <strong className="text-text-primary">takbir</strong> (Allahu Akbar, Allahu Akbar, La ilaha illa Allah…) is maintained after every obligatory prayer, up to and including the &apos;Asr prayer on 30 May
              </li>
              <li>
                • <strong className="text-text-primary">Fasting is prohibited</strong> on these days according to the majority of schools, as they are &ldquo;days of eating, drinking and remembrance of Allah&rdquo;
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              To go further on the full Dhul Hijjah calendar, see our{" "}
              <Link
                href="/en/blog/eid-al-adha-2026-date"
                className="text-gold hover:underline font-semibold"
              >
                dedicated article on the date of Eid al-Adha 2026
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              What if I can&apos;t fast on the Day of Arafah?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Fasting is just one of many doors of worship open on this day. If you are unable to fast (illness, travel, menstruation, post-partum, breastfeeding…), you can still fully benefit from the barakah of the Day of Arafah through:
            </p>
            <ul className="space-y-1.5 text-text-muted text-sm font-inter pl-1 mb-4">
              <li>
                • <strong className="text-text-primary">Multiplying personal supplications</strong> — it is the day when they are most readily answered
              </li>
              <li>
                • <strong className="text-text-primary">Giving sadaqah</strong>: donating to those in need, supporting a religious cause
              </li>
              <li>
                • <strong className="text-text-primary">Reciting and reflecting on</strong> the Qur&apos;an
              </li>
              <li>
                • <strong className="text-text-primary">Maintaining dhikr</strong> throughout the day, particularly the formula of <em>tawhid</em>
              </li>
              <li>
                • <strong className="text-text-primary">Preparing your Eid sacrifice</strong> (qurbani) if it is not yet done — it is a major act of worship in itself
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              The sincere intention and effort you put in on this day are themselves acts of worship that are rewarded, whatever form they take.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Frequently asked questions about the Day of Arafah
            </h2>
            <div className="space-y-4">
              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Is the Arafah fast obligatory?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  No, it is not an obligation (<em>fard</em>), but a <strong className="text-text-primary">Sunnah mu&apos;akkadah</strong> (confirmed Sunnah). The Prophet ﷺ strongly encouraged this fast, mentioning its unique reward (expiation of the sins of 2 years). Not fasting it is not a sin, but it means missing out on an exceptional spiritual opportunity.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Should you also fast the 8 days before Arafah?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Fasting the <strong className="text-text-primary">first 9 days of Dhul Hijjah</strong> (from 17 to 25 May 2026 in France) is a Sunnah according to several hadiths. The Prophet ﷺ said that the deeds of these first 10 days are the most beloved to Allah. But this fast is not conditional: you can perfectly well fast only the Day of Arafah (9 Dhul Hijjah) if you cannot manage the others.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Does the Day of Arafah fall on the same day everywhere in the world?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  The <em>majority</em> of countries align with the Saudi date (Tuesday 26 May 2026), because that is the day pilgrims perform the standing at Arafah in Makkah. Some countries may shift by a day based on local moon sighting. In France, most federations follow the Saudi date, so Tuesday 26 May 2026.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  What if I forget to make the intention to fast the night before?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  For a voluntary fast such as Arafah, the intention can be made <strong className="text-text-primary">during the day</strong>, as long as you have neither eaten nor drunk since dawn. This is a concession granted for voluntary fasting. If you wake up on the morning of 26 May 2026 and have not yet consumed anything, you can form the intention then and start the fast.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  What is the difference between Arafah and the Hajj pilgrimage?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  The <strong className="text-text-primary">Hajj</strong> is the full pilgrimage to Makkah (the 5th pillar of Islam), spanning several days (from 8 to 13 Dhul Hijjah). The <strong className="text-text-primary">Day of Arafah</strong> (9 Dhul Hijjah) is <em>one specific day</em> of Hajj, considered its central rite. For non-pilgrims, it is a day of intense worship through fasting and supplications, without having to travel.
                </p>
              </details>
            </div>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="jour-arafat-2026"
          currentLocale="en"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/en/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>
          <Link
            href="/en/blog/eid-al-adha-2026-date"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Next article: Date of Eid al-Adha 2026 <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
