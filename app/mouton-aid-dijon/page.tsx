import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.dijon;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Dijon — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour Dijon Métropole. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid dijon",
    "mouton aid 2026 dijon",
    "sacrifice aid dijon",
    "mouton aid cote-dor",
    "qurbani dijon",
    "sacrifice mouton dijon",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-dijon",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Dijon — 140€ tout inclus | Qurbaniya",
    description:
      "Pour Dijon Métropole : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-dijon",
  },
};

export default function MoutonAidDijon() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Dijon", url: "https://qurbaniya.fr/mouton-aid-dijon" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
