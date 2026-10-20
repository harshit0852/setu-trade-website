/*
# Add UPDATE policy for authenticated admins on enquiries

## Purpose
The admin dashboard needs to update enquiry `status` and `admin_notes`. The
existing RLS setup only has INSERT (anon) and SELECT (authenticated) policies.
We add an UPDATE policy for authenticated users only.

## Changes
- Add `admin_update_enquiries` UPDATE policy for `authenticated` role.
  No WITH CHECK restriction — authenticated admins can update any enquiry.
- Grant UPDATE on `enquiries` to `authenticated` (already has all CRUD
  privileges from the previous migration, but this is explicit).

## Security
- anon role still has only INSERT. No UPDATE, SELECT, or DELETE for anon.
- Buyers using the public form are never authenticated, so they cannot update
  any enquiry.
*/
