/*
# Add UPDATE policy for authenticated admins on enquiries

## Purpose
The admin dashboard needs to update enquiry `status` and `admin_notes`. The
existing RLS setup only has INSERT (anon) and SELECT (authenticated) policies.
We add an UPDATE policy for authenticated users only.

## Security
- anon role still has only INSERT. No UPDATE, SELECT, or DELETE for anon.
- Buyers using the public form are never authenticated, so they cannot update
  any enquiry.
*/

DROP POLICY IF EXISTS "admin_update_enquiries" ON enquiries;
CREATE POLICY "admin_update_enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);
