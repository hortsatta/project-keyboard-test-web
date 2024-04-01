import { memo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

export const WPMTestToolbarMenu = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  return (
    <div
      className={cx('h-8 w-full rounded-sm bg-primary/10', className)}
      {...moreProps}
    >
      {/* time */}
      {/* word */}
      {/* refresh */}
    </div>
  );
});
