import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { BaseSEO } from '#/base/components/base-seo.component';
import { useBoundStore } from '../hooks/use-store.hook';
import { CoreHeader } from './core-header.component';

export function CoreLayout() {
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const setMinimalUI = useBoundStore((state) => state.setMinimalUI);

  useEffect(() => {
    setMinimalUI(isPlaying);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  return (
    <div className='flex min-h-screen flex-col'>
      <BaseSEO />
      <CoreHeader className='!absolute top-5 max-w-main self-center lg:top-10' />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
