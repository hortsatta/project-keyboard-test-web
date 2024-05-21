import { forwardRef } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  title?: string;
};

export const BaseScene = forwardRef<HTMLDivElement, Props>(function (
  { className, title, children, ...moreProps },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'relative mx-auto mt-10 flex w-full flex-col items-start justify-start pb-20',
        className,
      )}
      {...moreProps}
    >
      {title && <h1 className='mb-5'>{title}</h1>}
      {children}
    </div>
  );
});
