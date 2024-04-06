import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { TestMode } from '../models/wpm-test.model';
import { useWPMTestTimer } from '../hooks/use-wpm-test-timer.hook';
import { useWPMTestWordCounter } from '../hooks/use-wpm-test-word-counter.hook';
import { WPMTestInput } from './wpm-test-input.component';
import { WPMTestProgress } from './wpm-test-progress.component';
import { WPMTestWordPassage } from './wpm-test-word-passage.component';
import { WPMTestComboCounter } from './wpm-test-combo-counter.component';

import type { ComponentProps } from 'react';

const TEMP_VALUE =
  'love is not like pizza everyone pretends to like wheat until you mention barley you have every right to be angry but that does give you the right to be mean the water flowing down the river did look that powerful from the car the efficiency we have at removing trash has made creating trash more acceptable flesh yoga pants were far worse than even he feared love is not like pizza everyone pretends to like wheat until you mention barley you have every right to be angry but that does give you the right';

export const WPMTestStage = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const { mode, timeWordAmount } = useBoundStore((state) => state.testOptions);
  const { mode: testMode } = useBoundStore((state) => state.testOptions);
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const isComplete = useBoundStore((state) => state.isComplete);
  const setComplete = useBoundStore((state) => state.setComplete);
  const initializeTranscripts = useBoundStore(
    (state) => state.initializeTranscripts,
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const options = useMemo(
    () => ({
      onComplete: setComplete,
    }),
    [setComplete],
  );

  const passageList = useMemo(
    () => TEMP_VALUE?.split(/(\s+)/).filter((str) => str.trim().length > 0),
    [],
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
    switch (mode) {
      case TestMode.Time:
        return timer;
      case TestMode.Word:
        return currentWordCount;
      default:
        return 0;
    }
  }, [mode, timer, currentWordCount]);

  const handleWrapperClick = useCallback(() => {
    inputRef.current?.focus();
    if (document.activeElement === inputRef.current) {
      console.log('active');
    }
  }, []);

  useEffect(() => {
    if (!isPlaying && !isComplete) {
      resetTimer();
    }

    if (!isPlaying || isComplete) return;

    initializeTranscripts(passageList[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isComplete]);

  useOnClickOutside(wrapperRef, handleWrapperClick);

  return (
    <div
      ref={wrapperRef}
      className={cx('relative flex flex-col items-center', className)}
      onClick={handleWrapperClick}
      {...moreProps}
    >
      <WPMTestInput ref={inputRef} passageList={passageList} />
      <div className='relative h-[200px] max-w-main'>
        <WPMTestComboCounter className='!absolute right-full top-1/2 mr-6 -translate-y-1/2' />
        <div className='relative mb-2.5 h-[200px] overflow-hidden'>
          <WPMTestWordPassage className='h-full' passageList={passageList} />
          {/* Top and bottom fade (gradient) */}
          <div className='absolute top-0 z-20 flex h-12 w-full flex-col'>
            <div className='h-3.5 w-full bg-backdrop' />
            <div className='w-full flex-1 bg-gradient-to-b from-backdrop to-transparent' />
          </div>
          <div className='absolute bottom-0 z-20 flex h-12 w-full flex-col'>
            <div className='w-full flex-1 bg-gradient-to-t from-backdrop to-transparent' />
            <div className='h-2 w-full bg-backdrop' />
          </div>
        </div>
        <WPMTestProgress className='px-1' value={progressValue} />
      </div>
    </div>
  );
});
