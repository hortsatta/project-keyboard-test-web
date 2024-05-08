import { memo } from 'react';
import { Switch } from '@headlessui/react';
import cx from 'classix';

import type { ComponentProps, ReactNode } from 'react';

type Props = ComponentProps<typeof Switch> & {
  enabled: boolean;
};

export const BaseSwitchToggle = memo(function ({
  className,
  enabled,
  children,
  ...moreProps
}: Props) {
  return (
    <Switch
      className={cx('group/switch flex items-center text-sm', className)}
      {...moreProps}
    >
      <div className='relative mr-4 inline-flex h-7 w-14 shrink-0 cursor-pointer rounded border border-primary bg-green-950 p-0.5 outline-none transition-colors duration-200 ease-in-out'>
        <div
          aria-hidden='true'
          className={cx(
            'pointer-events-none relative inline-block h-[22px] w-[22px] transform overflow-hidden rounded-sm border border-primary ring-0 transition duration-200 ease-in-out',
            enabled
              ? 'translate-x-[calc(100%+6px)] bg-primary'
              : 'translate-x-0',
          )}
        >
          <div className='absolute left-1/2 top-1/2 h-[calc(100%+8px)] w-[calc(100%+8px)] -translate-x-1/2 -translate-y-1/2 rotate-45'>
            <div className='absolute top-1/2 w-full -translate-y-1/2 border-b border-primary' />
            <div className='absolute left-1/2 h-full -translate-x-1/2 border-r border-primary' />
          </div>
        </div>
      </div>
      <div className='transition-colors group-hover/switch:text-primary'>
        {children as ReactNode}
      </div>
    </Switch>
  );
});
