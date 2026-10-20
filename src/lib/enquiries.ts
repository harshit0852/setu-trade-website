import { supabase } from '@/lib/supabase';

export interface EnquiryInput {
  full_name: string;
  company: string;
  country: string;
  city: string | null;
  email: string;
  phone_whatsapp: string;
  buyer_type: string;
  product: string;
  variety_grade: string | null;
  quantity: number | null;
  unit: string | null;
  packaging: string | null;
  destination: string;
  delivery_date: string | null;
  specifications: string | null;
  additional_message: string | null;
  incoterm: string | null;
  payment_terms: string | null;
}

export interface EnquiryRecord extends EnquiryInput {
  id: string;
  created_at: string;
  status: string;
  buyer_email_sent: boolean;
  admin_email_sent: boolean;
  email_notification_error: string | null;
}

export interface SubmitResult {
  enquiry: EnquiryRecord;
  buyerEmailSent: boolean;
  adminEmailSent: boolean;
}

async function sendEmailNotifications(record: EnquiryRecord): Promise<{
  buyerEmailSent: boolean;
  adminEmailSent: boolean;
}> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const payload = {
    enquiryId: record.id,
    fullName: record.full_name,
    company: record.company,
    country: record.country,
    city: record.city,
    email: record.email,
    phoneWhatsapp: record.phone_whatsapp,
    buyerType: record.buyer_type,
    product: record.product,
    varietyGrade: record.variety_grade,
    quantity: record.quantity,
    unit: record.unit,
    packaging: record.packaging,
    destination: record.destination,
    deliveryDate: record.delivery_date,
    specifications: record.specifications,
    additionalMessage: record.additional_message,
    incoterm: record.incoterm,
    paymentTerms: record.payment_terms,
    createdAt: record.created_at,
  };

  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/send-rfq-emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return { buyerEmailSent: false, adminEmailSent: false };

    const data = await res.json();
    return {
      buyerEmailSent: Boolean(data.buyerEmailSent),
      adminEmailSent: Boolean(data.adminEmailSent),
    };
  } catch {
    return { buyerEmailSent: false, adminEmailSent: false };
  }
}

export async function submitEnquiry(input: EnquiryInput): Promise<SubmitResult> {
  const { data, error } = await supabase
    .from('enquiries')
    .insert(input)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || 'Failed to submit enquiry.');
  }

  const record = data as EnquiryRecord;

  const emailStatus = await sendEmailNotifications(record);

  return {
    enquiry: record,
    buyerEmailSent: emailStatus.buyerEmailSent,
    adminEmailSent: emailStatus.adminEmailSent,
  };
}
