import LegalPage from "@/components/layout/LegalPage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — Qurbaniya",
  description:
    "Conditions générales de vente et de service applicables aux commandes de sacrifice sur qurbaniya.fr.",
};

export default function CGVPage() {
  return (
    <LegalPage title="Conditions Générales de Vente" updatedAt="22 avril 2026">
      <p>
        Les présentes Conditions Générales de Vente (ci-après « CGV »)
        s&apos;appliquent à toute commande passée sur le site{" "}
        <strong>qurbaniya.fr</strong>, exploité par [À COMPLÉTER : raison
        sociale], société par actions simplifiée au capital de [À COMPLÉTER],
        dont le siège est situé [À COMPLÉTER : adresse], immatriculée au RCS de
        [À COMPLÉTER : ville et numéro] (ci-après « Qurbaniya »).
      </p>

      <h2>1. Objet</h2>
      <p>
        Qurbaniya propose un service de délégation (wakāla) pour
        l&apos;accomplissement de rites islamiques de sacrifice :
      </p>
      <ul>
        <li>
          <strong>Qurbān (Udhiyah)</strong> — sacrifice de l&apos;Aïd al-Adha
        </li>
        <li>
          <strong>ʿAqīqah</strong> — sacrifice pour la naissance d&apos;un enfant
        </li>
        <li>
          <strong>Ṣadaqah</strong> — sacrifice volontaire de bienfaisance
        </li>
      </ul>
      <p>
        En passant commande, le Client mandate Qurbaniya comme son
        représentant (<em>wakīl</em>) pour accomplir le sacrifice rituel
        conformément aux principes de la Sunnah.
      </p>

      <h2>2. Ce que comprend le service</h2>
      <p>Pour chaque commande, le Client :</p>
      <ul>
        <li>
          délègue à Qurbaniya l&apos;exécution du sacrifice en son nom ;
        </li>
        <li>
          autorise Qurbaniya à prononcer au moment de l&apos;abattage la formule
          « <em>Bismillāh Allāhu Akbar</em> » suivie du nom indiqué par le
          Client ;
        </li>
        <li>
          comprend que la viande est distribuée à des communautés musulmanes
          dans le besoin ;
        </li>
        <li>
          reçoit une preuve vidéo personnalisée du sacrifice, envoyée par
          WhatsApp dans les jours suivant l&apos;exécution.
        </li>
      </ul>

      <h2>3. Prix et paiement</h2>
      <p>
        Les prix affichés sur le site sont indiqués en euros, toutes taxes
        comprises. Le prix inclut l&apos;approvisionnement de l&apos;animal, son
        abattage rituel, la documentation vidéo, la distribution de la viande
        et l&apos;ensemble de la logistique associée.
      </p>
      <p>
        Le paiement est effectué en ligne au moment de la commande, par carte
        bancaire (Visa, Mastercard) via Stripe. La commande n&apos;est
        confirmée qu&apos;après réception du paiement intégral.
      </p>
      <p>
        Aucun frais additionnel n&apos;est facturé après le paiement, sauf
        indication contraire explicite.
      </p>

      <h2>4. Délai d&apos;exécution</h2>
      <ul>
        <li>
          <strong>Aïd al-Adha :</strong> les sacrifices sont accomplis pendant
          les jours officiels de l&apos;Aïd (du 10 au 13 Dhul Hijjah).
        </li>
        <li>
          <strong>ʿAqīqah et Ṣadaqah :</strong> généralement exécutés dans un
          délai de 3 à 7 jours ouvrés suivant la commande.
        </li>
      </ul>
      <p>
        Le Client reçoit ensuite une vidéo personnalisée confirmant :
      </p>
      <ul>
        <li>le nom prononcé au moment du sacrifice,</li>
        <li>l&apos;animal abattu,</li>
        <li>
          et, lorsque cela est possible, la distribution de la viande aux
          familles bénéficiaires.
        </li>
      </ul>

      <h2>5. Conformité religieuse</h2>
      <p>
        L&apos;ensemble des sacrifices respecte les exigences islamiques :
      </p>
      <ul>
        <li>abattage par un musulman qualifié (cheikh diplômé) ;</li>
        <li>utilisation d&apos;une lame aiguisée selon les normes humaines ;</li>
        <li>récitation de la <em>Tasmiyah</em> et du <em>Takbīr</em> ;</li>
        <li>
          sélection d&apos;animaux conformes aux critères islamiques (âge,
          santé, espèce).
        </li>
      </ul>

      <h2>6. Droit de rétractation</h2>
      <p>
        Conformément à l&apos;article L.221-28 du Code de la consommation, le
        droit de rétractation de 14 jours <strong>ne s&apos;applique pas</strong>{" "}
        aux prestations suivantes :
      </p>
      <ul>
        <li>
          services pleinement exécutés avant la fin du délai de rétractation
          avec accord préalable exprès du Client ;
        </li>
        <li>
          biens périssables, personnalisés ou confectionnés selon les
          spécifications du Client ;
        </li>
        <li>
          prestations de services devant être fournies à une date ou une
          période déterminée.
        </li>
      </ul>
      <p>
        Le sacrifice de l&apos;Aïd al-Adha, devant obligatoirement être
        accompli durant les jours de l&apos;Aïd, relève de cette exception. En
        passant commande, le Client reconnaît expressément renoncer à son
        droit de rétractation une fois le sacrifice exécuté.
      </p>

      <h2>7. Politique de remboursement</h2>
      <p>
        <strong>Aucun remboursement n&apos;est possible une fois le sacrifice
        accompli.</strong>
      </p>
      <p>Un remboursement total ou partiel peut être accordé si :</p>
      <ul>
        <li>
          le service ne peut être exécuté en raison de circonstances
          imprévues (pénurie d&apos;animaux, urgence sanitaire, cas de force
          majeure) ;
        </li>
        <li>
          un retard excessif dépasse 15 jours (hors période d&apos;Aïd durant
          laquelle les volumes mondiaux peuvent entraîner des délais).
        </li>
      </ul>
      <p>
        Dans ces cas, Qurbaniya proposera au Client, selon sa préférence :
      </p>
      <ul>
        <li>un remboursement intégral,</li>
        <li>le report à une date ultérieure,</li>
        <li>ou la redirection vers une autre région (avec son accord).</li>
      </ul>

      <h2>8. Obligations du Client</h2>
      <p>Le Client s&apos;engage à :</p>
      <ul>
        <li>
          fournir un nom correct et lisible pour la prononciation au moment du
          sacrifice ;
        </li>
        <li>
          indiquer clairement le type de sacrifice souhaité (Qurbān, ʿAqīqah
          ou Ṣadaqah) ;
        </li>
        <li>
          ne pas demander d&apos;acte qui serait contraire à la loi islamique
          ou détournerait l&apos;objet religieux du service.
        </li>
      </ul>

      <h2>9. Données personnelles</h2>
      <p>
        Les données personnelles collectées sont utilisées exclusivement pour
        l&apos;exécution de la commande. La vidéo du sacrifice est
        confidentielle et partagée uniquement avec le Client, sauf autorisation
        expresse de sa part pour un usage public. Qurbaniya ne cède ni ne
        revend aucune donnée à des tiers.
      </p>
      <p>
        Pour plus d&apos;informations, consulter la{" "}
        <Link href="/confidentialite">Politique de confidentialité</Link>.
      </p>

      <h2>10. Responsabilité</h2>
      <p>Qurbaniya ne saurait être tenu responsable :</p>
      <ul>
        <li>
          des retards dus à des catastrophes naturelles, à des perturbations
          politiques ou à des défaillances logistiques de prestataires tiers ;
        </li>
        <li>
          des erreurs de prononciation ou d&apos;orthographe dues à des
          informations incomplètes ou incorrectes fournies par le Client ;
        </li>
        <li>
          des écarts mineurs sur la vidéo n&apos;affectant pas la validité
          rituelle du sacrifice.
        </li>
      </ul>

      <h2>11. Droit applicable et médiation</h2>
      <p>
        Les présentes CGV sont régies par le droit français. En cas de litige,
        le Client est invité à contacter le service client à{" "}
        <a href="mailto:support@qurbaniya.fr">support@qurbaniya.fr</a> afin de
        rechercher une solution amiable.
      </p>
      <p>
        À défaut d&apos;accord, le Client peut recourir gratuitement au service
        de médiation de la consommation (voir{" "}
        <Link href="/mentions-legales">Mentions légales</Link>) ou saisir la
        juridiction compétente.
      </p>

      <h2>12. Acceptation</h2>
      <p>En passant commande, le Client reconnaît :</p>
      <ul>
        <li>
          comprendre et accepter la délégation du sacrifice à Qurbaniya ;
        </li>
        <li>
          accepter le cadre religieux et logistique décrit dans les présentes
          CGV ;
        </li>
        <li>adhérer sans réserve à l&apos;ensemble de ces conditions.</li>
      </ul>
      <p className="italic">
        L&apos;équipe Qurbaniya prie Allah d&apos;accepter votre sacrifice, de
        purifier vos biens et d&apos;accorder la récompense à vous et à ceux au
        nom desquels vous sacrifiez.
      </p>
    </LegalPage>
  );
}
