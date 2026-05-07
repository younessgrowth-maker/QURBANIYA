-- ─── Mode cadeau ───
-- Avant cette migration: le formulaire OrderForm collectait déjà les champs
-- bénéficiaire/message/notify_recipient_email mais ils étaient PERDUS au submit
-- (non inclus dans orderSchema Zod, donc jamais envoyés à l'API). Tous les
-- "cadeaux" payés depuis l'ouverture sont en réalité enregistrés comme des
-- commandes pour soi-même → le bénéficiaire ne reçoit jamais sa vidéo.
--
-- Cette migration ajoute les colonnes manquantes pour persister la donnée.
-- L'envoi automatique de la vidéo au destinataire reste à câbler ensuite.

alter table public.orders
  add column if not exists is_gift boolean not null default false,
  add column if not exists recipient_name text,
  add column if not exists recipient_message text,
  add column if not exists notify_recipient boolean not null default false,
  add column if not exists recipient_email text;

-- Index utile pour les exports admin "commandes cadeau"
create index if not exists orders_is_gift_idx on public.orders (is_gift) where is_gift = true;
