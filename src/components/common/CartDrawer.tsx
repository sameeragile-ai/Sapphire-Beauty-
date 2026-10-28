import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight, MessageSquare, Mail, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    giftRemaining,
    hasFreeGift,
    generateWhatsAppLink,
    generateMailtoLink,
  } = useCart();

  const progressPercentage = Math.min(100, (subtotal / siteConfig.freeGiftThreshold) * 100);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-[#121a3d]/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-[440px] h-full bg-[#FFF8FA] text-[#1E2A5A] shadow-2xl flex flex-col z-10 border-l border-[#FCE4EC]"
            role="dialog"
            aria-modal="true"
            aria-label="Your Booking & Shopping Bag"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#FCE4EC] flex items-center justify-between bg-white/70 backdrop-blur-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FCE4EC] flex items-center justify-center text-[#D6336C]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold tracking-tight text-[#1E2A5A]">
                    Your Booking Bag
                  </h2>
                  <span className="text-xs text-[#1E2A5A]/60">
                    {items.length === 0 ? 'Empty bag' : `${items.length} service/item selected`}
                  </span>
                </div>
              </div>

              <button
                onClick={closeDrawer}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#1E2A5A]/60 hover:text-[#1E2A5A] hover:bg-[#FCE4EC]/50 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Gift / Perks Banner */}
            <div className="bg-gradient-to-r from-[#FCE4EC] to-[#F8C8DC] px-5 py-3 border-b border-[#F3D5E4]">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-[#1E2A5A]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D6336C]" />
                  {hasFreeGift ? 'Free Gift Unlocked!' : 'Complimentary Salon Gift'}
                </span>
                <span className="text-[#D6336C] font-bold">
                  {hasFreeGift ? 'Qualified' : `£${giftRemaining.toFixed(2)} to go`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1E2A5A] via-[#6B2E6E] to-[#D6336C] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-[11px] text-[#1E2A5A]/70 mt-1">
                {hasFreeGift
                  ? 'You receive a free spoolie & brow care oil with your visit.'
                  : `Spend £${siteConfig.freeGiftThreshold} on treatments or aftercare for a free brow tool kit.`}
              </p>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-[#FCE4EC] flex items-center justify-center text-[#D6336C] mb-4">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1E2A5A] mb-1">
                    Your bag is empty
                  </h3>
                  <p className="text-sm text-[#1E2A5A]/70 max-w-xs mb-6">
                    Browse our bespoke brow laminations, lash lifts, and aftercare essentials.
                  </p>
                  <Link
                    to="/treatments"
                    onClick={closeDrawer}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sapphire-glow text-white text-xs font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    Explore Treatments
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3.5 rounded-xl bg-white border border-[#FCE4EC] shadow-xs group"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#FCE4EC]/50 border border-[#FCE4EC]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-[#1E2A5A] leading-snug line-clamp-2">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#1E2A5A]/40 hover:text-[#D6336C] p-1 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.meta && (
                          <span className="text-[11px] text-[#1E2A5A]/60 block mt-0.5">
                            {item.meta}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FCE4EC]/60">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#FCE4EC] rounded-md bg-[#FFF8FA]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#1E2A5A]/70 hover:text-[#1E2A5A] hover:bg-[#FCE4EC]/40 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#1E2A5A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#1E2A5A]/70 hover:text-[#1E2A5A] hover:bg-[#FCE4EC]/40 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-serif text-sm font-bold text-[#1E2A5A] tabular-nums">
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[10px] text-[#1E2A5A]/50">
                              £{item.price.toFixed(2)} each
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#FCE4EC] bg-white/90 backdrop-blur-xs space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#1E2A5A]/70">Estimated Total:</span>
                  <span className="font-serif text-2xl font-bold text-[#1E2A5A] tabular-nums">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="text-[11px] text-[#1E2A5A]/60 flex items-center justify-between">
                  <span>Pay at salon or reserve time slots</span>
                  <button
                    onClick={clearCart}
                    className="text-[#D6336C] hover:underline transition-all"
                  >
                    Clear all
                  </button>
                </div>

                {/* Primary WhatsApp Action */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-sapphire-glow text-white flex items-center justify-center gap-2.5 font-sans font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center animate-shimmer"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Book via WhatsApp ({siteConfig.contact.phone})</span>
                </a>

                {/* Secondary Mailto Fallback */}
                <a
                  href={generateMailtoLink()}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#1E2A5A]/20 text-[#1E2A5A] hover:bg-[#FCE4EC]/40 flex items-center justify-center gap-2 text-xs font-semibold transition-colors text-center"
                >
                  <Mail className="w-3.5 h-3.5 text-[#1E2A5A]/70" />
                  <span>Request Booking by Email</span>
                </a>

                <p className="text-[10px] text-center text-[#1E2A5A]/50 pt-1">
                  Kings Chase Shopping Centre · Outside Boots · Walk-ins also welcome
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
