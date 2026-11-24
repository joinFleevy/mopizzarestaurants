import React, { useState, useEffect } from 'react';
import { PhoneCall, MapPin, Utensils } from 'lucide-react';
import { useCart } from './CartContext.jsx';

export const MobileActionBar = ({ onOpenOrder, t, isRtl }) => {
  const { totalItems, totalPrice } = useCart();
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    const menuEl = document.getElementById('menu');
    const locationsEl = document.getElementById('locations');
    if (!menuEl && !locationsEl) return;

    const visible = { menu: false, locations: false };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === 'menu') visible.menu = entry.isIntersecting;
          if (entry.target.id === 'locations') visible.locations = entry.isIntersecting;
        }
        if (visible.locations) setActiveSection('locations');
        else if (visible.menu) setActiveSection('menu');
        else setActiveSection(null);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0 }
    );

    if (menuEl) observer.observe(menuEl);
    if (locationsEl) observer.observe(locationsEl);
    return () => observer.disconnect();
  }, []);

  const isMenuActive = activeSection === 'menu';
  const isLocationsActive = activeSection === 'locations';

  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF5]/95 backdrop-blur-md border-t-2 border-black shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-md mx-auto px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] grid grid-cols-[1fr_2fr_1fr] items-center gap-2">
        {/* Menu Tab */}
        <a
          href="#menu"
          data-mobile-nav="menu"
          data-active={isMenuActive ? 'true' : 'false'}
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('menu');
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`h-12 py-1.5 px-1.5 min-[360px]:px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-colors active:scale-95 ${
            isMenuActive
              ? 'bg-mo-yellow/35 text-black'
              : 'text-[#111111]/75 hover:text-black hover:bg-black/5'
          }`}
        >
          <Utensils
            className={`w-[18px] h-[18px] shrink-0 ${isMenuActive ? 'text-mo-orange' : 'text-[#111111]/75'}`}
            aria-hidden="true"
          />
          <span
            className={`text-[11px] font-sans uppercase tracking-wide min-[360px]:tracking-wider leading-none whitespace-nowrap ${
              isMenuActive ? 'font-black text-black' : 'font-extrabold'
            }`}
          >
            {t.mobileBar?.menu || 'Menu'}
          </span>
        </a>

        {/* Primary Focal Call-to-Order / Tray Hero Button */}
        <button
          type="button"
          data-mobile-order-cta="true"
          onClick={onOpenOrder}
          className={`h-12 w-full px-2.5 min-[360px]:px-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-1.5 min-[360px]:gap-2 cursor-pointer whitespace-nowrap font-sans font-black text-[11px] min-[360px]:text-xs uppercase tracking-wider text-black ${
            totalItems > 0
              ? 'bg-mo-yellow hover:bg-mo-orange'
              : 'bg-mo-orange hover:bg-mo-yellow'
          }`}
        >
          {totalItems > 0 ? (
            <>
              <span className="inline-flex items-center justify-center min-w-[22px] px-2 py-1 rounded-full bg-black text-mo-yellow font-mono text-[11px] font-black leading-none">
                {totalItems}
              </span>
              <span className="font-mono font-black text-xs" dir="ltr">
                {totalPrice.toLocaleString()} DA
              </span>
              <PhoneCall className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
            </>
          ) : (
            <>
              <PhoneCall className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
              <span>{t.mobileBar?.order || 'Commander'}</span>
            </>
          )}
        </button>

        {/* Branches / Locations Tab */}
        <a
          href="#locations"
          data-mobile-nav="locations"
          data-active={isLocationsActive ? 'true' : 'false'}
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('locations');
            document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`h-12 py-1.5 px-1.5 min-[360px]:px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-colors active:scale-95 ${
            isLocationsActive
              ? 'bg-mo-yellow/35 text-black'
              : 'text-[#111111]/75 hover:text-black hover:bg-black/5'
          }`}
        >
          <MapPin
            className={`w-[18px] h-[18px] shrink-0 ${isLocationsActive ? 'text-mo-orange' : 'text-[#111111]/75'}`}
            aria-hidden="true"
          />
          <span
            className={`text-[11px] font-sans uppercase tracking-wide min-[360px]:tracking-wider leading-none whitespace-nowrap ${
              isLocationsActive ? 'font-black text-black' : 'font-extrabold'
            }`}
          >
            {t.mobileBar?.locations || 'Branches'}
          </span>
        </a>
      </div>
    </nav>
  );
};
