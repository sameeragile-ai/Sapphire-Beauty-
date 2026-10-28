import React, { useState } from 'react';
import { ShoppingBag, Check, Sparkles, Heart } from 'lucide-react';
import { ProductItem } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);

  const isLiked = isWishlisted(product.id);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      type: 'product',
      image: product.image,
      meta: product.volume,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="group rounded-3xl bg-white border border-[#FCE4EC] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-400 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Product Image */}
        <div className="relative overflow-hidden arch-frame-soft mx-3 mt-3 aspect-square bg-[#FCE4EC]">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            aspectRatioClass="aspect-square"
            className="group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#121a3d]/85 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider border border-[#F06A9B]/30 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#F06A9B]" />
              <span>{product.badge}</span>
            </div>
          )}

          {/* Wishlist Heart Button */}
          <button
            onClick={() =>
              toggleWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                type: 'product',
                image: product.image,
              })
            }
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isLiked
                ? 'bg-[#D6336C] text-white shadow-md'
                : 'bg-white/80 hover:bg-white text-[#1E2A5A] hover:text-[#D6336C] shadow-xs'
            }`}
            aria-label={isLiked ? `Remove ${product.name} from favourites` : `Save ${product.name} to favourites`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          </button>

          {/* Volume */}
          <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[#1E2A5A] text-[10px] font-semibold shadow-xs">
            {product.volume}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#1E2A5A]/50">
            <span>{product.category}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-[#1E2A5A] group-hover:text-[#D6336C] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#1E2A5A]/70 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="pt-2 flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-[#1E2A5A] tabular-nums">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#1E2A5A]/40 line-through tabular-nums">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-5 pt-0">
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xs ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#FFF8FA] hover:bg-sapphire-glow text-[#1E2A5A] hover:text-white border border-[#FCE4EC] hover:border-transparent'
          }`}
          aria-label={`Add ${product.name} to bag`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
