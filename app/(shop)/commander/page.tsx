import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import OrderForm from "@/components/forms/OrderForm";
import OrderSummary from "@/components/forms/OrderSummary";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Commander mon sacrifice de l'Aïd 2026 | Mouton + Vidéo nominative",
  description:
    "Réservez votre mouton pour l'Aïd al-Adha 2026. Sacrifice conforme à la Sounnah, vidéo nominative par email, viande distribuée aux nécessiteux. 140€ tout inclus.",
  alternates: {
    canonical: "https://qurbaniya.fr/commander",
  },
  openGraph: {
    title: "Commander mon sacrifice de l'Aïd 2026 | Qurbaniya",
    description: "Réservez votre mouton pour l'Aïd al-Adha 2026. Sacrifice conforme, vidéo nominative. 140€.",
    url: "https://qurbaniya.fr/commander",
  },
};

export default function CommanderPage() {
  return (
    <>
      <ProductJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://qurbaniya.fr" },
        { name: "Commander", url: "https://qurbaniya.fr/commander" },
      ]} />
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black uppercase mb-2">
              COMMANDER <span className="text-gold">MON SACRIFICE</span>
            </h1>
            <p className="text-text-muted">
              Remplissez le formulaire ci-dessous. 2 minutes, c&apos;est tout.
            </p>
          </div>

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
        </div>
      </main>
    </>
  );
}
