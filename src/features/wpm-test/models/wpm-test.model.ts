import type { ChangeEvent } from 'react';

export enum TestMode {
  Time = 'time',
  Word = 'word',
  Zen = 'zen',
}

export type TestSystemOptions = {
  typeTwiceToStart?: boolean;
  comboMultiplierAutoActivate?: boolean;
  comboBackdropColorSync?: boolean;
  perfectWordSfx?: boolean;
  notCorrectWordSfx?: boolean;
  comboMultiplierSfx?: boolean;
};

export type TestModeOptions = {
  mode: TestMode;
  timeWordAmount: number;
};

export type Transcript = {
  inputValue: string;
  totalInputValue: string;
  targetText: string;
  isDirty: boolean;
  hasBackspace: boolean;
  hasMultiplier: boolean;
};

export type ComboCounter = {
  count: number;
  highestCounts: number[];
  lastIndex?: number;
};

export type ComboMultiplier = {
  active: boolean;
  stock: number;
  currentCount: number;
};

export type WPMTestSlice = {
  testSystemOptions: TestSystemOptions;
  testModeOptions: TestModeOptions;
  isPlaying: boolean;
  isComplete: boolean;
  activeIndex: number;
  inputValue: string;
  passage: string | undefined;
  fullInputValue: string | undefined;
  comboCounter: ComboCounter;
  comboMultiplier: ComboMultiplier;
  transcripts: Transcript[];
  elapsedTimeMs: number;
  setTestSystemOptions: (testSystemOptions: TestSystemOptions) => void;
  setTestModeOptions: (testModeOptions: TestModeOptions) => void;
  setPassage: (value: string, append?: boolean) => void;
  setInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setInputNext: (targetText?: string) => void;
  setInputBack: () => void;
  setComplete: (elapsedTimeMs?: number) => void;
  appendComboCounter: () => void;
  resetComboCounter: (hardReset?: boolean) => void;
  activateComboMultiplier: (active: boolean) => void;
  appendComboMultiplier: () => void;
  clearComboMultiplier: () => void;
  resetComboMultiplier: (hardReset?: boolean) => void;
  initializeTranscripts: (targetText: string) => void;
  resetTranscripts: () => void;
  resetTest: () => void;
};
