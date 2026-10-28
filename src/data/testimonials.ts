export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  treatment: string;
  date: string;
  text: string;
  verified: boolean;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Gemma T.',
    location: 'Kingswood, Bristol',
    rating: 5,
    treatment: 'Lash Lift & Tint',
    date: '3 weeks ago',
    text: "Honestly couldn't believe my own lashes when she handed me the mirror! They look so long and curled without needing any mascara. The salon pod inside Kings Chase is spotless and she puts you at ease right away.",
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Chloe M.',
    location: 'Hanham, Bristol',
    rating: 5,
    treatment: 'Brow Lamination + Tint + Shape',
    date: '1 month ago',
    text: "Best brow lamination I've ever had in Bristol. I had sparse patches from over-plucking years ago, and she made them look fluffy and totally natural. She's been doing brows for 15 years and it really shows in the precision.",
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Sarah P.',
    location: 'Warmley, Bristol',
    rating: 5,
    treatment: 'The Sapphire Signature Duo',
    date: '2 months ago',
    text: "So handy having her right in Kings Chase Shopping Centre opposite Boots. Popped in during my lunch break, had a lovely chat, and walked out looking like a brand new person! 100% recommend to anyone.",
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Nicola B.',
    location: 'St George, Bristol',
    rating: 5,
    treatment: 'Brow Wax, Shape & Tint',
    date: '1 month ago',
    text: "Never trusted anyone with my brows until coming to Sapphire Beauty. Super friendly, listens to exactly what shape you want, and doesn't take too much off. The colour match was spot on.",
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Hannah W.',
    location: 'Longwell Green, Bristol',
    rating: 5,
    treatment: 'Lash Clusters & Lip Wax',
    date: '3 weeks ago',
    text: "Booked in for weekend lash clusters before a family party. They felt so weightless and looked gorgeous in every photo! Quick, gentle waxing too. Will definitely be a regular now.",
    verified: true,
  },
];
