import { memo, useMemo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  value: number;
  maxValue: number;
  wrapperClassname?: string;
  reverse?: boolean;
};

export const WPMTestProgressBar = memo(function ({
  wrapperClassname,
  value,
  maxValue,
  reverse,
  ...moreProps
}: Props) {
  const currentProgressPercent = useMemo(
    () => 100 - Math.ceil((value / maxValue) * 100),
    [value, maxValue],
  );

  const progressStyle = useMemo(
    () => ({
      transform: `translateX(${reverse ? -currentProgressPercent : currentProgressPercent}%)`,
    }),
    [currentProgressPercent, reverse],
  );

  return (
    <div className={cx('overflow-hidden', wrapperClassname)}>
      <div
        style={progressStyle}
        className='h-full w-full rounded-[1px] bg-primary/50 transition-transform duration-1000 ease-linear'
        {...moreProps}
      />
    </div>
  );
});
