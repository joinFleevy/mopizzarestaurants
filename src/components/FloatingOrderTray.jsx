import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from './CartContext.jsx';

export const FloatingOrderTray = ({ t, isRtl }) => {
  const { totalItems, totalPrice, openCart } = useCart();

  if (totalItems === 0) return null;

  const labels = t.menu || {};

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ y: 60, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="fixed bottom-20 md:bottom-8 left-0 right-0 z-[100] px-3 sm:px-4 pointer-events-none flex justify-center"
        dir={isRtl ? 'rtl' : 'ltr'}
        aria-label={labels.orderTray || 'Order Tray'}
      >
        <button
          type="button"
          onClick={openCart}
          className="pointer-events-auto group max-w-lg w-full bg-[#150702]/95 hover:bg-[#1F0E07] backdrop-blur-xl border-2 border-mo-orange shadow-[0_12px_40px_rgba(237,115,45,0.4)] rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 hover:scale-[1.01] active:scale-98 cursor-pointer overflow-hidden box-border"
        >
          {/* Items badge & summary */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 shrink">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-mo-orange flex items-center justify-center text-white shrink-0 shadow-md">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              <span className="absolute -top-1.5 -end-1.5 bg-mo-yellow text-black font-mono font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#150702]">
                {totalItems}
              </span>
            </div>

            <div className="text-start min-w-0">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white/60">
                  {labels.orderTray || 'Tray'}
                </span>
                <span className="text-[10px] font-mono font-bold text-mo-yellow bg-mo-yellow/15 px-1.5 py-0.5 rounded">
                  {totalItems} {labels.items || 'items'}
                </span>
              </div>
              <div className="text-base sm:text-lg font-mono font-black text-white tracking-tight whitespace-nowrap leading-tight mt-0.5">
                {totalPrice.toLocaleString()} DA
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-mo-orange group-hover:bg-white text-white group-hover:text-black font-sans font-black text-xs sm:text-sm uppercase tracking-wider px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-md transition-colors shrink-0 whitespace-nowrap">
            <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            <span>{labels.callToOrder || 'Call to Order'}</span>
            {isRtl ? (
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            )}
          </div>
        </button>
      </motion.aside>
    </AnimatePresence>
  );
};
