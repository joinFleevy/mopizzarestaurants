import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PhoneCall, ShoppingBag } from 'lucide-react';
import { locales } from './locales.js';
import { useCart } from './CartContext.jsx';
import { getBranchStatus } from '../utils/businessHours.js';

export const Header = ({ lang, setLang, onOpenOrder }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = locales[lang];
  const isRtl = lang === 'ar';
  const { totalItems, totalPrice } = useCart();
  const { isOpen } = getBranchStatus();

  return (
    <motion.header
      initial={{ y: shouldReduceMotion ? 0 : -60, opacity: shouldReduceMotion ? 1 : 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-[#FFFDF5]/95 backdrop-blur-md border-b-3 border-black px-4 sm:px-8 py-3 flex justify-between items-center transition-colors"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Brand logo with Morad Oudia mascot */}
      <a
        href="#"
        className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-hidden"
      >
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-mo-orange border-2 border-black overflow-hidden shadow-[2px_2px_0px_#000] group-hover:scale-105 group-hover:rotate-3 transition-transform flex items-center justify-center shrink-0">
          <img
            src="/logo.svg"
            alt="MO PIZZA Mascot"
            width="48"
            height="48"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#111111] group-hover:text-mo-orange transition-colors leading-none">
              {t.nav.brand}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-black tracking-wider uppercase bg-mo-yellow text-black px-2 py-0.5 rounded-md border-2 border-black shadow-[1px_1px_0px_#000]">
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-rose-500'}`} aria-hidden="true" />
              <span>5 RESTOS • DZ</span>
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-mo-orange uppercase hidden md:block">
            LE RESTO DE MORAD OUDIA
          </span>
        </div>
      </a>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick order CTA in header */}
        <button
          onClick={onOpenOrder}
          className="hidden sm:inline-flex items-center gap-2 bg-mo-orange text-black font-sans font-black text-xs uppercase px-4 py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-mo-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all cursor-pointer active:scale-95"
        >
          {totalItems > 0 ? (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-black" aria-hidden="true" />
              <span>{totalItems} ({totalPrice.toLocaleString()} DA)</span>
              <span className="opacity-40">•</span>
              <span>{t.menu?.callToOrder || 'Commander'}</span>
            </>
          ) : (
            <>
              <PhoneCall className="w-3.5 h-3.5 text-black" aria-hidden="true" />
              <span>{t.menu?.callToOrder || 'Commander'}</span>
            </>
          )}
        </button>

        {/* Capsule language switcher */}
        <div
          role="group"
          aria-label="Language selector"
          className="flex bg-white text-black rounded-xl p-1 border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black"
        >
          {['en', 'ar', 'fr'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`min-w-[36px] py-1.5 px-2 rounded-lg transition-all text-xs uppercase tracking-wider font-black cursor-pointer ${
                lang === l
                  ? 'bg-mo-yellow text-black border-2 border-black shadow-[1px_1px_0px_#000]'
                  : 'text-black/60 hover:text-black border border-transparent'
              } focus-visible:outline-hidden`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
};
