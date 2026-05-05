-- Qurbaniya — table reviews (témoignages clients)
-- À exécuter dans le SQL editor Supabase après merge de la PR /avis

-- ─── Table reviews ───
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  prenom text not null,
  ville text,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text not null,
  email text,
  year integer check (year >= 2022 and year <= 2030),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create index reviews_status_idx on public.reviews (status);
create index reviews_created_at_idx on public.reviews (created_at desc);

-- ─── RLS ───
-- Lecture publique : uniquement les avis approuvés.
-- Écriture : passe par l'API route /api/avis qui utilise le service role.
alter table public.reviews enable row level security;

create policy "Anyone can read approved reviews"
  on public.reviews
  for select
  to anon, authenticated
  using (status = 'approved');
