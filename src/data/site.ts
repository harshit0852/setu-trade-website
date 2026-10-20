import type {
  ProductCategory,
  ProductCategorySlug,
  NavLink,
  MarketRegion,
  ExportStep,
  ComplianceArea,
} from '@/types';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'fresh-vegetables',
    name: 'Fresh Vegetables',
    tagline: 'Farm-fresh, sorted, and export-ready',
    description:
      'Fresh Indian vegetables sourced according to buyer requirements, quality specifications, quantity and destination.',
    image:
      'https://images.pexels.com/photos/37321079/pexels-photo-37321079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        id: 'potato',
        name: 'Potato',
        description: 'Table and processing varieties, sourced to buyer specifications.',
        image: 'https://images.pexels.com/photos/37540986/pexels-photo-37540986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'potato',
      },
      {
        id: 'onion',
        name: 'Onion',
        description: 'Red and yellow onions, sorted and packed for export.',
        image: 'https://images.pexels.com/photos/15421637/pexels-photo-15421637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'onion',
      },
      {
        id: 'tomato',
        name: 'Tomato',
        description: 'Roma and hybrid varieties, harvested for freshness.',
        image: 'https://images.pexels.com/photos/8024002/pexels-photo-8024002.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'tomato',
      },
      {
        id: 'garlic',
        name: 'Garlic',
        description: 'Fresh garlic bulbs, sorted by size and quality.',
        image: 'https://images.pexels.com/photos/38571499/pexels-photo-38571499.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'garlic',
      },
      {
        id: 'ginger',
        name: 'Ginger',
        description: 'Whole ginger rhizomes, cleaned and air-dried.',
        image: 'https://images.pexels.com/photos/10899474/pexels-photo-10899474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'ginger',
      },
      {
        id: 'other-vegetables',
        name: 'Other Fresh Vegetables',
        description: 'Seasonal and on-demand vegetables sourced on request.',
        image: 'https://images.pexels.com/photos/38384713/pexels-photo-38384713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'other-fresh-vegetables',
      },
    ],
  },
  {
    slug: 'agro-products',
    name: 'Agro Products',
    tagline: 'Grains, oilseeds, and staple crops',
    description:
      'A range of Indian agricultural commodities sourced through established agricultural supply networks.',
    image:
      'https://images.pexels.com/photos/33786724/pexels-photo-33786724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        id: 'wheat',
        name: 'Wheat',
        description: 'Milling and feed grades, cleaned and graded to specification.',
        image: 'https://images.pexels.com/photos/30297986/pexels-photo-30297986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'wheat',
      },
      {
        id: 'paddy-rice',
        name: 'Paddy / Rice',
        description: 'Basmati and non-basmati rice varieties for export.',
        image: 'https://images.pexels.com/photos/8108052/pexels-photo-8108052.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'paddy-rice',
      },
      {
        id: 'mustard',
        name: 'Mustard',
        description: 'Mustard seed sourced from major growing regions.',
        image: 'https://images.pexels.com/photos/18346906/pexels-photo-18346906.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'mustard',
      },
      {
        id: 'maize',
        name: 'Maize',
        description: 'Yellow and white maize, sorted for buyer requirements.',
        image: 'https://images.pexels.com/photos/37903946/pexels-photo-37903946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'maize',
      },
      {
        id: 'cotton',
        name: 'Cotton',
        description: 'Raw cotton and bales, sourced from cotton-growing regions.',
        image: 'https://images.pexels.com/photos/40103331/pexels-photo-40103331.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'cotton',
      },
      {
        id: 'other-agro',
        name: 'Other Agro Products',
        description: 'Additional agricultural commodities sourced on request.',
        image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'other-agro-products',
      },
    ],
  },
  {
    slug: 'millets',
    name: 'Millets',
    tagline: 'Nutrient-rich ancient grains',
    description:
      'Indian millets supplied for international buyers according to product specifications and market requirements.',
    image:
      'https://images.pexels.com/photos/7412066/pexels-photo-7412066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        id: 'bajra',
        name: 'Bajra (Pearl Millet)',
        description: 'Whole and pearled pearl millet, cleaned and sorted.',
        image: 'https://images.pexels.com/photos/16977456/pexels-photo-16977456.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'bajra',
      },
      {
        id: 'jowar',
        name: 'Jowar (Sorghum)',
        description: 'Sorghum grain and flour, supplied to specification.',
        image: 'https://images.pexels.com/photos/18275951/pexels-photo-18275951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'jowar',
      },
      {
        id: 'ragi',
        name: 'Ragi (Finger Millet)',
        description: 'Whole grain and flour finger millet, cleaned for export.',
        image: 'https://images.pexels.com/photos/16977456/pexels-photo-16977456.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'ragi',
      },
      {
        id: 'foxtail-millet',
        name: 'Foxtail Millet',
        description: 'Dehushed and clean foxtail millet, ready for export.',
        image: 'https://images.pexels.com/photos/11519186/pexels-photo-11519186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'foxtail-millet',
      },
      {
        id: 'other-millets',
        name: 'Other Millets',
        description: 'Little, kodo, proso and other millet varieties on request.',
        image: 'https://images.pexels.com/photos/18275951/pexels-photo-18275951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'other-millets',
      },
    ],
  },
  {
    slug: 'organic-products',
    name: 'Organic Products',
    tagline: 'Naturally grown, subject to certification',
    description:
      'Organic agricultural products subject to applicable certification and buyer requirements.',
    image:
      'https://images.pexels.com/photos/30371404/pexels-photo-30371404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        id: 'organic-grains',
        name: 'Organic Grains',
        description: 'Organic wheat, rice, and maize, subject to certification.',
        image: 'https://images.pexels.com/photos/5313292/pexels-photo-5313292.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'organic-grains',
      },
      {
        id: 'organic-millets',
        name: 'Organic Millets',
        description: 'Organic millet varieties, subject to certification.',
        image: 'https://images.pexels.com/photos/11519186/pexels-photo-11519186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'organic-millets',
      },
      {
        id: 'organic-vegetables',
        name: 'Organic Vegetables',
        description: 'Seasonal organic fresh produce, subject to certification.',
        image: 'https://images.pexels.com/photos/29181503/pexels-photo-29181503.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'organic-vegetables',
      },
      {
        id: 'other-organic',
        name: 'Other Organic Products',
        description: 'Additional organic products sourced on request.',
        image: 'https://images.pexels.com/photos/10323347/pexels-photo-10323347.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'other-organic-products',
      },
    ],
  },
];

export function productRoute(routeSlug: string): string {
  return `/products/${routeSlug}`;
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export const CATEGORY_SLUGS: ProductCategorySlug[] = PRODUCT_CATEGORIES.map((c) => c.slug);

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products', hasMegaMenu: true },
  { label: 'About', href: '#about', route: '/about' },
  { label: 'Contact', href: '#contact', route: '/contact' },
  { label: 'Suppliers', href: '#become-supplier', route: '/suppliers' },
];

export const TARGET_MARKETS: MarketRegion[] = [
  { name: 'Asia', coverage: 'South, East and Southeast Asian markets' },
  { name: 'Middle East', coverage: 'GCC and broader Middle East markets' },
  { name: 'Africa', coverage: 'East, West and North African markets' },
  { name: 'Europe', coverage: 'EU member states and the United Kingdom' },
  { name: 'Southeast Asia', coverage: 'Singapore, Malaysia, Indonesia, Vietnam, Thailand' },
  { name: 'Other International Markets', coverage: 'Additional destinations subject to product and regulatory requirements' },
];

export const EXPORT_STEPS: ExportStep[] = [
  {
    step: 1,
    title: 'Buyer Enquiry',
    description:
      'Share your product, quantity, specification and destination.',
  },
  {
    step: 2,
    title: 'Product Specification',
    description:
      'Confirm product requirements, quality, packaging and delivery requirements.',
  },
  {
    step: 3,
    title: 'Quotation',
    description:
      'Receive a quotation based on the agreed specifications and transaction terms.',
  },
  {
    step: 4,
    title: 'Order Confirmation',
    description:
      'Finalize commercial terms and order requirements.',
  },
  {
    step: 5,
    title: 'Sourcing & Quality',
    description:
      'Product sourcing and quality checks according to the agreed requirements.',
  },
  {
    step: 6,
    title: 'Packing & Documentation',
    description:
      'Prepare applicable packing and export documentation.',
  },
  {
    step: 7,
    title: 'Logistics & Shipment',
    description:
      'Coordinate transportation and shipment according to the agreed terms.',
  },
];

export const WHY_SETU_TRADE: ComplianceArea[] = [
  {
    title: 'Indian Sourcing',
    description:
      'Products sourced through Indian agricultural supply networks.',
  },
  {
    title: 'Buyer-Specific Specifications',
    description:
      'Product specifications, quantity, packaging and requirements can be discussed according to buyer needs.',
  },
  {
    title: 'Quality Focus',
    description:
      'Quality requirements and inspection can be discussed according to product and destination-market requirements.',
  },
  {
    title: 'Export Coordination',
    description:
      'Support across sourcing, documentation and logistics coordination according to the transaction requirements.',
  },
];
