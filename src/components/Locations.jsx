import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ChevronsRight, ChevronsLeft, ArrowUpRight } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';
import branchesInfo from '../data/branches_info.json';

export const Locations = () => {
  const lang = useContext(LangContext);
  const t = locales[lang].locations;
  const isRtl = lang === 'ar';

  const branches = branchesInfo.map((b) => ({
    city: t.cities[b.id] || b.city,
    sub: t.subs[b.id] || b.name,
    phone: b.phone,
    link: b.mapsUrl,
    lat: b.lat,
    lng: b.lng,
    id: b.id
  }));

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  return (
    <section
      id="locations"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0E0E12] border-b border-white/10 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-mo-yellow block mb-3">
            [ PHYSICAL HUBS • 5 LOCATIONS ]
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-white mb-4">
            {t.title}
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-normal max-w-md mx-auto">
            Find the nearest MO PIZZA branch. Dine in, take out, or call directly for quick pickup.
          </p>
        </div>

        <div className="md:hidden flex justify-center items-center mb-6 text-white/60 font-mono text-xs uppercase gap-1">
          {isRtl ? 'اسحب الفروع' : 'SWIPE LOCATIONS'}
          {isRtl ? <ChevronsLeft className="w-3.5 h-3.5" /> : <ChevronsRight className="w-3.5 h-3.5" />}
        </div>

        {/* Master Locations Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 rounded-[2.5rem] bg-[#14141A] border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl">
          {/* Branch List */}
          <div className="md:w-5/12 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible hide-scrollbar gap-3 pb-2 md:pb-0 snap-x snap-mandatory">
            {branches.map((b) => {
              const isSelected = selectedBranch.id === b.id;
              return (
                <div
                  key={b.id}
                  className={`p-4 sm:p-5 rounded-2xl flex flex-col justify-between transition-all border shrink-0 snap-start w-64 md:w-auto ${
                    isSelected
                      ? 'bg-[#1C1C24] border-mo-orange/60 shadow-[0_4px_20px_rgba(255,69,0,0.15)]'
                      : 'bg-[#101014] border-white/10 hover:border-white/20 text-white/80'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedBranch(b)}
                    className="w-full text-start flex flex-col gap-1 focus-visible:outline-hidden"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={18}
                          className={isSelected ? 'text-mo-orange' : 'text-white/40'}
                          aria-hidden="true"
                        />
                        <h3 className="font-display uppercase text-2xl tracking-wide text-white">
                          {b.city}
                        </h3>
                      </div>
                      <span
                        className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-mo-orange/20 text-mo-orange border border-mo-orange/30'
                            : 'bg-white/10 text-white/60'
                        }`}
                      >
                        {b.sub}
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/10">
                    <a
                      href={`tel:${b.phone.replace(/\s+/g, '')}`}
                      className={`inline-flex items-center gap-2 font-mono text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-mo-orange text-white hover:bg-white hover:text-black'
                          : 'bg-white/10 text-white/80 hover:bg-white hover:text-black'
                      }`}
                      dir="ltr"
                    >
                      <Phone size={12} aria-hidden="true" />
                      <span>{b.phone}</span>
                    </a>

                    <a
                      href={b.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                      title={t.cta}
                      aria-label={`${t.cta} ${b.city}`}
                    >
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Frame */}
          <div className="md:w-7/12 h-[340px] sm:h-[420px] md:h-auto min-h-[340px] md:min-h-[480px] rounded-2xl overflow-hidden relative border border-white/10 bg-black">
            <iframe
              src={`https://www.google.com/maps?q=${selectedBranch.lat},${selectedBranch.lng}&hl=${
                lang === 'fr' ? 'fr' : lang === 'ar' ? 'ar' : 'en'
              }&z=19&output=embed&iwloc=near`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 opacity-90 contrast-[1.05]"
              title={`Map of ${selectedBranch.city}`}
            />
            <a
              href={selectedBranch.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-mo-orange hover:bg-white text-white hover:text-black font-sans font-bold uppercase text-xs sm:text-sm px-5 py-3 rounded-full shadow-xl transition-all flex items-center gap-2"
            >
              <MapPin size={16} aria-hidden="true" />
              <span>{t.cta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
