/*
# Restrict anon privileges on enquiries table

## Purpose
The default Postgres grants on the `enquiries` table give the `anon` role
SELECT, INSERT, UPDATE, and DELETE privileges. While RLS policies already
prevent anon from reading (no SELECT policy exists for anon), we tighten
column-level privileges so the anon role can ONLY INSERT — it cannot SELECT,
UPDATE, or DELETE enquiries at all. This is defense-in-depth: even if a policy
were accidentally changed, the privilege grant itself blocks the operation.

## Changes
- REVOKE all privileges on `enquiries` from `anon`.
- GRANT only INSERT on `enquiries` to `anon`.
- Grant full CRUD to `authenticated` (for the future admin dashboard).

## No data changes
No rows are modified or deleted.
*/

REVOKE ALL PRIVILEGES ON enquiries FROM anon;
GRANT INSERT ON enquiries TO anon;

REVOKE ALL PRIVILEGES ON enquiries FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON enquiries TO authenticated;
