-- Qurbaniya — Phase B : automatisation envoi vidéos aux clients
-- À exécuter dans le SQL editor Supabase (dashboard → SQL → New query)
-- Prérequis : migrations 0001_init.sql et 0002_analytics.sql déjà appliquées.

-- ─── Colonne video_url sur orders ───
-- Stocke le chemin dans le bucket Supabase Storage (ex: "2026/042-yassine.mp4").
-- L'URL signée 90 jours est générée à la volée dans l'endpoint d'envoi email.
alter table public.orders add column if not exists video_url text;

-- ─── Bucket Supabase Storage : sacrifice-videos ───
-- Privé. Seul le service_role (backend) peut lire/écrire ; les clients reçoivent
-- des signed URLs par email (expire après 90 jours).
insert into storage.buckets (id, name, public)
values ('sacrifice-videos', 'sacrifice-videos', false)
on conflict (id) do nothing;

-- ─── Policies RLS sur storage.objects pour le bucket sacrifice-videos ───
-- Les service_role bypass les RLS par défaut, mais on ajoute une policy explicite
-- pour que ce soit clair. Aucune lecture/écriture anonyme.
drop policy if exists "sacrifice_videos_service_role_all" on storage.objects;
create policy "sacrifice_videos_service_role_all"
  on storage.objects
  for all
  to service_role
  using (bucket_id = 'sacrifice-videos')
  with check (bucket_id = 'sacrifice-videos');
