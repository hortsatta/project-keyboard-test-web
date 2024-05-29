import { memo, useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { BaseSemiCircleProgress } from '#/base/components/base-semi-circle-progress.component';
import {
  MAX_COMBO_MULTIPLIER,
  STOCK_COMBO_MULTIPLIER_SEC,
} from '../config/wpm-test.config';

import type { ComponentProps } from 'react';
import { BaseIcon } from '#/base/components/base-icon.component';

export const WPMTestComboMultiplierBar = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const { active, stock } = useBoundStore((state) => state.comboMultiplier);
  const { comboMultiplierAutoActivate } = useBoundStore(
    (state) => state.testSystemOptions,
  );
  const activateComboMultiplier = useBoundStore(
    (state) => state.activateComboMultiplier,
  );
  const clearComboMultiplier = useBoundStore(
    (state) => state.clearComboMultiplier,
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const timeMs = useRef<number>(0);
  const prevMs = useRef<number>(timeMs.current);
  const [timer, setTimer] = useState(0);

  const percent = useMemo(
    () =>
      Math.floor(
        (timer / (MAX_COMBO_MULTIPLIER * STOCK_COMBO_MULTIPLIER_SEC)) * 100,
      ),
    [timer],
  );

  useEffect(() => {
    if (!active || timeMs.current <= 0) return;

    const initialTimeMs = timeMs.current;
    let initialTimestampMs: number;
    let handle: number;

    const step = (timestampMs: number) => {
      if (initialTimestampMs === undefined) {
        initialTimestampMs = timestampMs;
      }

      const elapsed = timestampMs - initialTimestampMs;
      timeMs.current = initialTimeMs - elapsed;

      if (timeMs.current <= 0) {
        setTimer(0);
        cancelAnimationFrame(handle);
        clearComboMultiplier();
      } else {
        const seconds = Math.floor(timeMs.current / 1000);
        const isUpdate = seconds !== Math.floor(prevMs.current / 1000);

        prevMs.current = timeMs.current;

        if (isUpdate) {
          setTimer(seconds);
        }

        if (active) {
          handle = window.requestAnimationFrame(step);
        }
      }
    };

    handle = window.requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const timeSec = stock * STOCK_COMBO_MULTIPLIER_SEC;

    setTimer(timeSec);
    timeMs.current = timeSec * 1000;
    prevMs.current = timeSec * 1000;
  }, [stock]);

  useEffect(() => {
    if (active || percent < 100 || !comboMultiplierAutoActivate) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      activateComboMultiplier(true);
    }, 300);

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, active, comboMultiplierAutoActivate]);

  return (
    <div className={cx('relative', className)} {...moreProps}>
      <div className={cx(active && 'animate-pulse-fast')}>
        <BaseSemiCircleProgress
          className={cx(
            stock === 1 && 'animate-pulse-once',
            active && '!animate-error',
          )}
          percent={percent}
          active={active}
          primary={stock >= 1}
        />
      </div>
      <div
        className={cx(
          'absolute -bottom-11 left-1/2 flex -translate-x-1/2 animate-rating-fast flex-col items-center justify-center transition-opacity',
          !active && stock >= 1 ? 'opacity-80' : 'opacity-0',
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
