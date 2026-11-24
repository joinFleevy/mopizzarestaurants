import React, { useState, useContext } from 'react';
import { Sparkles, Pizza, Utensils, Coffee, LayoutGrid, List } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';
import menuData from '../data/menu.json';
import { MenuItem } from './MenuItem.jsx';
import { trackEvent } from '../utils/analytics.js';

export const MenuSection = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
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

  // Responsive grid vs compact list layout classes
  const standardGridClasses = viewMode === 'list'
    ? 'grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3.5'
    : 'grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6';

  const otherGridClasses = viewMode === 'list'
    ? 'grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3.5'
    : 'grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6';

  return (
    <section
      id="menu"
      className="scroll-mt-[76px] sm:scroll-mt-[84px] py-16 md:py-28 px-4 sm:px-6 md:px-12 bg-[#FFFDF5] border-b-3 border-black relative"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#111111] mb-3">
            {t.title}
          </h2>
          <p className="text-[#333333] text-sm sm:text-base font-medium max-w-md mx-auto">
            {t.subtitle}
          </p>

          {/* 3-Step Phone Ordering Ribbon */}
          {Array.isArray(t.howToOrder) && (
            <div
              data-how-to-order="true"
              className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-[#FFF8E7] border-2 border-black/15 rounded-2xl px-4 py-2.5 text-xs font-mono font-black uppercase text-[#111111]"
            >
              {t.howToOrder.map((step, idx) => (
                <React.Fragment key={step}>
                  {idx > 0 && (
                    <span className="text-mo-orange font-black" aria-hidden="true">
                      {isRtl ? '←' : '→'}
                    </span>
                  )}
                  <span>{step}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* --- STICKY CATEGORY SUB-NAV & VIEW TOGGLE --- */}
        <div className="sticky top-[74px] sm:top-[82px] md:top-[78px] z-30 bg-[#FFFDF5]/95 backdrop-blur-md py-2.5 sm:py-3 -mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12 border-y-2 border-black mb-10 md:mb-14 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto hide-scrollbar py-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      trackEvent('menu_category_filter', { category: cat.id });
                      const menuEl = document.getElementById('menu');
                      if (menuEl && menuEl.getBoundingClientRect().top < 0) {
                        menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 sm:gap-2 min-h-[44px] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider font-black transition-all duration-200 active:scale-95 cursor-pointer border-2 border-black ${
                      isActive
                        ? 'bg-mo-orange text-black shadow-[3px_3px_0px_#000]'
                        : 'bg-white text-black hover:bg-mo-yellow'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" aria-hidden="true" />
                    <span className="whitespace-nowrap">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle: Grid Cards vs Compact List */}
            <div className="flex items-center p-1 bg-white border-2 border-black rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title={t.gridView || 'Cards'}
                aria-label={t.gridView || 'Cards'}
                className={`min-w-[44px] min-h-[44px] justify-center p-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-mono text-xs font-black uppercase ${
                  viewMode === 'grid'
                    ? 'bg-mo-orange text-black border-2 border-black'
                    : 'text-black/60 hover:text-black border-2 border-transparent'
                }`}
              >
                <LayoutGrid className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">{t.gridView || 'Cards'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                title={t.listView || 'List'}
                aria-label={t.listView || 'List'}
                className={`min-w-[44px] min-h-[44px] justify-center p-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-mono text-xs font-black uppercase ${
                  viewMode === 'list'
                    ? 'bg-mo-orange text-black border-2 border-black'
                    : 'text-black/60 hover:text-black border-2 border-transparent'
                }`}
              >
                <List className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">{t.listView || 'List'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- CLASSIC PIZZAS SECTION --- */}
        {showPizzas && (
          <div className="mb-20 sm:mb-28">
            <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-black">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-[#111111] flex items-center gap-3">
                <span className="w-4 h-4 rounded-md bg-mo-orange border-2 border-black" />
                {t.standard}
              </h3>
              <span className="text-xs font-mono font-black uppercase text-black bg-mo-yellow px-2.5 py-1 rounded-md border-2 border-black">
                {menuData.standard.length} {t.counts?.pizzas || 'PIZZAS'}
              </span>
            </div>

            {/* Responsive Grid / List container */}
            <div className={standardGridClasses}>
              {menuData.standard.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  isVip={false}
                  t={t}
                  isRtl={isRtl}
                  lang={lang}
                  onSelect={onSelectItem}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* --- MORAD'S SIGNATURE RECIPES (VIP SPECIAL FEATURE) --- */}
        {showPizzas && (
          <div className="mb-20 sm:mb-28 rounded-3xl p-4 sm:p-10 md:p-12 bg-mo-yellow border-3 border-black shadow-[8px_8px_0px_#000] relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-black text-mo-yellow border-2 border-black">
                  <Sparkles className="w-6 h-6 fill-current" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-black">
                    {t.vipTitle}
                  </h3>
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-black/80">
                    {t.vipSubtitle}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-mo-orange text-black border-2 border-black px-3.5 py-1.5 rounded-full font-mono font-black text-xs uppercase rotate-1">
                <span>{t.vipBadge}</span>
              </div>
            </div>

            {/* VIP Grid / List */}
            <div className={otherGridClasses}>
              {menuData.vip.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  isVip={true}
                  t={t}
                  isRtl={isRtl}
                  lang={lang}
                  onSelect={onSelectItem}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* --- CRISPY SIDES & STARTERS SECTION --- */}
        {showSides && menuData.sides && (
          <div className="mb-20 sm:mb-28">
            <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-black">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-[#111111] flex items-center gap-3">
                <span className="w-4 h-4 rounded-md bg-mo-yellow border-2 border-black" />
                {t.categories?.sides || 'Accompagnements'}
              </h3>
              <span className="text-xs font-mono font-black uppercase text-black bg-white px-2.5 py-1 rounded-md border-2 border-black">
                {menuData.sides.length} {t.counts?.sides || 'SIDES'}
              </span>
            </div>

            <div className={otherGridClasses}>
              {menuData.sides.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  isVip={false}
                  t={t}
                  isRtl={isRtl}
                  lang={lang}
                  onSelect={onSelectItem}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* --- DRINKS & REFRESHMENTS SECTION --- */}
        {showDrinks && menuData.drinks && (
          <div className="mb-20 sm:mb-28">
            <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-black">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-[#111111] flex items-center gap-3">
                <span className="w-4 h-4 rounded-md bg-mo-orange border-2 border-black" />
                {t.categories?.drinks || 'Boissons & Mojitos'}
              </h3>
              <span className="text-xs font-mono font-black uppercase text-black bg-white px-2.5 py-1 rounded-md border-2 border-black">
                {menuData.drinks.length} {t.counts?.drinks || 'BOISSONS'}
              </span>
            </div>

            <div className={otherGridClasses}>
              {menuData.drinks.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  isVip={false}
                  t={t}
                  isRtl={isRtl}
                  lang={lang}
                  onSelect={onSelectItem}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* --- DESSERTS SECTION --- */}
        {showDesserts && menuData.desserts && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-black">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider text-[#111111] flex items-center gap-3">
                <span className="w-4 h-4 rounded-md bg-mo-yellow border-2 border-black" />
                {t.categories?.desserts || 'Desserts'}
              </h3>
              <span className="text-xs font-mono font-black uppercase text-black bg-white px-2.5 py-1 rounded-md border-2 border-black">
                {menuData.desserts.length} {t.counts?.desserts || 'DESSERTS'}
              </span>
            </div>

            <div className={otherGridClasses}>
              {menuData.desserts.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  isVip={false}
                  t={t}
                  isRtl={isRtl}
                  lang={lang}
                  onSelect={onSelectItem}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
