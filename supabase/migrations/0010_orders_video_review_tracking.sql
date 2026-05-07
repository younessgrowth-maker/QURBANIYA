-- ─── Tracking timestamps vidéo envoyée + relance avis ───
-- Avant: la colonne video_sent (boolean) ne donne pas l'heure exacte d'envoi.
-- Pour relancer les clients J+3 après réception de la vidéo (demande d'avis
-- Google), on a besoin du timestamp.
--
-- 0010 ajoute:
--   - video_sent_at: posé par /api/admin/videos/send au moment de l'envoi
--   - review_request_sent_at: posé par le cron /api/cron/review-requests
--     pour assurer qu'on n'envoie le mail qu'une seule fois par commande

alter table public.orders
  add column if not exists video_sent_at timestamptz,
  add column if not exists review_request_sent_at timestamptz;

-- Index partiel: trouve vite les commandes éligibles à la relance
-- (vidéo envoyée mais avis pas encore demandé)
create index if not exists orders_review_request_pending_idx
  on public.orders (video_sent_at desc)
  where video_sent_at is not null
    and review_request_sent_at is null;

-- Backfill: on considère que les vidéos déjà envoyées (video_sent=true sans
-- timestamp) ont été envoyées au moment de updated_at. Best-effort, le cron
-- ignorera celles trop anciennes pour éviter de spammer.
update public.orders
set video_sent_at = updated_at
where video_sent = true
  and video_sent_at is null;
