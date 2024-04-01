import { memo } from 'react';

import type { ComponentProps } from 'react';

import logoPng from '#/assets/images/logo.svg';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Typen';

export const CoreHeader = memo(function (props: ComponentProps<'header'>) {
  return (
    <header {...props}>
      <div className='relative w-60 overflow-hidden'>
        <h1 className='absolute left-full top-full'>{APP_TITLE}</h1>
        <img src={logoPng} alt='logo' />
      </div>
    </header>
  );
});
