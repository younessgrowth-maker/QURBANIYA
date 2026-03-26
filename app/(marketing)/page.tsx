import Hero from "@/components/sections/Hero";
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
