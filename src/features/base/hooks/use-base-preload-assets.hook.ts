import { useEffect } from 'react';

export const useBasePreloadImages = (srcs: string[]): void => {
  useEffect(() => {
    const key = Symbol();

    window.preloadAssetsData = window.preloadAssetsData ?? {};
    window.preloadAssetsData[key] = [];

    for (const src of srcs) {
      const img = new Image();
      img.src = src;
      window.preloadAssetsData[key].push(img);
    }

    return () => {
      delete window.preloadAssetsData?.[key];
    };
  }, [srcs]);
};

export const useBasePreloadSounds = (srcs: string[]): void => {
  useEffect(() => {
    const key = Symbol();

    window.preloadAssetsData = window.preloadAssetsData ?? {};
    window.preloadAssetsData[key] = [];

    for (const src of srcs) {
      const sound = new Audio();
      sound.src = src;
      window.preloadAssetsData[key].push(sound);
    }

    return () => {
      delete window.preloadAssetsData?.[key];
    };
  }, [srcs]);
};
