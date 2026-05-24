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
--
-- Postgres n'autorise pas jsonb_agg() directement dans le SET d'un UPDATE.
-- On utilise donc UPDATE ... FROM LATERAL pour calculer le jsonb_agg par
-- ligne dans une sous-requête correlée.
update public.orders o
   set sacrifices = sub.arr
  from lateral (
    select jsonb_agg(
             jsonb_build_object(
               'niyyah', o.niyyah,
               'intention', o.intention
             )
           ) as arr
      from generate_series(1, greatest(coalesce(o.quantity, 1), 1))
  ) sub
 where o.sacrifices = '[]'::jsonb
   and o.niyyah is not null
   and o.intention is not null;
