// Designed with love by Webos Mebos team
import React, { useState, createContext } from 'react';
import { locales } from './locales.js';
import { Header } from './Header.jsx';
import { Hero } from './Hero.jsx';
import { Marquee } from './Marquee.jsx';
import { Locations } from './Locations.jsx';
import { FoodShowcase } from './FoodShowcase.jsx';
import { MenuSection } from './MenuSection.jsx';
import { Reviews } from './Reviews.jsx';
import { Footer } from './Footer.jsx';
import { MobileActionBar } from './MobileActionBar.jsx';
import { OrderModal } from './OrderModal.jsx';

export const LangContext = createContext('en');

export default function App() {
  const [lang, setLang] = useState('en');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);

  const isRtl = lang === 'ar';
  const t = locales[lang];

  const handleOpenOrder = (item = null) => {
    setSelectedOrderItem(item);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
    setSelectedOrderItem(null);
  };

  return (
    <LangContext.Provider value={lang}>
      <div
        className="min-h-screen bg-[#0A0A0C] font-sans text-white selection:bg-mo-orange selection:text-white overflow-x-hidden pb-16 md:pb-0 relative"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <Header lang={lang} setLang={setLang} onOpenOrder={() => handleOpenOrder(null)} />
        <Hero onOpenOrder={() => handleOpenOrder(null)} />
        <Marquee />
        <Locations />
        <FoodShowcase />
        <MenuSection onSelectItem={(item) => handleOpenOrder(item)} />
        <Reviews />
        <Footer />

        {/* Mobile Sticky Quick Action Bar */}
        <MobileActionBar onOpenOrder={() => handleOpenOrder(null)} t={t} isRtl={isRtl} />

        {/* Call to Order Modal */}
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={handleCloseOrder}
          selectedItem={selectedOrderItem}
          t={t}
          isRtl={isRtl}
          lang={lang}
        />
      </div>
    </LangContext.Provider>
  );
}
