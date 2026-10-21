import React from 'react';
import { PhoneCall, Sparkles, Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext.jsx';

export const MenuItem = ({ item, isVip, t, isRtl, onSelect }) => {
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

  return (
    <article
      className={`relative group flex flex-col justify-between p-4 sm:p-5 rounded-3xl border-3 border-black transition-all duration-200 ${
        isVip
          ? 'bg-[#FFF9E6] shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000]'
          : 'bg-white shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000]'
      }`}
    >
      <div>
        {/* Visual Media Frame */}
        <div
          onClick={() => onSelect(item)}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-4 bg-black border-2 border-black cursor-pointer shadow-inner"
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
          <span className="absolute top-3 end-3 z-10 font-mono text-xs sm:text-sm font-black tracking-wider px-3 py-1 rounded-full border-2 border-black bg-mo-yellow text-black shadow-[2px_2px_0px_#000]">
            {item.price}
          </span>

          {/* Signature Badge */}
          {isVip && (
            <span className="absolute top-3 start-3 z-10 inline-flex items-center gap-1 text-[11px] font-mono font-black uppercase bg-mo-orange text-black px-2.5 py-0.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-3 h-3 fill-current text-black" aria-hidden="true" />
              <span>SIGNATURE</span>
            </span>
          )}
        </div>

        {/* Header: Name */}
        <div className="mb-2">
          <h4
            onClick={() => onSelect(item)}
            className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-[#111111] group-hover:text-mo-orange transition-colors cursor-pointer"
          >
            {item.name}
          </h4>
        </div>

        {/* Ingredients description */}
        <div className="mb-5">
          <p className="text-sm font-normal text-[#333333] leading-relaxed line-clamp-3">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 pt-3 border-t-2 border-black/10">
        {quantity > 0 ? (
          /* Active Quantity Stepper */
          <div className="flex items-center justify-between w-full bg-white border-2 border-black rounded-xl p-1 shadow-[2px_2px_0px_#000]">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-10 h-10 rounded-lg bg-[#FFFDF5] hover:bg-black hover:text-white text-black border-2 border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-3">
              <span className="font-mono font-black text-base text-black">{quantity}</span>
              <span className="text-[11px] font-mono font-bold uppercase text-black/60">
                {t.items || 'in tray'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              className="w-10 h-10 rounded-lg bg-mo-orange hover:bg-mo-yellow text-black border-2 border-black flex items-center justify-center transition-colors active:scale-90 font-black cursor-pointer shadow-[1px_1px_0px_#000]"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Default Add Button + Direct Single Item Call */
          <>
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 px-3.5 font-sans font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer bg-mo-orange text-black hover:bg-mo-yellow"
            >
              <Plus className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
              <span>{t.addToOrder || 'Ajouter'}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelect(item)}
              title={t.callToOrder || 'Commander'}
              aria-label={`${t.callToOrder || 'Commander'} ${item.name}`}
              className="p-3 bg-white hover:bg-mo-yellow text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-black" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </article>
  );
};
