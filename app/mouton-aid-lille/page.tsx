import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.lille;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Lille — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour les habitants de Lille, Roubaix, Tourcoing et la métropole lilloise. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid lille",
    "mouton aid 2026 lille",
    "sacrifice aid lille",
    "mouton aid roubaix",
    "mouton aid tourcoing",
    "mouton aid nord",
    "qurbani lille",
    "sacrifice mouton lille",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-lille",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Lille — 140€ tout inclus | Qurbaniya",
    description:
      "Pour les habitants de Lille et la métropole lilloise : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-lille",
  },
};

export default function MoutonAidLille() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Lille", url: "https://qurbaniya.fr/mouton-aid-lille" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
