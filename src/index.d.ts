export {};

declare global {
  interface Window {
    preloadAssetsData?: Record<symbol, unknown[]>;
  }
}

window.preloadAssetsData = window.preloadAssetsData || {};
