import { memo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

export const WPMTestToolbarMenu = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  return (
    <div
      className={cx(
        'h-full w-full rounded border border-primary/30 bg-primary/10',
        className,
      )}
      {...moreProps}
    >
      {/* time */}
      {/* word */}
      {/* refresh */}
    </div>
  );
});
