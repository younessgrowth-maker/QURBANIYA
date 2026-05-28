import LegalPage from "@/components/layout/LegalPage";
import type { Metadata } from "next";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Mentions légales — Qurbaniya",
  description: "Informations légales du site Qurbaniya.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" updatedAt="28 mai 2026">
      <h2>1. Éditeur du site</h2>
      <p>
        Le site <strong>qurbaniya.fr</strong> est édité par la société{" "}
        <strong>{LEGAL.raisonSociale}</strong>, exploitant la marque
        commerciale <strong>{LEGAL.nomCommercial}</strong> :
      </p>
      <ul>
        <li>
          <strong>Raison sociale :</strong> {LEGAL.raisonSociale}
        </li>
        <li>
          <strong>Forme juridique :</strong> {LEGAL.formeJuridique}
        </li>
        <li>
          <strong>Capital social :</strong> {LEGAL.capitalSocial}
        </li>
        <li>
          <strong>Siège social :</strong> {LEGAL.siegeSocial.complet}
        </li>
        <li>
          <strong>RCS :</strong> {LEGAL.rcs}
        </li>
        <li>
          <strong>SIREN :</strong> {LEGAL.sirenFormatte}
        </li>
        <li>
          <strong>SIRET (siège) :</strong> {LEGAL.siret}
        </li>
        <li>
          <strong>Code APE :</strong> {LEGAL.codeApe}
        </li>
        <li>
          <strong>TVA intracommunautaire :</strong> {LEGAL.tvaIntracomFormatte}
        </li>
        <li>
          <strong>{LEGAL.presidentTitre} :</strong> {LEGAL.president}
        </li>
        <li>
          <strong>Email :</strong>{" "}
          <a href={LEGAL.emailMailto}>{LEGAL.email}</a>
        </li>
      </ul>

      <h2>2. Directeur de la publication</h2>
      <p>
        Le directeur de la publication est <strong>{LEGAL.directeurPublication}</strong>,
        en sa qualité de {LEGAL.presidentTitre} de la société {LEGAL.raisonSociale}.
      </p>

      <h2>3. Hébergeur</h2>
      <p>Le site est hébergé par :</p>
      <ul>
        <li>
          <strong>{LEGAL.hebergeur.nom}</strong>
        </li>
        <li>{LEGAL.hebergeur.adresse}</li>
        <li>
          Site :{" "}
          <a
            href={`https://${LEGAL.hebergeur.siteWeb}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LEGAL.hebergeur.siteWeb}
          </a>
        </li>
      </ul>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur le site (textes, images,
        vidéos, logos, éléments graphiques, structure) sont la propriété
        exclusive de {LEGAL.raisonSociale} ou de ses partenaires et sont
        protégés par le droit d&apos;auteur et le droit des marques. La marque{" "}
        <strong>{LEGAL.nomCommercial}</strong> et le logo associé sont la
        propriété exclusive de {LEGAL.raisonSociale}. Toute reproduction,
        représentation, modification ou adaptation, totale ou partielle, sans
        autorisation écrite préalable, est interdite.
      </p>

      <h2>5. Contact</h2>
      <p>
        Pour toute question relative au site ou à son contenu, vous pouvez
        contacter l&apos;équipe à l&apos;adresse{" "}
        <a href={LEGAL.emailMailto}>{LEGAL.email}</a>.
      </p>

      <h2>6. Médiation de la consommation</h2>
      <p>
        Conformément à l&apos;article L.612-1 du Code de la consommation, en cas
        de litige non résolu avec notre service client, le consommateur peut
        recourir gratuitement au service de médiation de la consommation suivant :
      </p>
      <ul>
        <li>
          <strong>{LEGAL.mediateur.nom}</strong>
        </li>
        <li>{LEGAL.mediateur.adresse}</li>
        <li>
          Site :{" "}
          <a
            href={LEGAL.mediateur.siteWeb}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LEGAL.mediateur.siteWeb}
          </a>
        </li>
        <li>
          Déclarer un litige :{" "}
          <a
            href={LEGAL.mediateur.formulaire}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LEGAL.mediateur.formulaire}
          </a>
        </li>
      </ul>
      <p>
        La plateforme européenne de règlement en ligne des litiges est également
        accessible à l&apos;adresse :{" "}
        <a
          href={LEGAL.odrEU}
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
