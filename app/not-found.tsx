import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable — Qurbaniya",
  description: "La page que vous cherchez n'existe pas. Découvrez nos offres de sacrifice pour l'Aïd al-Adha 2026.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-gold/20 mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-black uppercase mb-4 text-text-primary">
          Page <span className="text-gold">introuvable</span>
        </h1>
        <p className="text-text-muted mb-8 leading-relaxed">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
          Découvrez nos offres de sacrifice pour l&apos;Aïd al-Adha 2026.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/commander"
            className="inline-flex items-center justify-center px-6 py-3 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark transition-colors"
          >
            Commander mon sacrifice
          </Link>
        </div>
      </div>
    </div>
  );
}
