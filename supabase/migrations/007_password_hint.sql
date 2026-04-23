-- ─────────────────────────────────────────────────────────────────────────────
-- Add password_hint column to portals
--
-- Stores a masked display string (e.g. "GT****") shown in Slack notifications.
-- This decouples the Slack webhook from any password derivation formula —
-- the webhook just reads whatever hint was set at seed time.
-- ─────────────────────────────────────────────────────────────────────────────

alter table portals add column if not exists password_hint text;

-- Set hints for existing portals
update portals set password_hint = 'CFP****' where slug = 'capfund1';
update portals set password_hint = 'GT****'  where slug = 'general-trucking';
