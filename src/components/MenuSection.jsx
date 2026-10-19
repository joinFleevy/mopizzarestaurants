import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronsRight, ChevronsLeft, Pizza, Utensils, Coffee, LayoutGrid } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';
import menuData from '../data/menu.json';
import { MenuItem } from './MenuItem.jsx';

export const MenuSection = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const lang = useContext(LangContext);
  const isRtl = lang === 'ar';
  const t = locales[lang].menu;

  const categories = [
    { id: 'all', label: t.categories?.all || 'All Menu', icon: LayoutGrid },
    { id: 'pizzas', label: t.categories?.pizzas || 'Pizzas', icon: Pizza },
    { id: 'sides', label: t.categories?.sides || 'Sides & Starters', icon: Utensils },
    { id: 'drinks', label: t.categories?.drinks || 'Drinks & Mojitos', icon: Coffee },
    { id: 'desserts', label: t.categories?.desserts || 'Desserts', icon: Sparkles }
  ];

  const showPizzas = activeCategory === 'all' || activeCategory === 'pizzas';
  const showSides = activeCategory === 'all' || activeCategory === 'sides';
  const showDrinks = activeCategory === 'all' || activeCategory === 'drinks';
  const showDesserts = activeCategory === 'all' || activeCategory === 'desserts';

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
        <div className="text-center mb-10 md:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-mo-orange block mb-3">
            [ SELECTION & PRICING ]
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-white mb-4">
            {t.title}
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-normal max-w-md mx-auto">
            100% Fresh daily dough, signature house sauces, crispy sides, and artisan drinks.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-16 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs sm:text-sm uppercase tracking-wider font-bold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-mo-orange text-white shadow-[0_4px_20px_rgba(255,69,0,0.4)] border border-mo-orange'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-mo-orange'}`} aria-hidden="true" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- CLASSIC PIZZAS SECTION --- */}
        {showPizzas && (
          <div className="mb-24 md:mb-32">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-white flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-mo-orange" />
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
              {menuData.standard.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 snap-center w-[82vw] max-w-[340px]"
                >
                  <MenuItem
                    item={item}
                    isVip={false}
                    t={t}
                    isRtl={isRtl}
                    onSelect={onSelectItem}
                  />
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
        )}

        {/* --- VIP EXCLUSIVE VAULT --- */}
        {showPizzas && (
          <div className="mb-24 md:mb-32 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-14 bg-gradient-to-b from-[#14141A] to-[#0D0D11] border border-mo-yellow/25 shadow-2xl relative overflow-hidden">
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
              {menuData.vip.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 snap-center w-[82vw] max-w-[340px]"
                >
                  <MenuItem
                    item={item}
                    isVip={true}
                    t={t}
                    isRtl={isRtl}
                    onSelect={onSelectItem}
                  />
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
        )}

        {/* --- CRISPY SIDES & STARTERS SECTION --- */}
        {showSides && menuData.sides && (
          <div className="mb-24 md:mb-32">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-white flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-mo-yellow" />
                {t.categories?.sides || 'Sides & Starters'}
              </h3>

              <div className="md:hidden flex items-center text-white/60 font-mono text-xs uppercase gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                {isRtl ? 'اسحب' : 'SWIPE'}
                {isRtl ? <ChevronsLeft className="w-3.5 h-3.5" /> : <ChevronsRight className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Mobile Swipe Container (<md) */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 hide-scrollbar -mx-4 px-4">
              {menuData.sides.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 snap-center w-[82vw] max-w-[340px]"
                >
                  <MenuItem
                    item={item}
                    isVip={false}
                    t={t}
                    isRtl={isRtl}
                    onSelect={onSelectItem}
                  />
                </div>
              ))}
            </div>

            {/* Desktop Grid (4 columns) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuData.sides.map((item) => (
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
        )}

        {/* --- DRINKS & REFRESHMENTS SECTION --- */}
        {showDrinks && menuData.drinks && (
          <div className="mb-24 md:mb-32">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-white flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                {t.categories?.drinks || 'Drinks & Mojitos'}
              </h3>

              <div className="md:hidden flex items-center text-white/60 font-mono text-xs uppercase gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                {isRtl ? 'اسحب' : 'SWIPE'}
                {isRtl ? <ChevronsLeft className="w-3.5 h-3.5" /> : <ChevronsRight className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Mobile Swipe Container (<md) */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 hide-scrollbar -mx-4 px-4">
              {menuData.drinks.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 snap-center w-[82vw] max-w-[340px]"
                >
                  <MenuItem
                    item={item}
                    isVip={false}
                    t={t}
                    isRtl={isRtl}
                    onSelect={onSelectItem}
                  />
                </div>
              ))}
            </div>

            {/* Desktop Grid (4 columns) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuData.drinks.map((item) => (
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
        )}

        {/* --- DESSERTS SECTION --- */}
        {showDesserts && menuData.desserts && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-white flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                {t.categories?.desserts || 'Desserts'}
              </h3>

              <div className="md:hidden flex items-center text-white/60 font-mono text-xs uppercase gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                {isRtl ? 'اسحب' : 'SWIPE'}
                {isRtl ? <ChevronsLeft className="w-3.5 h-3.5" /> : <ChevronsRight className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Mobile Swipe Container (<md) */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 hide-scrollbar -mx-4 px-4">
              {menuData.desserts.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 snap-center w-[82vw] max-w-[340px]"
                >
                  <MenuItem
                    item={item}
                    isVip={false}
                    t={t}
                    isRtl={isRtl}
                    onSelect={onSelectItem}
                  />
                </div>
              ))}
            </div>

            {/* Desktop Grid (2-4 columns) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuData.desserts.map((item) => (
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
        )}
      </div>
    </section>
  );
};
