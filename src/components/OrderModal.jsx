import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, X, ArrowUpRight } from 'lucide-react';
import branchesInfo from '../data/branches_info.json';

export const OrderModal = ({ isOpen, onClose, selectedItem, t, isRtl }) => {
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-lg bg-[#14141A] border-t sm:border border-white/15 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto shadow-2xl text-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header bar */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="flex-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-mo-orange block mb-1">
                  [ DIRECT BRANCH ORDERING ]
                </span>
                <h2 id="modal-title" className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-white">
                  {selectedItem ? selectedItem.name : (t.menu?.title || 'MO PIZZA')}
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

            {/* Selected Pizza Preview Card */}
            {selectedItem && (
              <div className="flex items-center gap-3.5 mb-5 p-3 bg-white/5 border border-white/10 rounded-2xl">
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

            <p className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
              {t.menu?.selectBranch || 'Select your nearest branch to call:'}
            </p>

            {/* Branches List */}
            <div className="flex flex-col gap-3 mb-4">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-[#1C1C24] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/25 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-mo-orange shrink-0" aria-hidden="true" />
                      <h3 className="font-display uppercase text-xl text-white">
                        {branch.city}
                      </h3>
                      <span className="text-[10px] font-mono uppercase bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                        {branch.sub}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/60 block mt-1" dir="ltr">
                      {branch.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-mo-orange text-white font-sans font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      {t.menu?.callNow || 'Call Now'}
                    </a>
                    <a
                      href={branch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white rounded-xl transition-colors"
                      title={t.menu?.directions || 'Directions'}
                      aria-label={`${t.menu?.directions || 'Directions'} ${branch.city}`}
                    >
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

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
