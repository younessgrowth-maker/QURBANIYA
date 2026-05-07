export type CitySlug = "paris" | "lyon" | "toulouse" | "marseille";

export type City = {
  slug: CitySlug;
  name: string;
  region: string;
  population: string;
  agglomeration: string;
  intro: string;
  challenge: string;
};

export const CITIES: Record<CitySlug, City> = {
  paris: {
    slug: "paris",
    name: "Paris",
    region: "Île-de-France (75)",
    population: "2,1 millions",
    agglomeration: "12 millions",
    intro:
      "Paris et son agglomération concentrent l'une des communautés musulmanes les plus importantes d'Europe. Chaque année à l'approche de l'Aïd al-Adha, des milliers de familles parisiennes cherchent une solution simple et conforme pour accomplir le sacrifice.",
    challenge:
      "À Paris, l'accès à un abattoir agréé pratiquant l'abattage rituel reste limité, et les bouchers halal de confiance affichent complet plusieurs semaines avant l'Aïd. Le sacrifice à domicile est strictement interdit en France (art. R214-78 du Code rural). C'est précisément pour ça qu'un service de sacrifice délégué en ligne est devenu la solution la plus pratique pour les Parisiens.",
  },
  lyon: {
    slug: "lyon",
    name: "Lyon",
    region: "Auvergne-Rhône-Alpes (69)",
    population: "520 000",
    agglomeration: "1,4 million",
    intro:
      "Lyon, deuxième aire urbaine de France, abrite une communauté musulmane dynamique répartie entre la ville et son agglomération. À l'approche de l'Aïd al-Adha 2026, la demande pour un sacrifice conforme à la Sounnah explose, et les solutions locales ne suffisent pas toujours.",
    challenge:
      "À Lyon, comme dans toute la métropole, sacrifier soi-même est illégal hors abattoir agréé. Les bouchers halal de la Croix-Rousse, de Vaulx-en-Velin ou de Villeurbanne sont saturés à l'approche de l'Aïd. Le sacrifice délégué en ligne permet de contourner cette friction : commande en 2 minutes, sacrifice effectué en votre nom, vidéo nominative envoyée par WhatsApp.",
  },
  toulouse: {
    slug: "toulouse",
    name: "Toulouse",
    region: "Occitanie (31)",
    population: "490 000",
    agglomeration: "1 million",
    intro:
      "Toulouse, ville rose et quatrième commune de France, accueille une communauté musulmane forte et active. À l'approche de l'Aïd al-Adha 2026, la question revient chaque année : où trouver un sacrifice conforme, sans devoir gérer la logistique d'un mouton vivant ?",
    challenge:
      "À Toulouse, comme partout en France, le sacrifice à domicile est strictement interdit (art. R214-78 du Code rural). Les abattoirs agréés pour l'abattage rituel sont peu nombreux, et les bouchers halal du Mirail, d'Empalot ou de la Reynerie affichent rapidement complet. Le sacrifice délégué en ligne offre une alternative simple et conforme à la Sounnah, sans déplacement ni stockage.",
  },
  marseille: {
    slug: "marseille",
    name: "Marseille",
    region: "Provence-Alpes-Côte d'Azur (13)",
    population: "870 000",
    agglomeration: "1,9 million",
    intro:
      "Marseille, deuxième ville de France, abrite l'une des plus fortes proportions de citoyens de tradition musulmane du pays. Chaque année, des dizaines de milliers de familles marseillaises accomplissent le sacrifice de l'Aïd al-Adha, et la demande locale dépasse largement l'offre disponible.",
    challenge:
      "À Marseille, la pression sur les abattoirs agréés et les bouchers halal est particulièrement forte à l'approche de l'Aïd. Les commandes saturent rapidement dans les arrondissements nord, et sacrifier soi-même reste illégal en France. Le sacrifice délégué en ligne supprime cette contrainte : un cheikh diplômé sacrifie en votre nom, vous recevez la vidéo nominative, et la viande est distribuée aux familles dans le besoin.",
  },
};

export const CITY_SLUGS = Object.keys(CITIES) as CitySlug[];
