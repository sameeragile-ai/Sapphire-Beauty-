import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, MessageSquare, Phone, Instagram, Facebook, Clock, X } from 'lucide-react';
import { siteConfig, getLiveSalonStatus } from '../../data/siteConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  hamburgerRef?: React.RefObject<HTMLButtonElement | null>;
}

const NAV_ITEMS = [
  { label: 'Home', path: '/', index: '01' },
  { label: 'Treatments & Prices', path: '/treatments', index: '02' },
  { label: 'Aftercare Shop', path: '/shop', index: '03' },
  { label: 'About Studio', path: '/about', index: '04' },
  { label: 'Client Gallery', path: '/gallery', index: '05' },
  { label: 'Contact & Location', path: '/contact', index: '06' },
  { label: 'Booking Bag', path: '/cart', index: '07' },
];

const QUICK_CHIPS = [
  { label: 'Lash Lift & Tint', path: '/treatments?category=Lashes' },
  { label: 'Brow Lamination', path: '/treatments?category=Brows' },
  { label: 'Facial Waxing', path: '/treatments?category=Waxing' },
  { label: 'Signature Duo', path: '/treatments?category=Packages' },
  { label: 'Gift Vouchers', path: '/shop' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, hamburgerRef }) => {
  const location = useLocation();
  const liveStatus = getLiveSalonStatus();
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and handle Esc key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      hamburgerRef?.current?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, hamburgerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuContainerRef}
          initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)', opacity: 0 }}
          animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)', opacity: 1 }}
          exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-45 bg-[#121a3d] text-white flex flex-col justify-between overflow-y-auto px-6 pt-24 pb-10 film-grain"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Drifting ambient rose glow */}
          <div className="absolute top-1/4 -right-16 w-80 h-80 bg-[#D6336C]/25 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 -left-16 w-80 h-80 bg-[#6B2E6E]/25 rounded-full blur-[100px] pointer-events-none" />

          {/* Close button inside modal for extra accessibility */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Staggered Serif Links */}
          <div className="relative z-10 flex flex-col space-y-4 my-auto pt-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#F06A9B] font-bold">
              Directory
            </span>

            {NAV_ITEMS.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * idx, duration: 0.35, ease: 'easeOut' }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="text-xs font-mono text-white/35 tabular-nums">
                      {item.index}
                    </span>
                    <span
                      className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-200 group-hover:translate-x-2 ${
                        isActive
                          ? 'text-gradient-rose'
                          : 'text-white/90 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Module: Quick Chips, WhatsApp CTA, Hours & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="relative z-10 pt-6 border-t border-white/15 space-y-5"
          >
            {/* Horizontal swipeable row of service chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50 block font-semibold">
                Quick Treatments
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {QUICK_CHIPS.map((chip) => (
                  <Link
                    key={chip.label}
                    to={chip.path}
                    onClick={onClose}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white/90 whitespace-nowrap border border-white/10 transition-colors"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Full-width Book Now WhatsApp Button */}
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-sapphire-glow text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D6336C]/25 animate-shimmer text-center"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Book Appointment ({siteConfig.contact.phone})</span>
            </a>

            {/* Live Hours & Socials */}
            <div className="flex items-center justify-between text-xs text-white/70 pt-1">
              <div className="flex items-center gap-1.5 text-[#F06A9B]">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-semibold text-[11px]">{liveStatus.text}</span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F06A9B] transition-colors p-1"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F06A9B] transition-colors p-1"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneInternational}`}
                  className="hover:text-[#F06A9B] transition-colors p-1"
                  aria-label="Call salon"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
