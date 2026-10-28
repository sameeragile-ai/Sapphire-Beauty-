import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Phone, Clock, MessageSquare, Instagram, Facebook } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../../context/CartContext';
import { siteConfig, getLiveSalonStatus } from '../../data/siteConfig';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/treatments', label: 'Treatments' },
  { path: '/shop', label: 'Shop' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { itemCount, openDrawer } = useCart();
  const isHomePage = location.pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lastScrollY = useRef(0);
  const liveStatus = getLiveSalonStatus();

  // Scroll tracking: transparent vs frosted glass, smart hide/show, scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        setScrollProgress((currentScrollY / scrollHeight) * 100);
      }

      // Frosted transition threshold: 40px
      setIsScrolled(currentScrollY > 40);

      // Smart hide on fast scroll down (> 150px scrolled and moving down fast)
      if (currentScrollY > 150 && currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 5 || currentScrollY <= 80) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // On home page top, hero is dark, so transparent navbar has inverted (white) text.
  // When scrolled OR on any inner page, navbar is frosted light glass with Sapphire text.
  const isTransparent = isHomePage && !isScrolled && !mobileMenuOpen;

  return (
    <>
      {/* Top scroll-progress line */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #1E2A5A 0%, #6B2E6E 50%, #D6336C 100%)',
          width: `${scrollProgress}%`,
          opacity: isScrolled ? 1 : 0.4,
          transition: 'width 0.1s ease-out, opacity 0.3s ease',
        }}
      />

      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isTransparent
            ? 'h-[88px] bg-transparent text-white'
            : 'h-[68px] bg-[#FFF8FA]/75 backdrop-blur-[16px] backdrop-saturate-[180%] text-[#1E2A5A] border-b border-[#D6336C]/20 shadow-[0_4px_20px_rgba(30,42,90,0.04)]'
        }`}
      >
        <div className="max-w-[1320px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* ZONE 1: BRAND LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-[#D6336C] rounded-lg transition-transform hover:scale-[1.02]"
            aria-label="Sapphire Beauty Kingschase - Return to homepage"
          >
            <BrandLogo
              size={isScrolled ? 'sm' : 'md'}
              inverted={isTransparent}
            />
          </Link>

          {/* ZONE 2: DESKTOP NAV LINKS (4-5 items with sliding gradient indicator) */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium shrink-0"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 whitespace-nowrap transition-colors duration-200 text-xs uppercase tracking-[0.15em] font-semibold ${
                    isActive
                      ? isTransparent
                        ? 'text-[#F06A9B]'
                        : 'text-[#D6336C]'
                      : isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-[#1E2A5A]/75 hover:text-[#1E2A5A]'
                  }`}
                >
                  {link.label}

                  {/* Active Link Glow Pill / Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#1E2A5A] via-[#6B2E6E] to-[#D6336C]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ZONE 3: ACTIONS (Cart icon + Book Now button + Mobile Hamburger) */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              className={`relative p-2.5 rounded-full transition-colors ${
                isTransparent
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-[#FCE4EC]/50 text-[#1E2A5A]'
              }`}
              aria-label={`View cart (${itemCount} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-sapphire-glow text-white text-[11px] font-bold flex items-center justify-center shadow-xs tabular-nums"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Book Now Button (Desktop) */}
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-sapphire-glow text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 animate-shimmer whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
              <span>Book Now</span>
            </a>

            {/* Mobile Hamburger Morphing to X */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-lg transition-colors focus:outline-hidden ${
                isTransparent && !mobileMenuOpen
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#1E2A5A] hover:bg-[#FCE4EC]/50'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'rotate-45 translate-y-2 bg-white'
                      : isTransparent
                      ? 'bg-white'
                      : 'bg-[#1E2A5A]'
                  }`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-200 ${
                    mobileMenuOpen
                      ? 'opacity-0 bg-white'
                      : isTransparent
                      ? 'bg-white'
                      : 'bg-[#1E2A5A]'
                  }`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? '-rotate-45 -translate-y-2.5 bg-white'
                      : isTransparent
                      ? 'bg-white'
                      : 'bg-[#1E2A5A]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE OVERLAY MENU (Midnight background with blurred color orbs) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-35 bg-[#121a3d] text-white flex flex-col justify-between p-6 pt-28 overflow-y-auto"
          >
            {/* Blurred colour orbs in background */}
            <div className="absolute top-1/4 -right-16 w-64 h-64 bg-[#D6336C]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-[#6B2E6E]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Menu Links */}
            <div className="relative z-10 flex flex-col space-y-4 my-auto">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#F06A9B] font-semibold mb-2">
                Navigation
              </span>
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`font-serif text-3xl font-bold tracking-tight block py-1.5 transition-colors ${
                      location.pathname === link.path
                        ? 'text-[#F06A9B]'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Contact & Hours Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="relative z-10 pt-6 border-t border-white/10 space-y-4 text-xs text-white/80"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#F06A9B] font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  {liveStatus.text}
                </span>
                <span className="text-white/60">Kings Chase, Bristol</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${siteConfig.contact.phoneInternational}`}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F06A9B]" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-white/50 block">Call Us</span>
                    <span className="font-semibold text-xs text-white truncate block">
                      {siteConfig.contact.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-sapphire-glow text-white flex items-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <MessageSquare className="w-4 h-4" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-white/70 block">Instant Chat</span>
                    <span className="font-bold text-xs truncate block">WhatsApp</span>
                  </div>
                </a>
              </div>

              {/* Social icons */}
              <div className="flex items-center justify-center gap-6 pt-3 text-white/70">
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F06A9B] transition-colors p-2"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F06A9B] transition-colors p-2"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
