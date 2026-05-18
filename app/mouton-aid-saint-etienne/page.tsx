import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES["saint-etienne"];

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Saint-Étienne — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour Saint-Étienne et sa métropole. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid saint-etienne",
    "mouton aid 2026 saint-etienne",
    "sacrifice aid saint-etienne",
    "mouton aid loire",
    "qurbani saint-etienne",
    "sacrifice mouton saint-etienne",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-saint-etienne",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Saint-Étienne — 140€ tout inclus | Qurbaniya",
    description:
      "Pour Saint-Étienne et sa métropole : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-saint-etienne",
  },
};

export default function MoutonAidSaintEtienne() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Saint-Étienne", url: "https://qurbaniya.fr/mouton-aid-saint-etienne" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
