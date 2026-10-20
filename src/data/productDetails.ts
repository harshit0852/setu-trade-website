import type { ProductDetail, ProductCategorySlug } from '@/types';
import { PRODUCT_CATEGORIES } from '@/data/site';

const GENERIC_SPECIFICATIONS = [
  'Variety',
  'Size',
  'Grade',
  'Quantity',
  'Packaging',
  'Destination',
  'Delivery requirement',
  'Other quality specifications',
];

const GENERIC_EXPORT_INFO = {
  origin: 'India',
  destination: 'As specified by buyer',
  incoterm: 'Subject to quotation and agreement',
  documentation: 'As applicable to the product and destination country',
};

const CATEGORY_NAMES: Record<ProductCategorySlug, string> = {
  'fresh-vegetables': 'Fresh Vegetables',
  'agro-products': 'Agro Products',
  'millets': 'Millets',
  'spices': 'Spices',
  'dry-fruits': 'Dry Fruits',
  'nuts': 'Nuts',
  'organic-products': 'Organic Products',
};

const makeSeoTitle = (name: string) => `Indian ${name} Supplier | Setu Trade`;

function makeDescription(name: string): string {
  return `Indian ${name} sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.`;
}

function makeSeoDescription(name: string, lower: string): string {
  return `Setu Trade supplies Indian ${lower} according to buyer specifications, quantity, packaging and destination requirements.`;
}

interface FactoryInput {
  slug: string;
  name: string;
  image: string;
  categorySlug: ProductCategorySlug;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  relatedProductSlugs?: string[];
}

function makeDetail(input: FactoryInput): ProductDetail {
  const categoryName = CATEGORY_NAMES[input.categorySlug];
  const lower = input.name.toLowerCase();
  return {
    slug: input.slug,
    name: input.name,
    category: categoryName,
    categorySlug: input.categorySlug,
    description: input.description ?? makeDescription(input.name),
    image: input.image,
    origin: 'India',
    variety: 'Subject to availability and buyer requirement',
    grade: 'As per buyer specification',
    size: 'As per buyer requirement',
    packaging: 'Subject to buyer requirement',
    quantity: 'Subject to availability',
    availability: 'Subject to season, sourcing and market conditions',
    specifications: GENERIC_SPECIFICATIONS,
    packagingNote:
      'Packaging can be discussed according to product requirements, destination-country requirements and buyer specifications.',
    qualityNote:
      'Product quality and inspection requirements are discussed according to buyer specifications and destination-market requirements.',
    exportInfo: GENERIC_EXPORT_INFO,
    seoTitle: input.seoTitle ?? makeSeoTitle(input.name),
    seoDescription: input.seoDescription ?? makeSeoDescription(input.name, lower),
    relatedProductSlugs: input.relatedProductSlugs ?? [],
  };
}

function getRelatedSlugs(categorySlug: ProductCategorySlug, selfSlug: string, count = 4): string[] {
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return category.items
    .filter((i) => i.routeSlug !== selfSlug)
    .slice(0, count)
    .map((i) => i.routeSlug);
}

function buildAllDetails(): Record<string, ProductDetail> {
  const details: Record<string, ProductDetail> = {};

  for (const category of PRODUCT_CATEGORIES) {
    for (const item of category.items) {
      const related = getRelatedSlugs(category.slug, item.routeSlug);
      details[item.routeSlug] = makeDetail({
        slug: item.routeSlug,
        name: item.name,
        image: item.image,
        categorySlug: category.slug,
        relatedProductSlugs: related,
      });
    }
  }

  return details;
}

export const PRODUCT_DETAILS: Record<string, ProductDetail> = buildAllDetails();

export function getProductDetail(slug: string): ProductDetail | undefined {
  return PRODUCT_DETAILS[slug];
}

export function getRelatedProducts(slugs: string[]): ProductDetail[] {
  return slugs
    .map((s) => PRODUCT_DETAILS[s])
    .filter((p): p is ProductDetail => p !== undefined);
}
