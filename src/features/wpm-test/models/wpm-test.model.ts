import type { ChangeEvent } from 'react';

export enum TestMode {
  Time = 'time',
  Word = 'word',
}

export type Transcript = {
  inputValue: string;
  targetText: string;
  hasBackspace: boolean;
  isDirty: boolean;
};

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
  transcripts: Transcript[];
  setInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setInputNext: (targetText?: string) => void;
  setInputBack: () => void;
  stopPlaying: () => void;
  appendComboCounter: () => void;
  resetComboCounter: (hardReset?: boolean) => void;
  initializeTranscripts: (targetText: string) => void;
  resetTranscripts: () => void;
};
