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
    let orderText = `🍕 COMMANDE MO PIZZA:\n`;
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
            className="relative w-full max-w-xl bg-[#1C0C05] border border-mo-yellow/30 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto shadow-2xl text-[#FDFCF7]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header bar */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-mo-yellow/20">
              <div className="flex-1">
                <h2 id="modal-title" className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-mo-yellow">
                  {selectedItem
                    ? selectedItem.name
                    : isCartMode
                    ? (t.menu?.orderTray || 'Panier')
                    : (t.menu?.title || 'MO PIZZA')}
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label={t.menu?.close || 'Close'}
                className="p-2.5 bg-white/10 hover:bg-mo-orange text-white rounded-full transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mode A: Multi-item Cart Summary */}
            {isCartMode && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/60 uppercase">
                  <span>{cart.length} {t.menu?.items || 'articles dans le panier'}</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.menu?.clear || 'Vider'}</span>
                  </button>
                </div>

                <div className="divide-y divide-white/10 max-h-56 overflow-y-auto pr-1 mb-4 rounded-2xl bg-[#251209] border border-mo-yellow/20 p-3">
                  {cart.map((entry) => {
                    const lineTotal = (entry.item.priceNum || 0) * entry.quantity;
                    return (
                      <div key={entry.item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={entry.item.image || '/images/menu/margarita.webp'}
                            alt={entry.item.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-mo-yellow/25 bg-[#150702]"
                          />
                          <div className="min-w-0">
                            <h4 className="font-display uppercase text-sm sm:text-base text-[#FDFCF7] truncate">
                              {entry.item.name}
                            </h4>
                            <div className="font-mono text-xs text-mo-yellow/70">
                              {entry.item.price}
                            </div>
                          </div>
                        </div>

                        {/* Stepper + Total */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center bg-[#150702] border border-mo-yellow/20 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(entry.item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
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
                              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono font-black text-sm text-[#FDFCF7] w-20 text-end">
                            {lineTotal.toLocaleString()} DA
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Grand Total Row */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-mo-orange/25 to-mo-yellow/25 border-2 border-mo-orange/45 rounded-2xl mb-4 shadow-lg">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                      {t.menu?.total || 'Total'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-mono font-black text-mo-yellow">
                      {totalPrice.toLocaleString()} DA
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    className="inline-flex items-center gap-2 bg-mo-yellow/15 hover:bg-mo-yellow hover:text-black text-mo-yellow font-mono text-xs uppercase px-3.5 py-2.5 rounded-xl transition-colors border border-mo-yellow/30 font-bold cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? (t.menu?.copiedReceipt || 'Copié !') : (t.menu?.copyReceipt || 'Copier la commande')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode B: Single Pizza Preview Card */}
            {selectedItem && (
              <div className="flex items-center gap-3.5 mb-5 p-3.5 bg-[#251209] border border-mo-yellow/25 rounded-2xl shadow-md">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-mo-yellow/30 bg-[#150702]">
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
                    <h3 className="font-display uppercase text-lg text-[#FDFCF7] truncate">
                      {selectedItem.name}
                    </h3>
                    <span className="font-mono text-xs font-bold text-mo-yellow px-2.5 py-0.5 rounded-full bg-mo-yellow/15 border border-mo-yellow/30 shrink-0">
                      {selectedItem.price}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                    {selectedItem.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Mode C: Empty Cart Prompt */}
            {!selectedItem && cart.length === 0 && (
              <div className="text-center py-6 px-4 bg-[#251209] border border-mo-yellow/20 rounded-2xl mb-6">
                <ShoppingBag className="w-10 h-10 text-mo-yellow/40 mx-auto mb-2" />
                <h4 className="font-display uppercase text-lg text-white mb-1">
                  {t.menu?.emptyCart || 'Votre panier est vide'}
                </h4>
                <p className="text-xs text-white/60 max-w-xs mx-auto">
                  {t.menu?.emptyCartSub || 'Appelez directement votre agence ci-dessous pour commander !'}
                </p>
              </div>
            )}

            {/* Branch Calling Instruction */}
            <div className="mb-4">
              <p className="text-xs font-mono uppercase tracking-widest text-mo-yellow flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-mo-orange" />
                <span>
                  {isCartMode
                    ? (t.menu?.callBranchPrompt || 'Appelez directement votre agence pour dicter et confirmer votre commande :')
                    : (t.menu?.selectBranch || 'Choisissez votre agence pour appeler :')}
                </span>
              </p>
            </div>

            {/* 5 Branches Phone List */}
            <div className="flex flex-col gap-3 mb-6">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-[#251209] border border-mo-yellow/20 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-mo-orange transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-mo-orange shrink-0" aria-hidden="true" />
                      <h3 className="font-display uppercase text-lg sm:text-xl text-[#FDFCF7]">
                        {branch.city}
                      </h3>
                      <span className="text-[10px] font-mono font-bold uppercase bg-mo-yellow/15 text-mo-yellow px-2 py-0.5 rounded-full border border-mo-yellow/25">
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
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-mo-orange hover:bg-mo-yellow text-white hover:text-black font-sans font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_2px_15px_rgba(237,115,45,0.35)] active:scale-95"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      {t.menu?.callNow || 'Appel Direct'}
                    </a>
                    <a
                      href={branch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white/5 hover:bg-mo-yellow hover:text-black text-white/80 rounded-xl transition-colors"
                      title={t.menu?.directions || 'Itinéraire'}
                      aria-label={`${t.menu?.directions || 'Itinéraire'} ${branch.city}`}
                    >
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer notes */}
            <div className="pt-4 border-t border-mo-yellow/20 flex items-center justify-between text-[11px] font-mono text-white/50 uppercase">
              <span>100% PÂTE FRAÎCHE ARTISANALE</span>
              <button
                onClick={onClose}
                className="hover:text-mo-yellow underline cursor-pointer"
              >
                {t.menu?.close || 'Fermer'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
