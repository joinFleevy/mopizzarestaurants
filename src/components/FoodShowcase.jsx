import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';

export const FoodShowcase = () => {
  const lang = useContext(LangContext);
  const isRtl = lang === 'ar';
  const t = locales[lang].gallery;

  const badges = {
    ferment: lang === 'ar' ? 'تخمير 48 ساعة' : '48H FERMENTATION',
    cheese: lang === 'ar' ? '100% جبن غني' : 'EXTRA CHEESE PULL',
    crust: lang === 'ar' ? 'عجين خفيف ومقرمش' : 'CROÛTE AÉRIENNE',
    chef: lang === 'ar' ? 'وصفات خاصة' : 'RECETTES MORAD',
    fresh: lang === 'ar' ? 'صلصة طازجة يومياً' : 'SAUCE MAISON',
    algeria: lang === 'ar' ? 'بنة جزائرية 100%' : '100% BENNA DZ'
  };

  const items = [
    {
      src: '/images/Best/gallery-1.webp',
      alt: 'Mo Pizza Gathering Feast',
      badge: badges.ferment,
      badgeColor: 'bg-mo-yellow text-black',
      col: 'col-span-2 md:col-span-8',
      height: 'h-[220px] md:h-[420px]'
    },
    {
      src: '/images/Best/gallery-2.webp',
      alt: 'Mo Pizza Fresh Slice',
      badge: badges.cheese,
      badgeColor: 'bg-mo-orange text-black',
      col: 'col-span-1 md:col-span-4',
      height: 'h-[160px] md:h-[420px]'
    },
    {
      src: '/images/Best/gallery-3.webp',
      alt: 'Mo Pizza Artisan Crust',
      badge: badges.crust,
      badgeColor: 'bg-white text-black',
      col: 'col-span-1 md:col-span-4',
      height: 'h-[160px] md:h-[340px]'
    },
    {
      src: '/images/Best/gallery-7.webp',
      alt: 'Mo Pizza Atmosphere',
      badge: badges.chef,
      badgeColor: 'bg-mo-yellow text-black',
      col: 'col-span-2 md:col-span-4',
      height: 'h-[220px] md:h-[340px]'
    },
    {
      src: '/images/Best/gallery-4.webp',
      alt: 'Mo Pizza Sizzling Toppings',
      badge: badges.fresh,
      badgeColor: 'bg-mo-orange text-black',
      col: 'col-span-1 md:col-span-4',
      height: 'h-[160px] md:h-[340px]'
    },
    {
      src: '/images/Best/gallery-5.webp',
      alt: 'Mo Pizza Golden Bake',
      badge: badges.algeria,
      badgeColor: 'bg-mo-yellow text-black',
      col: 'col-span-1 md:col-span-6',
      height: 'h-[160px] md:h-[400px]'
    },
    {
      src: '/images/Best/gallery-6.webp',
      alt: 'Mo Pizza Master Oven',
      badge: badges.cheese,
      badgeColor: 'bg-white text-black',
      col: 'col-span-2 md:col-span-6',
      height: 'h-[220px] md:h-[400px]'
    }
  ];

  return (
    <section
      id="showcase"
      className="py-16 md:py-28 px-4 sm:px-6 md:px-12 bg-[#FFF8E7] border-b-3 border-black relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-mo-orange text-black px-3.5 py-1 rounded-full border-2 border-black font-mono font-black text-xs uppercase mb-3 shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{lang === 'ar' ? 'سر النكهة والجودة' : 'LE SAVOIR-FAIRE'}</span>
          </div>
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#111111] mb-3">
            {t.title}
          </h2>
          <p className="text-[#333333] text-sm sm:text-base font-medium max-w-lg mx-auto">
            {lang === 'ar'
              ? 'عجين فريش يتخمر 48 ساعة، صلصات سرية خاصة بموراد، وأجبان غنية تذوب عند كل قضمة.'
              : 'Pâte fraîche fermentée 48h, sauces secrètes et fromages fondants de Méditerranée.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 sm:gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className={`group relative rounded-3xl overflow-hidden border-3 border-black shadow-[4px_4px_0px_#000] bg-white ${item.col} ${item.height}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width="800"
                height="600"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Comic sticker badge overlay */}
              <div className="absolute bottom-3 start-3 z-10">
                <span className={`inline-block font-mono font-black text-[10px] sm:text-xs uppercase px-2.5 sm:px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] tracking-wider ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
