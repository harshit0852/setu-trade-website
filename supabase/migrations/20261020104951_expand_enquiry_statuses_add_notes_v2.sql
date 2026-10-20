/*
# Expand enquiry statuses and add admin_notes column

## Purpose
1. Expand the allowed `status` values on the `enquiries` table to support the
   full admin workflow: new, contacted, in_progress, quoted, negotiating,
   order_confirmed, closed, rejected.
2. Add an `admin_notes` column for internal follow-up notes that are never
   visible to buyers.

## Changes to `enquiries` table
- Drop the old CHECK constraint on `status` (limited to 4 values).
- Add a new CHECK constraint allowing all 8 workflow statuses.
- Default remains 'new'.
- New column `admin_notes` (text, nullable) — internal admin use only.

## Security
- No RLS policy changes. The `admin_notes` column is protected by the existing
  RLS setup: anon can only INSERT (and the public form never sends admin_notes),
  authenticated admins can SELECT/UPDATE.
- The BEFORE INSERT trigger `force_new_enquiry_status` still forces status='new'
  on every new public submission.

## No data loss
- All existing rows keep their data.
*/

ALTER TABLE enquiries DROP CONSTRAINT IF EXISTS enquiries_status_check;

ALTER TABLE enquiries ADD CONSTRAINT enquiries_status_check
  CHECK (status IN ('new', 'contacted', 'in_progress', 'quoted', 'negotiating', 'order_confirmed', 'closed', 'rejected'));

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS admin_notes text;
