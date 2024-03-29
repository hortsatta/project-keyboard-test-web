import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

import { createKeyboardTypingSlice } from '#/keyboard-typing/keyboard-typing.store';

import type { KeyboardTypingSlice } from '#/keyboard-typing/models/keyboard-typing.model';

export const useBoundStore = create<// CoreSlice & KeyboardTypingSlice
KeyboardTypingSlice>()(
  devtools(
    persist(
      subscribeWithSelector((...a) => ({
        // ...createCoreSlice(...a),
        ...createKeyboardTypingSlice(...a),
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
