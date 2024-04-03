import { forwardRef, memo, useCallback, useMemo } from 'react';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';

import type { ChangeEvent, ComponentProps, KeyboardEvent } from 'react';

type Props = ComponentProps<'input'> & {
  passageList: string[];
};

export const WPMTestInput = memo(
  forwardRef<HTMLInputElement, Props>(function (
    { className, passageList, ...moreProps },
    ref,
  ) {
    const isPlaying = useBoundStore((state) => state.isPlaying);
    const activeIndex = useBoundStore((state) => state.activeIndex);
    const inputValue = useBoundStore((state) => state.inputValue);
    const transcripts = useBoundStore((state) => state.transcripts);
    const setInputChange = useBoundStore((state) => state.setInputChange);
    const setInputNext = useBoundStore((state) => state.setInputNext);
    const setInputBack = useBoundStore((state) => state.setInputBack);

    const activePassage = useMemo(
      () => passageList[activeIndex + 1],
      [passageList, activeIndex],
    );

    const handleBack = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if ((inputValue as string)?.length > 0) {
          return;
        }
        event.preventDefault();
        setInputBack();
      },
      [inputValue, setInputBack],
    );

    const handleNext = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInputNext(activePassage);
        setInputChange({
          target: { value: '' },
        } as ChangeEvent<HTMLInputElement>);
      },
      [activePassage, setInputNext, setInputChange],
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        // Prevent arrow keys for text cursor movement
        if (
          event.key === 'ArrowUp' ||
          event.key === 'ArrowRight' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          ((event.ctrlKey || event.metaKey) && event.key === 'z') ||
          ((event.ctrlKey || event.metaKey) && event.key === 'r')
        ) {
          event.preventDefault();
        }

        if (event.key === 'Backspace') {
          handleBack(event);
        } else if (event.key === ' ') {
          handleNext(event);
        }
      },
      [handleBack, handleNext],
    );

    return (
      <input
        ref={ref}
        type='text'
        value={inputValue}
        className={cx('absolute left-0 top-0 -z-10 w-0', className)}
        tabIndex={0}
        onChange={setInputChange}
        onKeyDown={handleKeyDown}
        disabled={!isPlaying && !!transcripts.length}
        autoFocus
        {...moreProps}
      />
    );
  }),
);
