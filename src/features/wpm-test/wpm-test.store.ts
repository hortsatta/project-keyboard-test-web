import {
  appendTranscripts,
  checkMistake,
  checkSimilarity,
  updateTranscripts,
} from './helpers/transcript.helper';
import {
  DEFAULT_AUDIO_RECORDING,
  DEFAULT_COMBO_COUNTER,
  DEFAULT_COMBO_MULTIPLIER,
  DEFAULT_TEST_MODE_OPTIONS,
  DEFAULT_TEST_SYSTEM_OPTIONS,
  INC_STOCK_COMBO_MULTIPLIER,
  MAX_STOCK_COMBO_MULTIPLIER,
  MIN_ACTIVE_STOCK_COMBO_MULTIPLIER,
} from './config/wpm-test.config';

import type { ChangeEvent } from 'react';
import type { StateCreator } from 'zustand';
import type {
  AudioRecording,
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
  isTwicePlaying: false,
  isComplete: false,
  activeIndex: 0,
  passage: undefined,
  inputValue: '',
  fullInputValue: undefined,
  transcripts: [],
  comboCounter: DEFAULT_COMBO_COUNTER,
  comboMultiplier: DEFAULT_COMBO_MULTIPLIER,
  elapsedTimeMs: 0,
  audioRecording: DEFAULT_AUDIO_RECORDING,

  setAudioRecording: (audioRecording: Partial<AudioRecording>) =>
    set(({ audioRecording: oldAudioRecording }) => ({
      audioRecording: { ...oldAudioRecording, ...audioRecording },
    })),

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
    const {
      testSystemOptions,
      activeIndex,
      isPlaying,
      isTwicePlaying,
      fullInputValue,
      transcripts,
      resetComboCounter,
    } = get();

    const { value } = event.target;
    const newState: Record<string, unknown> = {};

    if (!isPlaying && !isTwicePlaying && testSystemOptions.typeTwiceToStart) {
      newState.isTwicePlaying = true;
      return set(newState);
    } else if (isPlaying && isTwicePlaying) {
      newState.isTwicePlaying = false;
    }

    newState.inputValue = value;

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
      comboMultiplier,
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

    if (targetTranscript) {
      checkSimilarity(
        inputValue,
        targetTranscript.targetText,
        targetTranscript.hasBackspace,
        appendComboCounter,
        resetComboCounter,
      );

      if (comboMultiplier.active) {
        transcripts[activeIndex] = { ...targetTranscript, hasMultiplier: true };
      }
    }

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
    const { inputValue, setInputNext, resetComboCounter } = get();

    inputValue.trim().length && setInputNext();
    resetComboCounter();

    set({
      isPlaying: false,
      isTwicePlaying: false,
      isComplete: true,
      inputValue: '',
      elapsedTimeMs: Math.floor(elapsedTimeMs / 1000) * 1000,
    });
  },

  appendComboCounter: () => {
    const {
      comboCounter,
      comboMultiplier,
      activeIndex,
      appendComboMultiplier,
    } = get();

    const count = comboCounter.count + (comboMultiplier.active ? 2 : 1);

    appendComboMultiplier();

    set({
      comboCounter: {
        ...comboCounter,
        lastIndex: activeIndex,
        count,
      },
    });
  },

  resetComboCounter: (hardReset?: boolean) => {
    get().resetComboMultiplier();

    set(({ comboCounter: prevComboCounter }) => {
      if (hardReset) {
        return { comboCounter: DEFAULT_COMBO_COUNTER };
      }

      let highestCounts = prevComboCounter.highestCounts;

      if (prevComboCounter.count > 0) {
        highestCounts = [
          ...prevComboCounter.highestCounts,
          prevComboCounter.count,
        ].sort((a, b) => b - a);
      }

      const comboCounter = {
        ...prevComboCounter,
        highestCounts,
        count: 0,
      };

      return { comboCounter };
    });
  },

  activateComboMultiplier: (active: boolean) => {
    const { comboMultiplier } = get();

    if (active && comboMultiplier.stock < MIN_ACTIVE_STOCK_COMBO_MULTIPLIER) {
      return;
    }

    set({
      comboMultiplier: { ...comboMultiplier, active },
    });
  },

  appendComboMultiplier: () => {
    const { comboMultiplier } = get();

    if (comboMultiplier.active) return;

    const currentCount = comboMultiplier.currentCount + 1;
    const stock =
      currentCount % 10 === 0 &&
      comboMultiplier.stock < MAX_STOCK_COMBO_MULTIPLIER
        ? comboMultiplier.stock + INC_STOCK_COMBO_MULTIPLIER
        : comboMultiplier.stock;

    set({
      comboMultiplier: {
        ...comboMultiplier,
        stock,
        currentCount,
      },
    });
  },

  clearComboMultiplier: () =>
    set(({ comboMultiplier }) => ({
      comboMultiplier: {
        ...comboMultiplier,
        active: false,
        stock: 0,
      },
    })),

  resetComboMultiplier: (hardReset?: boolean) =>
    set(({ comboMultiplier }) => {
      if (hardReset) {
        return {
          comboMultiplier: DEFAULT_COMBO_MULTIPLIER,
        };
      }

      return {
        comboMultiplier: {
          ...comboMultiplier,
          currentCount: 0,
        },
      };
    }),

  initializeTranscripts: (targetText: string) =>
    set(({ inputValue }) => ({
      transcripts: [
        {
          inputValue,
          totalInputValue: inputValue,
          targetText,
          isDirty: false,
          hasBackspace: false,
          hasMultiplier: false,
        },
      ],
    })),

  resetTranscripts: () => set({ transcripts: [] }),

  resetTest: () => {
    const { resetTranscripts, resetComboCounter, resetComboMultiplier } = get();

    resetTranscripts();
    resetComboCounter(true);
    resetComboMultiplier(true);

    set(() => ({
      isPlaying: false,
      isTwicePlaying: false,
      isComplete: false,
      activeIndex: 0,
      passage: undefined,
      inputValue: '',
      fullInputValue: undefined,
      elapsedTimeMs: 0,
      audioRecording: DEFAULT_AUDIO_RECORDING,
    }));
  },
});
