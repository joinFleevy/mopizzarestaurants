// Designed with love by Webos Mebos team
import React, { useState, useEffect, createContext } from 'react';
import { locales } from './locales.js';
import branchesInfo from '../data/branches_info.json';
import { initAnalytics } from '../utils/analytics.js';
import { CartProvider, useCart } from './CartContext.jsx';
import { Header } from './Header.jsx';
import { Hero } from './Hero.jsx';
import { Marquee } from './Marquee.jsx';
import { Locations } from './Locations.jsx';
import { FoodShowcase } from './FoodShowcase.jsx';
import { MenuSection } from './MenuSection.jsx';
import { Reviews } from './Reviews.jsx';
import { Footer } from './Footer.jsx';
import { MobileActionBar } from './MobileActionBar.jsx';
import { FloatingOrderTray } from './FloatingOrderTray.jsx';
import { OrderModal } from './OrderModal.jsx';

export const LangContext = createContext('fr');

function MainApp() {
  const [lang, setLangState] = useState('fr');
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferredBranchId, setPreferredBranchId] = useState(null);
  const { isCartModalOpen, closeCart } = useCart();

  useEffect(() => {
    initAnalytics();
    try {
      const saved = localStorage.getItem('mopizza_lang');
      if (saved && ['fr', 'ar', 'en'].includes(saved)) {
        setLangState(saved);
      } else if (navigator.language && navigator.language.startsWith('ar')) {
        setLangState('ar');
      }
      const savedBranch = localStorage.getItem('mopizza_branch');
      if (savedBranch && branchesInfo.some((b) => b.id === savedBranch)) {
        setPreferredBranchId(savedBranch);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const handleSelectBranch = (branchId) => {
    setPreferredBranchId(branchId);
    try {
      localStorage.setItem('mopizza_branch', branchId);
    } catch (e) {
      // Ignore storage errors
    }
  };

  const setLang = (newL) => {
    setLangState(newL);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mopizza_lang', newL);
      document.documentElement.lang = newL;
      document.documentElement.dir = newL === 'ar' ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  const isRtl = lang === 'ar';
  const t = locales[lang];

  const handleOpenOrder = (item = null) => {
    setSelectedOrderItem(item);
    setIsModalOpen(true);
  };

  const handleQuickCallBranch = (branchId) => {
    handleSelectBranch(branchId);
    setSelectedOrderItem(null);
    setIsModalOpen(true);
  };

  const handleCloseOrder = () => {
    setIsModalOpen(false);
    setSelectedOrderItem(null);
    closeCart();
  };

  const isAnyModalOpen = isModalOpen || isCartModalOpen;

  return (
    <LangContext.Provider value={lang}>
      <div
        className="min-h-screen bg-[#FFFDF5] font-sans text-[#111111] selection:bg-mo-orange selection:text-black overflow-x-clip pb-20 md:pb-0 relative"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <Header lang={lang} setLang={setLang} onOpenOrder={() => handleOpenOrder(null)} />
        <Hero
          onOpenOrder={() => handleOpenOrder(null)}
          preferredBranchId={preferredBranchId}
          onQuickCallBranch={handleQuickCallBranch}
        />
        <Marquee />
        <MenuSection onSelectItem={(item) => handleOpenOrder(item)} />
        <FoodShowcase onOpenOrder={() => handleOpenOrder(null)} />
        <Locations preferredBranchId={preferredBranchId} onSelectBranch={handleSelectBranch} />
        <Reviews />
        <Footer />

        {/* Floating Order Tray (Desktop only; Mobile uses MobileActionBar to avoid screen blocking) */}
        <FloatingOrderTray t={t} isRtl={isRtl} />

        {/* Mobile Sticky Quick Action Bar */}
        <MobileActionBar onOpenOrder={() => handleOpenOrder(null)} t={t} isRtl={isRtl} />

        {/* Call to Order Modal */}
        <OrderModal
          isOpen={isAnyModalOpen}
          onClose={handleCloseOrder}
          selectedItem={selectedOrderItem}
          onPromoteToCart={() => setSelectedOrderItem(null)}
          preferredBranchId={preferredBranchId}
          onSelectBranch={handleSelectBranch}
          t={t}
          isRtl={isRtl}
          lang={lang}
        />
      </div>
    </LangContext.Provider>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
