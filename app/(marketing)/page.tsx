import Hero from "@/components/sections/Hero";
import StockGauge from "@/components/ui/StockGauge";
import TrustBar from "@/components/ui/TrustBar";
import SocialProofBar from "@/components/sections/SocialProofBar";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowItWorks from "@/components/sections/HowItWorks";
import Sheikh from "@/components/sections/Sheikh";
import ImpactCounters from "@/components/sections/ImpactCounters";
import Testimonials from "@/components/sections/Testimonials";
import ComparisonTable from "@/components/sections/ComparisonTable";
import Offer from "@/components/sections/Offer";
import ImpactCalculator from "@/components/ui/ImpactCalculator";
import CertificatePreview from "@/components/ui/CertificatePreview";
import SacrificeQuiz from "@/components/ui/SacrificeQuiz";
import WhyActNow from "@/components/sections/WhyActNow";
import FAQ from "@/components/sections/FAQ";
import CTAFinal from "@/components/sections/CTAFinal";

function Divider() {
  return <div className="section-divider" />;
}

export default function HomePage() {
  return (
    <>
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
