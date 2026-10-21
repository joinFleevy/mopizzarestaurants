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
    { id: 'all', label: t.categories?.all || 'Tout le Menu', icon: LayoutGrid },
    { id: 'pizzas', label: t.categories?.pizzas || 'Pizzas', icon: Pizza },
    { id: 'sides', label: t.categories?.sides || 'Accompagnements', icon: Utensils },
    { id: 'drinks', label: t.categories?.drinks || 'Boissons & Mojitos', icon: Coffee },
    { id: 'desserts', label: t.categories?.desserts || 'Desserts', icon: Sparkles }
  ];

  const showPizzas = activeCategory === 'all' || activeCategory === 'pizzas';
  const showSides = activeCategory === 'all' || activeCategory === 'sides';
  const showDrinks = activeCategory === 'all' || activeCategory === 'drinks';
  const showDesserts = activeCategory === 'all' || activeCategory === 'desserts';

  return (
    <section
      id="menu"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#1C0C05] border-b border-mo-yellow/15 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mo-orange/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#FDFCF7] mb-4">
            {t.title}
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-normal max-w-md mx-auto">
            {lang === 'ar'
              ? 'عجين فريش يومياً، أجبان فاخرة، مقرمشات، ومشروبات باردة منعشة.'
              : 'Pâte fraîche artisanale, sauces maison, accompagnements croustillants et boissons fraîches.'}
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
                className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs sm:text-sm uppercase tracking-wider font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-mo-orange text-white shadow-[0_4px_20px_rgba(237,115,45,0.45)] border border-mo-orange'
                    : 'bg-[#251209] hover:bg-[#34180C] text-white/80 hover:text-white border border-mo-yellow/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-mo-yellow'}`} aria-hidden="true" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- CLASSIC PIZZAS SECTION --- */}
        {showPizzas && (
          <div className="mb-24 md:mb-32">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-mo-yellow/20">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-[#FDFCF7] flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-mo-orange" />
                {t.standard}
              </h3>

              {/* Mobile swipe helper */}
              <div className="md:hidden flex items-center text-mo-yellow font-mono text-xs uppercase gap-1 bg-[#251209] px-3 py-1.5 rounded-full border border-mo-yellow/25">
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

        {/* --- MORAD'S SIGNATURE RECIPES (VIP) --- */}
        {showPizzas && (
          <div className="mb-24 md:mb-32 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-14 bg-gradient-to-b from-[#2E160B] to-[#1C0C05] border-2 border-mo-yellow/35 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-mo-yellow/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex items-center justify-between mb-10 pb-4 border-b border-mo-yellow/25 relative z-10">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-mo-yellow text-black shadow-md">
                  <Sparkles className="w-6 h-6 fill-current" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-mo-yellow">
                    {lang === 'ar' ? 'وصفات مراد أودية الخاصة' : 'Les Recettes Signature de Morad'}
                  </h3>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/60">
                    {lang === 'ar' ? 'قمة البنة • إبداعات استثنائية' : 'CRÉATIONS LÉGENDAIRES CHARGÉES EN SAVEURS'}
                  </span>
                </div>
              </div>

              {/* Mobile swipe helper */}
              <div className="md:hidden flex items-center text-mo-yellow font-mono text-xs uppercase gap-1 bg-mo-yellow/15 px-3 py-1.5 rounded-full border border-mo-yellow/30">
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
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-mo-yellow/20">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-[#FDFCF7] flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-mo-yellow" />
                {t.categories?.sides || 'Accompagnements'}
              </h3>

              <div className="md:hidden flex items-center text-mo-yellow font-mono text-xs uppercase gap-1 bg-[#251209] px-3 py-1.5 rounded-full border border-mo-yellow/25">
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
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-mo-yellow/20">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-[#FDFCF7] flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-mo-cheese" />
                {t.categories?.drinks || 'Boissons & Mojitos'}
              </h3>

              <div className="md:hidden flex items-center text-mo-yellow font-mono text-xs uppercase gap-1 bg-[#251209] px-3 py-1.5 rounded-full border border-mo-yellow/25">
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
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-mo-yellow/20">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-[#FDFCF7] flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-mo-orange" />
                {t.categories?.desserts || 'Desserts'}
              </h3>

              <div className="md:hidden flex items-center text-mo-yellow font-mono text-xs uppercase gap-1 bg-[#251209] px-3 py-1.5 rounded-full border border-mo-yellow/25">
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
