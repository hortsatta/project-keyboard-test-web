import { memo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

import iconNotCorrectPng from '#/assets/images/icon-not-correct.png';
import iconPerfectPng from '#/assets/images/icon-perfect.png';
import iconPerfect2Png from '#/assets/images/icon-perfect-2.png';

type Props = ComponentProps<'div'> & {
  isCorrect: boolean;
  perfectCat: number;
};

const IMG_CLASSNAME = 'h-1.5 w-1.5';

export const WPMTestWordMark = memo(function ({
  className,
  isCorrect,
  perfectCat,
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
        perfectCat > 0 && (
          <img
            src={perfectCat === 1 ? iconPerfectPng : iconPerfect2Png}
            alt='perfect'
            className={cx(IMG_CLASSNAME, perfectCat > 1 && '!w-[14px]')}
          />
        )
      )}
    </div>
  );
});
