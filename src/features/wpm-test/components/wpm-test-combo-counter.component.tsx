import { memo } from 'react';
import cx from 'classix';

import { useWPMTestComboCounter } from '../hooks/use-wpm-test-combo-counter.hook';

import type { ComponentProps } from 'react';

export const WPMTestComboCounter = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const {
    count,
    localCount,
    timer,
    wrapperTextClassName,
    textClassName,
    appendCounterClassName,
    removeAppendCounterClassName,
  } = useWPMTestComboCounter();

  return (
    <div
      className={cx('absolute left-1/2 top-2.5 -translate-x-1/2', className)}
      {...moreProps}
    >
      <div
        className={cx(
          'transition-[opacity,transform]',
          count < 2
            ? '-translate-x-2.5 opacity-0'
            : '-translate-x-0 opacity-100',
          count > 1 && timer <= 1 && 'animate-pulse-faster',
        )}
      >
        <div className='absolute left-1/2 -translate-x-1/2 text-4xl font-medium leading-none text-text/80'>
          <span
            className={cx('inline-block', appendCounterClassName)}
            onAnimationEnd={removeAppendCounterClassName}
          >
            {localCount}X
          </span>
        </div>
        <div className={cx('relative z-10', wrapperTextClassName)}>
          <p className='flex flex-col items-center text-4xl'>
            <span
              className={cx(
                'font-medium leading-none transition-colors',
                textClassName,
              )}
            >
              {localCount}X
            </span>
            <span
              className={cx(
                'inline-block overflow-hidden rounded-[1px] bg-gradient-to-b from-[#ffd679] from-30% to-[#b57b06]',
                'px-1.5 py-px text-xs font-bold uppercase leading-[1.2] tracking-tight text-backdrop opacity-90',
              )}
            >
              Perfect
            </span>
          </p>
        </div>
      </div>
    </div>
  );
});
