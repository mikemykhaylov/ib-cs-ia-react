import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';
import { Suspense, lazy } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Route, Router, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';

import { darkestGrayColor } from '../constants/websiteColors';
import Hero from '../containers/Hero';
import NotFound from '../containers/NotFound';
import Works from '../containers/Works';
import fontFaces from '../fonts/fontsSetup';
import i18n from '../i18n/i18n';
import Loading from './general/Loading';

const Reservation = lazy(() => import('../containers/Reservation'));
const Dashboard = lazy(() => import('../containers/Dashboard'));

const httpLink = createHttpLink({
  uri: 'https://u06740719i.execute-api.eu-central-1.amazonaws.com/dev/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from session storage if it exists
  const accessToken = sessionStorage.getItem('accessToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const GlobalStyle = createGlobalStyle`
${fontFaces}
  body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: ${darkestGrayColor};
  margin: 0;
}
html {
  font-size: 14px;
  @media (min-width: 1600px) {
    font-size: 16px;
  }
}
`;

export const browserHistory = createBrowserHistory();

const ProtectedDashboard = withAuthenticationRequired(Dashboard);

const App = () => (
  <ApolloProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <Router history={browserHistory}>
        <Normalize />
        <GlobalStyle />
        <Switch>
          <Route path="/" exact>
            <Hero />
          </Route>
          <Route path="/works" exact>
            <Works />
          </Route>
          <Route path="/reserve">
            <Suspense fallback={<Loading width="100vw" height="100vh" />}>
              <Reservation />
            </Suspense>
          </Route>
          <Route path="/dashboard">
            <Suspense fallback={<Loading width="100vw" height="100vh" />}>
              <ProtectedDashboard />
            </Suspense>
          </Route>
          <Route path="/welcome">
            <Suspense fallback={<Loading width="100vw" height="100vh" />}>
              <ProtectedDashboard />
            </Suspense>
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </I18nextProvider>
  </ApolloProvider>
);

export default App;
