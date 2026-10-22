import React from 'react';
import { PhoneCall, MapPin, Utensils, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext.jsx';

export const MobileActionBar = ({ onOpenOrder, t, isRtl }) => {
  const { totalItems, totalPrice } = useCart();

  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-3 border-black px-3 py-2 flex items-center justify-around gap-2 shadow-[0_-4px_16px_rgba(0,0,0,0.15)]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Scroll to Menu */}
      <a
        href="#menu"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex-1 min-h-[48px] py-2 px-2 flex flex-col items-center justify-center bg-[#FFFDF5] hover:bg-mo-yellow border-2 border-black rounded-xl text-black font-sans font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_#000] active:scale-95 transition-all"
      >
        <Utensils className="w-4 h-4 mb-0.5 text-mo-orange" aria-hidden="true" />
        <span>{t.mobileBar?.menu || 'Menu'}</span>
      </a>

      {/* Main Call to Order CTA */}
      <button
        onClick={onOpenOrder}
        className={`relative flex-[1.7] min-h-[48px] py-2.5 px-3 flex items-center justify-center gap-1.5 rounded-xl border-2 border-black font-sans font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer ${
          totalItems > 0
            ? 'bg-mo-yellow text-black'
            : 'bg-mo-orange text-black'
        }`}
      >
        {totalItems > 0 ? (
          <>
            <ShoppingBag className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
            <span className="leading-tight font-black">{totalItems} ({totalPrice.toLocaleString()} DA)</span>
          </>
        ) : (
          <>
            <PhoneCall className="w-4 h-4 shrink-0 text-black animate-pulse" aria-hidden="true" />
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
        className="flex-1 min-h-[48px] py-2 px-2 flex flex-col items-center justify-center bg-[#FFFDF5] hover:bg-mo-yellow border-2 border-black rounded-xl text-black font-sans font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_#000] active:scale-95 transition-all"
      >
        <MapPin className="w-4 h-4 mb-0.5 text-mo-orange" aria-hidden="true" />
        <span>{t.mobileBar?.locations || 'Branches'}</span>
      </a>
    </nav>
  );
};
