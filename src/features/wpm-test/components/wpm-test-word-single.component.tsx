import { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import cx from 'classix';

import { useWPMTestWordSingle } from '../hooks/use-wpm-test-word-single.hook';
import { WPMTestWordMark } from './wpm-test-word-mark.component';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  value: string;
  inputValue?: string;
  active?: boolean;
  onPerfect?: (rect?: DOMRect) => void;
};

export const WPMTestWordSingle = memo(
  forwardRef<HTMLElement, Props>(function (
    { className, value, inputValue, active, onPerfect, ...moreProps },
    ref,
  ) {
    const localRef = useRef<HTMLElement | null>(null);

    const { inputValueList, wasteInputValue, isDirty, isExact, isPerfect } =
      useWPMTestWordSingle(value, inputValue, active);

    const handleMergeRefs = useCallback(
      (instance: HTMLElement) => {
        // Set localRef
        localRef.current = instance;
        // Set forwardRef
        if (!ref) {
          return;
        }

        typeof ref === 'function' ? ref(instance) : (ref.current = instance);
      },
      [ref],
    );

    useEffect(() => {
      if (isDirty && !active && isExact && isPerfect) {
        const { width, height } =
          localRef.current?.getBoundingClientRect() || {};
        const left = localRef.current?.offsetLeft || 0;
        const top = localRef.current?.offsetTop || 0;

        onPerfect && onPerfect({ width, height, left, top } as DOMRect);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, isDirty, isExact, isPerfect]);

    return (
      <span
        ref={handleMergeRefs}
        className={cx(
          'relative my-1',
          isDirty && !isExact && !active && 'animate-error',
          className,
        )}
        {...moreProps}
      >
        {isDirty && !active && (
          <WPMTestWordMark
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
