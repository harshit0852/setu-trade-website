import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCT_CATEGORIES, productRoute } from '@/data/site';
import type { ProductCategory } from '@/types';

export function ProductCategories() {
  return (
    <section id="products" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="h-px w-8 bg-brand-500" />
            Product Catalogue
          </p>
          <h2 className="section-title mt-4">Explore Our Products</h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-600">
            Explore agricultural products sourced from India for international buyers
            and business requirements.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.slug} category={cat} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/products" className="btn-secondary">
            Browse All Products
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: ProductCategory; index: number }) {
  const navigate = useNavigate();

  const viewCategory = () => {
    navigate(`/products?category=${category.slug}`);
  };

  return (
    <article
      className="card group flex flex-col overflow-hidden hover:shadow-card-hover animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative h-52 overflow-hidden bg-charcoal-100">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-200">
            {category.tagline}
          </span>
          <h3 className="mt-1 text-2xl font-bold text-white">{category.name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 text-sm leading-relaxed text-charcoal-600">
          {category.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {category.items.slice(0, 5).map((item) => (
            <li key={item.id}>
              <Link
                to={productRoute(item.routeSlug)}
                className="inline-flex rounded-lg bg-charcoal-50 px-3 py-1.5 text-xs font-medium text-charcoal-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            type="button"
            onClick={viewCategory}
            className="btn-secondary w-full px-4 py-2.5 text-sm"
          >
            View Products
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
