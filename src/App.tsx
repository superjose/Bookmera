import React, { memo } from "react";

import Header from "./components/header";
import Home from './views/home';
/**
 * Where the React APP main layout resides:
 */
function App() {
  return (
    <React.Fragment>
      <Header />
      <Home />
    </React.Fragment>
  );
}

export default memo(App);
