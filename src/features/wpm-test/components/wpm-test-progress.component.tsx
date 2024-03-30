import { memo, useEffect, useMemo } from 'react';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { useWPMTestTimer } from '../hooks/use-wpm-test-countdown.hook';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  mode: 'time' | 'word';
  endTimeSec?: number;
};

export const WPMTestProgress = memo(function ({
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

  useEffect(() => {
    isPlaying && start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  return (
    <div {...moreProps}>
      <div className='text-3xl text-primary'>{currentPoints}</div>
      {/* TODO Combo */}
    </div>
  );
});
