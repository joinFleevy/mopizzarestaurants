import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, X, ArrowUpRight, Plus, Minus, Trash2, Copy, Check, ShoppingBag } from 'lucide-react';
import branchesInfo from '../data/branches_info.json';
import { useCart } from './CartContext.jsx';

export const OrderModal = ({ isOpen, onClose, selectedItem, t, isRtl, lang }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const branches = branchesInfo.map((b) => ({
    id: b.id,
    city: t.locations?.cities?.[b.id] || b.city,
    sub: t.locations?.subs?.[b.id] || b.name,
    phone: b.phone,
    link: b.mapsUrl
  }));

  const isCartMode = !selectedItem && cart.length > 0;

  const handleCopyOrder = () => {
    let orderText = `🍕 MO PIZZA ORDER:\n`;
    if (isCartMode) {
      cart.forEach((entry) => {
        const itemTotal = (entry.item.priceNum || 0) * entry.quantity;
        orderText += `• ${entry.quantity}x ${entry.item.name} (${itemTotal} DA)\n`;
      });
      orderText += `-------------------------\nTOTAL: ${totalPrice.toLocaleString()} DA`;
    } else if (selectedItem) {
      orderText += `• 1x ${selectedItem.name} (${selectedItem.price})\n-------------------------\nTOTAL: ${selectedItem.price}`;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(orderText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-xl bg-[#14141A] border-t sm:border border-white/15 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto shadow-2xl text-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header bar */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="flex-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-mo-orange block mb-1">
                  [ {isCartMode ? (t.menu?.orderSummary || 'ORDER SUMMARY') : 'DIRECT BRANCH ORDERING'} ]
                </span>
                <h2 id="modal-title" className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-white">
                  {selectedItem
                    ? selectedItem.name
                    : isCartMode
                    ? (t.menu?.orderTray || 'Order Tray')
                    : (t.menu?.title || 'MO PIZZA')}
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label={t.menu?.close || 'Close'}
                className="p-2.5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mode A: Multi-item Cart Summary */}
            {isCartMode && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/50 uppercase">
                  <span>{cart.length} {t.menu?.items || 'items in order'}</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.menu?.clear || 'Clear'}</span>
                  </button>
                </div>

                <div className="divide-y divide-white/5 max-h-56 overflow-y-auto pr-1 mb-4 rounded-2xl bg-white/5 border border-white/10 p-3">
                  {cart.map((entry) => {
                    const lineTotal = (entry.item.priceNum || 0) * entry.quantity;
                    return (
                      <div key={entry.item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={entry.item.image || '/images/menu/margarita.webp'}
                            alt={entry.item.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10 bg-[#1A1A22]"
                          />
                          <div className="min-w-0">
                            <h4 className="font-display uppercase text-sm sm:text-base text-white truncate">
                              {entry.item.name}
                            </h4>
                            <div className="font-mono text-xs text-white/50">
                              {entry.item.price} each
                            </div>
                          </div>
                        </div>

                        {/* Stepper + Total */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center bg-[#181820] border border-white/10 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(entry.item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-xs px-2 text-mo-yellow">
                              {entry.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(entry.item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono font-bold text-sm text-white w-20 text-end">
                            {lineTotal.toLocaleString()} DA
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Grand Total Row */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-mo-orange/15 to-mo-yellow/15 border border-mo-orange/30 rounded-2xl mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                      {t.menu?.total || 'Total Amount'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-mono font-black text-white">
                      {totalPrice.toLocaleString()} DA
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase px-3 py-2 rounded-xl transition-colors border border-white/15"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? (t.menu?.copiedReceipt || 'Copied!') : (t.menu?.copyReceipt || 'Copy Receipt')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode B: Single Pizza Preview Card */}
            {selectedItem && (
              <div className="flex items-center gap-3.5 mb-5 p-3.5 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#181820]">
                  <img
                    src={selectedItem.image || '/images/menu/margarita.webp'}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                    width="64"
                    height="64"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display uppercase text-lg text-white truncate">
                      {selectedItem.name}
                    </h3>
                    <span className="font-mono text-xs font-bold text-mo-yellow px-2.5 py-0.5 rounded-full bg-mo-yellow/15 border border-mo-yellow/30 shrink-0">
                      {selectedItem.price}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
                    {selectedItem.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Mode C: Empty Cart Prompt */}
            {!selectedItem && cart.length === 0 && (
              <div className="text-center py-6 px-4 bg-white/5 border border-white/10 rounded-2xl mb-6">
                <ShoppingBag className="w-10 h-10 text-white/30 mx-auto mb-2" />
                <h4 className="font-display uppercase text-lg text-white mb-1">
                  {t.menu?.emptyCart || 'Your order tray is empty'}
                </h4>
                <p className="text-xs text-white/60 max-w-xs mx-auto">
                  {t.menu?.emptyCartSub || 'You can still call any branch directly below to order or ask questions!'}
                </p>
              </div>
            )}

            {/* Branch Calling Instruction */}
            <div className="mb-4">
              <p className="text-xs font-mono uppercase tracking-widest text-mo-yellow flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>
                  {isCartMode
                    ? (t.menu?.callBranchPrompt || 'Call your nearest branch directly to dictate & confirm your order:')
                    : (t.menu?.selectBranch || 'Select your nearest branch to call:')}
                </span>
              </p>
            </div>

            {/* 5 Branches Phone List */}
            <div className="flex flex-col gap-3 mb-6">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-[#1C1C24] border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-mo-orange/50 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-mo-orange shrink-0" aria-hidden="true" />
                      <h3 className="font-display uppercase text-lg sm:text-xl text-white">
                        {branch.city}
                      </h3>
                      <span className="text-[10px] font-mono uppercase bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                        {branch.sub}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-mo-yellow block mt-1" dir="ltr">
                      {branch.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-mo-orange hover:bg-white text-white hover:text-black font-sans font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(255,69,0,0.3)] active:scale-95"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      {t.menu?.callNow || 'Call Direct'}
                    </a>
                    <a
                      href={branch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white rounded-xl transition-colors"
                      title={t.menu?.directions || 'Directions'}
                      aria-label={`${t.menu?.directions || 'Directions'} ${branch.city}`}
                    >
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer notes */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40 uppercase">
              <span>100% FRESH DAILY DOUGH</span>
              <button
                onClick={onClose}
                className="hover:text-white underline cursor-pointer"
              >
                {t.menu?.close || 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
