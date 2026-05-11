-- ╭────────────────────────────────────────────────────────────────────╮
-- │ Migration 0013 — Tracking du broadcast WhatsApp de parrainage      │
-- │                                                                    │
-- │ Symétrique à la migration 0012 (email). Permet de marquer chaque   │
-- │ client à qui on a envoyé le message WhatsApp d'annonce du          │
-- │ programme parrainage, pour ne pas re-spammer si le bouton est      │
-- │ cliqué plusieurs fois.                                             │
-- ╰────────────────────────────────────────────────────────────────────╯

alter table public.orders
  add column whatsapp_broadcast_sent_at timestamptz;

comment on column public.orders.whatsapp_broadcast_sent_at is
  'Date d''envoi du message WhatsApp d''annonce du programme parrainage. Null = pas encore envoyé. Posé par /api/admin/broadcast-whatsapp.';
