import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';
import menuData from '../data/menu.json';
import { MenuItem } from './MenuItem.jsx';

export const MenuSection = ({ onSelectItem }) => {
  const lang = useContext(LangContext);
  const isRtl = lang === 'ar';
  const t = locales[lang].menu;

  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const standardPages = chunkArray(menuData.standard, 4);
  const vipPages = chunkArray(menuData.vip, 4);

  return (
    <section
      id="menu"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0A0A0C] border-b border-white/10 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mo-orange/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-mo-orange block mb-3">
            [ SELECTION & PRICING ]
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-white mb-4">
            {t.title}
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-normal max-w-md mx-auto">
            100% Fresh daily dough, signature house sauces, and premium Mediterranean cheese blends.
          </p>
        </div>

        {/* --- CLASSIC PIZZAS SECTION --- */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-white flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-mo-orange" />
              {t.standard}
            </h3>

            {/* Mobile swipe helper */}
            <div className="md:hidden flex items-center text-white/60 font-mono text-xs uppercase gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              {isRtl ? 'اسحب' : 'SWIPE'}
              {isRtl ? <ChevronsLeft className="w-3.5 h-3.5" /> : <ChevronsRight className="w-3.5 h-3.5" />}
            </div>
          </div>

          {/* Mobile Swipe Container (<md) */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 hide-scrollbar -mx-4 px-4">
            {standardPages.map((pageItems, pageIdx) => (
              <div
                key={pageIdx}
                className="flex-shrink-0 snap-center w-[88vw] grid grid-cols-1 gap-4"
              >
                {pageItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    isVip={false}
                    t={t}
                    isRtl={isRtl}
                    onSelect={onSelectItem}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Desktop Grid (3 columns) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {menuData.standard.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isVip={false}
                t={t}
                isRtl={isRtl}
                onSelect={onSelectItem}
              />
            ))}
          </div>
        </div>

        {/* --- VIP EXCLUSIVE VAULT --- */}
        <div className="rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-14 bg-gradient-to-b from-[#14141A] to-[#0D0D11] border border-mo-yellow/25 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-mo-yellow/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex items-center justify-between mb-10 pb-4 border-b border-mo-yellow/20 relative z-10">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-mo-yellow/10 text-mo-yellow border border-mo-yellow/20">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-mo-yellow">
                  {t.vip}
                </h3>
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  EXCLUSIVE SPECIALTY TIERS
                </span>
              </div>
            </div>

            {/* Mobile swipe helper */}
            <div className="md:hidden flex items-center text-mo-yellow font-mono text-xs uppercase gap-1 bg-mo-yellow/10 px-3 py-1.5 rounded-full border border-mo-yellow/20">
              {isRtl ? 'اسحب' : 'SWIPE'}
              {isRtl ? <ChevronsLeft className="w-3.5 h-3.5" /> : <ChevronsRight className="w-3.5 h-3.5" />}
            </div>
          </div>

          {/* Mobile Swipe Container for VIP (<md) */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 hide-scrollbar -mx-4 px-4 relative z-10">
            {vipPages.map((pageItems, pageIdx) => (
              <div
                key={pageIdx}
                className="flex-shrink-0 snap-center w-[88vw] grid grid-cols-1 gap-4"
              >
                {pageItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    isVip={true}
                    t={t}
                    isRtl={isRtl}
                    onSelect={onSelectItem}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Desktop Grid for VIP (4 columns) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {menuData.vip.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isVip={true}
                t={t}
                isRtl={isRtl}
                onSelect={onSelectItem}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
