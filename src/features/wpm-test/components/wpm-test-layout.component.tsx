import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useBoundStore } from '#/core/hooks/use-store.hook';
import { CoreHeader } from '#/core/components/core-header.component';
import { CoreFooter } from '#/core/components/core-footer.component';
import { BaseSEO } from '#/base/components/base-seo.component';
import { WPMTestToolbarMenu } from './wpm-test-toolbar-menu.component';

export function WPMTestLayout() {
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const setMinimalUI = useBoundStore((state) => state.setMinimalUI);

  useEffect(() => {
    setMinimalUI(isPlaying);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  return (
    <div className='flex min-h-screen flex-col'>
      <BaseSEO />
      <CoreHeader className='!absolute top-5 lg:top-10'>
        <WPMTestToolbarMenu className='h-full max-w-main' />
      </CoreHeader>
      <main>
        <Outlet />
      </main>
      <CoreFooter className='!absolute bottom-0 left-1/2 -translate-x-1/2' />
    </div>
  );
}
