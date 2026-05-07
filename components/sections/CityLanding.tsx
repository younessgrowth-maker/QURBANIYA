import Link from "next/link";
import { ArrowRight, Check, Calendar, Video, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import type { City } from "@/lib/cities";

export default function CityLanding({ city }: { city: City }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumb items={[{ label: `Mouton Aïd ${city.name}` }]} />

          {/* Hero */}
          <section className="text-center mb-12 mt-4">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block font-inter">
              Aïd al-Adha 2026 · {city.region}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-5">
              Sacrifice mouton de l&apos;Aïd al-Adha 2026 à <span className="text-gold">{city.name}</span>
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              Habitant·e à <strong className="text-text-primary">{city.name}</strong> ? Accomplissez votre sacrifice de l&apos;Aïd al-Adha 2026 sans contrainte logistique. Sacrifice conforme à la Sounnah, vidéo nominative WhatsApp, viande distribuée aux nécessiteux. <strong className="text-text-primary">140€ tout inclus.</strong>
            </p>
            <Link
              href="/commander"
              className="mt-7 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Commander mon sacrifice <ArrowRight size={14} />
            </Link>
          </section>

          {/* Date Aid block */}
          <section className="bg-gold/5 border border-gold/20 rounded-xl p-5 md:p-6 mb-10 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <Calendar className="text-gold flex-shrink-0 mt-1" size={22} />
              <div>
                <h2 className="text-base font-bold text-text-primary mb-1">L&apos;Aïd al-Adha 2026 tombe le mercredi 27 mai 2026</h2>
                <p className="text-sm text-text-muted leading-relaxed">
                  Pour les habitants de {city.name} et de la {city.region}, la date du sacrifice est la même qu&apos;ailleurs en France. Réservez tôt : chaque année, les places s&apos;épuisent à l&apos;approche de l&apos;Aïd. <Link href="/blog/date-aid-al-adha-2026" className="text-gold hover:underline">Voir le calendrier complet</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Why this service for [city] */}
          <section className="mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Le sacrifice de l&apos;Aïd à {city.name} : pourquoi déléguer en ligne ?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">{city.intro}</p>
            <p className="text-text-muted leading-relaxed">{city.challenge}</p>
          </section>

          {/* Benefits grid */}
          <section className="mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
              Pourquoi les habitants de {city.name} choisissent Qurbaniya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <Check className="text-gold mb-3" size={22} />
                <h3 className="font-bold text-text-primary mb-2 text-sm">Conforme à la Sounnah</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Sacrifice par un cheikh diplômé, animal éligible, invocation au nom du commanditaire.
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <Video className="text-gold mb-3" size={22} />
                <h3 className="font-bold text-text-primary mb-2 text-sm">Vidéo nominative</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Vous recevez la preuve vidéo par WhatsApp dans les 24h suivant le sacrifice.
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <Heart className="text-gold mb-3" size={22} />
                <h3 className="font-bold text-text-primary mb-2 text-sm">Viande distribuée</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Intégralement remise aux familles dans le besoin, conformément à l&apos;esprit de l&apos;Aïd.
                </p>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Comment commander depuis {city.name} ?</h2>
            <ol className="space-y-4 font-inter">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">1</span>
                <div>
                  <p className="font-bold text-text-primary text-sm mb-1">Remplissez le formulaire (2 min)</p>
                  <p className="text-text-muted text-sm leading-relaxed">Indiquez votre nom (la <em>niyyah</em>), votre numéro WhatsApp pour recevoir la vidéo, et procédez au paiement sécurisé Stripe.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">2</span>
                <div>
                  <p className="font-bold text-text-primary text-sm mb-1">Confirmation par email</p>
                  <p className="text-text-muted text-sm leading-relaxed">Vous recevez immédiatement votre confirmation et votre numéro de commande.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">3</span>
                <div>
                  <p className="font-bold text-text-primary text-sm mb-1">Sacrifice le 27 mai 2026</p>
                  <p className="text-text-muted text-sm leading-relaxed">Votre mouton est sacrifié en votre nom le jour de l&apos;Aïd, par un cheikh diplômé.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">4</span>
                <div>
                  <p className="font-bold text-text-primary text-sm mb-1">Vidéo nominative WhatsApp</p>
                  <p className="text-text-muted text-sm leading-relaxed">Vous recevez la preuve vidéo dans les 24h suivant le sacrifice. Votre nom est prononcé dans l&apos;invocation.</p>
                </div>
              </li>
            </ol>
          </section>

          {/* CTA */}
          <section className="mb-12 bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-10 text-center max-w-3xl mx-auto">
            <h2 className="text-white font-bold text-xl md:text-2xl mb-3 font-playfair">
              Prêt à réserver depuis {city.name} ?
            </h2>
            <p className="text-white/70 mb-6 font-inter">
              Mouton conforme à la Sounnah · Vidéo nominative WhatsApp · 140€ tout inclus.
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Commander mon sacrifice <ArrowRight size={14} />
            </Link>
          </section>

          {/* FAQ locale */}
          <section className="mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
              Questions fréquentes — sacrifice à {city.name}
            </h2>
            <div className="space-y-4">
              <details className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between text-sm">
                  Qurbaniya livre-t-il à {city.name} ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Le service est <strong className="text-text-primary">100% en ligne</strong>. Vous ne recevez pas la viande à domicile : elle est distribuée aux familles nécessiteuses sur place. Ce que vous recevez, où que vous soyez à {city.name}, c&apos;est la <strong className="text-text-primary">vidéo nominative WhatsApp</strong> qui prouve que votre sacrifice a bien été effectué en votre nom.
                </p>
              </details>

              <details className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between text-sm">
                  Puis-je sacrifier moi-même un mouton chez moi à {city.name} ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  <strong className="text-text-primary">Non, c&apos;est strictement interdit en France</strong> (art. R214-78 du Code rural et de la pêche maritime). L&apos;abattage doit obligatoirement se faire en abattoir agréé. Sacrifier un animal hors abattoir expose à des sanctions pénales (amende et confiscation), même pour motif religieux. Le sacrifice délégué en ligne est la solution conforme.
                </p>
              </details>

              <details className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between text-sm">
                  La délégation du sacrifice est-elle valide islamiquement ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Oui. La délégation (<em>tawkil</em>) du sacrifice est unanimement reconnue valide par les quatre écoles juridiques sunnites. Cette pratique remonte aux compagnons du Prophète (paix sur lui) qui déléguaient parfois leur sacrifice. Voir notre <Link href="/blog/sacrifice-aid-en-ligne-comment-ca-marche" className="text-gold hover:underline">guide complet</Link>.
                </p>
              </details>

              <details className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between text-sm">
                  Quand dois-je commander pour l&apos;Aïd 2026 depuis {city.name} ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Au plus tard le <strong className="text-text-primary">26 mai 2026 à minuit</strong> (veille de l&apos;Aïd). Mais nous recommandons de réserver le plus tôt possible : chaque année, les places s&apos;épuisent dans la dernière semaine.
                </p>
              </details>

              <details className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between text-sm">
                  Combien coûte un mouton de l&apos;Aïd à {city.name} ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Avec Qurbaniya, le prix est de <strong className="text-text-primary">140€ tout inclus</strong>, partout en France. Pour comparer avec les autres options (boucherie halal, mouton vivant + abattoir), voir notre <Link href="/blog/combien-coute-mouton-aid-2026-france" className="text-gold hover:underline">comparatif des prix 2026</Link>.
                </p>
              </details>
            </div>
          </section>

          {/* Pour aller plus loin */}
          <section className="bg-bg-secondary rounded-xl p-5 md:p-6 border border-gold/10 max-w-3xl mx-auto">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-3 font-inter">Pour aller plus loin</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li><Link href="/commander" className="text-text-primary hover:text-gold transition-colors">→ Commander mon sacrifice (140€ tout inclus)</Link></li>
              <li><Link href="/blog/date-aid-al-adha-2026" className="text-text-primary hover:text-gold transition-colors">→ Date de l&apos;Aïd al-Adha 2026 : c&apos;est le mercredi 27 mai</Link></li>
              <li><Link href="/blog/combien-coute-mouton-aid-2026-france" className="text-text-primary hover:text-gold transition-colors">→ Combien coûte un mouton de l&apos;Aïd 2026 en France ?</Link></li>
              <li><Link href="/blog/sacrifice-aid-en-ligne-comment-ca-marche" className="text-text-primary hover:text-gold transition-colors">→ Sacrifice de l&apos;Aïd en ligne : comment ça marche ?</Link></li>
              <li><Link href="/faq" className="text-text-primary hover:text-gold transition-colors">→ FAQ Aïd al-Adha 2026</Link></li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function CityFaqJsonLd({ city }: { city: City }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Qurbaniya livre-t-il à ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le service Qurbaniya est 100% en ligne. La viande n'est pas livrée à domicile à ${city.name} ou ailleurs : elle est distribuée aux familles nécessiteuses sur le lieu du sacrifice. Vous recevez par WhatsApp la vidéo nominative qui prouve que votre sacrifice a été effectué en votre nom.`,
        },
      },
      {
        "@type": "Question",
        name: `Puis-je sacrifier moi-même un mouton à ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Non, sacrifier un animal hors abattoir agréé est strictement interdit en France (article R214-78 du Code rural). Cela vaut à ${city.name} comme partout sur le territoire. Le sacrifice délégué en ligne est la solution conforme à la fois à la loi française et à la Sounnah.`,
        },
      },
      {
        "@type": "Question",
        name: `Combien coûte un mouton de l'Aïd al-Adha 2026 à ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Avec Qurbaniya, le prix est de 140€ tout inclus, partout en France. Cela couvre l'achat de l'animal, l'abattage rituel, la vidéo nominative et la distribution de la viande. Les autres options à ${city.name} (boucherie halal, mouton vivant + abattoir) coûtent généralement entre 200€ et 450€.`,
        },
      },
      {
        "@type": "Question",
        name: `Quand l'Aïd al-Adha 2026 tombe-t-il à ${city.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `L'Aïd al-Adha 2026 tombe le mercredi 27 mai 2026, partout en France et donc à ${city.name}. Le jour d'Arafat est le 26 mai et les jours de tachriq vont du 28 au 30 mai. Le sacrifice est valide du 27 au 30 mai inclus.`,
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

export function CityServiceJsonLd({ city }: { city: City }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Sacrifice mouton Aïd al-Adha 2026 — ${city.name}`,
    description: `Service de sacrifice délégué en ligne pour l'Aïd al-Adha 2026, accessible aux habitants de ${city.name} (${city.region}). Vidéo nominative, conforme à la Sounnah, 140€ tout inclus.`,
    provider: {
      "@type": "Organization",
      name: "Qurbaniya",
      url: "https://qurbaniya.fr",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    offers: {
      "@type": "Offer",
      url: "https://qurbaniya.fr/commander",
      price: "140",
      priceCurrency: "EUR",
      availability: "https://schema.org/LimitedAvailability",
      validThrough: "2026-05-27",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
