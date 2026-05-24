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
-- compat (commandes existantes + lecture simple par l'admin /admin).
-- On y stocke le premier sacrifice de l'array (utilisé comme représentatif).
--
-- ⚠ Pas de backfill SQL pour les commandes existantes : le code applicatif
-- a déjà un fallback (cf. lib/resend.ts) qui lit niyyah/intention top-level
-- si `sacrifices` est vide ou absent. Si tu veux quand même faire un
-- backfill plus tard, exécute le script optionnel à la fin de ce fichier
-- (en commentaire) APRÈS avoir validé que la colonne existe.
-- ══════════════════════════════════════════════════════════════════════════

alter table public.orders
  add column if not exists sacrifices jsonb not null default '[]'::jsonb;

comment on column public.orders.sacrifices is
  'Array JSON [{niyyah: string, intention: pour_moi|famille|sadaqa}, ...] de longueur = quantity. La premiere entree miroir niyyah/intention top-level pour backward compat.';

-- Index GIN pour requêtes futures sur les intentions (analytics, etc.)
create index if not exists orders_sacrifices_gin_idx
  on public.orders using gin (sacrifices);


-- ═══════════════════════════════════════════════════════════════════════
-- BACKFILL OPTIONNEL — à exécuter SÉPARÉMENT si nécessaire
-- ═══════════════════════════════════════════════════════════════════════
-- Décommente le bloc ci-dessous et exécute-le séparément (dans une
-- nouvelle requête Supabase SQL Editor) APRÈS que les commandes ci-dessus
-- ont été appliquées avec succès. Comme ça si le backfill plante pour
-- une raison X, les ALTER/INDEX restent en place (pas de rollback).
--
-- Le backfill duplique simplement niyyah/intention top-level dans un
-- array de taille `quantity`. Inutile si toutes les commandes existantes
-- ont quantity=1 (par défaut après 0018).
--
-- update public.orders
--    set sacrifices = case quantity
--      when 1 then jsonb_build_array(
--        jsonb_build_object('niyyah', niyyah, 'intention', intention)
--      )
--      when 2 then jsonb_build_array(
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention)
--      )
--      when 3 then jsonb_build_array(
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention)
--      )
--      when 4 then jsonb_build_array(
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention)
--      )
--      else jsonb_build_array(
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention),
--        jsonb_build_object('niyyah', niyyah, 'intention', intention)
--      )
--    end
--  where sacrifices = '[]'::jsonb
--    and niyyah is not null
--    and intention is not null;
