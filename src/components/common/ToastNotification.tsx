import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { lastAddedItem, clearToast, openDrawer } = useCart();

  return (
    <AnimatePresence>
      {lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 max-w-sm w-[92vw] md:w-auto"
        >
          <div className="bg-white/95 backdrop-blur-md border border-[#FCE4EC] rounded-2xl p-4 shadow-xl flex items-center gap-3.5 text-[#1E2A5A]">
            {/* Visual Icon */}
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D6336C]">
                  Added to Booking
                </span>
              </div>
              <p className="font-serif font-bold text-sm text-[#1E2A5A] truncate">
                {lastAddedItem.name}
              </p>
              <span className="text-xs text-[#1E2A5A]/60">
                £{lastAddedItem.price.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  clearToast();
                  openDrawer();
                }}
                className="px-3 py-1.5 rounded-lg bg-sapphire-glow text-white text-xs font-bold tracking-wide flex items-center gap-1 shadow-xs hover:shadow transition-transform active:scale-95"
              >
                <span>Bag</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={clearToast}
                className="w-7 h-7 rounded-full text-[#1E2A5A]/40 hover:text-[#1E2A5A] flex items-center justify-center transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
