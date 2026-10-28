import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Clock, ArrowRight, CornerDownLeft, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '../../data/services';
import { productsData } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLACEHOLDERS = [
  'Search lash lift & tint...',
  'Search brow lamination...',
  'Search aftercare serum & gel...',
  'Search full face waxing...',
  'Search opening hours & parking...',
];

export const CommandSearch: React.FC<CommandSearchProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cycling placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K & Esc)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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
  }, [isOpen, onClose]);

  // Grouped search results
  const searchResults = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        treatments: servicesData.slice(0, 3),
        products: productsData.slice(0, 2),
      };
    }

    const matchedTreatments = servicesData.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );

    const matchedProducts = productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );

    return {
      treatments: matchedTreatments,
      products: matchedProducts,
    };
  }, [query]);

  const flatResults = [
    ...searchResults.treatments.map((t) => ({ ...t, kind: 'treatment' as const })),
    ...searchResults.products.map((p) => ({ ...p, kind: 'product' as const })),
  ];

  // Keyboard arrow navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (flatResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatResults.length) % (flatResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = flatResults[selectedIndex];
      if (current) {
        if (current.kind === 'treatment') {
          navigate('/treatments');
        } else {
          navigate('/shop');
        }
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#121a3d]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-2xl bg-[#FFF8FA] rounded-3xl shadow-2xl border border-[#D6336C]/30 overflow-hidden text-[#1E2A5A]"
        >
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 border-b border-[#FCE4EC] flex items-center gap-3 bg-white/70">
            <Search className="w-5 h-5 text-[#D6336C] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder={PLACEHOLDERS[placeholderIndex]}
              className="w-full bg-transparent text-base sm:text-lg font-medium text-[#1E2A5A] placeholder:text-[#1E2A5A]/40 focus:outline-hidden"
              aria-label="Search treatments, products and salon info"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#1E2A5A]/40 hover:text-[#1E2A5A] p-1 text-xs"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FCE4EC]/60 hover:bg-[#FCE4EC] flex items-center justify-center text-[#1E2A5A]/70 hover:text-[#1E2A5A] transition-colors"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Quick Filter Tags / Recent */}
            {!query && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#D6336C] block">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Lash Lift', 'Brow Lamination', 'Facial Wax', 'Nourishing Serum', 'Kings Chase Studio'].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1 rounded-full bg-white border border-[#FCE4EC] text-xs text-[#1E2A5A] hover:bg-[#FCE4EC]/50 hover:border-[#D6336C]/40 transition-colors"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Treatments Group */}
            {searchResults.treatments.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#D6336C]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Treatments ({searchResults.treatments.length})
                  </span>
                  <span className="text-[11px] text-[#1E2A5A]/50 lowercase font-normal">
                    press enter to open
                  </span>
                </div>

                <div className="space-y-1.5">
                  {searchResults.treatments.map((service, i) => {
                    const isSelected = selectedIndex === i;
                    return (
                      <div
                        key={service.id}
                        onClick={() => {
                          navigate('/treatments');
                          onClose();
                        }}
                        className={`group p-3 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-sapphire-glow text-white shadow-md'
                            : 'bg-white hover:bg-[#FCE4EC]/50 border border-[#FCE4EC]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-11 h-11 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <h4
                              className={`font-serif font-bold text-sm truncate ${
                                isSelected ? 'text-white' : 'text-[#1E2A5A]'
                              }`}
                            >
                              {service.name}
                            </h4>
                            <span
                              className={`text-xs block ${
                                isSelected ? 'text-white/80' : 'text-[#1E2A5A]/60'
                              }`}
                            >
                              {service.category} · {service.duration}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`font-serif font-bold text-sm ${
                              isSelected ? 'text-white' : 'text-[#1E2A5A]'
                            }`}
                          >
                            £{service.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem({
                                id: service.id,
                                name: service.name,
                                price: service.price,
                                type: 'treatment',
                                image: service.image,
                                meta: service.duration,
                              });
                            }}
                            className={`p-1.5 rounded-lg text-xs font-semibold ${
                              isSelected
                                ? 'bg-white/20 text-white hover:bg-white/30'
                                : 'bg-[#FFF8FA] text-[#D6336C] hover:bg-[#FCE4EC]'
                            }`}
                            aria-label={`Add ${service.name} to booking`}
                          >
                            + Book
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Products Group */}
            {searchResults.products.length > 0 && (
              <div className="space-y-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D6336C]">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Aftercare &amp; Retail ({searchResults.products.length})
                </span>

                <div className="space-y-1.5">
                  {searchResults.products.map((product, idx) => {
                    const isSelected = selectedIndex === searchResults.treatments.length + idx;
                    return (
                      <div
                        key={product.id}
                        onClick={() => {
                          navigate('/shop');
                          onClose();
                        }}
                        className={`group p-3 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-sapphire-glow text-white shadow-md'
                            : 'bg-white hover:bg-[#FCE4EC]/50 border border-[#FCE4EC]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-11 h-11 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <h4
                              className={`font-serif font-bold text-sm truncate ${
                                isSelected ? 'text-white' : 'text-[#1E2A5A]'
                              }`}
                            >
                              {product.name}
                            </h4>
                            <span
                              className={`text-xs block ${
                                isSelected ? 'text-white/80' : 'text-[#1E2A5A]/60'
                              }`}
                            >
                              {product.category} · {product.volume}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`font-serif font-bold text-sm ${
                              isSelected ? 'text-white' : 'text-[#1E2A5A]'
                            }`}
                          >
                            £{product.price.toFixed(2)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                type: 'product',
                                image: product.image,
                                meta: product.volume,
                              });
                            }}
                            className={`p-1.5 rounded-lg text-xs font-semibold ${
                              isSelected
                                ? 'bg-white/20 text-white hover:bg-white/30'
                                : 'bg-[#FFF8FA] text-[#D6336C] hover:bg-[#FCE4EC]'
                            }`}
                          >
                            + Bag
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {flatResults.length === 0 && (
              <div className="text-center py-8">
                <p className="font-serif text-lg font-bold text-[#1E2A5A]">
                  No matches for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-[#1E2A5A]/60 mt-1">
                  Try searching for &quot;lash lift&quot;, &quot;brow lamination&quot;, or &quot;wax&quot;.
                </p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="p-3.5 bg-white/80 border-t border-[#FCE4EC] flex items-center justify-between text-[11px] text-[#1E2A5A]/60">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded-md bg-[#FFF8FA] border border-[#FCE4EC] font-mono text-[10px]">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded-md bg-[#FFF8FA] border border-[#FCE4EC] font-mono text-[10px]">
                  ↓
                </kbd>
                <span>to navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded-md bg-[#FFF8FA] border border-[#FCE4EC] font-mono text-[10px]">
                  ↵
                </kbd>
                <span>to select</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded-md bg-[#FFF8FA] border border-[#FCE4EC] font-mono text-[10px]">
                esc
              </kbd>
              <span>to close</span>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
