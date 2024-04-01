import type { ChangeEvent } from 'react';

export type ComboCounter = {
  count: number;
  highestCount: number;
  lastIndex?: number;
};

export type WPMTestSlice = {
  isPlaying: boolean;
  activeIndex: number;
  inputValue: string;
  fullInputValue: string | undefined;
  comboCounter: ComboCounter;
  setInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setInputNext: () => void;
  setInputBack: () => void;
  stopPlaying: () => void;
  appendComboCounter: () => void;
  resetComboCounter: () => void;
};
