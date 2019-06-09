import React, { memo, Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import Header from './components/header';
import { Loading } from './components';

const Home = lazy(() => import('./views/home'));
const BestSeller = lazy(() => import('./views/best-seller'));

/**
 * Where the React APP main layout resides:
 */
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Router>
        <Home path="/" />
        <BestSeller path="/:list-name" />
      </Router>
    </Suspense>
  );
}

export default memo(App);
