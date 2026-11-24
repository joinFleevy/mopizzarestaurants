import React, { useState, useEffect, useRef } from 'react';
import { Phone, X, Copy, Check, Trash2, Plus, Minus, ArrowUpRight, ShoppingBag, Share2 } from 'lucide-react';
import { locales } from './locales.js';
import { useCart } from './CartContext.jsx';
import branchesInfo from '../data/branches_info.json';
import menuData from '../data/menu.json';
import { getBranchStatus } from '../utils/businessHours.js';
import { copyTextToClipboard } from '../utils/clipboard.js';
import { trackEvent } from '../utils/analytics.js';

const ORDERED_MODAL_BRANCH_IDS = ['oran', 'kouba', 'sidiyahia', 'batna', 'mostaganem'];

export const OrderModal = ({
  isOpen,
  onClose,
  selectedItem,
  onPromoteToCart,
  preferredBranchId,
  onSelectBranch,
  lang = 'fr'
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [copiedBranchId, setCopiedBranchId] = useState(null);
  const [activeBranchId, setActiveBranchId] = useState(preferredBranchId || 'oran');

  const branchCopyTimeoutRef = useRef(null);
  const copyTimeoutRef = useRef(null);
  const shareTimeoutRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);
  const wasOpenRef = useRef(false);

  const { cart, totalPrice, updateQuantity, clearCart, addToCart, getItemQuantity } = useCart();
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
  const selectedItemDesc = selectedItem
    ? (lang === 'ar' && selectedItem.desc_ar) ||
      (lang === 'en' && selectedItem.desc_en) ||
      selectedItem.desc
    : '';

  // Keep active city tab synced with preferredBranchId whenever opened
  useEffect(() => {
    if (preferredBranchId && branchesInfo.some((b) => b.id === preferredBranchId)) {
      setActiveBranchId(preferredBranchId);
    }
  }, [preferredBranchId, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management across open/close transitions
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      previousFocusRef.current = document.activeElement;
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    } else if (!isOpen && wasOpenRef.current) {
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
      previousFocusRef.current = null;
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // Lock scroll & reset feedback states on close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCopied(false);
      setShared(false);
      setCopiedBranchId(null);
      if (branchCopyTimeoutRef.current) clearTimeout(branchCopyTimeoutRef.current);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      if (shareTimeoutRef.current) clearTimeout(shareTimeoutRef.current);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(branchCopyTimeoutRef.current);
      clearTimeout(copyTimeoutRef.current);
      clearTimeout(shareTimeoutRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const branches = ORDERED_MODAL_BRANCH_IDS
    .map((id) => branchesInfo.find((b) => b.id === id))
    .filter(Boolean)
    .map((b) => {
      const city = t.locations?.cities?.[b.id] || b.city;
      const sub = t.locations?.subs?.[b.id] || b.name;
      return {
        id: b.id,
        city,
        sub,
        tabLabel: b.id === 'kouba' || b.id === 'sidiyahia' ? sub : city,
        phone: b.phone,
        link: b.mapsUrl
      };
    });

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  const handleUpsellAdd = (upsellItem) => {
    const fromMode = selectedItem ? 'single' : 'cart';
    if (selectedItem) {
      if (getItemQuantity(selectedItem.id) === 0) {
        addToCart(selectedItem, 1);
      }
      addToCart(upsellItem, 1);
      onPromoteToCart?.();
    } else {
      addToCart(upsellItem, 1);
    }
    trackEvent('upsell_add', { item_id: upsellItem.id, from_mode: fromMode });
  };

  const buildOrderSummaryText = () => {
    const lines = cart.map(
      (c) => `• ${c.quantity}x ${c.item.name} (${((c.item.priceNum || 0) * c.quantity).toLocaleString()} DA)`
    );
    lines.push(`\n${(t.menu?.total || 'Total').toUpperCase()}: ${totalPrice.toLocaleString()} DA`);
    lines.push(
      `\n${t.menu?.receiptFooter || 'Commande MO PIZZA — https://mopizzarestaurants.vercel.app/'}`
    );
    return lines.join('\n');
  };

  const handleCopyOrder = async () => {
    if (cart.length === 0) return;
    const ok = await copyTextToClipboard(buildOrderSummaryText());
    if (ok) {
      trackEvent('order_copy_receipt', {
        items_count: cart.length,
        cart_total: totalPrice
      });
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      setCopied(true);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareOrder = async () => {
    if (cart.length === 0) return;
    const summaryText = buildOrderSummaryText();
    const title = t.menu?.receiptHeader || 'Commande MO PIZZA';

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text: summaryText });
        trackEvent('order_share', {
          method: 'native_share',
          items_count: cart.length,
          cart_total: totalPrice
        });
        if (shareTimeoutRef.current) clearTimeout(shareTimeoutRef.current);
        setShared(true);
        shareTimeoutRef.current = setTimeout(() => setShared(false), 2500);
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    const ok = await copyTextToClipboard(summaryText);
    if (ok) {
      trackEvent('order_share', {
        method: 'clipboard',
        items_count: cart.length,
        cart_total: totalPrice
      });
      if (shareTimeoutRef.current) clearTimeout(shareTimeoutRef.current);
      setShared(true);
      shareTimeoutRef.current = setTimeout(() => setShared(false), 2500);
    }
  };

  const handleCopyBranchPhone = async (branchId, phone) => {
    onSelectBranch?.(branchId);
    trackEvent('branch_copy_phone', { branch: branchId, source: 'modal' });
    const ok = await copyTextToClipboard(phone);
    if (!ok) return;
    if (branchCopyTimeoutRef.current) clearTimeout(branchCopyTimeoutRef.current);
    setCopiedBranchId(branchId);
    branchCopyTimeoutRef.current = setTimeout(() => {
      setCopiedBranchId(null);
    }, 2000);
  };

  const renderUpsellStrip = () => (
    <div className="mb-4" data-upsell-strip="true">
      <div className="text-[11px] font-mono font-black uppercase tracking-wider text-black/70 mb-2 flex items-center justify-between gap-2">
        <span>{t.menu?.upsell?.title || 'Ajouter une boisson ou un accompagnement ?'}</span>
        <span className="text-[11px] font-mono font-black text-black bg-mo-yellow px-2 py-1 rounded border border-black whitespace-nowrap shrink-0">
          + 1-TAP
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        {upsellItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 bg-white border-2 border-black rounded-xl p-2 flex items-center gap-2.5 min-w-[210px] max-w-[240px]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-10 h-10 rounded-lg object-cover border border-black bg-black shrink-0"
              width="40"
              height="40"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-display uppercase text-xs text-black truncate leading-tight">
                {item.name}
              </h3>
              <div className="font-mono text-[11px] font-bold text-mo-orange" dir="ltr">
                {item.price}
              </div>
            </div>
            <button
              type="button"
              data-upsell-add={item.id}
              onClick={() => handleUpsellAdd(item)}
              className="w-11 h-11 rounded-lg bg-mo-orange hover:bg-mo-yellow text-black border border-black flex items-center justify-center font-black transition-all active:scale-90 cursor-pointer shrink-0"
              title={`Add ${item.name}`}
              aria-label={`Add ${item.name}`}
            >
              <Plus className="w-4 h-4 text-black" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="mo-backdrop-in fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        aria-hidden="true"
      />

      {/* 3-Section Modal Dialog (Fixed Header + Scrollable Body + Sticky Bottom Call Dock) */}
      <div
        className="mo-modal-up relative w-full max-w-xl bg-[#FFFDF5] border-3 border-black rounded-t-3xl sm:rounded-3xl z-10 max-h-[92vh] flex flex-col overflow-hidden p-0 shadow-[8px_8px_0px_#000] text-[#111111]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Fixed Top Header */}
        <div className="shrink-0 px-5 sm:px-7 pt-5 sm:pt-6 pb-3.5 border-b-2 border-black bg-[#FFFDF5] flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 id="modal-title" className="text-2xl sm:text-4xl font-display uppercase tracking-wider text-black truncate">
              {selectedItem
                ? selectedItem.name
                : isCartMode
                ? (t.menu?.orderTray || 'Panier de Commande')
                : (t.menu?.title || 'MO PIZZA')}
            </h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-black uppercase border border-black ${
                  isBranchOpen ? 'bg-emerald-300 text-black' : 'bg-rose-200 text-black'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full border border-black ${isBranchOpen ? 'bg-emerald-700' : 'bg-rose-600'}`}
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
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t.menu?.close || 'Close'}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 bg-white hover:bg-mo-orange text-black border-2 border-black rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Middle Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-7 py-4">
          {/* Mode A: Multi-item Cart Summary */}
          {isCartMode && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2.5 text-xs font-mono text-black/70 uppercase font-black">
                <span>{cart.length} {t.menu?.items || 'articles dans le panier'}</span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center justify-end gap-1 min-w-[44px] min-h-[44px] px-2 -my-2 text-red-600 hover:text-red-700 transition-colors cursor-pointer font-black"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.menu?.clear || 'Vider'}</span>
                </button>
              </div>

              <div className="divide-y divide-black/10 max-h-48 overflow-y-auto pr-1 mb-4 rounded-2xl bg-white border-2 border-black p-3">
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
                          <h3 className="font-display uppercase text-sm sm:text-base text-black truncate">
                            {entry.item.name}
                          </h3>
                          <div className="font-mono text-xs font-bold text-mo-orange" dir="ltr">
                            {entry.item.price}
                          </div>
                        </div>
                      </div>

                      {/* Stepper + Total */}
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div className="flex items-center bg-[#FFFDF5] border-2 border-black rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(entry.item.id, -1)}
                            className="w-11 h-11 flex items-center justify-center text-black hover:bg-black hover:text-white rounded cursor-pointer transition-colors"
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
                            className="w-11 h-11 flex items-center justify-center text-black hover:bg-black hover:text-white rounded cursor-pointer transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-mono font-black text-sm text-black w-16 sm:w-20 text-end" dir="ltr">
                          {lineTotal.toLocaleString()} DA
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 1-Tap Quick Upsell Strip */}
              {renderUpsellStrip()}

              {/* Grand Total Row with Copy + 1-Tap Share */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 bg-mo-yellow border-2 border-black rounded-2xl mb-3 shadow-[3px_3px_0px_#000]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-black/80 font-bold block">
                    {t.menu?.total || 'Total'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-black" dir="ltr">
                    {totalPrice.toLocaleString()} DA
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    data-copy-order="true"
                    onClick={handleCopyOrder}
                    className="inline-flex items-center gap-2 min-h-[44px] bg-white hover:bg-mo-orange text-black font-mono text-xs uppercase px-3.5 py-2 rounded-xl transition-colors border-2 border-black font-black cursor-pointer active:scale-95"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                    <span>{copied ? (t.menu?.copiedReceipt || 'Copié !') : (t.menu?.copyReceipt || 'Copier le récapitulatif')}</span>
                  </button>

                  <button
                    type="button"
                    data-share-order="true"
                    onClick={handleShareOrder}
                    className="inline-flex items-center gap-2 min-h-[44px] bg-black hover:bg-mo-orange text-mo-yellow hover:text-black font-mono text-xs uppercase px-3.5 py-2 rounded-xl transition-colors border-2 border-black font-black cursor-pointer active:scale-95"
                  >
                    {shared ? <Check className="w-4 h-4" aria-hidden="true" /> : <Share2 className="w-4 h-4" aria-hidden="true" />}
                    <span>{shared ? (t.menu?.sharedOrder || 'Partagé !') : (t.menu?.shareOrder || 'Partager')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mode B: Single Pizza Preview Card + 1-Tap Upsell Strip */}
          {selectedItem && (
            <>
              <div className="flex items-center gap-3.5 mb-4 p-3.5 bg-white border-2 border-black rounded-2xl">
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
                    <span
                      className="font-mono text-xs font-black text-black px-2.5 py-1 rounded-full bg-mo-yellow border-2 border-black shrink-0"
                      dir="ltr"
                    >
                      {selectedItem.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#444444] line-clamp-1 mt-0.5">
                    {selectedItemDesc}
                  </p>
                </div>
              </div>

              {renderUpsellStrip()}
            </>
          )}

          {/* Mode C: Empty Cart Prompt */}
          {!selectedItem && cart.length === 0 && (
            <div className="text-center py-5 px-4 bg-white border-2 border-black rounded-2xl mb-3">
              <ShoppingBag className="w-9 h-9 text-mo-orange mx-auto mb-2" aria-hidden="true" />
              <h3 className="font-display uppercase text-lg text-black mb-1">
                {t.menu?.emptyCart || 'Votre panier est vide'}
              </h3>
              <p className="text-xs text-[#444444] max-w-xs mx-auto">
                {t.menu?.emptyCartSub || 'Appelez directement votre agence ci-dessous pour commander !'}
              </p>
            </div>
          )}

          {/* Subtle Dough Quality Note */}
          <div className="pt-2 text-center text-[11px] font-mono text-black/60 font-bold uppercase">
            {t.menu?.modalFooterNote || '100% PÂTE FRAÎCHE ARTISANALE'}
          </div>
        </div>

        {/* Pinned Sticky Bottom Call Dock */}
        <div
          data-active-branch-card={activeBranch.id}
          className="shrink-0 px-5 sm:px-7 pt-3 pb-4 sm:pb-5 border-t-2 border-black bg-[#FFF9E6]"
        >
          {/* Compact 1-Row Horizontally Scrollable 5-City Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1 mb-2.5" data-modal-city-tabs="true">
            {branches.map((branch) => {
              const isActive = branch.id === activeBranch.id;
              const isPref = branch.id === preferredBranchId;
              return (
                <button
                  key={branch.id}
                  type="button"
                  data-modal-city-tab={branch.id}
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveBranchId(branch.id);
                    onSelectBranch?.(branch.id);
                  }}
                  className={`shrink-0 min-h-[44px] px-3 py-1.5 rounded-xl border-2 border-black font-mono text-xs uppercase font-black whitespace-nowrap transition-colors cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-black text-mo-yellow'
                      : 'bg-white text-black hover:bg-mo-yellow'
                  }`}
                >
                  {isPref ? `★ ${branch.tabLabel}` : branch.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Full-width Always-Visible Primary Call Button */}
          <a
            href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`}
            data-modal-primary-call="true"
            onClick={() => {
              onSelectBranch?.(activeBranch.id);
              trackEvent('branch_call', {
                branch: activeBranch.id,
                source: 'modal',
                cart_total: totalPrice
              });
            }}
            className="w-full min-h-[52px] inline-flex items-center justify-center gap-2.5 bg-mo-orange hover:bg-mo-yellow text-black font-sans font-black px-4 py-3 rounded-xl text-sm sm:text-base uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] transition-all active:scale-95"
          >
            <Phone className="w-5 h-5 text-black shrink-0" aria-hidden="true" />
            <span>
              {t.menu?.callBranchBtn || 'Appeler'} {activeBranch.city} —{' '}
              <bdi dir="ltr">{activeBranch.phone}</bdi>
            </span>
          </a>

          {/* Secondary Copy & Maps Row */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              type="button"
              data-modal-copy-branch={activeBranch.id}
              onClick={() => handleCopyBranchPhone(activeBranch.id, activeBranch.phone)}
              className={`min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 border-2 border-black rounded-xl font-mono text-xs font-black uppercase transition-colors cursor-pointer active:scale-95 ${
                copiedBranchId === activeBranch.id
                  ? 'bg-emerald-300 text-black'
                  : 'bg-white hover:bg-mo-yellow text-black'
              }`}
            >
              {copiedBranchId === activeBranch.id ? (
                <Check className="w-4 h-4 text-black shrink-0" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4 text-black shrink-0" aria-hidden="true" />
              )}
              <span className="truncate">
                {copiedBranchId === activeBranch.id
                  ? (t.locations?.copiedPhone || 'Copié !')
                  : (t.locations?.copyPhone || 'Copier le numéro')}
              </span>
            </button>

            <a
              href={activeBranch.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onSelectBranch?.(activeBranch.id);
                trackEvent('branch_directions', { branch: activeBranch.id, source: 'modal' });
              }}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-mo-yellow text-black border-2 border-black rounded-xl font-mono text-xs font-black uppercase transition-colors"
            >
              <span>{t.menu?.directions || 'Itinéraire'}</span>
              <ArrowUpRight className="w-4 h-4 text-black shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
