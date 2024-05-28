import { memo } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classix';

import type { ComponentProps } from 'react';

import logoPng from '#/assets/images/logo.svg';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Typen';

type Props = ComponentProps<'header'> & {
  isMinimal?: boolean;
  noHeader?: boolean;
};

export const CoreHeader = memo(function ({
  className,
  isMinimal,
  noHeader,
  children,
  ...moreProps
}: Props) {
  return (
    <header
      className={cx(
        '2lg:justify-normal 2lg:px-0 relative z-50 flex h-[61px] w-full max-w-main flex-col items-center justify-between gap-4 self-center px-2.5 transition-opacity duration-500 hover:!pointer-events-auto hover:!opacity-100 xs:flex-row',
        isMinimal && 'pointer-events-none opacity-0',
        className,
      )}
      {...moreProps}
    >
      <Link
        to='/'
        className='relative inline-block w-56 shrink-0 overflow-hidden'
      >
        {noHeader ? (
          <span className='sr-only'>{APP_TITLE}</span>
        ) : (
          <h1 className='sr-only'>{APP_TITLE}</h1>
        )}
        <img src={logoPng} alt='logo' />
      </Link>
      {children}
    </header>
  );
});
