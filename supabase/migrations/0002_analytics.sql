-- Qurbaniya — analytics events
-- À exécuter une seule fois dans le SQL editor Supabase
-- Table légère pour tracker pageviews, CTA clicks, conversions

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  referrer text,
  session_id text,
  user_agent_hash text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index analytics_events_event_name_idx on public.analytics_events (event_name);
create index analytics_events_session_id_idx on public.analytics_events (session_id);

-- RLS : écriture via service role uniquement (server-side)
alter table public.analytics_events enable row level security;

-- Pas de policy pour anon/authenticated → tout est bloqué sauf service role.
