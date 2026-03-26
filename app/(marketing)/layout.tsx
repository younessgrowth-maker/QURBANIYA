import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Dynamic imports for non-critical UI — reduces initial JS bundle
// These components appear after scroll or with delay, so they don't need to be in the main bundle
const StickyTopBar = dynamic(() => import("@/components/layout/StickyTopBar"), {
  ssr: false,
});
const FloatingCTA = dynamic(() => import("@/components/ui/FloatingCTA"), {
  ssr: false,
});
const SocialProofToast = dynamic(() => import("@/components/ui/SocialProofToast"), {
  ssr: false,
});
const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"), {
  ssr: false,
});
const ExitIntentPopup = dynamic(() => import("@/components/ui/ExitIntentPopup"), {
  ssr: false,
});

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
