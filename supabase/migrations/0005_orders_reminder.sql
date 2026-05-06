-- Qurbaniya — track des emails de relance pour paniers abandonnés
-- À exécuter dans le SQL editor Supabase après merge de la PR

alter table public.orders
  add column if not exists reminder_sent_at timestamptz;

-- Index pour accélérer la requête du cron : "pending sans reminder, créé entre 1h et 23h"
create index if not exists orders_reminder_pending_idx
  on public.orders (created_at)
  where payment_status = 'pending' and reminder_sent_at is null;
