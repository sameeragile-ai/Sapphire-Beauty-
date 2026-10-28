import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { siteConfig } from '../../data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121a3d] text-white pt-16 pb-12 border-t border-[#D6336C]/20 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6336C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E2A5A]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & Story (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <BrandLogo size="md" inverted={true} />
            </Link>
            <p className="font-serif italic text-white/80 text-base leading-relaxed max-w-sm">
              &ldquo;Fifteen years of shaping brows in Kingswood, and I still get excited about every single client who sits in my chair.&rdquo;
            </p>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Bristol&apos;s friendly brow &amp; lash specialist salon pod located inside Kings Chase Shopping Centre.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-[#F06A9B] hover:border-[#F06A9B]/40 hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-[#F06A9B] hover:border-[#F06A9B]/40 hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-[#F06A9B]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/treatments" className="hover:text-white transition-colors">
                  Treatments &amp; Prices
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Aftercare Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  Client Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Services (Col 7-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-[#F06A9B]">
              Top Treatments
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link to="/treatments?category=Lashes" className="hover:text-white transition-colors">
                  Lash Lift &amp; Tint (£40)
                </Link>
              </li>
              <li>
                <Link to="/treatments?category=Brows" className="hover:text-white transition-colors">
                  Brow Lamination + Tint + Shape (£42)
                </Link>
              </li>
              <li>
                <Link to="/treatments?category=Packages" className="hover:text-white transition-colors">
                  The Sapphire Signature Duo (£70)
                </Link>
              </li>
              <li>
                <Link to="/treatments?category=Brows" className="hover:text-white transition-colors">
                  Brow Wax, Shape &amp; Tint (£20)
                </Link>
              </li>
              <li>
                <Link to="/treatments?category=Lashes" className="hover:text-white transition-colors">
                  Weekend Lash Clusters (£30)
                </Link>
              </li>
              <li>
                <Link to="/treatments?category=Waxing" className="hover:text-white transition-colors">
                  Gentle Facial Waxing (from £7)
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Hours & Contact (Col 9-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-[#F06A9B]">
              Visit Our Salon
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F06A9B] shrink-0 mt-0.5" />
                <span>
                  Kings Chase Shopping Centre (outside Boots), Regent St, Kingswood, Bristol BS15 8LP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F06A9B] shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneInternational}`}
                  className="hover:underline"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F06A9B] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:underline truncate"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#F06A9B] shrink-0 mt-0.5" />
                <div className="text-[11px] text-white/70 space-y-0.5">
                  <p>Mon–Thu: 10:00am – 4:30pm</p>
                  <p>Fri: 10:00am – 5:00pm</p>
                  <p>Sat: 10:00am – 4:30pm · Sun: Closed</p>
                  <p className="text-[#F06A9B] font-semibold pt-1">
                    Evenings from 5pm by WhatsApp appointment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Sapphire Beauty Kingschase. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#D6336C] fill-[#D6336C]" />
            <span>for Bristol beauty lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
