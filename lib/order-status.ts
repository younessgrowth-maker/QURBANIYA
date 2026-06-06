import { AID_DATE } from "@/lib/constants";
import type { Order } from "@/types";

// ─── Étapes de suivi d'une commande (partagé) ──────────────────────────────
// Utilisé par la page /ma-commande/[orderId] ET la recherche vidéo /ma-video
// (affiche le suivi quand la vidéo n'est pas encore prête).
//
// OrderStep est sérialisable (pas de référence de composant) : l'icône est
// résolue par `id` côté composant <OrderTimeline>, ce qui permet de renvoyer
// les étapes en JSON depuis une route API.

export type OrderStepId = "received" | "paid" | "sacrifice" | "video";
export type OrderStepStatus = "done" | "current" | "pending";

export interface OrderStep {
  id: OrderStepId;
  label: string;
  description: string;
  status: OrderStepStatus;
  doneAt?: string | null;
}

export function buildOrderSteps(order: Order, now: Date): OrderStep[] {
  const aidPassed = now.getTime() >= AID_DATE.getTime();
  const isPaid = order.payment_status === "paid";
  const videoSent = order.video_sent === true;
  // Robuste multi-mouton : vidéo "prête" si au moins un path uploadé
  // (video_paths) ou l'ancien video_url (commandes pre-0020).
  const videoReady =
    (Array.isArray(order.video_paths) && order.video_paths.length > 0) ||
    !!order.video_url;

  const steps: OrderStep[] = [
    {
      id: "received",
      label: "Commande reçue",
      description: "Votre commande a bien été enregistrée.",
      status: "done",
      doneAt: order.created_at,
    },
    {
      id: "paid",
      label: "Paiement confirmé",
      description: isPaid
        ? "Votre paiement a été validé par notre prestataire bancaire."
        : "En attente de la confirmation de votre paiement.",
      status: isPaid ? "done" : "current",
      doneAt: isPaid ? order.updated_at : null,
    },
    {
      id: "sacrifice",
      label: "Sacrifice effectué",
      description: aidPassed
        ? "Votre sacrifice a été effectué en votre nom par le cheikh, conformément à la Sounnah."
        : "Sacrifice prévu le mercredi 27 mai 2026, jour de l'Aïd al-Adha.",
      status: aidPassed ? "done" : "pending",
      doneAt: aidPassed ? AID_DATE.toISOString() : null,
    },
    {
      id: "video",
      label: "Vidéo nominative",
      description: videoSent
        ? "Votre vidéo a été envoyée et est disponible sur cette page."
        : videoReady
          ? "La vidéo est prête, mise à disposition imminente."
          : "Disponible une fois le sacrifice accompli — le jour de l'Aïd, jusqu'aux 3 jours de l'Aïd selon la zone et les imprévus sur place.",
      status: videoSent ? "done" : videoReady ? "current" : "pending",
      doneAt: videoSent ? order.updated_at : null,
    },
  ];

  // Marquer la première étape "pending" comme "current" si aucune n'est current.
  const hasCurrent = steps.some((s) => s.status === "current");
  if (!hasCurrent) {
    const firstPending = steps.findIndex((s) => s.status === "pending");
    if (firstPending !== -1) steps[firstPending].status = "current";
  }

  return steps;
}
