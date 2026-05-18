-- ╭────────────────────────────────────────────────────────────────────╮
-- │ Migration 0015 — Système d'affiliation (partenaires)               │
-- │                                                                    │
-- │ Distinct du parrainage client (0011) :                             │
-- │  - Partenaires APPROUVÉS uniquement (mosquées, assos, influenceurs)│
-- │  - Pas de réduction pour le client amené (il paie plein tarif)     │
-- │  - Commission FIXE par vente attribuée (snapshot à la conversion)  │
-- │  - AUCUN versement automatique : l'admin paie par virement à la    │
-- │    main puis marque la conversion `paid`. Le système ne fait que   │
-- │    tracer ce qui est dû.                                            │
-- │  - Attribution en lecture seule via cookie ?aff= → metadata order, │
-- │    ne touche jamais le tunnel de paiement Stripe.                   │
-- ╰────────────────────────────────────────────────────────────────────╯

create table public.affiliates (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  email text not null,
  phone text not null default '',
  -- Commission fixe en euros versée au partenaire par vente attribuée.
  -- Stockée par affilié pour pouvoir négocier au cas par cas plus tard.
  commission_eur integer not null default 20,
  -- Garde-fou : une conversion n'est créée que si l'affilié est approuvé.
  approved boolean not null default false,
  -- Infos de versement (IBAN, PayPal, note libre) — saisies par l'admin.
  payout_note text,
  created_at timestamptz not null default now()
);

create index affiliates_code_idx on public.affiliates (code);

-- Une ligne par vente payée attribuée à un affilié. `commission_eur` est
-- un SNAPSHOT du barème au moment de la conversion (si on change le barème
-- d'un affilié plus tard, les commissions déjà dues ne bougent pas).
create table public.affiliate_conversions (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references public.affiliates(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  commission_eur integer not null,
  status text not null default 'pending' check (status in ('pending', 'paid')),
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  -- Idempotence : un retry de webhook ne doit pas créer 2 commissions
  -- pour la même commande.
  unique (order_id)
);

create index affiliate_conversions_affiliate_idx
  on public.affiliate_conversions (affiliate_id);

create index affiliate_conversions_pending_idx
  on public.affiliate_conversions (affiliate_id)
  where status = 'pending';

-- Code affilié transporté par la commande (cookie ?aff= → metadata).
-- Nullable : la grande majorité des commandes n'ont pas d'affilié.
alter table public.orders
  add column affiliate_code text;

create index orders_affiliate_code_idx on public.orders (affiliate_code)
  where affiliate_code is not null;
