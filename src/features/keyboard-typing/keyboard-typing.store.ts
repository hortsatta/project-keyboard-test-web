import type { ChangeEvent } from 'react';
import type { StateCreator } from 'zustand';
import type { KeyboardTypingSlice } from './models/keyboard-typing.model';

export const createKeyboardTypingSlice: StateCreator<
  KeyboardTypingSlice,
  [],
  [],
  KeyboardTypingSlice
> = (set, get) => ({
  isPlaying: false,
  activeIndex: 0,
  inputValue: '',
  fullInputValue: undefined,

  setInputChange: (event: ChangeEvent<HTMLInputElement>) => {
    const { isPlaying, fullInputValue } = get();
    const { value } = event.target;

    if (!isPlaying) {
      if (fullInputValue == null) {
        value.length && set({ isPlaying: true });
      } else {
        return;
      }
    }

    set({ inputValue: value });
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
    const { setInputNext } = get();

    setInputNext();
    set({ isPlaying: false, inputValue: '' });
  },
});
