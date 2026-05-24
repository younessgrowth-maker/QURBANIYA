-- ══════════════════════════════════════════════════════════════════════════
-- 0018_orders_quantity.sql — multi-moutons par commande
-- ══════════════════════════════════════════════════════════════════════════
--
-- Contexte (mai 2026, J-3 de l'Aïd) : on a découvert qu'il n'est techniquement
-- pas possible pour un client de commander plusieurs moutons en une seule
-- transaction. Le formulaire et l'API forcent quantity=1, ce qui pousse
-- les familles (qui veulent typiquement 2-3 moutons : pour eux, leurs
-- parents, sadaqa) à faire plusieurs commandes successives — friction
-- énorme et drop-off des gros paniers.
--
-- Fix simple et safe :
--   - Ajout colonne `quantity` (default 1) à `orders`
--   - Le champ `amount` continue de représenter le PRIX UNITAIRE (140€)
--     pour ne pas casser le code existant qui suppose amount = 140.
--     Le total payé Stripe = amount × quantity − discount_amount.
--   - Nouvelle fonction `decrement_slots_by(year, n)` qui décrémente
--     reserved_slots de N atomiquement, en gardant le check stock.
--     L'ancienne `decrement_slots(year)` reste pour backward compat
--     (sera supprimée post-Aïd 2026).
-- ══════════════════════════════════════════════════════════════════════════

-- Colonne quantity sur orders
alter table public.orders
  add column if not exists quantity integer not null default 1
    check (quantity between 1 and 5);

comment on column public.orders.quantity is
  'Nombre de moutons sur cette commande (1 à 5). Le total payé Stripe = amount × quantity − discount_amount.';

-- Index pour stats analytics rapides
create index if not exists orders_quantity_idx on public.orders (quantity);

-- ─── RPC atomique : décrément de N slots ─────────────────────────────────
-- Variante de decrement_slots qui accepte un nombre de slots à réserver.
-- Empêche d'over-réserver : si reserved_slots + n > total_slots, la mise à
-- jour ne s'effectue pas et la fonction lève une exception.
create or replace function public.decrement_slots_by(target_year integer, n integer)
returns integer
language plpgsql
security definer
as $$
declare
  new_reserved integer;
begin
  if n is null or n < 1 then
    raise exception 'Invalid slot count: %', n;
  end if;

  update public.inventory
    set reserved_slots = reserved_slots + n
    where year = target_year
      and is_open = true
      and reserved_slots + n <= total_slots
    returning reserved_slots into new_reserved;

  if new_reserved is null then
    raise exception 'Inventory unavailable or insufficient slots (% requested) for year %', n, target_year;
  end if;

  return new_reserved;
end;
$$;

comment on function public.decrement_slots_by is
  'Réserve atomiquement N slots pour l''année donnée. Lève une exception si stock insuffisant ou commandes fermées. Appelée par le webhook Stripe à chaque commande payée.';
