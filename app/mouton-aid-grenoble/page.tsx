import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.grenoble;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Grenoble — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour Grenoble et son agglomération. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid grenoble",
    "mouton aid 2026 grenoble",
    "sacrifice aid grenoble",
    "mouton aid isere",
    "qurbani grenoble",
    "sacrifice mouton grenoble",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-grenoble",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Grenoble — 140€ tout inclus | Qurbaniya",
    description:
      "Pour Grenoble et son agglomération : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-grenoble",
  },
};

export default function MoutonAidGrenoble() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Grenoble", url: "https://qurbaniya.fr/mouton-aid-grenoble" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
