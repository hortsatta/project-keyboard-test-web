import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import { createWPMTestSlice } from '#/wpm-test/wpm-test.store';

import type { WPMTestSlice } from '#/wpm-test/models/wpm-test.model';

export const useBoundStore = create<// CoreSlice & WPMTestSlice
WPMTestSlice>()(
  devtools(
    persist(
      subscribeWithSelector((...a) => ({
        // ...createCoreSlice(...a),
        ...createWPMTestSlice(...a),
      })),
      {
        name: 'main-storage',
        partialize: (state) => ({
          // sidebarMode: state.sidebarMode,
        }),
      },
    ),
  ),
);
