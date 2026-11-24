import React, { useContext } from 'react';
import { Sparkles, PhoneCall } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';
import { trackEvent } from '../utils/analytics.js';

export const FoodShowcase = ({ onOpenOrder }) => {
  const lang = useContext(LangContext);
  const isRtl = lang === 'ar';
  const t = locales[lang].gallery;
  const badges = t.badges || {};

  const items = [
    {
      src: '/images/Best/mo-ambiance.webp',
      alt: 'Ambiance MO PIZZA avec néon Morad Oudia et boîtes signature',
      badge: badges.ambiance,
      badgeColor: 'bg-mo-yellow text-black',
      col: 'col-span-2 md:col-span-8',
      height: 'h-[230px] md:h-[420px]'
    },
    {
      src: '/images/Best/gallery-2.webp',
      alt: 'Pizza MO PIZZA sur papier personnalisé',
      badge: badges.crust,
      badgeColor: 'bg-mo-orange text-black',
      col: 'col-span-1 md:col-span-4',
      height: 'h-[180px] md:h-[420px]'
    },
    {
      src: '/images/Best/mo-oranaise.webp',
      alt: 'Pizza Oranaise merguez et fromage fondant au restaurant MO PIZZA',
      badge: badges.chef,
      badgeColor: 'bg-white text-black',
      col: 'col-span-1 md:col-span-4',
      height: 'h-[180px] md:h-[340px]'
    },
    {
      src: '/images/Best/mo-feast.webp',
      alt: 'Panozzo fondant et pizza grillée MO PIZZA',
      badge: badges.cheese,
      badgeColor: 'bg-mo-yellow text-black',
      col: 'col-span-2 md:col-span-4',
      height: 'h-[230px] md:h-[340px]'
    },
    {
      src: '/images/Best/mo-woodfired.webp',
      alt: 'Pizza cuite au feu de bois à la croûte dorée MO PIZZA',
      badge: badges.woodfired,
      badgeColor: 'bg-mo-orange text-black',
      col: 'col-span-1 md:col-span-4',
      height: 'h-[180px] md:h-[340px]'
    },
    {
      src: '/images/Best/gallery-5.webp',
      alt: 'Pizza viande hachée MO PIZZA servie sur palette en bois',
      badge: badges.branches,
      badgeColor: 'bg-mo-yellow text-black',
      col: 'col-span-1 md:col-span-6',
      height: 'h-[180px] md:h-[400px]'
    },
    {
      src: '/images/Best/gallery-1.webp',
      alt: 'Salle moderne du restaurant MO PIZZA avec enseigne néon',
      badge: badges.feast,
      badgeColor: 'bg-white text-black',
      col: 'col-span-2 md:col-span-6',
      height: 'h-[230px] md:h-[400px]'
    }
  ];

  return (
    <section
      id="showcase"
      className="scroll-mt-[76px] sm:scroll-mt-[84px] py-16 md:py-28 px-4 sm:px-6 md:px-12 bg-[#FFF8E7] border-b-3 border-black relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-mo-orange text-black px-3.5 py-1 rounded-full border-2 border-black font-mono font-black text-xs uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.eyebrow}</span>
          </div>
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#111111] mb-3">
            {t.title}
          </h2>
          <p className="text-[#333333] text-sm sm:text-base font-medium max-w-lg mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 sm:gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl overflow-hidden border-2 sm:border-3 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] transition-all duration-300 bg-white ${item.col} ${item.height}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width="800"
                height="600"
                className="w-full h-full object-cover"
              />
              {/* Crisp Comic Sticker Badge (no extra shadow noise) */}
              <div className="absolute bottom-3 start-3 z-10">
                <span className={`inline-block font-mono font-black text-[11px] sm:text-xs uppercase px-2.5 sm:px-3 py-1 rounded-lg border-2 border-black tracking-wider ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Focused Appetite-to-Call CTA Bar */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <span className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-[#111111]">
            {t.ctaPrompt}
          </span>
          <button
            type="button"
            data-showcase-cta="true"
            onClick={() => {
              trackEvent('showcase_cta_click');
              onOpenOrder?.();
            }}
            className="inline-flex items-center justify-center gap-2.5 min-h-[52px] bg-mo-orange hover:bg-mo-yellow text-black font-sans font-black text-sm sm:text-base uppercase tracking-wider px-7 py-3.5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer active:scale-95"
          >
            <PhoneCall className="w-5 h-5 text-black" aria-hidden="true" />
            <span>{t.ctaButton}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
