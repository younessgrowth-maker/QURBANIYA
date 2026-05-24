-- ══════════════════════════════════════════════════════════════════════════
-- 0020_video_paths.sql — multi-vidéos par commande
-- ══════════════════════════════════════════════════════════════════════════
--
-- Suite logique de 0018 (multi-moutons) + 0019 (multi-niyyahs). Avec une
-- commande à N moutons, le cheikh tourne N vidéos (une par mouton).
-- L'ancienne colonne `video_url text` ne peut stocker qu'un seul chemin
-- → la 2e vidéo uploadée écraserait la 1ère.
--
-- Fix : nouvelle colonne `video_paths jsonb default '[]'` qui contient
-- l'array des N paths Supabase Storage. Position dans l'array = position
-- du sacrifice dans `sacrifices[]` (donc niyyah cohérente).
--
-- Backward compat : `video_url` reste, miroir de `video_paths[0]`. Tous
-- les chemins de lecture ont un fallback `video_paths` non-vide ? lit
-- l'array : sinon retombe sur `[video_url]` pour les commandes pre-0020.
--
-- ⚠ Aucun backfill SQL — le code applicatif gère le fallback. Si un jour
-- on veut homogénéiser : un simple UPDATE plus tard.
-- ══════════════════════════════════════════════════════════════════════════

alter table public.orders
  add column if not exists video_paths jsonb not null default '[]'::jsonb;

comment on column public.orders.video_paths is
  'Array JSON des chemins Supabase Storage des vidéos de sacrifice. Longueur = quantity. La 1re entrée miroir video_url pour backward compat. Position i = vidéo du sacrifice i (intention/niyyah dans sacrifices[i]).';

-- Index GIN pour requêtes futures (analytics, recherche par path)
create index if not exists orders_video_paths_gin_idx
  on public.orders using gin (video_paths);
