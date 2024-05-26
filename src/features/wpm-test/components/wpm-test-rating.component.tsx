import { memo, useMemo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

import ratingBgPng from '#/assets/images/rating-bg.png';

type Props = ComponentProps<'div'> & {
  rating: string;
};

const ratingBgStyle = {
  backgroundImage: `url(${ratingBgPng})`,
};

const ratings = {
  e: {
    color: 'green',
    gradient: '#45d94a, #45d94a, #2b8b2e, #45d94a',
    strokeGradient: '#51ff57, #37b13b, #37b13b, #51ff57',
  },
  d: {
    color: 'orange',
    gradient: '#ff841f, #ff841f, #b65200, #ff841f',
    strokeGradient: '#ff9f51, #e86900, #e86900, #ff9f51',
  },
  c: {
    color: 'red',
    gradient: '#f42b2b, #f42b2b, #ad0909, #f42b2b',
    strokeGradient: '#f65a5a, #dd0c0c, #dd0c0c, #f65a5a',
  },
  b: {
    color: 'yellow',
    gradient: '#ffc91f, #ffc91f, #b68a00, #ffc91f',
    strokeGradient: '#ffd551, #e8b000, #e8b000, #ffd551',
  },
  a: {
    color: 'violet',
    gradient: '#7d2bf4, #7d2bf4, #4c09ad, #7d2bf4',
    strokeGradient: '#9a5af6, #610cdd, #610cdd, #9a5af6',
  },
  s: {
    color: 'white',
    gradient: '#dfdcdc, #dfdcdc, #8a8a8a, #dfdcdc',
    strokeGradient: '#ffffff, #b2b2b2, #b2b2b2, #ffffff',
  },
  sss: {
    color: 'green',
    gradient: '#45d94a, #45d94a, #2b8b2e, #45d94a',
    strokeGradient: '#51ff57, #37b13b, #37b13b, #51ff57',
  },
};

export const WPMTestRating = memo(function ({
  className,
  rating,
  ...moreProps
}: Props) {
  const ratingGradientStyle = useMemo(
    () => [
      {
        backgroundColor: (ratings as any)[rating].color,
        backgroundImage: `linear-gradient(${(ratings as any)[rating].strokeGradient})`,
      },
      {
        backgroundColor: (ratings as any)[rating].color,
        backgroundImage: `radial-gradient(${(ratings as any)[rating].gradient})`,
      },
    ],
    [rating],
  );

  return (
    <div className={cx('relative', className)} {...moreProps}>
      <div className='relative z-10 animate-rating-reveal'>
        <div
          className={cx(
            'rating-mask absolute left-0 top-0 z-10',
            `rating-${rating}-stroke`,
          )}
        >
          <div
            style={ratingGradientStyle[0]}
            className={cx(
              'h-[200px] w-[281px]',
              rating === 'sss'
                ? 'animate-rating-sss-fast'
                : 'animate-rating-fast',
            )}
          />
        </div>
        <div className={cx('rating-mask', `rating-${rating}`)}>
          <div
            style={ratingGradientStyle[1]}
            className={cx(
              'h-[200px] w-[281px]',
              rating === 'sss' ? 'animate-rating-sss' : 'animate-rating',
            )}
          />
        </div>
      </div>
      <div
        style={ratingBgStyle}
        className='animate-rating-bg-reveal absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 bg-cover bg-no-repeat opacity-80'
      />
    </div>
  );
});
