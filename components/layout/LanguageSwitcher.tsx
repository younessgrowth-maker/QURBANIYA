"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Globe, Check } from "lucide-react";

type Lang = { code: string; label: string; href: string };

const LANGS: Lang[] = [
  { code: "fr", label: "Français", href: "/" },
  { code: "en", label: "English", href: "/en" },
  { code: "ar", label: "العربية", href: "/ar" },
  { code: "tr", label: "Türkçe", href: "/tr" },
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
        className="flex items-center gap-1.5 text-text-muted hover:text-gold transition-colors px-2 py-1.5 rounded-lg text-sm font-medium"
        aria-label="Sélectionner la langue"
        aria-expanded={open}
      >
        <Globe size={16} />
        <span className="hidden md:inline uppercase text-xs">{current.code}</span>
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
              <span>{lang.label}</span>
              {lang.code === currentCode && <Check size={14} className="text-gold" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
