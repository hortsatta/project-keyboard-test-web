import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import { createWPMTestSlice } from '#/wpm-test/wpm-test.store';
import { createCoreSlice } from '../core.store';

import type { WPMTestSlice } from '#/wpm-test/models/wpm-test.model';
import type { CoreSlice } from '../models/core.model';

export const useBoundStore = create<CoreSlice & WPMTestSlice>()(
  devtools(
    persist(
      subscribeWithSelector((...a) => ({
        ...createCoreSlice(...a),
        ...createWPMTestSlice(...a),
      })),
      {
        name: 'main-storage',
        partialize: (state) => ({
          options: state.testModeOptions,
        }),
      },
    ),
  ),
);
