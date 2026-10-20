import { ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ABOUT_IMAGE =
  'https://images.pexels.com/photos/20238486/pexels-photo-20238486.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export function About() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollTo = (hash: string) => {
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={ABOUT_IMAGE}
                alt="Indian farmer in an agricultural field"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/30 to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="eyebrow">
              <span className="h-px w-8 bg-brand-500" />
              About Setu Trade
            </p>
            <h2 className="section-title mt-4">
              A bridge between Indian agriculture and international buyers
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-600">
              Setu Trade is an India-based agricultural trading company. The word
              <span className="font-semibold text-charcoal-800"> Setu</span> means
              <span className="font-semibold text-charcoal-800"> bridge</span> — and that
              is what we aim to do: connect international buyers with Indian agricultural
              products including fresh vegetables, agro products, millets and organic produce.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              We work with buyer-specified requirements across product, quantity, packaging
              and destination, coordinating sourcing and export documentation according to
              each transaction.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => scrollTo('#request-quote')} className="btn-primary">
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/suppliers" className="btn-secondary">
                Become a Supplier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
