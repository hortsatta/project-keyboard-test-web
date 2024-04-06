import type { ChangeEvent } from 'react';

export enum TestMode {
  Time = 'time',
  Word = 'word',
  Zen = 'zen',
}

export type TestOptions = {
  mode: TestMode;
  timeWordAmount: number;
};

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
  testOptions: TestOptions;
  isPlaying: boolean;
  isComplete: boolean;
  activeIndex: number;
  inputValue: string;
  fullInputValue: string | undefined;
  comboCounter: ComboCounter;
  transcripts: Transcript[];
  setTestOptions: (testOptions: TestOptions) => void;
  setInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setInputNext: (targetText?: string) => void;
  setInputBack: () => void;
  setComplete: () => void;
  appendComboCounter: () => void;
  resetComboCounter: (hardReset?: boolean) => void;
  initializeTranscripts: (targetText: string) => void;
  resetTranscripts: () => void;
  resetTest: () => void;
};
