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
      className="py-20 md:py-32 bg-[#FFFDF5] border-b-3 border-black overflow-hidden flex flex-col relative"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#111111] mb-3">
          {t.reviews?.title || (lang === 'ar' ? 'آراء زبائننا' : 'Ce Que Dit La Rue')}
        </h2>
        <p className="text-[#333333] text-sm sm:text-base font-medium max-w-md mx-auto">
          {lang === 'ar' ? 'أصدق الآراء من عشاق مو بيتزا في كل الولايات.' : 'Des avis 100% réels de nos clients à Alger, Oran, Batna et Mostaganem.'}
        </p>
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
                className="w-72 sm:w-88 md:w-96 p-7 sm:p-8 rounded-3xl flex flex-col justify-between shrink-0 h-[21rem] sm:h-[22rem] relative overflow-hidden bg-white border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all"
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

                <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-display uppercase text-lg text-[#111111] tracking-wider">
                      {r.author}
                    </h4>
                    <span className="text-[11px] font-mono text-mo-orange font-black uppercase">
                      CLIENT VÉRIFIÉ • DZ
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-mo-yellow border-2 border-black shadow-[1px_1px_0px_#000] flex items-center justify-center font-display text-sm text-black">
                    MO
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
