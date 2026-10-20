import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Handshake } from 'lucide-react';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { trackEvent } from '@/lib/tracking';

export function CallToAction() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-page space-y-6">
        <BuyerCTA />
        <SupplierCTA />
      </div>
    </section>
  );
}

function BuyerCTA() {
  return (
    <div
      id="request-quote"
      className="card group flex scroll-mt-24 flex-col items-start p-8 hover:shadow-card-hover sm:p-10 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="max-w-2xl">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white">
          <FileText className="h-6 w-6" strokeWidth={1.9} />
        </span>
        <p className="eyebrow mt-6">For Buyers</p>
        <h3 className="mt-2 text-2xl font-bold text-charcoal-900 sm:text-3xl">
          Looking for Agricultural Products from India?
        </h3>
        <p className="mt-3 text-base leading-relaxed text-charcoal-600">
          Tell us what product you need, the required quantity, specification and
          destination. Our team can review your requirement.
        </p>
      </div>
      <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row lg:mt-0 lg:w-auto lg:flex-col lg:items-end">
        <Link to="/request-quote" className="btn-primary text-base" onClick={() => trackEvent('request_quote_click', { source: 'homepage_cta' })}>
          Request a Quote
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link to="/contact" className="btn-secondary text-base">
            Contact Us
          </Link>
          <WhatsAppButton context="general" source="homepage_cta" />
        </div>
      </div>
    </div>
  );
}

function SupplierCTA() {
  return (
    <div
      id="become-supplier"
      className="card group flex scroll-mt-24 flex-col items-start p-8 hover:shadow-card-hover sm:p-10 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="max-w-2xl">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-earth-600 text-white">
          <Handshake className="h-6 w-6" strokeWidth={1.9} />
        </span>
        <p className="eyebrow mt-6">For Suppliers</p>
        <h3 className="mt-2 text-2xl font-bold text-charcoal-900 sm:text-3xl">
          Are You a Farmer, FPO, Trader or Supplier?
        </h3>
        <p className="mt-3 text-base leading-relaxed text-charcoal-600">
          Share your available agricultural products and supply details with Setu Trade
          for potential sourcing opportunities.
        </p>
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0">
        <Link to="/suppliers" className="btn-primary text-base">
          Become a Supplier
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <WhatsAppButton context="supplier" source="supplier_cta" />
      </div>
    </div>
  );
}
