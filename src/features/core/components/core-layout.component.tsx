import { Outlet } from 'react-router-dom';

import { BaseSEO } from '#/base/components/base-seo.component';
import { CoreHeader } from './core-header.component';
import { CoreFooter } from './core-footer.component';

export function CoreLayout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <BaseSEO />
      <CoreHeader className='2lg:mt-10 mt-5' noHeader />
      <main className='mx-auto w-full max-w-main flex-1'>
        <Outlet />
      </main>
      <CoreFooter />
    </div>
  );
}
