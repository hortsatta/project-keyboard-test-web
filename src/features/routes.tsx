import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from 'react-router-dom';

import { CoreLayout } from './core/components/core-layout.component';
import { KeyboardTypingPage } from './keyboard-typing/pages/keyboard-typing.page';

const routes = createRoutesFromElements(
  <Route path='/' element={<CoreLayout />}>
    <Route index element={<KeyboardTypingPage />} />
  </Route>,
);

export const router = createBrowserRouter(routes);
