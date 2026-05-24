import type { Order, Intention } from "@/types";

// ─── Helper pour gérer la fan-out commande → N sacrifices ────────────
//
// Une commande multi-mouton (quantity > 1) doit être traitée comme N
// sacrifices indépendants pour : impression étiquettes, upload vidéos,
// envoi email final. Ce helper expanse une commande en N "items",
// avec fallback sur les colonnes top-level pour les commandes pre-0019
// (sacrifices vide → 1 seul item dérivé de niyyah/intention top-level).
//
// Sub-label : "a", "b", "c" si quantity > 1 (ex: N°12a, N°12b). null
// si quantity = 1 (numérotation classique N°12). Le cheikh lit ce
// sub-label sur l'étiquette imprimée et l'écrit sur la vidéo, l'OCR
// matche ensuite (digit + lettre optionnelle).

export interface SacrificeItem {
  orderId: string;
  sacrificeIndex: number; // 0-indexed dans sacrifices[]
  niyyah: string;
  intention: Intention;
  videoPath: string | null;
  // Position globale dans l'ordre chronologique des commandes (= N° d'étiquette)
  orderNumber: number;
  subLabel: string | null; // "a", "b" ... si quantity > 1, sinon null
  combinedLabel: string; // "12" ou "12a" — ce qui apparaît sur l'étiquette
  // Identifiants client (pour affichage tableau admin + email)
  prenom: string;
  nom: string;
  email: string;
  fullName: string;
  // Quantity de la commande, utile pour décider du wording email final.
  quantity: number;
}

export function expandOrderToSacrifices(
  order: Order,
  orderNumber: number
): SacrificeItem[] {
  const qty = order.quantity ?? 1;
  // Source de vérité pour les niyyah/intention : sacrifices[] si non vide,
  // sinon fallback sur les colonnes top-level (commandes pre-0019).
  const sacrifices =
    Array.isArray(order.sacrifices) && order.sacrifices.length > 0
      ? order.sacrifices
      : [{ niyyah: order.niyyah, intention: order.intention }];

  // Idem pour video_paths : array si non vide, sinon [video_url] legacy.
  const videoPaths =
    Array.isArray(order.video_paths) && order.video_paths.length > 0
      ? order.video_paths
      : order.video_url
      ? [order.video_url]
      : [];

  // Si pour une raison X sacrifices.length !== quantity (data corruption,
  // commande pre-0019 dont quantity > 1), on prend le max pour ne perdre
  // aucun mouton. En pratique ça n'arrive jamais.
  const itemCount = Math.max(qty, sacrifices.length);
  const useSubLabels = qty > 1;
  const fullName = `${order.prenom} ${order.nom}`.toUpperCase();

  return Array.from({ length: itemCount }, (_, idx) => {
    const s = sacrifices[idx] ?? sacrifices[0]; // fallback safety
    const subLabel = useSubLabels
      ? String.fromCharCode("a".charCodeAt(0) + idx)
      : null;
    return {
      orderId: order.id,
      sacrificeIndex: idx,
      niyyah: s.niyyah?.trim() || fullName,
      intention: s.intention,
      videoPath: videoPaths[idx] ?? null,
      orderNumber,
      subLabel,
      combinedLabel: subLabel ? `${orderNumber}${subLabel}` : String(orderNumber),
      prenom: order.prenom,
      nom: order.nom,
      email: order.email,
      fullName,
      quantity: qty,
    };
  });
}
