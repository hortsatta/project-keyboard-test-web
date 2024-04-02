import { Outlet } from 'react-router-dom';

import { CoreHeader } from './core-header.component';

export function CoreLayout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <CoreHeader className='max-w-main !absolute top-10 self-center' />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
