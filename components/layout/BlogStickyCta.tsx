"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogStickyCta() {
  return (
    <div
      className="fixed left-0 right-0 z-40 md:hidden"
      style={{ top: "60px" }}
      role="complementary"
      aria-label="Réserver mon mouton pour l'Aïd 2026"
    >
      <Link
        href="/commander"
        className="flex items-center justify-between gap-2 px-4 py-2.5 bg-primary text-white shadow-md active:bg-primary-dark transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <span aria-hidden="true">🐑</span>
          <span>
            Aïd 2026 · <strong className="font-bold">Réserver mon mouton — 140€</strong>
          </span>
        </span>
        <ArrowRight size={18} className="flex-shrink-0" aria-hidden="true" />
      </Link>
    </div>
  );
}
