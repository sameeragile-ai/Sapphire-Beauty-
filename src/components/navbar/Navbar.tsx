import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, MessageSquare } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { NavLinks } from './NavLinks';
import { CartButton } from './CartButton';
import { CommandSearch } from './CommandSearch';
import { MobileMenu } from './MobileMenu';
import { WishlistDrawer } from './WishlistDrawer';
import { useScrollState } from '../../hooks/useScrollState';
import { useWishlist } from '../../context/WishlistContext';
import { siteConfig } from '../../data/siteConfig';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isScrolled, progress, navTheme } = useScrollState();
  const { count: wishlistCount, openWishlist } = useWishlist();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Magnetic hover effect for primary "Book" button
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, { stiffness: 350, damping: 20 });
  const springY = useSpring(magneticY, { stiffness: 350, damping: 20 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.22;
    const distanceY = (e.clientY - centerY) * 0.22;
    // Limit to 6px as requested
    magneticX.set(Math.max(-6, Math.min(6, distanceX)));
    magneticY.set(Math.max(-6, Math.min(6, distanceY)));
  };

  const handleMagneticLeave = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isLightVariant = navTheme === 'light';
  const isStateTop = !isScrolled;

  return (
    <>
      {/* Accessible Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#D6336C] text-white rounded-lg text-xs font-bold uppercase tracking-wider"
      >
        Skip to main content
      </a>

      {/* Top subtle dark scrim when at the top (rgba(11,11,13,0.55) -> transparent) */}
      <div
        className={`fixed top-0 left-0 right-0 h-36 pointer-events-none transition-opacity duration-500 z-35 ${
          isStateTop && location.pathname === '/' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(11, 11, 13, 0.6) 0%, transparent 100%)',
        }}
      />

      {/* FIXED NAVBAR WRAPPER */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center pointer-events-auto"
        >
          {/* FLOATING GLASS PILL / FULL-WIDTH MORPHING CONTAINER */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className={`relative flex items-center justify-between transition-all duration-400 ${
              isStateTop
                ? 'w-full max-w-none h-[72px] sm:h-[88px] px-4 sm:px-8 bg-transparent border-transparent'
                : `w-[calc(100%-20px)] sm:w-[calc(100%-40px)] max-w-[1180px] h-[58px] sm:h-[64px] mt-2.5 sm:mt-3 px-4 sm:px-6 rounded-[20px] sm:rounded-full ${
                    isLightVariant
                      ? 'bg-[#FFF8FA]/75 text-[#1E2A5A] shadow-[0_10px_40px_-10px_rgba(214,51,108,0.18),0_2px_10px_rgba(0,0,0,0.06)]'
                      : 'bg-[#141417]/55 text-white shadow-[0_10px_40px_-10px_rgba(214,51,108,0.25),0_2px_10px_rgba(0,0,0,0.4)]'
                  } backdrop-blur-[18px] backdrop-saturate-[160%]`
            }`}
            style={{
              WebkitBackdropFilter: isStateTop ? 'none' : 'blur(18px) saturate(160%)',
            }}
          >
            {/* Animated Rotating 1px Gradient Border in State 2 */}
            {!isStateTop && (
              <div
                className="absolute inset-0 rounded-[20px] sm:rounded-full pointer-events-none p-[1px] -z-10 overflow-hidden"
                aria-hidden="true"
              >
                <div
                  className="w-[200%] h-[200%] -top-1/2 -left-1/2 absolute animate-[spin_8s_linear_infinite]"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #1E2A5A, #6B2E6E, #D6336C, #F06A9B, #C9A96E, #1E2A5A)',
                    opacity: 0.45,
                  }}
                />
                <div
                  className={`w-full h-full rounded-[19px] sm:rounded-full ${
                    isLightVariant ? 'bg-[#FFF8FA]/85' : 'bg-[#141417]/80'
                  }`}
                />
              </div>
            )}

            {/* 2px SCROLL PROGRESS BAR along bottom edge */}
            <div
              className={`absolute bottom-0 left-4 right-4 h-[2px] pointer-events-none overflow-hidden ${
                isStateTop ? 'left-0 right-0' : 'rounded-full'
              }`}
            >
              <div
                className="h-full bg-gradient-to-r from-[#1E2A5A] via-[#6B2E6E] via-[#D6336C] to-[#F06A9B] transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* ====================================================
                LEFT ZONE: Circular Logo with pulsing glow ring
                ==================================================== */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 shrink-0 group focus-visible:outline-hidden"
              aria-label="Sapphire Beauty - Return to home and scroll to top"
            >
              {/* Logo Badge Container with Pulsing Glow Ring & 8° Hover Tilt */}
              <div className="relative flex items-center justify-center">
                {/* Soft pulse glow ring behind badge */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#D6336C] to-[#F06A9B] opacity-30 group-hover:opacity-75 blur-md transition-opacity duration-500 animate-pulse" />

                <motion.div
                  animate={{ scale: isStateTop ? 1 : 0.88 }}
                  transition={{ duration: 0.3 }}
                  className="relative transition-transform duration-300 group-hover:rotate-[8deg]"
                >
                  <BrandLogo
                    size={isStateTop ? 'md' : 'sm'}
                    inverted={!isLightVariant && (!isStateTop || location.pathname === '/')}
                  />
                </motion.div>
              </div>
            </Link>

            {/* ====================================================
                CENTRE ZONE: Desktop Nav Links (Explore, Treatments, Experiences...)
                ==================================================== */}
            <NavLinks isLightNav={isLightVariant} />

            {/* ====================================================
                RIGHT ZONE: Search, Favourites, Cart, Book Pill & Hamburger
                ==================================================== */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Command Search Button (⌘K / Ctrl+K) */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-colors ${
                  isLightVariant
                    ? 'text-[#1E2A5A]/80 hover:text-[#1E2A5A] hover:bg-[#FCE4EC]/60 border border-[#FCE4EC]'
                    : 'text-white/80 hover:text-white hover:bg-white/10 border border-white/15'
                }`}
                aria-label="Open command search (Shortcut: ⌘K or Ctrl+K)"
                title="Command Search (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-[#D6336C]" />
                <span className="hidden md:inline font-medium">Search</span>
                <kbd
                  className={`hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono leading-none ${
                    isLightVariant
                      ? 'bg-white/80 text-[#1E2A5A]/60 border border-[#FCE4EC]'
                      : 'bg-white/10 text-white/60 border border-white/10'
                  }`}
                >
                  ⌘K
                </kbd>
              </button>

              {/* Favourites Heart with Count */}
              <button
                onClick={openWishlist}
                className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                  isLightVariant
                    ? 'text-[#1E2A5A] hover:bg-[#FCE4EC]/60'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label={`Saved favourites (${wishlistCount})`}
                title="View favourites"
              >
                <Heart className="w-4 h-4 text-[#D6336C]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D6336C] text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button with Ripple & Hover Preview */}
              <CartButton isLightNav={isLightVariant} />

              {/* Magnetic Book Pill Button (Desktop / Tablet) */}
              <motion.a
                style={{ x: springX, y: springY }}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-sapphire-glow text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl hover:shadow-[#D6336C]/30 transition-shadow animate-shimmer whitespace-nowrap group"
                aria-label="Book an appointment via WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white/20 group-hover:scale-110 transition-transform" />
                <span>Book Now</span>
              </motion.a>

              {/* MOBILE HAMBURGER (Two lines morphing smoothly to X) */}
              <button
                ref={hamburgerRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-colors focus:outline-hidden ${
                  isLightVariant
                    ? 'text-[#1E2A5A] hover:bg-[#FCE4EC]/60'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 rounded-full transition-all duration-300 origin-center ${
                      mobileMenuOpen
                        ? 'rotate-45 translate-y-[7px] bg-white'
                        : isLightVariant
                        ? 'bg-[#1E2A5A]'
                        : 'bg-white'
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 rounded-full transition-all duration-300 origin-center ${
                      mobileMenuOpen
                        ? '-rotate-45 -translate-y-[7px] bg-white'
                        : isLightVariant
                        ? 'bg-[#1E2A5A]'
                        : 'bg-white'
                    }`}
                  />
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* FULL-SCREEN COMMAND SEARCH OVERLAY */}
      <CommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* FULL-SCREEN CIRCULAR CLIP-PATH MOBILE MENU */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        hamburgerRef={hamburgerRef}
      />

      {/* WISHLIST / FAVOURITES DRAWER */}
      <WishlistDrawer />
    </>
  );
};
