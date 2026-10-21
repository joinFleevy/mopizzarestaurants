import React, { useEffect, useRef, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PhoneCall, MapPin, ArrowUpRight, Flame } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';

export const Hero = ({ onOpenOrder }) => {
  const shouldReduceMotion = useReducedMotion();
  const lang = useContext(LangContext);
  const t = locales[lang].hero;
  const isRtl = lang === 'ar';

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => console.warn('Hero autoplay prevented:', e));
    }
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section
      className="relative min-h-[calc(100svh-65px)] md:min-h-[90vh] flex flex-col md:flex-row items-center border-b border-mo-yellow/15 overflow-hidden bg-[#150702]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Warm ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-mo-orange/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-mo-yellow/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Left Column: Bold Pop Typography & CTAs */}
      <div className="w-full md:w-7/12 p-6 sm:p-12 md:p-20 flex flex-col justify-center z-10 relative">
        {/* Playful Brand Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mb-5 inline-flex items-center gap-2 self-start bg-gradient-to-r from-mo-orange/20 to-mo-yellow/20 border border-mo-yellow/30 px-3.5 py-1.5 rounded-full"
        >
          <Flame className="w-4 h-4 text-mo-yellow animate-pulse" aria-hidden="true" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-mo-yellow">
            {lang === 'ar' ? 'المطعم الرسمي لمراد أودية • 100% بنة و 100% ضحك' : 'LE RESTO OFFICIEL DE MORAD OUDIA • 100% BENNA'}
          </span>
        </motion.div>

        {/* Massive Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] leading-[0.9] font-display uppercase tracking-tight mb-6 text-[#FDFCF7]">
          <motion.span custom={1} initial="hidden" animate="visible" variants={textVariants} className="block">
            {t.title1}
          </motion.span>
          <motion.span custom={2} initial="hidden" animate="visible" variants={textVariants} className="block text-mo-orange drop-shadow-[0_4px_25px_rgba(237,115,45,0.4)]">
            {t.title2}
          </motion.span>
        </h1>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-base sm:text-lg md:text-xl font-normal text-white/75 mb-10 max-w-xl leading-relaxed whitespace-pre-line"
        >
          {t.subtitle}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center"
        >
          <button
            type="button"
            onClick={onOpenOrder}
            className="inline-flex items-center justify-center gap-3 bg-mo-orange text-white font-sans font-black text-base sm:text-lg px-8 py-4 rounded-full uppercase tracking-wider hover:bg-mo-yellow hover:text-black transition-all shadow-[0_4px_25px_rgba(237,115,45,0.4)] active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-5 h-5 animate-pulse" aria-hidden="true" />
            <span>{locales[lang].menu?.callToOrder || 'Commander'}</span>
          </button>

          <a
            href="#locations"
            className="inline-flex items-center justify-center gap-2 bg-[#251209] hover:bg-white/15 text-[#FDFCF7] border border-mo-yellow/25 font-sans font-bold text-base sm:text-lg px-7 py-4 rounded-full uppercase tracking-wider transition-all active:scale-95"
          >
            <MapPin className="w-5 h-5 text-mo-yellow" aria-hidden="true" />
            <span>{t.cta}</span>
            <ArrowUpRight className="w-4 h-4 opacity-70" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* Right Column: Video & Mascot Frame */}
      <div className="w-full md:w-5/12 h-[360px] sm:h-[460px] md:h-[620px] relative flex items-center justify-center overflow-hidden p-6">
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-mo-yellow/25 shadow-2xl bg-[#150702]">
          <motion.video
            ref={videoRef}
            initial={{ scale: shouldReduceMotion ? 1 : 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src="/vids/very_good_too.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-[center_65%] opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#150702] via-transparent to-transparent opacity-80" />

          {/* Floating Mascot Stamp */}
          <motion.div
            initial={{ scale: shouldReduceMotion ? 1 : 0.8, opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 2 }}
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl p-3 bg-[#1F0E07]/95 backdrop-blur-md border-2 border-mo-yellow/40 shadow-2xl flex items-center justify-center overflow-hidden"
          >
            <img
              src="/logo.svg"
              alt="Morad Oudia Official Logo"
              className="w-full h-full object-contain"
              loading="eager"
              width="180"
              height="180"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
