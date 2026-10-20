/*
# Fix mutable search_path on trigger function

## Purpose
The database linter flagged `force_new_enquiry_status()` as having a mutable
search_path, which is a security best-practice warning. Functions without an
explicit search_path could be exploited by an attacker who creates objects
that shadow built-in ones.

## Change
- Recreate `force_new_enquiry_status()` with `SET search_path = public, pg_temp`.
- The trigger is dropped and recreated to pick up the new function definition.

## No data changes
No rows are modified or deleted.
*/

DROP TRIGGER IF EXISTS trg_force_new_enquiry_status ON enquiries;

DROP FUNCTION IF EXISTS force_new_enquiry_status();

CREATE OR REPLACE FUNCTION force_new_enquiry_status()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.status := 'new';
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_force_new_enquiry_status
  BEFORE INSERT ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION force_new_enquiry_status();
