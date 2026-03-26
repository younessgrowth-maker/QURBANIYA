import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/sections/FAQ";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur le sacrifice de l'Aïd",
  description:
    "Réponses à toutes vos questions sur le sacrifice de l'Aïd al-Adha en ligne : conformité, vidéo, paiement, annulation. Qurbaniya vous répond.",
  alternates: {
    canonical: "https://qurbaniya.fr/faq",
  },
  openGraph: {
    title: "FAQ — Questions fréquentes sur le sacrifice de l'Aïd | Qurbaniya",
    description: "Réponses à toutes vos questions sur le sacrifice de l'Aïd al-Adha en ligne avec Qurbaniya.",
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
        </div>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
