import type { MetadataRoute } from "next";
import { CITY_SLUGS } from "@/lib/cities";
import { BLOG_ARTICLES_I18N, LOCALES, LOCALE_CONFIG } from "@/lib/i18n";

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
  const translatedLocales = LOCALES.filter((l) => l !== "fr");
  const blogTranslatedEntries = translatedLocales.flatMap((locale) =>
    Object.values(BLOG_ARTICLES_I18N).map((slugs) => ({
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
