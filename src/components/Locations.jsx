import React, { useState, useContext, useRef, useEffect } from 'react';
import { MapPin, Phone, Copy, Check, ArrowUpRight } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';
import branchesInfo from '../data/branches_info.json';
import { getBranchStatus } from '../utils/businessHours.js';
import { copyTextToClipboard } from '../utils/clipboard.js';
import { trackEvent } from '../utils/analytics.js';

export const Locations = ({ preferredBranchId, onSelectBranch }) => {
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

  const selectedBranch = branches.find((b) => b.id === preferredBranchId) || branches[0];
  const [copiedId, setCopiedId] = useState(null);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(copyTimeoutRef.current);
  }, []);

  const handleCopyPhone = async (e, branchId, phone) => {
    e.stopPropagation();
    onSelectBranch?.(branchId);
    trackEvent('branch_copy_phone', { branch: branchId, source: 'locations' });
    const ok = await copyTextToClipboard(phone);
    if (!ok) return;
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    setCopiedId(branchId);
    copyTimeoutRef.current = setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section
      id="locations"
      className="scroll-mt-[76px] sm:scroll-mt-[84px] py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-[#FFFDF5] border-b-3 border-black relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#111111] mb-4">
            {t.title}
          </h2>
          <p className="text-[#333333] text-sm sm:text-base font-medium max-w-md mx-auto">
            {t.subtitle}
          </p>
          <div className="mt-3.5 inline-flex flex-wrap items-center justify-center gap-2">
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${
                isOpen ? 'bg-emerald-300 text-black' : 'bg-rose-200 text-black'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full border border-black ${isOpen ? 'bg-emerald-700' : 'bg-rose-600'}`}
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
              const isPreferred = preferredBranchId === b.id;
              return (
                <div
                  key={b.id}
                  data-branch-card={b.id}
                  className={`p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between transition-all border-2 shrink-0 snap-start w-[276px] md:w-auto cursor-pointer ${
                    isSelected
                      ? 'bg-mo-yellow border-black shadow-[3px_3px_0px_#000]'
                      : 'bg-[#FFFDF5] border-black/30 hover:border-black text-black'
                  }`}
                  onClick={() => onSelectBranch?.(b.id)}
                >
                  <div className="w-full text-start flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin
                          size={18}
                          className={isSelected ? 'text-mo-orange shrink-0' : 'text-black shrink-0'}
                          aria-hidden="true"
                        />
                        <h3 className="font-display uppercase text-2xl tracking-wide text-black">
                          {b.city}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {isPreferred && (
                          <span className="bg-black text-mo-yellow text-[11px] font-mono font-black uppercase px-2 py-1 rounded-full border border-black whitespace-nowrap">
                            ★ {t.myBranch || 'Mon Resto'}
                          </span>
                        )}
                        <span
                          className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-full font-black border-2 border-black whitespace-nowrap ${
                            isSelected
                              ? 'bg-mo-orange text-black'
                              : 'bg-white text-black'
                          }`}
                        >
                          {b.sub}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-black/15">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <a
                        href={`tel:${b.phone.replace(/\s+/g, '')}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBranch?.(b.id);
                          trackEvent('branch_call', { branch: b.id, source: 'locations' });
                        }}
                        className="inline-flex items-center gap-1.5 min-h-[44px] font-mono text-xs font-black px-2.5 sm:px-3.5 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] bg-mo-orange text-black hover:bg-white transition-all active:scale-95 whitespace-nowrap"
                        dir="ltr"
                      >
                        <Phone size={13} aria-hidden="true" />
                        <span>{b.phone}</span>
                      </a>

                      <button
                        type="button"
                        data-copy-branch={b.id}
                        onClick={(e) => handleCopyPhone(e, b.id, b.phone)}
                        title={copiedId === b.id ? t.copiedPhone : t.copyPhone}
                        aria-label={`${copiedId === b.id ? t.copiedPhone : t.copyPhone}: ${b.city} (${b.phone})`}
                        className={`relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-all active:scale-95 cursor-pointer shrink-0 ${
                          copiedId === b.id
                            ? 'bg-emerald-300 text-black'
                            : 'bg-white hover:bg-mo-yellow text-black'
                        }`}
                      >
                        {copiedId === b.id ? (
                          <Check size={15} aria-hidden="true" />
                        ) : (
                          <Copy size={15} aria-hidden="true" />
                        )}
                        {copiedId === b.id && (
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap pointer-events-none px-2 py-1 rounded-md border-2 border-black bg-emerald-300 text-black font-mono font-black text-[11px] uppercase shadow-[2px_2px_0px_#000] z-20">
                            {t.copiedPhone}
                          </span>
                        )}
                      </button>
                    </div>

                    <a
                      href={b.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectBranch?.(b.id);
                        trackEvent('branch_directions', { branch: b.id, source: 'locations' });
                      }}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-white hover:bg-mo-orange text-black border-2 border-black shadow-[2px_2px_0px_#000] transition-colors shrink-0"
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
              onClick={() => trackEvent('branch_directions', { branch: selectedBranch.id, source: 'map_cta' })}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 min-h-[44px] bg-mo-orange text-black font-sans font-black uppercase text-xs sm:text-sm px-6 py-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-mo-yellow transition-all flex items-center gap-2 cursor-pointer"
            >
              <MapPin size={16} aria-hidden="true" />
              <span>{t.cta}</span>
            </a>
          </div>
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {copiedId ? t.copiedPhone : ''}
      </span>
    </section>
  );
};
