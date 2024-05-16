import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { TestMode } from '../models/wpm-test.model';
import { useWPMTestTimer } from '../hooks/use-wpm-test-timer.hook';
import { useWPMTestComboCounterColorBackdrop } from '../hooks/use-wpm-test-combo-counter-color-backdrop.hook';
import { useWPMTestSentenceGenerator } from '../hooks/use-wpm-test-sentence-generator.hook';
import { useWPMTestWordCounter } from '../hooks/use-wpm-test-word-counter.hook';
import { WPMTestInput } from './wpm-test-input.component';
import { WPMTestProgress } from './wpm-test-progress.component';
import { WPMTestResults } from './wpm-test-results.component';
import { WPMTestWordPassage } from './wpm-test-word-passage.component';
import { WPMTestComboCounter } from './wpm-test-combo-counter.component';
import { WPMTestComboColorBackdrop } from './wpm-test-combo-color-backdrop.component';
import { WPMTestStageGradientFadeOut } from './wpm-test-stage-gradient-fade-out.component';

import type { ComponentProps } from 'react';

export const WPMTestStage = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const { mode: testMode, timeWordAmount } = useBoundStore(
    (state) => state.testModeOptions,
  );
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const openMainMenu = useBoundStore((state) => state.openMainMenu);
  const isComplete = useBoundStore((state) => state.isComplete);
  const setComplete = useBoundStore((state) => state.setComplete);
  const initializeTranscripts = useBoundStore(
    (state) => state.initializeTranscripts,
  );

  const comboColor = useWPMTestComboCounterColorBackdrop();
  const { passageList } = useWPMTestSentenceGenerator();

  const inputRef = useRef<HTMLInputElement>(null);

  const options = useMemo(
    () => ({
      onComplete: setComplete,
    }),
    [setComplete],
  );

  const { timer, reset: resetTimer } = useWPMTestTimer(
    timeWordAmount || 0,
    isPlaying && testMode === TestMode.Time,
    options,
  );

  const { currentWordCount } = useWPMTestWordCounter(
    timeWordAmount || 0,
    isPlaying && testMode === TestMode.Word,
    options,
  );

  const progressValue = useMemo(() => {
    switch (testMode) {
      case TestMode.Time:
        return timer;
      case TestMode.Word:
        return currentWordCount;
      default:
        return 0;
    }
  }, [testMode, timer, currentWordCount]);

  const handleWrapperClick = useCallback(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  useEffect(() => {
    if (!isPlaying && !isComplete) {
      resetTimer();
    }

    if (!isPlaying || isComplete) return;

    initializeTranscripts(passageList[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isComplete]);

  useEffect(() => {
    if (openMainMenu) return;

    setTimeout(() => {
      handleWrapperClick();
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMainMenu]);

  useOnClickOutside(inputRef, handleWrapperClick);

  return (
    <>
      <div
        className={cx('relative z-10 flex flex-col items-center', className)}
        onClick={handleWrapperClick}
        {...moreProps}
      >
        <WPMTestInput ref={inputRef} passageList={passageList} />
        <div className='relative h-[200px] max-w-main'>
          {!isComplete && (
            <WPMTestComboCounter className='!absolute left-1/2 right-auto top-24 -translate-x-1/2 lg:left-auto lg:right-full lg:top-1/2 lg:mr-6 lg:-translate-y-1/2 lg:translate-x-0' />
          )}
          <div className='relative mb-2.5 mt-40 h-[200px] overflow-hidden px-2.5 lg:mt-0 lg:px-0'>
            <WPMTestWordPassage className='h-full' passageList={passageList} />
            {/* Top and bottom fade (gradient) */}
            <WPMTestStageGradientFadeOut className='top-0' color={comboColor} />
            <WPMTestStageGradientFadeOut
              className='bottom-0'
              color={comboColor}
              isBottom
            />
          </div>
          <WPMTestProgress className='px-2.5 lg:px-1' value={progressValue} />
          {isComplete && <WPMTestResults className='mx-auto mt-16' />}
        </div>
      </div>
      <WPMTestComboColorBackdrop />
    </>
  );
});
