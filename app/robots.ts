import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/login", "/mes-commandes"],
      },
    ],
    sitemap: "https://qurbaniya.fr/sitemap.xml",
  };
}
