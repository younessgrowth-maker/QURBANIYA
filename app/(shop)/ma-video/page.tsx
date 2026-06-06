import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoFinder from "./VideoFinder";

export const metadata: Metadata = {
  title: "Voir ma vidéo de sacrifice",
  description:
    "Retrouvez votre vidéo nominative de sacrifice pour l'Aïd al-Adha 2026 avec votre email et votre numéro de commande.",
  robots: { index: false, follow: false }, // page privée (donnée perso)
};

export default function MaVideoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2 block font-inter">
              Aïd al-Adha 2026
            </span>
            <h1 className="text-3xl md:text-4xl font-black mb-3">
              Voir ma <span className="text-gold">vidéo nominative</span>
            </h1>
            <p className="text-text-muted leading-relaxed">
              Renseignez l&apos;email utilisé lors de la commande et votre numéro
              de commande pour visionner votre vidéo de sacrifice.
            </p>
          </div>
          <VideoFinder />
        </div>
      </main>
      <Footer />
    </>
  );
}
