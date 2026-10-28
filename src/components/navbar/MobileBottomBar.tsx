import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface MobileBottomBarProps {
  isVisible: boolean;
  isMenuOpen: boolean;
  isCartDrawerOpen: boolean;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  isVisible,
  isMenuOpen,
  isCartDrawerOpen,
}) => {
  const location = useLocation();
  const { itemCount, openDrawer } = useCart();
  const { count: wishlistCount, openWishlist } = useWishlist();

  // Hide if menu or cart drawer is open, or on desktop
  const shouldRender = isVisible && !isMenuOpen && !isCartDrawerOpen;

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex justify-center pointer-events-none"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="pointer-events-auto bg-[#121a3d]/88 backdrop-blur-xl border border-[#D6336C]/30 shadow-[0_10px_35px_-5px_rgba(30,42,90,0.5)] rounded-full px-5 py-2.5 flex items-center justify-between gap-6 text-white max-w-sm w-full">
            {/* Home */}
            <Link
              to="/"
              className={`flex flex-col items-center gap-1 transition-colors ${
                location.pathname === '/' ? 'text-[#F06A9B]' : 'text-white/70 hover:text-white'
              }`}
              aria-label="Home"
            >
              <Home className="w-5 h-5" />
              <span className="text-[9px] uppercase tracking-wider font-semibold">Home</span>
            </Link>

            {/* Treatments */}
            <Link
              to="/treatments"
              className={`flex flex-col items-center gap-1 transition-colors ${
                location.pathname.startsWith('/treatments')
                  ? 'text-[#F06A9B]'
                  : 'text-white/70 hover:text-white'
              }`}
              aria-label="Treatments"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-[9px] uppercase tracking-wider font-semibold">Menu</span>
            </Link>

            {/* Favourites */}
            <button
              onClick={openWishlist}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-[#F06A9B] transition-colors relative"
              aria-label="Saved favourites"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D6336C] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
              <span className="text-[9px] uppercase tracking-wider font-semibold">Saved</span>
            </button>

            {/* Cart / Bag */}
            <button
              onClick={openDrawer}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-[#F06A9B] transition-colors relative"
              aria-label="Open booking bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sapphire-glow text-white text-[9px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="text-[9px] uppercase tracking-wider font-semibold">Bag</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
