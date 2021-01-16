import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';
import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';

import { darkGrayColor } from '../constants/websiteColors';
import NotFound from '../containers/NotFound';
import fontFaces from '../fonts/fontsSetup';
import i18n from '../i18n/i18n';
import Loading from './general/Loading';

const Hero = React.lazy(() => import('../containers/Hero'));
const Works = React.lazy(() => import('../containers/Works'));
const Reservation = React.lazy(() => import('../containers/Reservation'));
// const Dashboard = React.lazy(() => import('../containers/Dashboard'));

const client = new ApolloClient({
  uri: 'https://u06740719i.execute-api.eu-central-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache(),
});

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
    <Auth0Provider
      domain="dev-q6a92igd.eu.auth0.com"
      clientId="vZ6H3dwS70pmpBirT7xttpVcycKEtysJ"
      redirectUri={window.location.origin}
    >
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18n}>
          <Router>
            <Normalize />
            <GlobalStyle />
            <Switch>
              <Route path="/" exact>
                <Suspense fallback={<Loading width="100vw" height="100vh" />}>
                  <Hero />
                </Suspense>
              </Route>
              <Route path="/works" exact>
                <Suspense fallback={<Loading width="100vw" height="100vh" />}>
                  <Works />
                </Suspense>
              </Route>
              <Route path="/reserve">
                <Suspense fallback={<Loading width="100vw" height="100vh" />}>
                  <Reservation />
                </Suspense>
              </Route>
              {/* <Route path="/dashboard">
              <Suspense fallback={<Loading width="100vw" height="100vh" />}>
                {dashboardComponent}
              </Suspense>
            </Route> */}
              <Route path="/">
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </I18nextProvider>
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default App;
