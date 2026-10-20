import { Link } from 'react-router-dom';
import { ArrowRight, Sprout } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function SuppliersPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-[70vh] items-center justify-center bg-white pt-[4.5rem]">
        <div className="container-page max-w-xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <Sprout className="h-8 w-8" strokeWidth={1.8} />
          </span>
          <h1 className="mt-6 text-3xl font-bold text-charcoal-900 sm:text-4xl">
            Become a Supplier
          </h1>
          <p className="mt-4 text-base leading-relaxed text-charcoal-600">
            Share your available agricultural products and supply details with Setu Trade
            for potential sourcing opportunities. The supplier registration form will be
            available here soon.
          </p>
          <p className="mt-3 text-sm text-charcoal-500">
            In the meantime, please reach out through the contact section.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/#request-quote" className="btn-primary">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
