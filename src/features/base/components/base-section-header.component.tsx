import { memo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

export const BaseSectionHeader = memo(function ({
  className,
  children,
  ...moreProps
}: ComponentProps<'h4'>) {
  return (
    <h4
      className={cx(
        '-scale-100 text-sm font-normal uppercase text-primary/60 [writing-mode:vertical-lr]',
        className,
      )}
      {...moreProps}
    >
      {children}
    </h4>
  );
});
