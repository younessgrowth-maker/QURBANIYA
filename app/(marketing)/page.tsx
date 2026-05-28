import { ProductJsonLd, EventJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/ui/TrustBar";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowItWorks from "@/components/sections/HowItWorks";
import Sheikh from "@/components/sections/Sheikh";
import SheikhAudioMessage from "@/components/sections/SheikhAudioMessage";
import MadagascarVideo from "@/components/sections/MadagascarVideo";
import Testimonials from "@/components/sections/Testimonials";
import GoogleReviews from "@/components/sections/GoogleReviews";
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
      {/* 1. ACCROCHE — Emotion + CTA principal
           Le Hero inclut maintenant le trust strip horizontal compact
           (countdown + 3 garanties + 1 trust stats) juste en dessous.
           On a retiré : ExtraPlacesBanner (contradictoire), InventoryStatus
           (doublon sticky bar), StockGauge (countdown deja dans le strip). */}
      <Hero />

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

      {/* 5a. MESSAGE AUDIO — Le cheikh parle directement à la communauté.
          Audio-only volontairement : la vidéo source avait un fond chroma-key
          (Mecque incrustée) qui risquait d'être perçu comme trompeur par
          l'audience musulmane. Le discours est intact, sous-titres synchros. */}
      <SheikhAudioMessage />

      {/* 5bis. PREUVE TERRAIN — Vidéo collaborateur Madagascar */}
      <Divider />
      <MadagascarVideo />

      {/* 6. PREUVE SOCIALE — Témoignages clients */}
      <Divider />
      <Testimonials />

      {/* 6bis. AVIS GOOGLE — 10 avis 5.0/5 collectés sur GBP J+1 Aïd 2026.
          Affiché en premier (avant les avis internes /avis) car la preuve
          Google a plus de poids social que celle de notre propre formulaire. */}
      <GoogleReviews />

      {/* 6ter. AVIS RÉELS internes — Hidden until 3+ approved reviews
          (formulaire /avis). Complémentaire à Google : on garde la
          collecte interne pour les clients sans compte Google + comme
          back-up si jamais GBP a un souci. */}
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
