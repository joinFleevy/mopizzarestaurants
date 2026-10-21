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
      id="reviews"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#150702] border-b border-mo-yellow/15 overflow-hidden flex flex-col relative"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="text-center mb-16 md:mb-20 px-4">
        <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#FDFCF7] mb-3">
          {t.reviews?.title || (lang === 'ar' ? 'آراء زبائننا' : 'Ce Que Dit La Rue')}
        </h2>
        <p className="text-white/70 text-sm sm:text-base font-normal max-w-md mx-auto">
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
                className="w-72 sm:w-88 md:w-96 p-7 sm:p-8 rounded-[2rem] flex flex-col justify-between shrink-0 h-[21rem] sm:h-[23rem] relative overflow-hidden bg-[#251209] border-2 border-mo-yellow/20 hover:border-mo-yellow/50 transition-all shadow-xl"
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
                    <Quote className="w-8 h-8 text-mo-yellow/20" aria-hidden="true" />
                  </div>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed line-clamp-5 font-normal">
                    "{r.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-mo-yellow/15 flex items-center justify-between">
                  <div>
                    <h4 className="font-display uppercase text-lg text-[#FDFCF7] tracking-wider">
                      {r.author}
                    </h4>
                    <span className="text-[10px] font-mono text-mo-yellow uppercase">
                      CLIENT VÉRIFIÉ • DZ
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-mo-orange/20 border border-mo-orange/40 flex items-center justify-center font-display text-sm text-mo-yellow">
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
