-- Qurbaniya — initial schema
-- À exécuter une seule fois dans le SQL editor Supabase (dashboard → SQL → New query)
-- Cohérent avec types/index.ts (Order, Inventory)

-- ─── Table orders ───
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  prenom text not null,
  nom text not null,
  email text not null,
  telephone text not null default '',
  intention text not null check (intention in ('pour_moi','famille','sadaqa')),
  niyyah text not null,
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed')),
  payment_method text not null check (payment_method in ('stripe','paypal','virement')),
  stripe_session_id text unique,
  amount integer not null,
  video_sent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_email_idx on public.orders (email);
create index orders_user_id_idx on public.orders (user_id);

-- ─── Table inventory ───
create table public.inventory (
  id uuid primary key default gen_random_uuid(),
  year integer not null unique,
  total_slots integer not null,
  reserved_slots integer not null default 0,
  is_open boolean not null default true
);

-- Seed inventaire 2026 (aligne avec lib/constants.ts)
insert into public.inventory (year, total_slots, reserved_slots, is_open)
values (2026, 200, 147, true);

-- ─── RPC atomique : décrément des slots ───
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

-- ─── RLS policies ───
-- orders : lecture propre à l'utilisateur connecté uniquement
-- (inserts/updates passent par la service role key côté API routes → pas de policy anon en écriture)
alter table public.orders enable row level security;

create policy "own orders read"
  on public.orders
  for select
  using (auth.uid() = user_id);

-- inventory : lecture publique (affichage stock sur landing)
alter table public.inventory enable row level security;

create policy "inventory public read"
  on public.inventory
  for select
  using (true);
