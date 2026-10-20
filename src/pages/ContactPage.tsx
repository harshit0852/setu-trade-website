import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  PackageSearch,
  Sprout,
  Leaf,
  Mail,
  FileText,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useSeo } from '@/hooks/useSeo';
import { trackEvent } from '@/lib/tracking';

const CONTACT_CARDS = [
  {
    icon: FileText,
    title: 'Request a Quote',
    text: 'Submit a detailed product enquiry with your product, quantity, specification and destination requirements.',
    actionLabel: 'Submit RFQ',
    actionLink: '/request-quote',
    trackSource: 'contact_rfq',
  },
  {
    icon: PackageSearch,
    title: 'Product Enquiries',
    text: 'Share the product, quantity, specification and destination you are interested in discussing.',
    actionLabel: 'Browse Products',
    actionLink: '/products',
    trackSource: 'contact_products',
  },
  {
    icon: Sprout,
    title: 'Supplier Enquiries',
    text: 'Farmers, FPOs, traders and suppliers can contact Setu Trade regarding potential sourcing opportunities.',
    actionLabel: 'Become a Supplier',
    actionLink: '/suppliers',
    trackSource: 'contact_supplier',
  },
];

export function ContactPage() {
  useSeo({
    title: 'Contact Setu Trade | Indian Agro Products',
    description:
      'Contact Setu Trade for product enquiries, sourcing requirements and business discussions. Request a quote or connect via WhatsApp.',
    path: '/contact',
  });

  return (
    <>
      <Header />
      <div className="pt-[4.5rem]">
        {/* Page header */}
        <section className="border-b border-charcoal-100 bg-white">
          <div className="container-page py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="eyebrow">
                <span className="h-px w-8 bg-brand-500" />
                Contact
              </p>
              <h1 className="section-title mt-4">Contact Setu Trade</h1>
              <p className="mt-4 text-lg leading-relaxed text-charcoal-600">
                For product enquiries, sourcing requirements and business discussions,
                contact Setu Trade.
              </p>
            </div>
          </div>
        </section>

        {/* Contact cards */}
        <section className="bg-white py-14 sm:py-20">
          <div className="container-page">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CONTACT_CARDS.map((card, i) => (
                <div
                  key={card.title}
                  className="card flex flex-col p-7 hover:shadow-card-hover animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <card.icon className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold text-charcoal-900">
                    {card.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">
                    {card.text}
                  </p>
                  <Link
                    to={card.actionLink}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                    onClick={() => trackEvent(card.title === 'Request a Quote' ? 'request_quote_click' : 'product_enquiry_click', { source: card.trackSource })}
                  >
                    {card.actionLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Communication channels */}
        <section className="bg-charcoal-50 py-14">
          <div className="container-page">
            <div className="max-w-2xl">
              <p className="eyebrow">
                <span className="h-px w-8 bg-brand-500" />
                Communication Channels
              </p>
              <h2 className="mt-4 text-2xl font-bold text-charcoal-900">
                Ways to Reach Setu Trade
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
                Choose the channel that suits you best. Request a Quote is the most detailed option for product enquiries.
              </p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="card flex flex-col p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <FileText className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-charcoal-900">Request a Quote</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">
                  Submit a structured enquiry with product, quantity, specification and destination details.
                </p>
                <Link to="/request-quote" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800" onClick={() => trackEvent('request_quote_click', { source: 'contact_channels' })}>
                  Submit RFQ
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="card flex flex-col p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#1da851]">
                  <Briefcase className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-charcoal-900">WhatsApp</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">
                  Chat with Setu Trade on WhatsApp for quick product and sourcing enquiries.
                </p>
                <div className="mt-4">
                  <WhatsAppButton context="general" source="contact_channels" />
                </div>
              </div>
              <div className="card flex flex-col p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal-50 text-charcoal-400">
                  <Mail className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-charcoal-900">Email</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">
                  Email address will be shared here once configured.
                </p>
                <p className="mt-4 text-sm text-charcoal-400">Available on request</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-950 py-16">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 text-brand-400">
                <Leaf className="h-6 w-6" strokeWidth={1.9} />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                Have a Product Requirement?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-brand-200">
                Tell us what agricultural product you are looking for, along with quantity,
                specification and destination.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/request-quote" className="btn-primary text-base" onClick={() => trackEvent('request_quote_click', { source: 'contact_cta' })}>
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton context="general" source="contact_cta" variant="dark" />
                <Link
                  to="/suppliers"
                  className="btn border border-brand-700 bg-brand-900/40 px-5 py-3 text-base text-white hover:bg-brand-800/60"
                >
                  Become a Supplier
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
