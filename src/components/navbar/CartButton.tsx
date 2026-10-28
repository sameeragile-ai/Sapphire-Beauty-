import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartButtonProps {
  isLightNav?: boolean;
}

export const CartButton: React.FC<CartButtonProps> = ({ isLightNav }) => {
  const { items, itemCount, subtotal, openDrawer, removeItem, lastAddedItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger pop animation when item is added
  useEffect(() => {
    if (lastAddedItem) {
      setIsPopping(true);
      const timer = setTimeout(() => setIsPopping(false), 900);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ripple ring effect on add */}
      {isPopping && (
        <span className="absolute -inset-2 rounded-full border border-[#D6336C] animate-ping opacity-60 pointer-events-none" />
      )}

      {/* Main Button */}
      <button
        onClick={openDrawer}
        className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isLightNav
            ? 'text-[#1E2A5A] hover:bg-[#FCE4EC]/60'
            : 'text-white hover:bg-white/10'
        } ${isPopping ? 'animate-[wiggle_0.4s_ease-in-out]' : ''}`}
        aria-label={`View shopping and booking bag (${itemCount} items)`}
      >
        <ShoppingBag className="w-5 h-5" />

        {/* Count Badge */}
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 0.6 }}
            animate={{ scale: isPopping ? [1, 1.45, 1] : 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-sapphire-glow text-white text-[10px] font-bold flex items-center justify-center shadow-md tabular-nums border border-white/20"
          >
            {itemCount}
          </motion.span>
        )}
      </button>

      {/* Mini Preview Dropdown on Desktop Hover */}
      <AnimatePresence>
        {isHovered && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className={`hidden lg:block absolute right-0 top-full mt-2 w-72 rounded-2xl p-4 shadow-2xl border backdrop-blur-xl z-50 ${
              isLightNav
                ? 'bg-[#FFF8FA]/95 border-[#FCE4EC] text-[#1E2A5A]'
                : 'bg-[#121a3d]/95 border-white/15 text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-current/10 text-xs font-bold uppercase tracking-wider text-[#D6336C]">
              <span>Bag Preview</span>
              <span className="text-[10px] text-current/60 font-normal tabular-nums">
                {itemCount} items
              </span>
            </div>

            {/* Top 3 items */}
            <div className="divide-y divide-current/10 my-2 max-h-56 overflow-y-auto no-scrollbar">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="py-2 flex items-center gap-2.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-9 h-9 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-serif font-bold text-xs truncate leading-tight">
                      {item.name}
                    </h5>
                    <span className="text-[10px] opacity-60">
                      {item.quantity} × £{item.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    className="opacity-40 hover:opacity-100 text-[#D6336C] p-1"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-current/10 flex items-center justify-between text-xs font-semibold">
              <span className="opacity-70">Estimated Total:</span>
              <span className="font-serif font-bold text-sm tabular-nums">
                £{subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                setIsHovered(false);
                openDrawer();
              }}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-sapphire-glow text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-transform hover:scale-[1.02]"
            >
              <span>View Full Bag &amp; Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
