-- ─── Refund flow ───
-- Avant: aucun statut "refunded" en DB et aucune trace côté Qurbaniya quand
-- Stripe émet un remboursement. Si Youness rembourse via le dashboard Stripe,
-- la commande reste à "paid" en local + le slot inventaire reste consommé.
--
-- Cette migration:
--   1. Étend la contrainte payment_status pour inclure 'refunded'
--   2. Ajoute refunded_at + refund_reason pour tracer le remboursement
--   3. Ajoute stripe_refund_id pour idempotency (un seul refund par commande)
--
-- L'admin endpoint /api/admin/orders/refund émettra le refund Stripe ET
-- restituera le slot d'inventaire.

-- 1. Étendre la contrainte CHECK sur payment_status
alter table public.orders drop constraint if exists orders_payment_status_check;
alter table public.orders
  add constraint orders_payment_status_check
  check (payment_status in ('pending', 'paid', 'failed', 'refunded'));

-- 2. Colonnes de tracking refund
alter table public.orders
  add column if not exists refunded_at timestamptz,
  add column if not exists refund_reason text,
  add column if not exists stripe_refund_id text unique;

-- Index partiel utile pour le tableau admin "remboursements récents"
create index if not exists orders_refunded_at_idx
  on public.orders (refunded_at desc)
  where payment_status = 'refunded';
