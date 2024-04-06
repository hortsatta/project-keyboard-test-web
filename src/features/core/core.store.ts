import type { StateCreator } from 'zustand';
import type { CoreSlice } from './models/core.model';

export const createCoreSlice: StateCreator<CoreSlice, [], [], CoreSlice> = (
  set,
) => ({
  isMinimalUI: false,

  setMinimalUI: (isMinimalUI: boolean) => set({ isMinimalUI }),
});
