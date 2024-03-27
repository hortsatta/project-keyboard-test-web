import { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import levenshtein from 'damerau-levenshtein';
import cx from 'classix';

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
    const [isDirty, setIsDirty] = useState(false);
    const [isPerfect, setIsPerfect] = useState(true);

    const inputValueList = useMemo(
      () => inputValue?.split('') || [],
      [inputValue],
    );

    const wasteInputValue = useMemo(
      () => inputValue?.slice(value.length),
      [value, inputValue],
    );

    const isExact = useMemo(() => {
      const { similarity } = levenshtein(value, inputValue || '');

      return similarity === 1;
    }, [value, inputValue]);

    // Set dirty status
    useEffect(() => {
      if (!active) {
        return;
      }

      setIsDirty((prev) => {
        if (prev) {
          return true;
        }

        return inputValue?.trim().length ? true : false;
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue]);

    // Check if input has mistake, set as perfect if none
    useEffect(() => {
      if (!isDirty) {
        return;
      }

      const hasMistake = inputValue
        ?.split('')
        .some((char, index) => char !== value[index]);

      if (!hasMistake) {
        return;
      }

      setIsPerfect(false);
    }, [isDirty, value, inputValue]);

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
              inputValueList[index] == null ? 'opacity-30' : 'opacity-80',
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
