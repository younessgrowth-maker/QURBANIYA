import Hero from "@/components/sections/Hero";
import StockGauge from "@/components/ui/StockGauge";
import SocialProofBar from "@/components/sections/SocialProofBar";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowItWorks from "@/components/sections/HowItWorks";
import Sheikh from "@/components/sections/Sheikh";
import Testimonials from "@/components/sections/Testimonials";
import Offer from "@/components/sections/Offer";
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
      <SocialProofBar />
      <Divider />
      <ProblemSolution />
      <Divider />
      <HowItWorks />
      <Divider />
      <Sheikh />
      <Divider />
      <Testimonials />
      <Divider />
      <Offer />
      <Divider />
      <FAQ />
      <CTAFinal />
    </>
  );
}
