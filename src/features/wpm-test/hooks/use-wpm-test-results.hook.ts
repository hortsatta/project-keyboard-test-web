import { useMemo } from 'react';
import levenshtein from 'damerau-levenshtein';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { generateRating } from '../config/wpm-test-rating.config';

import type { TestModeOptions } from '../models/wpm-test.model';

type Result = {
  testModeOptions: TestModeOptions;
  timeSeconds: number;
  highestComboCount: number;
  accuracyPercent: number;
  netWPM: number;
  overallRating: string;
  resetTest: () => void;
};

export function useWPMTestResults(): Result {
  const testModeOptions = useBoundStore((state) => state.testModeOptions);
  const elapsedTimeMs = useBoundStore((state) => state.elapsedTimeMs);
  const transcripts = useBoundStore((state) => state.transcripts);
  const resetTest = useBoundStore((state) => state.resetTest);

  const highestComboCounts = useBoundStore(
    (state) => state.comboCounter.highestCounts,
  );

  const highestComboCount = useMemo(
    () => highestComboCounts[0] || 0,
    [highestComboCounts],
  );

  const timeSeconds = useMemo(() => elapsedTimeMs / 1000, [elapsedTimeMs]);

  const totalTimeMins = useMemo(() => elapsedTimeMs / 60000, [elapsedTimeMs]);

  const totalWordsTyped = useMemo(
    () => transcripts.filter(({ isDirty }) => isDirty),
    [transcripts],
  );

  const totalWordMistakes = useMemo(
    () =>
      totalWordsTyped.filter(({ inputValue, targetText }) => {
        const { similarity } = levenshtein(inputValue, targetText);
        return similarity !== 1;
      }),
    [totalWordsTyped],
  );

  const totalCharactersWithBackspaceTypedCount = useMemo(() => {
    const spaces = totalWordsTyped.length - 1;
    const count = totalWordsTyped.reduce(
      (total, current) => total + current.totalInputValue.length,
      0,
    );

    return count + spaces;
  }, [totalWordsTyped]);

  const totalCorrectCharacterCount = useMemo(() => {
    const spaces = totalWordsTyped.length - 1;
    let count = 0;

    totalWordsTyped.forEach(({ inputValue, targetText }) => {
      inputValue.split('').forEach((value, index) => {
        value === targetText[index] && ++count;
      });
    });

    return count + spaces;
  }, [totalWordsTyped]);

  const grossWPM = useMemo(() => {
    const spacesCount = totalWordsTyped.length - 1;
    const charactersTCount = totalWordsTyped.reduce(
      (total, current) => total + current.inputValue.length,
      0,
    );

    return (charactersTCount + spacesCount) / (5 * totalTimeMins);
  }, [totalTimeMins, totalWordsTyped]);

  const netWPM = useMemo(() => {
    let characterMistakesCount = 0;

    totalWordMistakes.forEach(({ inputValue, targetText }) => {
      inputValue.split('').forEach((value, index) => {
        value === targetText[index] && ++characterMistakesCount;
      });
    });

    const multiplier = Math.pow(10, 1);
    const errorsPerMin = characterMistakesCount / totalTimeMins;
    const net = Math.max(0, grossWPM - errorsPerMin);

    return Math.round(net * multiplier) / multiplier;
  }, [totalWordMistakes, totalTimeMins, grossWPM]);

  const accuracyPercent = useMemo(
    () =>
      (totalCorrectCharacterCount / totalCharactersWithBackspaceTypedCount) *
      100,
    [totalCharactersWithBackspaceTypedCount, totalCorrectCharacterCount],
  );

  const overallRating = useMemo(
    () => generateRating(netWPM, timeSeconds, highestComboCounts),
    [netWPM, timeSeconds, highestComboCounts],
  );

  return {
    testModeOptions,
    timeSeconds,
    resetTest,
    accuracyPercent,
    netWPM,
    highestComboCount,
    overallRating,
  };
}
