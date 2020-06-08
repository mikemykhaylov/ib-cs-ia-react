import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { primaryColor, lightGrayColor } from '../../constants/websiteColors';
import useWindowWidth from '../../hooks/useWindowWidth';

import { PrimaryButton } from '../general/Buttons';
import Navbar from '../general/Navbar';
import { Heading1, Heading3, Heading5 } from '../general/Headings';

import Scissors from '../icons/Scissors';
import Razor from '../icons/Razor';
import Combo from '../icons/Combo';
import PlaneLeft from '../icons/PlaneLeft';
import PlaneRight from '../icons/PlaneRight';

import heroImage from '../../images/heroImage.jpg';

const MainContainer = styled.div`
  align-items: center;
  background: linear-gradient(rgba(35, 35, 35, 0.8), rgba(35, 35, 35, 0.8)), url(${heroImage});
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  margin-bottom: 100px;
  padding-bottom: 100px;
  width: 100%;
  & > *:not(:first-child) {
    margin-bottom: 64px;
  }
  @media (min-width: 992px) {
    height: 100vh;
    padding-bottom: 0;
  }
  @supports (-webkit-touch-callout: none) {
    background-attachment: scroll;
  }
`;

const MainHeadingContainer = styled.div`
  display: flex;
  margin-top: calc(100vh * 96 / 1080);
  align-items: center;
  text-align: center;
  & > *:not(:last-child) {
    margin-right: 40px;
  }
  @media (min-width: 992px) {
    margin-top: 5vw;
    & > *:not(:last-child) {
      margin-right: 80px;
    }
  }
`;

const MainServicesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 64px;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    width: 560px;
    & > *:not(:last-child) {
      margin-bottom: 0px;
    }
  }
`;

const MainService = styled.div`
  text-align: center;
  & > *:first-child {
    margin-bottom: 20px;
  }
`;

const MainServiceName = styled(Heading5)`
  margin-bottom: 16px;
`;

function Main() {
  const width = useWindowWidth();
  return (
    <MainContainer>
      <Navbar />
      <MainHeadingContainer>
        {width > 768 && <PlaneLeft height={64} color={lightGrayColor} />}
        <Heading1>
          Dywizjon 303
          <br />
          Barbershop
        </Heading1>
        {width > 768 && <PlaneRight height={64} color={lightGrayColor} />}
      </MainHeadingContainer>
      <MainServicesContainer>
        <MainService>
          <Scissors color={primaryColor} height={60} />
          <MainServiceName>Ostrzyżenie</MainServiceName>
          <Heading3>80zł</Heading3>
        </MainService>
        <MainService>
          <Razor color={primaryColor} height={60} />
          <MainServiceName>Golenie</MainServiceName>
          <Heading3>65zł</Heading3>
        </MainService>
        <MainService>
          <Combo color={primaryColor} height={60} />
          <MainServiceName>Combo</MainServiceName>
          <Heading3>130zł</Heading3>
        </MainService>
      </MainServicesContainer>
      <a
        href="https://booksy.com/pl-pl/71163_dywizjon-303-barbershop_barber-shop_3_warszawa"
        target="_blank"
        rel="noreferrer"
      >
        <PrimaryButton>Rezerwacja</PrimaryButton>
      </a>
    </MainContainer>
  );
}

export default Main;
