import React, { useEffect, useRef, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PhoneCall, MapPin, ArrowUpRight } from 'lucide-react';
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
      className="relative min-h-[calc(100svh-65px)] md:min-h-[90vh] flex flex-col md:flex-row items-center border-b border-white/10 overflow-hidden bg-[#0A0A0C]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mo-orange/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Left Column: Bold Editorial Typography & CTAs */}
      <div className="w-full md:w-7/12 p-6 sm:p-12 md:p-20 flex flex-col justify-center z-10 relative">
        {/* Micro-kicker streetwear tag */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-mo-yellow/90 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-mo-orange animate-ping" />
            THE OFFICIAL MORAD OUDIA RESTAURANT
          </span>
        </motion.div>

        {/* Massive Editorial Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[9.5rem] leading-[0.88] font-display uppercase tracking-tight mb-6 text-white">
          <motion.span custom={1} initial="hidden" animate="visible" variants={textVariants} className="block text-white">
            {t.title1}
          </motion.span>
          <motion.span custom={2} initial="hidden" animate="visible" variants={textVariants} className="block text-mo-orange drop-shadow-[0_0_35px_rgba(255,69,0,0.4)]">
            {t.title2}
          </motion.span>
        </h1>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-base sm:text-lg md:text-xl font-normal text-white/70 mb-10 max-w-xl leading-relaxed whitespace-pre-line"
        >
          {t.subtitle}
        </motion.p>

        {/* Capsule CTAs */}
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
            className="inline-flex items-center justify-center gap-3 bg-mo-orange text-white font-sans font-black text-base sm:text-lg px-8 py-4 rounded-full uppercase tracking-wider hover:bg-white hover:text-black transition-all shadow-[0_4px_30px_rgba(255,69,0,0.35)] active:scale-95"
          >
            <PhoneCall className="w-5 h-5 animate-pulse" aria-hidden="true" />
            <span>{locales[lang].menu?.callToOrder || 'Call to Order'}</span>
          </button>

          <a
            href="#locations"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-sans font-bold text-base sm:text-lg px-7 py-4 rounded-full uppercase tracking-wider transition-all active:scale-95"
          >
            <MapPin className="w-5 h-5 text-mo-yellow" aria-hidden="true" />
            <span>{t.cta}</span>
            <ArrowUpRight className="w-4 h-4 opacity-60" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* Right Column: Video & Floating Streetwear Mascot Badge */}
      <div className="w-full md:w-5/12 h-[340px] sm:h-[450px] md:h-[620px] relative flex items-center justify-center overflow-hidden p-6">
        {/* Rounded video viewport */}
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl bg-black">
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
            className="absolute inset-0 w-full h-full object-cover object-[center_65%] opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-80" />

          {/* Floating Streetwear Mascot Seal */}
          <motion.div
            initial={{ scale: shouldReduceMotion ? 1 : 0.8, opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl p-2.5 bg-[#0D0D10]/90 backdrop-blur-md border border-white/25 shadow-2xl flex items-center justify-center overflow-hidden"
          >
            <img
              src="/images/logo_hq.svg"
              alt="Morad Oudia Official Logo"
              className="w-full h-full object-contain rounded-2xl"
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
