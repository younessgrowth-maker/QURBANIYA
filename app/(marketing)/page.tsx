import dynamic from "next/dynamic";
import { ProductJsonLd, FAQPageJsonLd, EventJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

// Critical above-fold components — loaded immediately
import Hero from "@/components/sections/Hero";
import StockGauge from "@/components/ui/StockGauge";
import TrustBar from "@/components/ui/TrustBar";
import SocialProofBar from "@/components/sections/SocialProofBar";

// Below-fold components — lazy loaded to reduce initial bundle size
const ProblemSolution = dynamic(() => import("@/components/sections/ProblemSolution"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const Sheikh = dynamic(() => import("@/components/sections/Sheikh"));
const ImpactCounters = dynamic(() => import("@/components/sections/ImpactCounters"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const ComparisonTable = dynamic(() => import("@/components/sections/ComparisonTable"));
const Offer = dynamic(() => import("@/components/sections/Offer"));
const ImpactCalculator = dynamic(() => import("@/components/ui/ImpactCalculator"));
const CertificatePreview = dynamic(() => import("@/components/ui/CertificatePreview"));
const SacrificeQuiz = dynamic(() => import("@/components/ui/SacrificeQuiz"));
const WhyActNow = dynamic(() => import("@/components/sections/WhyActNow"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const CTAFinal = dynamic(() => import("@/components/sections/CTAFinal"));

function Divider() {
  return <div className="section-divider" />;
}

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
      <Hero />
      <div className="bg-bg-primary section-padding !py-6 md:!py-8">
        <StockGauge />
      </div>
      <TrustBar />
      <SocialProofBar />
      <Divider />
      <ProblemSolution />
      <Divider />
      <ComparisonTable />
      <Divider />
      <HowItWorks />
      <Divider />
      <Sheikh />
      <Divider />
      <ImpactCounters />
      <Divider />
      <Testimonials />
      <Divider />
      <ImpactCalculator />
      <Divider />
      <Offer />
      <Divider />
      <CertificatePreview />
      <Divider />
      <SacrificeQuiz />
      <Divider />
      <WhyActNow />
      <Divider />
      <FAQ />
      <CTAFinal />
    </>
  );
}
