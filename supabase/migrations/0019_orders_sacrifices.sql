-- ══════════════════════════════════════════════════════════════════════════
-- 0019_orders_sacrifices.sql — multi-niyyahs/intentions par commande
-- ══════════════════════════════════════════════════════════════════════════
--
-- Suite logique de 0018 : on a permis 1-5 moutons par commande, mais avec
-- un seul niyyah + intention partagé. Le client a demandé à pouvoir
-- spécifier une niyyah ET intention DIFFÉRENTES pour chaque mouton
-- (cas typique : 1 pour soi, 1 pour parents décédés, 1 en sadaqa).
--
-- Approche : ajouter une colonne `sacrifices jsonb` qui contient un array
-- d'objets `[{niyyah, intention}, ...]` de longueur = quantity.
--
-- Les colonnes `niyyah` et `intention` du top-level restent pour backward
-- compat (commandes existantes + lecture simple par l'admin /admin). On
-- y stocke le premier sacrifice de l'array (utilisé comme représentatif).
-- ══════════════════════════════════════════════════════════════════════════

alter table public.orders
  add column if not exists sacrifices jsonb not null default '[]'::jsonb;

comment on column public.orders.sacrifices is
  'Array JSON [{niyyah: string, intention: pour_moi|famille|sadaqa}, ...] de longueur = quantity. La premiere entree miroir niyyah/intention top-level pour backward compat.';

-- Index GIN pour requêtes futures sur les intentions (analytics, etc.)
create index if not exists orders_sacrifices_gin_idx
  on public.orders using gin (sacrifices);

-- Backfill : pour les commandes existantes, créer un sacrifices array à
-- partir des colonnes niyyah/intention top-level, répété `quantity` fois.
update public.orders
   set sacrifices = (
     select jsonb_agg(jsonb_build_object(
       'niyyah', niyyah,
       'intention', intention
     ))
     from generate_series(1, quantity)
   )
 where sacrifices = '[]'::jsonb
   and niyyah is not null
   and intention is not null;
