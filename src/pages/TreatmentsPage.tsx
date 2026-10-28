import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, AlertCircle, MessageSquare, ShieldCheck, Check } from 'lucide-react';
import { servicesData, ServiceCategory } from '../data/services';
import { TreatmentCard } from '../components/treatments/TreatmentCard';
import { siteConfig } from '../data/siteConfig';

const CATEGORIES: ('All' | ServiceCategory)[] = ['All', 'Brows', 'Lashes', 'Waxing', 'Packages'];

export const TreatmentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as 'All' | ServiceCategory) || 'All';

  const [selectedCategory, setSelectedCategory] = useState<'All' | ServiceCategory>(
    CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (cat: 'All' | ServiceCategory) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="pt-28 pb-20 sm:pb-28 film-grain min-h-screen">
      {/* Page Header */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE4EC] text-[#D6336C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kingswood · Bristol</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E2A5A] tracking-tight">
            Treatments &amp; Prices
          </h1>
          <p className="text-sm sm:text-base text-[#1E2A5A]/75 font-light leading-relaxed">
            Every appointment begins with a warm consultation to understand your face shape and personal aesthetic.
            Browse our menu below and add treatments directly to your booking bag.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 p-2 bg-white rounded-2xl border border-[#FCE4EC] shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto p-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-sapphire-glow text-white shadow-sm'
                    : 'text-[#1E2A5A]/70 hover:text-[#1E2A5A] hover:bg-[#FCE4EC]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#1E2A5A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FFF8FA] border border-[#FCE4EC] text-xs text-[#1E2A5A] focus:outline-hidden focus:border-[#D6336C] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#FCE4EC] p-8">
            <h3 className="font-serif text-xl font-bold text-[#1E2A5A] mb-2">
              No treatments found
            </h3>
            <p className="text-xs text-[#1E2A5A]/60 mb-6">
              Try adjusting your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-sapphire-glow text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <TreatmentCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Patch Test & Safety Notice */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-[#FCE4EC] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FCE4EC] text-[#D6336C] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-lg text-[#1E2A5A]">
                First Time with Lash Lifts or Tints?
              </h4>
              <p className="text-xs text-[#1E2A5A]/70 max-w-2xl leading-relaxed">
                In line with UK professional salon standards, a complimentary 2-minute patch test is
                recommended at least 24–48 hours prior to your first lash lift or tint treatment to ensure
                zero sensitivity. Pop into our Kings Chase studio anytime during open hours!
              </p>
            </div>
          </div>

          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-full bg-[#FFF8FA] hover:bg-sapphire-glow text-[#1E2A5A] hover:text-white border border-[#FCE4EC] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#D6336C]" />
            <span>Ask a Question</span>
          </a>
        </div>
      </div>
    </div>
  );
};
