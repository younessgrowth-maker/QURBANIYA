// ─── i18n config — articles blog multilingues ─────────────────────────────
// Mai 2026 : on étend le blog FR vers EN / AR / TR / ES pour capter du
// trafic SEO international (Aïd al-Adha = recherche mondiale).
//
// Architecture choisie : 1 dossier par langue (app/en/blog/, app/ar/blog/,
// etc.) avec 1 fichier statique par article. Pas de [lang] dynamique pour
// rester cohérent avec le pattern existant et garder du SSG.
//
// Chaque article a un slug SEO-optimisé par langue (pas une transliteration
// littérale, mais ce que les locuteurs natifs taperaient sur Google).

export const LOCALES = ["fr", "en", "ar", "tr", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export interface LocaleConfig {
  code: Locale;
  label: string;          // Nom natif de la langue
  flag: string;           // Emoji drapeau pour le switcher
  dir: "ltr" | "rtl";     // Direction d'écriture
  htmlLang: string;       // Attribut lang HTML standard
  baseUrl: string;        // Préfixe d'URL pour cette langue (sans trailing slash)
}

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
  fr: { code: "fr", label: "Français",  flag: "🇫🇷", dir: "ltr", htmlLang: "fr-FR", baseUrl: ""    },
  en: { code: "en", label: "English",   flag: "🇬🇧", dir: "ltr", htmlLang: "en",    baseUrl: "/en" },
  ar: { code: "ar", label: "العربية",   flag: "🇸🇦", dir: "rtl", htmlLang: "ar",    baseUrl: "/ar" },
  tr: { code: "tr", label: "Türkçe",    flag: "🇹🇷", dir: "ltr", htmlLang: "tr",    baseUrl: "/tr" },
  es: { code: "es", label: "Español",   flag: "🇪🇸", dir: "ltr", htmlLang: "es",    baseUrl: "/es" },
};

// ─── Mapping des slugs blog par langue ─────────────────────────────────────
// On ne fait PAS une transliteration littérale : chaque slug est optimisé
// pour la requête SEO la plus tapée dans la langue cible.
//
// La clé est le slug FR (canonical). Les valeurs sont les slugs locaux.

export interface BlogArticleI18n {
  fr: string;
  en: string;
  ar: string;
  tr: string;
  es: string;
}

export const BLOG_ARTICLES_I18N: Record<string, BlogArticleI18n> = {
  "jour-arafat-2026": {
    fr: "jour-arafat-2026",
    en: "day-of-arafah-2026",
    ar: "yawm-arafah-2026",
    tr: "arefe-gunu-2026",
    es: "dia-de-arafah-2026",
  },
  "date-aid-al-adha-2026": {
    fr: "date-aid-al-adha-2026",
    en: "eid-al-adha-2026-date",
    ar: "tarikh-eid-al-adha-2026",
    tr: "kurban-bayrami-2026-tarihi",
    es: "fecha-eid-al-adha-2026",
  },
  "sacrifice-aid-en-ligne-comment-ca-marche": {
    fr: "sacrifice-aid-en-ligne-comment-ca-marche",
    en: "online-qurbani-how-it-works",
    ar: "qurbani-online-kayfa-yaamal",
    tr: "online-kurban-nasil-yapilir",
    es: "qurbani-online-como-funciona",
  },
  "prix-mouton-france-2026": {
    fr: "prix-mouton-france-2026",
    en: "sheep-price-france-2026",
    ar: "siar-al-kharuf-fransa-2026",
    tr: "fransa-koyun-fiyati-2026",
    es: "precio-cordero-francia-2026",
  },
  "combien-coute-mouton-aid-2026-france": {
    fr: "combien-coute-mouton-aid-2026-france",
    en: "how-much-eid-sheep-2026-france",
    ar: "thaman-kharuf-eid-2026-fransa",
    tr: "kurban-koyunu-fiyati-2026-fransa",
    es: "cuanto-cuesta-cordero-eid-2026-francia",
  },
  "tabaski-2026-france": {
    fr: "tabaski-2026-france",
    en: "tabaski-2026-france",
    ar: "tabaski-2026-fransa",
    tr: "tabaski-2026-fransa",
    es: "tabaski-2026-francia",
  },
  "aid-al-adha-2026-dans-combien-de-jours": {
    fr: "aid-al-adha-2026-dans-combien-de-jours",
    en: "eid-al-adha-2026-countdown",
    ar: "eid-al-adha-2026-aad-tanazuli",
    tr: "kurban-bayrami-2026-geri-sayim",
    es: "eid-al-adha-2026-cuenta-regresiva",
  },
  "reserver-mouton-aid-derniere-minute-2026": {
    fr: "reserver-mouton-aid-derniere-minute-2026",
    en: "last-minute-eid-sheep-booking-2026",
    ar: "hajz-kharuf-eid-akhir-lahza-2026",
    tr: "son-dakika-kurban-rezervasyonu-2026",
    es: "reserva-ultima-hora-cordero-eid-2026",
  },
};

// ─── Helper : URL absolue d'un article dans une langue donnée ─────────────
export function blogArticleUrl(canonicalSlug: string, locale: Locale): string {
  const base = "https://qurbaniya.fr";
  const slugs = BLOG_ARTICLES_I18N[canonicalSlug];
  if (!slugs) {
    // Article sans traduction encore : fallback sur FR
    return `${base}/blog/${canonicalSlug}`;
  }
  const config = LOCALE_CONFIG[locale];
  const slug = slugs[locale];
  return `${base}${config.baseUrl}/blog/${slug}`;
}

// ─── Helper : objet `alternates.languages` pour Next Metadata ─────────────
// À utiliser dans `metadata.alternates.languages` pour générer les hreflang.
export function blogHreflangAlternates(canonicalSlug: string): Record<string, string> {
  const slugs = BLOG_ARTICLES_I18N[canonicalSlug];
  if (!slugs) return {};
  return {
    "fr-FR": blogArticleUrl(canonicalSlug, "fr"),
    en:      blogArticleUrl(canonicalSlug, "en"),
    ar:      blogArticleUrl(canonicalSlug, "ar"),
    tr:      blogArticleUrl(canonicalSlug, "tr"),
    es:      blogArticleUrl(canonicalSlug, "es"),
    "x-default": blogArticleUrl(canonicalSlug, "fr"),
  };
}
