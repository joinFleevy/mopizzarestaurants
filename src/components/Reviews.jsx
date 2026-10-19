import React, { useContext, useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useInView as framerMotionUseInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';

export const Reviews = () => {
  const shouldReduceMotion = useReducedMotion();
  const lang = useContext(LangContext);
  const isRtl = lang === 'ar';
  const t = locales[lang];

  const allReviews = t.reviewsList || [];
  const marqueeReviews = [...allReviews, ...allReviews, ...allReviews];

  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = framerMotionUseInView(sectionRef, { margin: '200px' });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let cachedScrollWidth = 0;

    const scroll = () => {
      if (scrollRef.current && !isHovered && !isDragging && !shouldReduceMotion) {
        if (!cachedScrollWidth) cachedScrollWidth = scrollRef.current.scrollWidth;

        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= cachedScrollWidth / 3) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      if (isInView) {
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    if (isInView) {
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
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onTouchStart = () => setIsDragging(true);
  const onTouchEnd = () => setIsDragging(false);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#0E0E12] border-b border-white/10 overflow-hidden flex flex-col relative"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="text-center mb-16 md:mb-20 px-4">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-mo-yellow block mb-3">
          [ COMMUNITY VOICES ]
        </span>
        <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-white">
          {lang === 'ar' ? 'ماذا يقولون عنا' : lang === 'fr' ? "Ce qu'ils disent de nous" : 'What they say about us'}
        </h2>
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
                className="w-72 sm:w-88 md:w-96 p-7 sm:p-8 rounded-[2rem] flex flex-col justify-between shrink-0 h-[21rem] sm:h-[23rem] relative overflow-hidden bg-[#14141A] border border-white/10 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-mo-yellow gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={18}
                          fill={idx < r.rating ? 'currentColor' : 'transparent'}
                          className={idx < r.rating ? '' : 'text-white/20'}
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-white/10" aria-hidden="true" />
                  </div>

                  <p className="text-base sm:text-lg font-normal text-white/80 leading-relaxed line-clamp-5">
                    "{r.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-mo-orange font-bold">
                    {r.author}
                  </span>
                  <span className="text-[11px] font-mono text-white/40 uppercase">
                    VERIFIED GUEST
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
