import { memo, useMemo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  percent: number;
  size?: number;
  active?: boolean;
  primary?: boolean;
};

type SemiCircleProps = ComponentProps<'circle'> & {
  size: number;
  percent?: number;
  active?: boolean;
  primary?: boolean;
};

const STROKE_WIDTH = 4;

const SemiCircle = memo(function ({
  className,
  percent,
  size,
  active,
  primary,
  ...moreProps
}: SemiCircleProps) {
  const r = useMemo(() => size / 2 - STROKE_WIDTH / 2, [size]);
  const strokeDasharray = useMemo(() => 2 * Math.PI * r, [r]);
  const strokeDashoffset = useMemo(
    () =>
      percent != null
        ? ((100 - percent / 2) * strokeDasharray) / 100
        : (50 * strokeDasharray) / 100,
    [percent, strokeDasharray],
  );

  const circleClassName = useMemo(() => {
    if (percent == null) {
      return 'stroke-text/10';
    }

    if (active) {
      return 'animate-max-combo stroke-primary !duration-1000';
    }

    return primary ? 'stroke-primary' : 'stroke-text/40';
  }, [percent, active, primary]);

  return (
    <circle
      className={cx(
        'transition-all duration-300 ease-linear',
        circleClassName,
        className,
      )}
      r={r}
      cx='50%'
      cy='50%'
      fill='transparent'
      strokeWidth={STROKE_WIDTH}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap='round'
      {...moreProps}
    />
  );
});

export const BaseSemiCircleProgress = memo(function ({
  className,
  percent,
  size = 90,
  active,
  primary,
  ...moreProps
}: Props) {
  return (
    <div className={cx('flex items-center', className)} {...moreProps}>
      <div className='relative z-10'>
        <svg width={size} height={size}>
          <g className='origin-center'>
            <SemiCircle size={size} />
            <SemiCircle
              size={size}
              percent={percent}
              active={active}
              primary={primary}
            />
          </g>
        </svg>
      </div>
    </div>
  );
});
