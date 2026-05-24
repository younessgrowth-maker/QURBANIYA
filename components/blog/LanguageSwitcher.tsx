import Link from "next/link";
import { LOCALE_CONFIG, LOCALES, blogArticleUrl, type Locale } from "@/lib/i18n";

// Affiche un sélecteur de langue compact en haut/bas des articles blog
// pour que les utilisateurs (et Google) sachent que des versions traduites
// existent. Les hreflang dans <head> font le job côté SEO ; ce composant
// fait le job côté UX humaine.
//
// canonicalSlug = slug FR de l'article (clé dans BLOG_ARTICLES_I18N).
// currentLocale = langue affichée actuellement (sera mise en évidence).

interface LanguageSwitcherProps {
  canonicalSlug: string;
  currentLocale: Locale;
  className?: string;
}

export default function LanguageSwitcher({
  canonicalSlug,
  currentLocale,
  className = "",
}: LanguageSwitcherProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 text-xs font-inter ${className}`}
      role="navigation"
      aria-label="Available languages"
    >
      <span className="text-text-muted-light uppercase tracking-wider mr-1">
        Lire dans :
      </span>
      {LOCALES.map((locale) => {
        const cfg = LOCALE_CONFIG[locale];
        const isCurrent = locale === currentLocale;
        const href = blogArticleUrl(canonicalSlug, locale);
        const display = `${cfg.flag} ${cfg.label}`;

        if (isCurrent) {
          return (
            <span
              key={locale}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/15 text-gold font-semibold border border-gold/30"
              aria-current="page"
              dir={cfg.dir}
            >
              {display}
            </span>
          );
        }

        return (
          <Link
            key={locale}
            href={href.replace("https://qurbaniya.fr", "")}
            hrefLang={cfg.htmlLang}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 text-text-muted hover:text-text-primary hover:border-gold/40 transition-colors"
            dir={cfg.dir}
          >
            {display}
          </Link>
        );
      })}
    </div>
  );
}
