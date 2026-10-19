import React from 'react';
import { PhoneCall, Sparkles } from 'lucide-react';

export const MenuItem = ({ item, isVip, t, isRtl, onSelect }) => {
  return (
    <article
      className={`relative group flex flex-col justify-between p-6 sm:p-7 rounded-[1.75rem] transition-all duration-300 ${
        isVip
          ? 'bg-gradient-to-b from-[#18181F] to-[#0E0E12] border border-mo-yellow/30 shadow-[0_4px_30px_rgba(255,184,0,0.08)] hover:border-mo-yellow/60'
          : 'bg-[#121216] border border-white/10 hover:border-white/25 shadow-lg hover:shadow-2xl'
      } hover:-translate-y-1`}
    >
      <div>
        {/* Top row: Name & Price Tag */}
        <div className="flex justify-between items-start gap-3 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-white group-hover:text-mo-orange transition-colors">
              {item.name}
            </h4>
            {isVip && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase bg-mo-yellow/15 text-mo-yellow px-2.5 py-0.5 rounded-full border border-mo-yellow/30">
                <Sparkles className="w-3 h-3" aria-hidden="true" /> VIP
              </span>
            )}
          </div>

          <span
            className={`font-mono text-sm sm:text-base font-bold whitespace-nowrap px-3 py-1 rounded-full ${
              isVip
                ? 'bg-mo-yellow/20 text-mo-yellow border border-mo-yellow/40'
                : 'bg-white/10 text-white border border-white/15'
            }`}
          >
            {item.price}
          </span>
        </div>

        {/* Ingredients description */}
        <p className="text-sm sm:text-base font-normal text-white/70 leading-relaxed mb-6">
          <span className="text-white/40 uppercase text-xs tracking-wider font-mono block mb-1">
            {t.ingredients}
          </span>
          {item.desc}
        </p>
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
