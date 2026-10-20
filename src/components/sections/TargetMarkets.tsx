import { Globe2 } from 'lucide-react';
import { TARGET_MARKETS } from '@/data/site';

export function TargetMarkets() {
  return (
    <section id="target-markets" className="scroll-mt-24 bg-charcoal-50 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="h-px w-8 bg-brand-500" />
            Target Markets
          </p>
          <h2 className="section-title mt-4">Connecting India With Global Markets</h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-600">
            We work toward connecting Indian agricultural products with buyers across
            international markets, subject to product requirements and destination-country
            regulations.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TARGET_MARKETS.map((region, i) => (
            <div
              key={region.name}
              className="card p-6 hover:shadow-card-hover animate-fade-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <Globe2 className="h-7 w-7 text-brand-600" strokeWidth={1.8} />
              <h3 className="mt-4 text-lg font-semibold text-charcoal-900">{region.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal-600">{region.coverage}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
