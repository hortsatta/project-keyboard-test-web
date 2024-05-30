import { memo } from 'react';
import cx from 'classix';

import { BaseSemiCircleProgress } from '#/base/components/base-semi-circle-progress.component';
import { BaseIcon } from '#/base/components/base-icon.component';
import { MIN_ACTIVE_STOCK_COMBO_MULTIPLIER } from '../config/wpm-test.config';
import { useWPMTestComboMultiplier } from '../hooks/use-wpm-test-combo-multiplier.component';

import type { ComponentProps } from 'react';

export const WPMTestComboMultiplierBar = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const { active, stock, percent } = useWPMTestComboMultiplier();

  return (
    <div className={cx('relative', className)} {...moreProps}>
      <div className={cx(active && 'animate-pulse-fast')}>
        <BaseSemiCircleProgress
          className={cx(
            stock === MIN_ACTIVE_STOCK_COMBO_MULTIPLIER && 'animate-pulse-once',
            active && '!animate-error',
          )}
          percent={percent}
          active={active}
          primary={stock >= MIN_ACTIVE_STOCK_COMBO_MULTIPLIER}
        />
      </div>
      <div
        className={cx(
          'absolute -bottom-11 left-1/2 flex -translate-x-1/2 animate-rating-fast flex-col items-center justify-center transition-opacity',
          !active && stock >= MIN_ACTIVE_STOCK_COMBO_MULTIPLIER
            ? 'opacity-80'
            : 'opacity-0',
        )}
      >
        <div className='flex h-[18px] items-start overflow-hidden'>
          <BaseIcon
            name='arrow-up'
            weight='thin'
            size={24}
            className='fill-primary/70'
          />
        </div>
        <kbd className='rounded-t border border-b-0 border-border px-2 py-1 text-xs leading-none text-primary/80'>
          control
        </kbd>
      </div>
    </div>
  );
});
