import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';

import fontFaces from '../fonts/fontsSetup';
import { darkGrayColor } from '../constants/websiteColors';

import Hero from '../containers/Hero';
import Reservation from '../containers/Reservation';

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
          <Hero />
        </Route>
        <Route path="/reserve">
          <Reservation />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
