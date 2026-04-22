-- ─────────────────────────────────────────────────────────────────────────────
-- Portal Passwords
-- SHA-256 hashes of each portal's password.
-- Formula: {CLIENT_INITIALS}2Infinity
-- Example: Capital Funding Partners → CFP2Infinity
-- ─────────────────────────────────────────────────────────────────────────────

-- CapFund1 / Capital Funding Partners — password: CFP2Infinity
update portals
set password_hash = 'bd88ab8007c3154029020679dcdcfe183187c81974d0d36138f5eac622b22ab3'
where slug = 'capfund1';
