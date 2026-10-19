import React from 'react';
import { PhoneCall, MapPin, Utensils } from 'lucide-react';

export const MobileActionBar = ({ onOpenOrder, t, isRtl }) => {
  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E12]/90 backdrop-blur-lg border-t border-white/15 px-4 py-2.5 flex items-center justify-around gap-2.5 shadow-2xl"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Scroll to Menu */}
      <a
        href="#menu"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex-1 py-2 px-2 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/90 font-sans font-bold text-[11px] uppercase tracking-wider transition-all"
      >
        <Utensils className="w-4 h-4 mb-0.5 text-mo-orange" aria-hidden="true" />
        <span>{t.mobileBar?.menu || 'Menu'}</span>
      </a>

      {/* Main Call to Order CTA */}
      <button
        onClick={onOpenOrder}
        className="flex-[1.6] py-2.5 px-3 flex items-center justify-center gap-2 bg-mo-orange text-white rounded-xl font-sans font-black uppercase text-xs tracking-wider shadow-[0_2px_15px_rgba(255,69,0,0.4)] active:scale-95 transition-all"
      >
        <PhoneCall className="w-4 h-4 shrink-0 animate-pulse" aria-hidden="true" />
        <span className="leading-tight">{t.mobileBar?.order || 'Call to Order'}</span>
      </button>

      {/* Scroll to Branches */}
      <a
        href="#locations"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex-1 py-2 px-2 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/90 font-sans font-bold text-[11px] uppercase tracking-wider transition-all"
      >
        <MapPin className="w-4 h-4 mb-0.5 text-mo-yellow" aria-hidden="true" />
        <span>{t.mobileBar?.locations || 'Branches'}</span>
      </a>
    </nav>
  );
};
