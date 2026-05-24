import type { Metadata } from "next";
import Link from "next/link";
import { CalendarX, MessageCircle, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import OrderForm from "@/components/forms/OrderForm";
import OrderSummary from "@/components/forms/OrderSummary";
import InventoryStatus from "@/components/sections/InventoryStatus";
import SoldOutPanel from "@/components/sections/SoldOutPanel";
import CommanderTrustStrip from "@/components/sections/CommanderTrustStrip";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { CURRENT_YEAR, isOrderingOpen, whatsappUrl } from "@/lib/constants";
import { getInventory } from "@/lib/supabase/queries";

// Revalidation courte pour que la bascule "complet" se propage rapidement
// quand inventory.reserved_slots / is_open changent en base.
export const revalidate = 30;

export const metadata: Metadata = {
  title: "Réserver mon mouton pour l'Aïd al-Adha 2026 (27 mai) — 140€",
  description:
    "Commander / réserver votre mouton pour l'Aïd al-Adha 2026 (mercredi 27 mai). Sacrifice conforme à la Sounnah, vidéo nominative WhatsApp, viande distribuée aux nécessiteux. 140€ tout inclus, partout en France.",
  keywords: [
    "commander mouton aid 2026",
    "reserver mouton aid 2026",
    "reservation mouton aid 2026",
    "mouton pour aid 2026",
    "sacrifice mouton aid 2026",
    "mouton aid al adha 2026",
    "qurbani france",
    "tabaski 2026 france",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/commander",
  },
  openGraph: {
    title: "Réserver mon mouton pour l'Aïd al-Adha 2026 — 140€ | Qurbaniya",
    description:
      "Commandez votre sacrifice pour le 27 mai 2026. Sacrifice conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
    url: "https://qurbaniya.fr/commander",
  },
};

function CommanderFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment réserver mon mouton pour l'Aïd al-Adha 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Remplissez le formulaire de commande sur cette page (2 minutes), réglez 140€ par carte, et recevez votre confirmation par email. Votre sacrifice sera effectué le mercredi 27 mai 2026, jour de l'Aïd al-Adha, en votre nom.",
        },
      },
      {
        "@type": "Question",
        name: "Combien coûte un mouton pour l'Aïd 2026 chez Qurbaniya ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le prix est de 140€ tout inclus : achat de l'animal conforme aux critères islamiques (âge, santé, intégrité), abattage rituel par un cheikh diplômé, vidéo nominative envoyée par WhatsApp, et distribution de la viande aux nécessiteux.",
        },
      },
      {
        "@type": "Question",
        name: "Le sacrifice est-il conforme à la Sounnah ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. L'animal respecte tous les critères islamiques (âge minimum, bonne santé, sans défauts disqualifiants). L'abattage est effectué par un cheikh diplômé selon le rite islamique, avec invocation au nom du commanditaire.",
        },
      },
      {
        "@type": "Question",
        name: "Comment ai-je la preuve que mon sacrifice a été effectué ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vous recevez une vidéo nominative par WhatsApp dans les 24h suivant le sacrifice. Votre nom est prononcé lors de l'invocation, et la vidéo montre l'animal et l'abattage rituel complet.",
        },
      },
      {
        "@type": "Question",
        name: "Jusqu'à quand puis-je commander pour l'Aïd 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les commandes sont ouvertes jusqu'à épuisement du stock, et au plus tard la nuit du 26 au 27 mai 2026 à 3h du matin (quelques heures avant le sacrifice de l'Aïd). Cependant, nous recommandons de réserver le plus tôt possible : chaque année, les places s'épuisent rapidement à l'approche de l'Aïd.",
        },
      },
      {
        "@type": "Question",
        name: "Que devient la viande de mon sacrifice ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La viande est intégralement distribuée à des familles nécessiteuses, conformément à l'esprit du sacrifice de l'Aïd. Vous ne recevez pas la viande : vous accomplissez votre obligation religieuse en vous concentrant sur l'aspect spirituel, sans contrainte logistique.",
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

export default async function CommanderPage() {
  const open = isOrderingOpen();
  // Inventory lecture côté serveur — détermine si on bascule en mode
  // "Complet → liste d'attente" plutôt que d'afficher le formulaire.
  // Fail-open : si Supabase est down, on garde le tunnel ouvert (l'API
  // /api/orders refusera la commande si vraiment plein).
  const inventory = open ? await getInventory(CURRENT_YEAR) : null;
  const isFull =
    !!inventory && (!inventory.isOpen || inventory.remaining <= 0);

  return (
    <>
      <ProductJsonLd />
      <CommanderFaqJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://qurbaniya.fr" },
        { name: "Commander", url: "https://qurbaniya.fr/commander" },
      ]} />
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[
            { label: "Commander mon sacrifice", },
          ]} />
          {/* Compteur de places dynamique (visible uniquement si stock < 75) */}
          {open && !isFull && <InventoryStatus className="mb-6" showCta={false} />}

          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black uppercase mb-2">
              {isFull ? (
                <>
                  RÉSERVATIONS <span className="text-gold">AÏD 2026 COMPLÈTES</span>
                </>
              ) : open ? (
                <>
                  COMMANDER MON MOUTON <span className="text-gold">POUR L&apos;AÏD 2026</span>
                </>
              ) : (
                <>
                  RÉSERVATIONS <span className="text-gold">AÏD 2026 CLOSES</span>
                </>
              )}
            </h1>
            <p className="text-text-muted">
              {isFull ? (
                <>
                  Toutes les places sont prises. Une réservation peut se libérer — inscrivez-vous sur la liste d&apos;attente ci-dessous.
                </>
              ) : open ? (
                <>
                  Sacrifice le <strong className="text-text-primary">mercredi 27 mai 2026</strong>. Vidéo nominative WhatsApp, viande aux nécessiteux. <strong className="text-text-primary">140€ tout inclus.</strong>
                </>
              ) : (
                <>
                  L&apos;Aïd al-Adha 2026 est passé. Les commandes pour l&apos;édition 2027 ouvriront en début d&apos;année prochaine.
                </>
              )}
            </p>
          </div>

          {isFull ? (
            /* Stock épuisé : panneau liste d'attente */
            <SoldOutPanel />
          ) : open ? (
            <>
              {/* 2-col layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
              {/* Form */}
              <div className="bg-white border border-gray-100/80 rounded-card p-6 md:p-8 shadow-soft">
                <OrderForm />
              </div>

              {/* Sticky summary */}
              <div className="hidden lg:block">
                <OrderSummary />
              </div>

              {/* Mobile summary (above fold on mobile shows inline) */}
              <div className="lg:hidden">
                <OrderSummary />
              </div>
            </div>
            </>
          ) : (
            /* État fermé : pas de formulaire, message + canaux contact */
            <div className="max-w-2xl mx-auto bg-white border border-gray-100/80 rounded-card p-8 md:p-12 shadow-soft text-center">
              <CalendarX className="text-gold mx-auto mb-5" size={48} />
              <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4">
                Les réservations sont fermées
              </h2>
              <p className="text-text-muted leading-relaxed mb-2">
                Les commandes Qurbaniya pour l&apos;Aïd al-Adha 2026 sont closes depuis le jour de l&apos;Aïd. Le service ne peut plus accepter de paiement pour cette édition.
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                Pour être informé(e) de l&apos;ouverture des réservations Aïd 2027 (prévue début 2027), contactez-nous :
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={whatsappUrl("Salam, je souhaite être averti(e) de l'ouverture des réservations Aïd 2027")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
                >
                  <MessageCircle size={16} /> Me prévenir sur WhatsApp
                </a>
                <a
                  href="mailto:support@qurbaniya.fr?subject=Liste%20d'attente%20A%C3%AFd%202027"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold hover:bg-gold/5 font-bold uppercase text-sm px-5 py-3 rounded-xl transition-colors font-inter"
                >
                  <Mail size={16} /> support@qurbaniya.fr
                </a>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-text-muted-light">
                  En attendant, vous pouvez consulter notre <Link href="/blog" className="text-gold hover:underline font-semibold">blog</Link> ou notre <Link href="/faq" className="text-gold hover:underline font-semibold">FAQ</Link>.
                </p>
              </div>
            </div>
          )}

          {/* Avis vérifiés — preuve sociale après le tunnel, juste avant la FAQ. */}
          {open && !isFull && (
            <section className="mt-16" aria-label="Avis vérifiés de nos clients">
              <CommanderTrustStrip />
            </section>
          )}

          {/* SEO: contenu informatif + FAQ */}
          <section className="mt-16 max-w-3xl mx-auto" aria-labelledby="faq-commander">
            <h2 id="faq-commander" className="text-2xl md:text-3xl font-black mb-6 text-center">
              Questions <span className="text-gold">fréquentes</span>
            </h2>

            <div className="space-y-5">
              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Comment réserver mon mouton pour l&apos;Aïd al-Adha 2026 ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Remplissez le formulaire ci-dessus (2 minutes), réglez 140€ par carte bancaire, et recevez votre confirmation par email. Votre sacrifice sera effectué le <strong className="text-text-primary">mercredi 27 mai 2026</strong>, jour de l&apos;Aïd al-Adha, en votre nom.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Combien coûte un mouton pour l&apos;Aïd 2026 chez Qurbaniya ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  <strong className="text-text-primary">140€ tout inclus</strong> : achat de l&apos;animal conforme aux critères islamiques (âge, santé, intégrité), abattage rituel par un cheikh diplômé, vidéo nominative envoyée par WhatsApp, et distribution de la viande aux nécessiteux. Aucun frais caché. Pour comparer avec le marché, voir notre <Link href="/blog/prix-mouton-france-2026" className="text-gold hover:underline">guide des prix du mouton en France 2026</Link>.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Le sacrifice est-il conforme à la Sounnah ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Oui. L&apos;animal respecte tous les critères islamiques : âge minimum, bonne santé, sans défauts disqualifiants. L&apos;abattage est effectué par un cheikh diplômé selon le rite islamique, avec invocation au nom du commanditaire (la <em>tasmiyah</em> mentionnant votre nom).
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Comment ai-je la preuve que mon sacrifice a été effectué ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Vous recevez une <strong className="text-text-primary">vidéo nominative par WhatsApp dans les 24h suivant le sacrifice</strong>. Votre nom est prononcé lors de l&apos;invocation, et la vidéo montre l&apos;animal et l&apos;abattage rituel complet.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Jusqu&apos;à quand puis-je commander pour l&apos;Aïd 2026 ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  Les commandes sont ouvertes jusqu&apos;à épuisement du stock, et au plus tard <strong className="text-text-primary">la nuit du 26 au 27 mai 2026 à 3h du matin</strong> (quelques heures avant le sacrifice de l&apos;Aïd). Cependant, nous recommandons de réserver le plus tôt possible : chaque année, les places s&apos;épuisent rapidement à l&apos;approche de l&apos;Aïd.
                </p>
              </details>

              <details className="group bg-white border border-gray-100/80 rounded-card p-5 shadow-soft">
                <summary className="font-bold text-text-primary cursor-pointer list-none flex items-center justify-between">
                  Que devient la viande de mon sacrifice ?
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed text-sm">
                  La viande est <strong className="text-text-primary">intégralement distribuée à des familles nécessiteuses</strong>, conformément à l&apos;esprit du sacrifice de l&apos;Aïd. Vous ne recevez pas la viande : vous accomplissez votre obligation religieuse en vous concentrant sur l&apos;aspect spirituel, sans contrainte logistique.
                </p>
              </details>
            </div>

            <div className="mt-10 text-center text-text-muted text-sm">
              D&apos;autres questions ? Consultez notre <Link href="/faq" className="text-gold hover:underline font-semibold">FAQ complète</Link> ou notre <Link href="/blog/sacrifice-aid-en-ligne-comment-ca-marche" className="text-gold hover:underline font-semibold">guide « comment ça marche »</Link>.
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
