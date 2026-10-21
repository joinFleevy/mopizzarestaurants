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
      className="w-full bg-[#1C0C05] border-y border-mo-yellow/20 py-3.5 sm:py-4 overflow-hidden flex items-center justify-center cursor-default z-20 select-none shadow-inner"
      aria-hidden="true"
      dir="ltr"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        animate={shouldReduceMotion || isPaused ? { x: 0 } : { x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 38, repeat: Infinity }}
        className="flex whitespace-nowrap items-center will-change-transform"
      >
        <span className="text-sm sm:text-base font-mono font-bold uppercase tracking-[0.2em] text-[#FDFCF7] mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-mo-yellow mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-base font-mono font-bold uppercase tracking-[0.2em] text-mo-orange mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-base font-mono font-black uppercase tracking-[0.2em] text-mo-yellow mx-6">
          {cleanText}
        </span>
      </motion.div>
    </div>
  );
};
