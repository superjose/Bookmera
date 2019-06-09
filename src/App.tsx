import React, { memo, Suspense, lazy, useState } from 'react';
import { Router } from '@reach/router';

import Header from './components/header';
import { Loading } from './components';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './components/styles/theme';
import Body from './components/styles/body';

const Home = lazy(() => import('./views/home'));
const BestSeller = lazy(() => import('./views/best-seller'));

/**
 * Where the React APP main layout resides:
 */
function App() {
  const [theme, setTheme] = useState(lightTheme);
  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider theme={theme}>
        <Body>
          <Header setTheme={setTheme} />
          <Router>
            <Home path="/" />
            <BestSeller path="/:listNameEncoded" />
          </Router>
        </Body>
      </ThemeProvider>
    </Suspense>
  );
}

export default memo(App);
