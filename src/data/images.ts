export interface ImageAsset {
  src: string;
  fallback: string;
  alt: string;
}

export const brandImages = {
  // Real client assets uploaded by user
  logo: "/logo.png",
  studioPod: "/studio.jpg",
  realClientBrows: "/client-brows.jpg",
  easterPoster: "/assets/aistudio/657399406_18077945303611365_6748912150577746125_n_4009b2cf.jfif",
  instagramScreenshot: "/assets/aistudio/screencapture-instagram-sapphirebeauty-kingschase-2026-10-28-18_00_55_1d6bded0.png",

  // Curated high-res beauty photos for treatments & hero
  heroModel: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
  lashLiftCloseUp: "https://images.unsplash.com/photo-1583001809863-234b12379c4a?auto=format&fit=crop&w=1200&q=80",
  browLaminationCloseUp: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
  browShapeTint: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  lashClusters: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
  waxingCare: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  luxurySerum: "https://images.unsplash.com/photo-1608248597359-0095817c1815?auto=format&fit=crop&w=1200&q=80",
  browGel: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
  aftercareKit: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
  giftBox: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
  spoolieTools: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80",
  salonInterior: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",

  // Before & After comparison pairs
  beforeAfter: [
    {
      id: "lash-lift-pair",
      title: "Lash Lift & Deep Tint",
      before: "https://images.unsplash.com/photo-1583001809863-234b12379c4a?auto=format&fit=crop&w=900&q=80",
      after: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
      description: "Dramatic natural curl and carbon black tint lasting 6–8 weeks without mascara.",
    },
    {
      id: "brow-lamination-pair",
      title: "Brow Lamination & Hybrid Tint",
      before: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
      after: "/client-brows.jpg",
      description: "Real Sapphire Beauty client: fluffy symmetry, precise styling, and defined arch.",
    },
  ],

  // Gallery items for the gallery page & home grid
  gallery: [
    {
      id: "gal-1",
      src: "/client-brows.jpg",
      title: "Real Client Brow & Lash Transformation",
      category: "Brows & Lashes",
      caption: "Brows mapped, laminated and tinted with soft natural lift in Kings Chase studio.",
    },
    {
      id: "gal-2",
      src: "/studio.jpg",
      title: "Sapphire Beauty Boutique Pod",
      category: "The Studio",
      caption: "Our chic private studio pod inside Kings Chase Shopping Centre, Kingswood.",
    },
    {
      id: "gal-3",
      src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
      title: "Signature Lash Lift & Tint",
      category: "Lashes",
      caption: "Featherlight lift highlighting client eye colour.",
    },
    {
      id: "gal-4",
      src: "https://images.unsplash.com/photo-1583001809863-234b12379c4a?auto=format&fit=crop&w=900&q=80",
      title: "Lash Clusters for Weekend Glam",
      category: "Lashes",
      caption: "Custom weightless cluster fans designed for instant eye-opening fullness.",
    },
    {
      id: "gal-5",
      src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
      title: "Sculpted Brow Architecture",
      category: "Brows",
      caption: "Precision wax and tidy creating crisp clean brow lines.",
    },
    {
      id: "gal-6",
      src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
      title: "Calm Studio Treatment Chair",
      category: "The Studio",
      caption: "Relaxing boutique environment with personal 1-on-1 attention.",
    },
  ],
};
