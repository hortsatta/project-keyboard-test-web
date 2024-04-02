import { memo, useCallback, useMemo, useRef } from 'react';
import levenshtein from 'damerau-levenshtein';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { WPMTestInput } from './wpm-test-input.component';
import { WPMTestProgress } from './wpm-test-progress.component';
import { WPMTestWordPassage } from './wpm-test-word-passage.component';
import { WPMTestComboCounter } from './wpm-test-combo-counter.component';

import type { ComponentProps } from 'react';
import { TestMode } from '../models/wpm-test.model';

const TEMP_VALUE =
  'love is not like pizza everyone pretends to like wheat until you mention barley you have every right to be angry but that does give you the right to be mean the water flowing down the river did look that powerful from the car the efficiency we have at removing trash has made creating trash more acceptable flesh yoga pants were far worse than even he feared love is not like pizza everyone pretends to like wheat until you mention barley you have every right to be angry but that does give you the right';

export const WPMTestStage = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const activeIndex = useBoundStore((state) => state.activeIndex);
  const inputValue = useBoundStore((state) => state.inputValue);
  const fullInputValue = useBoundStore((state) => state.fullInputValue);
  const comboCounterCount = useBoundStore((state) => state.comboCounter.count);
  const setInputChange = useBoundStore((state) => state.setInputChange);
  const setInputNext = useBoundStore((state) => state.setInputNext);
  const setInputBack = useBoundStore((state) => state.setInputBack);
  const resetComboCounter = useBoundStore((state) => state.resetComboCounter);
  const inputRef = useRef<HTMLInputElement>(null);

  const valueList = useMemo(
    () => TEMP_VALUE?.split(/(\s+)/).filter((str) => str.trim().length > 0),
    [],
  );

  const handleWrapperClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputNext = useCallback(() => {
    const { similarity } = levenshtein(
      valueList[activeIndex],
      inputValue || '',
    );

    similarity !== 1 && resetComboCounter();
    setInputNext();
  }, [activeIndex, inputValue, valueList, setInputNext, resetComboCounter]);

  return (
    <div
      className={cx('relative flex flex-col items-center', className)}
      onClick={handleWrapperClick}
      {...moreProps}
    >
      <WPMTestInput
        ref={inputRef}
        value={inputValue}
        onChange={setInputChange}
        onNext={handleInputNext}
        onBack={setInputBack}
        onBackspace={resetComboCounter}
        disabled={!isPlaying && fullInputValue != null}
      />
      <div className='max-w-main relative h-[200px]'>
        <WPMTestComboCounter
          className='!absolute right-full top-1/2 mr-6 -translate-y-1/2'
          count={comboCounterCount}
        />
        <div className='relative mb-2.5 h-[200px] overflow-hidden'>
          <WPMTestWordPassage
            className='h-full'
            value={TEMP_VALUE}
            activeIndex={activeIndex}
            inputValue={inputValue}
            fullInputValue={fullInputValue}
          />
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
        <WPMTestProgress
          className='px-1'
          mode={TestMode.Time}
          endTimeSec={60}
        />
      </div>
    </div>
  );
});
