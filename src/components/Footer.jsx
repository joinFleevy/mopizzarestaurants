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
      className="bg-[#050507] text-white py-24 sm:py-32 px-6 flex flex-col items-center justify-center overflow-hidden relative pb-28 md:pb-28"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="text-center mb-10 z-10">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 block mb-2">
          THE CULTURE • THE CRAFT • THE SLICE
        </span>
      </div>

      <p className="text-[17vw] sm:text-[15vw] leading-none font-display tracking-tight uppercase whitespace-nowrap mb-12 text-center text-white/90 drop-shadow-2xl select-none cursor-default z-10">
        {t.brand}
      </p>

      <a
        aria-label="Follow MO PIZZA on Instagram"
        href="https://www.instagram.com/mopizza.off"
        target="_blank"
        rel="noopener noreferrer"
        className="text-base sm:text-lg font-sans font-bold text-black bg-white hover:bg-mo-orange hover:text-white flex items-center gap-3 rounded-full px-8 py-4 transition-all shadow-xl active:scale-95 z-10"
      >
        <InstagramIcon size={22} />
        <span>{t.follow}</span>
      </a>

      <div className="mt-16 text-xs font-mono text-white/40 uppercase tracking-widest z-10 text-center">
        © {new Date().getFullYear()} MO PIZZA • ALL RIGHTS RESERVED • MORAD OUDIA
      </div>
    </footer>
  );
};
