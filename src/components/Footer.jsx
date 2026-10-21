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
      className="bg-[#100501] text-[#FDFCF7] py-24 sm:py-32 px-6 flex flex-col items-center justify-center overflow-hidden relative pb-28 md:pb-28 border-t border-mo-yellow/15"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Mascot Emblem in Footer */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#251209] border-2 border-mo-yellow/40 p-2 shadow-2xl mb-8 flex items-center justify-center">
        <img
          src="/logo.svg"
          alt="MO PIZZA Mascot"
          className="w-full h-full object-contain"
          width="80"
          height="80"
        />
      </div>

      <p className="text-[17vw] sm:text-[15vw] leading-none font-display tracking-tight uppercase whitespace-nowrap mb-6 text-center text-[#FDFCF7] drop-shadow-[0_4px_30px_rgba(237,115,45,0.25)] select-none cursor-default z-10">
        {t.brand}
      </p>

      {/* 5 Cities Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 text-xs sm:text-sm font-mono font-bold tracking-widest text-mo-yellow uppercase z-10">
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
        className="text-base sm:text-lg font-sans font-black text-black bg-mo-yellow hover:bg-mo-orange hover:text-white flex items-center gap-3 rounded-full px-8 py-4 transition-all shadow-[0_4px_20px_rgba(244,188,46,0.35)] active:scale-95 z-10"
      >
        <InstagramIcon size={22} />
        <span>{t.follow}</span>
      </a>

      <div className="mt-16 text-xs font-mono text-white/50 uppercase tracking-widest z-10 text-center">
        © {new Date().getFullYear()} MO PIZZA • LE RESTAURANT OFFICIEL DE MORAD OUDIA • 100% بنة و 100% ضحك
      </div>
    </footer>
  );
};
