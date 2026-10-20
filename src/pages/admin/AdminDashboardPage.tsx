import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, TrendingUp, FileCheck, PackageCheck, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import {
  fetchEnquiries,
  STATUS_LABELS,
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

export function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries()
      .then(setEnquiries)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load enquiries.'))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const thisMonth = enquiries.filter((e) => {
    const d = new Date(e.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const stats = [
    { label: 'Total Enquiries', value: enquiries.length, icon: Inbox },
    { label: 'This Month', value: thisMonth.length, icon: TrendingUp },
    { label: 'New', value: enquiries.filter((e) => e.status === 'new').length, icon: AlertCircle },
    { label: 'Quoted', value: enquiries.filter((e) => e.status === 'quoted').length, icon: FileCheck },
    { label: 'Order Confirmed', value: enquiries.filter((e) => e.status === 'order_confirmed').length, icon: PackageCheck },
  ];

  const latest = enquiries.slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-charcoal-900">Dashboard</h1>
        <p className="mt-1 text-sm text-charcoal-600">Overview of buyer enquiries and business metrics.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <stat.icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <div>
                <p className="text-2xl font-bold text-charcoal-900">{loading ? '—' : stat.value}</p>
                <p className="text-xs font-medium text-charcoal-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest enquiries */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-charcoal-100 p-5">
          <h2 className="text-lg font-bold text-charcoal-900">Latest Enquiries</h2>
          <Link to="/admin/enquiries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
          </div>
        ) : error ? (
          <div className="flex items-start gap-3 p-6">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" strokeWidth={1.9} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : latest.length === 0 ? (
          <div className="py-16 text-center">
            <Inbox className="mx-auto h-10 w-10 text-charcoal-300" strokeWidth={1.5} />
            <p className="mt-3 text-sm text-charcoal-500">No enquiries yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-charcoal-100">
            {latest.map((enquiry) => (
              <Link
                key={enquiry.id}
                to={`/admin/enquiries/${enquiry.id}`}
                className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-charcoal-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-charcoal-900">
                    {enquiry.full_name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-charcoal-500">
                    {enquiry.company} · {enquiry.product} · {enquiry.destination}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-charcoal-400">{formatDate(enquiry.created_at)}</span>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(enquiry.status)}`}>
                    {STATUS_LABELS[enquiry.status] ?? enquiry.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
