import React, { useContext, useRef, useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';

export const Reviews = () => {
  const lang = useContext(LangContext);
  const isRtl = lang === 'ar';
  const t = locales[lang];

  const allReviews = t.reviewsList || [];
  const marqueeReviews = [...allReviews, ...allReviews, ...allReviews];

  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(media.matches);
    const onChange = (e) => setShouldReduceMotion(e.matches);
    if (media.addEventListener) {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }
    media.addListener?.(onChange);
    return () => media.removeListener?.(onChange);
  }, []);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animationFrameId;
    let cachedScrollWidth = 0;
    let lastTime = performance.now();

    const scroll = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (scrollRef.current && !isHovered && !isDragging && !shouldReduceMotion) {
        if (!cachedScrollWidth) cachedScrollWidth = scrollRef.current.scrollWidth;

        // Smooth speed: 45 pixels per second regardless of monitor refresh rate
        scrollRef.current.scrollLeft += delta * 45;
        if (scrollRef.current.scrollLeft >= cachedScrollWidth / 3) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      if (isInView) {
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    if (isInView && !shouldReduceMotion) {
      animationFrameId = requestAnimationFrame(scroll);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isDragging, shouldReduceMotion, isInView]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const onTouchEnd = () => setIsDragging(false);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="scroll-mt-[76px] sm:scroll-mt-[84px] py-20 md:py-32 bg-[#FFFDF5] border-b-3 border-black overflow-hidden flex flex-col relative"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#111111] mb-3">
          {t.reviews?.title || 'Ce Que Dit La Rue'}
        </h2>
        <p className="text-[#333333] text-sm sm:text-base font-medium max-w-md mx-auto">
          {t.reviews?.subtitle}
        </p>

        {/* Clean 5-Star Social Proof Pill */}
        {t.reviews?.proofPill && (
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 bg-[#FFF8E7] border-2 border-black rounded-full px-4 py-1.5 text-xs font-mono font-black uppercase text-black">
            <span className="inline-flex text-mo-orange gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={13} fill="currentColor" />
              ))}
            </span>
            <span>{t.reviews.proofPill}</span>
          </div>
        )}
      </div>

      <div className="relative w-full z-10 overflow-hidden" dir="ltr">
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className={`flex gap-6 sm:gap-8 px-4 w-full overflow-x-auto hide-scrollbar select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex gap-6 sm:gap-8 w-max shrink-0 py-4 px-2">
            {marqueeReviews.map((r, i) => (
              <div
                key={i}
                dir={isRtl ? 'rtl' : 'ltr'}
                className="w-72 sm:w-88 md:w-96 p-7 sm:p-8 rounded-3xl flex flex-col justify-between shrink-0 h-[21rem] sm:h-[22rem] relative overflow-hidden bg-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-mo-orange gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={18}
                          fill={idx < r.rating ? 'currentColor' : 'transparent'}
                          className={idx < r.rating ? '' : 'text-black/15'}
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-black/10" aria-hidden="true" />
                  </div>
                  <p className="text-[#222222] text-sm sm:text-base leading-relaxed line-clamp-5 font-normal">
                    "{r.text}"
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-black/10">
                  <h3 className="font-display uppercase text-lg text-[#111111] tracking-wider">
                    {r.author}
                  </h3>
                  <span className="text-[11px] font-mono text-mo-orange font-black uppercase">
                    {t.reviews?.verified || 'CLIENT VÉRIFIÉ • DZ'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
