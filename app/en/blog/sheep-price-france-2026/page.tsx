import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, X, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import LanguageSwitcher from "@/components/blog/LanguageSwitcher";
import { blogHreflangAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "🐑 Sheep Price in France 2026: €140 to €450 · The Complete Guide",
  description:
    "💰 Live sheep in France: €350–450. Delegated online sacrifice: €140 all-inclusive. Detailed price comparison for Eid al-Adha 2026, what's included and how to choose.",
  keywords: [
    "sheep price 2026 france",
    "qurbani price 2026",
    "eid sheep cost",
    "cheap eid sheep france",
    "buy eid sheep online france",
    "sheep price comparison eid",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/en/blog/sheep-price-france-2026",
    languages: blogHreflangAlternates("prix-mouton-france-2026"),
  },
  openGraph: {
    title: "🐑 Sheep Price in France 2026: €140 to €450",
    description:
      "Full comparison: live sheep in France €350–450 vs online sacrifice €140. Everything you need to know before deciding 🌙",
    url: "https://qurbaniya.fr/en/blog/sheep-price-france-2026",
    type: "article",
    locale: "en",
    publishedTime: "2026-03-05T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Sheep price in France 2026: why delegating is the smarter choice",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-03-05",
    dateModified: "2026-03-05",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/en/blog/sheep-price-france-2026",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ArticleSheepPrice() {
  return (
    <>
      <ArticleJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://qurbaniya.fr/en" },
        { name: "Blog", url: "https://qurbaniya.fr/en/blog" },
        { name: "Sheep price France 2026", url: "https://qurbaniya.fr/en/blog/sheep-price-france-2026" },
      ]} />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/en" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/en/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary">Sheep price 2026</span>
        </nav>

        <LanguageSwitcher
          canonicalSlug="prix-mouton-france-2026"
          currentLocale="en"
          className="mb-6"
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full font-inter">Comparison</span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> 5 March 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 6 min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Sheep price in France 2026: <span className="text-gold">why delegating is the smarter choice</span>
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          Every year, sheep prices for Eid skyrocket in France. In 2026, expect to pay between €350 and €450 for a sheep alone — not counting logistics. Here is a detailed comparison to help you make the best choice.
        </p>

        {/* Content */}
        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">How much does a sheep cost in France in 2026?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The price of a sheep for Eid al-Adha in France varies depending on the breed, weight and region. Here are the typical price ranges:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <h3 className="text-red-700 font-bold text-sm uppercase tracking-wider mb-3 font-inter">In France</h3>
                <ul className="space-y-2 text-sm font-inter">
                  <li className="text-text-muted"><strong className="text-red-700">Small sheep:</strong> €280 – 350</li>
                  <li className="text-text-muted"><strong className="text-red-700">Medium sheep:</strong> €350 – 420</li>
                  <li className="text-text-muted"><strong className="text-red-700">Large sheep:</strong> €420 – 500+</li>
                  <li className="text-text-muted mt-3 text-xs">+ slaughterhouse fees, transport, storage…</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <h3 className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-3 font-inter">With Qurbaniya</h3>
                <ul className="space-y-2 text-sm font-inter">
                  <li className="text-text-muted"><strong className="text-emerald-700">Full sheep:</strong> €140</li>
                  <li className="text-text-muted"><strong className="text-emerald-700">All inclusive:</strong> sacrifice + video</li>
                  <li className="text-text-muted"><strong className="text-emerald-700">Distribution:</strong> 100% of the meat</li>
                  <li className="text-text-muted mt-3 text-xs">No hidden fees · Secure payment</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">The real cost of a sacrifice in France (hidden fees)</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The price of the sheep is only the tip of the iceberg. In France, you also have to add:
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border border-gold/10">
              <ul className="space-y-3 text-text-muted text-sm font-inter">
                <li className="flex justify-between"><span>Price of the sheep</span><span className="text-text-primary font-bold">€350 – 400</span></li>
                <li className="flex justify-between"><span>Outbound transport (market → home)</span><span className="text-text-primary font-bold">€30 – 50</span></li>
                <li className="flex justify-between"><span>Food if kept for a few days</span><span className="text-text-primary font-bold">€10 – 20</span></li>
                <li className="flex justify-between"><span>Approved slaughterhouse fees</span><span className="text-text-primary font-bold">€40 – 80</span></li>
                <li className="flex justify-between"><span>Return transport (slaughterhouse → home)</span><span className="text-text-primary font-bold">€20 – 40</span></li>
                <li className="flex justify-between border-t border-gold/10 pt-3 mt-3"><span className="font-bold text-text-primary">Real estimated total</span><span className="text-red-600 font-black text-lg">€450 – 590</span></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Detailed comparison: France vs. online delegation</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse font-inter">
                <thead>
                  <tr className="border-b-2 border-gold/20">
                    <th className="text-left py-3 text-text-muted font-medium">Criterion</th>
                    <th className="text-center py-3 text-red-600 font-bold">In France</th>
                    <th className="text-center py-3 text-emerald-700 font-bold">Qurbaniya</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  {[
                    { label: "Total price", france: "€450 – 590", nous: "€140", bad: true },
                    { label: "Logistics", france: "On you", nous: "We handle everything" },
                    { label: "Compliance", france: "Variable", nous: "Qualified sheikh" },
                    { label: "Proof", france: "None", nous: "Personalised video" },
                    { label: "Wasted meat", france: "Often", nous: "100% distributed" },
                    { label: "Social impact", france: "Limited", nous: "+30 meals/sheep" },
                    { label: "Stress", france: "High", nous: "Zero" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 font-medium text-text-primary">{row.label}</td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1">
                          <X size={14} className="text-red-400" />
                          <span className={row.bad ? "line-through text-red-400" : ""}>{row.france}</span>
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1">
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">{row.nous}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Save up to €260 on your sacrifice
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              €140 all-inclusive · Compliant sacrifice · Personalised video · Meat distributed
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Book at €140 <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Benefits beyond the price</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Delegating your sacrifice isn&apos;t just about saving money. It is also:
            </p>
            <ul className="space-y-3">
              {[
                { title: "A direct social impact", desc: "Each sheep feeds up to 30 people in need, around 5 families. The meat is fully distributed, nothing is wasted." },
                { title: "Zero logistics", desc: "No livestock market, no transport, no slaughterhouse to find. You order in 2 minutes from your sofa." },
                { title: "Guaranteed compliance", desc: "The sacrifice is performed by a qualified sheikh, according to the strict rules of the Sunnah. No approximation." },
                { title: "Concrete proof", desc: "The personalised video confirms that your sacrifice was indeed performed in your name. Full transparency." },
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <Check size={18} className="text-gold flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-text-primary">{item.title}</strong>
                    <p className="text-text-muted text-sm mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Why do prices keep rising every year in France?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Several factors explain the continued rise in sheep prices in France: general inflation, the shrinking number of sheep farms, increasingly strict health regulations, and the strong demand concentrated on just a few days around <Link href="/en/blog/eid-al-adha-2026-date" className="text-gold hover:underline">Wednesday 27 May 2026, the day of Eid al-Adha</Link>.
            </p>
            <p className="text-text-muted leading-relaxed">
              By delegating in countries where sheep farming is more developed and less expensive, you get a fair price while having a significant social impact.
            </p>
          </section>

          {/* Go further — internal linking */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Go further</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/en/blog/eid-al-adha-2026-date" className="text-text-primary hover:text-gold transition-colors">
                  → Date of Eid al-Adha 2026: it&apos;s Wednesday 27 May
                </Link>
              </li>
              <li>
                <Link href="/en/blog/how-much-eid-sheep-2026-france" className="text-text-primary hover:text-gold transition-colors">
                  → How much does an Eid 2026 sheep cost? (detailed comparison)
                </Link>
              </li>
              <li>
                <Link href="/en/blog/online-qurbani-how-it-works" className="text-text-primary hover:text-gold transition-colors">
                  → Eid sacrifice online: how does it work?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-primary hover:text-gold transition-colors">
                  → Eid al-Adha 2026 FAQ
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <LanguageSwitcher
          canonicalSlug="prix-mouton-france-2026"
          currentLocale="en"
          className="mt-12 mb-6"
        />

        {/* Bottom navigation */}
        <div className="mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/en/blog/online-qurbani-how-it-works" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm">
            <ArrowLeft size={14} /> Online sacrifice
          </Link>
          <Link href="/en/blog" className="flex items-center gap-2 text-gold font-semibold font-inter text-sm">
            All articles <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
