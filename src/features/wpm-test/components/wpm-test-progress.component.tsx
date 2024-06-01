import { memo, useMemo } from 'react';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { WPMTestProgressBar } from './wpm-test-progress-bar.component';

import type { ComponentProps } from 'react';
import { TestMode } from '../models/wpm-test.model';

const PROGRESS_BAR_CLASSNAME = 'flex-1 opacity-30';

type Props = ComponentProps<'div'> & {
  value: number;
};

export const WPMTestProgress = memo(function ({
  className,
  value,
  ...moreProps
}: Props) {
  const { mode, timeWordAmount } = useBoundStore(
    (state) => state.testModeOptions,
  );
  const comboCounterCount = useBoundStore((state) => state.comboCounter.count);
  const isPlaying = useBoundStore((state) => state.isPlaying);

  const points = useMemo(() => value.toString().padStart(3, '0'), [value]);

  const currentProgressPercent = useMemo(
    () => 100 - Math.ceil((value / timeWordAmount) * 100),
    [value, timeWordAmount],
  );

  return (
    <div className={cx('w-full', className)} {...moreProps}>
      {timeWordAmount != null && (
        <div className='flex w-full items-center'>
          <WPMTestProgressBar
            className={cx(
              isPlaying &&
                comboCounterCount >= 100 &&
                'max-combo animate-max-combo',
            )}
            wrapperClassname={cx(
              PROGRESS_BAR_CLASSNAME,
              isPlaying && comboCounterCount >= 100 && '!opacity-80',
            )}
            currentProgressPercent={currentProgressPercent}
            mode={mode}
            isPlaying={isPlaying}
          />
          <div
            className={cx(
              'px-2.5 text-[26px] transition-colors',
              isPlaying ? 'text-primary/80' : 'text-text/40',
              isPlaying && currentProgressPercent >= 90 && 'animate-pulse-fast',
              isPlaying &&
                currentProgressPercent >= 90 &&
                mode === TestMode.Time &&
                '!text-red-500',
              isPlaying &&
                comboCounterCount >= 100 &&
                'max-combo max-combo-mask animate-max-combo',
            )}
          >
            {points}
          </div>
          <WPMTestProgressBar
            className={cx(
              isPlaying &&
                comboCounterCount >= 100 &&
                'max-combo animate-max-combo',
            )}
            wrapperClassname={cx(
              PROGRESS_BAR_CLASSNAME,
              isPlaying && comboCounterCount >= 100 && '!opacity-80',
            )}
            currentProgressPercent={currentProgressPercent}
            mode={mode}
            isPlaying={isPlaying}
            reverse
          />
        </div>
      )}
    </div>
  );
});
