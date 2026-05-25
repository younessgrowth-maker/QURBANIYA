"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { LOCALES, LOCALE_CONFIG, translatePath, type Locale } from "@/lib/i18n";

// Switcher de langue dans le Header. Préserve la page courante quand
// une traduction existe (article blog mappé via BLOG_ARTICLES_I18N),
// sinon retombe sur la homepage de la langue cible. Plus de redirection
// systématique vers "/{lang}" qui faisait perdre le contexte au visiteur.

export default function LanguageSwitcher({
  currentCode = "fr",
}: {
  currentCode?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Détection automatique de la langue courante depuis le pathname pour
  // que le drapeau du bouton reste juste même si la prop `currentCode`
  // n'est pas passée. Fallback sur la prop.
  const detected: Locale = (() => {
    for (const loc of LOCALES) {
      if (loc === "fr") continue;
      const base = LOCALE_CONFIG[loc].baseUrl;
      if (pathname === base || pathname.startsWith(`${base}/`)) return loc;
    }
    return "fr";
  })();
  const effective: Locale = (currentCode as Locale) || detected;
  const current = LOCALE_CONFIG[effective] ?? LOCALE_CONFIG.fr;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-text-muted hover:text-gold transition-colors px-2 py-1.5 rounded-lg"
        aria-label="Sélectionner la langue"
        aria-expanded={open}
      >
        <span className="text-xl leading-none" aria-hidden="true">
          {current.flag}
        </span>
        <span className="sr-only">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-bg-primary border border-gray-200 rounded-xl shadow-lg py-2 z-50">
          {LOCALES.map((loc) => {
            const cfg = LOCALE_CONFIG[loc];
            const href = translatePath(pathname, loc);
            const isCurrent = loc === effective;
            return (
              <Link
                key={loc}
                href={href}
                hrefLang={cfg.htmlLang}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-2 text-sm text-text-primary hover:bg-gold/5 hover:text-gold transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none" aria-hidden="true">
                    {cfg.flag}
                  </span>
                  <span dir={cfg.dir}>{cfg.label}</span>
                </span>
                {isCurrent && <Check size={14} className="text-gold" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
