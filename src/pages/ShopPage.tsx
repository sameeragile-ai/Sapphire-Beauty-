import React, { useState, useMemo } from 'react';
import { Sparkles, ShoppingBag, Gift, Truck } from 'lucide-react';
import { productsData } from '../data/products';
import { ProductCard } from '../components/shop/ProductCard';
import { siteConfig } from '../data/siteConfig';

const CATEGORIES = ['All', 'Aftercare', 'Styling', 'Accessories', 'Gift Sets'];

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return productsData;
    return productsData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="pt-28 pb-20 sm:pb-28 film-grain min-h-screen">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE4EC] text-[#D6336C] text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            <span>Salon Aftercare &amp; Gifts</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E2A5A] tracking-tight">
            Shop the Collection
          </h1>
          <p className="text-sm sm:text-base text-[#1E2A5A]/75 font-light leading-relaxed">
            Salon-grade nourishing serums, locking brow gels, and luxury gift boxes formulated to prolong your results.
          </p>
        </div>

        {/* Free Gift Promo Banner */}
        <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-[#FCE4EC] via-[#F8C8DC] to-[#FCE4EC] border border-[#F3D5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-[#D6336C] flex items-center justify-center shadow-xs shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1E2A5A]">
                Complimentary Salon Spoolie &amp; Brow Oil
              </h4>
              <p className="text-xs text-[#1E2A5A]/70">
                Unlock a free salon tool set with every order or booking over £{siteConfig.freeGiftThreshold}.
              </p>
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-[#D6336C] bg-white/80 px-4 py-2 rounded-full border border-[#D6336C]/20 shadow-2xs">
            Auto-Applies in Bag
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-sapphire-glow text-white shadow-sm'
                  : 'bg-white text-[#1E2A5A]/70 hover:text-[#1E2A5A] border border-[#FCE4EC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Collection & Delivery Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#FCE4EC] flex items-start gap-3.5 shadow-2xs">
            <ShoppingBag className="w-5 h-5 text-[#D6336C] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-base text-[#1E2A5A] mb-1">
                Studio Collection (Free)
              </h4>
              <p className="text-xs text-[#1E2A5A]/70 leading-relaxed">
                Add products to your booking bag and collect during your treatment or pop into our Kings Chase studio
                anytime during open hours.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#FCE4EC] flex items-start gap-3.5 shadow-2xs">
            <Truck className="w-5 h-5 text-[#D6336C] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-base text-[#1E2A5A] mb-1">
                Local Bristol Delivery
              </h4>
              <p className="text-xs text-[#1E2A5A]/70 leading-relaxed">
                Need a gift voucher or serum posted? WhatsApp us on 07904 994275 for Royal Mail First Class dispatch across Bristol &amp; the UK.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
