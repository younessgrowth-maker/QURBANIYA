import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16">{children}</main>
      <Footer />
    </div>
  );
}
