import { Auth0Provider } from '@auth0/auth0-react';
import { StrictMode } from 'react';
import { render } from 'react-dom';

import App, { browserHistory } from './components/App';

const onRedirectCallback = (appState) => {
  browserHistory.replace((appState && appState.returnTo) || window.location.pathname);
};

render(
  <StrictMode>
    <Auth0Provider
      domain="dev-q6a92igd.eu.auth0.com"
      clientId="vZ6H3dwS70pmpBirT7xttpVcycKEtysJ"
      redirectUri={window.location.origin}
      audience="https://u06740719i.execute-api.eu-central-1.amazonaws.com/dev/graphql"
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
  document.querySelector('#root'),
);

if (module.hot) {
  module.hot.accept();
}
