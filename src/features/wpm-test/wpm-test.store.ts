import type { ChangeEvent } from 'react';
import type { StateCreator } from 'zustand';
import type { WPMTestSlice } from './models/wpm-test.model';

const DEFAULT_COMBO_COUNTER = {
  count: 0,
  highestCount: 0,
};

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
  comboCounter: DEFAULT_COMBO_COUNTER,

  setInputChange: (event: ChangeEvent<HTMLInputElement>) =>
    set(({ isPlaying, fullInputValue }) => {
      const { value } = event.target;

      return !isPlaying && fullInputValue == null && value.length
        ? { inputValue: value, isPlaying: true }
        : { inputValue: value };
    }),

  setInputNext: () =>
    set(({ activeIndex, inputValue, fullInputValue }) => ({
      activeIndex: activeIndex + 1,
      fullInputValue: (fullInputValue || '') + ' ' + inputValue,
    })),

  setInputBack: () =>
    set(({ activeIndex, fullInputValue, comboCounter }) => {
      const targetIndex = activeIndex > 0 ? activeIndex - 1 : 0;
      const fullInputValueList =
        fullInputValue?.split(/(\s+)/).filter((str) => str.trim().length > 0) ||
        [];

      return {
        activeIndex: targetIndex,
        inputValue: fullInputValueList[targetIndex] || '',
        fullInputValue: fullInputValueList.slice(0, -1).join(' '),
        comboCounter: { ...comboCounter, count: 0 },
      };
    }),

  stopPlaying: () => {
    const { inputValue, setInputNext } = get();

    inputValue.trim().length && setInputNext();
    set({ isPlaying: false, inputValue: '' });
  },

  appendComboCounter: () =>
    set(({ comboCounter, activeIndex }) => {
      const count = comboCounter.count + 1;

      return {
        comboCounter: { ...comboCounter, lastIndex: activeIndex, count },
      };
    }),

  resetComboCounter: (hardReset?: boolean) =>
    set(({ comboCounter: prevComboCounter }) => {
      const comboCounter = hardReset
        ? DEFAULT_COMBO_COUNTER
        : {
            ...prevComboCounter,
            highestCount: prevComboCounter.count,
            count: 0,
          };

      return { comboCounter };
    }),
});
