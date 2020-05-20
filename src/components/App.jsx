import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';

import Loading from './General/Loading';

import fontFaces from '../fonts/fontsSetup';
import { darkGrayColor } from '../constants/websiteColors';
import firebase from '../utils/firebaseSetup';

const Hero = React.lazy(() => import('../containers/Hero'));
const Reservation = React.lazy(() => import('../containers/Reservation'));
const Login = React.lazy(() => import('../containers/Login'));
const Dashboard = React.lazy(() => import('../containers/Dashboard'));
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
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);
  let dashboardComponent;
  if (loggedIn !== null) {
    dashboardComponent = loggedIn ? <Dashboard /> : <Redirect to="/" />;
  }
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
        <Route path="/dashboard">
          <Suspense fallback={<Loading width="100vw" height="100vh" />}>
            {dashboardComponent}
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
