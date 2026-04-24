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

export function ProductJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sacrifice Aïd al-Adha 2026 — Mouton avec vidéo nominative",
    description:
      "Mouton sacrifié en votre nom lors de l'Aïd al-Adha 2026, conforme à la Sounnah. Vidéo nominative envoyée par email. Viande distribuée aux nécessiteux.",
    image: "https://qurbaniya.fr/og-sacrifice-aid-2026.png",
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
      validThrough: "2026-05-27",
      priceValidUntil: "2026-05-27",
    },
    // aggregateRating retiré — les avis clients seront collectés via Google
    // Business Profile. Afficher des avis non vérifiés expose à l'art. L.121-4
    // du Code de la consommation (pratique commerciale trompeuse).
  };

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
      availability: "https://schema.org/InStock",
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
