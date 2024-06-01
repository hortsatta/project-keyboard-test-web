import { memo, useMemo } from 'react';
import cx from 'classix';

import { TestMode } from '../models/wpm-test.model';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  currentProgressPercent: number;
  mode: TestMode;
  wrapperClassname?: string;
  reverse?: boolean;
  isPlaying?: boolean;
};

export const WPMTestProgressBar = memo(function ({
  className,
  wrapperClassname,
  currentProgressPercent,
  mode,
  reverse,
  isPlaying,
  ...moreProps
}: Props) {
  const progressStyle = useMemo(
    () => ({
      transform: `translateX(${reverse ? -currentProgressPercent : currentProgressPercent}%)`,
    }),
    [currentProgressPercent, reverse],
  );

  const progressClassName = useMemo(() => {
    if (!isPlaying) {
      return 'duration-200';
    }

    return mode === TestMode.Time ? 'duration-1000' : 'duration-150';
  }, [isPlaying, mode]);

  return (
    <div
      className={cx('flex h-8 items-center overflow-hidden', wrapperClassname)}
    >
      <div
        style={progressStyle}
        className={cx(
          'relative h-0.5 w-full rounded-[1px] bg-text transition-transform ease-linear',
          progressClassName,
          className,
        )}
        {...moreProps}
      />
    </div>
  );
});
