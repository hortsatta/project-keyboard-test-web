import { memo, useCallback, useRef } from 'react';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { WPMTestInput } from './wpm-test-input.component';
import { WPMTestProgress } from './wpm-test-progress.component';
import { WPMTestWordPassage } from './wpm-test-word-passage.component';

import type { ComponentProps } from 'react';

const TEMP_VALUE =
  'love is not like pizza everyone pretends to like wheat until you mention barley you have every right to be angry but that does give you the right to be mean the water flowing down the river did look that powerful from the car the efficiency we have at removing trash has made creating trash more acceptable flesh yoga pants were far worse than even he feared';

export const WPMTestStage = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const activeIndex = useBoundStore((state) => state.activeIndex);
  const inputValue = useBoundStore((state) => state.inputValue);
  const fullInputValue = useBoundStore((state) => state.fullInputValue);
  const setInputChange = useBoundStore((state) => state.setInputChange);
  const setInputNext = useBoundStore((state) => state.setInputNext);
  const setInputBack = useBoundStore((state) => state.setInputBack);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleWrapperClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

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
        onNext={setInputNext}
        onBack={setInputBack}
      />
      <WPMTestProgress
        className='max-w-4xl px-1.5'
        mode='time'
        endTimeSec={60}
      />
      <div className='relative h-[240px] overflow-hidden'>
        <WPMTestWordPassage
          className='h-full max-w-4xl'
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
    </div>
  );
});
