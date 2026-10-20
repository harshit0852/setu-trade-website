import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PRODUCT_CATEGORIES, productRoute } from '@/data/site';
import type { ProductItem } from '@/types';

const FEATURED_SLUGS = ['potato', 'wheat', 'bajra', 'jowar', 'mustard', 'paddy-rice'];

function findProduct(slug: string): { item: ProductItem; categoryName: string } | undefined {
  for (const cat of PRODUCT_CATEGORIES) {
    const item = cat.items.find((i) => i.routeSlug === slug);
    if (item) return { item, categoryName: cat.name };
  }
  return undefined;
}

export function FeaturedProducts() {
  const featured = FEATURED_SLUGS.map(findProduct).filter(
    (p): p is { item: ProductItem; categoryName: string } => p !== undefined,
  );

  return (
    <section id="featured-products" className="scroll-mt-24 bg-charcoal-50 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="h-px w-8 bg-brand-500" />
            Featured
          </p>
          <h2 className="section-title mt-4">Featured Products</h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-600">
            A selection of agricultural products from our catalogue, available for
            international buyer enquiries.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(({ item, categoryName }, i) => (
            <FeaturedCard
              key={item.id}
              item={item}
              categoryName={categoryName}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  item,
  categoryName,
  index,
}: {
  item: ProductItem;
  categoryName: string;
  index: number;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const goRequestQuote = () => {
    if (location.pathname !== '/') {
      navigate('/#request-quote');
    } else {
      const el = document.getElementById('request-quote');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article
      className="card group flex flex-col overflow-hidden hover:shadow-card-hover animate-fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="relative h-44 overflow-hidden bg-charcoal-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3">
          <span className="inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-700 backdrop-blur-sm">
            {categoryName}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-charcoal-900">{item.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-charcoal-600">
          {item.description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <Link
            to={productRoute(item.routeSlug)}
            className="btn-secondary flex-1 px-4 py-2.5 text-sm"
          >
            View Product
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            type="button"
            onClick={goRequestQuote}
            className="btn-primary px-4 py-2.5 text-sm"
            aria-label={`Request a quote for ${item.name}`}
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
