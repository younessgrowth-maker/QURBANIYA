import { ProductJsonLd, EventJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import StockGauge from "@/components/ui/StockGauge";
import TrustBar from "@/components/ui/TrustBar";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowItWorks from "@/components/sections/HowItWorks";
import Sheikh from "@/components/sections/Sheikh";
import MadagascarVideo from "@/components/sections/MadagascarVideo";
import Testimonials from "@/components/sections/Testimonials";
import RealTestimonials from "@/components/sections/RealTestimonials";
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
      <EventJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://qurbaniya.fr" },
        { name: "Sacrifice Aïd 2026", url: "https://qurbaniya.fr/commander" },
      ]} />
      {/* 1. ACCROCHE — Emotion + CTA principal */}
      <Hero />
      <div className="bg-bg-primary section-padding !py-6 md:!py-8 px-4">
        {/* Note : on a retiré l'ExtraPlacesBanner "+100 places" — message
            contradictoire avec "stock quasi épuisé". On garde uniquement
            la jauge calendaire (StockGauge), le message d'urgence stock
            est porté par la sticky top bar. */}
        <StockGauge />
      </div>

      {/* 2. ENGAGEMENT ÉMOTIONNEL — Impact concret sur les familles
          Déplacé en haut de page : ancrage émotionnel précoce, fait sentir
          au visiteur l'impact humain AVANT les arguments rationnels. */}
      <Divider />
      <ImpactCalculator />

      <TrustBar />

      {/* 3. EMPATHIE — "On comprend votre situation" */}
      <Divider />
      <ProblemSolution />

      {/* 4. PROCESSUS — "C'est simple, 4 étapes" */}
      <Divider />
      <HowItWorks />

      {/* 5. AUTORITÉ — Le cheikh qui supervise */}
      <Divider />
      <Sheikh />

      {/* 5bis. PREUVE TERRAIN — Vidéo collaborateur Madagascar */}
      <Divider />
      <MadagascarVideo />

      {/* 6. PREUVE SOCIALE — Témoignages clients */}
      <Divider />
      <Testimonials />

      {/* 6bis. AVIS RÉELS — Hidden until 3+ approved reviews */}
      <RealTestimonials />

      {/* 7. OFFRE — Le prix, clair et net */}
      <Divider />
      <Offer />

      {/* 8. OBJECTIONS — Pourquoi déléguer plutôt que renoncer */}
      <Divider />
      <ComparisonTable />

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
