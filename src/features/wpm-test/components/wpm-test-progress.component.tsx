import { memo, useEffect, useMemo } from 'react';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { useWPMTestTimer } from '../hooks/use-wpm-test-countdown.hook';
import { WPMTestProgressBar } from './wpm-test-progress-bar.component';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  mode: 'time' | 'word';
  endTimeSec?: number;
};

const PROGRESS_BAR_CLASSNAME = 'flex-1 opacity-30';

export const WPMTestProgress = memo(function ({
  className,
  endTimeSec,
  mode,
  ...moreProps
}: Props) {
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const stopPlaying = useBoundStore((state) => state.stopPlaying);
  const { timer, start } = useWPMTestTimer(endTimeSec || 0, {
    onComplete: stopPlaying,
  });

  const currentPoints = useMemo(() => {
    if (mode === 'time') {
      return timer.toString().padStart(3, '0');
    }
  }, [mode, timer]);

  const currentProgressValue = useMemo(() => {
    if (mode === 'time') {
      return timer;
    } else {
      return 0;
    }
  }, [mode, timer]);

  const maxProgressValue = useMemo(() => {
    if (mode === 'time') {
      return endTimeSec;
    } else {
      return 0;
    }
  }, [mode, endTimeSec]);

  const currentProgressPercent = useMemo(
    () =>
      100 - Math.ceil((currentProgressValue / (maxProgressValue || 0)) * 100),
    [currentProgressValue, maxProgressValue],
  );

  useEffect(() => {
    isPlaying && start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  return (
    <div className={cx('w-full', className)} {...moreProps}>
      {maxProgressValue != null && (
        <div className='flex w-full items-center'>
          <WPMTestProgressBar
            wrapperClassname={PROGRESS_BAR_CLASSNAME}
            currentProgressPercent={currentProgressPercent}
          />
          <div
            className={cx(
              'px-2.5 text-[26px] transition-colors',
              isPlaying ? 'text-text/80' : 'text-text/40',
              isPlaying &&
                currentProgressPercent >= 90 &&
                'animate-pulse-fast !text-red-500',
            )}
          >
            {currentPoints}
          </div>
          <WPMTestProgressBar
            wrapperClassname={PROGRESS_BAR_CLASSNAME}
            currentProgressPercent={currentProgressPercent}
            reverse
          />
        </div>
      )}
      {/* TODO Combo */}
    </div>
  );
});
