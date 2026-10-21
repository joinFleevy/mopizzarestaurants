import React, { useContext } from 'react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';

const InstagramIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Footer = () => {
  const lang = useContext(LangContext);
  const t = locales[lang].footer;
  const isRtl = lang === 'ar';

  return (
    <footer
      className="bg-[#111111] text-[#FFFDF5] py-20 sm:py-28 px-6 flex flex-col items-center justify-center overflow-hidden relative pb-28 md:pb-28 border-t-3 border-black"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Mascot Emblem in Footer */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-mo-orange border-3 border-black shadow-[4px_4px_0px_#ED732D] mb-6 flex items-center justify-center rotate-2">
        <img
          src="/logo.svg"
          alt="MO PIZZA Mascot"
          className="w-full h-full object-cover"
          width="96"
          height="96"
        />
      </div>

      <p className="text-[17vw] sm:text-[15vw] leading-none font-display tracking-tight uppercase whitespace-nowrap mb-6 text-center text-[#FFFDF5] drop-shadow-[4px_4px_0px_#ED732D] select-none cursor-default z-10">
        {t.brand}
      </p>

      {/* 5 Cities Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 text-xs sm:text-sm font-mono font-black tracking-wider text-mo-yellow uppercase z-10">
        <span>ORAN</span>
        <span>•</span>
        <span>BATNA</span>
        <span>•</span>
        <span>ALGER (KOUBA & SIDI YAHIA)</span>
        <span>•</span>
        <span>MOSTAGANEM</span>
      </div>

      <a
        aria-label="Follow MO PIZZA on Instagram"
        href="https://www.instagram.com/mopizza.off"
        target="_blank"
        rel="noopener noreferrer"
        className="text-base sm:text-lg font-sans font-black text-black bg-mo-orange hover:bg-mo-yellow flex items-center gap-3 rounded-2xl px-8 py-4 border-2 border-black shadow-[4px_4px_0px_#fff] transition-all active:scale-95 z-10"
      >
        <InstagramIcon size={22} />
        <span>{t.follow}</span>
      </a>

      <div className="mt-14 text-xs font-mono text-white/70 uppercase tracking-wider z-10 text-center font-bold">
        © {new Date().getFullYear()} MO PIZZA • LE RESTAURANT OFFICIEL DE MORAD OUDIA • 100% بنة و 100% ضحك
      </div>
    </footer>
  );
};
