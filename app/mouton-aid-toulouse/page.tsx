import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.toulouse;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Toulouse — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour les habitants de Toulouse et de Haute-Garonne. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid toulouse",
    "mouton aid 2026 toulouse",
    "sacrifice aid toulouse",
    "mouton aid haute garonne",
    "qurbani toulouse",
    "sacrifice mouton toulouse",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-toulouse",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Toulouse — 140€ tout inclus | Qurbaniya",
    description:
      "Pour les habitants de Toulouse : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-toulouse",
  },
};

export default function MoutonAidToulouse() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Toulouse", url: "https://qurbaniya.fr/mouton-aid-toulouse" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
