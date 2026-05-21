-- ─── Rappel J-7 (email "rappel sacrifice + confirme WhatsApp") ───
-- Avant: la promesse "Rappel à J-7" est affichée sur la page de confirmation
-- et dans le template d'email de commande, mais aucun cron ne l'envoie.
-- Découvert le 2026-05-21 (J-6 de l'Aïd) suite à une réclamation client.
--
-- Cette migration ajoute aid_reminder_sent_at pour rendre l'envoi idempotent :
-- le cron peut être déclenché plusieurs fois (manuel + automatique) sans
-- risque de double envoi.

alter table public.orders
  add column if not exists aid_reminder_sent_at timestamptz;

-- Index partiel : "commandes payées non encore rappelées"
create index if not exists orders_aid_reminder_pending_idx
  on public.orders (created_at)
  where payment_status = 'paid' and aid_reminder_sent_at is null;
