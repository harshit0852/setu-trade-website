import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, Lock, Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAdminAuth } from '@/lib/adminAuthContext';
import { useSeo } from '@/hooks/useSeo';

export function AdminLoginPage() {
  useSeo({ title: 'Admin Login | Setu Trade', description: 'Setu Trade admin portal.' });

  const { signIn } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Sign in failed. Please check your credentials.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-950 px-5">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950" />
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-600 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand-800 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Logo />
          <h1 className="mt-6 text-2xl font-bold text-white">Admin Portal</h1>
          <p className="mt-2 text-sm text-brand-200">
            Sign in to manage buyer enquiries.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card space-y-5 p-7 sm:p-8"
        >
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" strokeWidth={1.9} />
              <div>
                <p className="text-sm font-semibold text-red-800">Sign in failed.</p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold text-charcoal-800">
              Email
            </label>
            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" strokeWidth={1.9} />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@setutrade.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-charcoal-200 bg-white py-2.5 pl-9 pr-3.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-charcoal-800">
              Password
            </label>
            <div className="relative mt-2">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" strokeWidth={1.9} />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-charcoal-200 bg-white py-2.5 pl-9 pr-3.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-base disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-brand-300">
          Authorised personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}
