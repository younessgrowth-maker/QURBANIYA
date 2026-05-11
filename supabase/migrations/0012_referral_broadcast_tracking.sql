-- ╭────────────────────────────────────────────────────────────────────╮
-- │ Migration 0012 — Tracking du broadcast email de lancement          │
-- │                                                                    │
-- │ Permet de marquer chaque client à qui on a envoyé l'email          │
-- │ d'annonce du programme parrainage, pour ne pas re-spammer si le    │
-- │ bouton "Broadcast" admin est cliqué plusieurs fois.                │
-- ╰────────────────────────────────────────────────────────────────────╯

alter table public.orders
  add column referral_broadcast_sent_at timestamptz;

comment on column public.orders.referral_broadcast_sent_at is
  'Date d''envoi de l''email d''annonce du programme parrainage. Null = pas encore envoyé. Posé par /api/admin/broadcast-referral.';
