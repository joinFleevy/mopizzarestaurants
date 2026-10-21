import React, { useContext, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';

export const Marquee = () => {
  const shouldReduceMotion = useReducedMotion();
  const lang = useContext(LangContext);
  const t = locales[lang].marquee;
  const [isPaused, setIsPaused] = useState(false);

  const cleanText = typeof t === 'string' ? t.replaceAll('🔥', '✦') : t;

  return (
    <div
      className="w-full bg-mo-yellow border-y-3 border-black py-3 sm:py-3.5 overflow-hidden flex items-center justify-center cursor-default z-20 select-none shadow-[inset_0_2px_0px_#fff]"
      aria-hidden="true"
      dir="ltr"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        animate={shouldReduceMotion || isPaused ? { x: 0 } : { x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 34, repeat: Infinity }}
        className="flex whitespace-nowrap items-center will-change-transform"
      >
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-black mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-mo-orange drop-shadow-[1px_1px_0px_#000] mx-6">
          ✦ 100% BENNA ✦
        </span>
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-black mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-mo-orange drop-shadow-[1px_1px_0px_#000] mx-6">
          ✦ 100% BENNA ✦
        </span>
      </motion.div>
    </div>
  );
};
