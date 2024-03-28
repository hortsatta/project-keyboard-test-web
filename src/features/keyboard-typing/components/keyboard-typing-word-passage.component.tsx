import { Fragment, memo } from 'react';
import cx from 'classix';

import { useKeyboardTypeingPassage } from '../hooks/use-keyboard-typing-word-passage.hook';
import { KeyboardTypingWordSingle } from './keyboard-typing-word-single.component';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  activeIndex: number;
  value?: string;
  inputValue?: string;
  fullInputValue?: string;
};

export const KeyboardTypingWordPassage = memo(function ({
  className,
  value,
  inputValue,
  fullInputValue,
  activeIndex,
  ...moreProps
}: Props) {
  const {
    wrapperRef,
    charSampleRef,
    wrapperStyle,
    textCursorStyle,
    wordStyle,
    valueList,
    fullInputValueList,
    handleActiveWordRef,
  } = useKeyboardTypeingPassage(value, inputValue, fullInputValue);

  return (
    <div
      ref={wrapperRef}
      style={wrapperStyle}
      className={cx(
        'relative flex h-[160px] max-w-4xl flex-wrap items-baseline overflow-hidden text-xl font-light leading-8',
        className,
      )}
      {...moreProps}
    >
      {/* Create sample tag for char width */}
      <i
        ref={charSampleRef}
        className='absolute left-0 top-0 -z-10 not-italic opacity-0'
      >
        q
      </i>
      {/* Create text cursor */}
      <div
        style={textCursorStyle}
        className='absolute -ml-px -mt-px animate-blink border-l-2 border-primary bg-gradient-to-r from-primary/30 transition-transform duration-75'
      />
      {valueList?.map((str, index) => (
        <Fragment key={`word-${index}`}>
          {activeIndex === index ? (
            <KeyboardTypingWordSingle
              ref={handleActiveWordRef}
              style={wordStyle}
              value={str}
              inputValue={inputValue}
              active
            />
          ) : (
            <KeyboardTypingWordSingle
              style={wordStyle}
              value={str}
              inputValue={fullInputValueList[index]}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
});
