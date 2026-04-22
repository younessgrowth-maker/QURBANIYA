import LegalPage from "@/components/layout/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Qurbaniya",
  description:
    "Comment Qurbaniya collecte, utilise et protège vos données personnelles conformément au RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      updatedAt="22 avril 2026"
    >
      <p>
        La présente politique de confidentialité décrit la manière dont
        Qurbaniya collecte, utilise et protège les données personnelles des
        utilisateurs du site <strong>qurbaniya.fr</strong>, conformément au
        Règlement Général sur la Protection des Données (RGPD) et à la loi
        Informatique et Libertés.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est [À COMPLÉTER : raison
        sociale], société éditrice de qurbaniya.fr, dont les coordonnées
        figurent dans les{" "}
        <a href="/mentions-legales">Mentions légales</a>.
      </p>
      <p>
        Contact dédié à la protection des données :{" "}
        <a href="mailto:support@qurbaniya.fr">support@qurbaniya.fr</a>.
      </p>

      <h2>2. Données collectées</h2>
      <p>Lors de la passation d&apos;une commande, nous collectons :</p>
      <ul>
        <li>
          <strong>Identité :</strong> prénom, nom, intention (niyyah, nom au
          nom duquel le sacrifice est accompli) ;
        </li>
        <li>
          <strong>Contact :</strong> adresse email, numéro de téléphone
          (facultatif) ;
        </li>
        <li>
          <strong>Transaction :</strong> identifiant de session Stripe, moyen
          de paiement, statut de paiement, montant (les informations bancaires
          complètes ne transitent jamais par nos serveurs — elles sont gérées
          directement par Stripe) ;
        </li>
        <li>
          <strong>Techniques :</strong> données de navigation anonymisées
          (pages consultées, événements d&apos;interaction) à des fins de
          statistiques d&apos;audience.
        </li>
      </ul>

      <h2>3. Finalités du traitement</h2>
      <p>Vos données sont utilisées pour :</p>
      <ul>
        <li>exécuter la commande de sacrifice (essentielle) ;</li>
        <li>
          vous envoyer la preuve vidéo du sacrifice et les confirmations par
          email ;
        </li>
        <li>
          répondre à vos demandes de support (questions, réclamations) ;
        </li>
        <li>
          produire des statistiques d&apos;audience anonymisées pour améliorer
          le site ;
        </li>
        <li>
          respecter nos obligations légales et comptables.
        </li>
      </ul>

      <h2>4. Base légale</h2>
      <ul>
        <li>
          <strong>Exécution du contrat</strong> pour tout ce qui concerne le
          traitement de la commande ;
        </li>
        <li>
          <strong>Obligation légale</strong> pour la conservation des
          justificatifs comptables ;
        </li>
        <li>
          <strong>Intérêt légitime</strong> pour les statistiques
          d&apos;audience anonymisées.
        </li>
      </ul>

      <h2>5. Durée de conservation</h2>
      <ul>
        <li>
          <strong>Données de commande :</strong> 10 ans à compter de la
          transaction (obligation comptable française) ;
        </li>
        <li>
          <strong>Preuve vidéo :</strong> conservée pendant 12 mois maximum
          après l&apos;envoi au Client, puis supprimée ;
        </li>
        <li>
          <strong>Données de navigation anonymisées :</strong> 13 mois
          maximum.
        </li>
      </ul>

      <h2>6. Destinataires des données</h2>
      <p>
        Vos données sont accessibles uniquement aux équipes internes de
        Qurbaniya habilitées et à nos sous-traitants techniques, dans la
        stricte limite nécessaire à l&apos;exécution du service :
      </p>
      <ul>
        <li>
          <strong>Stripe</strong> (paiement) — Stripe Payments Europe Ltd,
          Irlande ;
        </li>
        <li>
          <strong>Supabase</strong> (base de données) — Supabase Inc.,
          États-Unis (transferts encadrés par des clauses contractuelles
          types) ;
        </li>
        <li>
          <strong>Resend</strong> (envoi d&apos;emails transactionnels) —
          Resend Inc., États-Unis ;
        </li>
        <li>
          <strong>Vercel</strong> (hébergement) — Vercel Inc., États-Unis.
        </li>
      </ul>
      <p>
        Nous ne vendons, ne louons et ne cédons aucune donnée personnelle à
        des tiers à des fins commerciales.
      </p>

      <h2>7. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez des droits suivants sur vos
        données personnelles :
      </p>
      <ul>
        <li>droit d&apos;accès et de copie ;</li>
        <li>droit de rectification ;</li>
        <li>droit à l&apos;effacement (« droit à l&apos;oubli ») ;</li>
        <li>droit à la limitation du traitement ;</li>
        <li>droit à la portabilité ;</li>
        <li>droit d&apos;opposition.</li>
      </ul>
      <p>
        Pour exercer l&apos;un de ces droits, adressez votre demande à{" "}
        <a href="mailto:support@qurbaniya.fr">support@qurbaniya.fr</a> en
        précisant votre identité. Nous y répondrons dans un délai maximal
        d&apos;un mois.
      </p>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez
        introduire une réclamation auprès de la CNIL :{" "}
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.cnil.fr
        </a>
        .
      </p>

      <h2>8. Cookies</h2>
      <p>
        Le site utilise des cookies strictement nécessaires à son
        fonctionnement (session, préférences) et, le cas échéant, des cookies
        de mesure d&apos;audience anonymisée. Aucun cookie publicitaire ou de
        profilage n&apos;est déposé sans votre consentement.
      </p>
      <p>
        Vous pouvez configurer votre navigateur pour refuser les cookies ou
        être alerté lors de leur dépôt.
      </p>

      <h2>9. Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles
        appropriées pour protéger vos données contre toute altération, perte,
        divulgation ou accès non autorisé : chiffrement HTTPS, accès restreint
        aux bases de données, journalisation des accès.
      </p>

      <h2>10. Évolution de la politique</h2>
      <p>
        La présente politique peut être modifiée pour refléter des évolutions
        réglementaires ou techniques. La version en vigueur est toujours celle
        publiée sur cette page, avec la date de dernière mise à jour indiquée
        en tête de document.
      </p>
    </LegalPage>
  );
}
