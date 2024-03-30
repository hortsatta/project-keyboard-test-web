import type { ChangeEvent } from 'react';
import type { StateCreator } from 'zustand';
import type { WPMTestSlice } from './models/wpm-test.model';

export const createWPMTestSlice: StateCreator<
  WPMTestSlice,
  [],
  [],
  WPMTestSlice
> = (set, get) => ({
  isPlaying: false,
  activeIndex: 0,
  inputValue: '',
  fullInputValue: undefined,

  setInputChange: (event: ChangeEvent<HTMLInputElement>) => {
    const { isPlaying, fullInputValue } = get();
    const { value } = event.target;

    set({ inputValue: value });

    !isPlaying &&
      fullInputValue == null &&
      value.length &&
      set({ isPlaying: true });
  },

  setInputNext: () =>
    set((state) => ({
      activeIndex: state.activeIndex + 1,
      fullInputValue: (state.fullInputValue || '') + ' ' + state.inputValue,
    })),

  setInputBack: () => {
    const { activeIndex, fullInputValue } = get();
    const targetIndex = activeIndex > 0 ? activeIndex - 1 : 0;
    const fullInputValueList =
      fullInputValue?.split(/(\s+)/).filter((str) => str.trim().length > 0) ||
      [];

    set(() => ({
      activeIndex: targetIndex,
      inputValue: fullInputValueList[targetIndex] || '',
      fullInputValue: fullInputValueList.slice(0, -1).join(' '),
    }));
  },

  stopPlaying: () => {
    const { inputValue, setInputNext } = get();

    inputValue.trim().length && setInputNext();
    set({ isPlaying: false, inputValue: '' });
  },
});
