import { useMemo } from 'react';
import levenshtein from 'damerau-levenshtein';

import { useBoundStore } from '#/core/hooks/use-store.hook';

type Result = {
  timeSeconds: number;
  accuracyPercent: number;
  netWPM: number;
  highestComboCount: number;
  resetTest: () => void;
};

const multiplier = Math.pow(10, 1);

export function useWPMTestResults(): Result {
  const elapsedTimeMs = useBoundStore((state) => state.elapsedTimeMs);
  const transcripts = useBoundStore((state) => state.transcripts);
  const resetTest = useBoundStore((state) => state.resetTest);

  const highestComboCount = useBoundStore(
    (state) => state.comboCounter.highestCount,
  );

  const timeSeconds = useMemo(() => elapsedTimeMs / 1000, [elapsedTimeMs]);

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

  const totalTimeMins = useMemo(() => elapsedTimeMs / 60000, [elapsedTimeMs]);

  // const grossWPM = useMemo(() => {
  //   const value = totalWordsTyped.length / totalTimeMins;
  //   return Math.round(value * multiplier) / multiplier;
  // }, [totalWordsTyped, totalTimeMins]);

  const netWPM = useMemo(() => {
    const netWordsTypedCount =
      totalWordsTyped.length - totalWordMistakes.length;
    const value = netWordsTypedCount / totalTimeMins;
    return Math.round(value * multiplier) / multiplier;
  }, [totalWordsTyped, totalWordMistakes, totalTimeMins]);

  const totalCharactersTypedCount = useMemo(() => {
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

  const accuracyPercent = useMemo(
    () => (totalCorrectCharacterCount / totalCharactersTypedCount) * 100,
    [totalCharactersTypedCount, totalCorrectCharacterCount],
  );

  return {
    timeSeconds,
    resetTest,
    accuracyPercent,
    netWPM,
    highestComboCount,
  };
}
