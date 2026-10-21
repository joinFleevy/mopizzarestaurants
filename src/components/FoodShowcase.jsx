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
    <div ref={ref} className="absolute inset-0 w-full h-full bg-[#150702]">
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
    { type: 'image', src: '/images/menu/mo_pizza.webp', col: 'col-span-1 md:col-span-4', height: 'h-[160px] md:h-[380px]' },
    { type: 'image', src: '/images/Best/gallery-7.webp', col: 'col-span-2 md:col-span-4', height: 'h-[220px] md:h-[380px]' },
    { type: 'video', src: '/vids/gallery_vid_2.mp4', col: 'col-span-1 md:col-span-4', height: 'h-[160px] md:h-[380px]' },
    { type: 'image', src: '/images/menu/vegetariena.webp', col: 'col-span-1 md:col-span-5', height: 'h-[160px] md:h-[500px]' },
    { type: 'video', src: '/vids/gallery_vid_4.mp4', col: 'col-span-2 md:col-span-7', height: 'h-[220px] md:h-[500px]' }
  ];

  return (
    <section
      id="showcase"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#150702] border-b border-mo-yellow/15 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display uppercase tracking-tight text-[#FDFCF7] mb-4">
            {t.title}
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-normal max-w-lg mx-auto">
            {lang === 'ar'
              ? 'عجين فريش يتخمر 48 ساعة، صلصات سرية خاصة بموراد، وأجبان غنية تذوب عند كل قضمة.'
              : 'Pâte fraîche fermentée 48h, sauces secrètes et fromages fondants de Méditerranée.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 sm:gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className={`relative rounded-3xl overflow-hidden border-2 border-mo-yellow/20 shadow-xl group bg-[#251209] ${item.col} ${item.height}`}
            >
              {item.type === 'video' ? (
                <LazyVideo
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  videoClassName="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <img
                  src={item.src}
                  alt={`Mo Pizza ${idx + 1}`}
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}

              {/* Warm gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#150702]/80 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
