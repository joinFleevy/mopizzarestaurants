import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, X, Copy, Check, Trash2, Plus, Minus, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { locales } from './locales.js';
import { useCart } from './CartContext.jsx';
import branchesInfo from '../data/branches_info.json';
import menuData from '../data/menu.json';
import { getBranchStatus } from '../utils/businessHours.js';

export const OrderModal = ({ isOpen, onClose, selectedItem, lang = 'fr' }) => {
  const [copied, setCopied] = useState(false);
  const { cart, totalPrice, updateQuantity, clearCart, addToCart } = useCart();
  const t = locales[lang];
  const isRtl = lang === 'ar';
  const { isOpen: isBranchOpen } = getBranchStatus();
  const statusLabels = t.menu?.status || {};

  const upsellItems = [
    ...(menuData.drinks || []).slice(0, 2),
    ...(menuData.sides || []).slice(0, 2),
    ...(menuData.desserts || []).slice(0, 1)
  ];

  const isCartMode = !selectedItem && cart.length > 0;

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const branches = branchesInfo.map((b) => ({
    id: b.id,
    city: t.locations?.cities?.[b.id] || b.city,
    sub: t.locations?.subs?.[b.id] || b.name,
    phone: b.phone,
    link: b.mapsUrl
  }));

  const handleCopyOrder = () => {
    if (cart.length > 0) {
      const lines = cart.map(
        (c) => `• ${c.quantity}x ${c.item.name} (${((c.item.priceNum || 0) * c.quantity).toLocaleString()} DA)`
      );
      lines.push(`\nTOTAL: ${totalPrice.toLocaleString()} DA`);
      lines.push(`\nCommande MO PIZZA via mopizza.dz`);
      navigator.clipboard.writeText(lines.join('\n')).then(() => {
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
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-xl bg-[#FFFDF5] border-3 border-black rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto shadow-[8px_8px_0px_#000] text-[#111111]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header bar */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b-2 border-black">
              <div className="flex-1">
                <h2 id="modal-title" className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-black">
                  {selectedItem
                    ? selectedItem.name
                    : isCartMode
                    ? (t.menu?.orderTray || 'Panier de Commande')
                    : (t.menu?.title || 'MO PIZZA')}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase border border-black ${
                      isBranchOpen ? 'bg-emerald-300 text-black' : 'bg-rose-200 text-black'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isBranchOpen ? 'bg-emerald-700 animate-pulse' : 'bg-rose-600'}`}
                      aria-hidden="true"
                    />
                    {isBranchOpen ? (statusLabels.open || 'Ouvert') : (statusLabels.closed || 'Fermé')}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-black/70">
                    {statusLabels.hours || 'Ouvert 7j/7 • 11h30 – 01h00'}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label={t.menu?.close || 'Close'}
                className="p-2.5 bg-white hover:bg-mo-orange text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mode A: Multi-item Cart Summary */}
            {isCartMode && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-black/70 uppercase font-black">
                  <span>{cart.length} {t.menu?.items || 'articles dans le panier'}</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors cursor-pointer font-black"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.menu?.clear || 'Vider'}</span>
                  </button>
                </div>

                <div className="divide-y divide-black/10 max-h-56 overflow-y-auto pr-1 mb-4 rounded-2xl bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                  {cart.map((entry) => {
                    const lineTotal = (entry.item.priceNum || 0) * entry.quantity;
                    return (
                      <div key={entry.item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={entry.item.image || '/images/menu/margarita.webp'}
                            alt={entry.item.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border-2 border-black bg-black"
                          />
                          <div className="min-w-0">
                            <h4 className="font-display uppercase text-sm sm:text-base text-black truncate">
                              {entry.item.name}
                            </h4>
                            <div className="font-mono text-xs font-bold text-mo-orange">
                              {entry.item.price}
                            </div>
                          </div>
                        </div>

                        {/* Stepper + Total */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center bg-[#FFFDF5] border-2 border-black rounded-lg p-0.5 shadow-[1px_1px_0px_#000]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(entry.item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-black hover:bg-black hover:text-white rounded cursor-pointer transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono font-black text-xs px-2 text-black">
                              {entry.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(entry.item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-black hover:bg-black hover:text-white rounded cursor-pointer transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-mono font-black text-sm text-black w-20 text-end">
                            {lineTotal.toLocaleString()} DA
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 1-Tap Quick Upsell Strip */}
                <div className="mb-4">
                  <div className="text-[11px] font-mono font-black uppercase tracking-wider text-black/70 mb-2 flex items-center justify-between">
                    <span>{t.menu?.upsell?.title || 'Ajouter une boisson ou un accompagnement ?'}</span>
                    <span className="text-[10px] font-mono font-black text-black bg-mo-yellow px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                      + 1-TAP
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
                    {upsellItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex-shrink-0 bg-white border-2 border-black rounded-xl p-2 flex items-center gap-2.5 shadow-[2px_2px_0px_#000] min-w-[210px] max-w-[240px]"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-black bg-black shrink-0"
                          width="40"
                          height="40"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-display uppercase text-xs text-black truncate leading-tight">
                            {item.name}
                          </h5>
                          <div className="font-mono text-[11px] font-bold text-mo-orange">
                            {item.price}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(item, 1)}
                          className="w-7 h-7 rounded-lg bg-mo-orange hover:bg-mo-yellow text-black border border-black flex items-center justify-center font-black transition-all active:scale-90 shadow-[1px_1px_0px_#000] cursor-pointer shrink-0"
                          title={`Add ${item.name}`}
                          aria-label={`Add ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5 text-black" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grand Total Row */}
                <div className="flex items-center justify-between p-4 bg-mo-yellow border-2 border-black rounded-2xl mb-4 shadow-[3px_3px_0px_#000]">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-black/80 font-bold block">
                      {t.menu?.total || 'Total'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-mono font-black text-black">
                      {totalPrice.toLocaleString()} DA
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    className="inline-flex items-center gap-2 bg-white hover:bg-mo-orange text-black font-mono text-xs uppercase px-3.5 py-2.5 rounded-xl transition-colors border-2 border-black shadow-[2px_2px_0px_#000] font-black cursor-pointer active:scale-95"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? (t.menu?.copiedReceipt || 'Copié !') : (t.menu?.copyReceipt || 'Copier le récapitulatif')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode B: Single Pizza Preview Card */}
            {selectedItem && (
              <div className="flex items-center gap-3.5 mb-5 p-3.5 bg-white border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000]">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 border-black bg-black">
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
                    <h3 className="font-display uppercase text-lg text-black truncate">
                      {selectedItem.name}
                    </h3>
                    <span className="font-mono text-xs font-black text-black px-2.5 py-0.5 rounded-full bg-mo-yellow border-2 border-black shrink-0">
                      {selectedItem.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#444444] line-clamp-1 mt-0.5">
                    {selectedItem.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Mode C: Empty Cart Prompt */}
            {!selectedItem && cart.length === 0 && (
              <div className="text-center py-6 px-4 bg-white border-2 border-black rounded-2xl mb-6 shadow-[2px_2px_0px_#000]">
                <ShoppingBag className="w-10 h-10 text-mo-orange mx-auto mb-2" />
                <h4 className="font-display uppercase text-lg text-black mb-1">
                  {t.menu?.emptyCart || 'Votre panier est vide'}
                </h4>
                <p className="text-xs text-[#444444] max-w-xs mx-auto">
                  {t.menu?.emptyCartSub || 'Appelez directement votre agence ci-dessous pour commander !'}
                </p>
              </div>
            )}

            {/* Branch Calling Instruction */}
            <div className="mb-4">
              <p className="text-xs font-mono uppercase tracking-wider text-black font-black flex items-center gap-2">
                <Phone className="w-4 h-4 text-mo-orange" />
                <span>
                  {isCartMode
                    ? (t.menu?.callBranchPrompt || 'Lisez votre commande au serveur lors de l\'appel :')
                    : (t.menu?.selectBranch || 'Choisissez votre agence pour appeler :')}
                </span>
              </p>
            </div>

            {/* 5 Branches Phone List */}
            <div className="flex flex-col gap-3 mb-6">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white border-2 border-black rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[3px_3px_0px_#000] hover:bg-[#FFFDF5] transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-mo-orange shrink-0" aria-hidden="true" />
                      <h3 className="font-display uppercase text-lg sm:text-xl text-black">
                        {branch.city}
                      </h3>
                      <span className="text-[10px] font-mono font-black uppercase bg-mo-yellow text-black px-2 py-0.5 rounded-full border border-black">
                        {branch.sub}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-black text-black block mt-1" dir="ltr">
                      {branch.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-mo-orange hover:bg-mo-yellow text-black font-sans font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] transition-all active:scale-95"
                    >
                      <Phone className="w-4 h-4 text-black" aria-hidden="true" />
                      {t.menu?.callNow || 'Appel Direct'}
                    </a>
                    <a
                      href={branch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-[#FFFDF5] hover:bg-mo-yellow text-black border-2 border-black rounded-xl transition-colors"
                      title={t.menu?.directions || 'Itinéraire'}
                      aria-label={`${t.menu?.directions || 'Itinéraire'} ${branch.city}`}
                    >
                      <ArrowUpRight className="w-4 h-4 text-black" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer notes */}
            <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-mono text-black/60 font-bold uppercase">
              <span>100% PÂTE FRAÎCHE ARTISANALE</span>
              <button
                onClick={onClose}
                className="hover:text-mo-orange underline cursor-pointer font-black"
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
