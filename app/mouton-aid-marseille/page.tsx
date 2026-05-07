import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.marseille;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Marseille — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour les habitants de Marseille et des Bouches-du-Rhône. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid marseille",
    "mouton aid 2026 marseille",
    "sacrifice aid marseille",
    "mouton aid bouches du rhone",
    "qurbani marseille",
    "sacrifice mouton marseille",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-marseille",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Marseille — 140€ tout inclus | Qurbaniya",
    description:
      "Pour les habitants de Marseille : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-marseille",
  },
};

export default function MoutonAidMarseille() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Marseille", url: "https://qurbaniya.fr/mouton-aid-marseille" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
