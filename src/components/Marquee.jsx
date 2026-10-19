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
      className="w-full bg-[#121215] border-y border-white/10 py-3.5 sm:py-4 overflow-hidden flex items-center justify-center cursor-default z-20 select-none"
      aria-hidden="true"
      dir="ltr"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        animate={shouldReduceMotion || isPaused ? { x: 0 } : { x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
        className="flex whitespace-nowrap items-center will-change-transform"
      >
        <span className="text-sm sm:text-lg font-mono uppercase tracking-[0.25em] text-white/90 mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-lg font-mono uppercase tracking-[0.25em] text-mo-orange mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-lg font-mono uppercase tracking-[0.25em] text-white/90 mx-6">
          {cleanText}
        </span>
        <span className="text-sm sm:text-lg font-mono uppercase tracking-[0.25em] text-mo-orange mx-6">
          {cleanText}
        </span>
      </motion.div>
    </div>
  );
};
