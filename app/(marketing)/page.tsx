import { ProductJsonLd, FAQPageJsonLd, EventJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import StockGauge from "@/components/ui/StockGauge";
import TrustBar from "@/components/ui/TrustBar";
// import SocialProofBar from "@/components/sections/SocialProofBar";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowItWorks from "@/components/sections/HowItWorks";
import Sheikh from "@/components/sections/Sheikh";
import ImpactCounters from "@/components/sections/ImpactCounters";
import Testimonials from "@/components/sections/Testimonials";
import ComparisonTable from "@/components/sections/ComparisonTable";
import Offer from "@/components/sections/Offer";
import ImpactCalculator from "@/components/ui/ImpactCalculator";
import CertificatePreview from "@/components/ui/CertificatePreview";
// import SacrificeQuiz from "@/components/ui/SacrificeQuiz";
import WhyActNow from "@/components/sections/WhyActNow";
import FAQ from "@/components/sections/FAQ";
import CTAFinal from "@/components/sections/CTAFinal";

function Divider() {
  return <div className="section-divider" />;
}

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <ProductJsonLd />
      <FAQPageJsonLd />
      <EventJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://qurbaniya.fr" },
        { name: "Sacrifice Aïd 2026", url: "https://qurbaniya.fr/commander" },
      ]} />
      {/* 1. ACCROCHE — Emotion + CTA principal */}
      <Hero />
      <div className="bg-bg-primary section-padding !py-6 md:!py-8">
        <StockGauge />
      </div>
      <TrustBar />

      {/* 2. EMPATHIE — "On comprend votre situation" */}
      <Divider />
      <ProblemSolution />

      {/* 3. PROCESSUS — "C'est simple, 4 étapes" */}
      <Divider />
      <HowItWorks />

      {/* 4. AUTORITÉ — Le cheikh qui supervise */}
      <Divider />
      <Sheikh />

      {/* 5. PREUVE SOCIALE — Témoignages clients */}
      <Divider />
      <Testimonials />

      {/* 6. ENGAGEMENT — Calculez votre impact (interactif) */}
      <Divider />
      <ImpactCalculator />

      {/* 7. OFFRE — Le prix, clair et net */}
      <Divider />
      <Offer />

      {/* 8. OBJECTIONS — Pourquoi déléguer plutôt que renoncer */}
      <Divider />
      <ComparisonTable />

      {/* 9. IMPACT GLOBAL — Chiffres concrets */}
      <Divider />
      <ImpactCounters />

      {/* 10. CERTIFICAT — Preuve de sérieux */}
      <Divider />
      <CertificatePreview />

      {/* 11. FAQ — Dernières questions */}
      <Divider />
      <FAQ />

      {/* 12. URGENCE — Stock limité, date qui approche */}
      <Divider />
      <WhyActNow />

      {/* 13. CTA FINAL — Dernière chance */}
      <CTAFinal />
    </>
  );
}
