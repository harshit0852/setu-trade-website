import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, AlertCircle, Loader2, Inbox, ChevronRight } from 'lucide-react';
import {
  fetchEnquiries,
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

function exportCsv(enquiries: AdminEnquiry[]): void {
  const headers = [
    'Date', 'Buyer Name', 'Company', 'Country', 'City', 'Email', 'Phone/WhatsApp',
    'Buyer Type', 'Product', 'Variety/Grade', 'Quantity', 'Unit', 'Packaging',
    'Destination', 'Delivery Date', 'Incoterm', 'Payment Terms', 'Status', 'Notes',
  ];

  const escapeCsv = (val: string | null | undefined): string => {
    if (val == null) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = enquiries.map((e) => [
    formatDate(e.created_at),
    e.full_name, e.company, e.country, e.city, e.email, e.phone_whatsapp,
    e.buyer_type, e.product, e.variety_grade,
    e.quantity != null ? String(e.quantity) : '',
    e.unit, e.packaging, e.destination, e.delivery_date,
    e.incoterm, e.payment_terms, STATUS_LABELS[e.status] ?? e.status, e.admin_notes,
  ].map(escapeCsv).join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `setutrade-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function AdminEnquiriesPage() {
  const [allEnquiries, setAllEnquiries] = useState<AdminEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchEnquiries()
      .then(setAllEnquiries)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load enquiries.'))
      .finally(() => setLoading(false));
  }, []);

  const productOptions = useMemo(
    () => [...new Set(allEnquiries.map((e) => e.product))].sort(),
    [allEnquiries],
  );
  const countryOptions = useMemo(
    () => [...new Set(allEnquiries.map((e) => e.country))].sort(),
    [allEnquiries],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allEnquiries.filter((e) => {
      if (q) {
        const haystack = [e.full_name, e.company, e.email, e.country, e.product]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (statusFilter && e.status !== statusFilter) return false;
      if (productFilter && e.product !== productFilter) return false;
      if (countryFilter && e.country !== countryFilter) return false;
      if (dateFilter) {
        const eDate = new Date(e.created_at).toISOString().slice(0, 10);
        if (eDate !== dateFilter) return false;
      }
      return true;
    });
  }, [allEnquiries, search, statusFilter, productFilter, countryFilter, dateFilter]);

  const selectClass =
    'rounded-lg border border-charcoal-200 bg-white py-2 px-3 text-sm text-charcoal-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900">Buyer Enquiries</h1>
          <p className="mt-1 text-sm text-charcoal-600">All enquiries submitted through Request a Quote.</p>
        </div>
        <button
          onClick={() => exportCsv(filtered)}
          disabled={filtered.length === 0}
          className="btn-secondary text-sm disabled:pointer-events-none disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" strokeWidth={1.9} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, company, email, country, product…"
              className="w-full rounded-lg border border-charcoal-200 bg-white py-2 pl-9 pr-3 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
            <option value="">All statuses</option>
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
          <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className={selectClass}>
            <option value="">All products</option>
            {productOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className={selectClass}>
              <option value="">All countries</option>
              {countryOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={`${selectClass} shrink-0`}
              title="Filter by date"
            />
          </div>
        </div>
        {(search || statusFilter || productFilter || countryFilter || dateFilter) && (
          <button
            onClick={() => { setSearch(''); setStatusFilter(''); setProductFilter(''); setCountryFilter(''); setDateFilter(''); }}
            className="mt-3 text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
          </div>
        ) : error ? (
          <div className="flex items-start gap-3 p-6">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" strokeWidth={1.9} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Inbox className="mx-auto h-10 w-10 text-charcoal-300" strokeWidth={1.5} />
            <p className="mt-3 text-sm text-charcoal-500">
              {allEnquiries.length === 0 ? 'No enquiries have been submitted yet.' : 'No enquiries match your filters.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <table className="hidden w-full text-left md:table">
              <thead>
                <tr className="border-b border-charcoal-100 text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Buyer</th>
                  <th className="px-5 py-3">Company</th>
                  <th className="px-5 py-3">Country</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Qty</th>
                  <th className="px-5 py-3">Destination</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {filtered.map((e) => (
                  <tr key={e.id} className="transition-colors hover:bg-charcoal-50">
                    <td className="whitespace-nowrap px-5 py-3 text-xs text-charcoal-500">{formatDate(e.created_at)}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-charcoal-900">{e.full_name}</td>
                    <td className="px-5 py-3 text-sm text-charcoal-600">{e.company}</td>
                    <td className="px-5 py-3 text-sm text-charcoal-600">{e.country}</td>
                    <td className="px-5 py-3 text-sm text-charcoal-600">{e.product}</td>
                    <td className="px-5 py-3 text-sm text-charcoal-600">
                      {e.quantity != null ? `${e.quantity} ${e.unit ?? ''}`.trim() : '—'}
                    </td>
                    <td className="px-5 py-3 text-sm text-charcoal-600">{e.destination}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(e.status)}`}>
                        {STATUS_LABELS[e.status] ?? e.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link to={`/admin/enquiries/${e.id}`} className="inline-flex items-center text-brand-700 hover:text-brand-800">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile cards */}
            <div className="divide-y divide-charcoal-100 md:hidden">
              {filtered.map((e) => (
                <Link
                  key={e.id}
                  to={`/admin/enquiries/${e.id}`}
                  className="block p-4 transition-colors hover:bg-charcoal-50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-charcoal-900">{e.full_name}</p>
                      <p className="mt-0.5 truncate text-xs text-charcoal-500">{e.company}</p>
                    </div>
                    <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-xs font-medium ${statusBadgeClass(e.status)}`}>
                      {STATUS_LABELS[e.status] ?? e.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-charcoal-500">
                    <span>{e.product}</span>
                    <span>·</span>
                    <span>{e.destination}</span>
                    <span>·</span>
                    <span>{formatDate(e.created_at)}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-charcoal-100 px-5 py-3 text-xs text-charcoal-500">
              Showing {filtered.length} of {allEnquiries.length} enquiries
            </div>
          </>
        )}
      </div>
    </div>
  );
}
