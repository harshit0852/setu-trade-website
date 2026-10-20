import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { SuppliersPage } from '@/pages/SuppliersPage';
import { RequestQuotePage } from '@/pages/RequestQuotePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminAuthProvider } from '@/lib/adminAuth';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminEnquiriesPage } from '@/pages/admin/AdminEnquiriesPage';
import { AdminEnquiryDetailPage } from '@/pages/admin/AdminEnquiryDetailPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/request-quote" element={<RequestQuotePage />} />

          <Route
            path="/admin/login"
            element={
              <AdminAuthProvider>
                <AdminLoginPage />
              </AdminAuthProvider>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminAuthProvider>
                <AdminLayout />
              </AdminAuthProvider>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="enquiries/:id" element={<AdminEnquiryDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
