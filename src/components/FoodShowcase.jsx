import React, { useContext, useRef, useEffect } from 'react';
import { motion, useInView as framerMotionUseInView } from 'framer-motion';
import { LangContext } from './App.jsx';
import { locales } from './locales.js';

const LazyVideo = ({ src, videoClassName, ...props }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = framerMotionUseInView(ref, { once: true, margin: '600px' });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
    }
    if (isInView && videoRef.current && props.autoPlay) {
      videoRef.current.play().catch((e) => console.warn('Autoplay prevented:', e));
    }
  }, [isInView, props.autoPlay]);

  return (
    <div ref={ref} className="absolute inset-0 w-full h-full bg-black">
      {isInView && (
        <video
          ref={videoRef}
          src={src}
          className={`w-full h-full ${videoClassName}`}
          {...props}
        />
      )}
    </div>
  );
};

export const FoodShowcase = () => {
  const lang = useContext(LangContext);
  const isRtl = lang === 'ar';
  const t = locales[lang].gallery;

  const items = [
    { type: 'image', src: '/images/Best/gallery-1.webp', col: 'col-span-2 md:col-span-8', height: 'h-[220px] md:h-[500px]' },
    { type: 'video', src: '/vids/gallery_vid_1.mp4', col: 'col-span-1 md:col-span-4', height: 'h-[160px] md:h-[500px]' },
    { type: 'image', src: '/images/Best/gallery-4.webp', col: 'col-span-1 md:col-span-4', height: 'h-[160px] md:h-[380px]' },
    { type: 'image', src: '/images/Best/gallery-7.webp', col: 'col-span-2 md:col-span-4', height: 'h-[220px] md:h-[380px]' },
    { type: 'video', src: '/vids/gallery_vid_2.mp4', col: 'col-span-1 md:col-span-4', height: 'h-[160px] md:h-[380px]' },
    { type: 'image', src: '/images/Best/gallery-9.webp', col: 'col-span-1 md:col-span-5', height: 'h-[160px] md:h-[500px]' },
    { type: 'video', src: '/vids/gallery_vid_4.mp4', col: 'col-span-2 md:col-span-7', height: 'h-[220px] md:h-[500px]' }
  ];

  return (
    <section
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0A0A0C] border-b border-white/10 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-mo-orange block mb-3">
            [ VISUAL EXPERIENCE ]
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-white">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 sm:gap-4 md:gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl sm:rounded-3xl overflow-hidden relative border border-white/10 group shadow-lg bg-[#14141A] ${item.col} ${item.height}`}
            >
              {item.type === 'video' && (
                <LazyVideo
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  videoClassName="absolute inset-0 object-cover object-[center_60%] group-hover:scale-105 transition-transform duration-700"
                />
              )}
              {item.type === 'image' && (
                <img
                  src={item.src}
                  alt={`MO PIZZA craft ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width="600"
                  height="480"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
