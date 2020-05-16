import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { primaryColor } from '../../constants/websiteColors';
import heroImage from '../../images/Hero Image.jpg';

import { PrimaryButton } from '../General/Buttons';
import Navbar from '../General/Navbar';
import { Heading1, Heading3, Heading5 } from '../General/Headings';

import Scissors from '../Icons/Scissors';
import Razor from '../Icons/Razor';
import AfroPick from '../Icons/AfroPick';

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
`;

const MainHeading = styled(Heading1)`
  margin-top: calc(100vh * 160 / 1080);
  text-align: center;
  @media (min-width: 992px) {
    margin-top: 128px;
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
  @media (min-width: 576px) {
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
  return (
    <MainContainer>
      <Navbar />
      <MainHeading>dywizjon 303</MainHeading>
      <MainServicesContainer>
        <MainService>
          <Razor color={primaryColor} height={60} />
          <MainServiceName>Shaving</MainServiceName>
          <Heading3>40$</Heading3>
        </MainService>
        <MainService>
          <AfroPick color={primaryColor} height={60} />
          <MainServiceName>Hairdo</MainServiceName>
          <Heading3>50$</Heading3>
        </MainService>
        <MainService>
          <Scissors color={primaryColor} height={60} />
          <MainServiceName>Haircut</MainServiceName>
          <Heading3>45$</Heading3>
        </MainService>
      </MainServicesContainer>
      <Link to="/reserve/step1">
        <PrimaryButton>Reserve</PrimaryButton>
      </Link>
    </MainContainer>
  );
}

export default Main;
