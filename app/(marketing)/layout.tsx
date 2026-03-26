import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyTopBar from "@/components/layout/StickyTopBar";
import FloatingCTA from "@/components/ui/FloatingCTA";
import SocialProofToast from "@/components/ui/SocialProofToast";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StickyTopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
      <SocialProofToast />
      <WhatsAppButton />
      <ExitIntentPopup />
    </>
  );
}
