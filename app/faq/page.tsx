import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/sections/FAQ";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "FAQ Aïd al-Adha 2026 — Sacrifice mouton en ligne (conformité, vidéo, prix)",
  description:
    "Toutes les réponses sur le sacrifice de l'Aïd al-Adha 2026 (27 mai) en ligne : conformité à la Sounnah, vidéo nominative WhatsApp, paiement sécurisé, annulation, distribution de la viande. 140€ tout inclus.",
  keywords: [
    "faq aid al adha 2026",
    "questions sacrifice aid",
    "sacrifice mouton en ligne questions",
    "aid 2026 faq",
    "qurbani france questions",
    "comment ca marche sacrifice aid",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/faq",
  },
  openGraph: {
    title: "FAQ Aïd al-Adha 2026 — Sacrifice mouton en ligne | Qurbaniya",
    description:
      "Toutes les réponses sur le sacrifice de l'Aïd al-Adha 2026 en ligne : conformité, vidéo nominative WhatsApp, paiement, annulation. 140€ tout inclus.",
    url: "https://qurbaniya.fr/faq",
  },
};

export default function FAQPage() {
  return (
    <>
      <FAQPageJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://qurbaniya.fr" },
        { name: "FAQ", url: "https://qurbaniya.fr/faq" },
      ]} />
      <Header />
      <main className="pt-24 pb-16 bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4">
          <Breadcrumb items={[
            { label: "FAQ" },
          ]} />
          <div className="text-center mt-4 mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-black leading-tight mb-4">
              FAQ Aïd al-Adha 2026 — <span className="text-gold">sacrifice du mouton en ligne</span>
            </h1>
            <p className="text-text-muted leading-relaxed">
              L&apos;Aïd al-Adha tombe le <strong className="text-text-primary">mercredi 27 mai 2026</strong>. Voici les réponses aux questions les plus posées sur le sacrifice en ligne avec Qurbaniya : conformité à la Sounnah, vidéo nominative WhatsApp, paiement, annulation, distribution de la viande.
            </p>
          </div>
        </div>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
