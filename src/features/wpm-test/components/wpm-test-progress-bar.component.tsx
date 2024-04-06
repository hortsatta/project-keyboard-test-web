import { memo, useMemo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';
import { TestMode } from '../models/wpm-test.model';

type Props = ComponentProps<'div'> & {
  currentProgressPercent: number;
  mode: TestMode;
  wrapperClassname?: string;
  reverse?: boolean;
};

export const WPMTestProgressBar = memo(function ({
  wrapperClassname,
  currentProgressPercent,
  mode,
  reverse,
  ...moreProps
}: Props) {
  const progressStyle = useMemo(
    () => ({
      transform: `translateX(${reverse ? -currentProgressPercent : currentProgressPercent}%)`,
    }),
    [currentProgressPercent, reverse],
  );

  return (
    <div
      className={cx('flex h-8 items-center overflow-hidden', wrapperClassname)}
    >
      <div
        style={progressStyle}
        className={cx(
          'relative h-0.5 w-full rounded-[1px] bg-text transition-transform ease-linear',
          mode === TestMode.Time ? 'duration-1000' : 'duration-150',
        )}
        {...moreProps}
      />
    </div>
  );
});
