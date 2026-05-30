export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Qurbaniya",
    url: "https://qurbaniya.fr",
    logo: "https://qurbaniya.fr/logos/qurbaniya-logo-dark.svg",
    description:
      "Service de sacrifice de l'Aïd al-Adha en ligne, conforme à la Sounnah, avec preuve vidéo nominative.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["French", "Arabic"],
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Seuil minimum d'avis approuvés pour afficher aggregateRating dans le schema.
// Google n'affiche les étoiles dans la SERP qu'à partir de plusieurs avis,
// et un schema avec 1-2 avis a tendance à être ignoré ou pénalisé.
const MIN_REVIEWS_FOR_RATING = 3;

async function fetchAggregateRating(): Promise<{
  ratingValue: number;
  reviewCount: number;
} | null> {
  // Server-only: l'import est dynamique pour éviter de fail en client si
  // Supabase env est manquante (ex: build statique d'une page client par erreur).
  try {
    const { createServiceRoleClient } = await import("@/lib/supabase/server");
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("rating")
      .eq("status", "approved");
    if (error || !data || data.length < MIN_REVIEWS_FOR_RATING) return null;
    const sum = data.reduce(
      (acc: number, r: { rating: number }) => acc + r.rating,
      0
    );
    const ratingValue = Math.round((sum / data.length) * 10) / 10;
    return { ratingValue, reviewCount: data.length };
  } catch {
    return null;
  }
}

export async function ProductJsonLd() {
  // Avis VÉRIFIÉS uniquement (table reviews, status='approved'). Les 3 avis
  // Google sont copiés dans cette table avec attribution dans le UI. Conforme
  // à L.121-4 du Code de la consommation : les avis affichés doivent être
  // réels et vérifiables — c'est le cas ici (Google + formulaire client).
  const aggregate = await fetchAggregateRating();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sacrifice Aïd al-Adha 2026 — Mouton avec vidéo nominative",
    description:
      "Mouton sacrifié en votre nom lors de l'Aïd al-Adha 2026, conforme à la Sounnah. Vidéo nominative envoyée par WhatsApp. Viande distribuée aux nécessiteux.",
    image: "https://qurbaniya.fr/opengraph-image",
    brand: {
      "@type": "Brand",
      name: "Qurbaniya",
    },
    offers: {
      "@type": "Offer",
      url: "https://qurbaniya.fr/commander",
      priceCurrency: "EUR",
      price: "140",
      availability: "https://schema.org/LimitedAvailability",
      validFrom: "2026-01-01",
      // Prolongé jusqu'à la prochaine édition (Aïd 2027) : une date passée
      // fait considérer l'offre comme expirée par Google → perte du rich
      // snippet prix/disponibilité. La fermeture réelle des commandes est
      // gérée applicativement par isOrderingOpen() sur /commander.
      validThrough: "2027-06-30",
      priceValidUntil: "2027-06-30",
    },
  };

  if (aggregate) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregate.ratingValue,
      reviewCount: aggregate.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Le mouton est-il sacrifié en mon nom ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, le mouton est sacrifié au nom que vous choisissez lors de la commande. Votre nom est mentionné dans la vidéo de l'abattage.",
        },
      },
      {
        "@type": "Question",
        name: "Comment savoir si mon sacrifice a bien été effectué ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vous recevez une vidéo nominative du sacrifice par WhatsApp dans les 24h suivant le sacrifice, prouvant que votre sacrifice a bien été réalisé en votre nom.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la date de l'Aïd al-Adha 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'Aïd al-Adha 2026 est prévu pour le 27 mai 2026 du calendrier grégorien, suivi de 3 jours de tachriq les 28, 29 et 30 mai 2026.",
        },
      },
      {
        "@type": "Question",
        name: "Est-ce obligatoire de sacrifier pour l'Aïd ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Selon l'école hanafite, c'est obligatoire (wajib) pour celui qui en a les moyens. Selon les écoles malikite et hanbalite, c'est fortement recommandé (sunnah mu'akkadah). Selon l'école chafiite, c'est une sunnah mu'akkadah.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le prix d'un sacrifice en ligne ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos sacrifices sont disponibles à partir de 140€, soit moitié moins cher qu'un sacrifice en France (350-400€). Le prix inclut le mouton, le sacrifice conforme à la Sounnah, et la vidéo nominative.",
        },
      },
      {
        "@type": "Question",
        name: "Peut-on offrir un sacrifice à un proche ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, vous pouvez commander un sacrifice au nom d'un proche. Lors de la commande, indiquez le nom du bénéficiaire et nous enverrons la vidéo à l'adresse email de votre choix.",
        },
      },
      {
        "@type": "Question",
        name: "Et si je change d'avis ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vous pouvez modifier ou annuler votre commande jusqu'à 7 jours avant l'Aïd pour un remboursement intégral. Après cette date, contactez-nous pour trouver une solution.",
        },
      },
      {
        "@type": "Question",
        name: "Quand vais-je recevoir ma vidéo ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Votre vidéo nominative est envoyée par WhatsApp dans les 24h suivant le sacrifice. Généralement, vous la recevez le jour même.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EventJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Aïd al-Adha 2026 — Sacrifice en ligne avec Qurbaniya",
    startDate: "2026-05-27",
    endDate: "2026-05-30",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: {
      "@type": "VirtualLocation",
      url: "https://qurbaniya.fr",
    },
    description:
      "Réservez votre sacrifice de l'Aïd al-Adha 2026 en ligne. Mouton sacrifié en votre nom avec vidéo nominative.",
    organizer: {
      "@type": "Organization",
      name: "Qurbaniya",
      url: "https://qurbaniya.fr",
    },
    offers: {
      "@type": "Offer",
      url: "https://qurbaniya.fr/commander",
      price: "140",
      priceCurrency: "EUR",
      // Aligné sur ProductJsonLd (LimitedAvailability) — évite des données
      // structurées contradictoires entre les deux schémas pour la même offre.
      availability: "https://schema.org/LimitedAvailability",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Qurbaniya",
    url: "https://qurbaniya.fr",
    description: "Service de sacrifice de l'Aïd al-Adha en ligne avec vidéo nominative",
    inLanguage: "fr-FR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
