import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Check, X } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "How much does an Eid sheep cost in France 2026? Comparing the 3 options",
  description:
    "Buying a live sheep, going through a slaughterhouse, or delegating online? A full comparison of the 3 options for Eid al-Adha 2026 in France: criteria, hidden costs and advice.",
  keywords: [
    "how much eid sheep cost 2026 france",
    "qurbani price comparison",
    "how much does a sheep cost in france",
    "eid sheep price france",
    "qurbani cost 2026",
    "price of a live sheep in france",
    "sheep price per kilo",
    "slaughterhouse sheep price",
    "cost of qurbani sheep",
    "whole sheep price france",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/en/blog/how-much-eid-sheep-2026-france",
    languages: blogHreflangAlternates("combien-coute-mouton-aid-2026-france"),
  },
  openGraph: {
    title: "How much does an Eid 2026 sheep cost? Comparing the 3 options",
    description:
      "Live sheep, halal butcher or delegated sacrifice: which option for Eid 2026 in France? Comparison of the 3 methods with real costs.",
    url: "https://qurbaniya.fr/en/blog/how-much-eid-sheep-2026-france",
    type: "article",
    locale: "en",
    publishedTime: "2026-05-07T00:00:00Z",
    modifiedTime: "2026-05-07T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How much does an Eid al-Adha sheep cost in France in 2026?",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-07",
    dateModified: "2026-05-07",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/en/blog/how-much-eid-sheep-2026-france",
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
        name: "How much does an Eid al-Adha sheep cost in France in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The price of a sheep for Eid al-Adha 2026 in France varies depending on the option chosen: €140 for an online delegated sacrifice (all-inclusive), €200 to €280 for a ready-to-eat sheep from a halal butcher, €350 to €450 for a live sheep bought from a farm with a private slaughterhouse.",
        },
      },
      {
        "@type": "Question",
        name: "Why does a sheep cost €350 from a farm and €140 online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A live sheep in France is expensive because it includes the cost of local breeding (feed, vet), transport, VAT, and the intermediary's margin. The online delegated sacrifice is cheaper because the animal is bought directly at source (often abroad), without live transport or intermediaries.",
        },
      },
      {
        "@type": "Question",
        name: "What is the price per kilo of an Eid sheep?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The carcass price per kilo ranges between €12 and €18/kg depending on the butcher and the region. A sheep with 25 kg of meat therefore costs €300 to €450. This price does not include ritual slaughter or cutting, which are usually billed separately.",
        },
      },
      {
        "@type": "Question",
        name: "Is the €140 price at Qurbaniya all-inclusive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, €140 includes: purchase of an animal compliant with Islamic criteria, ritual slaughter by a qualified sheikh, personalised WhatsApp video, and full distribution of the meat to families in need. No hidden fees.",
        },
      },
      {
        "@type": "Question",
        name: "Which option to choose: live sheep, butcher or online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Live sheep: for those who want to witness the sacrifice (but requires an approved slaughterhouse — slaughtering on your own outside a slaughterhouse is illegal in France). Halal butcher: to bring the meat home. Online: to fulfil the religious obligation simply, with video proof, with no logistical constraints. The choice depends on your priority: physical participation vs simplicity.",
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

export default function ArticleHowMuchEidSheep() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://qurbaniya.fr/en" },
        { name: "Blog", url: "https://qurbaniya.fr/en/blog" },
        { name: "How much does an Eid sheep cost 2026", url: "https://qurbaniya.fr/en/blog/how-much-eid-sheep-2026-france" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/en" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/en/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">How much does an Eid sheep cost 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="combien-coute-mouton-aid-2026-france"
          currentLocale="en"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Price comparison</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 7 May 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 7 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          How much does an <span className="text-gold">Eid al-Adha 2026</span> sheep cost in France?
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          The price of a sheep for Eid al-Adha 2026 (Wednesday 27 May) ranges in France from <strong className="text-text-primary">€140 to €450</strong> depending on the option chosen. Here is the full breakdown to understand the gap, what is included, and how to choose based on your situation.
        </p>

        {/* Quick answer */}
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-5 md:p-6 mb-10">
          <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Quick answer</h3>
          <ul className="space-y-2 text-text-muted text-sm font-inter">
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">Online delegated sacrifice</strong>: €140 all-inclusive (animal + halal slaughter + video + distribution)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">Ready-to-eat sheep</strong> at a halal butcher: €200 to €280 (cut carcass)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-gold mt-0.5 flex-shrink-0" /><span><strong className="text-text-primary">Live sheep + private slaughterhouse</strong>: €350 to €450 (animal + transport + slaughter)</span></li>
          </ul>
        </div>

        <div className="prose-custom space-y-8">
          {/* Section 1 — The 3 options */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">The 3 ways to get a sheep for Eid 2026</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              In France, three main options exist to fulfil the Eid sacrifice. Each has a different price, constraints and level of involvement.
            </p>

            <div className="space-y-4 mt-6">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">1. Online delegated sacrifice</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">€140</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  You order online, the sacrifice is carried out in your name by a qualified sheikh, and you receive a personalised WhatsApp video. The meat is distributed to families in need.
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">Advantage</strong>: zero logistical hassle, compliant with the Sunnah, video proof. <strong className="text-text-primary">Drawback</strong>: you do not receive the meat.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">2. Ready-to-eat sheep (halal butcher)</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">€200-280</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  You order from a halal butcher who handles the ritual slaughter. You collect the cut carcass (with or without head, depending on your preference).
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">Advantage</strong>: you keep the meat for your family. <strong className="text-text-primary">Drawback</strong>: name traceability (niyyah) on the exact animal is not always guaranteed without an explicit reservation.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                  <h3 className="font-bold text-text-primary">3. Live sheep + approved slaughterhouse</h3>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">€350-450</span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  Buying a live sheep on a farm (≈€250-350), then transport to an approved slaughterhouse that performs ritual slaughter (≈€80-150 extra for slaughter and cutting fees).
                </p>
                <p className="text-xs text-text-muted-light font-inter">
                  <strong className="text-text-primary">Advantage</strong>: possibility to witness the sacrifice. <strong className="text-text-primary">Drawback</strong>: slaughtering at home is <strong className="text-text-primary">illegal in France</strong> (criminal penalty, art. R214-78 of the Rural Code). Slaughter must take place in an approved slaughterhouse.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 — Why this price gap */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Why such a price gap (€140 vs €450)?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The gap between €140 and €450 is explained by 4 main factors:
            </p>
            <ul className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-text-primary">Cost of local breeding</strong> — A sheep raised in France is expensive (feed, land, vet, regulations). Internationally, breeding costs are significantly lower.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-text-primary">Transport</strong> — Moving a live animal to an approved slaughterhouse in France easily adds €30 to €80.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-text-primary">VAT and intermediaries</strong> — 5.5% VAT on meat + breeder margin + butcher margin together add 20 to 35% on top of the cost price.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">4</span>
                <span><strong className="text-text-primary">Economic model</strong> — The online delegated sacrifice pools costs (one slaughter site, several hundred sheep), which allows reaching €140 all-inclusive.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 — Comparison table */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Detailed comparison table</h2>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-sm font-inter min-w-[640px] mx-4 md:mx-0">
                <thead>
                  <tr className="border-b-2 border-gold/30">
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Criterion</th>
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Online (€140)</th>
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Halal butcher (€200-280)</th>
                    <th className="text-left py-3 px-3 font-bold text-text-primary">Live + slaughterhouse (€350-450)</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Compliant with the Sunnah</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Personalised video</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">You keep the meat</td>
                    <td className="py-3 px-3"><X className="text-red-500" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Distribution to those in need</td>
                    <td className="py-3 px-3"><Check className="text-green-600" size={18} /></td>
                    <td className="py-3 px-3">Optional</td>
                    <td className="py-3 px-3">To organise</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Logistics required</td>
                    <td className="py-3 px-3">None</td>
                    <td className="py-3 px-3">Butcher pickup</td>
                    <td className="py-3 px-3">Farm + transport + slaughterhouse</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold">Booking lead time</td>
                    <td className="py-3 px-3">D-1</td>
                    <td className="py-3 px-3">D-7 to D-15</td>
                    <td className="py-3 px-3">D-30+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              The simplest option: €140 all-inclusive
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Compliant sacrifice · Personalised WhatsApp video · Distribution to those in need
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Book my sacrifice <ArrowRight size={14} />
            </Link>
          </div>

          {/* Section 4 — Which choice for your situation */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Which option to choose for your situation?</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-text-primary mb-2">→ You want to fulfil the obligation simply, hassle-free</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  The online delegated sacrifice is the most rational option: €140, compliant with the Sunnah according to the 4 schools of jurisprudence, personalised video as proof, and the meat goes directly to families in need. No logistics, no cutting, no freezer management.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">→ You want the meat for your family</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  The halal butcher is the right choice. Book early (D-7 minimum) with a trustworthy butcher. Make sure the <em>tasmiyah</em> mentions your name and that the animal&apos;s traceability is guaranteed.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary mb-2">→ You want to witness the sacrifice</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  This is only possible via an approved slaughterhouse that accepts individuals (rare in practice). <strong className="text-text-primary">Slaughtering an animal yourself outside a slaughterhouse is illegal in France</strong>, punishable by criminal penalties (art. R214-78 et seq. of the Rural Code). Do your research before choosing this option.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 — Price per kilo */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">And what about the price per kilo of sheep in France?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              If you buy at a butcher outside Eid season, the carcass price per kilo ranges between <strong className="text-text-primary">€12 and €18/kg</strong> depending on the region and quality (salt-marsh sheep, Sisteron lamb, standard sheep). An Eid sheep weighs on average 20 to 30 kg of meat, which gives a price of €240 to €540 — not counting the ritual slaughter or cutting.
            </p>
            <p className="text-text-muted leading-relaxed">
              During Eid season, prices climb by 10 to 25% due to demand. This is precisely the appeal of the online delegated sacrifice: a fixed price (€140), booked outside seasonal price spikes.
            </p>
          </section>

          {/* Section 6 — Internal links */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Read more</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/en/blog/sheep-price-france-2026" className="text-text-primary hover:text-gold transition-colors">
                  → Sheep price in France 2026: why delegating is the smarter choice
                </Link>
              </li>
              <li>
                <Link href="/en/blog/eid-al-adha-2026-date" className="text-text-primary hover:text-gold transition-colors">
                  → Date of Eid al-Adha 2026: Wednesday 27 May
                </Link>
              </li>
              <li>
                <Link href="/en/blog/online-qurbani-how-it-works" className="text-text-primary hover:text-gold transition-colors">
                  → Online Eid sacrifice: how does it work?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-primary hover:text-gold transition-colors">
                  → Eid al-Adha 2026 FAQ — online sheep sacrifice
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="combien-coute-mouton-aid-2026-france"
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
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-2.5 rounded-xl transition-colors font-inter"
          >
            Order for €140 <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
