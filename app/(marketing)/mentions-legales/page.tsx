import LegalPage from "@/components/layout/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Qurbaniya",
  description: "Informations légales du site Qurbaniya.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" updatedAt="22 avril 2026">
      <h2>1. Éditeur du site</h2>
      <p>
        Le site <strong>qurbaniya.fr</strong> est édité par :
      </p>
      <ul>
        <li>
          <strong>Raison sociale :</strong> [À COMPLÉTER : nom légal de la SAS]
        </li>
        <li>
          <strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)
        </li>
        <li>
          <strong>Capital social :</strong> [À COMPLÉTER : montant en euros]
        </li>
        <li>
          <strong>Siège social :</strong> [À COMPLÉTER : adresse complète du siège]
        </li>
        <li>
          <strong>RCS :</strong> [À COMPLÉTER : ville d&apos;immatriculation et numéro]
        </li>
        <li>
          <strong>SIRET :</strong> [À COMPLÉTER : numéro SIRET]
        </li>
        <li>
          <strong>TVA intracommunautaire :</strong> [À COMPLÉTER : numéro si applicable]
        </li>
        <li>
          <strong>Président :</strong> [À COMPLÉTER : nom du président / dirigeant]
        </li>
        <li>
          <strong>Email :</strong>{" "}
          <a href="mailto:support@qurbaniya.fr">support@qurbaniya.fr</a>
        </li>
      </ul>

      <h2>2. Directeur de la publication</h2>
      <p>
        Le directeur de la publication est [À COMPLÉTER : nom], en qualité de
        président de la société éditrice.
      </p>

      <h2>3. Hébergeur</h2>
      <p>Le site est hébergé par :</p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong>
        </li>
        <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
        <li>
          Site :{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
        </li>
      </ul>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur le site (textes, images,
        vidéos, logos, éléments graphiques, structure) sont la propriété
        exclusive de Qurbaniya ou de ses partenaires et sont protégés par le
        droit d&apos;auteur et le droit des marques. Toute reproduction,
        représentation, modification ou adaptation, totale ou partielle, sans
        autorisation écrite préalable, est interdite.
      </p>

      <h2>5. Contact</h2>
      <p>
        Pour toute question relative au site ou à son contenu, vous pouvez
        contacter l&apos;équipe à l&apos;adresse{" "}
        <a href="mailto:support@qurbaniya.fr">support@qurbaniya.fr</a>.
      </p>

      <h2>6. Médiation de la consommation</h2>
      <p>
        Conformément à l&apos;article L.612-1 du Code de la consommation, en cas
        de litige non résolu avec notre service client, le consommateur peut
        recourir gratuitement au service de médiation de la consommation :
      </p>
      <ul>
        <li>[À COMPLÉTER : nom et coordonnées du médiateur de la consommation]</li>
      </ul>
      <p>
        La plateforme européenne de règlement en ligne des litiges est également
        accessible à l&apos;adresse :{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>
    </LegalPage>
  );
}
