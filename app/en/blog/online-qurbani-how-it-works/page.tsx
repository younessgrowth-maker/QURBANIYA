import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Online Qurbani: how does it really work?",
  description:
    "Complete guide to delegating your Eid al-Adha sacrifice online. Step-by-step process, Islamic compliance, personalised video. Everything you need to know.",
  keywords: [
    "online qurbani 2026",
    "delegate eid sacrifice",
    "how qurbani works",
    "online sheep sacrifice",
    "online eid al adha sacrifice",
    "tawkil sacrifice",
    "qurbani service uk",
    "qurbani by proxy",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/en/blog/online-qurbani-how-it-works",
    languages: blogHreflangAlternates("sacrifice-aid-en-ligne-comment-ca-marche"),
  },
  openGraph: {
    title: "Online Qurbani: how does it really work?",
    description:
      "Complete guide to delegating your Eid sacrifice online. Process, compliance, video.",
    url: "https://qurbaniya.fr/en/blog/online-qurbani-how-it-works",
    type: "article",
    locale: "en",
    publishedTime: "2026-03-10T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Online Qurbani: how does it really work?",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-10",
    dateModified: "2026-03-10",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/en/blog/online-qurbani-how-it-works",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticleOnlineQurbani() {
  return (
    <>
      <ArticleJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://qurbaniya.fr/en" },
        { name: "Blog", url: "https://qurbaniya.fr/en/blog" },
        { name: "Online qurbani", url: "https://qurbaniya.fr/en/blog/online-qurbani-how-it-works" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/en" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/en/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Online qurbani</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="sacrifice-aid-en-ligne-comment-ca-marche"
          currentLocale="en"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Practical guide</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 10 March 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Online Qurbani: <span className="text-gold">how does it really work?</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          More and more Muslims in Europe choose to delegate their Eid al-Adha qurbani online. But is it truly compliant with the Sunnah? How does it work in practice? This guide answers every question.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Is delegating the sacrifice valid in Islam?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Yes, absolutely. Delegating the sacrifice (known as <strong className="text-text-primary">tawkil</strong>) is unanimously recognised as valid by the four classical schools of Islamic jurisprudence (Hanafi, Maliki, Shafi&apos;i and Hanbali).
            </p>
            <p className="text-text-muted leading-relaxed">
              The Prophet ﷺ himself delegated sacrifices. Ali ibn Abi Talib (may Allah be pleased with him) was appointed to supervise the remaining sacrifices during the Farewell Pilgrimage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">The process in 4 simple steps</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "You order online", desc: "Choose your type of sacrifice (Qurbani, Aqiqah, Sadaqah), enter the name on whose behalf the sacrifice will be performed, and pay securely." },
                { step: "2", title: "Your sheep is reserved", desc: "A sheep meeting the Islamic criteria (age, health, free from defects) is selected and reserved in your name." },
                { step: "3", title: "The sacrifice is performed on the day", desc: "On the day of Eid, a qualified sheikh performs the sacrifice according to the rules of the Sunnah: facing the Qibla, mentioning the name of Allah and your name, in a compliant manner." },
                { step: "4", title: "You receive your video", desc: "A personalised video of the sacrifice is sent via WhatsApp within 24 hours. The meat is fully distributed to families in need." },
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
            <h2 className="text-2xl font-bold text-text-primary mb-4">The conditions for compliance with the Sunnah</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              For a sacrifice to be valid, several conditions must be respected. At Qurbaniya, every point is carefully verified:
            </p>
            <ul className="space-y-2">
              {[
                "The animal must have reached the required age (minimum 1 year for a sheep)",
                "The animal must be free from visible defects",
                "The sacrifice must be performed within the valid window (10 to 13 Dhul Hijjah)",
                "The slaughterer must pronounce the name of Allah (Bismillah, Allahu Akbar)",
                "The name of the person on whose behalf the sacrifice is offered must be said aloud",
                "The animal must be facing the Qibla",
                "The method must be swift and respectful of the animal",
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
              A compliant, simple and transparent sacrifice
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Qualified sheikh · Personalised video · Meat distributed · 140€
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Book my qurbani <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Why delegate rather than do it yourself?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              In Europe, organising your own sacrifice is becoming increasingly complex: strict sanitary regulations, slaughterhouses overwhelmed during Eid, high costs (350–400€ on average), as well as the logistics of transport and meat storage.
            </p>
            <p className="text-text-muted leading-relaxed">
              Delegating your qurbani allows you to fulfil this religious obligation in a compliant manner, at a lower cost, while having a direct social impact: the meat is distributed to families in need.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">The personalised video: your proof of sacrifice</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              This is what distinguishes a serious service from a questionable one. At Qurbaniya, every sacrifice is filmed individually. The video shows:
            </p>
            <ul className="space-y-2 text-text-muted text-sm font-inter">
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> Your name being mentioned before the sacrifice</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> The sacrifice carried out according to the rules</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-emerald flex-shrink-0 mt-0.5" /> The meat being distributed to families</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                { q: "Can I order on behalf of someone else?", a: "Yes, you can enter the name of anyone you wish at the time of ordering. The sacrifice will be performed in their name with the proper niyyah." },
                { q: "When should I book?", a: "As early as possible. Places are limited and prices rise as Eid approaches. We recommend booking at least 2 weeks in advance." },
                { q: "What if I want to cancel?", a: "You may cancel up to 7 days before Eid for a full refund. Contact us by email or WhatsApp." },
              ].map((faq, i) => (
                <div key={i} className="bg-bg-secondary rounded-xl p-5 border border-gray-100">
                  <h3 className="text-text-primary font-bold mb-2 text-sm">{faq.q}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Read more — internal linking */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Read more</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/en/blog/eid-al-adha-2026-date" className="text-text-primary hover:text-gold transition-colors">
                  → Date of Eid al-Adha 2026: Wednesday 27 May
                </Link>
              </li>
              <li>
                <Link href="/en/blog/sheep-price-france-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Sheep price in France 2026: the full comparison
                </Link>
              </li>
              <li>
                <Link href="/en/blog/how-much-eid-sheep-2026-france" className="text-text-primary hover:text-gold transition-colors">
                  → How much does an Eid sheep cost in 2026?
                </Link>
              </li>
              <li>
                <Link href="/en/blog/day-of-arafah-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Day of Arafah 2026: fasting, virtues and du&apos;as
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="sacrifice-aid-en-ligne-comment-ca-marche"
          currentLocale="en"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/en/blog/eid-al-adha-2026-date" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Date of Eid 2026
          </Link>
          <Link
            href="/en/blog/sheep-price-france-2026"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Sheep price in France <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
