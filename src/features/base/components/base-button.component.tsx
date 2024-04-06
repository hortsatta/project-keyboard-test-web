import { forwardRef, memo, useMemo } from 'react';
import cx from 'classix';

import { BaseIcon } from './base-icon.component';

import type { ComponentProps } from 'react';
import type { ButtonSize, IconName } from '../models/base.model';

type Props = ComponentProps<'button'> & {
  active?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  iconName?: IconName;
  iconProps?: Omit<ComponentProps<typeof BaseIcon>, 'name'>;
};

export const BaseButton = memo(
  forwardRef<HTMLButtonElement, Props>(function (
    {
      className,
      active,
      loading,
      size = 'base',
      iconName,
      iconProps,
      disabled,
      children,
      ...moreProps
    },
    ref,
  ) {
    const iconSize = useMemo(() => (size === 'base' ? undefined : 22), [size]);

    return (
      <button
        ref={ref}
        className={cx(
          'flex items-center justify-center gap-1.5 rounded font-medium text-text text-text/60 transition-colors hover:text-primary',
          size === 'base' && 'py-1 pl-2.5 pr-3.5 ',
          size === 'sm' && 'py-0.5 pl-2 pr-3 text-sm',
          active && 'bg-primary/80 !text-text hover:bg-primary',
          className,
        )}
        disabled={loading || disabled}
        {...moreProps}
      >
        {iconName && (
          <BaseIcon name={iconName} size={iconSize} {...iconProps} />
        )}
        {children && (
          <div
            className={cx(
              'leading-none',
              size === 'base' && 'mt-0.5',
              size === 'sm' && '!mt-px',
            )}
          >
            {children}
          </div>
        )}
      </button>
    );
  }),
);
