import React from 'react';
import { PhoneCall, Sparkles, Flame, Star, Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext.jsx';

export const MenuItem = ({ item, isVip, t, isRtl, lang = 'fr', onSelect, viewMode = 'grid' }) => {
  const { getItemQuantity, addToCart, updateQuantity } = useCart();
  const quantity = getItemQuantity(item.id);
  const itemDesc =
    (lang === 'ar' && item.desc_ar) ||
    (lang === 'en' && item.desc_en) ||
    item.desc;

  const badgeType = item.badge;
  const badgeLabel = badgeType ? t.badges?.[badgeType] : null;
  const isMoradPick = badgeType === 'moradPick';
  const badgeStyle = isMoradPick
    ? 'bg-black text-mo-yellow'
    : isVip
    ? 'bg-mo-orange text-black'
    : 'bg-black text-mo-yellow';

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

  // --- LIST MODE: Compact Horizontal Row ---
  if (viewMode === 'list') {
    return (
      <article
        data-menu-item={item.id}
        data-menu-badge={badgeType || ''}
        className={`relative flex items-center justify-between p-2.5 sm:p-3.5 rounded-2xl border-2 border-black transition-all duration-200 ${
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
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-black bg-black shrink-0">
            <img
              src={item.image || '/images/menu/margarita.webp'}
              alt={item.name}
              loading="lazy"
              width="64"
              height="64"
              className="w-full h-full object-cover"
            />
            {isVip && (
              <span className="absolute bottom-0 inset-x-0 bg-mo-orange text-black text-[11px] leading-tight py-1 font-mono font-black text-center uppercase tracking-tighter">
                VIP
              </span>
            )}
          </div>

          {/* Details */}
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-display uppercase text-base sm:text-xl text-[#111111] truncate leading-tight hover:text-mo-orange transition-colors">
                {item.name}
              </h4>
              <span className="font-mono text-xs font-black text-black bg-mo-yellow px-2 py-1 rounded border border-black shrink-0" dir="ltr">
                {item.price}
              </span>
              {badgeLabel && (
                <span
                  data-menu-badge-pill={badgeType}
                  className={`hidden sm:inline-flex items-center gap-1 font-mono text-[11px] font-black uppercase px-2 py-1 rounded border border-black shrink-0 ${badgeStyle}`}
                >
                  {isMoradPick ? (
                    <Star className="w-3 h-3 fill-current shrink-0" aria-hidden="true" />
                  ) : (
                    <Flame className="w-3 h-3 shrink-0" aria-hidden="true" />
                  )}
                  <span>{badgeLabel}</span>
                </span>
              )}
            </div>
            <p className="text-xs text-[#555555] line-clamp-1 mt-0.5 font-normal">
              {itemDesc}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
          {quantity > 0 ? (
            <div className="flex items-center bg-white border-2 border-black rounded-xl p-0.5">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-11 h-11 rounded-lg bg-[#FFFDF5] hover:bg-black hover:text-white text-black border border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-black text-xs sm:text-sm px-2 text-black">{quantity}</span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-11 h-11 rounded-lg bg-mo-orange hover:bg-mo-yellow text-black border border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="min-w-[44px] min-h-[44px] px-3 sm:px-4 font-sans font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-xl border-2 border-black active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer bg-mo-orange text-black hover:bg-mo-yellow whitespace-nowrap"
            >
              <Plus className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
              <span className="hidden sm:inline">{t.addShort || 'Ajouter'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onSelect(item)}
            title={t.callToOrder || 'Commander'}
            aria-label={`${t.callToOrder || 'Commander'} ${item.name}`}
            className="w-11 h-11 flex items-center justify-center bg-white hover:bg-mo-yellow text-black border-2 border-black rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-black" aria-hidden="true" />
          </button>
        </div>
      </article>
    );
  }

  // --- GRID MODE: Edge-to-Edge Full-Bleed Appetite Photography Cards ---
  return (
    <article
      data-menu-item={item.id}
      data-menu-badge={badgeType || ''}
      className={`relative group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-black transition-all duration-200 ${
        isVip
          ? 'bg-[#FFF9E6] shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000]'
          : 'bg-white shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000]'
      }`}
    >
      {/* Full-bleed Food Photo Frame */}
      <div
        onClick={() => onSelect(item)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-black border-b-2 border-black cursor-pointer"
      >
        <img
          src={item.image || '/images/menu/margarita.webp'}
          alt={item.name}
          loading="lazy"
          width="800"
          height="600"
          className="w-full h-full object-cover object-center"
        />

        {/* Floating Price Pill (crisp border, no shadow noise) */}
        <span
          data-price-pill="true"
          dir="ltr"
          className="absolute top-2 end-2 sm:top-3 sm:end-3 z-10 font-mono text-[11px] sm:text-sm font-black tracking-wider px-2.5 sm:px-3 py-1 rounded-full border-2 border-black bg-mo-yellow text-black"
        >
          {item.price}
        </span>

        {/* Signature VIP Pill */}
        {isVip && (
          <span
            data-vip-pill="true"
            className="absolute bottom-2 start-2 sm:bottom-3 sm:start-3 z-10 inline-flex items-center gap-1 text-[11px] font-mono font-black uppercase bg-mo-orange text-black px-2 sm:px-2.5 py-1 rounded-full border-2 border-black"
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current text-black" aria-hidden="true" />
            <span>VIP</span>
          </span>
        )}
      </div>

      {/* Card Body & Action Row */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Menu Engineering Badge */}
          {badgeLabel && (
            <div className="mb-1.5 flex items-center">
              <span
                data-menu-badge-pill={badgeType}
                className={`inline-flex items-center gap-1 text-[11px] font-mono font-black uppercase px-2 sm:px-2.5 py-1 rounded-full border border-black whitespace-nowrap ${badgeStyle}`}
              >
                {isMoradPick ? (
                  <Star className="w-3 h-3 fill-current shrink-0" aria-hidden="true" />
                ) : (
                  <Flame className="w-3 h-3 shrink-0" aria-hidden="true" />
                )}
                <span>{badgeLabel}</span>
              </span>
            </div>
          )}

          {/* Header: Name */}
          <div className="mb-1 sm:mb-1.5">
            <h4
              onClick={() => onSelect(item)}
              className="text-lg sm:text-2xl font-display uppercase tracking-wider text-[#111111] group-hover:text-mo-orange transition-colors cursor-pointer leading-tight truncate"
            >
              {item.name}
            </h4>
          </div>

          {/* Ingredients description */}
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-normal text-[#444444] leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-3">
              {itemDesc}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t-2 border-black/10">
          {quantity > 0 ? (
            /* Active Quantity Stepper */
            <div className="flex items-center justify-between w-full bg-white border-2 border-black rounded-xl p-0.5 sm:p-1">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-10 min-[360px]:w-11 h-11 rounded-lg bg-[#FFFDF5] hover:bg-black hover:text-white text-black border-2 border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer"
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
                className="w-10 min-[360px]:w-11 h-11 rounded-lg bg-mo-orange hover:bg-mo-yellow text-black border-2 border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            /* Crisp 1-Line Add Button + Direct Single Item Call */
            <>
              <button
                type="button"
                data-menu-add-btn={item.id}
                onClick={handleAdd}
                className="flex-1 min-h-[44px] min-w-0 leading-none py-2 sm:py-2.5 px-2.5 sm:px-3.5 font-sans font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-xl border-2 border-black active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer bg-mo-orange text-black hover:bg-mo-yellow whitespace-nowrap"
              >
                <Plus className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
                <span>{t.addShort || 'Ajouter'}</span>
              </button>

              <button
                type="button"
                onClick={() => onSelect(item)}
                title={t.callToOrder || 'Commander'}
                aria-label={`${t.callToOrder || 'Commander'} ${item.name}`}
                className="w-11 h-11 flex items-center justify-center bg-white hover:bg-mo-yellow text-black border-2 border-black rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};
