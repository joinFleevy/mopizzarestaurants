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
      className="relative min-h-[calc(100svh-65px)] md:min-h-[85vh] flex flex-col md:flex-row items-center border-b-3 border-black overflow-hidden bg-[#FFFDF5]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Left Column: Bold Comic Typography & CTAs */}
      <div className="w-full md:w-7/12 p-6 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center z-10 relative">
        {/* Comic Sticker Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mb-5 inline-flex items-center gap-2 self-start bg-mo-yellow text-black border-2 border-black px-4 py-1.5 rounded-full shadow-[3px_3px_0px_#000] rotate-[-1deg]"
        >
          <Flame className="w-4 h-4 text-mo-orange animate-pulse" aria-hidden="true" />
          <span className="text-xs font-mono font-black uppercase tracking-wider text-black">
            {lang === 'ar' ? 'المطعم الرسمي لمراد أودية • 100% بنة و 100% ضحك' : 'LE RESTO OFFICIEL DE MORAD OUDIA • 100% BENNA'}
          </span>
        </motion.div>

        {/* Massive Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] leading-[0.9] font-display uppercase tracking-tight mb-6 text-[#111111]">
          <motion.span custom={1} initial="hidden" animate="visible" variants={textVariants} className="block">
            {t.title1}
          </motion.span>
          <motion.span custom={2} initial="hidden" animate="visible" variants={textVariants} className="block text-mo-orange drop-shadow-[3px_3px_0px_#000]">
            {t.title2}
          </motion.span>
        </h1>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-base sm:text-lg md:text-xl font-medium text-[#222222] mb-8 sm:mb-10 max-w-xl leading-relaxed whitespace-pre-line"
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
            className="inline-flex items-center justify-center gap-3 bg-mo-orange text-black font-sans font-black text-base sm:text-lg px-8 py-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] uppercase tracking-wider hover:bg-mo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-5 h-5 text-black" aria-hidden="true" />
            <span>{locales[lang].menu?.callToOrder || 'Commander'}</span>
          </button>

          <a
            href="#locations"
            className="inline-flex items-center justify-center gap-2 bg-white text-black border-3 border-black font-sans font-black text-base sm:text-lg px-7 py-4 rounded-2xl shadow-[4px_4px_0px_#000] uppercase tracking-wider hover:bg-mo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all active:scale-95"
          >
            <MapPin className="w-5 h-5 text-mo-orange" aria-hidden="true" />
            <span>{t.cta}</span>
            <ArrowUpRight className="w-4 h-4 text-black" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* Right Column: Video & Mascot Frame */}
      <div className="w-full md:w-5/12 h-[340px] sm:h-[440px] md:h-[580px] relative flex items-center justify-center p-6">
        <div className="relative w-full h-full rounded-3xl overflow-hidden border-3 border-black shadow-[6px_6px_0px_#000] bg-black">
          <motion.video
            ref={videoRef}
            initial={{ scale: shouldReduceMotion ? 1 : 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            src="/vids/very_good_too.mp4"
            poster="/images/hero_poster.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-[center_65%] opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating Mascot Stamp */}
          <motion.div
            initial={{ scale: shouldReduceMotion ? 1 : 0.8, opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 2 }}
            className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl bg-mo-orange border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center overflow-hidden rotate-2"
          >
            <img
              src="/logo.svg"
              alt="Morad Oudia Official Logo"
              className="w-full h-full object-cover"
              loading="eager"
              width="144"
              height="144"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
