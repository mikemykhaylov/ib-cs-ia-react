import HelveticaNeueCondensedBoldWoff from './HelveticaNeue-BoldCondensed.woff';
import HelveticaNeueCondensedBoldWoff2 from './HelveticaNeue-BoldCondensed.woff2';

import MerriweatherBlackWoff from './Merriweather-Black.woff';
import MerriweatherBlackWoff2 from './Merriweather-Black.woff2';
import MerriweatherBoldWoff from './Merriweather-Bold.woff';
import MerriweatherBoldWoff2 from './Merriweather-Bold.woff2';

import MontserratMediumWoff from './Montserrat-Medium.woff';
import MontserratMediumWoff2 from './Montserrat-Medium.woff2';
import MontserratRegularWoff from './Montserrat-Regular.woff';
import MontserratRegularWoff2 from './Montserrat-Regular.woff2';
import MontserratSemiBoldWoff from './Montserrat-SemiBold.woff';
import MontserratSemiBoldWoff2 from './Montserrat-SemiBold.woff2';

const fontFaces = `
@font-face {
  font-family: 'Merriweather';
  src: url(${MerriweatherBlackWoff2}) format('woff2'),
      url(${MerriweatherBlackWoff}) format('woff');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Merriweather';
  src: url(${MerriweatherBoldWoff2}) format('woff2'),
      url(${MerriweatherBoldWoff}) format('woff');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Helvetica Neue Condensed';
  src: local("Helvetica Neue Condensed Bold"),
    local("HelveticaNeueCondensed-Bold"),
    url(${HelveticaNeueCondensedBoldWoff2}) format('woff2'),
    url(${HelveticaNeueCondensedBoldWoff}) format('woff');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url(${MontserratSemiBoldWoff2}) format('woff2'),
      url(${MontserratSemiBoldWoff}) format('woff');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url(${MontserratRegularWoff2}) format('woff2'),
      url(${MontserratRegularWoff}) format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url(${MontserratMediumWoff2}) format('woff2'),
      url(${MontserratMediumWoff}) format('woff');
  font-weight: 500;
  font-style: normal;
}

`;

export default fontFaces;
