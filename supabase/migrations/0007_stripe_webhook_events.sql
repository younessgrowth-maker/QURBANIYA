-- ─── Idempotency Stripe webhook ───
-- Avant cette migration: aucune protection contre les retry Stripe.
-- Si Stripe renvoie le même event (timeout, 5xx transitoire), le handler
-- run 2x: payment_status repasse pending→paid sans souci, MAIS:
--   - decrement_slots() est appelé 2x → inventaire off-by-one
--   - sendOrderConfirmation() est appelé 2x → email doublon au client
--
-- Cette table mémorise les event_id Stripe déjà traités. Le handler
-- INSERT en début de POST avant tout side effect; un conflict PK (23505)
-- = duplicate event, on skip immédiatement.

create table if not exists public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now()
);

-- RLS: pas d'accès anon/authenticated, seul le service role écrit.
alter table public.stripe_webhook_events enable row level security;
-- Aucune policy = personne sauf service role ne peut lire/écrire.

-- Index utile pour audit/debug par type
create index if not exists stripe_webhook_events_type_idx
  on public.stripe_webhook_events (event_type, processed_at desc);
