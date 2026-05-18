import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES["ile-de-france"];

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 en Île-de-France — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour toute l'Île-de-France. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid ile de france",
    "mouton aid 2026 ile de france",
    "sacrifice aid ile de france",
    "mouton aid idf",
    "mouton aid banlieue parisienne",
    "qurbani ile de france",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-ile-de-france",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 en Île-de-France — 140€ tout inclus | Qurbaniya",
    description:
      "Pour toute l'Île-de-France : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-ile-de-france",
  },
};

export default function MoutonAidIleDeFrance() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Île-de-France", url: "https://qurbaniya.fr/mouton-aid-ile-de-france" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
