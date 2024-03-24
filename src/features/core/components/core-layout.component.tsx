import { Outlet } from 'react-router-dom';

import { CoreHeader } from './core-header.component';

export function CoreLayout() {
  return (
    <div>
      <CoreHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
