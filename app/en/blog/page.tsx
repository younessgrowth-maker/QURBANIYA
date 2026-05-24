import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Blog — Eid al-Adha Sacrifice Guides | Qurbaniya",
  description:
    "Complete guides on the Eid al-Adha sacrifice: dates, prices, Islamic rules, practical advice. Everything you need to know before ordering your qurbani.",
  alternates: {
    canonical: "https://qurbaniya.fr/en/blog",
    languages: {
      "fr-FR": "https://qurbaniya.fr/blog",
      en: "https://qurbaniya.fr/en/blog",
      ar: "https://qurbaniya.fr/ar/blog",
      tr: "https://qurbaniya.fr/tr/blog",
      es: "https://qurbaniya.fr/es/blog",
    },
  },
  openGraph: {
    title: "Qurbaniya Blog — Eid al-Adha Sacrifice Guides",
    description:
      "Complete guides on the Eid al-Adha sacrifice: dates, prices, rules, advice.",
    url: "https://qurbaniya.fr/en/blog",
    locale: "en",
  },
};

const articles = [
  {
    slug: "day-of-arafah-2026",
    title: "🌙 Day of Arafah 2026: Tuesday 26 May · Fast, Virtues, Du'as",
    excerpt:
      "The 9th of Dhul Hijjah 2026 falls on Tuesday 26 May. Everything about the Arafah fast (expiation of 2 years of sins), virtues, recommended du'as and the link to Eid al-Adha.",
    date: "24 May 2026",
    readTime: "7 min",
    category: "Religious guide",
  },
  {
    slug: "eid-al-adha-2026-countdown",
    title: "🌙 How many days until Eid al-Adha 2026?",
    excerpt:
      "Official countdown to Eid al-Adha 2026 (Wednesday 27 May). Full calendar (Arafah, tashriq), why May 27, and what to do now.",
    date: "12 May 2026",
    readTime: "4 min",
    category: "Countdown",
  },
  {
    slug: "last-minute-eid-sheep-booking-2026",
    title: "🚨 Last minute Eid sheep booking for 2026",
    excerpt:
      "Haven't booked yet? Here's how to order at the last minute (D-15 to D-1) with peace of mind. Deadlines, options, tips so you don't miss it.",
    date: "12 May 2026",
    readTime: "5 min",
    category: "Urgent",
  },
  {
    slug: "tabaski-2026-france",
    title: "Tabaski 2026 in France: Delegating your sacrifice from France",
    excerpt:
      "Away from your home country this year for Tabaski 2026? Delegation of the sacrifice is recognised by all 4 schools. Date, mechanics, and how to book from France.",
    date: "11 May 2026",
    readTime: "7 min",
    category: "West Africa diaspora",
  },
  {
    slug: "how-much-eid-sheep-2026-france",
    title: "How much does an Eid al-Adha 2026 sheep cost in France?",
    excerpt:
      "From €140 (online) to €450+ (live + certified abattoir): a complete comparison of the 3 ways to get a sheep for Eid 2026 in France — what's included and how to choose.",
    date: "7 May 2026",
    readTime: "7 min",
    category: "Price comparison",
  },
  {
    slug: "eid-al-adha-2026-date",
    title: "Eid al-Adha 2026 Date: Everything you need to know",
    excerpt:
      "Eid al-Adha 2026 is scheduled for 27 May. Find the exact dates, the days of tashriq, and how to prepare your sacrifice this year.",
    date: "15 March 2026",
    readTime: "5 min",
    category: "Guide",
  },
  {
    slug: "online-qurbani-how-it-works",
    title: "Online Eid sacrifice: how does it work?",
    excerpt:
      "Delegating your sacrifice online complies with the Sunnah. Here's the step-by-step process, from order to receiving your personalised video.",
    date: "10 March 2026",
    readTime: "7 min",
    category: "Practical guide",
  },
  {
    slug: "sheep-price-france-2026",
    title: "Sheep price in France 2026: why delegating is smarter",
    excerpt:
      "Detailed price comparison: buying a sheep in France (€350-400) vs delegating your sacrifice online (€140). The advantages go far beyond price.",
    date: "5 March 2026",
    readTime: "6 min",
    category: "Comparison",
  },
];

export default function EnBlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://qurbaniya.fr/en" },
          { name: "Blog", url: "https://qurbaniya.fr/en/blog" },
        ]}
      />
      <div className="text-center mb-12">
        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block font-inter">
          Blog
        </span>
        <h1 className="text-3xl md:text-4xl font-black uppercase mb-4">
          GUIDES & <span className="text-gold">ADVICE</span>
        </h1>
        <p className="text-text-muted max-w-xl mx-auto">
          Everything you need to know about the Eid al-Adha sacrifice, Islamic rules, and how to prepare your order properly.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/en/blog/${article.slug}`}
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
              Read article
              <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center bg-gradient-to-r from-primary to-primary-light rounded-xl p-8 md:p-10">
        <h3 className="text-white font-bold text-xl md:text-2xl mb-3 font-playfair">
          Ready to book your sacrifice?
        </h3>
        <p className="text-white/70 mb-6 font-inter">
          Sheep compliant with the Sunnah, personalised video, from €140.
        </p>
        <Link
          href="/commander"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
        >
          Book my sacrifice <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
