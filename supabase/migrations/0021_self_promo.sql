-- ╭────────────────────────────────────────────────────────────────────╮
-- │ Migration 0021 — Promo "retour client" (self-promo) pour l'édition  │
-- │ suivante                                                            │
-- │                                                                    │
-- │ Principe (raisonné PAR SAISON) :                                   │
-- │  - Toute commande appartient à une `season` (= année d'édition).   │
-- │  - Activité en saison N → promo perso utilisable en saison N+1 :   │
-- │      • a commandé (payé) en N            → 10€ sur SA commande N+1  │
-- │      • a amené ≥1 filleul payant en N    → 20€ (remplace le 10€)    │
-- │  - La promo s'utilise via SON PROPRE code de parrainage, UNE seule  │
-- │    fois, et UNIQUEMENT la saison suivante (verrou temporel).        │
-- │  - Renouvellement automatique : le droit pour N+2 se recalcule sur  │
-- │    l'activité de N+1 (re-commander / re-parrainer).                 │
-- │                                                                    │
-- │ Le rôle "filleul" du code (−15€ quand QUELQU'UN D'AUTRE l'utilise)  │
-- │ reste inchangé (cf. migration 0011).                               │
-- ╰────────────────────────────────────────────────────────────────────╯

-- ── 1. Saison de la commande ────────────────────────────────────────
-- Toutes les commandes existantes appartiennent à l'édition 2026.
-- Les nouvelles commandes reçoivent la saison courante (CURRENT_YEAR)
-- explicitement à l'insert (cf. app/api/orders/route.ts).
alter table public.orders
  add column season integer not null default 2026;

create index orders_season_idx on public.orders (season);

comment on column public.orders.season is
  'Année d''édition de la commande (2026, 2027, …). Sert au calcul de la promo retour client : activité en saison N → promo en N+1.';

-- ── 2. Promo perso appliquée à CETTE commande ───────────────────────
-- `self_promo_code` = le propre code du client, utilisé sur sa commande.
-- `self_promo_amount` = montant (€) de la promo retour client appliquée.
-- Distinct de `discount_amount` (qui reste le miroir du discount réel
-- Stripe, recalculé au webhook) et de `referred_by_code` (rôle filleul).
alter table public.orders
  add column self_promo_code text,
  add column self_promo_amount integer not null default 0;

comment on column public.orders.self_promo_code is
  'Le propre code de parrainage du client, utilisé en promo retour client sur SA commande. Null si pas de self-promo.';
comment on column public.orders.self_promo_amount is
  'Montant (€) de la promo retour client appliquée à cette commande (10 ou 20). 0 si aucune.';

-- ── 3. Registre des rédemptions (usage unique par saison) ───────────
-- Garantit qu'un client n'utilise sa promo retour client qu'UNE fois
-- par saison. Clé d'unicité sur (email normalisé, saison). La ligne est
-- insérée au webhook Stripe quand le paiement est confirmé.
create table public.self_promo_redemptions (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  season      integer not null,
  order_id    uuid references public.orders(id) on delete set null,
  amount_eur  integer not null,
  created_at  timestamptz not null default now(),
  unique (email, season)
);

create index self_promo_redemptions_email_idx
  on public.self_promo_redemptions (email);

comment on table public.self_promo_redemptions is
  'Usage unique de la promo retour client : 1 rédemption max par (email, saison). Insérée au webhook après paiement.';

-- Service-role only : aucune policy → anon/auth bloqués, service role bypass.
alter table public.self_promo_redemptions enable row level security;
