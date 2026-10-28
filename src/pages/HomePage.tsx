import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  Sparkles,
  Award,
  ChevronDown,
  Instagram,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { siteConfig, getLiveSalonStatus } from '../data/siteConfig';
import { brandImages } from '../data/images';
import { servicesData } from '../data/services';
import { productsData } from '../data/products';
import { testimonialsData } from '../data/testimonials';
import { TreatmentCard } from '../components/treatments/TreatmentCard';
import { ProductCard } from '../components/shop/ProductCard';
import { BeforeAfterSlider } from '../components/home/BeforeAfterSlider';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const HomePage: React.FC = () => {
  const liveStatus = getLiveSalonStatus();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Top 6 signature treatments for homepage
  const signatureTreatments = [
    servicesData.find((s) => s.id === 'brow-lamination-tint-shape')!,
    servicesData.find((s) => s.id === 'lash-lift-tint')!,
    servicesData.find((s) => s.id === 'sapphire-signature-package')!,
    servicesData.find((s) => s.id === 'brow-wax-shape-tint')!,
    servicesData.find((s) => s.id === 'lash-clusters')!,
    servicesData.find((s) => s.id === 'full-face-wax')!,
  ].filter(Boolean);

  // Today's day index for opening hours
  const todayDayName = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    timeZone: 'Europe/London',
  });

  return (
    <div className="w-full film-grain">
      {/* ========================================================
          1. HERO SECTION (100svh, Midnight Background, Arch Image, Drifting Orbs)
          ======================================================== */}
      <section className="relative min-h-[100svh] bg-[#121a3d] text-white flex flex-col justify-between overflow-hidden pt-28 pb-12 sm:pb-16">
        {/* Animated drifting blurred gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#D6336C]/25 blur-[100px] pointer-events-none animate-pulse duration-5000" />
        <div className="absolute bottom-10 right-10 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[#6B2E6E]/30 blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-1/3 w-64 h-64 rounded-full bg-[#1E2A5A]/60 blur-[80px] pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (Col 1-7) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 sm:space-y-7"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] uppercase tracking-[0.22em] text-[#F06A9B] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#F06A9B]" />
                <span>Kingswood · Bristol · Est. 15+ Years</span>
              </div>

              {/* Headline with Mask Reveal */}
              <h1 className="font-serif text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5rem] font-bold leading-[1.08] tracking-tight text-balance">
                Brows &amp; lashes,{' '}
                <span className="italic text-gradient-rose">beautifully</span> done.
              </h1>

              {/* Sub-text */}
              <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed font-light">
                Lash lifts, brow lamination, and expert facial waxing from Bristol&apos;s friendly brow
                &amp; lash specialist. Enjoy 1-on-1 personal care right inside Kings Chase Shopping Centre.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full bg-sapphire-glow text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[#D6336C]/30 hover:scale-[1.02] active:scale-98 transition-all animate-shimmer"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Book Your Appointment</span>
                </a>

                <Link
                  to="/treatments"
                  className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider border border-white/25 flex items-center justify-center gap-2 backdrop-blur-xs transition-colors"
                >
                  <span>Explore Treatments</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Live Status Chip */}
              <div className="pt-2 flex items-center gap-3 text-xs text-white/70">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      liveStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span className="font-medium text-white">{liveStatus.text}</span>
                </div>
                <span className="hidden sm:inline-block text-white/40">·</span>
                <span className="hidden sm:inline-block text-white/60">
                  Walk-ins &amp; WhatsApp bookings welcome
                </span>
              </div>
            </motion.div>

            {/* Right Hero Arch Image & Floating Cards (Col 8-12) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end"
            >
              {/* Recurring Arch Frame Motif */}
              <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] arch-frame bg-gradient-to-b from-[#6B2E6E]/40 to-[#121a3d] p-2 sm:p-3 shadow-2xl border border-white/15">
                <div className="w-full h-full arch-frame overflow-hidden relative">
                  <img
                    src={brandImages.heroModel}
                    alt="Lash Lift and Brow Lamination Specialist in Bristol"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  {/* Subtle inner shadow overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121a3d]/80 via-transparent to-transparent" />
                </div>

                {/* Floating Trust Card 1: Google Reviews */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-4 -left-3 sm:-left-6 z-20 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md text-[#1E2A5A] shadow-2xl border border-[#FCE4EC] flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFF8FA] border border-[#FCE4EC] flex items-center justify-center text-[#C9A96E]">
                    <Star className="w-5 h-5 fill-[#C9A96E]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-serif font-bold text-base text-[#1E2A5A]">4.5</span>
                      <div className="flex text-[#C9A96E]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#C9A96E]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[11px] text-[#1E2A5A]/70 font-medium block">
                      34 Google reviews · 100% on Facebook
                    </span>
                  </div>
                </motion.div>

                {/* Floating Card 2: Treatment Pill */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="absolute -top-3 -right-2 sm:-right-4 z-20 px-4 py-2.5 rounded-full bg-[#121a3d]/90 backdrop-blur-md text-white text-xs font-semibold shadow-xl border border-[#F06A9B]/40 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F06A9B]" />
                  <span>Lash Lift &amp; Tint from £40</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 w-full flex justify-center pt-6">
          <a
            href="#marquee"
            className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors text-[10px] uppercase tracking-widest"
            aria-label="Scroll down to explore treatments"
          >
            <span>Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ========================================================
          2. INFINITE MARQUEE STRIP
          ======================================================== */}
      <section
        id="marquee"
        data-nav-theme="light"
        className="w-full bg-[#FFF8FA] py-5 border-y border-[#FCE4EC] overflow-hidden select-none"
      >
        <div className="flex items-center whitespace-nowrap animate-none overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 text-sm sm:text-base font-serif font-bold tracking-wider text-[#1E2A5A]/80 uppercase px-4">
            <span>Lash Lift</span>
            <span className="text-[#D6336C]">✦</span>
            <span>Brow Lamination</span>
            <span className="text-[#D6336C]">✦</span>
            <span>Lash Tint</span>
            <span className="text-[#D6336C]">✦</span>
            <span>Weekend Clusters</span>
            <span className="text-[#D6336C]">✦</span>
            <span>Gentle Waxing</span>
            <span className="text-[#D6336C]">✦</span>
            <span>Bespoke Brow Shaping</span>
            <span className="text-[#D6336C]">✦</span>
            <span>The Sapphire Signature</span>
            <span className="text-[#D6336C]">✦</span>
            <span>Kings Chase Shopping Centre</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SIGNATURE TREATMENTS (Editorial Asymmetric Grid)
          ======================================================== */}
      <section data-nav-theme="light" className="py-20 sm:py-28 bg-[#FFF8FA]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D6336C] font-bold block">
                Menu Highlights
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2A5A] tracking-tight">
                Signature Treatments
              </h2>
            </div>
            <Link
              to="/treatments"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#D6336C] hover:text-[#1E2A5A] transition-colors"
            >
              <span>View Full Price List ({servicesData.length} Treatments)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {signatureTreatments.map((service, index) => (
              <TreatmentCard
                key={service.id}
                service={service}
                featured={index === 0 || index === 2}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-[#1E2A5A]/60 mb-4">
              All treatments performed by our master specialist with 15+ years experience.
            </p>
            <Link
              to="/treatments"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-[#FCE4EC] text-[#1E2A5A] hover:bg-sapphire-glow hover:text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all"
            >
              <span>Browse All Brow, Lash &amp; Waxing Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. "THE SAPPHIRE DIFFERENCE" (Split with Real Studio Pod Photo)
          ======================================================== */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#FCE4EC]/50 via-[#FFF8FA] to-[#FFF8FA] border-y border-[#FCE4EC]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Real Studio Image in Arch Frame (Col 1-6) */}
            <div className="lg:col-span-6 relative">
              <div className="arch-frame aspect-[4/5] bg-white p-3 shadow-xl border border-[#FCE4EC]">
                <div className="w-full h-full arch-frame overflow-hidden relative">
                  <ImageWithFallback
                    src={brandImages.studioPod}
                    alt="Sapphire Beauty boutique studio kiosk inside Kings Chase Shopping Centre"
                    aspectRatioClass="aspect-[4/5]"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A5A]/70 via-transparent to-transparent flex items-end p-6">
                    <p className="font-serif italic text-white text-sm sm:text-base leading-snug">
                      &ldquo;Our boutique pod outside Boots in Kings Chase Shopping Centre — warm, private &amp; comfortable.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Real Client Brow Highlight badge */}
              <div className="hidden sm:flex absolute -bottom-6 -right-6 p-4 rounded-2xl bg-white shadow-xl border border-[#FCE4EC] items-center gap-3.5 max-w-xs">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#FCE4EC]">
                  <img
                    src={brandImages.realClientBrows}
                    alt="Real client brow results"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D6336C] block">
                    Authentic Results
                  </span>
                  <span className="font-serif font-bold text-xs text-[#1E2A5A] block leading-tight">
                    Real Bristol clients, 100% genuine unedited photos
                  </span>
                </div>
              </div>
            </div>

            {/* Copy & Animated Counters (Col 7-12) */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D6336C] font-bold block">
                  The Sapphire Difference
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2A5A] tracking-tight leading-tight">
                  Crafting brows &amp; lashes with fifteen years of devotion.
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#1E2A5A]/80 leading-relaxed font-light">
                <p>
                  I don&apos;t believe in one-size-fits-all stencils or rushed appointments. Every face has its
                  own distinct bone structure, hair growth direction, and personal style.
                </p>
                <p>
                  When you visit my boutique pod inside Kings Chase, you get my undivided attention in a calm,
                  private setting. From bespoke brow mapping to nourishing keratin lash lifts, every service
                  is tailored so you leave feeling confident and effortlessly put together.
                </p>
              </div>

              {/* 4 Proof Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#FCE4EC]">
                <div className="p-3 bg-white rounded-xl border border-[#FCE4EC] shadow-2xs">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2A5A] block tabular-nums">
                    15+
                  </span>
                  <span className="text-[11px] text-[#1E2A5A]/60 font-medium">Years Experience</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#FCE4EC] shadow-2xs">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2A5A] block tabular-nums">
                    4.5★
                  </span>
                  <span className="text-[11px] text-[#1E2A5A]/60 font-medium">34 Google Reviews</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#FCE4EC] shadow-2xs">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2A5A] block tabular-nums">
                    100%
                  </span>
                  <span className="text-[11px] text-[#1E2A5A]/60 font-medium">Facebook Recommend</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#FCE4EC] shadow-2xs">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2A5A] block tabular-nums">
                    1000s
                  </span>
                  <span className="text-[11px] text-[#1E2A5A]/60 font-medium">Happy Bristol Brows</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#1E2A5A]/70 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D6336C]" />
                  <span>Fully Insured &amp; Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#D6336C]" />
                  <span>Cruelty-Free Keratin Formulations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. BEFORE & AFTER INTERACTIVE COMPARISON SLIDER
          ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#FFF8FA]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6336C] font-bold block">
              Visible Transformations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2A5A] tracking-tight">
              Real Clients, Real Radiance
            </h2>
            <p className="text-xs sm:text-sm text-[#1E2A5A]/70">
              Interactive comparisons showing how our gentle lift and lamination techniques awaken natural beauty.
            </p>
          </div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* ========================================================
          6. SHOP THE AFTERCARE (Product Carousel / Grid)
          ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#FCE4EC]/35 border-y border-[#FCE4EC]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D6336C] font-bold block">
                Salon Retail Essentials
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2A5A] tracking-tight">
                Preserve Your Glow at Home
              </h2>
              <p className="text-xs sm:text-sm text-[#1E2A5A]/70 max-w-lg">
                Pro-grade serums, locking brow gels, and aftercare kits designed to extend lift and lamination longevity.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#D6336C] hover:text-[#1E2A5A] transition-colors"
            >
              <span>View All Aftercare ({productsData.length} Items)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {productsData.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. TESTIMONIALS CAROUSEL
          ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#FFF8FA] overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6336C] font-bold block">
              Client Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2A5A] tracking-tight">
              Loved by Kingswood Locals
            </h2>
            <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-[#1E2A5A]/70">
              <div className="flex text-[#C9A96E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C9A96E]" />
                ))}
              </div>
              <span className="font-semibold text-[#1E2A5A]">4.5 on Google</span>
              <span>· 34 Verified Reviews</span>
            </div>
          </div>

          {/* Testimonial Active Card */}
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#FCE4EC] relative">
            <div className="font-serif text-5xl sm:text-6xl text-[#D6336C]/25 absolute top-6 left-8 select-none leading-none">
              &ldquo;
            </div>

            <div className="relative z-10 space-y-6">
              <p className="font-serif italic text-xl sm:text-2xl text-[#1E2A5A] leading-relaxed">
                {testimonialsData[activeTestimonial].text}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-[#FCE4EC]">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1E2A5A]">
                    {testimonialsData[activeTestimonial].name}
                  </h4>
                  <span className="text-xs text-[#1E2A5A]/60">
                    {testimonialsData[activeTestimonial].location} · Treatment:{' '}
                    <span className="text-[#D6336C] font-semibold">
                      {testimonialsData[activeTestimonial].treatment}
                    </span>
                  </span>
                </div>

                <div className="flex gap-1">
                  {testimonialsData.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeTestimonial === i
                          ? 'w-8 bg-sapphire-glow'
                          : 'w-2.5 bg-[#FCE4EC] hover:bg-[#D6336C]/40'
                      }`}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. INSTAGRAM GALLERY GRID
          ======================================================== */}
      <section className="py-20 bg-gradient-to-b from-[#FFF8FA] to-[#FCE4EC]/40 border-t border-[#FCE4EC]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D6336C] font-bold block">
                Follow Our Work
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2A5A]">
                Instagram Diary
              </h2>
            </div>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#FCE4EC] text-xs font-bold text-[#1E2A5A] hover:text-[#D6336C] shadow-xs hover:shadow transition-all"
            >
              <Instagram className="w-4 h-4 text-[#D6336C]" />
              <span>Follow {siteConfig.socials.instagramHandle}</span>
            </a>
          </div>

          {/* Grid of photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brandImages.gallery.slice(0, 4).map((item) => (
              <a
                key={item.id}
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden aspect-square bg-[#FCE4EC] border border-[#FCE4EC] block shadow-xs hover:shadow-lg transition-all"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#121a3d]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#F06A9B]">
                    {item.category}
                  </span>
                  <p className="font-serif text-xs font-bold leading-tight line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          9. VISIT US: HOURS TABLE, MAP & CONTACT
          ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#FFF8FA]" id="visit-us">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Hours & Location Info (Col 1-6) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D6336C] font-bold block">
                  Find Us in Kingswood
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2A5A] tracking-tight">
                  Visit Our Salon Pod
                </h2>
                <p className="text-xs sm:text-sm text-[#1E2A5A]/70">
                  Located directly opposite Boots inside Kings Chase Shopping Centre. Ample shopping centre
                  parking available right on site.
                </p>
              </div>

              {/* Weekly Opening Hours Table with Today Highlighted */}
              <div className="rounded-2xl bg-white border border-[#FCE4EC] shadow-sm overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-[#FCE4EC] to-[#F8C8DC] border-b border-[#F3D5E4] flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#1E2A5A] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D6336C]" />
                    <span>Studio Opening Hours</span>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      liveStatus.isOpen
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white/80 text-[#1E2A5A]'
                    }`}
                  >
                    {liveStatus.text}
                  </span>
                </div>

                <div className="divide-y divide-[#FCE4EC]/60 text-xs">
                  {siteConfig.openingHours.map((slot) => {
                    const isToday = slot.day.toLowerCase() === todayDayName.toLowerCase();
                    return (
                      <div
                        key={slot.day}
                        className={`px-4 py-3 flex items-center justify-between transition-colors ${
                          isToday
                            ? 'bg-[#FCE4EC]/40 font-bold text-[#1E2A5A]'
                            : 'text-[#1E2A5A]/80 hover:bg-[#FFF8FA]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isToday && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D6336C]" />
                          )}
                          <span>{slot.day}</span>
                          {isToday && (
                            <span className="text-[10px] text-[#D6336C] uppercase tracking-wider font-extrabold">
                              Today
                            </span>
                          )}
                        </div>

                        <div className="tabular-nums">
                          {slot.isClosed ? (
                            <span className="text-[#1E2A5A]/50 italic">Closed</span>
                          ) : (
                            <span>
                              {slot.open}am – {slot.close}pm
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Evening booking note */}
                <div className="p-3.5 bg-[#FFF8FA] border-t border-[#FCE4EC] text-xs text-[#1E2A5A]/80 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#D6336C] shrink-0 mt-0.5" />
                  <p className="font-medium text-[11px] leading-snug">
                    {siteConfig.eveningNote}
                  </p>
                </div>
              </div>

              {/* Direct Address & Quick WhatsApp */}
              <div className="p-4 rounded-2xl bg-white border border-[#FCE4EC] space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D6336C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1E2A5A] block">
                      {siteConfig.contact.address.line1}
                    </span>
                    <span className="text-[#1E2A5A]/70">
                      {siteConfig.contact.address.full}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={siteConfig.contact.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D6336C] hover:underline"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map (Col 7-12) */}
            <div className="lg:col-span-6 h-full min-h-[380px] rounded-3xl overflow-hidden shadow-xl border border-[#FCE4EC] relative bg-[#FCE4EC]">
              <iframe
                title="Sapphire Beauty Kingschase Location Map"
                src={siteConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '440px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. FINAL CTA BANNER (Sapphire Glow Gradient)
          ======================================================== */}
      <section className="py-20 sm:py-24 bg-sapphire-glow text-white relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#F06A9B] font-bold block">
            Begin Your Confidence Journey
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
            Ready for brows &amp; lashes you will adore?
          </h2>

          <p className="text-white/80 max-w-lg mx-auto text-sm sm:text-base font-light">
            Book effortlessly via WhatsApp or browse our full treatment menu. We look forward to welcoming you to our Kings Chase studio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#1E2A5A] font-bold text-xs uppercase tracking-wider shadow-2xl hover:bg-[#FFF8FA] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#D6336C]" />
              <span>Book on WhatsApp ({siteConfig.contact.phone})</span>
            </a>

            <Link
              to="/treatments"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/30 backdrop-blur-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>View Treatments Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
