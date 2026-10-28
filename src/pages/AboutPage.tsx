import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Award, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { brandImages } from '../data/images';
import { siteConfig } from '../data/siteConfig';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 sm:pb-28 film-grain min-h-screen">
      {/* Hero Intro */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE4EC] text-[#D6336C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story &amp; Ethos</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E2A5A] tracking-tight leading-tight">
            Fifteen years of shaping brows in Kingswood.
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#D6336C]">
            &ldquo;I still get excited about every single client who sits down in my chair.&rdquo;
          </p>
        </div>
      </div>

      {/* Main Split Story */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Studio Image in Arch */}
          <div className="lg:col-span-5 relative">
            <div className="arch-frame aspect-[4/5] bg-white p-3 shadow-2xl border border-[#FCE4EC]">
              <div className="w-full h-full arch-frame overflow-hidden">
                <ImageWithFallback
                  src={brandImages.studioPod}
                  alt="Sapphire Beauty studio outside Boots in Kings Chase Shopping Centre"
                  aspectRatioClass="aspect-[4/5]"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 p-4 rounded-2xl bg-[#121a3d] text-white shadow-xl border border-[#F06A9B]/40 max-w-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#F06A9B] block">
                Boutique Sanctuary
              </span>
              <p className="font-serif text-xs text-white/90 mt-1 leading-snug">
                Located inside Kings Chase Shopping Centre with convenient parking and evening appointments from 5pm.
              </p>
            </div>
          </div>

          {/* Personal Copy */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#1E2A5A]/80 font-light leading-relaxed">
            <p className="font-serif text-xl sm:text-2xl text-[#1E2A5A] font-semibold leading-snug">
              Welcome to Sapphire Beauty Kingschase.
            </p>
            <p>
              When I opened the boutique studio pod inside Kings Chase Shopping Centre, my vision was simple:
              to offer high-end, bespoke lash and brow artistry with the warmth, friendliness, and accessibility of a
              neighbourhood studio.
            </p>
            <p>
              Too many commercial salons rush clients through twenty-minute slots using generic templates that don&apos;t
              respect natural brow hair patterns or eye contours. With over fifteen years specialising strictly in brows,
              lashes, and gentle facial waxing, I believe in careful consultation, precise hand-mapping, and tailoring every
              treatment to your natural features.
            </p>
            <p>
              Whether you are coming in for an eye-opening Lash Lift &amp; Tint before a holiday, fluffing sparse brows with
              keratin lamination, or simply popping in for a tidy and tint on your lunch break, my goal is always the same:
              for you to leave my chair looking in the mirror and loving what you see.
            </p>

            <div className="pt-4 border-t border-[#FCE4EC] flex flex-wrap gap-4 text-xs font-semibold text-[#1E2A5A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6336C]" />
                <span>15+ Years Specialist Craft</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6336C]" />
                <span>1-on-1 Dedicated Time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6336C]" />
                <span>British Beauty Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Values */}
      <div className="bg-[#FCE4EC]/40 py-16 sm:py-20 border-y border-[#FCE4EC] mb-20 sm:mb-28">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6336C] font-bold block">
              What Guides Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2A5A]">
              Our Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#FCE4EC] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8FA] border border-[#FCE4EC] flex items-center justify-center text-[#D6336C]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1E2A5A]">
                Bespoke, Never Stencilled
              </h3>
              <p className="text-xs sm:text-sm text-[#1E2A5A]/70 leading-relaxed font-light">
                We study your individual bone structure, brow arches, and eye colour before touching a tool.
                No cookie-cutter shapes; only tailored enhancement.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#FCE4EC] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8FA] border border-[#FCE4EC] flex items-center justify-center text-[#D6336C]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1E2A5A]">
                Gentle Keratin Formulations
              </h3>
              <p className="text-xs sm:text-sm text-[#1E2A5A]/70 leading-relaxed font-light">
                We only use dermatologically approved, cruelty-free lifting serums and keratin infusions that strengthen
                and protect your natural hairs rather than weakening them.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#FCE4EC] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8FA] border border-[#FCE4EC] flex items-center justify-center text-[#D6336C]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1E2A5A]">
                Relaxing Boutique Space
              </h3>
              <p className="text-xs sm:text-sm text-[#1E2A5A]/70 leading-relaxed font-light">
                Our custom navy pod outside Boots is equipped with a plush reclining treatment bed, warm lighting,
                and spotless clinical hygiene standards for peaceful pampering.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-sapphire-glow text-white space-y-5 shadow-2xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Ready to book your Kingswood appointment?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto">
            Direct WhatsApp chat for fast availability checks, evening slots, and personalized quotes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-[#1E2A5A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#D6336C]" />
              <span>Message on WhatsApp</span>
            </a>
            <Link
              to="/treatments"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/30 transition-colors flex items-center gap-2"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
