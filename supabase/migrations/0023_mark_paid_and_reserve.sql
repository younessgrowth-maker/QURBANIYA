-- ╭────────────────────────────────────────────────────────────────────╮
-- │ Migration 0023 — Passage à `paid` + réservation inventaire ATOMIQUE  │
-- │                                                                    │
-- │ Avant : le webhook faisait (1) UPDATE pending→paid puis (2) un       │
-- │ decrement_slots_by séparé. Un échec du décrément était juste loggé   │
-- │ et l'event déjà marqué "traité" → Stripe ne rejouait pas → commande  │
-- │ payée mais inventaire jamais réservé (survente silencieuse).         │
-- │                                                                    │
-- │ Cette fonction fait les deux DANS UNE SEULE TRANSACTION :            │
-- │  - flip pending→paid (idempotent : ne matche que pending)           │
-- │  - réservation des N slots de la saison de la commande              │
-- │ Soit les deux réussissent, soit aucun (rollback) → plus d'état       │
-- │ partiel paid-mais-non-réservé.                                      │
-- │                                                                    │
-- │ Choix métier : on HONORE le paiement (réservation inconditionnelle, │
-- │ le garde-fou de stock est au moment de la commande dans /api/orders).│
-- │ reserved_slots reflète la réalité des ventes même en cas de rare     │
-- │ dépassement (visible côté /admin). Si la ligne inventaire de la       │
-- │ saison manque, la réservation est sans effet mais le paiement reste   │
-- │ honoré.                                                             │
-- ╰────────────────────────────────────────────────────────────────────╯

create or replace function public.mark_paid_and_reserve(
  p_session_id text,
  p_quantity integer,
  p_discount integer
)
returns setof public.orders
language plpgsql
security definer
as $$
declare
  v_order public.orders;
begin
  if p_quantity is null or p_quantity < 1 then
    raise exception 'Invalid quantity: %', p_quantity;
  end if;

  -- Flip pending → paid (idempotent : ne matche que pending). Si la
  -- commande est déjà paid (retry/race), aucune ligne → set vide retourné,
  -- le webhook saute alors tous les side-effects.
  update public.orders
    set payment_status = 'paid',
        discount_amount = coalesce(p_discount, 0),
        updated_at = now()
    where stripe_session_id = p_session_id
      and payment_status = 'pending'
    returning * into v_order;

  if not found then
    return;
  end if;

  -- Réservation des N slots DANS LA MÊME TRANSACTION que le passage paid.
  update public.inventory
    set reserved_slots = reserved_slots + p_quantity
    where year = v_order.season;

  return next v_order;
end;
$$;

comment on function public.mark_paid_and_reserve is
  'Passe une commande pending→paid ET réserve N slots d''inventaire de façon atomique (une seule transaction). Idempotent (ne matche que pending). Honore le paiement (réservation inconditionnelle). Remplace l''ancien combo update + decrement_slots_by du webhook.';
