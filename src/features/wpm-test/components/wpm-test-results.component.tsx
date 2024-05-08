import { memo, useMemo } from 'react';
import levenshtein from 'damerau-levenshtein';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseButton } from '#/base/components/base-button.component';

import type { ComponentProps } from 'react';

type SingleResultProps = ComponentProps<'div'> & {
  label?: string;
};

const BUTTON_CLASSNAME = 'flex h-full w-12 gap-2 !px-1';

const DIVIDER_CLASSNAME = 'h-20 w-px bg-border';

const multiplier = Math.pow(10, 1);

const SingleResult = memo(function ({
  className,
  label,
  children,
  ...moreProps
}: SingleResultProps) {
  return (
    <div
      className={cx(
        'flex h-[60px] min-w-28 flex-col items-center justify-end text-2xl',
        className,
      )}
      {...moreProps}
    >
      {children}
      {label && (
        <span className='text-sm uppercase text-white/60'>{label}</span>
      )}
    </div>
  );
});

export const WPMTestResults = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
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
      (total, current) => total + current.inputValue.length,
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

  return (
    <div
      className={cx(
        'flex w-fit flex-col gap-2.5 rounded border border-border bg-primary/10 px-5 pb-2.5',
        className,
      )}
      {...moreProps}
    >
      <div className='mt-5 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-medium leading-none'>Test Completed</h3>
          <span className='text-xs italic text-white/60'>
            —in {timeSeconds}s, see results below
          </span>
        </div>
        <BaseButton
          className={BUTTON_CLASSNAME}
          iconName='rewind'
          onClick={resetTest}
        />
      </div>
      <div className='h-px w-full bg-border' />
      <div className='flex items-center justify-center gap-5'>
        <SingleResult label='Accuracy'>
          {accuracyPercent.toFixed(2)}%
        </SingleResult>
        <div className={DIVIDER_CLASSNAME} />
        <SingleResult className='text-4xl' label='WPM'>
          {netWPM.toFixed(1)}
        </SingleResult>
        <div className={DIVIDER_CLASSNAME} />
        <SingleResult label='Max Combo'>{highestComboCount}</SingleResult>
      </div>
    </div>
  );
});
