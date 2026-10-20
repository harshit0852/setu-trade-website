import { supabase } from '@/lib/supabase';

export interface AdminEnquiry {
  id: string;
  created_at: string;
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
  status: string;
  admin_notes: string | null;
}

export const ENQUIRY_STATUSES = [
  'new',
  'contacted',
  'in_progress',
  'quoted',
  'negotiating',
  'order_confirmed',
  'closed',
  'rejected',
] as const;

export const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  in_progress: 'In Progress',
  quoted: 'Quoted',
  negotiating: 'Negotiating',
  order_confirmed: 'Order Confirmed',
  closed: 'Closed',
  rejected: 'Rejected',
};

export async function fetchEnquiries(): Promise<AdminEnquiry[]> {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message || 'Failed to load enquiries.');
  return (data ?? []) as AdminEnquiry[];
}

export async function fetchEnquiry(id: string): Promise<AdminEnquiry | null> {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(error.message || 'Failed to load enquiry.');
  return data as AdminEnquiry | null;
}

export async function updateEnquiryStatus(id: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', id);

  if (error) throw new Error(error.message || 'Failed to update enquiry status.');
}

export async function updateEnquiryNotes(id: string, adminNotes: string): Promise<void> {
  const { error } = await supabase
    .from('enquiries')
    .update({ admin_notes: adminNotes })
    .eq('id', id);

  if (error) throw new Error(error.message || 'Failed to update notes.');
}
