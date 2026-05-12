import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, Zap, Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "🚨 Réserver son mouton à la dernière minute pour l'Aïd 2026",
  description:
    "⏳ Pas encore réservé pour l'Aïd 2026 ? Voici comment commander à la dernière minute (J-15 à J-1) en toute sérénité. Délais réels, options disponibles, ce qu'il faut savoir avant de cliquer.",
  keywords: [
    "reservation mouton aid 2026",
    "reserver mouton aid 2026",
    "commander mouton aid 2026",
    "commande mouton aid 2026",
    "reserver mouton aïd 2026",
    "reservation mouton aïd 2026",
    "commande mouton aïd 2026",
    "reservation derniere minute aid",
    "mouton aid en urgence",
    "réservation mouton aid 2026",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/blog/reserver-mouton-aid-derniere-minute-2026",
  },
  openGraph: {
    title: "🚨 Réserver son mouton à la dernière minute pour l'Aïd 2026",
    description:
      "⏳ Comment commander un sacrifice juste avant l'Aïd 2026. Délais, options, ce qu'il faut savoir 🐑",
    url: "https://qurbaniya.fr/blog/reserver-mouton-aid-derniere-minute-2026",
    type: "article",
    publishedTime: "2026-05-12T00:00:00Z",
    modifiedTime: "2026-05-12T00:00:00Z",
  },
};

function ArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Réserver son mouton à la dernière minute pour l'Aïd 2026",
    author: { "@type": "Organization", name: "Qurbaniya" },
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    publisher: {
      "@type": "Organization",
      name: "Qurbaniya",
      logo: { "@type": "ImageObject", url: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg" },
    },
    mainEntityOfPage: "https://qurbaniya.fr/blog/reserver-mouton-aid-derniere-minute-2026",
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
        name: "Peut-on encore réserver un mouton pour l'Aïd 2026 à quelques jours de la fête ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, tant que des places sont disponibles. Chez Qurbaniya, les réservations restent ouvertes jusqu'au 27 mai 2026 à 06h00 (heure de Paris). Le sacrifice étant délégué à Madagascar, aucune contrainte logistique en France — la commande peut être validée en 2 minutes en ligne.",
        },
      },
      {
        "@type": "Question",
        name: "Combien de temps prend une réservation de dernière minute ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le formulaire en ligne prend 2 minutes : prénom, nom, email, téléphone WhatsApp, intention (pour soi / famille / sadaqa), niyyah (prénom mentionné lors du sacrifice). Paiement carte bancaire instantané via Stripe. Confirmation par email dans la minute.",
        },
      },
      {
        "@type": "Question",
        name: "Y a-t-il un risque de rupture de stock juste avant l'Aïd ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Chaque année, les places s'épuisent dans la dernière semaine. Le stock est limité car chaque sacrifice est physiquement préparé en avance à Madagascar. Le compteur de places restantes est affiché en temps réel sur le site.",
        },
      },
      {
        "@type": "Question",
        name: "Que se passe-t-il si je réserve la veille de l'Aïd ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le sacrifice est exécuté le 27 mai 2026 (jour de l'Aïd) en votre nom, comme pour les commandes plus anciennes. Vous recevez la vidéo nominative dans les 24h suivantes par WhatsApp.",
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

export default function ArticleDerniereMinute() {
  return (
    <>
      <ArticleJsonLd />
      <ArticleFaqJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Blog", url: "https://qurbaniya.fr/blog" },
          {
            name: "Réserver à la dernière minute",
            url: "https://qurbaniya.fr/blog/reserver-mouton-aid-derniere-minute-2026",
          },
        ]}
      />
      <article className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted-light mb-8 font-inter">
          <Link href="/" className="hover:text-gold transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-text-primary">Réserver à la dernière minute</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold text-urgency bg-urgency/10 px-2.5 py-1 rounded-full font-inter flex items-center gap-1">
            <Zap size={11} className="fill-current" /> Urgence
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Calendar size={12} /> Publié le 12 mai 2026
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted-light font-inter">
            <Clock size={12} /> 5 min de lecture
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-6">
          Réserver son mouton à la <span className="text-gold">dernière minute</span> pour l&apos;Aïd 2026
        </h1>

        <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-4 border-gold pl-4">
          L&apos;Aïd al-Adha 2026 c&apos;est dans <strong className="text-text-primary">moins de deux semaines</strong> (mercredi 27 mai 2026). Si vous n&apos;avez pas encore réservé votre sacrifice, voici le guide complet pour le faire <strong className="text-text-primary">vite</strong>, <strong className="text-text-primary">bien</strong>, et <strong className="text-text-primary">en toute conformité religieuse</strong>.
        </p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⏳ Oui, c&apos;est encore possible
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Contrairement à une idée reçue, réserver son mouton la dernière semaine — voire la veille — reste tout à fait possible <strong className="text-text-primary">tant qu&apos;il y a des places</strong>. Chez Qurbaniya, le compteur en temps réel sur la page d&apos;accueil indique le stock disponible. Les réservations ferment automatiquement le <strong className="text-text-primary">27 mai 2026 à 06h00</strong> (heure de Paris).
            </p>
            <div className="bg-bg-secondary rounded-xl p-5 border-l-4 border-gold">
              <p className="text-text-muted leading-relaxed text-sm">
                <strong className="text-text-primary">À retenir :</strong> chaque année, les 30-40 dernières places partent dans les 48h précédant l&apos;Aïd. Si vous voyez le compteur descendre sous 20, ne tardez pas.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ⚡ Le tunnel de réservation en 2 minutes
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Le processus est volontairement court car beaucoup de réservations se font sur mobile depuis le travail, le métro, ou la pause déjeuner :
            </p>
            <ol className="space-y-3 text-text-muted font-inter">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span>
                  <strong className="text-text-primary">Vous remplissez le formulaire</strong> — prénom, nom, email, téléphone WhatsApp (pour recevoir la vidéo), intention (pour vous, famille, ou sadaqa), niyyah (prénom mentionné lors du sacrifice).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span>
                  <strong className="text-text-primary">Paiement par carte bancaire</strong> — 140€ tout inclus via Stripe sécurisé (Visa, Mastercard, Apple Pay, Google Pay).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <span>
                  <strong className="text-text-primary">Confirmation immédiate par email</strong> — votre place est sécurisée. Le sacrifice sera exécuté le 27 mai en votre nom.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/15 text-gold text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <span>
                  <strong className="text-text-primary">Vidéo nominative dans les 24h</strong> — vous recevez la preuve vidéo sur WhatsApp avec votre nom prononcé lors de la <em>tasmiyah</em>.
                </span>
              </li>
            </ol>
          </section>

          {/* CTA mid-article */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 md:p-8 text-center my-10">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-playfair">
              Réservez maintenant avant la clôture
            </h3>
            <p className="text-white/70 text-sm mb-4 font-inter">
              Conforme à la Sunnah · Vidéo nominative · Distribution aux familles dans le besoin · 140€ tout inclus
            </p>
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-6 py-3 rounded-xl transition-colors font-inter"
            >
              Réserver en 2 minutes <ArrowRight size={14} />
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ✅ Pourquoi la délégation reste valide à la dernière minute
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              La <em>tawkil</em> (délégation du sacrifice) est <strong className="text-text-primary">reconnue par les quatre écoles juridiques sunnites</strong> (hanafite, malékite, chaféite, hanbalite). Elle remonte aux compagnons du Prophète (paix sur lui) — plusieurs ont délégué leur propre sacrifice de leur vivant.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              Ce qui compte du point de vue religieux, c&apos;est :
            </p>
            <ul className="space-y-2 text-text-muted font-inter text-sm pl-1">
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>L&apos;intention sincère (<em>niyyah</em>) au nom du mandant.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>L&apos;animal conforme (âge minimum, bonne santé, sans défauts).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>L&apos;égorgement rituel par un musulman, conforme à la Sounnah.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>Le sacrifice effectué entre le 27 et le 30 mai 2026 inclus.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-emerald flex-shrink-0 mt-1" strokeWidth={3} />
                <span>La distribution de la viande (familles, proches, nécessiteux).</span>
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-4">
              Tout cela est garanti par Qurbaniya, que vous réserviez 3 mois ou 3 jours avant l&apos;Aïd.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              💡 Conseils pour ne pas se louper en dernière minute
            </h2>
            <ul className="space-y-3 text-text-muted font-inter text-sm">
              <li>
                <strong className="text-text-primary">📱 Préparez votre carte bancaire à l&apos;avance</strong> — vérifiez le plafond avec votre banque (140€ ne devrait pas poser problème, mais certaines cartes prépayées sont refusées).
              </li>
              <li>
                <strong className="text-text-primary">📞 Vérifiez votre numéro WhatsApp</strong> — la vidéo arrivera dessus, donc indiquez bien le numéro où vous voulez la recevoir.
              </li>
              <li>
                <strong className="text-text-primary">🤲 Préparez votre niyyah</strong> — décidez à l&apos;avance au nom de qui le sacrifice est offert (vous, votre père, votre mère, votre famille, en sadaqa pour un défunt).
              </li>
              <li>
                <strong className="text-text-primary">💬 Conservez le numéro support</strong> — en cas de doute après la commande, vous pouvez nous écrire sur WhatsApp et nous répondons dans la journée.
              </li>
              <li>
                <strong className="text-text-primary">📧 Vérifiez vos spams</strong> — la confirmation email arrive de <code>noreply@qurbaniya.fr</code>. Parfois elle est filtrée, pas de panique.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              🐑 Et si je veux d&apos;abord comparer ?
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Si vous hésitez entre acheter un mouton vivant en France (350-450€ + démarches d&apos;abattage), ou déléguer en ligne (140€ tout inclus), notre <Link href="/blog/prix-mouton-france-2026" className="text-gold hover:underline">guide complet des prix du mouton 2026</Link> couvre tout : critères islamiques, coûts cachés, comparaison conformité.
            </p>
            <p className="text-text-muted leading-relaxed">
              À J-15 de l&apos;Aïd, la plupart des éleveurs locaux n&apos;ont plus de moutons disponibles ou ont fait flamber les prix. La délégation reste l&apos;option la plus accessible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              ❓ Questions fréquentes des retardataires
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  Le stock est-il vraiment limité ?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Oui. Chaque sacrifice correspond à un animal physiquement préparé à Madagascar. Le compteur affiche en temps réel les places restantes. Quand c&apos;est 0, c&apos;est 0 — nous n&apos;ouvrons pas de surplus.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  Puis-je commander pour quelqu&apos;un d&apos;autre ?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Oui, en mode « cadeau » lors de la commande : vous indiquez le nom du bénéficiaire, vous payez, et la confirmation peut être envoyée à votre destinataire si vous le souhaitez.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  Que se passe-t-il si je commande le 27 mai à 5h59 ?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Votre commande est acceptée si elle est validée et payée avant 06h00. À 06h00 pile, l&apos;API refuse toute nouvelle commande pour 2026 et nous ouvrirons les réservations Aïd 2027 en début d&apos;année prochaine.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  Et après le paiement, je suis tranquille ?
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  Oui. Vous n&apos;avez plus rien à faire. Un email de confirmation, un rappel à J-7, et la vidéo nominative arrive dans les 24h après le 27 mai. Vous pouvez vous concentrer sur la prière et la fête.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors font-inter text-sm"
          >
            <ArrowLeft size={14} /> Retour au blog
          </Link>
          <Link
            href="/commander"
            className="flex items-center gap-2 text-gold font-semibold font-inter text-sm"
          >
            Réserver mon sacrifice <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
