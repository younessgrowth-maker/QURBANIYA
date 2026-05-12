-- ╭────────────────────────────────────────────────────────────────────╮
-- │ Migration 0014 — Table des désinscriptions email                   │
-- │                                                                    │
-- │ Stocke les emails qui ont cliqué le bouton "Se désabonner" (header │
-- │ List-Unsubscribe RFC 2369 / one-click RFC 8058). Permet :          │
-- │  - de skipper l'envoi marketing (broadcast, review, abandoned)     │
-- │  - de garder l'historique des opt-out pour audit RGPD              │
-- │                                                                    │
-- │ Les emails transactionnels (confirmation paiement, vidéo, jour de  │
-- │ l'Aïd) ne sont PAS bloqués : exception légale pour les emails liés │
-- │ à l'exécution d'une commande payée.                                │
-- ╰────────────────────────────────────────────────────────────────────╯

create table public.email_unsubscribes (
  email           text primary key,
  unsubscribed_at timestamptz not null default now(),
  source          text,                       -- "one_click", "page", "admin"
  reason          text                        -- libre, fourni si user le souhaite
);

comment on table public.email_unsubscribes is
  'Liste des emails qui ne doivent plus recevoir d''envois marketing. Email = PK pour idempotency naturelle.';

create index email_unsubscribes_unsubscribed_at_idx
  on public.email_unsubscribes (unsubscribed_at desc);
