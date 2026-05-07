-- ─── Tracking d'envoi de l'email de confirmation ───
-- Avant: si Resend tombe ou rate l'envoi du confirmation email après
-- checkout.session.completed, le webhook log juste un console.error mais
-- aucune trace côté DB. Le client a payé via Stripe mais ne reçoit rien
-- de Qurbaniya → support à l'aveugle (Youness ne sait pas qui relancer).
--
-- Cette migration ajoute 2 colonnes pour tracer:
--   - confirmation_email_sent_at: timestamp du dernier envoi réussi
--   - confirmation_email_error:   message d'erreur Resend tronqué (200 chars)
--
-- L'admin UI peut alors filtrer les commandes "paid avec email_sent_at NULL"
-- ou "paid avec email_error" pour relancer manuellement.

alter table public.orders
  add column if not exists confirmation_email_sent_at timestamptz,
  add column if not exists confirmation_email_error text;

-- Index partiel pour retrouver vite les commandes payées sans email envoyé
create index if not exists orders_email_pending_idx
  on public.orders (created_at desc)
  where payment_status = 'paid' and confirmation_email_sent_at is null;
