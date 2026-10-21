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
      className="sticky top-0 z-50 bg-[#150702]/90 backdrop-blur-md border-b border-mo-yellow/20 px-4 sm:px-8 py-3 flex justify-between items-center transition-colors"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Brand logo with Morad Oudia mascot */}
      <a
        href="#"
        className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-hidden"
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-mo-orange to-mo-yellow p-0.5 shadow-md group-hover:scale-105 group-hover:rotate-3 transition-transform">
          <div className="w-full h-full bg-[#150702] rounded-[10px] flex items-center justify-center overflow-hidden">
            <img
              src="/logo.svg"
              alt="MO PIZZA Mascot"
              width="40"
              height="40"
              className="w-full h-full object-contain p-0.5"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#FDFCF7] group-hover:text-mo-yellow transition-colors leading-none">
              {t.nav.brand}
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold tracking-widest uppercase bg-mo-yellow/15 text-mo-yellow px-2 py-0.5 rounded-full border border-mo-yellow/30">
              5 RESTOS • DZ
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-mo-tan/80 uppercase hidden md:block">
            LE RESTO DE MORAD OUDIA
          </span>
        </div>
      </a>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick order CTA in header */}
        <button
          onClick={onOpenOrder}
          className="hidden sm:inline-flex items-center gap-2 bg-mo-orange text-white font-sans font-black text-xs uppercase px-4 py-2.5 rounded-full hover:bg-mo-yellow hover:text-black transition-all shadow-[0_2px_15px_rgba(237,115,45,0.4)] active:scale-95"
        >
          {totalItems > 0 ? (
            <>
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{totalItems} ({totalPrice.toLocaleString()} DA)</span>
              <span className="opacity-40">•</span>
              <span>{t.menu?.callToOrder || 'Commander'}</span>
            </>
          ) : (
            <>
              <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.menu?.callToOrder || 'Commander'}</span>
            </>
          )}
        </button>

        {/* Minimal capsule language switcher */}
        <div
          role="group"
          aria-label="Language selector"
          className="flex bg-[#251209] text-white rounded-full p-1 border border-mo-yellow/25 text-xs font-bold shadow-inner"
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
