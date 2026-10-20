/*
# Add email notification tracking columns to enquiries

## Purpose
Track whether the buyer confirmation email and the admin notification email
were successfully sent after an RFQ submission, and record any email delivery
errors for admin visibility.

## Changes to `enquiries` table
- `buyer_email_sent` (boolean, default false) — whether the buyer confirmation
  email was sent successfully.
- `admin_email_sent` (boolean, default false) — whether the Setu Trade
  notification email was sent successfully.
- `email_notification_error` (text, nullable) — stores any error message from
  the email sending process, visible only to admins.

## Security
- These columns are never set by the public buyer. The public INSERT policy
  remains unchanged. The edge function (server-side, service-role) updates
  these columns after attempting to send emails.
- No data loss — all existing rows get safe defaults.

## No data loss
- Uses ADD COLUMN IF NOT EXISTS so re-running is safe.
*/

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS buyer_email_sent boolean NOT NULL DEFAULT false;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS admin_email_sent boolean NOT NULL DEFAULT false;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS email_notification_error text;
