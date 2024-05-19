import { forwardRef, memo } from 'react';
import Lottie from 'react-lottie-player';
import cx from 'classix';

import type { ComponentProps } from 'react';
import type { AnimationItem } from 'lottie-web';

import blastEffectJson from '#/assets/json/blast-effect.json';

const WPMTestBlastEffect = memo(
  forwardRef<AnimationItem | undefined, ComponentProps<typeof Lottie>>(
    function ({ className, ...moreProps }, ref) {
      return (
        <Lottie
          ref={ref}
          className={cx(
            'absolute -translate-x-full -translate-y-full opacity-70',
            className,
          )}
          animationData={blastEffectJson}
          renderer='canvas'
          speed={2}
          loop={false}
          {...moreProps}
        />
      );
    },
  ),
);

export default WPMTestBlastEffect;
