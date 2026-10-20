import { useEffect } from 'react';

const SITE_URL = 'https://setutrade.com';
const SITE_NAME = 'Setu Trade';

export interface JsonLdSchema {
  '@type': string;
  [key: string]: unknown;
}

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  jsonLd?: JsonLdSchema | JsonLdSchema[];
  noindex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, schema: JsonLdSchema | JsonLdSchema[]): void {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function removeJsonLd(id: string): void {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function removeMeta(attr: 'name' | 'property', key: string): void {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

const OG_KEYS = ['og:title', 'og:description', 'og:url', 'og:image', 'og:site_name', 'og:type', 'og:locale'];
const TWITTER_KEYS = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];

function cleanupSocialMeta(): void {
  OG_KEYS.forEach((k) => removeMeta('property', k));
  TWITTER_KEYS.forEach((k) => removeMeta('name', k));
}

export function useSeo({ title, description, path, image, jsonLd, noindex }: SeoProps) {
  useEffect(() => {
    const url = path ? `${SITE_URL}${path}` : SITE_URL;
    const ogImage = image ?? `${SITE_URL}/og-image.jpg`;

    document.title = title;

    upsertMeta('name', 'description', description);

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
      cleanupSocialMeta();
      removeJsonLd('seo-jsonld-page');
      return;
    }

    upsertMeta('name', 'robots', 'index, follow');

    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'en_US');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    if (jsonLd) {
      upsertJsonLd('seo-jsonld-page', jsonLd);
    } else {
      removeJsonLd('seo-jsonld-page');
    }
  }, [title, description, path, image, jsonLd, noindex]);
}

export { SITE_URL, SITE_NAME };
