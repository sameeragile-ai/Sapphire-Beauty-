import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, MessageSquare, Instagram, ZoomIn } from 'lucide-react';
import { brandImages } from '../data/images';
import { siteConfig } from '../data/siteConfig';

const CATEGORIES = ['All', 'Brows', 'Lashes', 'The Studio'];

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState<number | null>(null);

  const galleryItems = brandImages.gallery;

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) =>
          item.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <div className="pt-28 pb-20 sm:pb-28 film-grain min-h-screen">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE4EC] text-[#D6336C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Results Portfolio</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E2A5A] tracking-tight">
            Client Transformations
          </h1>
          <p className="text-sm sm:text-base text-[#1E2A5A]/75 font-light leading-relaxed">
            A glimpse into the daily artistry at our Kings Chase Shopping Centre pod. Unfiltered, authentic brow
            laminations, lash lifts, and studio vibes.
          </p>

          <div className="pt-2">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D6336C] hover:underline"
            >
              <Instagram className="w-4 h-4" />
              <span>See daily stories on Instagram {siteConfig.socials.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-sapphire-glow text-white shadow-sm'
                  : 'bg-white text-[#1E2A5A]/70 hover:text-[#1E2A5A] border border-[#FCE4EC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setActiveLightbox(index)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#FCE4EC] shadow-xs hover:shadow-xl transition-all duration-400 hover:-translate-y-1 relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#FCE4EC]">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Hover overlay with zoom hint */}
                <div className="absolute inset-0 bg-[#121a3d]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1E2A5A] text-[10px] uppercase font-bold tracking-wider shadow-xs">
                  {item.category}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-[#1E2A5A] group-hover:text-[#D6336C] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#1E2A5A]/70 mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightbox(null)}
              className="fixed inset-0 bg-[#121a3d]/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#FCE4EC] flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center backdrop-blur-xs transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#121a3d] overflow-hidden">
                <img
                  src={filteredItems[activeLightbox].src}
                  alt={filteredItems[activeLightbox].title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Lightbox Footer */}
              <div className="p-6 bg-[#FFF8FA] border-t border-[#FCE4EC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D6336C] block">
                    {filteredItems[activeLightbox].category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1E2A5A]">
                    {filteredItems[activeLightbox].title}
                  </h3>
                  <p className="text-xs text-[#1E2A5A]/70 mt-0.5">
                    {filteredItems[activeLightbox].caption}
                  </p>
                </div>

                <a
                  href={`https://wa.me/447904994275?text=${encodeURIComponent(
                    `Hi Sapphire Beauty! I saw this transformation in your gallery (${filteredItems[activeLightbox].title}) and would love to enquire about booking something similar.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-sapphire-glow text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm hover:shadow shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book This Look</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
