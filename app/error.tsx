"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl md:text-3xl font-black uppercase mb-4 text-text-primary">
          Une <span className="text-gold">erreur</span> est survenue
        </h1>
        <p className="text-text-muted mb-8 leading-relaxed">
          Quelque chose s&apos;est mal passé. Réessayez ou revenez à l&apos;accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
