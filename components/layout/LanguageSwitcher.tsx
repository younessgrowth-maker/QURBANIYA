"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

type Lang = { code: string; label: string; flag: string; href: string };

const LANGS: Lang[] = [
  { code: "fr", label: "Français", flag: "🇫🇷", href: "/" },
  { code: "en", label: "English", flag: "🇬🇧", href: "/en" },
  { code: "ar", label: "العربية", flag: "🇸🇦", href: "/ar" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", href: "/tr" },
];

export default function LanguageSwitcher({ currentCode = "fr" }: { currentCode?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGS.find((l) => l.code === currentCode) ?? LANGS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-text-muted hover:text-gold transition-colors px-2 py-1.5 rounded-lg"
        aria-label="Sélectionner la langue"
        aria-expanded={open}
      >
        <span className="text-xl leading-none" aria-hidden="true">{current.flag}</span>
        <span className="sr-only">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-bg-primary border border-gray-200 rounded-xl shadow-lg py-2 z-50">
          {LANGS.map((lang) => (
            <Link
              key={lang.code}
              href={lang.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-2 text-sm text-text-primary hover:bg-gold/5 hover:text-gold transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-base leading-none" aria-hidden="true">{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {lang.code === currentCode && <Check size={14} className="text-gold" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
