import React, { useState } from 'react';
import { Clock, Check, Plus, Sparkles, Heart } from 'lucide-react';
import { ServiceItem } from '../../data/services';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const TreatmentCard: React.FC<{ service: ServiceItem; featured?: boolean }> = ({
  service,
  featured = false,
}) => {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);

  const isLiked = isWishlisted(service.id);

  const handleAdd = () => {
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
      originalPrice: service.originalPrice,
      type: 'treatment',
      image: service.image,
      meta: service.duration,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      className={`group relative rounded-3xl bg-white border border-[#FCE4EC] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-400 hover:-translate-y-1 flex flex-col justify-between ${
        featured ? 'ring-2 ring-[#D6336C]/30 bg-gradient-to-b from-white to-[#FFF8FA]' : ''
      }`}
    >
      <div>
        {/* Card Image */}
        <div className="relative overflow-hidden arch-frame-soft mx-3 mt-3 aspect-[4/3] bg-[#FCE4EC]">
          <ImageWithFallback
            src={service.image}
            alt={service.name}
            aspectRatioClass="aspect-[4/3]"
            className="group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Badge */}
          {service.badge && (
            <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#121a3d]/85 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider border border-[#F06A9B]/30 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#F06A9B]" />
              <span>{service.badge}</span>
            </div>
          )}

          {/* Wishlist Heart Button */}
          <button
            onClick={() =>
              toggleWishlist({
                id: service.id,
                name: service.name,
                price: service.price,
                type: 'treatment',
                image: service.image,
              })
            }
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isLiked
                ? 'bg-[#D6336C] text-white shadow-md'
                : 'bg-white/80 hover:bg-white text-[#1E2A5A] hover:text-[#D6336C] shadow-xs'
            }`}
            aria-label={isLiked ? `Remove ${service.name} from favourites` : `Save ${service.name} to favourites`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          </button>

          {/* Duration Pill */}
          <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#1E2A5A] text-[11px] font-semibold flex items-center gap-1 shadow-xs">
            <Clock className="w-3 h-3 text-[#D6336C]" />
            <span>{service.duration}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E2A5A] group-hover:text-[#D6336C] transition-colors leading-tight">
              {service.name}
            </h3>
            <div className="text-right shrink-0">
              <div className="flex items-baseline gap-1.5 justify-end">
                {service.originalPrice && (
                  <span className="text-xs text-[#1E2A5A]/40 line-through">
                    £{service.originalPrice}
                  </span>
                )}
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#1E2A5A] tabular-nums">
                  £{service.price}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#1E2A5A]/75 leading-relaxed line-clamp-3">
            {service.description}
          </p>

          {/* Benefits Tags */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {service.benefits.map((benefit, i) => (
              <span
                key={i}
                className="text-[11px] text-[#1E2A5A]/60 bg-[#FFF8FA] border border-[#FCE4EC] px-2 py-0.5 rounded-md"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Button Action */}
      <div className="p-5 sm:p-6 pt-0">
        <button
          onClick={handleAdd}
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xs ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#FFF8FA] hover:bg-sapphire-glow text-[#1E2A5A] hover:text-white border border-[#FCE4EC] hover:border-transparent hover:shadow-md'
          }`}
          aria-label={`Add ${service.name} to booking`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 animate-scale-in" />
              <span>Added to Booking</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to Booking</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
