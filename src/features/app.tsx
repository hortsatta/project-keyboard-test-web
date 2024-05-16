import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { router } from './routes';

export function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
