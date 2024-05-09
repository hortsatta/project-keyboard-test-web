import { memo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

import iconNotCorrectPng from '#/assets/images/icon-not-correct.png';
import iconPerfectPng from '#/assets/images/icon-perfect.png';

type Props = ComponentProps<'div'> & {
  isCorrect?: boolean;
  isPerfect?: boolean;
};

const IMG_CLASSNAME = 'h-1.5 w-1.5';

export const WPMTestWordMark = memo(function ({
  className,
  isCorrect,
  isPerfect,
  ...moreProps
}: Props) {
  return (
    <div className={cx('absolute', className)} {...moreProps}>
      {!isCorrect ? (
        <img
          src={iconNotCorrectPng}
          alt='not correct'
          className={IMG_CLASSNAME}
        />
      ) : (
        isPerfect && (
          <img src={iconPerfectPng} alt='perfect' className={IMG_CLASSNAME} />
        )
      )}
    </div>
  );
});
