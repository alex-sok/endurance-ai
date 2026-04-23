-- ─────────────────────────────────────────────────────────────────────────────
-- Portal Passwords
-- SHA-256 hashes (superseded by bcrypt in 006_security_fixes.sql).
-- Passwords are set by the admin at portal creation time.
-- Do not document plaintext passwords or derivation formulas in source files.
-- ─────────────────────────────────────────────────────────────────────────────

-- CapFund1 / Capital Funding Partners
update portals
set password_hash = 'bd88ab8007c3154029020679dcdcfe183187c81974d0d36138f5eac622b22ab3'
where slug = 'capfund1';
