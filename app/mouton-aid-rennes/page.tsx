import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.rennes;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Rennes — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour Rennes et sa métropole. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid rennes",
    "mouton aid 2026 rennes",
    "sacrifice aid rennes",
    "mouton aid ille-et-vilaine",
    "qurbani rennes",
    "sacrifice mouton rennes",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-rennes",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Rennes — 140€ tout inclus | Qurbaniya",
    description:
      "Pour Rennes et sa métropole : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-rennes",
  },
};

export default function MoutonAidRennes() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Rennes", url: "https://qurbaniya.fr/mouton-aid-rennes" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
