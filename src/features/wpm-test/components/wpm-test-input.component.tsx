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
    const isComplete = useBoundStore((state) => state.isComplete);
    const activeIndex = useBoundStore((state) => state.activeIndex);
    const inputValue = useBoundStore((state) => state.inputValue);
    const setInputChange = useBoundStore((state) => state.setInputChange);
    const setInputNext = useBoundStore((state) => state.setInputNext);
    const setInputBack = useBoundStore((state) => state.setInputBack);
    const setOpenMainMenu = useBoundStore((state) => state.setOpenMainMenu);

    const activePassage = useMemo(
      () => passageList[activeIndex + 1],
      [passageList, activeIndex],
    );

    const handleBack = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if ((inputValue as string)?.length > 0) return;

        event.preventDefault();
        setInputBack();
      },
      [inputValue, setInputBack],
    );

    const handleNext = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (inputValue.length < 1) return;

        setInputNext(activePassage);
        setInputChange({
          target: { value: '' },
        } as ChangeEvent<HTMLInputElement>);
      },
      [activePassage, inputValue, setInputNext, setInputChange],
    );

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (isComplete) {
          event.preventDefault();
          return;
        }

        setInputChange(event);
      },
      [isComplete, setInputChange],
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (isComplete) {
          event.preventDefault();
          return;
        }

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
      [isComplete, handleBack, handleNext],
    );

    const handleKeyUp = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Escape') return;
        setOpenMainMenu();
      },
      [setOpenMainMenu],
    );

    return (
      <input
        ref={ref}
        type='text'
        value={inputValue}
        className={cx('absolute left-0 top-0 -z-10 w-0 opacity-0', className)}
        tabIndex={0}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        autoFocus
        {...moreProps}
      />
    );
  }),
);
