import React, { Suspense } from 'react';

import Main from '../components/hero/Main';
import Advantages from '../components/hero/Advantages';
import Story from '../components/hero/Story';
import Gallery from '../components/hero/Gallery';
import Footer from '../components/general/Footer';
import Loading from '../components/general/Loading';

const Map = React.lazy(() => import('../components/hero/Map'));

function Hero() {
  return (
    <>
      <Main />
      <Advantages />
      <Story />
      <Gallery />
      <Suspense fallback={<Loading width="100%" height="600px" />}>
        <Map />
      </Suspense>
      <Footer />
    </>
  );
}

export default Hero;
