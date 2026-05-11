-- ╭────────────────────────────────────────────────────────────────────╮
-- │ Migration 0011 — Système de parrainage                             │
-- │                                                                    │
-- │ Mécanique V1 :                                                     │
-- │  - Chaque commande payée génère un `referral_code` (6 chars)       │
-- │  - Un filleul peut appliquer le code à l'achat → −15€ via coupon   │
-- │    Stripe créé à la volée                                          │
-- │  - Le parrain reçoit 15€ cashback versé manuellement post-Aïd      │
-- │    (admin marque `referrer_reward_paid_at` après virement)         │
-- ╰────────────────────────────────────────────────────────────────────╯

alter table public.orders
  add column referral_code text unique,
  add column referred_by_code text,
  add column referrer_order_id uuid references public.orders(id) on delete set null,
  add column discount_amount integer not null default 0,
  add column referrer_reward_paid_at timestamptz;

-- Lookup parrain par code (utilisé à chaque commande qui applique un code)
create index orders_referral_code_idx on public.orders (referral_code)
  where referral_code is not null;

-- Lookup filleuls par code parrain (pour le tableau de bord)
create index orders_referred_by_code_idx on public.orders (referred_by_code)
  where referred_by_code is not null;

-- Lookup des parrainages en attente de versement (admin)
create index orders_pending_referrer_reward_idx on public.orders (referrer_order_id)
  where referrer_order_id is not null and referrer_reward_paid_at is null;

comment on column public.orders.referral_code is
  'Code parrain unique (6 chars uppercase), généré au paiement confirmé. Partagé via URL ?ref=XXX.';
comment on column public.orders.referred_by_code is
  'Code utilisé par CE client à l''achat (le code du parrain). Null si commande organique.';
comment on column public.orders.referrer_order_id is
  'Lien vers la commande du parrain. Permet de retrouver qui doit toucher le cashback.';
comment on column public.orders.discount_amount is
  'Montant de réduction filleul (€), 0 si pas de parrainage. Le montant payé Stripe = amount - discount_amount.';
comment on column public.orders.referrer_reward_paid_at is
  'Date de versement manuel du cashback parrain. Null = à payer après l''Aïd.';
