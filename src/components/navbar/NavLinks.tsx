import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { MegaMenu } from './MegaMenu';

interface NavLinksProps {
  isLightNav?: boolean;
}

const EXPERIENCES = [
  {
    name: 'Lash Lift & Tint',
    badge: 'Popular',
    price: 'from £40',
    path: '/treatments?category=Lashes',
  },
  {
    name: 'Brow Lamination & Tint',
    badge: 'Trending',
    price: 'from £35',
    path: '/treatments?category=Brows',
  },
  {
    name: 'The Sapphire Signature Duo',
    badge: 'Save £7',
    price: 'from £70',
    path: '/treatments?category=Packages',
  },
  {
    name: 'Bespoke Gift Vouchers',
    badge: 'Gift Card',
    price: 'from £25',
    path: '/shop',
  },
];

export const NavLinks: React.FC<NavLinksProps> = ({ isLightNav }) => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [experiencesOpen, setExperiencesOpen] = useState(false);

  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const expTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hover intent for Treatments mega menu (120ms)
  const handleMegaEnter = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(true);
      setExperiencesOpen(false);
    }, 120);
  };

  const handleMegaLeave = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  // Hover intent for Experiences dropdown
  const handleExpEnter = () => {
    if (expTimeoutRef.current) clearTimeout(expTimeoutRef.current);
    expTimeoutRef.current = setTimeout(() => {
      setExperiencesOpen(true);
      setMegaMenuOpen(false);
    }, 120);
  };

  const handleExpLeave = () => {
    if (expTimeoutRef.current) clearTimeout(expTimeoutRef.current);
    expTimeoutRef.current = setTimeout(() => {
      setExperiencesOpen(false);
    }, 200);
  };

  const links = [
    { label: 'Explore', path: '/' },
    {
      label: 'Treatments',
      path: '/treatments',
      hasMega: true,
    },
    {
      label: 'Experiences',
      path: '/treatments?category=Packages',
      hasDropdown: true,
    },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className="hidden lg:flex items-center gap-1 relative z-20"
      aria-label="Main Navigation"
    >
      {links.map((link, idx) => {
        const isActive =
          link.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(link.path.split('?')[0]);

        return (
          <div
            key={link.label}
            className="relative"
            onMouseEnter={() => {
              setHoveredIndex(idx);
              if (link.hasMega) handleMegaEnter();
              if (link.hasDropdown) handleExpEnter();
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              if (link.hasMega) handleMegaLeave();
              if (link.hasDropdown) handleExpLeave();
            }}
          >
            <Link
              to={link.path}
              className={`relative px-3.5 py-2 text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-1 rounded-full transition-colors whitespace-nowrap ${
                isActive
                  ? isLightNav
                    ? 'text-[#D6336C]'
                    : 'text-[#F06A9B]'
                  : isLightNav
                  ? 'text-[#1E2A5A]/80 hover:text-[#1E2A5A]'
                  : 'text-white/85 hover:text-white'
              }`}
            >
              {/* Sliding glass pill behind hovered link */}
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="navHoverPill"
                  className={`absolute inset-0 rounded-full -z-10 ${
                    isLightNav
                      ? 'bg-[#1E2A5A]/5 backdrop-blur-xs'
                      : 'bg-white/10 backdrop-blur-xs'
                  }`}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}

              <span>{link.label}</span>

              {link.hasMega && (
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    megaMenuOpen ? 'rotate-180 text-[#D6336C]' : 'opacity-60'
                  }`}
                />
              )}

              {link.hasDropdown && (
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    experiencesOpen ? 'rotate-180 text-[#D6336C]' : 'opacity-60'
                  }`}
                />
              )}

              {/* Active Route Dot */}
              {isActive && (
                <motion.span
                  layoutId="activeNavDot"
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#D6336C] to-[#F06A9B]"
                />
              )}
            </Link>

            {/* Experiences Dropdown */}
            {link.hasDropdown && (
              <AnimatePresence>
                {experiencesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className={`absolute left-0 top-full mt-2 w-64 rounded-2xl p-3 shadow-2xl border backdrop-blur-xl z-50 ${
                      isLightNav
                        ? 'bg-[#FFF8FA]/95 border-[#FCE4EC] text-[#1E2A5A]'
                        : 'bg-[#121a3d]/95 border-white/15 text-white'
                    }`}
                  >
                    <div className="space-y-1">
                      {EXPERIENCES.map((exp) => (
                        <Link
                          key={exp.name}
                          to={exp.path}
                          onClick={() => setExperiencesOpen(false)}
                          className={`p-2.5 rounded-xl flex items-center justify-between transition-colors ${
                            isLightNav
                              ? 'hover:bg-white text-[#1E2A5A]'
                              : 'hover:bg-white/10 text-white'
                          }`}
                        >
                          <div>
                            <span className="font-serif font-bold text-xs block leading-tight">
                              {exp.name}
                            </span>
                            <span className="text-[10px] text-[#F06A9B] font-semibold">
                              {exp.badge}
                            </span>
                          </div>
                          <span className="text-[11px] opacity-70 tabular-nums font-medium">
                            {exp.price}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}

      {/* Treatments Mega Menu */}
      <MegaMenu
        isOpen={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
        isLightNav={isLightNav}
      />
    </nav>
  );
};
