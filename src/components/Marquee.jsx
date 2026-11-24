import React, { useContext } from 'react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';

export const Marquee = () => {
  const lang = useContext(LangContext);
  const t = locales[lang].marquee;
  const accent = locales[lang].marqueeAccent || '✦ 100% BENNA ✦';

  const cleanText = typeof t === 'string' ? t.replaceAll('🔥', '✦') : t;

  return (
    <div
      className="group w-full bg-mo-yellow border-y-3 border-black py-3 sm:py-3.5 overflow-hidden flex items-center justify-start cursor-default z-20 select-none shadow-[inset_0_2px_0px_#fff]"
      aria-hidden="true"
      dir="ltr"
    >
      <div className="mo-marquee-track flex whitespace-nowrap items-center group-hover:[animation-play-state:paused]">
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-black mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-mo-orange drop-shadow-[1px_1px_0px_#000] mx-6">
          {accent}
        </span>
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-black mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-mo-orange drop-shadow-[1px_1px_0px_#000] mx-6">
          {accent}
        </span>
      </div>
    </div>
  );
};
