import { Outlet } from 'react-router-dom';

import { BaseSEO } from '#/base/components/base-seo.component';
import { CoreHeader } from './core-header.component';
import { CoreFooter } from './core-footer.component';

export function CoreLayout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <BaseSEO />
      <CoreHeader className='mt-5 lg:mt-10' noHeader />
      <main>
        <Outlet />
      </main>
      <CoreFooter />
    </div>
  );
}
