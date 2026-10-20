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
}

export async function submitEnquiry(input: EnquiryInput): Promise<EnquiryRecord> {
  const { data, error } = await supabase
    .from('enquiries')
    .insert(input)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || 'Failed to submit enquiry.');
  }

  return data as EnquiryRecord;
}
