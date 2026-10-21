import React from 'react';
import { PhoneCall, MapPin, Utensils, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext.jsx';

export const MobileActionBar = ({ onOpenOrder, t, isRtl }) => {
  const { totalItems } = useCart();

  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#150702]/95 backdrop-blur-lg border-t border-mo-yellow/25 px-4 py-2.5 flex items-center justify-around gap-2.5 shadow-2xl"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Scroll to Menu */}
      <a
        href="#menu"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex-1 py-2 px-2 flex flex-col items-center justify-center bg-[#251209] hover:bg-[#34180C] border border-mo-yellow/20 rounded-xl text-white/90 font-sans font-bold text-[11px] uppercase tracking-wider transition-all"
      >
        <Utensils className="w-4 h-4 mb-0.5 text-mo-orange" aria-hidden="true" />
        <span>{t.mobileBar?.menu || 'Menu'}</span>
      </a>

      {/* Main Call to Order CTA */}
      <button
        onClick={onOpenOrder}
        className="relative flex-[1.6] py-2.5 px-3 flex items-center justify-center gap-2 bg-mo-orange hover:bg-mo-yellow hover:text-black text-white rounded-xl font-sans font-black uppercase text-xs tracking-wider shadow-[0_2px_15px_rgba(237,115,45,0.45)] active:scale-95 transition-all"
      >
        {totalItems > 0 ? (
          <>
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="leading-tight">{t.mobileBar?.order || 'Commander'}</span>
            <span className="bg-mo-yellow text-black text-[10px] font-mono font-black px-1.5 py-0.2 rounded-full ml-1">
              {totalItems}
            </span>
          </>
        ) : (
          <>
            <PhoneCall className="w-4 h-4 shrink-0 animate-pulse" aria-hidden="true" />
            <span className="leading-tight">{t.mobileBar?.order || 'Commander'}</span>
          </>
        )}
      </button>

      {/* Scroll to Branches */}
      <a
        href="#locations"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex-1 py-2 px-2 flex flex-col items-center justify-center bg-[#251209] hover:bg-[#34180C] border border-mo-yellow/20 rounded-xl text-white/90 font-sans font-bold text-[11px] uppercase tracking-wider transition-all"
      >
        <MapPin className="w-4 h-4 mb-0.5 text-mo-yellow" aria-hidden="true" />
        <span>{t.mobileBar?.locations || 'Branches'}</span>
      </a>
    </nav>
  );
};
