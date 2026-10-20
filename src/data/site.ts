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
        id: 'green-chilli',
        name: 'Green Chilli',
        description: 'Fresh green chillies, sorted and packed for export.',
        image: 'https://images.pexels.com/photos/12955689/pexels-photo-12955689.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'green-chilli',
      },
      {
        id: 'okra',
        name: 'Okra / Lady Finger',
        description: 'Fresh okra, sorted and packed to buyer specification.',
        image: 'https://images.pexels.com/photos/34168070/pexels-photo-34168070.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'okra',
      },
      {
        id: 'green-peas',
        name: 'Green Peas',
        description: 'Fresh green peas, sorted and graded for export.',
        image: 'https://images.pexels.com/photos/38435617/pexels-photo-38435617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'green-peas',
      },
      {
        id: 'cabbage',
        name: 'Cabbage',
        description: 'Fresh cabbage heads, sorted and packed for export.',
        image: 'https://images.pexels.com/photos/15742241/pexels-photo-15742241.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'cabbage',
      },
      {
        id: 'cauliflower',
        name: 'Cauliflower',
        description: 'Fresh cauliflowers, sorted and packed for export.',
        image: 'https://images.pexels.com/photos/38571520/pexels-photo-38571520.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'cauliflower',
      },
      {
        id: 'carrot',
        name: 'Carrot',
        description: 'Fresh carrots, cleaned and graded to specification.',
        image: 'https://images.pexels.com/photos/19897797/pexels-photo-19897797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'carrot',
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
        name: 'Maize / Corn',
        description: 'Yellow and white maize, sorted for buyer requirements.',
        image: 'https://images.pexels.com/photos/37903946/pexels-photo-37903946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'maize',
      },
      {
        id: 'barley',
        name: 'Barley',
        description: 'Malting and feed barley, cleaned and graded to specification.',
        image: 'https://images.pexels.com/photos/454509/pexels-photo-454509.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'barley',
      },
      {
        id: 'chickpeas',
        name: 'Chickpeas / Chana',
        description: 'Kabuli and desi chickpeas, cleaned and graded for export.',
        image: 'https://images.pexels.com/photos/34949285/pexels-photo-34949285.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'chickpeas',
      },
      {
        id: 'lentils',
        name: 'Lentils / Masoor',
        description: 'Red and yellow lentils, sorted and graded to specification.',
        image: 'https://images.pexels.com/photos/34940646/pexels-photo-34940646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'lentils',
      },
      {
        id: 'pigeon-pea',
        name: 'Pigeon Pea / Toor Dal',
        description: 'Pigeon pea split and whole, cleaned for export.',
        image: 'https://images.pexels.com/photos/14965274/pexels-photo-14965274.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'pigeon-pea',
      },
      {
        id: 'green-gram',
        name: 'Green Gram / Moong',
        description: 'Whole and split green gram, sorted and cleaned.',
        image: 'https://images.pexels.com/photos/17975575/pexels-photo-17975575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'green-gram',
      },
      {
        id: 'black-gram',
        name: 'Black Gram / Urad',
        description: 'Whole and split black gram, cleaned for export.',
        image: 'https://images.pexels.com/photos/28674555/pexels-photo-28674555.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'black-gram',
      },
      {
        id: 'groundnut',
        name: 'Groundnut / Peanut',
        description: 'Raw and shelled groundnuts, sorted to specification.',
        image: 'https://images.pexels.com/photos/33501329/pexels-photo-33501329.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'groundnut',
      },
      {
        id: 'sesame-seeds',
        name: 'Sesame Seeds',
        description: 'Natural and hulled sesame seeds, cleaned for export.',
        image: 'https://images.pexels.com/photos/8951049/pexels-photo-8951049.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'sesame-seeds',
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
        id: 'little-millet',
        name: 'Little Millet',
        description: 'Cleaned little millet, sorted and ready for export.',
        image: 'https://images.pexels.com/photos/18275951/pexels-photo-18275951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'little-millet',
      },
      {
        id: 'kodo-millet',
        name: 'Kodo Millet',
        description: 'Cleaned kodo millet, sorted and packed to specification.',
        image: 'https://images.pexels.com/photos/16977456/pexels-photo-16977456.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'kodo-millet',
      },
      {
        id: 'barnyard-millet',
        name: 'Barnyard Millet',
        description: 'Cleaned barnyard millet, sorted for export requirements.',
        image: 'https://images.pexels.com/photos/10738421/pexels-photo-10738421.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'barnyard-millet',
      },
      {
        id: 'proso-millet',
        name: 'Proso Millet',
        description: 'Cleaned proso millet, sorted and packed for export.',
        image: 'https://images.pexels.com/photos/18275951/pexels-photo-18275951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'proso-millet',
      },
      {
        id: 'other-millets',
        name: 'Other Millets',
        description: 'Additional millet varieties sourced on request.',
        image: 'https://images.pexels.com/photos/18275951/pexels-photo-18275951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'other-millets',
      },
    ],
  },
  {
    slug: 'spices',
    name: 'Spices',
    tagline: 'Whole spices, powders and blends',
    description:
      'Indian spices sourced according to buyer requirements, quality specifications, quantity and destination.',
    image:
      'https://images.pexels.com/photos/3368291/pexels-photo-3368291.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        id: 'red-chilli',
        name: 'Red Chilli',
        description: 'Whole and crushed red chillies, sorted to specification.',
        image: 'https://images.pexels.com/photos/30387987/pexels-photo-30387987.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'red-chilli',
      },
      {
        id: 'turmeric',
        name: 'Turmeric',
        description: 'Whole turmeric fingers and powder, supplied to specification.',
        image: 'https://images.pexels.com/photos/6220710/pexels-photo-6220710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'turmeric',
      },
      {
        id: 'cumin',
        name: 'Cumin',
        description: 'Whole cumin seeds and powder, cleaned for export.',
        image: 'https://images.pexels.com/photos/10487762/pexels-photo-10487762.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'cumin',
      },
      {
        id: 'coriander',
        name: 'Coriander',
        description: 'Whole coriander seeds and powder, sorted for export.',
        image: 'https://images.pexels.com/photos/10487771/pexels-photo-10487771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'coriander',
      },
      {
        id: 'black-pepper',
        name: 'Black Pepper',
        description: 'Whole black peppercorns, cleaned and graded for export.',
        image: 'https://images.pexels.com/photos/8559086/pexels-photo-8559086.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'black-pepper',
      },
      {
        id: 'cardamom',
        name: 'Cardamom',
        description: 'Green and black cardamom pods, sorted to specification.',
        image: 'https://images.pexels.com/photos/6086300/pexels-photo-6086300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'cardamom',
      },
      {
        id: 'fenugreek',
        name: 'Fenugreek',
        description: 'Whole fenugreek seeds, cleaned and sorted for export.',
        image: 'https://images.pexels.com/photos/5987968/pexels-photo-5987968.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'fenugreek',
      },
      {
        id: 'fennel',
        name: 'Fennel',
        description: 'Whole fennel seeds, cleaned and sorted for export.',
        image: 'https://images.pexels.com/photos/5988041/pexels-photo-5988041.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'fennel',
      },
      {
        id: 'clove',
        name: 'Clove',
        description: 'Whole cloves, sorted and cleaned for export.',
        image: 'https://images.pexels.com/photos/6087276/pexels-photo-6087276.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'clove',
      },
      {
        id: 'cinnamon',
        name: 'Cinnamon',
        description: 'Cinnamon quills and bark, sorted to buyer specification.',
        image: 'https://images.pexels.com/photos/31665263/pexels-photo-31665263.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'cinnamon',
      },
      {
        id: 'cassia',
        name: 'Cassia',
        description: 'Cassia bark and quills, supplied to specification.',
        image: 'https://images.pexels.com/photos/15486150/pexels-photo-15486150.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'cassia',
      },
      {
        id: 'nutmeg',
        name: 'Nutmeg',
        description: 'Whole nutmeg, cleaned and graded for export.',
        image: 'https://images.pexels.com/photos/35339664/pexels-photo-35339664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'nutmeg',
      },
      {
        id: 'mace',
        name: 'Mace',
        description: 'Whole mace blades, sorted and cleaned for export.',
        image: 'https://images.pexels.com/photos/13093699/pexels-photo-13093699.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'mace',
      },
      {
        id: 'bay-leaf',
        name: 'Bay Leaf',
        description: 'Dried bay leaves, sorted and packed to specification.',
        image: 'https://images.pexels.com/photos/9974502/pexels-photo-9974502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'bay-leaf',
      },
      {
        id: 'star-anise',
        name: 'Star Anise',
        description: 'Whole star anise, sorted and cleaned for export.',
        image: 'https://images.pexels.com/photos/30112806/pexels-photo-30112806.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'star-anise',
      },
      {
        id: 'asafoetida',
        name: 'Asafoetida',
        description: 'Hing (asafoetida) supplied to specification.',
        image: 'https://images.pexels.com/photos/20590330/pexels-photo-20590330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'asafoetida',
      },
      {
        id: 'saffron',
        name: 'Saffron',
        description: 'Saffron threads, supplied to buyer specification.',
        image: 'https://images.pexels.com/photos/33654800/pexels-photo-33654800.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'saffron',
      },
      {
        id: 'tamarind',
        name: 'Tamarind',
        description: 'Tamarind pods and pulp, sorted and packed for export.',
        image: 'https://images.pexels.com/photos/39468205/pexels-photo-39468205.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'tamarind',
      },
      {
        id: 'curry-leaves',
        name: 'Curry Leaves',
        description: 'Fresh and dried curry leaves, packed to specification.',
        image: 'https://images.pexels.com/photos/37215213/pexels-photo-37215213.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'curry-leaves',
      },
      {
        id: 'spice-mustard-seed',
        name: 'Mustard Seed',
        description: 'Yellow and brown mustard seeds, cleaned for export.',
        image: 'https://images.pexels.com/photos/18346906/pexels-photo-18346906.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'spice-mustard-seed',
      },
      {
        id: 'whole-spices',
        name: 'Whole Spices',
        description: 'Assorted whole spices sourced to buyer specification.',
        image: 'https://images.pexels.com/photos/10126645/pexels-photo-10126645.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'whole-spices',
      },
      {
        id: 'spice-powders',
        name: 'Spice Powders',
        description: 'Ground spice powders, supplied to buyer specification.',
        image: 'https://images.pexels.com/photos/12627239/pexels-photo-12627239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'spice-powders',
      },
      {
        id: 'spice-blends',
        name: 'Spice Blends',
        description: 'Mixed spice blends sourced to buyer specification.',
        image: 'https://images.pexels.com/photos/7925819/pexels-photo-7925819.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'spice-blends',
      },
    ],
  },
  {
    slug: 'dry-fruits',
    name: 'Dry Fruits',
    tagline: 'Naturally dried, sorted and packed',
    description:
      'Dried fruits sourced according to buyer requirements, quality specifications, quantity and destination.',
    image:
      'https://images.pexels.com/photos/32282191/pexels-photo-32282191.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        id: 'raisins',
        name: 'Raisins',
        description: 'Green and black raisins, sorted and graded for export.',
        image: 'https://images.pexels.com/photos/31508567/pexels-photo-31508567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'raisins',
      },
      {
        id: 'dried-dates',
        name: 'Dried Dates',
        description: 'Dried dates, sorted and packed to specification.',
        image: 'https://images.pexels.com/photos/12944736/pexels-photo-12944736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'dried-dates',
      },
      {
        id: 'dried-figs',
        name: 'Dried Figs',
        description: 'Dried figs, sorted and packed for export.',
        image: 'https://images.pexels.com/photos/40153832/pexels-photo-40153832.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'dried-figs',
      },
      {
        id: 'dried-apricots',
        name: 'Dried Apricots',
        description: 'Dried apricots, sorted and graded to specification.',
        image: 'https://images.pexels.com/photos/10111994/pexels-photo-10111994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'dried-apricots',
      },
      {
        id: 'dried-prunes',
        name: 'Dried Prunes',
        description: 'Dried prunes, sorted and packed for export.',
        image: 'https://images.pexels.com/photos/7111409/pexels-photo-7111409.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'dried-prunes',
      },
      {
        id: 'dried-cranberries',
        name: 'Dried Cranberries',
        description: 'Dried cranberries, sorted and packed to specification.',
        image: 'https://images.pexels.com/photos/32282191/pexels-photo-32282191.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'dried-cranberries',
      },
      {
        id: 'dried-mango',
        name: 'Dried Mango',
        description: 'Dried mango slices, sorted and packed for export.',
        image: 'https://images.pexels.com/photos/4499212/pexels-photo-4499212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'dried-mango',
      },
      {
        id: 'dried-coconut',
        name: 'Dried Coconut',
        description: 'Dried coconut copra and slices, packed to specification.',
        image: 'https://images.pexels.com/photos/5608054/pexels-photo-5608054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'dried-coconut',
      },
      {
        id: 'dried-banana',
        name: 'Dried Banana',
        description: 'Dried banana and banana chips, sorted for export.',
        image: 'https://images.pexels.com/photos/37646934/pexels-photo-37646934.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'dried-banana',
      },
    ],
  },
  {
    slug: 'nuts',
    name: 'Nuts',
    tagline: 'Sourced, sorted and packed for export',
    description:
      'Indian and imported nuts sourced according to buyer requirements, quality specifications, quantity and destination.',
    image:
      'https://images.pexels.com/photos/32282191/pexels-photo-32282191.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        id: 'cashew-nuts',
        name: 'Cashew Nuts',
        description: 'Whole and split cashew kernels, graded to specification.',
        image: 'https://images.pexels.com/photos/9811624/pexels-photo-9811624.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'cashew-nuts',
      },
      {
        id: 'almonds',
        name: 'Almonds',
        description: 'Almonds in shell and kernels, sorted for export.',
        image: 'https://images.pexels.com/photos/6003907/pexels-photo-6003907.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'almonds',
      },
      {
        id: 'walnuts',
        name: 'Walnuts',
        description: 'Walnuts in shell and kernels, graded to specification.',
        image: 'https://images.pexels.com/photos/29660492/pexels-photo-29660492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'walnuts',
      },
      {
        id: 'pistachios',
        name: 'Pistachios',
        description: 'Pistachios in shell and kernels, sorted for export.',
        image: 'https://images.pexels.com/photos/27644256/pexels-photo-27644256.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'pistachios',
      },
      {
        id: 'peanuts',
        name: 'Peanuts / Groundnuts',
        description: 'Raw and shelled peanuts, sorted and graded for export.',
        image: 'https://images.pexels.com/photos/35614009/pexels-photo-35614009.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'peanuts',
      },
    ],
  },
  {
    slug: 'organic-products',
    name: 'Organic Products',
    tagline: 'Naturally grown, subject to certification',
    description:
      'Organic agricultural products available subject to applicable certification and buyer requirements.',
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
        id: 'organic-pulses',
        name: 'Organic Pulses',
        description: 'Organic lentils, chickpeas and pulses, subject to certification.',
        image: 'https://images.pexels.com/photos/6086414/pexels-photo-6086414.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'organic-pulses',
      },
      {
        id: 'organic-millets',
        name: 'Organic Millets',
        description: 'Organic millet varieties, subject to certification.',
        image: 'https://images.pexels.com/photos/11519186/pexels-photo-11519186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'organic-millets',
      },
      {
        id: 'organic-spices',
        name: 'Organic Spices',
        description: 'Organic spices, subject to certification and buyer requirements.',
        image: 'https://images.pexels.com/photos/4198755/pexels-photo-4198755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'organic-spices',
      },
      {
        id: 'organic-oilseeds',
        name: 'Organic Oilseeds',
        description: 'Organic sesame, mustard and other oilseeds, subject to certification.',
        image: 'https://images.pexels.com/photos/36381366/pexels-photo-36381366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        routeSlug: 'organic-oilseeds',
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
