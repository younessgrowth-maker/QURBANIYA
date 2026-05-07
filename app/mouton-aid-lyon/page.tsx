import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.lyon;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Lyon — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour les habitants de Lyon et de la métropole lyonnaise. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid lyon",
    "mouton aid 2026 lyon",
    "sacrifice aid lyon",
    "mouton aid rhone",
    "qurbani lyon",
    "sacrifice mouton lyon",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-lyon",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Lyon — 140€ tout inclus | Qurbaniya",
    description:
      "Pour les habitants de Lyon : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-lyon",
  },
};

export default function MoutonAidLyon() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Lyon", url: "https://qurbaniya.fr/mouton-aid-lyon" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
