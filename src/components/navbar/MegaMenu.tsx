import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock, Star, MessageSquare } from 'lucide-react';
import { servicesData } from '../../data/services';
import { brandImages } from '../../data/images';
import { siteConfig } from '../../data/siteConfig';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLightNav?: boolean;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, isLightNav }) => {
  const categories = [
    {
      name: 'Brows',
      description: 'Lamination, shaping & bespoke tinting',
      image: brandImages.realClientBrows,
      count: '5 Treatments',
      priceFrom: '£10',
      path: '/treatments?category=Brows',
    },
    {
      name: 'Lashes',
      description: 'Keratin lift, carbon tint & clusters',
      image: brandImages.heroModel,
      count: '4 Treatments',
      priceFrom: '£12',
      path: '/treatments?category=Lashes',
    },
    {
      name: 'Waxing',
      description: 'Gentle facial & body hair removal',
      image: brandImages.waxingCare,
      count: '4 Treatments',
      priceFrom: '£7',
      path: '/treatments?category=Waxing',
    },
    {
      name: 'Packages',
      description: 'Curated beauty combinations & vouchers',
      image: brandImages.giftBox,
      count: '3 Packages',
      priceFrom: '£28',
      path: '/treatments?category=Packages',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[920px] max-w-[94vw] z-50 pointer-events-auto"
          role="menu"
          aria-label="Treatments directory menu"
        >
          {/* Glass Panel Container */}
          <div
            className={`rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(20,20,35,0.45)] backdrop-blur-2xl border transition-colors ${
              isLightNav
                ? 'bg-[#FFF8FA]/90 border-[#D6336C]/25 text-[#1E2A5A]'
                : 'bg-[#121a3d]/92 border-[#D6336C]/30 text-white'
            }`}
          >
            <div className="grid grid-cols-12 gap-6 items-stretch">
              {/* Left: Category Showcase Grid (Col 1-8) */}
              <div className="col-span-8 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-current/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#F06A9B]" />
                    <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#F06A9B]">
                      Boutique Service Menu
                    </span>
                  </div>
                  <Link
                    to="/treatments"
                    onClick={onClose}
                    className="text-xs font-semibold hover:text-[#F06A9B] flex items-center gap-1 transition-colors"
                  >
                    <span>View all treatments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      onClick={onClose}
                      className={`group p-3 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 ${
                        isLightNav
                          ? 'bg-white/80 hover:bg-white border-[#FCE4EC] hover:border-[#D6336C]/40 shadow-2xs'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#F06A9B]/40'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#FCE4EC]">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-sm tracking-tight group-hover:text-[#F06A9B] transition-colors">
                            {cat.name}
                          </h4>
                          <span className="text-[10px] opacity-60 font-medium">
                            from {cat.priceFrom}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-70 line-clamp-1 mt-0.5">
                          {cat.description}
                        </p>
                        <span className="text-[10px] text-[#F06A9B] font-semibold block mt-1">
                          {cat.count}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs opacity-75">
                  <span>Kings Chase Shopping Centre · Outside Boots</span>
                  <span className="text-[#F06A9B] font-semibold">15+ Years Specialist Craft</span>
                </div>
              </div>

              {/* Right: Featured Signature Highlight (Col 9-12) */}
              <div
                className={`col-span-4 rounded-2xl p-4.5 flex flex-col justify-between border relative overflow-hidden ${
                  isLightNav
                    ? 'bg-gradient-to-br from-[#FCE4EC]/70 to-[#FFF8FA] border-[#FCE4EC]'
                    : 'bg-gradient-to-br from-[#1E2A5A]/80 to-[#2A1635] border-white/15'
                }`}
              >
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6336C]/20 rounded-full blur-xl pointer-events-none" />

                <div className="relative z-10 space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sapphire-glow text-white text-[10px] font-bold uppercase tracking-wider inline-block">
                    Featured Signature
                  </span>
                  <h4 className="font-serif font-bold text-lg leading-snug">
                    The Sapphire Signature Duo
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    Lash Lift &amp; Tint + full Brow Lamination. Save £7 on our two most-loved treatments.
                  </p>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-serif font-bold text-xl tabular-nums">£70</span>
                    <span className="text-xs opacity-50 line-through tabular-nums">£77</span>
                    <span className="text-[10px] text-[#F06A9B] font-bold ml-auto">Save £7</span>
                  </div>
                </div>

                <div className="relative z-10 pt-4">
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-sapphire-glow text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Book via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
