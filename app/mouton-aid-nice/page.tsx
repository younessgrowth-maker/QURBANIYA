import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.nice;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Nice — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour les habitants de Nice et de la Côte d'Azur. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid nice",
    "mouton aid 2026 nice",
    "sacrifice aid nice",
    "mouton aid alpes-maritimes",
    "mouton aid cote d'azur",
    "qurbani nice",
    "sacrifice mouton nice",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-nice",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Nice — 140€ tout inclus | Qurbaniya",
    description:
      "Pour les habitants de Nice et la Côte d'Azur : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-nice",
  },
};

export default function MoutonAidNice() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Nice", url: "https://qurbaniya.fr/mouton-aid-nice" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
