import React from 'react';
import { PhoneCall, Sparkles } from 'lucide-react';

export const MenuItem = ({ item, isVip, t, isRtl, onSelect }) => {
  return (
    <article
      className={`relative group flex flex-col justify-between p-4 sm:p-5 rounded-[1.75rem] transition-all duration-300 ${
        isVip
          ? 'bg-gradient-to-b from-[#18181F] to-[#0E0E12] border border-mo-yellow/30 shadow-[0_4px_30px_rgba(255,184,0,0.08)] hover:border-mo-yellow/60'
          : 'bg-[#121216] border border-white/10 hover:border-white/25 shadow-lg hover:shadow-2xl'
      } hover:-translate-y-1`}
    >
      <div>
        {/* Visual Media Frame */}
        <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl mb-4 bg-[#181820] border border-white/10 group-hover:border-white/20 transition-all shadow-inner">
          <img
            src={item.image || '/images/menu/margarita.webp'}
            alt={item.name}
            loading="lazy"
            width="800"
            height="600"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Floating Price Pill */}
          <span
            className={`absolute top-3 end-3 z-10 font-mono text-xs sm:text-sm font-bold tracking-wider px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${
              isVip
                ? 'bg-black/80 text-mo-yellow border border-mo-yellow/50'
                : 'bg-black/75 text-white border border-white/20'
            }`}
          >
            {item.price}
          </span>

          {/* VIP Badge */}
          {isVip && (
            <span className="absolute top-3 start-3 z-10 inline-flex items-center gap-1 text-[11px] font-mono font-black uppercase bg-mo-yellow text-black px-2.5 py-0.5 rounded-full shadow-[0_2px_12px_rgba(255,184,0,0.4)]">
              <Sparkles className="w-3 h-3 fill-current" aria-hidden="true" />
              <span>VIP VAULT</span>
            </span>
          )}

          {/* Subtle Bottom Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Header: Name */}
        <div className="mb-2.5">
          <h4 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-white group-hover:text-mo-orange transition-colors">
            {item.name}
          </h4>
        </div>

        {/* Ingredients description */}
        <div className="mb-5">
          <span className="text-white/40 uppercase text-[11px] tracking-wider font-mono block mb-1">
            {t.ingredients}
          </span>
          <p className="text-sm font-normal text-white/70 leading-relaxed line-clamp-3">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Streetwear Capsule CTA */}
      <button
        type="button"
        onClick={() => onSelect(item)}
        className={`w-full py-3 px-4 font-sans font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl transition-all active:scale-98 ${
          isVip
            ? 'bg-mo-yellow text-black hover:bg-white shadow-[0_2px_15px_rgba(255,184,0,0.25)]'
            : 'bg-white/10 hover:bg-mo-orange text-white border border-white/15 hover:border-transparent'
        }`}
      >
        <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{t.callToOrder || 'Call to Order'}</span>
      </button>
    </article>
  );
};
