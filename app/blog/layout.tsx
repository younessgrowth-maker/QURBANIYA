import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogStickyCta from "@/components/layout/BlogStickyCta";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <BlogStickyCta />
      <main className="min-h-screen bg-bg-primary pt-24 md:pt-24 pb-16 [&>*:first-child]:mt-12 md:[&>*:first-child]:mt-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
