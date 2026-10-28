/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { PageLoader } from './components/common/PageLoader';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { ToastNotification } from './components/common/ToastNotification';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { ScrollToTop } from './components/common/ScrollToTop';
import { CustomCursor } from './components/common/CustomCursor';
import { MobileBottomBar } from './components/navbar/MobileBottomBar';
import { useScrollState } from './hooks/useScrollState';

// Pages
import { HomePage } from './pages/HomePage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';

function AppContent() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const { isScrolled } = useScrollState();
  const { isDrawerOpen } = useCart();

  return (
    <>
      {/* First-visit Brand Loader */}
      <PageLoader onComplete={() => setLoaderComplete(true)} />

      {/* Custom Desktop Magnetic Cursor */}
      <CustomCursor />

      {/* Scroll Helper */}
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-[#FFF8FA] text-[#1E2A5A] selection:bg-[#FCE4EC] selection:text-[#D6336C]">
        {/* Sticky/Fixed Luxury Navbar (Morphing floating glass pill) */}
        <Navbar />

        {/* Main Routing Views */}
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/treatments" element={<TreatmentsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Slide-in Cart Drawer */}
        <CartDrawer />

        {/* Add-to-bag Toast Notification */}
        <ToastNotification />

        {/* Floating WhatsApp Quick Contact */}
        <FloatingWhatsApp />

        {/* Mobile Floating Bottom Action Bar (Appears on scroll past hero) */}
        <MobileBottomBar
          isVisible={isScrolled}
          isMenuOpen={false}
          isCartDrawerOpen={isDrawerOpen}
        />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
}
