import { memo } from 'react';
import cx from 'classix';

import { useKeyboardTypeingStage } from '../hooks/use-keyboard-typing-stage.hook';
import { KeyboardTypingInput } from './keyboard-typing-input.component';
import { KeyboardTypingWordPassage } from './keyboard-typing-word-passage.component';

import type { ComponentProps } from 'react';

const TEMP_VALUE =
  'love is not like pizza everyone pretends to like wheat until you mention barley you have every right to be angry but that does give you the right to be mean the water flowing down the river did look that powerful from the car the efficiency we have at removing trash has made creating trash more acceptable flesh yoga pants were far worse than even he feared';

export const KeyboardTypingStage = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const {
    inputRef,
    inputValue,
    fullInputValue,
    activeIndex,
    handleInputChange,
    handleInputNext,
    handleInputBack,
    handleWrapperClick,
  } = useKeyboardTypeingStage();

  return (
    <div
      className={cx('relative', className)}
      onClick={handleWrapperClick}
      {...moreProps}
    >
      <KeyboardTypingInput
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onNext={handleInputNext}
        onBack={handleInputBack}
      />
      <div className='relative h-[240px] overflow-hidden'>
        <KeyboardTypingWordPassage
          className='mx-auto h-full'
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
