import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ChevronsRight, ChevronsLeft, ArrowUpRight } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';
import branchesInfo from '../data/branches_info.json';
import { getBranchStatus } from '../utils/businessHours.js';

export const Locations = () => {
  const lang = useContext(LangContext);
  const t = locales[lang].locations;
  const statusLabels = locales[lang].menu?.status || {};
  const isRtl = lang === 'ar';
  const { isOpen } = getBranchStatus();

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
      className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-[#FFFDF5] border-b-3 border-black relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#111111] mb-4">
            {t.title}
          </h2>
          <p className="text-[#333333] text-sm sm:text-base font-medium max-w-md mx-auto">
            {lang === 'ar'
              ? 'تفضل بزيارة أقرب فرع لمطعم مو بيتزا في وهران، باتنة، العاصمة، ومستغانم!'
              : 'Dégustez sur place, emportez ou appelez directement votre agence la plus proche.'}
          </p>
          <div className="mt-3.5 inline-flex flex-wrap items-center justify-center gap-2">
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${
                isOpen ? 'bg-emerald-300 text-black' : 'bg-rose-200 text-black'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-700 animate-pulse' : 'bg-rose-600'}`}
                aria-hidden="true"
              />
              <span>{isOpen ? (statusLabels.open || 'Ouvert Maintenant') : (statusLabels.closed || 'Fermé Actuellement')}</span>
            </span>

            <span className="bg-mo-yellow text-black font-mono font-bold text-xs uppercase px-3.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
              {statusLabels.hours || 'Ouvert 7j/7 • 11h30 – 01h00'}
            </span>
          </div>
        </div>

        {/* Master Locations Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 rounded-3xl bg-white border-3 border-black p-4 sm:p-6 md:p-8 shadow-[6px_6px_0px_#000]">
          {/* Branch List */}
          <div className="md:w-5/12 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible hide-scrollbar gap-3 pb-2 md:pb-0 snap-x snap-mandatory">
            {branches.map((b) => {
              const isSelected = selectedBranch.id === b.id;
              return (
                <div
                  key={b.id}
                  className={`p-4 sm:p-5 rounded-2xl flex flex-col justify-between transition-all border-2 shrink-0 snap-start w-64 md:w-auto cursor-pointer ${
                    isSelected
                      ? 'bg-mo-yellow border-black shadow-[3px_3px_0px_#000]'
                      : 'bg-[#FFFDF5] border-black/30 hover:border-black text-black'
                  }`}
                  onClick={() => setSelectedBranch(b)}
                >
                  <div className="w-full text-start flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={18}
                          className={isSelected ? 'text-mo-orange' : 'text-black'}
                          aria-hidden="true"
                        />
                        <h3 className="font-display uppercase text-2xl tracking-wide text-black">
                          {b.city}
                        </h3>
                      </div>
                      <span
                        className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full font-black border-2 border-black ${
                          isSelected
                            ? 'bg-mo-orange text-black'
                            : 'bg-white text-black'
                        }`}
                      >
                        {b.sub}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-black/15">
                    <a
                      href={`tel:${b.phone.replace(/\s+/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 font-mono text-xs font-black px-3.5 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] bg-mo-orange text-black hover:bg-white transition-all active:scale-95"
                      dir="ltr"
                    >
                      <Phone size={13} aria-hidden="true" />
                      <span>{b.phone}</span>
                    </a>

                    <a
                      href={b.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl bg-white hover:bg-mo-orange text-black border-2 border-black transition-colors"
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
          <div className="md:w-7/12 h-[340px] sm:h-[420px] md:h-auto min-h-[340px] md:min-h-[480px] rounded-2xl overflow-hidden relative border-3 border-black bg-white shadow-[3px_3px_0px_#000]">
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
              className="absolute inset-0 opacity-95"
              title={`Map of ${selectedBranch.city}`}
            />
            <a
              href={selectedBranch.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-mo-orange text-black font-sans font-black uppercase text-xs sm:text-sm px-6 py-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-mo-yellow transition-all flex items-center gap-2 cursor-pointer"
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
