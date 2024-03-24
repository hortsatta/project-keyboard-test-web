import { forwardRef, memo, useCallback } from 'react';
import cx from 'classix';

import type { ChangeEvent, ComponentProps, KeyboardEvent } from 'react';

type Props = ComponentProps<'input'> & {
  onNext?: () => void;
  onBack?: () => void;
};

export const KeyboardTypingInput = memo(
  forwardRef<HTMLInputElement, Props>(function (
    { className, value, onChange, onNext, onBack, ...moreProps },
    ref,
  ) {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const lastValue = value[value.length - 1];

        if (lastValue === ' ') {
          event.target.value = '';
          value.length > 1 && onNext && onNext();
        }

        onChange && onChange(event);
      },
      [onChange, onNext],
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        // Prevent arrow keys for text cursor movement
        if (
          event.key === 'ArrowUp' ||
          event.key === 'ArrowRight' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft'
        ) {
          event.preventDefault();
        }

        if (event.key !== 'Backspace') {
          return;
        }

        (value as string)?.length <= 0 && onBack && onBack();
      },
      [value, onBack],
    );

    return (
      <input
        ref={ref}
        type='text'
        value={value}
        className={cx('absolute left-0 top-0 -z-[1] w-0', className)}
        tabIndex={0}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        {...moreProps}
      />
    );
  }),
);
