import { memo } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classix';

import { WPMTestToolbarMenu } from '#/wpm-test/components/wpm-test-toolbar-menu.component';
import { useBoundStore } from '../hooks/use-store.hook';

import type { ComponentProps } from 'react';

import logoPng from '#/assets/images/logo.svg';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Typen';

export const CoreHeader = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'header'>) {
  const isMinimalUI = useBoundStore((state) => state.isMinimalUI);

  return (
    <header
      className={cx(
        'relative z-50 flex h-[61px] w-full items-center gap-4 transition-opacity duration-500 hover:!pointer-events-auto hover:!opacity-100',
        isMinimalUI && 'pointer-events-none opacity-0',
        className,
      )}
      {...moreProps}
    >
      <Link
        to='/'
        className='relative inline-block w-56 shrink-0 overflow-hidden'
      >
        <h1 className='sr-only'>{APP_TITLE}</h1>
        <img src={logoPng} alt='logo' />
      </Link>
      <WPMTestToolbarMenu className='h-full max-w-main flex-1' />
    </header>
  );
});
