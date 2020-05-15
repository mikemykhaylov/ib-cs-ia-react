import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import fontFaces from '../fonts/fontsSetup';
import { darkGrayColor } from '../constants/websiteColors';
import Hero from './Hero';

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
    <>
      <Normalize />
      <GlobalStyle />
      <Hero />
    </>
  );
}

export default App;
