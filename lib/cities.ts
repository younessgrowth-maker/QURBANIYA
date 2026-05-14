export type CitySlug =
  | "paris"
  | "lyon"
  | "toulouse"
  | "marseille"
  | "lille"
  | "strasbourg"
  | "bordeaux"
  | "nice"
  | "montpellier";

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
  lille: {
    slug: "lille",
    name: "Lille",
    region: "Hauts-de-France (59)",
    population: "235 000",
    agglomeration: "1,06 million",
    intro:
      "Lille et la métropole lilloise — Roubaix, Tourcoing, Wattrelos — abritent l'une des communautés musulmanes les plus enracinées du Nord. À l'approche de l'Aïd al-Adha 2026, des milliers de familles cherchent chaque année une solution conforme et accessible pour accomplir le sacrifice.",
    challenge:
      "Dans la métropole lilloise, l'accès à un abattoir agréé pratiquant l'abattage rituel est très limité, et les bouchers halal de Roubaix, Wazemmes ou Lille-Sud affichent complet plusieurs semaines avant l'Aïd. Le sacrifice à domicile reste strictement interdit en France (art. R214-78 du Code rural). Le sacrifice délégué en ligne offre aux habitants du Nord une alternative simple : commande en 2 minutes, sacrifice nominatif effectué par notre cheikh, vidéo de preuve par WhatsApp le jour de l'Aïd.",
  },
  strasbourg: {
    slug: "strasbourg",
    name: "Strasbourg",
    region: "Grand Est (67)",
    population: "290 000",
    agglomeration: "800 000",
    intro:
      "Strasbourg et l'Eurométropole accueillent une communauté musulmane particulièrement diverse — d'origine turque, maghrébine, comorienne et ouest-africaine. Chaque année à l'Aïd al-Adha, la demande pour un sacrifice conforme dépasse largement les capacités locales d'abattage rituel.",
    challenge:
      "À Strasbourg, les abattoirs agréés pour l'abattage rituel sont peu nombreux dans le Bas-Rhin, et les bouchers halal de Hautepierre, du Neuhof ou de Cronenbourg saturent à l'approche de l'Aïd. Sacrifier soi-même est illégal en France, et faire venir un mouton vivant relève du parcours du combattant. Le sacrifice délégué en ligne permet aux habitants de l'Eurométropole d'accomplir leur udhiyah sans contrainte logistique : un cheikh diplômé s'en occupe, vous recevez la vidéo nominative.",
  },
  bordeaux: {
    slug: "bordeaux",
    name: "Bordeaux",
    region: "Nouvelle-Aquitaine (33)",
    population: "260 000",
    agglomeration: "1,2 million",
    intro:
      "Bordeaux Métropole — incluant Cenon, Lormont, Floirac et Talence — abrite une communauté musulmane en forte croissance. À l'approche de l'Aïd al-Adha 2026, la demande locale pour un sacrifice conforme à la Sounnah dépasse l'offre disponible des bouchers halal et abattoirs agréés.",
    challenge:
      "En Gironde, les abattoirs pratiquant l'abattage rituel sont rares, et les bouchers halal de Saint-Michel, Bacalan ou de la rive droite affichent complet plusieurs semaines avant l'Aïd. Le sacrifice à domicile reste strictement interdit en France (art. R214-78 du Code rural). Le sacrifice délégué en ligne offre aux Bordelais une solution clé en main : commande en 2 minutes, sacrifice effectué en votre nom par notre cheikh, vidéo nominative envoyée par WhatsApp.",
  },
  nice: {
    slug: "nice",
    name: "Nice",
    region: "Provence-Alpes-Côte d'Azur (06)",
    population: "340 000",
    agglomeration: "1 million",
    intro:
      "Nice et la Côte d'Azur abritent une communauté musulmane importante, marquée par une forte diaspora algérienne, tunisienne et comorienne. Chaque année à l'Aïd al-Adha, des milliers de familles niçoises cherchent une solution simple pour accomplir le sacrifice sans gérer la logistique d'un mouton vivant.",
    challenge:
      "Dans les Alpes-Maritimes, l'accès à un abattoir agréé pratiquant l'abattage rituel est très limité, et les bouchers halal des quartiers Pasteur, Ariane ou Les Moulins saturent à l'approche de l'Aïd. Sacrifier soi-même est strictement interdit en France. Le sacrifice délégué en ligne permet aux Niçois d'accomplir leur udhiyah en toute sérénité : commande en 2 minutes, sacrifice nominatif par notre cheikh, vidéo de preuve par WhatsApp.",
  },
  montpellier: {
    slug: "montpellier",
    name: "Montpellier",
    region: "Occitanie (34)",
    population: "300 000",
    agglomeration: "500 000",
    intro:
      "Montpellier, septième commune de France, accueille une communauté musulmane jeune et en croissance, présente notamment dans la Mosson, La Paillade, Petit Bard et Celleneuve. À l'approche de l'Aïd al-Adha 2026, la question du sacrifice conforme et accessible se pose chaque année.",
    challenge:
      "Dans l'Hérault, les abattoirs agréés pour l'abattage rituel sont peu nombreux, et les bouchers halal de la Mosson ou du Petit Bard affichent complet plusieurs semaines avant l'Aïd. Le sacrifice à domicile reste strictement interdit en France (art. R214-78 du Code rural). Le sacrifice délégué en ligne offre aux Montpelliérains une alternative simple et conforme : un cheikh diplômé sacrifie en votre nom, vous recevez la vidéo nominative par WhatsApp le jour même.",
  },
};

export const CITY_SLUGS = Object.keys(CITIES) as CitySlug[];
