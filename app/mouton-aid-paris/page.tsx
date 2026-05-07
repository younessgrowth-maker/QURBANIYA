import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.paris;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Paris — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour les habitants de Paris et d'Île-de-France. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid paris",
    "mouton aid 2026 paris",
    "sacrifice aid paris",
    "mouton aid ile de france",
    "qurbani paris",
    "sacrifice mouton paris",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-paris",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Paris — 140€ tout inclus | Qurbaniya",
    description:
      "Pour les habitants de Paris : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-paris",
  },
};

export default function MoutonAidParis() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Paris", url: "https://qurbaniya.fr/mouton-aid-paris" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
