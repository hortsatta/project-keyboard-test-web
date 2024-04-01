import { memo, useMemo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  currentProgressPercent: number;
  wrapperClassname?: string;
  reverse?: boolean;
};

export const WPMTestProgressBar = memo(function ({
  wrapperClassname,
  currentProgressPercent,
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
        className='relative h-0.5 w-full rounded-[1px] bg-text transition-transform duration-1000 ease-linear'
        {...moreProps}
      />
    </div>
  );
});
