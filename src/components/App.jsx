import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';

import fontFaces from '../fonts/fontsSetup';
import { darkGrayColor } from '../constants/websiteColors';
import Loading from './General/Loading';

const Hero = React.lazy(() => import('../containers/Hero'));
const Reservation = React.lazy(() => import('../containers/Reservation'));
const Login = React.lazy(() => import('../containers/Login'));
const ForgotPassword = React.lazy(() => import('../containers/ForgotPassword'));

const GlobalStyle = createGlobalStyle`
${fontFaces}
  body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: ${darkGrayColor};
  margin: 0;
}
html {
  font-size: 14px;
  @media (min-width: 1600px) {
    font-size: 16px;
  }
}
`;

function App() {
  return (
    <Router>
      <Normalize />
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={<Loading width="100vw" height="100vh" />}>
            <Hero />
          </Suspense>
        </Route>
        <Route path="/reserve">
          <Suspense fallback={<Loading width="100vw" height="100vh" />}>
            <Reservation />
          </Suspense>
        </Route>
        <Route path="/login">
          <Suspense fallback={<Loading width="100vw" height="100vh" />}>
            <Login />
          </Suspense>
        </Route>
        <Route path="/forgotpassword">
          <Suspense fallback={<Loading width="100vw" height="100vh" />}>
            <ForgotPassword />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
