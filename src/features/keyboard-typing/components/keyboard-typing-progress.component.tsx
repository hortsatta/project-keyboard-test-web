import { memo, useEffect, useMemo } from 'react';
import cx from 'classix';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { useKeyboardTypingTimer } from '../hooks/use-keyboard-typing-countdown.hook';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  mode: 'time' | 'word';
  endTimeSec?: number;
};

export const KeyboardTypingProgress = memo(function ({
  className,
  endTimeSec,
  mode,
  ...moreProps
}: Props) {
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const stopPlaying = useBoundStore((state) => state.stopPlaying);
  const { timer, start } = useKeyboardTypingTimer(endTimeSec || 0, {
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
    <div className={cx('w-full', className)} {...moreProps}>
      <div className='flex w-full items-center'>
        <div className='h-5 flex-1'>
          <div className='h-full w-full bg-primary' />
        </div>
        <div>{currentPoints}</div>
        <div className='h-5 flex-1'>
          <div className='h-full w-full bg-primary' />
        </div>
      </div>
      {/* TODO Combo */}
    </div>
  );
});
