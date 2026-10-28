import { brandImages } from './images';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  volume: string;
  image: string;
  badge?: string;
  popular?: boolean;
  howToUse: string;
}

export const productsData: ProductItem[] = [
  {
    id: 'prod-lash-brow-serum',
    name: 'Lash & Brow Nourishing Serum',
    category: 'Aftercare',
    price: 18.99,
    description: 'Enriched with peptide complexes, castor oil, and panthenol to hydrate, strengthen, and stimulate follicle growth after lifts and laminations.',
    volume: '8ml',
    image: brandImages.luxurySerum,
    badge: 'Bestseller',
    popular: true,
    howToUse: 'Apply nightly along the lash line and brush through brows using the precision applicator wand.',
  },
  {
    id: 'prod-brow-setting-gel',
    name: 'Sculpt & Lock Brow Setting Gel',
    category: 'Styling',
    price: 9.99,
    description: 'Crystal-clear 16-hour hold formula that laminates hairs in place without flaking or stiff white residue.',
    volume: '10ml',
    image: brandImages.browGel,
    badge: 'Popular',
    popular: true,
    howToUse: 'Brush upwards through brow hairs to lock laminated shape for all-day groomed perfection.',
  },
  {
    id: 'prod-lash-lift-kit',
    name: 'Lash Lift Aftercare Kit',
    category: 'Aftercare',
    price: 14.99,
    description: 'Essential post-lift preservation pack including oil-free micellar cleanser, rose gold spoolie tube, and conditioning keratin balm.',
    volume: 'Complete Set',
    image: brandImages.aftercareKit,
    badge: 'Essential',
    popular: true,
    howToUse: 'Use from 24 hours post-treatment to maintain glossy curl retention up to 8 full weeks.',
  },
  {
    id: 'prod-spoolie-brush-duo',
    name: 'Spoolie & Precision Angled Brush Duo',
    category: 'Accessories',
    price: 4.99,
    description: 'Professional-grade dual-ended grooming tools with cruelty-free synthetic bristles and chic rose gold ferrule.',
    volume: '2 Pieces',
    image: brandImages.spoolieTools,
    badge: 'New',
    howToUse: 'Comb through brows and lashes daily to keep fibres aligned and stimulate natural micro-circulation.',
  },
  {
    id: 'prod-soothing-wax-lotion',
    name: 'Soothing Lavender & Tea Tree After-Wax Lotion',
    category: 'Body & Skin',
    price: 8.50,
    description: 'Cooling post-depilatory emulsion formulated with organic lavender, aloe vera, and tea tree to calm redness and prevent ingrowns.',
    volume: '150ml',
    image: brandImages.luxurySerum,
    howToUse: 'Smooth generously over freshly waxed facial or body areas morning and night.',
  },
  {
    id: 'prod-sapphire-glow-box',
    name: 'Sapphire Glow Luxury Gift Box',
    category: 'Gift Sets',
    price: 34.99,
    originalPrice: 42.00,
    description: 'Our hand-curated salon favourites: Nourishing Serum, Clear Setting Gel, Rose Gold Spoolie, and a £15 treatment voucher.',
    volume: 'Deluxe Gift Box',
    image: brandImages.giftBox,
    badge: 'Luxury Set · Save £7',
    popular: true,
    howToUse: 'The quintessential pamper package for yourself or a loved one in Kingswood.',
  },
];
