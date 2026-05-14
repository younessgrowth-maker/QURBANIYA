import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.montpellier;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Montpellier — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour les habitants de Montpellier et de l'Hérault. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid montpellier",
    "mouton aid 2026 montpellier",
    "sacrifice aid montpellier",
    "mouton aid herault",
    "mouton aid mosson",
    "qurbani montpellier",
    "sacrifice mouton montpellier",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-montpellier",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Montpellier — 140€ tout inclus | Qurbaniya",
    description:
      "Pour les habitants de Montpellier : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-montpellier",
  },
};

export default function MoutonAidMontpellier() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Montpellier", url: "https://qurbaniya.fr/mouton-aid-montpellier" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
