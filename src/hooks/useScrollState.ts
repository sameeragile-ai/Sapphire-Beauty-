import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface ScrollState {
  isScrolled: boolean;
  scrollY: number;
  progress: number;
  navTheme: 'dark' | 'light';
}

export function useScrollState(): ScrollState {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isOverLightSection, setIsOverLightSection] = useState(!isHomePage);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPct = maxScroll > 0 ? (currentY / maxScroll) * 100 : 0;

          setScrollY(currentY);
          setIsScrolled(currentY >= 24);
          setProgress(Math.min(100, Math.max(0, scrollPct)));

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for sections with data-nav-theme="light"
  useEffect(() => {
    if (!isHomePage) {
      setIsOverLightSection(true);
      return;
    }

    const lightSections = document.querySelectorAll('[data-nav-theme="light"]');
    if (lightSections.length === 0) {
      // Default: hero is dark, rest of homepage below hero (~600px) is light
      setIsOverLightSection(scrollY > 500);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isAnyIntersecting = entries.some((entry) => entry.isIntersecting);
        setIsOverLightSection(isAnyIntersecting);
      },
      {
        root: null,
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    lightSections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [isHomePage, scrollY]);

  // Determine current navbar theme
  // At top of homepage (< 24px) -> always dark (transparent over dark hero)
  // Scrolled down -> if over light section, switch to light glass; otherwise dark glass
  let navTheme: 'dark' | 'light' = 'dark';
  if (!isHomePage) {
    navTheme = 'light';
  } else if (isScrolled && isOverLightSection) {
    navTheme = 'light';
  } else {
    navTheme = 'dark';
  }

  return {
    isScrolled,
    scrollY,
    progress,
    navTheme,
  };
}
