import type { ChangeEvent } from 'react';

export type WPMTestSlice = {
  isPlaying: boolean;
  activeIndex: number;
  inputValue: string;
  fullInputValue: string | undefined;
  setInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setInputNext: () => void;
  setInputBack: () => void;
  stopPlaying: () => void;
};
