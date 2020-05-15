import React from 'react';
import Main from './sections/Main';
import Advantages from './sections/Advantages';
import Story from './sections/Story';
import Gallery from './sections/Gallery';
import Map from './sections/Map';
import Footer from '../General/Footer';

function Hero() {
  return (
    <>
      <Main />
      <Advantages />
      <Story />
      <Gallery />
      <Map />
      <Footer />
    </>
  );
}

export default Hero;
