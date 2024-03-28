import { forwardRef, memo } from 'react';
import cx from 'classix';

import { useKeyboardTypingWordSingle } from '../hooks/use-keyboard-typing-word-single.hook';
import { KeyboardTypingWordMark } from './keyboard-typing-word-mark.component';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  value: string;
  inputValue?: string;
  active?: boolean;
};

export const KeyboardTypingWordSingle = memo(
  forwardRef<HTMLElement, Props>(function (
    { className, value, inputValue, active, ...moreProps },
    ref,
  ) {
    const { inputValueList, wasteInputValue, isDirty, isExact, isPerfect } =
      useKeyboardTypingWordSingle(value, inputValue, active);

    return (
      <span ref={ref} className={cx('relative my-1', className)} {...moreProps}>
        {isDirty && !active && (
          <KeyboardTypingWordMark
            className='-bottom-1 left-1/2 -translate-x-1/2'
            isCorrect={isExact}
            isPerfect={isPerfect}
          />
        )}
        {value.split('').map((char, index) => (
          <i
            key={`char-${index}`}
            className={cx(
              'relative z-10 inline-block not-italic transition-all duration-75',
              inputValueList[index] == null ? 'opacity-40' : 'opacity-80',
              inputValueList[index] != null &&
                inputValueList[index] !== char &&
                'text-rose-300',
              inputValueList[index] != null &&
                inputValueList[index] !== char &&
                active &&
                '-translate-y-2',
            )}
          >
            {active && (
              <i
                className={cx(
                  'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[9px] text-xs font-medium not-italic text-white',
                  inputValueList[index] !== char ? 'opacity-60' : 'opacity-0',
                )}
              >
                {inputValueList[index]}
              </i>
            )}
            {char}
          </i>
        ))}
        {wasteInputValue?.trim() &&
          wasteInputValue.split('').map((char, index) => (
            <i
              key={`char-${index}`}
              className='not-italic text-rose-300 opacity-50'
            >
              {char}
            </i>
          ))}
      </span>
    );
  }),
);
