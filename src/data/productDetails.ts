import type { ProductDetail } from '@/types';

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

const makeSeoTitle = (name: string) => `Fresh Indian ${name} Supplier | Setu Trade`;
const makeSeoDesc = (name: string, lower: string) =>
  `Setu Trade supplies Indian ${lower} according to buyer specifications, quantity, packaging and destination requirements.`;

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  potato: {
    slug: 'potato',
    name: 'Potato',
    category: 'Fresh Vegetables',
    categorySlug: 'fresh-vegetables',
    description:
      'Fresh Indian potatoes sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/37540986/pexels-photo-37540986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: makeSeoTitle('Potato'),
    seoDescription: makeSeoDesc('Potato', 'potatoes'),
    relatedProductSlugs: ['onion', 'tomato', 'garlic', 'ginger'],
  },
  onion: {
    slug: 'onion',
    name: 'Onion',
    category: 'Fresh Vegetables',
    categorySlug: 'fresh-vegetables',
    description:
      'Fresh Indian onions sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/15421637/pexels-photo-15421637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: makeSeoTitle('Onion'),
    seoDescription: makeSeoDesc('Onion', 'onions'),
    relatedProductSlugs: ['potato', 'tomato', 'garlic', 'ginger'],
  },
  tomato: {
    slug: 'tomato',
    name: 'Tomato',
    category: 'Fresh Vegetables',
    categorySlug: 'fresh-vegetables',
    description:
      'Fresh Indian tomatoes sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/8024002/pexels-photo-8024002.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: makeSeoTitle('Tomato'),
    seoDescription: makeSeoDesc('Tomato', 'tomatoes'),
    relatedProductSlugs: ['potato', 'onion', 'garlic', 'ginger'],
  },
  garlic: {
    slug: 'garlic',
    name: 'Garlic',
    category: 'Fresh Vegetables',
    categorySlug: 'fresh-vegetables',
    description:
      'Fresh Indian garlic sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/38571499/pexels-photo-38571499.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: makeSeoTitle('Garlic'),
    seoDescription: makeSeoDesc('Garlic', 'garlic'),
    relatedProductSlugs: ['potato', 'onion', 'tomato', 'ginger'],
  },
  ginger: {
    slug: 'ginger',
    name: 'Ginger',
    category: 'Fresh Vegetables',
    categorySlug: 'fresh-vegetables',
    description:
      'Fresh Indian ginger sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/10899474/pexels-photo-10899474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: makeSeoTitle('Ginger'),
    seoDescription: makeSeoDesc('Ginger', 'ginger'),
    relatedProductSlugs: ['potato', 'onion', 'tomato', 'garlic'],
  },
  'other-fresh-vegetables': {
    slug: 'other-fresh-vegetables',
    name: 'Other Fresh Vegetables',
    category: 'Fresh Vegetables',
    categorySlug: 'fresh-vegetables',
    description:
      'Seasonal and on-demand fresh Indian vegetables sourced according to buyer requirements and availability.',
    image:
      'https://images.pexels.com/photos/38384713/pexels-photo-38384713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Fresh Vegetables Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian fresh vegetables according to buyer specifications, quantity, packaging and destination requirements.',
    relatedProductSlugs: ['potato', 'onion', 'tomato', 'garlic'],
  },
  wheat: {
    slug: 'wheat',
    name: 'Wheat',
    category: 'Agro Products',
    categorySlug: 'agro-products',
    description:
      'Indian wheat sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/30297986/pexels-photo-30297986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: makeSeoTitle('Wheat'),
    seoDescription: makeSeoDesc('Wheat', 'wheat'),
    relatedProductSlugs: ['paddy-rice', 'mustard', 'maize', 'cotton'],
  },
  'paddy-rice': {
    slug: 'paddy-rice',
    name: 'Paddy / Rice',
    category: 'Agro Products',
    categorySlug: 'agro-products',
    description:
      'Indian paddy and rice sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/8108052/pexels-photo-8108052.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Rice Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian paddy and rice according to buyer specifications, quantity, packaging and destination requirements.',
    relatedProductSlugs: ['wheat', 'mustard', 'maize', 'cotton'],
  },
  mustard: {
    slug: 'mustard',
    name: 'Mustard',
    category: 'Agro Products',
    categorySlug: 'agro-products',
    description:
      'Indian mustard seed sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/18346906/pexels-photo-18346906.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: makeSeoTitle('Mustard'),
    seoDescription: makeSeoDesc('Mustard', 'mustard seed'),
    relatedProductSlugs: ['wheat', 'paddy-rice', 'maize', 'cotton'],
  },
  maize: {
    slug: 'maize',
    name: 'Maize',
    category: 'Agro Products',
    categorySlug: 'agro-products',
    description:
      'Indian maize sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/37903946/pexels-photo-37903946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: makeSeoTitle('Maize'),
    seoDescription: makeSeoDesc('Maize', 'maize'),
    relatedProductSlugs: ['wheat', 'paddy-rice', 'mustard', 'cotton'],
  },
  cotton: {
    slug: 'cotton',
    name: 'Cotton',
    category: 'Agro Products',
    categorySlug: 'agro-products',
    description:
      'Indian cotton sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/40103331/pexels-photo-40103331.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: makeSeoTitle('Cotton'),
    seoDescription: makeSeoDesc('Cotton', 'cotton'),
    relatedProductSlugs: ['wheat', 'paddy-rice', 'mustard', 'maize'],
  },
  'other-agro-products': {
    slug: 'other-agro-products',
    name: 'Other Agro Products',
    category: 'Agro Products',
    categorySlug: 'agro-products',
    description:
      'Additional Indian agricultural commodities sourced according to buyer requirements and availability.',
    image:
      'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Agro Products Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian agricultural commodities according to buyer specifications, quantity, packaging and destination requirements.',
    relatedProductSlugs: ['wheat', 'paddy-rice', 'mustard', 'maize'],
  },
  bajra: {
    slug: 'bajra',
    name: 'Bajra (Pearl Millet)',
    category: 'Millets',
    categorySlug: 'millets',
    description:
      'Indian bajra (pearl millet) sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/16977456/pexels-photo-16977456.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Bajra (Pearl Millet) Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian bajra (pearl millet) according to buyer specifications, quantity, packaging and destination requirements.',
    relatedProductSlugs: ['jowar', 'ragi', 'foxtail-millet', 'other-millets'],
  },
  jowar: {
    slug: 'jowar',
    name: 'Jowar (Sorghum)',
    category: 'Millets',
    categorySlug: 'millets',
    description:
      'Indian jowar (sorghum) sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/18275951/pexels-photo-18275951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Jowar (Sorghum) Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian jowar (sorghum) according to buyer specifications, quantity, packaging and destination requirements.',
    relatedProductSlugs: ['bajra', 'ragi', 'foxtail-millet', 'other-millets'],
  },
  ragi: {
    slug: 'ragi',
    name: 'Ragi (Finger Millet)',
    category: 'Millets',
    categorySlug: 'millets',
    description:
      'Indian ragi (finger millet) sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/16977456/pexels-photo-16977456.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Ragi (Finger Millet) Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian ragi (finger millet) according to buyer specifications, quantity, packaging and destination requirements.',
    relatedProductSlugs: ['bajra', 'jowar', 'foxtail-millet', 'other-millets'],
  },
  'foxtail-millet': {
    slug: 'foxtail-millet',
    name: 'Foxtail Millet',
    category: 'Millets',
    categorySlug: 'millets',
    description:
      'Indian foxtail millet sourced according to buyer requirements, product specifications, quantity, packaging and destination requirements.',
    image:
      'https://images.pexels.com/photos/11519186/pexels-photo-11519186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Foxtail Millet Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian foxtail millet according to buyer specifications, quantity, packaging and destination requirements.',
    relatedProductSlugs: ['bajra', 'jowar', 'ragi', 'other-millets'],
  },
  'other-millets': {
    slug: 'other-millets',
    name: 'Other Millets',
    category: 'Millets',
    categorySlug: 'millets',
    description:
      'Other Indian millet varieties sourced according to buyer requirements and availability.',
    image:
      'https://images.pexels.com/photos/18275951/pexels-photo-18275951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Millets Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian millets according to buyer specifications, quantity, packaging and destination requirements.',
    relatedProductSlugs: ['bajra', 'jowar', 'ragi', 'foxtail-millet'],
  },
  'organic-grains': {
    slug: 'organic-grains',
    name: 'Organic Grains',
    category: 'Organic Products',
    categorySlug: 'organic-products',
    description:
      'Organic Indian grains sourced according to buyer requirements, subject to applicable certification and destination requirements.',
    image:
      'https://images.pexels.com/photos/5313292/pexels-photo-5313292.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Organic Grains Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian organic grains according to buyer specifications, subject to applicable certification.',
    relatedProductSlugs: ['organic-millets', 'organic-vegetables', 'other-organic-products'],
  },
  'organic-millets': {
    slug: 'organic-millets',
    name: 'Organic Millets',
    category: 'Organic Products',
    categorySlug: 'organic-products',
    description:
      'Organic Indian millets sourced according to buyer requirements, subject to applicable certification and destination requirements.',
    image:
      'https://images.pexels.com/photos/11519186/pexels-photo-11519186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Organic Millets Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian organic millets according to buyer specifications, subject to applicable certification.',
    relatedProductSlugs: ['organic-grains', 'organic-vegetables', 'other-organic-products'],
  },
  'organic-vegetables': {
    slug: 'organic-vegetables',
    name: 'Organic Vegetables',
    category: 'Organic Products',
    categorySlug: 'organic-products',
    description:
      'Organic Indian vegetables sourced according to buyer requirements, subject to applicable certification and destination requirements.',
    image:
      'https://images.pexels.com/photos/29181503/pexels-photo-29181503.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Organic Vegetables Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian organic vegetables according to buyer specifications, subject to applicable certification.',
    relatedProductSlugs: ['organic-grains', 'organic-millets', 'other-organic-products'],
  },
  'other-organic-products': {
    slug: 'other-organic-products',
    name: 'Other Organic Products',
    category: 'Organic Products',
    categorySlug: 'organic-products',
    description:
      'Additional organic Indian agricultural products sourced according to buyer requirements, subject to applicable certification.',
    image:
      'https://images.pexels.com/photos/10323347/pexels-photo-10323347.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
    seoTitle: 'Indian Organic Products Supplier | Setu Trade',
    seoDescription:
      'Setu Trade supplies Indian organic products according to buyer specifications, subject to applicable certification.',
    relatedProductSlugs: ['organic-grains', 'organic-millets', 'organic-vegetables'],
  },
};

export function getProductDetail(slug: string): ProductDetail | undefined {
  return PRODUCT_DETAILS[slug];
}

export function getRelatedProducts(slugs: string[]): ProductDetail[] {
  return slugs
    .map((s) => PRODUCT_DETAILS[s])
    .filter((p): p is ProductDetail => p !== undefined);
}
