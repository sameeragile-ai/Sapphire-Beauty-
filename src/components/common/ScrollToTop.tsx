import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll visibility check
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScroll) return null;

  return (
    <button
      onClick={scrollTop}
      className="fixed bottom-22 right-5 sm:right-7 z-35 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#FCE4EC] text-[#1E2A5A] hover:text-[#D6336C] flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
      aria-label="Scroll to top of page"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
