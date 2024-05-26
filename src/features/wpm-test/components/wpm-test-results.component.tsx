import { memo, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';
import cx from 'classix';

import { BaseButton } from '#/base/components/base-button.component';
import { TestMode } from '../models/wpm-test.model';
import { useWPMTestResults } from '../hooks/use-wpm-test-results.hook';
import { WPMTestInput } from './wpm-test-input.component';
import { WPMTestRating } from './wpm-test-rating.component';

import type { ComponentProps } from 'react';

type SingleResultProps = ComponentProps<'div'> & {
  label?: string;
};

const BUTTON_CLASSNAME = 'flex h-full w-12 gap-2 !px-1';

const DIVIDER_CLASSNAME =
  '2xs:h-20 2xs:w-auto 2xs:border-b-0 2xs:border-r h-auto w-full border-b border-r-0 border-border';

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
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    testModeOptions,
    timeSeconds,
    resetTest,
    highestComboCount,
    accuracyPercent,
    netWPM,
    overallRating,
  } = useWPMTestResults();

  const description = useMemo(() => {
    switch (testModeOptions.mode) {
      case TestMode.Time:
        return `Time mode, ${testModeOptions.timeWordAmount} seconds.`;
      case TestMode.Word:
        return `Word mode, ${testModeOptions.timeWordAmount} words, done in ${timeSeconds} seconds.`;
      default:
        return `Zen mode, done in ${timeSeconds} seconds.`;
    }
  }, [testModeOptions, timeSeconds]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleWrapperClick = useCallback(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  useOnClickOutside(inputRef, handleWrapperClick);

  return (
    <div
      className={cx(
        'flex w-full flex-col items-center justify-center gap-16',
        className,
      )}
      onClick={handleWrapperClick}
      {...moreProps}
    >
      <WPMTestInput ref={inputRef} passageList={[]} />
      <WPMTestRating rating={overallRating} />
      <div className='relative z-10 flex w-fit flex-col gap-2.5 rounded border border-border bg-primary/10 px-5 pb-4 2xs:pb-2.5'>
        <div className='mt-5 flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-medium leading-none'>Test Completed</h3>
            <span className='text-xs italic text-white/60'>{description}</span>
          </div>
          <div className='flex items-center'>
            <BaseButton
              className={BUTTON_CLASSNAME}
              tabIndex={0}
              iconName='rewind'
              onClick={resetTest}
            />
            <BaseButton
              className={BUTTON_CLASSNAME}
              tabIndex={1}
              iconName='backspace'
              onClick={goBack}
            />
          </div>
        </div>
        <div className='h-px w-full bg-border' />
        <div className='flex flex-col items-center justify-center gap-2.5 2xs:flex-row 2xs:gap-5'>
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
    </div>
  );
});
