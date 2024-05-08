import { memo, useMemo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  color?: string;
  isBottom?: boolean;
};

export const WPMTestStageGradientFadeOut = memo(function ({
  className,
  color,
  isBottom,
}: Props) {
  const beforeGradientStyle = useMemo(
    () => ({
      backgroundColor: color,
    }),
    [color],
  );

  const gradientStyle = useMemo(() => {
    if (!color) {
      return undefined;
    }

    if (!isBottom) {
      return {
        backgroundImage: `linear-gradient(to bottom, ${color}, transparent)`,
      };
    } else {
      return {
        backgroundImage: `linear-gradient(to top, ${color}, transparent)`,
      };
    }
  }, [color, isBottom]);

  return (
    <div className={cx('absolute z-20 flex h-12 w-full flex-col', className)}>
      {!isBottom ? (
        <>
          <div
            style={beforeGradientStyle}
            className='h-3.5 w-full bg-backdrop'
          />
          <div
            style={gradientStyle}
            className='w-full flex-1 bg-gradient-to-b from-backdrop to-transparent'
          />
        </>
      ) : (
        <>
          <div
            style={gradientStyle}
            className='w-full flex-1 bg-gradient-to-t from-backdrop to-transparent'
          />
          <div style={beforeGradientStyle} className='h-2 w-full bg-backdrop' />
        </>
      )}
    </div>
  );
});
