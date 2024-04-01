import { Outlet } from 'react-router-dom';

import { CoreHeader } from './core-header.component';

export function CoreLayout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <CoreHeader className='order-last mx-auto' />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
