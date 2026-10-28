import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, MessageSquare, Mail, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';

export const CartPage: React.FC = () => {
  const {
    items,
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
    <div className="pt-28 pb-20 sm:pb-28 film-grain min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE4EC] text-[#D6336C] text-xs font-bold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Booking Bag</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2A5A] tracking-tight">
            Review Your Booking &amp; Bag
          </h1>
          <p className="text-xs sm:text-sm text-[#1E2A5A]/70 mt-1">
            Confirm your selected treatments and aftercare items before sending your appointment request.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[#FCE4EC] text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FCE4EC] text-[#D6336C] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 opacity-60" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1E2A5A] mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-xs sm:text-sm text-[#1E2A5A]/70 max-w-sm mx-auto mb-6">
              You haven&apos;t added any treatments or aftercare products yet. Explore our bespoke services to begin.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/treatments"
                className="px-6 py-3 rounded-full bg-sapphire-glow text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Browse Treatments Menu
              </Link>
              <Link
                to="/shop"
                className="px-6 py-3 rounded-full bg-white text-[#1E2A5A] border border-[#FCE4EC] text-xs font-bold uppercase tracking-wider hover:bg-[#FCE4EC]/40 transition-colors"
              >
                Shop Aftercare
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items List (Col 1-8) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Gift Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FCE4EC] to-[#F8C8DC] border border-[#F3D5E4]">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-[#1E2A5A]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#D6336C]" />
                    {hasFreeGift ? 'Free Gift Unlocked!' : 'Complimentary Salon Gift'}
                  </span>
                  <span className="text-[#D6336C] font-bold">
                    {hasFreeGift ? 'Qualified' : `£${giftRemaining.toFixed(2)} to go`}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1E2A5A] via-[#6B2E6E] to-[#D6336C] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#1E2A5A]/70 mt-1.5">
                  {hasFreeGift
                    ? '🎉 You qualify for our complimentary Rose Gold Spoolie & Nourishing Brow Oil!'
                    : `Add £${giftRemaining.toFixed(2)} more of services or products to unlock a free salon gift.`}
                </p>
              </div>

              {/* Items */}
              <div className="divide-y divide-[#FCE4EC] rounded-2xl bg-white border border-[#FCE4EC] shadow-xs overflow-hidden">
                {items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 flex gap-4 items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[#FCE4EC]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif font-bold text-base text-[#1E2A5A] truncate">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#1E2A5A]/40 hover:text-[#D6336C] p-1 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.meta && (
                        <span className="text-xs text-[#1E2A5A]/60 block mt-0.5">
                          {item.meta}
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#FCE4EC] rounded-lg bg-[#FFF8FA]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#1E2A5A]/70 hover:text-[#1E2A5A]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#1E2A5A]/70 hover:text-[#1E2A5A]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-base sm:text-lg font-bold text-[#1E2A5A] tabular-nums">
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs text-[#1E2A5A]/70 pt-2">
                <Link
                  to="/treatments"
                  className="inline-flex items-center gap-1.5 text-[#D6336C] font-semibold hover:underline"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  <span>Add more treatments</span>
                </Link>

                <button
                  onClick={clearCart}
                  className="text-[#1E2A5A]/50 hover:text-[#D6336C] transition-colors"
                >
                  Clear bag
                </button>
              </div>
            </div>

            {/* Booking Summary Box (Col 9-12) */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#FCE4EC] shadow-sm space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#1E2A5A]">
                Summary
              </h3>

              <div className="space-y-2 text-xs text-[#1E2A5A]/80 divide-y divide-[#FCE4EC]/60">
                <div className="flex justify-between py-1.5">
                  <span>Items / Services:</span>
                  <span className="font-semibold tabular-nums">{items.length}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Location:</span>
                  <span className="font-semibold">Kings Chase, Bristol</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Deposit Required:</span>
                  <span className="text-emerald-700 font-semibold">£0 (Pay at salon)</span>
                </div>
                <div className="flex justify-between py-3 text-base text-[#1E2A5A]">
                  <span className="font-bold">Total Estimated:</span>
                  <span className="font-serif text-2xl font-bold tabular-nums">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-sapphire-glow text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 animate-shimmer"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Book via WhatsApp ({siteConfig.contact.phone})</span>
                </a>

                <a
                  href={generateMailtoLink()}
                  className="w-full py-3 rounded-xl border border-[#1E2A5A]/25 text-[#1E2A5A] hover:bg-[#FCE4EC]/40 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#1E2A5A]/70" />
                  <span>Request by Email</span>
                </a>
              </div>

              <div className="pt-2 border-t border-[#FCE4EC] flex items-center gap-2 text-[11px] text-[#1E2A5A]/60">
                <ShieldCheck className="w-4 h-4 text-[#D6336C] shrink-0" />
                <span>Zero upfront deposit. Flexible rescheduling via WhatsApp.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
