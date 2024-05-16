import {
  appendTranscripts,
  checkMistake,
  checkSimilarity,
  updateTranscripts,
} from './helpers/transcript.helper';
import {
  DEFAULT_COMBO_COUNTER,
  DEFAULT_TEST_MODE_OPTIONS,
  DEFAULT_TEST_SYSTEM_OPTIONS,
} from './config/wpm-test.config';

import type { ChangeEvent } from 'react';
import type { StateCreator } from 'zustand';
import type {
  TestModeOptions,
  TestSystemOptions,
  WPMTestSlice,
} from './models/wpm-test.model';

export const createWPMTestSlice: StateCreator<
  WPMTestSlice,
  [],
  [],
  WPMTestSlice
> = (set, get) => ({
  testModeOptions: DEFAULT_TEST_MODE_OPTIONS.time,
  testSystemOptions: DEFAULT_TEST_SYSTEM_OPTIONS,
  isPlaying: false,
  isComplete: false,
  activeIndex: 0,
  passage: undefined,
  inputValue: '',
  fullInputValue: undefined,
  transcripts: [],
  comboCounter: DEFAULT_COMBO_COUNTER,
  elapsedTimeMs: 0,

  setTestSystemOptions: (testSystemOptions: TestSystemOptions) =>
    set(({ testSystemOptions: oldTestSystemOptions }) => ({
      testSystemOptions: { ...oldTestSystemOptions, ...testSystemOptions },
    })),

  setTestModeOptions: (testModeOptions: TestModeOptions) => {
    const {
      isPlaying,
      isComplete,
      testModeOptions: currentTestModeOptions,
      resetTest,
    } = get();

    if (
      isPlaying ||
      isComplete ||
      currentTestModeOptions.mode !== testModeOptions.mode
    ) {
      resetTest();
    }

    set({ testModeOptions });
  },

  setPassage: (value: string, append?: boolean) => {
    if (!value.trim()) return;

    set(({ passage }) => ({
      passage: append ? `${passage} ${value}` : value,
    }));
  },

  setInputChange: (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newState: Record<string, unknown> = { inputValue: value };

    const {
      activeIndex,
      isPlaying,
      fullInputValue,
      transcripts,
      resetComboCounter,
    } = get();

    const updatedTranscript = updateTranscripts(
      transcripts,
      activeIndex,
      value,
    );
    const targetTranscript = (updatedTranscript || [])[activeIndex];

    targetTranscript &&
      checkMistake(
        value,
        targetTranscript.targetText,
        targetTranscript.hasBackspace,
        resetComboCounter,
      );

    if (!isPlaying && fullInputValue == null && value.length) {
      newState.isPlaying = true;
    }

    if (updatedTranscript) {
      newState.transcripts = updatedTranscript;
    }

    set(newState);
  },

  setInputNext: (targetText?: string) => {
    const {
      activeIndex,
      inputValue,
      fullInputValue,
      transcripts,
      appendComboCounter,
      resetComboCounter,
    } = get();

    const nextActiveIndex = activeIndex + 1;
    const updatedFullInputValue = (fullInputValue || '') + ' ' + inputValue;
    const targetTranscript = transcripts[activeIndex];

    const newState: Record<string, unknown> = {
      activeIndex: nextActiveIndex,
      fullInputValue: updatedFullInputValue,
    };

    targetTranscript &&
      checkSimilarity(
        inputValue,
        targetTranscript.targetText,
        targetTranscript.hasBackspace,
        appendComboCounter,
        resetComboCounter,
      );

    // Add current value data to the transcript if targetText is not null
    if (nextActiveIndex >= transcripts.length && targetText?.length) {
      newState.transcripts = appendTranscripts(transcripts, targetText);
    }

    set(newState);
  },

  setInputBack: () => {
    set(({ activeIndex, fullInputValue, transcripts }) => {
      const targetIndex = activeIndex > 0 ? activeIndex - 1 : 0;
      const fullInputValueList =
        fullInputValue?.split(/(\s+)/).filter((str) => str.trim().length > 0) ||
        [];

      transcripts[targetIndex].hasBackspace = true;

      return {
        activeIndex: targetIndex,
        inputValue: fullInputValueList[targetIndex] || '',
        fullInputValue: fullInputValueList.slice(0, -1).join(' '),
        transcripts,
      };
    });
    // Reset combo counter
    get().resetComboCounter();
  },

  setComplete: (elapsedTimeMs = 0) => {
    const { inputValue, setInputNext } = get();

    inputValue.trim().length && setInputNext();
    set({
      isPlaying: false,
      isComplete: true,
      inputValue: '',
      elapsedTimeMs: Math.floor(elapsedTimeMs / 1000) * 1000,
    });
  },

  appendComboCounter: () =>
    set(({ comboCounter, activeIndex }) => {
      const count = comboCounter.count + 1;
      const highestCount =
        comboCounter.highestCount < count ? count : comboCounter.highestCount;

      return {
        comboCounter: {
          ...comboCounter,
          lastIndex: activeIndex,
          count,
          highestCount,
        },
      };
    }),

  resetComboCounter: (hardReset?: boolean) =>
    set(({ comboCounter: prevComboCounter }) => {
      const comboCounter = hardReset
        ? DEFAULT_COMBO_COUNTER
        : {
            ...prevComboCounter,
            count: 0,
          };

      return { comboCounter };
    }),

  initializeTranscripts: (targetText: string) =>
    set(({ inputValue }) => ({
      transcripts: [
        {
          inputValue,
          totalInputValue: inputValue,
          targetText,
          hasBackspace: false,
          isDirty: false,
        },
      ],
    })),

  resetTranscripts: () => set({ transcripts: [] }),

  resetTest: () => {
    const { resetComboCounter, resetTranscripts } = get();

    resetComboCounter(true);
    resetTranscripts();

    set(() => ({
      isPlaying: false,
      isComplete: false,
      activeIndex: 0,
      passage: undefined,
      inputValue: '',
      fullInputValue: undefined,
      elapsedTimeMs: 0,
    }));
  },
});
