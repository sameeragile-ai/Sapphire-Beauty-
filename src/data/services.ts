import { brandImages } from './images';

export type ServiceCategory = 'Brows' | 'Lashes' | 'Waxing' | 'Packages';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  originalPrice?: number;
  duration: string;
  description: string;
  image: string;
  badge?: string;
  popular?: boolean;
  benefits: string[];
}

export const servicesData: ServiceItem[] = [
  // BROWS
  {
    id: 'brow-wax-shape',
    name: 'Brow Wax & Shape',
    category: 'Brows',
    price: 12,
    duration: '20 min',
    description: 'Bespoke brow mapping, precision warm waxing and tweezing tailored to your natural bone structure.',
    image: brandImages.browShapeTint,
    benefits: ['Bespoke face mapping', 'Gentle warm wax', 'Crisp clean arches'],
  },
  {
    id: 'brow-tint',
    name: 'Brow Tint',
    category: 'Brows',
    price: 10,
    duration: '15 min',
    description: 'Custom-mixed semi-permanent tint to add depth, dimension, and fullness to lighter or sparse hairs.',
    image: brandImages.browShapeTint,
    benefits: ['Colour matched to hair', 'Deeper defined brows', 'Lasts 3–4 weeks'],
  },
  {
    id: 'brow-wax-shape-tint',
    name: 'Brow Wax, Shape & Tint',
    category: 'Brows',
    price: 20,
    duration: '30 min',
    description: 'Our staple brow refresh: precise wax shaping, arch definition, and custom tint for polished, framing brows.',
    image: brandImages.browShapeTint,
    badge: 'Popular',
    popular: true,
    benefits: ['Complete brow overhaul', 'Flattering arch definition', 'Fresh groomed look'],
  },
  {
    id: 'brow-lamination',
    name: 'Brow Lamination',
    category: 'Brows',
    price: 35,
    duration: '45 min',
    description: 'The ultimate brow relaxer treatment to redirect unruly hairs, create fluffy symmetry, and double visible fullness.',
    image: brandImages.browLaminationCloseUp,
    badge: 'Trending',
    popular: true,
    benefits: ['Fixes downward hairs', 'Gives full, brushed-up volume', 'Lasts 6–8 weeks'],
  },
  {
    id: 'brow-lamination-tint-shape',
    name: 'Brow Lamination + Tint + Shape',
    category: 'Brows',
    price: 42,
    duration: '60 min',
    description: 'The complete royal brow treatment. Lamination, signature waxing architecture, and bespoke tinting for picture-perfect brows.',
    image: brandImages.realClientBrows,
    badge: 'Bestseller',
    popular: true,
    benefits: ['Full bespoke brow transformation', 'Hydrating keratin shield', 'Real client favourite'],
  },

  // LASHES
  {
    id: 'lash-tint',
    name: 'Lash Tint',
    category: 'Lashes',
    price: 12,
    duration: '20 min',
    description: 'Rich blue-black or carbon black pigment applied from root to tip for dark, glossy lashes that pop without mascara.',
    image: brandImages.lashLiftCloseUp,
    benefits: ['Deep carbon intensity', 'No morning mascara needed', 'Smudge-proof & waterproof'],
  },
  {
    id: 'lash-lift',
    name: 'Lash Lift',
    category: 'Lashes',
    price: 35,
    duration: '45 min',
    description: 'Natural lash enhancement curling your own natural lashes from the root for wide-awake, sky-high lift.',
    image: brandImages.lashLiftCloseUp,
    benefits: ['No eyelash curler needed', 'Works with your natural lashes', 'Lasts 6–8 weeks'],
  },
  {
    id: 'lash-lift-tint',
    name: 'Lash Lift & Tint',
    category: 'Lashes',
    price: 40,
    duration: '60 min',
    description: 'Our most requested eye treatment! Gentle silicone shield lifting paired with high-shine black tint for mesmerizing eyes.',
    image: brandImages.heroModel,
    badge: 'Client Favourite',
    popular: true,
    benefits: ['Eye-opening lift', 'Deep glossy black finish', 'Zero maintenance daily wear'],
  },
  {
    id: 'lash-clusters',
    name: 'Lash Clusters',
    category: 'Lashes',
    price: 30,
    duration: '45 min',
    description: 'Delicate cluster lash application customised for light daytime flutter or dramatic weekend volume.',
    image: brandImages.lashClusters,
    badge: 'Glam Choice',
    benefits: ['Custom density & length', 'Ideal for events & weekends', 'Weightless comfortable wear'],
  },

  // WAXING
  {
    id: 'lip-chin-wax',
    name: 'Lip or Chin Wax',
    category: 'Waxing',
    price: 7,
    duration: '10 min',
    description: 'Quick, gentle hair removal with soothing post-wax treatment for soft, hair-free skin.',
    image: brandImages.waxingCare,
    benefits: ['Fast & gentle technique', 'Smooth makeup application', 'Soothing lavender finish'],
  },
  {
    id: 'full-face-wax',
    name: 'Full Face Wax',
    category: 'Waxing',
    price: 22,
    duration: '30 min',
    description: 'Comprehensive facial smoothing covering upper lip, chin, cheeks, and jawline for silky skin.',
    image: brandImages.waxingCare,
    benefits: ['Exfoliates dead skin cells', 'Flawless foundation glide', 'Long-lasting smoothness'],
  },
  {
    id: 'underarm-wax',
    name: 'Underarm Wax',
    category: 'Waxing',
    price: 10,
    duration: '15 min',
    description: 'Effective warm strip waxing designed for delicate underarm skin with minimal discomfort.',
    image: brandImages.waxingCare,
    benefits: ['Clean & hygienic', 'Slows hair regrowth', 'Calming aftercare lotion'],
  },
  {
    id: 'half-leg-wax',
    name: 'Half Leg Wax',
    category: 'Waxing',
    price: 18,
    duration: '25 min',
    description: 'Lower or upper leg waxing leaving legs silky smooth for weeks.',
    image: brandImages.waxingCare,
    benefits: ['Silky soft legs', '3–4 weeks hair-free', 'Hydrating finish'],
  },

  // PACKAGES
  {
    id: 'sapphire-signature-package',
    name: 'The Sapphire Signature',
    category: 'Packages',
    price: 70,
    originalPrice: 77,
    duration: '90 min',
    description: 'The ultimate Kingswood glow-up: Lash Lift & Tint combined with full Brow Lamination & Tint. Save £7 on our top two services.',
    image: brandImages.realClientBrows,
    badge: 'Signature Duo · Save £7',
    popular: true,
    benefits: ['Complete eye & brow transformation', 'Save £7 vs separate bookings', 'Leave looking completely refreshed'],
  },
  {
    id: 'brow-lash-refresh',
    name: 'Brow & Lash Refresh',
    category: 'Packages',
    price: 28,
    duration: '40 min',
    description: 'Express beauty booster: Brow Wax, Brow Tint, and Lash Tint in one comfortable sitting.',
    image: brandImages.browShapeTint,
    badge: 'Value Pack',
    benefits: ['Quick 40-min turnaround', 'Perfect for monthly maintenance', 'Polished everyday natural look'],
  },
  {
    id: 'gift-voucher-50',
    name: 'Sapphire Beauty Gift Voucher (£50)',
    category: 'Packages',
    price: 50,
    duration: 'Instant / Physical',
    description: 'Treat someone special to bespoke brow & lash pampering at our Kings Chase Shopping Centre boutique.',
    image: brandImages.giftBox,
    badge: 'Gifting',
    benefits: ['Valid for 12 months', 'Redeemable on all treatments & aftercare', 'Beautiful presentation envelope or digital'],
  },
];
