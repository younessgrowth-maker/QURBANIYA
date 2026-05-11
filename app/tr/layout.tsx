import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TrLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="tr">
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16">{children}</main>
      <Footer />
    </div>
  );
}
