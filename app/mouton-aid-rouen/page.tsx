import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.rouen;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Rouen — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour Rouen et sa métropole. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid rouen",
    "mouton aid 2026 rouen",
    "sacrifice aid rouen",
    "mouton aid seine-maritime",
    "qurbani rouen",
    "sacrifice mouton rouen",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-rouen",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Rouen — 140€ tout inclus | Qurbaniya",
    description:
      "Pour Rouen et sa métropole : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-rouen",
  },
};

export default function MoutonAidRouen() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Rouen", url: "https://qurbaniya.fr/mouton-aid-rouen" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
