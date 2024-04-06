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
  const { timeWordAmount } = useBoundStore((state) => state.testOptions);
  const { mode } = useBoundStore((state) => state.testOptions);
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
            wrapperClassname={PROGRESS_BAR_CLASSNAME}
            currentProgressPercent={currentProgressPercent}
            mode={mode}
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
            )}
          >
            {points}
          </div>
          <WPMTestProgressBar
            wrapperClassname={PROGRESS_BAR_CLASSNAME}
            currentProgressPercent={currentProgressPercent}
            mode={mode}
            reverse
          />
        </div>
      )}
    </div>
  );
});
