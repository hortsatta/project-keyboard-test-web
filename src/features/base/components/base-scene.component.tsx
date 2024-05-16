import { forwardRef } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

export const BaseScene = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function ({ className, ...moreProps }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'relative flex h-screen w-full flex-col items-center justify-start lg:justify-center',
          className,
        )}
        {...moreProps}
      />
    );
  },
);
