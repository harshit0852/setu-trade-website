import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Loader2, AlertCircle, Save, CircleCheck, User, Package, Tag, FileText, Mail,
} from 'lucide-react';
import {
  fetchEnquiry,
  updateEnquiryStatus,
  updateEnquiryNotes,
  STATUS_LABELS,
  ENQUIRY_STATUSES,
  type AdminEnquiry,
} from '@/lib/adminEnquiries';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function statusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    new: 'bg-blue-50 text-blue-700 border-blue-200',
    contacted: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
    quoted: 'bg-violet-50 text-violet-700 border-violet-200',
    negotiating: 'bg-orange-50 text-orange-700 border-orange-200',
    order_confirmed: 'bg-brand-50 text-brand-700 border-brand-200',
    closed: 'bg-charcoal-100 text-charcoal-700 border-charcoal-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  };
  return map[status] ?? 'bg-charcoal-100 text-charcoal-700 border-charcoal-200';
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="py-2.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-charcoal-400">{label}</dt>
      <dd className="mt-0.5 text-sm text-charcoal-800">{value || '—'}</dd>
    </div>
  );
}

function DetailSection({
  number, icon: Icon, title, children,
}: {
  number: string; icon: typeof User; title: string; children: React.ReactNode;
}) {
  return (
    <section className="card overflow-hidden">
      <div className="flex items-center gap-4 border-b border-charcoal-100 bg-charcoal-50/50 p-5 sm:p-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-white">
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Step {number}</p>
          <h2 className="mt-0.5 text-lg font-bold text-charcoal-900">{title}</h2>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <dl className="grid gap-x-6 sm:grid-cols-2">{children}</dl>
      </div>
    </section>
  );
}

export function AdminEnquiryDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [enquiry, setEnquiry] = useState<AdminEnquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusSaving, setStatusSaving] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [notes, setNotes] = useState('');
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [notesSuccess, setNotesSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchEnquiry(id)
      .then((data) => {
        setEnquiry(data);
        setNotes(data?.admin_notes ?? '');
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load enquiry.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!enquiry || statusSaving) return;
    setStatusSaving(true);
    setStatusError(null);
    setStatusSuccess(false);
    try {
      await updateEnquiryStatus(enquiry.id, newStatus);
      setEnquiry({ ...enquiry, status: newStatus });
      setStatusSuccess(true);
      setTimeout(() => setStatusSuccess(false), 2500);
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : 'Failed to update status.');
    } finally {
      setStatusSaving(false);
    }
  };

  const handleNotesSave = async () => {
    if (!enquiry || notesSaving) return;
    setNotesSaving(true);
    setNotesError(null);
    setNotesSuccess(false);
    try {
      await updateEnquiryNotes(enquiry.id, notes);
      setEnquiry({ ...enquiry, admin_notes: notes });
      setNotesSuccess(true);
      setTimeout(() => setNotesSuccess(false), 2500);
    } catch (err) {
      setNotesError(err instanceof Error ? err.message : 'Failed to save notes.');
    } finally {
      setNotesSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Link to="/admin/enquiries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
          <ArrowLeft className="h-4 w-4" /> Back to Enquiries
        </Link>
        <div className="card flex items-start gap-3 p-6">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" strokeWidth={1.9} />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="space-y-4">
        <Link to="/admin/enquiries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
          <ArrowLeft className="h-4 w-4" /> Back to Enquiries
        </Link>
        <div className="card p-6 text-center text-sm text-charcoal-500">Enquiry not found.</div>
      </div>
    );
  }

  const selectClass =
    'rounded-lg border border-charcoal-200 bg-white py-2.5 px-3.5 text-sm text-charcoal-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:opacity-60';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/admin/enquiries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
            <ArrowLeft className="h-4 w-4" /> Back to Enquiries
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-charcoal-900">{enquiry.full_name}</h1>
          <p className="mt-0.5 text-sm text-charcoal-500">
            {enquiry.company} · {formatDate(enquiry.created_at)}
          </p>
        </div>
        <span className={`inline-flex items-center self-start rounded-full border px-3 py-1 text-sm font-medium ${statusBadgeClass(enquiry.status)}`}>
          {STATUS_LABELS[enquiry.status] ?? enquiry.status}
        </span>
      </div>

      {/* Status manager */}
      <div className="card p-5 sm:p-6">
        <h2 className="text-lg font-bold text-charcoal-900">Status Management</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={enquiry.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={statusSaving}
            className={`${selectClass} sm:w-64`}
          >
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
          {statusSaving && <Loader2 className="h-4 w-4 animate-spin text-brand-600" />}
          {statusSuccess && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
              <CircleCheck className="h-4 w-4" /> Status updated
            </span>
          )}
          {statusError && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700">
              <AlertCircle className="h-4 w-4" /> {statusError}
            </span>
          )}
        </div>
      </div>

      {/* Buyer info */}
      <DetailSection number="01" icon={User} title="Buyer Information">
        <DetailRow label="Full Name" value={enquiry.full_name} />
        <DetailRow label="Company" value={enquiry.company} />
        <DetailRow label="Country" value={enquiry.country} />
        <DetailRow label="City" value={enquiry.city} />
        <DetailRow label="Email" value={enquiry.email} />
        <DetailRow label="Phone / WhatsApp" value={enquiry.phone_whatsapp} />
        <DetailRow label="Buyer Type" value={enquiry.buyer_type} />
      </DetailSection>

      {/* Product requirement */}
      <DetailSection number="02" icon={Package} title="Product Requirement">
        <DetailRow label="Product" value={enquiry.product} />
        <DetailRow label="Variety / Grade" value={enquiry.variety_grade} />
        <DetailRow label="Quantity" value={enquiry.quantity != null ? `${enquiry.quantity} ${enquiry.unit ?? ''}`.trim() : null} />
        <DetailRow label="Unit" value={enquiry.unit} />
        <DetailRow label="Packaging" value={enquiry.packaging} />
        <DetailRow label="Destination" value={enquiry.destination} />
        <DetailRow label="Delivery Date" value={enquiry.delivery_date ? formatDate(enquiry.delivery_date) : null} />
        <DetailRow label="Specifications" value={enquiry.specifications} />
        <DetailRow label="Additional Message" value={enquiry.additional_message} />
      </DetailSection>

      {/* Commercial requirements */}
      <DetailSection number="03" icon={Tag} title="Commercial Requirements">
        <DetailRow label="Incoterm" value={enquiry.incoterm} />
        <DetailRow label="Payment Terms" value={enquiry.payment_terms} />
      </DetailSection>

      {/* Admin notes */}
      <section className="card overflow-hidden">
        <div className="flex items-center gap-4 border-b border-charcoal-100 bg-charcoal-50/50 p-5 sm:p-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-white">
            <FileText className="h-5 w-5" strokeWidth={1.9} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-charcoal-900">Internal Admin Notes</h2>
            <p className="mt-0.5 text-xs text-charcoal-500">Not visible to the buyer.</p>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Record follow-up information, call notes, internal context…"
            className="w-full resize-y rounded-lg border border-charcoal-200 bg-white p-3.5 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={handleNotesSave}
              disabled={notesSaving}
              className="btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {notesSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Notes
            </button>
            {notesSuccess && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                <CircleCheck className="h-4 w-4" /> Notes saved
              </span>
            )}
            {notesError && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700">
                <AlertCircle className="h-4 w-4" /> {notesError}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* System info */}
      <section className="card p-5 sm:p-6">
        <h2 className="text-lg font-bold text-charcoal-900">System</h2>
        <dl className="mt-4 grid gap-x-6 sm:grid-cols-3">
          <DetailRow label="Enquiry ID" value={enquiry.id} />
          <DetailRow label="Created" value={formatDateTime(enquiry.created_at)} />
          <DetailRow label="Current Status" value={STATUS_LABELS[enquiry.status] ?? enquiry.status} />
        </dl>
      </section>

      {/* Email notification status */}
      <section className="card overflow-hidden">
        <div className="flex items-center gap-4 border-b border-charcoal-100 bg-charcoal-50/50 p-5 sm:p-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-white">
            <Mail className="h-5 w-5" strokeWidth={1.9} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-charcoal-900">Email Notifications</h2>
            <p className="mt-0.5 text-xs text-charcoal-500">Delivery status for this enquiry.</p>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <dl className="grid gap-x-6 sm:grid-cols-2">
            <div className="py-2.5">
              <dt className="text-xs font-medium uppercase tracking-wide text-charcoal-400">Buyer Confirmation Email</dt>
              <dd className="mt-0.5">
                {enquiry.buyer_email_sent ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                    <CircleCheck className="h-4 w-4" /> Sent
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-500">
                    <AlertCircle className="h-4 w-4" /> Not sent
                  </span>
                )}
              </dd>
            </div>
            <div className="py-2.5">
              <dt className="text-xs font-medium uppercase tracking-wide text-charcoal-400">Admin Notification Email</dt>
              <dd className="mt-0.5">
                {enquiry.admin_email_sent ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                    <CircleCheck className="h-4 w-4" /> Sent
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-500">
                    <AlertCircle className="h-4 w-4" /> Not sent
                  </span>
                )}
              </dd>
            </div>
          </dl>
          {enquiry.email_notification_error && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-semibold text-amber-800">Email Delivery Error</p>
              <p className="mt-1 text-xs text-amber-700">{enquiry.email_notification_error}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
