import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PhoneCall, ShoppingBag } from 'lucide-react';
import { locales } from './locales.js';
import { useCart } from './CartContext.jsx';

export const Header = ({ lang, setLang, onOpenOrder }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = locales[lang];
  const isRtl = lang === 'ar';
  const { totalItems, totalPrice } = useCart();

  return (
    <motion.header
      initial={{ y: shouldReduceMotion ? 0 : -60, opacity: shouldReduceMotion ? 1 : 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-[#0A0A0C]/85 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex justify-between items-center transition-colors"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Brand logo & streetwear subtext */}
      <a
        href="#"
        className="flex items-center gap-2.5 group focus-visible:outline-hidden"
      >
        <span className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-white group-hover:text-mo-orange transition-colors">
          {t.nav.brand}
        </span>
        <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase bg-white/10 text-white/70 px-2 py-0.5 rounded-sm border border-white/10">
          5 LOCATIONS • DZ
        </span>
      </a>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick order CTA in header */}
        <button
          onClick={onOpenOrder}
          className="hidden sm:inline-flex items-center gap-2 bg-mo-orange text-white font-sans font-bold text-xs uppercase px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,69,0,0.3)] active:scale-95"
        >
          {totalItems > 0 ? (
            <>
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{totalItems} ({totalPrice.toLocaleString()} DA)</span>
              <span className="opacity-40">•</span>
              <span>{t.menu?.callToOrder || 'Call to Order'}</span>
            </>
          ) : (
            <>
              <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.menu?.callToOrder || 'Call to Order'}</span>
            </>
          )}
        </button>

        {/* Minimal capsule language switcher */}
        <div
          role="group"
          aria-label="Language selector"
          className="flex bg-[#16161A] text-white rounded-full p-1 border border-white/15 text-xs font-bold"
        >
          {['en', 'ar', 'fr'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`px-2.5 py-1 rounded-full transition-all text-xs uppercase tracking-wider ${
                lang === l
                  ? 'bg-mo-orange text-white shadow-sm font-black'
                  : 'text-white/60 hover:text-white'
              } focus-visible:ring-1 focus-visible:ring-mo-orange focus-visible:outline-hidden`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
};
