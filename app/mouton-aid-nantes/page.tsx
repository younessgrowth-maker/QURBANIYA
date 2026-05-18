import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.nantes;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Nantes — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour Nantes Métropole. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid nantes",
    "mouton aid 2026 nantes",
    "sacrifice aid nantes",
    "mouton aid loire-atlantique",
    "qurbani nantes",
    "sacrifice mouton nantes",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-nantes",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Nantes — 140€ tout inclus | Qurbaniya",
    description:
      "Pour Nantes Métropole : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-nantes",
  },
};

export default function MoutonAidNantes() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Nantes", url: "https://qurbaniya.fr/mouton-aid-nantes" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
