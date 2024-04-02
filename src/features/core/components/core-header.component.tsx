import { memo } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classix';

import { WPMTestToolbarMenu } from '#/wpm-test/components/wpm-test-toolbar-menu.component';

import type { ComponentProps } from 'react';

import logoPng from '#/assets/images/logo.svg';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Typen';

export const CoreHeader = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'header'>) {
  return (
    <header
      className={cx(
        'relative z-50 flex h-[61px] w-full items-center gap-4',
        className,
      )}
      {...moreProps}
    >
      <Link
        to='/'
        className='relative inline-block w-56 shrink-0 overflow-hidden'
      >
        <h1 className='absolute left-full top-full'>{APP_TITLE}</h1>
        <img src={logoPng} alt='logo' />
      </Link>
      <WPMTestToolbarMenu className='max-w-main pl-2 pr-4' />
    </header>
  );
});
