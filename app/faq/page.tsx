import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/sections/FAQ";

export const metadata = {
  title: "FAQ — Qurbaniya",
  description: "Réponses aux questions fréquentes sur le sacrifice avec Qurbaniya.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-bg-primary">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
