import { memo, useCallback, useRef, useState } from 'react';
import cx from 'classix';

import { KeyboardTypingInput } from './keyboard-typing-input.component';
import { KeyboardTypingWordPassage } from './keyboard-typing-word-passage.component';

import type { ChangeEvent, ComponentProps } from 'react';

const TEMP_VALUE =
  'love is not like pizza everyone pretends to like wheat until you mention barley you have every right to be angry but that does give you the right to be mean the water flowing down the river did look that powerful from the car the efficiency we have at removing trash has made creating trash more acceptable flesh yoga pants were far worse than even he feared';

export const KeyboardTypingStage = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [fullInputValue, setFullInputValue] = useState('');

  const handleWrapperClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputValue(value);
    },
    [],
  );

  const handleInputNext = useCallback(() => {
    setActiveIndex((prev) => prev + 1);
    setFullInputValue((prev) => prev + ' ' + inputValue);
  }, [inputValue]);

  const handleInputBack = useCallback(() => {
    const targetIndex = activeIndex > 0 ? activeIndex - 1 : 0;
    const fullInputValueList =
      fullInputValue?.split(/(\s+)/).filter((str) => str.trim().length > 0) ||
      [];

    setActiveIndex(targetIndex);
    setInputValue(fullInputValueList[targetIndex] || '');
    setFullInputValue(fullInputValueList.slice(0, -1).join(' '));
  }, [activeIndex, fullInputValue]);

  return (
    <div
      className={cx('relative py-10', className)}
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
      <KeyboardTypingWordPassage
        className='mx-auto h-[160px] max-w-5xl flex-wrap overflow-hidden text-xl leading-8'
        value={TEMP_VALUE}
        activeIndex={activeIndex}
        inputValue={inputValue}
        fullInputValue={fullInputValue}
      />
    </div>
  );
});
