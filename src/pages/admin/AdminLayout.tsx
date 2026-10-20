import { useState } from 'react';
import { NavLink, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, Inbox, LogOut, Menu, X, Loader2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAdminAuth } from '@/lib/adminAuthContext';
import { useSeo } from '@/hooks/useSeo';

export function AdminLayout() {
  useSeo({ title: 'Admin Dashboard | Setu Trade', description: 'Setu Trade admin portal.', noindex: true });

  const { user, loading, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal-50">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/enquiries', label: 'Buyer Enquiries', icon: Inbox, end: false },
  ];

  const sidebarContent = (
    <>
      <div className="px-5 py-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-700 text-white'
                  : 'text-charcoal-600 hover:bg-charcoal-100 hover:text-charcoal-900'
              }`
            }
          >
            <item.icon className="h-4 w-4" strokeWidth={1.9} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-charcoal-100 p-3">
        <div className="px-3 py-2">
          <p className="truncate text-xs text-charcoal-500">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.9} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-charcoal-100 bg-white lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-charcoal-900/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white lg:hidden">
            {sidebarContent}
          </aside>
        </>
      )}

      <div className="lg:pl-64">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-charcoal-100 bg-white/90 px-5 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 rounded-lg p-2 text-charcoal-600 hover:bg-charcoal-50"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-charcoal-800">Admin</span>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-lg p-2 text-charcoal-600 hover:bg-charcoal-50"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        <main className="container-page py-6 sm:py-8 lg:py-10">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar close button */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed right-4 top-4 z-[60] rounded-lg bg-white p-2 shadow-card lg:hidden"
        >
          <X className="h-5 w-5 text-charcoal-600" />
        </button>
      )}
    </div>
  );
}
