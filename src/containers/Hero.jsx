import React from 'react';
import Main from '../components/Hero/Main';
import Advantages from '../components/Hero/Advantages';
import Story from '../components/Hero/Story';
import Gallery from '../components/Hero/Gallery';
import Map from '../components/Hero/Map';
import Footer from '../components/General/Footer';

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
