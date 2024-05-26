import { forwardRef, memo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'input'> & {
  description?: string;
  wrapperProps?: ComponentProps<'div'>;
};

export const BaseInput = memo(
  forwardRef<HTMLInputElement, Props>(function (
    {
      className,
      description,
      wrapperProps: { className: wrapperClassName, ...moreWrapperProps } = {},
      ...moreProps
    },
    ref,
  ) {
    return (
      <div
        className={cx(
          'inline-flex flex-col items-end gap-y-1',
          wrapperClassName,
        )}
        {...moreWrapperProps}
      >
        <input
          ref={ref}
          className={cx(
            'w-full rounded-sm border-b-2 border-primary bg-transparent px-2.5 py-1 outline-none',
            className,
          )}
          {...moreProps}
        />
        {description && (
          <span className='text-sm font-light uppercase opacity-70'>
            {description}
          </span>
        )}
      </div>
    );
  }),
);
