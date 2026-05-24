-- ─── Liste d'attente "stock complet" ───
-- Avant: quand l'inventaire atteint 0 / is_open=false, /api/orders renvoie un
-- 403 silencieux. Le visiteur ne sait pas qu'il peut s'inscrire sur liste
-- d'attente, et on n'a aucun moyen de le contacter quand le fournisseur
-- débloque des places supplémentaires.
--
-- Cette table capture prénom + email + (tel optionnel) avec l'année visée.
-- Volumétrie attendue très faible (quelques dizaines max), donc index minimal.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  year int not null,
  prenom text not null,
  email text not null,
  telephone text,
  source text,
  created_at timestamptz not null default now(),
  notified_at timestamptz
);

-- Dédoublonnage par (year, email) — pas de unique strict (un retry doit pas
-- planter, on garde le 1er enregistrement)
create index if not exists waitlist_year_email_idx
  on public.waitlist (year, lower(email));

create index if not exists waitlist_pending_idx
  on public.waitlist (created_at)
  where notified_at is null;
