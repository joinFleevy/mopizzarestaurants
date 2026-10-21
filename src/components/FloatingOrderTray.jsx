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
        className="hidden md:flex fixed bottom-8 left-0 right-0 z-[100] px-4 pointer-events-none justify-center"
        dir={isRtl ? 'rtl' : 'ltr'}
        aria-label={labels.orderTray || 'Order Tray'}
      >
        <button
          type="button"
          onClick={openCart}
          className="pointer-events-auto group max-w-lg w-full bg-white border-3 border-black shadow-[6px_6px_0px_#000] rounded-2xl p-3 flex items-center justify-between gap-4 transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] cursor-pointer overflow-hidden box-border"
        >
          {/* Items badge & summary */}
          <div className="flex items-center gap-3 min-w-0 shrink">
            <div className="relative w-11 h-11 rounded-xl bg-mo-yellow border-2 border-black flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_#000]">
              <ShoppingBag className="w-5 h-5 text-black" aria-hidden="true" />
              <span className="absolute -top-2 -end-2 bg-mo-orange text-black font-mono font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                {totalItems}
              </span>
            </div>

            <div className="text-start min-w-0">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-xs font-mono uppercase tracking-wider text-black/60 font-bold">
                  {labels.orderTray || 'Tray'}
                </span>
                <span className="text-[10px] font-mono font-black text-black bg-mo-yellow px-1.5 py-0.5 rounded border border-black">
                  {totalItems} {labels.items || 'items'}
                </span>
              </div>
              <div className="text-lg font-mono font-black text-black tracking-tight whitespace-nowrap leading-tight mt-0.5">
                {totalPrice.toLocaleString()} DA
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="inline-flex items-center gap-2 bg-mo-orange text-black font-sans font-black text-xs sm:text-sm uppercase tracking-wider px-4 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] group-hover:bg-mo-yellow transition-colors shrink-0 whitespace-nowrap">
            <PhoneCall className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
            <span>{labels.callToOrder || 'Call to Order'}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
            )}
          </div>
        </button>
      </motion.aside>
    </AnimatePresence>
  );
};
