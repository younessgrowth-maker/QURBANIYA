-- ╭────────────────────────────────────────────────────────────────────╮
-- │ Migration 0024 — Libération atomique de slots d'inventaire (refund)  │
-- │                                                                    │
-- │ Le refund admin libérait l'inventaire en read-modify-write          │
-- │ (SELECT reserved_slots → calcul → UPDATE), non atomique : deux       │
-- │ refunds concurrents (ou un refund concurrent avec un paiement)       │
-- │ pouvaient s'écraser (lost update), libérant trop peu de slots.       │
-- │                                                                    │
-- │ Symétrique de decrement_slots_by / mark_paid_and_reserve : une seule │
-- │ instruction atomique, bornée à 0 (greatest).                        │
-- ╰────────────────────────────────────────────────────────────────────╯

create or replace function public.release_slots(target_year integer, n integer)
returns integer
language plpgsql
security definer
as $$
declare
  v_reserved integer;
begin
  if n is null or n < 1 then
    raise exception 'Invalid slot count: %', n;
  end if;

  update public.inventory
    set reserved_slots = greatest(0, reserved_slots - n)
    where year = target_year
    returning reserved_slots into v_reserved;

  -- v_reserved est null si aucune ligne inventaire pour l'année (no-op).
  return v_reserved;
end;
$$;

comment on function public.release_slots is
  'Libère atomiquement N slots d''inventaire pour l''année donnée (reserved_slots = greatest(0, reserved_slots - n)). Appelée au refund admin. Symétrique de decrement_slots_by.';
