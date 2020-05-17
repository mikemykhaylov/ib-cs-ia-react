import React, { Suspense } from 'react';

import Main from '../components/Hero/Main';
import Advantages from '../components/Hero/Advantages';
import Story from '../components/Hero/Story';
import Gallery from '../components/Hero/Gallery';
import Footer from '../components/General/Footer';
import Loading from '../components/General/Loading';

const Map = React.lazy(() => import('../components/Hero/Map'));

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
