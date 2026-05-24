import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyTopBar from "@/components/layout/StickyTopBar";
import FloatingCTA from "@/components/ui/FloatingCTA";
import SocialProofToast from "@/components/ui/SocialProofToast";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import MobileStickyCTA from "@/components/ui/MobileStickyCTA";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { CURRENT_YEAR } from "@/lib/constants";
import { fetchRecentActivities } from "@/lib/recent-activity";

async function fetchInventorySnapshot(): Promise<{
  remaining: number;
  total: number;
}> {
  try {
    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("inventory")
      .select("total_slots, reserved_slots")
      .eq("year", CURRENT_YEAR)
      .maybeSingle();
    if (!data) return { remaining: 53, total: 200 };
    const total = data.total_slots ?? 200;
    const reserved = data.reserved_slots ?? 0;
    return { remaining: Math.max(0, total - reserved), total };
  } catch {
    return { remaining: 53, total: 200 };
  }
}

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inventory, recentActivities] = await Promise.all([
    fetchInventorySnapshot(),
    fetchRecentActivities(8),
  ]);
  return (
    <>
      <StickyTopBar inventory={inventory} />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
      <SocialProofToast recentActivities={recentActivities} />
      <WhatsAppButton />
      <ExitIntentPopup />
      <MobileStickyCTA />
    </>
  );
}
