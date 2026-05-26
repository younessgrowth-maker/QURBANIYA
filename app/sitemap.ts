import type { MetadataRoute } from "next";
import { CITY_SLUGS } from "@/lib/cities";
import { BLOG_ARTICLES_I18N, LOCALES, LOCALE_CONFIG, type Locale } from "@/lib/i18n";

// ─── Allowlist des articles RÉELLEMENT présents par langue ─────────────────
// `BLOG_ARTICLES_I18N` mappe 8 slugs par langue, mais sur disque certaines
// traductions n'existent pas encore (notamment TR — sandbox sub-agent bloqué
// pendant la traduction de PR #115, seul `arefe-gunu-2026` a été commité).
// Sans ce filtre, le sitemap déclare 7 URLs TR qui retournent 404 → Google
// pénalise. On maintient l'allowlist à la main jusqu'à ce que TR soit
// complet, puis on pourra retirer ce garde-fou.
const BLOG_PUBLISHED: Record<Locale, Set<string>> = {
  fr: new Set(Object.keys(BLOG_ARTICLES_I18N)),                          // 8/8 OK
  en: new Set(Object.keys(BLOG_ARTICLES_I18N)),                          // 8/8 OK
  ar: new Set(Object.keys(BLOG_ARTICLES_I18N)),                          // 8/8 OK
  es: new Set(Object.keys(BLOG_ARTICLES_I18N)),                          // 8/8 OK
  tr: new Set(["jour-arafat-2026"]),                                     // 1/8 (PR #115 partielle)
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://qurbaniya.fr";

  // ─── Articles blog FR (slugs canoniques) ───────────────────────────────
  const blogFrEntries = Object.keys(BLOG_ARTICLES_I18N).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ─── Articles blog traduits (EN, AR, TR, ES) ───────────────────────────
  // Filtré sur BLOG_PUBLISHED pour ne pas exposer de 404 dans le sitemap.
  const translatedLocales = LOCALES.filter((l) => l !== "fr");
  const blogTranslatedEntries = translatedLocales.flatMap((locale) =>
    Object.entries(BLOG_ARTICLES_I18N)
      .filter(([canonicalSlug]) => BLOG_PUBLISHED[locale].has(canonicalSlug))
      .map(([, slugs]) => ({
        url: `${baseUrl}${LOCALE_CONFIG[locale].baseUrl}/blog/${slugs[locale]}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      }))
  );

  // ─── Index blog par langue ─────────────────────────────────────────────
  const blogIndexEntries = LOCALES.map((locale) => ({
    url: `${baseUrl}${LOCALE_CONFIG[locale].baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ─── Homepages par langue ──────────────────────────────────────────────
  const localeHomeEntries = translatedLocales.map((locale) => ({
    url: `${baseUrl}${LOCALE_CONFIG[locale].baseUrl}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // ─── Landing pages villes ──────────────────────────────────────────────
  const cityEntries = CITY_SLUGS.map((slug) => ({
    url: `${baseUrl}/mouton-aid-${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/commander`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogIndexEntries,
    ...blogFrEntries,
    ...blogTranslatedEntries,
    ...localeHomeEntries,
    ...cityEntries,
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
