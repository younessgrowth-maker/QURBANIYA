import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.mulhouse;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Mulhouse — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour Mulhouse et son agglomération. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid mulhouse",
    "mouton aid 2026 mulhouse",
    "sacrifice aid mulhouse",
    "mouton aid haut-rhin",
    "qurbani mulhouse",
    "sacrifice mouton mulhouse",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-mulhouse",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Mulhouse — 140€ tout inclus | Qurbaniya",
    description:
      "Pour Mulhouse et son agglomération : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-mulhouse",
  },
};

export default function MoutonAidMulhouse() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Mulhouse", url: "https://qurbaniya.fr/mouton-aid-mulhouse" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
