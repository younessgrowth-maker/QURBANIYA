import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Zap, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🚨 Last-Minute Eid Sheep Booking 2026: Book in 2 Minutes",
  description:
    "⏳ Haven't booked yet for Eid 2026? Here's how to book your qurbani at the last minute (D-15 to D-1) with peace of mind. Real deadlines, available options, what you need to know before clicking.",
  keywords: [
    "last minute eid sheep booking 2026",
    "urgent qurbani 2026",
    "book eid sheep at last minute",
    "last minute qurbani",
    "eid al adha sheep booking 2026",
    "urgent sheep booking eid",
    "qurbani last minute online",
    "book sacrifice eid 2026 last minute",
    "online qurbani booking 2026",
    "eid sheep order last minute",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/en/blog/last-minute-eid-sheep-booking-2026",
    languages: blogHreflangAlternates("reserver-mouton-aid-derniere-minute-2026"),
  },
  openGraph: {
    title: "🚨 Last-Minute Eid Sheep Booking 2026: Book in 2 Minutes",
    description:
      "⏳ How to book a sacrifice just before Eid 2026. Deadlines, options, everything you need to know 🐑",
    url: "https://qurbaniya.fr/en/blog/last-minute-eid-sheep-booking-2026",
    type: "article",
    locale: "en",
    publishedTime: "2026-05-12T00:00:00Z",
    modifiedTime: "2026-05-12T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Last-Minute Eid Sheep Booking 2026",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/en/blog/last-minute-eid-sheep-booking-2026",
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
        name: "Can I still book a sheep for Eid 2026 just days before the holiday?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, as long as spots are available. At Qurbaniya, bookings remain open until Wednesday 27 May 2026 at 3 AM (Paris time), just hours before the sacrifice. Since the sacrifice is delegated to Madagascar, there are no logistical constraints in France — the order can be validated online in 2 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a last-minute booking take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The online form takes 2 minutes: first name, last name, email, WhatsApp number, intention (for self / family / sadaqah), niyyah (name pronounced during the sacrifice). Instant credit card payment via Stripe. Email confirmation within the minute.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a risk of running out of stock right before Eid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every year, spots sell out in the final week. Stock is limited because every sacrifice is physically prepared in advance in Madagascar. The remaining-spots counter is displayed in real time on the site.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if I book the day before Eid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The sacrifice is carried out on 27 May 2026 (Eid day) in your name, just like for earlier orders. You receive the personalised video within the next 24 hours via WhatsApp.",
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

export default function ArticleLastMinute() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://qurbaniya.fr/en" },
          { name: "Blog", url: "https://qurbaniya.fr/en/blog" },
          {
            name: "Last-minute booking",
            url: "https://qurbaniya.fr/en/blog/last-minute-eid-sheep-booking-2026",
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
          <span className="text-text-primary">Last-minute booking</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="reserver-mouton-aid-derniere-minute-2026"
          currentLocale="en"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-urgency bg-urgency/10 px-2.5 py-1 rounded-full font-inter flex items-center gap-1">
            <Zap size={11} className="fill-current" /> Urgent
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Published on 12 May 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 5 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Book your Eid 2026 sheep at the <span className="text-gold">last minute</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          Eid al-Adha 2026 is in <strong className="text-text-primary">less than two weeks</strong> (Wednesday 27 May 2026). If you haven&apos;t booked your sacrifice yet, here is the complete guide to do it <strong className="text-text-primary">fast</strong>, <strong className="text-text-primary">properly</strong>, and <strong className="text-text-primary">in full religious compliance</strong>.
        </p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⏳ Yes, it&apos;s still possible
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Contrary to popular belief, booking your sheep in the final week — or even the very night before Eid — is entirely possible <strong className="text-text-primary">as long as spots are available</strong>. At Qurbaniya, the real-time counter on the homepage shows available stock. Bookings automatically close on <strong className="text-text-primary">27 May 2026 at 3 AM</strong> (Paris time), a few hours before the sacrifice.
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold">
              <p className="text-text-muted leading-relaxed text-sm">
                <strong className="text-text-primary">Worth remembering:</strong> every year, the final 30-40 spots sell out in the 48 hours before Eid. If you see the counter drop below 20, don&apos;t wait.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⚡ The 2-minute booking flow
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The process is intentionally short because most bookings happen on mobile — from work, the subway, or the lunch break:
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span>
                  <strong className="text-text-primary">Fill in the form</strong> — first name, last name, email, WhatsApp number (to receive the video), intention (for yourself, family, or sadaqah), niyyah (name pronounced during the sacrifice).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span>
                  <strong className="text-text-primary">Credit card payment</strong> — €140 all inclusive via secure Stripe (Visa, Mastercard, Apple Pay, Google Pay).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <span>
                  <strong className="text-text-primary">Instant email confirmation</strong> — your spot is secured. The sacrifice will be performed on 27 May in your name.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <span>
                  <strong className="text-text-primary">Personalised video within 24 hours</strong> — you receive the video proof on WhatsApp with your name pronounced during the <em>tasmiyah</em>.
                </span>
              </li>
            </ol>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Book now before closing
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Sunnah-compliant · Personalised video · Meat distributed to families in need · €140 all inclusive
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Book in 2 minutes <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ✅ Why delegation stays valid at the last minute
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <em>Tawkil</em> (delegation of the sacrifice) is <strong className="text-text-primary">recognised by the four Sunni schools of jurisprudence</strong> (Hanafi, Maliki, Shafi&apos;i, Hanbali). It dates back to the Companions of the Prophet ﷺ — several of them delegated their own sacrifice during their lifetime.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              From a religious perspective, what matters is:
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>The sincere intention (<em>niyyah</em>) in the name of the principal.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>A compliant animal (minimum age, good health, no defects).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>The ritual slaughter performed by a Muslim, according to the Sunnah.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>The sacrifice carried out between 27 and 30 May 2026 inclusive.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>The distribution of the meat (family, relatives, people in need).</span>
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              All of this is guaranteed by Qurbaniya, whether you book 3 months or 3 days before Eid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              💡 Tips to avoid mistakes at the last minute
            </h2>
            <ul className="space-y-3 text-text-muted font-inter text-sm">
              <li>
                <strong className="text-text-primary">📱 Prepare your credit card in advance</strong> — check the limit with your bank (€140 should not be a problem, but some prepaid cards may be declined).
              </li>
              <li>
                <strong className="text-text-primary">📞 Double-check your WhatsApp number</strong> — the video will arrive there, so enter exactly the number where you want to receive it.
              </li>
              <li>
                <strong className="text-text-primary">🤲 Prepare your niyyah</strong> — decide in advance in whose name the sacrifice is offered (yourself, your father, your mother, your family, sadaqah for a deceased person).
              </li>
              <li>
                <strong className="text-text-primary">💬 Save the support number</strong> — if you have any doubt after your order, you can message us on WhatsApp and we reply the same day.
              </li>
              <li>
                <strong className="text-text-primary">📧 Check your spam folder</strong> — the email confirmation comes from <code>noreply@qurbaniya.fr</code>. It is sometimes filtered, so don&apos;t panic.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              🐑 What if I want to compare first?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              If you&apos;re weighing buying a live sheep in France (€350-450 + slaughtering paperwork) against delegating online (€140 all inclusive), our <Link href="/en/blog/sheep-price-france-2026" className="text-gold hover:underline">full guide to sheep prices in 2026</Link> covers it all: Islamic criteria, hidden costs, compliance comparison.
            </p>
            <p className="text-text-muted leading-relaxed">
              At D-15 before Eid, most local breeders no longer have sheep available or have hiked their prices. Delegation remains the most accessible option.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ❓ Frequently asked questions from late bookers
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  Is the stock really limited?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Yes. Each sacrifice corresponds to one animal physically prepared in Madagascar. The counter displays remaining spots in real time. When it&apos;s 0, it&apos;s 0 — we do not open any extra slots.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  Can I order for someone else?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Yes, in &ldquo;gift&rdquo; mode during checkout: you indicate the beneficiary&apos;s name, you pay, and the confirmation can be sent to your recipient if you wish.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  What happens if I order on 27 May at 2:59 AM?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Your order is accepted if it is validated and paid before 3:00 AM. At 3:00 AM sharp, the API refuses any new order for 2026, and we&apos;ll open Eid 2027 bookings early next year.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  After payment, am I all set?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Yes. There&apos;s nothing more to do. A confirmation email, a reminder at D-7, and the personalised video arrives within 24 hours after 27 May. You can focus on prayer and the celebration.
                </p>
              </div>
            </div>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="reserver-mouton-aid-derniere-minute-2026"
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
