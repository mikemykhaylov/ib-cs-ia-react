import SpaceGroteskVariable from './SpaceGrotesk-Variable.woff2';
import LibreFranklinVariable from './LibreFranklin-Variable.woff2';

const fontFaces = `
@font-face {
  font-family: 'SpaceGrotesk';
  font-display: swap;
  src: url(${SpaceGroteskVariable}) format('woff2-variations');
}
@font-face {
  font-family: 'LibreFrank';
  font-display: swap;
  src: url(${LibreFranklinVariable}) format('woff2-variations');
}

`;

export default fontFaces;
