import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, closeWishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem, openDrawer } = useCart();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-[#121a3d]/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-[400px] h-full bg-[#FFF8FA] text-[#1E2A5A] shadow-2xl flex flex-col z-10 border-l border-[#FCE4EC]"
            role="dialog"
            aria-label="Your Favourites & Wishlist"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#FCE4EC] flex items-center justify-between bg-white/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FCE4EC] flex items-center justify-center text-[#D6336C]">
                  <Heart className="w-4 h-4 fill-[#D6336C]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1E2A5A]">
                    Saved Favourites
                  </h3>
                  <span className="text-xs text-[#1E2A5A]/60">
                    {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved
                  </span>
                </div>
              </div>

              <button
                onClick={closeWishlist}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E2A5A]/60 hover:text-[#1E2A5A] hover:bg-[#FCE4EC]/50"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
                  <div className="w-14 h-14 rounded-full bg-[#FCE4EC] flex items-center justify-center text-[#D6336C] mb-3">
                    <Heart className="w-7 h-7 opacity-60" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1E2A5A]">
                    No favourites yet
                  </h4>
                  <p className="text-xs text-[#1E2A5A]/70 max-w-xs mt-1 mb-6">
                    Tap the heart icon on any treatment or product to save your wishlist.
                  </p>
                  <Link
                    to="/treatments"
                    onClick={closeWishlist}
                    className="px-5 py-2.5 rounded-full bg-sapphire-glow text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Browse Treatments
                  </Link>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#FCE4EC] flex items-center gap-3 shadow-2xs"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="font-serif font-bold text-sm text-[#1E2A5A] truncate">
                        {item.name}
                      </h5>
                      <span className="font-serif text-xs font-bold text-[#D6336C]">
                        £{item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            type: item.type,
                            image: item.image,
                          });
                          closeWishlist();
                          openDrawer();
                        }}
                        className="p-2 rounded-xl bg-sapphire-glow text-white text-xs hover:scale-105 transition-transform"
                        title="Add to booking bag"
                        aria-label={`Add ${item.name} to booking bag`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 rounded-xl text-[#1E2A5A]/40 hover:text-[#D6336C] hover:bg-[#FCE4EC]/50 transition-colors"
                        title="Remove from favourites"
                        aria-label={`Remove ${item.name} from favourites`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="p-4 border-t border-[#FCE4EC] bg-white flex justify-between items-center text-xs">
                <button
                  onClick={clearWishlist}
                  className="text-[#1E2A5A]/60 hover:text-[#D6336C]"
                >
                  Clear all favourites
                </button>
                <Link
                  to="/treatments"
                  onClick={closeWishlist}
                  className="text-[#D6336C] font-semibold flex items-center gap-1"
                >
                  <span>Explore more</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
