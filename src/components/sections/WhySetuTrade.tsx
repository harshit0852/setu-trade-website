import { Globe2, Layers, PackageCheck, Ship } from 'lucide-react';
import { WHY_SETU_TRADE } from '@/data/site';
import type { ComplianceArea } from '@/types';

const ICONS = [Globe2, Layers, PackageCheck, Ship];

export function WhySetuTrade() {
  return (
    <section id="why-setu-trade" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span className="h-px w-8 bg-brand-500" />
            Why Setu Trade
          </p>
          <h2 className="section-title mt-4">Why Work With Setu Trade?</h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-600">
            A practical approach to sourcing Indian agricultural products for
            international buyers.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_SETU_TRADE.map((feature, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={feature.title}
                className="card p-7 hover:shadow-card-hover animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-charcoal-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export type { ComplianceArea };
