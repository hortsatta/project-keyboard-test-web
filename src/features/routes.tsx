import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from 'react-router-dom';

import { CoreLayout } from './core/components/core-layout.component';
import { WPMTestPage } from './wpm-test/pages/wpm-test.page';

const routes = createRoutesFromElements(
  <Route path='/' element={<CoreLayout />}>
    <Route index element={<WPMTestPage />} />
  </Route>,
);

export const router = createBrowserRouter(routes);
