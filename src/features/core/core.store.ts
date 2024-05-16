import type { StateCreator } from 'zustand';
import type { CoreSlice } from './models/core.model';

export const createCoreSlice: StateCreator<CoreSlice, [], [], CoreSlice> = (
  set,
) => ({
  isMinimalUI: false,
  openMainMenu: false,

  setMinimalUI: (isMinimalUI: boolean) => set({ isMinimalUI }),

  setOpenMainMenu: (open?: boolean) =>
    set(({ openMainMenu }) => ({
      openMainMenu: open == null ? !openMainMenu : open,
    })),
});
