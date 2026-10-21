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
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#1C0C05] border-b border-mo-yellow/15 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#FDFCF7] mb-4">
            {t.title}
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-normal max-w-md mx-auto">
            {lang === 'ar'
              ? 'تفضل بزيارة أقرب فرع لمطعم مو بيتزا في وهران، باتنة، العاصمة، ومستغانم!'
              : 'Dégustez sur place, emportez ou appelez directement votre agence la plus proche.'}
          </p>
        </div>

        <div className="md:hidden flex justify-center items-center mb-6 text-mo-yellow font-mono text-xs uppercase gap-1">
          {isRtl ? 'اسحب الفروع' : 'SWIPE LOCATIONS'}
          {isRtl ? <ChevronsLeft className="w-3.5 h-3.5" /> : <ChevronsRight className="w-3.5 h-3.5" />}
        </div>

        {/* Master Locations Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 rounded-[2.5rem] bg-[#251209] border-2 border-mo-yellow/25 p-4 sm:p-6 md:p-8 shadow-2xl">
          {/* Branch List */}
          <div className="md:w-5/12 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible hide-scrollbar gap-3 pb-2 md:pb-0 snap-x snap-mandatory">
            {branches.map((b) => {
              const isSelected = selectedBranch.id === b.id;
              return (
                <div
                  key={b.id}
                  className={`p-4 sm:p-5 rounded-2xl flex flex-col justify-between transition-all border shrink-0 snap-start w-64 md:w-auto ${
                    isSelected
                      ? 'bg-[#34180C] border-2 border-mo-orange shadow-[0_4px_25px_rgba(237,115,45,0.3)]'
                      : 'bg-[#1A0A04] border-mo-yellow/15 hover:border-mo-yellow/35 text-white/80'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedBranch(b)}
                    className="w-full text-start flex flex-col gap-1 focus-visible:outline-hidden cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={18}
                          className={isSelected ? 'text-mo-orange' : 'text-mo-yellow/60'}
                          aria-hidden="true"
                        />
                        <h3 className="font-display uppercase text-2xl tracking-wide text-[#FDFCF7]">
                          {b.city}
                        </h3>
                      </div>
                      <span
                        className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold ${
                          isSelected
                            ? 'bg-mo-orange text-white'
                            : 'bg-mo-yellow/15 text-mo-yellow border border-mo-yellow/25'
                        }`}
                      >
                        {b.sub}
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/10">
                    <a
                      href={`tel:${b.phone.replace(/\s+/g, '')}`}
                      className={`inline-flex items-center gap-2 font-mono text-xs font-black px-3.5 py-2 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-mo-orange text-white hover:bg-mo-yellow hover:text-black shadow-md'
                          : 'bg-white/10 text-white/90 hover:bg-mo-orange hover:text-white'
                      }`}
                      dir="ltr"
                    >
                      <Phone size={13} aria-hidden="true" />
                      <span>{b.phone}</span>
                    </a>

                    <a
                      href={b.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-mo-yellow hover:text-black text-white/80 transition-colors"
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
          <div className="md:w-7/12 h-[340px] sm:h-[420px] md:h-auto min-h-[340px] md:min-h-[480px] rounded-2xl overflow-hidden relative border-2 border-mo-yellow/20 bg-[#150702]">
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
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-mo-orange hover:bg-mo-yellow text-white hover:text-black font-sans font-black uppercase text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-2xl transition-all flex items-center gap-2"
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
