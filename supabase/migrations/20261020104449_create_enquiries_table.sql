/*
# Create enquiries table for RFQ (Request for Quote) submissions

## Purpose
Stores buyer enquiries submitted through the public RFQ form on the Setu Trade
website. Each row represents one buyer's product enquiry with their contact
details, product requirements, and trade terms.

## 1. New Tables

### `enquiries`
- `id` (uuid, primary key, auto-generated)
- `created_at` (timestamptz, defaults to now())
- `full_name` (text, not null) — buyer's full name
- `company` (text, not null) — buyer's company name
- `country` (text, not null) — buyer's country
- `city` (text, nullable) — buyer's city
- `email` (text, not null) — buyer's business email
- `phone_whatsapp` (text, not null) — buyer's phone or WhatsApp number
- `buyer_type` (text, not null) — importer, wholesaler, distributor, etc.
- `product` (text, not null) — product slug the buyer is enquiring about
- `variety_grade` (text, nullable) — buyer-specified variety or grade
- `quantity` (numeric, nullable) — requested quantity
- `unit` (text, nullable) — unit of measurement (KG, MT, carton, etc.)
- `packaging` (text, nullable) — buyer's packaging requirement
- `destination` (text, not null) — destination country for delivery
- `delivery_date` (date, nullable) — buyer's required delivery date
- `specifications` (text, nullable) — product specs / quality requirements
- `additional_message` (text, nullable) — any other details from the buyer
- `incoterm` (text, nullable) — preferred incoterm (FOB, CIF, etc.)
- `payment_terms` (text, nullable) — preferred payment terms
- `status` (text, not null, default 'new') — enquiry workflow status; managed
  internally only (public buyers cannot set this)

## 2. Security (RLS)

- Row Level Security is ENABLED on `enquiries`.
- The RFQ form is a public, no-auth form. Public buyers (the `anon` role) can
  ONLY INSERT new enquiries — they cannot SELECT, UPDATE, or DELETE any rows.
  This prevents buyers from reading other buyers' enquiries.
- Authenticated (admin) users can SELECT all enquiries so a future admin
  dashboard can review them. Admin write operations (UPDATE/DELETE) are not
  exposed to the public anon role.

### Policies
- `anon_insert_enquiries` — INSERT for `anon, authenticated`, WITH CHECK (true).
  The form is intentionally public; any valid submission is accepted.
- `admin_select_enquiries` — SELECT for `authenticated` only.
  Public anon role is deliberately excluded so buyers cannot read other buyers' RFQs.

## 3. Column-Level Protection for `status`

The `status` column has a CHECK constraint limiting it to known workflow values
('new', 'reviewed', 'responded', 'closed'). A BEFORE INSERT trigger forces the
column to 'new' on every new row regardless of what the client sends, so a
public buyer cannot set or influence the status of their own enquiry.

## 4. Indexes
- `idx_enquiries_created_at` — descending, for chronological admin listing.
- `idx_enquiries_status` — for filtering by workflow status.
- `idx_enquiries_product` — for filtering enquiries by product.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  company text NOT NULL,
  country text NOT NULL,
  city text,
  email text NOT NULL,
  phone_whatsapp text NOT NULL,
  buyer_type text NOT NULL,
  product text NOT NULL,
  variety_grade text,
  quantity numeric,
  unit text,
  packaging text,
  destination text NOT NULL,
  delivery_date date,
  specifications text,
  additional_message text,
  incoterm text,
  payment_terms text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'responded', 'closed'))
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_enquiries" ON enquiries;
CREATE POLICY "admin_select_enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_product ON enquiries (product);

-- Force status to 'new' on every new row so public buyers cannot set it.
CREATE OR REPLACE FUNCTION force_new_enquiry_status()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.status := 'new';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_force_new_enquiry_status ON enquiries;
CREATE TRIGGER trg_force_new_enquiry_status
  BEFORE INSERT ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION force_new_enquiry_status();
