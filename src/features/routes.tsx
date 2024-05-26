import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from 'react-router-dom';

import { pageRoutes } from './core/config/page-routes.config';
import { CoreLayout } from './core/components/core-layout.component';
import { CoreNotFoundPage } from './core/pages/core-not-found.page';
import { WPMTestLayout } from './wpm-test/components/wpm-test-layout.component';
import { StaticTermsOfServicePage } from './static/pages/static-terms-of-service.page';
import { StaticPrivacyPolicyPage } from './static/pages/static-privacy-policy.page';

const wpmTestPage = async () => {
  const { WPMTestPage } = await import('./wpm-test/pages/wpm-test.page');
  return { Component: WPMTestPage };
};

const wpmTestResultsPage = async () => {
  const { WPMTestResultsPage } = await import(
    './wpm-test/pages/wpm-test-results.page'
  );
  return { Component: WPMTestResultsPage };
};

const routes = createRoutesFromElements(
  <>
    <Route path='/' element={<WPMTestLayout />}>
      <Route index lazy={wpmTestPage} />
      <Route path={pageRoutes.testResults.path} lazy={wpmTestResultsPage} />
    </Route>
    <Route element={<CoreLayout />}>
      <Route path='*' element={<CoreNotFoundPage />} />
      <Route
        path={pageRoutes.termsOfService.path}
        element={<StaticTermsOfServicePage />}
      />
      <Route
        path={pageRoutes.privacyPolicy.path}
        element={<StaticPrivacyPolicyPage />}
      />
    </Route>
  </>,
);

export const router = createBrowserRouter(routes);
