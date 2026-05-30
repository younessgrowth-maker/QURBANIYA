-- ╭────────────────────────────────────────────────────────────────────╮
-- │ Migration 0022 — Réservation de la promo retour client à la création │
-- │                                                                    │
-- │ Le verrou d'usage unique passe de la confirmation de paiement       │
-- │ (webhook) à la CRÉATION de la commande, AVANT la session Stripe      │
-- │ remisée. Ça ferme le TOCTOU : deux checkouts concurrents avec le     │
-- │ même code propre ne peuvent plus obtenir chacun un coupon (le 2e     │
-- │ insert viole unique(email, season) et n'a pas de remise).            │
-- │                                                                    │
-- │ La réservation porte l'order_id (UUID pré-généré) AVANT que la       │
-- │ ligne `orders` n'existe → on retire la contrainte FK (la colonne     │
-- │ reste un uuid de traçabilité). La réservation est relâchée si la      │
-- │ commande échoue à l'insert ou expire (webhook checkout.session.      │
-- │ expired) → un panier abandonné ne brûle pas la promo du client.      │
-- ╰────────────────────────────────────────────────────────────────────╯

alter table public.self_promo_redemptions
  drop constraint if exists self_promo_redemptions_order_id_fkey;

comment on column public.self_promo_redemptions.order_id is
  'UUID de la commande ayant posé la réservation (traçabilité). Plus de FK : la réservation est insérée à la création de la commande, avant que la ligne orders existe. Relâchée si la commande échoue/expire.';
