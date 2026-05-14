import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.strasbourg;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Strasbourg — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour les habitants de Strasbourg et de l'Eurométropole. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid strasbourg",
    "mouton aid 2026 strasbourg",
    "sacrifice aid strasbourg",
    "mouton aid bas-rhin",
    "mouton aid alsace",
    "qurbani strasbourg",
    "sacrifice mouton strasbourg",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-strasbourg",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Strasbourg — 140€ tout inclus | Qurbaniya",
    description:
      "Pour les habitants de Strasbourg et l'Eurométropole : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-strasbourg",
  },
};

export default function MoutonAidStrasbourg() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Strasbourg", url: "https://qurbaniya.fr/mouton-aid-strasbourg" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
