import React, { useEffect, useRef, useState, useContext } from 'react';
import { Phone, PhoneCall, Utensils, ArrowUpRight, Play, Pause } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';
import branchesInfo from '../data/branches_info.json';
import { getBranchStatus } from '../utils/businessHours.js';
import { trackEvent } from '../utils/analytics.js';

const ORDERED_BRANCH_IDS = ['oran', 'kouba', 'sidiyahia', 'batna', 'mostaganem'];

export const Hero = ({ onOpenOrder, preferredBranchId, onQuickCallBranch }) => {
  const lang = useContext(LangContext);
  const t = locales[lang].hero;
  const locationLabels = locales[lang].locations || {};
  const statusLabels = locales[lang].menu?.status || {};
  const isRtl = lang === 'ar';
  const { isOpen } = getBranchStatus();

  const videoRef = useRef(null);
  const [saveDataMode, setSaveDataMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const conn =
      typeof navigator !== 'undefined'
        ? navigator.connection || navigator.mozConnection || navigator.webkitConnection
        : null;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const isConstrainedNetwork = Boolean(
      conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g'
    );

    if (isConstrainedNetwork || prefersReducedMotion) {
      setSaveDataMode(true);
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      return;
    }

    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying && !video.paused) {
      video.pause();
      setIsPlaying(false);
    } else {
      setSaveDataMode(false);
      setIsPlaying(true);
      if (!video.getAttribute('src')) {
        video.src = '/vids/hero_optimized.mp4';
      }
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch(() => setIsPlaying(false));
    }
  };

  const quickBranches = ORDERED_BRANCH_IDS.map((id) => branchesInfo.find((b) => b.id === id)).filter(Boolean);

  const getBranchChipLabel = (b) => {
    if (b.id === 'kouba' || b.id === 'sidiyahia') {
      return locationLabels.subs?.[b.id] || b.name;
    }
    return locationLabels.cities?.[b.id] || b.city;
  };

  return (
    <section
      className="relative min-h-0 md:min-h-[82vh] flex flex-col md:flex-row items-center border-b-3 border-black overflow-hidden bg-[#FFFDF5]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Left Column: Bold Comic Typography & Direct Call Conversion */}
      <div className="w-full md:w-7/12 px-4 pt-5 pb-4 sm:p-10 md:p-14 lg:p-20 flex flex-col justify-center z-10 relative">
        {/* Crisp Live Status Sticker Badge */}
        <div className="mo-fade-up mb-3.5 sm:mb-5 inline-flex items-center gap-2 self-start bg-mo-yellow text-black border-2 border-black px-3 sm:px-4 py-1.5 rounded-full max-w-full">
          <span
            className={`w-2.5 h-2.5 rounded-full border border-black shrink-0 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}
            aria-hidden="true"
          />
          <span className="text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider text-black">
            {isOpen ? (statusLabels.open || 'Ouvert') : (statusLabels.closed || 'Fermé')} • {t.openStatusBadge}
          </span>
        </div>

        {/* Massive Headline */}
        <h1 className="text-[3.35rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.88] font-display uppercase tracking-tight mb-3 sm:mb-5 text-[#111111]">
          <span className="mo-fade-up block" style={{ animationDelay: '60ms' }}>
            {t.title1}
          </span>
          <span
            className="mo-fade-up block text-mo-orange drop-shadow-[3px_3px_0px_#000]"
            style={{ animationDelay: '120ms' }}
          >
            {t.title2}
          </span>
        </h1>

        <p
          className="mo-fade-up text-sm sm:text-lg md:text-xl font-medium text-[#222222] mb-5 sm:mb-8 max-w-xl leading-relaxed whitespace-pre-line"
          style={{ animationDelay: '160ms' }}
        >
          {t.subtitle}
        </p>

        {/* Action CTAs: Side-by-side on mobile so oven video peeks above the fold */}
        <div
          className="mo-fade-up grid grid-cols-2 sm:flex sm:flex-row gap-2.5 sm:gap-4 items-stretch sm:items-center"
          style={{ animationDelay: '200ms' }}
        >
          <a
            href="#menu"
            data-hero-cta-menu="true"
            onClick={(e) => {
              e.preventDefault();
              trackEvent('hero_cta_click', { target: 'menu' });
              document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 min-h-[52px] sm:min-h-[56px] bg-mo-orange text-black font-sans font-black text-xs sm:text-base md:text-lg px-3 sm:px-8 py-3 sm:py-4 rounded-2xl border-2 sm:border-3 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] uppercase tracking-wider hover:bg-mo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0" aria-hidden="true" />
            <span>{t.ctaMenu}</span>
          </a>

          <button
            type="button"
            data-hero-cta-call="true"
            onClick={() => {
              trackEvent('hero_cta_click', { target: 'call_modal' });
              onOpenOrder();
            }}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[52px] sm:min-h-[56px] bg-white text-black border-2 sm:border-3 border-black font-sans font-black text-xs sm:text-base md:text-lg px-3 sm:px-7 py-3 sm:py-4 rounded-2xl shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] uppercase tracking-wider hover:bg-mo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-mo-orange shrink-0" aria-hidden="true" />
            <span>{t.ctaCall}</span>
            <ArrowUpRight className="w-4 h-4 text-black hidden sm:inline shrink-0" aria-hidden="true" />
          </button>
        </div>

        {/* 1-Tap Quick-Call City Strip */}
        <div
          className="mo-fade-up mt-4 sm:mt-5"
          style={{ animationDelay: '240ms' }}
          data-hero-city-strip="true"
        >
          <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-black/70 mb-1.5">
            {t.quickCallLabel}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {quickBranches.map((b) => {
              const isPreferred = preferredBranchId === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  data-hero-branch={b.id}
                  onClick={() => {
                    trackEvent('hero_city_quick_call', { branch: b.id });
                    onQuickCallBranch?.(b.id);
                  }}
                  className={`min-h-[44px] px-3 py-1.5 rounded-xl border-2 border-black font-mono text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 ${
                    isPreferred
                      ? 'bg-mo-yellow text-black font-black'
                      : 'bg-white text-black font-bold hover:bg-mo-yellow'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-mo-orange shrink-0" aria-hidden="true" />
                  <span>{isPreferred ? `★ ${getBranchChipLabel(b)}` : getBranchChipLabel(b)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Video & Mascot Frame (peeks above the fold on mobile) */}
      <div
        data-hero-video-wrapper="true"
        className="w-full md:w-5/12 h-[260px] sm:h-[400px] md:h-[560px] relative flex items-center justify-center px-4 pb-6 pt-0 md:p-6"
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden border-3 border-black shadow-[6px_6px_0px_#000] bg-black">
          <video
            ref={videoRef}
            src={saveDataMode && !isPlaying ? undefined : '/vids/hero_optimized.mp4'}
            poster="/images/hero_poster.webp"
            autoPlay={!saveDataMode}
            loop
            muted
            playsInline
            preload={saveDataMode && !isPlaying ? 'none' : 'metadata'}
            className="absolute inset-0 w-full h-full object-cover object-[center_42%] opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Subtle Play / Pause Video Toggle */}
          <button
            type="button"
            data-hero-video-toggle="true"
            onClick={toggleVideo}
            aria-label={isPlaying ? t.pauseVideo : t.playVideo}
            title={isPlaying ? t.pauseVideo : t.playVideo}
            className="absolute bottom-5 start-5 sm:bottom-6 sm:start-6 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center bg-black/75 hover:bg-mo-yellow text-white hover:text-black border-2 border-black rounded-xl transition-colors cursor-pointer active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            )}
          </button>

          {/* Floating Mascot Stamp */}
          <div
            data-hero-mascot="true"
            className="absolute bottom-5 end-5 sm:bottom-6 sm:end-6 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl bg-mo-orange border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center overflow-hidden rotate-2 hover:scale-105 hover:rotate-3 transition-transform duration-200"
          >
            <img
              src="/logo.svg"
              alt="Morad Oudia Official Logo"
              className="w-full h-full object-cover"
              loading="eager"
              width="144"
              height="144"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
