import React from 'react';

import Main from '../components/hero/Main';
import Advantages from '../components/hero/Advantages';
import Story from '../components/hero/Story';
import Gallery from '../components/hero/Gallery';
import Footer from '../components/general/Footer';

function Hero() {
  return (
    <>
      <Main />
      <Advantages />
      <Story />
      <Gallery />
      <Footer />
    </>
  );
}

export default Hero;
