import React from 'react';
import { PhoneCall, Sparkles, Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext.jsx';

export const MenuItem = ({ item, isVip, t, isRtl, onSelect, viewMode = 'grid' }) => {
  const { getItemQuantity, addToCart, updateQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, -1);
  };

  // --- LIST MODE: Compact 72px Horizontal Row ---
  if (viewMode === 'list') {
    return (
      <article
        className={`relative flex items-center justify-between p-2.5 sm:p-3.5 rounded-2xl border-2 sm:border-3 border-black transition-all duration-200 ${
          isVip
            ? 'bg-[#FFF9E6] shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000]'
            : 'bg-white shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000]'
        }`}
      >
        <div
          className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 cursor-pointer select-none"
          onClick={() => onSelect(item)}
        >
          {/* Compact Thumbnail */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-black bg-black shrink-0 shadow-sm">
            <img
              src={item.image || '/images/menu/margarita.webp'}
              alt={item.name}
              loading="lazy"
              width="64"
              height="64"
              className="w-full h-full object-cover"
            />
            {isVip && (
              <span className="absolute bottom-0 inset-x-0 bg-mo-orange text-black text-[9px] font-mono font-black text-center uppercase tracking-tighter">
                VIP
              </span>
            )}
          </div>

          {/* Details */}
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <h4 className="font-display uppercase text-base sm:text-xl text-[#111111] truncate leading-tight hover:text-mo-orange transition-colors">
                {item.name}
              </h4>
              <span className="font-mono text-xs font-black text-black bg-mo-yellow px-2 py-0.5 rounded border border-black shrink-0">
                {item.price}
              </span>
            </div>
            <p className="text-xs text-[#555555] line-clamp-1 mt-0.5 font-normal">
              {item.desc}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
          {quantity > 0 ? (
            <div className="flex items-center bg-white border-2 border-black rounded-xl p-0.5 shadow-[1px_1px_0px_#000]">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-8 h-8 rounded-lg bg-[#FFFDF5] hover:bg-black hover:text-white text-black border border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-black text-xs sm:text-sm px-2 text-black">{quantity}</span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-8 h-8 rounded-lg bg-mo-orange hover:bg-mo-yellow text-black border border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer shadow-[1px_1px_0px_#000]"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="h-9 sm:h-10 px-3 sm:px-4 font-sans font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer bg-mo-orange text-black hover:bg-mo-yellow"
            >
              <Plus className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
              <span className="hidden sm:inline">{t.addToOrder || 'Ajouter'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onSelect(item)}
            title={t.callToOrder || 'Commander'}
            aria-label={`${t.callToOrder || 'Commander'} ${item.name}`}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white hover:bg-mo-yellow text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-black" aria-hidden="true" />
          </button>
        </div>
      </article>
    );
  }

  // --- GRID MODE: Visual Cards (Responsive 2-column mobile + 3/4 desktop) ---
  return (
    <article
      className={`relative group flex flex-col justify-between p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-black transition-all duration-200 ${
        isVip
          ? 'bg-[#FFF9E6] shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000]'
          : 'bg-white shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000]'
      }`}
    >
      <div>
        {/* Visual Media Frame */}
        <div
          onClick={() => onSelect(item)}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-4 bg-black border-2 border-black cursor-pointer shadow-inner"
        >
          <img
            src={item.image || '/images/menu/margarita.webp'}
            alt={item.name}
            loading="lazy"
            width="800"
            height="600"
            className="w-full h-full object-cover object-center"
          />

          {/* Floating Price Pill */}
          <span className="absolute top-2 end-2 sm:top-3 sm:end-3 z-10 font-mono text-[11px] sm:text-sm font-black tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border-2 border-black bg-mo-yellow text-black shadow-[2px_2px_0px_#000]">
            {item.price}
          </span>

          {/* Signature Badge */}
          {isVip && (
            <span className="absolute top-2 start-2 sm:top-3 sm:start-3 z-10 inline-flex items-center gap-1 text-[9px] sm:text-[11px] font-mono font-black uppercase bg-mo-orange text-black px-2 sm:px-2.5 py-0.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current text-black" aria-hidden="true" />
              <span>VIP</span>
            </span>
          )}
        </div>

        {/* Header: Name */}
        <div className="mb-1.5 sm:mb-2">
          <h4
            onClick={() => onSelect(item)}
            className="text-lg sm:text-2xl lg:text-3xl font-display uppercase tracking-wider text-[#111111] group-hover:text-mo-orange transition-colors cursor-pointer leading-tight truncate"
          >
            {item.name}
          </h4>
        </div>

        {/* Ingredients description */}
        <div className="mb-3 sm:mb-5">
          <p className="text-xs sm:text-sm font-normal text-[#444444] leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-3">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t-2 border-black/10">
        {quantity > 0 ? (
          /* Active Quantity Stepper */
          <div className="flex items-center justify-between w-full bg-white border-2 border-black rounded-xl p-0.5 sm:p-1 shadow-[2px_2px_0px_#000]">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#FFFDF5] hover:bg-black hover:text-white text-black border-2 border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div className="flex items-center gap-1 px-1.5 sm:px-3">
              <span className="font-mono font-black text-xs sm:text-base text-black">{quantity}</span>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-mo-orange hover:bg-mo-yellow text-black border-2 border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer shadow-[1px_1px_0px_#000]"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        ) : (
          /* Default Add Button + Direct Single Item Call */
          <>
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-2 sm:py-3 px-2 sm:px-3.5 font-sans font-black text-[11px] sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer bg-mo-orange text-black hover:bg-mo-yellow"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-black" aria-hidden="true" />
              <span>{t.addToOrder || 'Ajouter'}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelect(item)}
              title={t.callToOrder || 'Commander'}
              aria-label={`${t.callToOrder || 'Commander'} ${item.name}`}
              className="p-2 sm:p-3 bg-white hover:bg-mo-yellow text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </article>
  );
};
