import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.bordeaux;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Bordeaux — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour les habitants de Bordeaux Métropole — Cenon, Lormont, Talence. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid bordeaux",
    "mouton aid 2026 bordeaux",
    "sacrifice aid bordeaux",
    "mouton aid gironde",
    "mouton aid cenon",
    "qurbani bordeaux",
    "sacrifice mouton bordeaux",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-bordeaux",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Bordeaux — 140€ tout inclus | Qurbaniya",
    description:
      "Pour les habitants de Bordeaux Métropole : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-bordeaux",
  },
};

export default function MoutonAidBordeaux() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Bordeaux", url: "https://qurbaniya.fr/mouton-aid-bordeaux" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
