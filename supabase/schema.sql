-- ══════════════════════════════════════════════════════════════════════════
-- QURBANIYA — SCHEMA COMPLET DE LA BASE DE DONNÉES
-- ══════════════════════════════════════════════════════════════════════════
--
-- Fichier de RÉFÉRENCE — représente l'état complet de la DB Supabase prod.
-- À lire en premier pour comprendre la structure. À maintenir à jour quand
-- une nouvelle table / colonne / RLS est ajoutée.
--
-- ⚠️ Ne PAS exécuter ce fichier pour recréer la base — utilisez les
-- migrations chronologiques dans `supabase/migrations/*.sql` à la place,
-- qui préservent les données existantes.
--
-- Dernière mise à jour : 2026-04-21 (après migration 0002_analytics)
-- ══════════════════════════════════════════════════════════════════════════


-- ┌─────────────────────────────────────────────────────────────────────┐
-- │ Table : public.orders                                               │
-- │ Créée par : 0001_init.sql                                           │
-- │ Usage : toute commande client (stripe, paypal, virement)            │
-- │ Insertions : /api/orders (anon) + /api/stripe/webhook (service)     │
-- │ Lectures : RLS = user lit ses propres commandes ; admin via service │
-- └─────────────────────────────────────────────────────────────────────┘

create table public.orders (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references auth.users(id) on delete set null,
  prenom              text not null,
  nom                 text not null,
  email               text not null,
  telephone           text not null default '',
  intention           text not null check (intention in ('pour_moi','famille','sadaqa')),
  niyyah              text not null,
  payment_status      text not null default 'pending' check (payment_status in ('pending','paid','failed')),
  payment_method      text not null check (payment_method in ('stripe','paypal','virement')),
  stripe_session_id   text unique,
  amount              integer not null,                 -- montant en centimes (14000 = 140€)
  video_sent          boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index orders_email_idx   on public.orders (email);
create index orders_user_id_idx on public.orders (user_id);

alter table public.orders enable row level security;

create policy "own orders read"
  on public.orders for select
  using (auth.uid() = user_id);


-- ┌─────────────────────────────────────────────────────────────────────┐
-- │ Table : public.inventory                                            │
-- │ Créée par : 0001_init.sql                                           │
-- │ Usage : stock de moutons disponibles par année                      │
-- │ Mutations : RPC decrement_slots() côté webhook                      │
-- │ Lectures : RLS = lecture publique (pour afficher stock live)        │
-- └─────────────────────────────────────────────────────────────────────┘

create table public.inventory (
  id              uuid primary key default gen_random_uuid(),
  year            integer not null unique,
  total_slots     integer not null,
  reserved_slots  integer not null default 0,
  is_open         boolean not null default true
);

-- Seed initial 2026 (doit matcher lib/constants.ts STOCK)
insert into public.inventory (year, total_slots, reserved_slots, is_open)
values (2026, 200, 147, true);

alter table public.inventory enable row level security;

create policy "inventory public read"
  on public.inventory for select
  using (true);


-- ┌─────────────────────────────────────────────────────────────────────┐
-- │ RPC : public.decrement_slots(target_year integer)                   │
-- │ Créée par : 0001_init.sql                                           │
-- │ Usage : décrémente atomiquement les slots (webhook Stripe)          │
-- │ Retour : nouveau reserved_slots, ou raise exception si stock épuisé │
-- └─────────────────────────────────────────────────────────────────────┘

create or replace function public.decrement_slots(target_year integer)
returns integer
language plpgsql
security definer
as $$
declare
  new_reserved integer;
begin
  update public.inventory
    set reserved_slots = reserved_slots + 1
    where year = target_year
      and is_open = true
      and reserved_slots < total_slots
    returning reserved_slots into new_reserved;

  if new_reserved is null then
    raise exception 'Inventory unavailable for year %', target_year;
  end if;

  return new_reserved;
end;
$$;


-- ┌─────────────────────────────────────────────────────────────────────┐
-- │ Table : public.analytics_events                                     │
-- │ Créée par : 0002_analytics.sql (Sprint 7, 2026-04-21)               │
-- │ Usage : tracking custom — pageviews, CTA clicks, conversions        │
-- │ Insertions : /api/track (service role uniquement)                   │
-- │ Lectures : RLS = aucune policy → service role uniquement            │
-- │                                                                     │
-- │ Events whitelistés (voir /api/track/route.ts) :                     │
-- │   page_view, cta_click, whatsapp_click, phone_click,                │
-- │   order_started, order_submitted, payment_started,                  │
-- │   exit_popup_shown, exit_popup_conversion,                          │
-- │   lead_captured, video_play, faq_open                               │
-- └─────────────────────────────────────────────────────────────────────┘

create table public.analytics_events (
  id                uuid primary key default gen_random_uuid(),
  event_name        text not null,
  path              text,
  referrer          text,
  session_id        text,            -- rolling 30 min window côté client
  user_agent_hash   text,            -- hash léger non-crypto (lib/track.ts)
  metadata          jsonb default '{}'::jsonb,
  created_at        timestamptz not null default now()
);

create index analytics_events_created_at_idx  on public.analytics_events (created_at desc);
create index analytics_events_event_name_idx  on public.analytics_events (event_name);
create index analytics_events_session_id_idx  on public.analytics_events (session_id);

alter table public.analytics_events enable row level security;
-- Pas de policy → tout est bloqué pour anon/authenticated. Service role bypasse.


-- ══════════════════════════════════════════════════════════════════════════
-- AUTH
-- ══════════════════════════════════════════════════════════════════════════
--
-- Géré par Supabase Auth (table `auth.users` — non modifiable).
-- Méthode active : magic link (OTP email) via @supabase/ssr (PKCE flow).
--
-- Configuration Dashboard (Authentication → URL Configuration) :
--   Site URL       = https://qurbaniya.fr
--   Redirect URLs  = https://qurbaniya.fr/**
--                    http://localhost:3000/**  (dev)
--
-- Flow côté app :
--   1. /login → signInWithOtp({ emailRedirectTo: /auth/callback?next=... })
--   2. Email reçu → user clique le lien
--   3. Supabase redirige vers redirect_to avec ?code=<pkce_code>
--   4. middleware.ts intercepte le ?code= sur n'importe quelle route et
--      le redirige vers /auth/callback
--   5. /auth/callback/route.ts échange le code → session → redirige next
--
-- ══════════════════════════════════════════════════════════════════════════


-- ══════════════════════════════════════════════════════════════════════════
-- ADMIN
-- ══════════════════════════════════════════════════════════════════════════
--
-- Accès à /admin : protection par middleware + whitelist email.
--
-- Whitelist (lib/admin.ts) :
--   - env var ADMIN_EMAILS (comma-separated) — à configurer dans Vercel
--   - fallback si env vide : ["younessgrowth@gmail.com"]
--
-- Pour ajouter un admin :
--   Vercel Dashboard → Settings → Environment Variables →
--     ADMIN_EMAILS = email1@x.com,email2@y.com
--   Puis Redeploy.
--
-- Dashboard admin lit orders + inventory + analytics_events via
-- service role client (bypasse RLS).
--
-- ══════════════════════════════════════════════════════════════════════════
