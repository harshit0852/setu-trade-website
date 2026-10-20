import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { ProductCategories } from '@/components/sections/ProductCategories';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { WhySetuTrade } from '@/components/sections/WhySetuTrade';
import { TargetMarkets } from '@/components/sections/TargetMarkets';
import { ExportProcess } from '@/components/sections/ExportProcess';
import { About } from '@/components/sections/About';
import { CallToAction } from '@/components/sections/CallToAction';
import { useSeo } from '@/hooks/useSeo';

function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);
}

export function HomePage() {
  useScrollToHash();
  useSeo({
    title: 'Setu Trade | Indian Agro Products & Global Trade',
    description:
      'Setu Trade is an India-based agro products trading business connecting international buyers with fresh vegetables, grains, millets, spices, dry fruits, nuts and organic products sourced from India.',
    path: '/',
  });
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <FeaturedProducts />
        <WhySetuTrade />
        <TargetMarkets />
        <ExportProcess />
        <About />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
