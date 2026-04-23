-- ─────────────────────────────────────────────────────────────────────────────
-- Security fixes
-- 1. Revoke password_hash column from the anon role (column-level privilege)
-- 2. Upgrade existing SHA-256 hashes to bcrypt (cost 12)
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Block anon from reading password_hash ─────────────────────────────────
-- The RLS policy on portals allows SELECT * for published portals.
-- Revoking the column privilege from the anon role means the REST API
-- will never return password_hash — even if the client asks for it.
revoke select (password_hash) on portals from anon;

-- ── 2. Re-hash passwords with bcrypt (cost 12) ───────────────────────────────
-- Previous hashes were raw SHA-256 with no salt.
-- New hashes are bcrypt ($2b$12$...) generated with cost factor 12.

update portals
set password_hash = '$2b$12$oLykHq.4jTIov/BU3erAfuWh63TQWTshOWYu6h/vPpeCrCGPmX9w2'
where slug = 'capfund1';
-- CFP2Infinity — bcrypt cost 12

update portals
set password_hash = '$2b$12$eyNqHcg6L.QtXX42suK3ee7lP.MIsl.X3gW8x.f/yxxOZelNR20hq'
where slug = 'general-trucking';
-- GT2Infinity — bcrypt cost 12
