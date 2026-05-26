import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // On disallow /admin (même si redirect 307 vers login) pour ne pas
        // exposer l'existence de la route dans les crawls. Idem /confirmation
        // (pages stateful via query string, pas de valeur SEO).
        disallow: ["/api/", "/login", "/mes-commandes", "/admin", "/confirmation", "/auth/"],
      },
    ],
    sitemap: "https://qurbaniya.fr/sitemap.xml",
  };
}
