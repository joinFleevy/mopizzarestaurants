import { inject, track } from '@vercel/analytics';

function isProductionHost() {
  return (
    typeof window !== 'undefined' &&
    !['localhost', '127.0.0.1', ''].includes(window.location.hostname)
  );
}

export function initAnalytics() {
  if (!isProductionHost()) return;
  try {
    inject();
  } catch {
    // Ignore analytics initialization errors
  }
}

export function trackEvent(name, properties = {}) {
  if (!isProductionHost()) return;
  try {
    track(name, properties);
  } catch {
    // Ignore analytics tracking errors
  }
}
