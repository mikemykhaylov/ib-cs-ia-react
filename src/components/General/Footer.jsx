import React from 'react';
import styled from 'styled-components/macro';

import { Heading2, Heading4, Text } from './Headings';

import Logo from '../Icons/Logo';
import PlaneRight from '../Icons/PlaneRight';
import PlaneLeft from '../Icons/PlaneLeft';

import { primaryColor, lightGrayColor } from '../../constants/websiteColors';
import useWindowWidth from '../../hooks/useWindowWidth';

const FooterContainer = styled.footer`
  width: calc(100vw - 2 * 100vw * 50 / 1920);
  margin: calc(100vw * 50 / 1920);
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FooterArt = styled.div`
  display: flex;
  margin-bottom: 32px;
  & > *:not(:last-child) {
    margin-right: 40px;
  }
  @media (min-width: 992px) {
    & > *:not(:last-child) {
      margin-right: 80px;
    }
  }
`;

const FooterTitle = styled(Heading2)`
  text-align: center;
  margin-bottom: 64px;
`;

const FooterWrap = styled.div`
  width: 100%;
  max-width: 850px;
  margin-bottom: 64px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 32px;
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterContactSection = styled.div`
  text-align: center;
  min-width: 230px;
  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const FooterCredits = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    & > *:not(:last-child) {
      margin-bottom: 0px;
    }
  }
`;

const FooterCreditsText = styled(Text)`
  max-width: 450px;
  text-align: center;
`;

function Footer() {
  const width = useWindowWidth();
  return (
    <FooterContainer>
      <FooterArt>
        {width > 768 && <PlaneLeft height={64} color={lightGrayColor} />}
        <Logo color={primaryColor} height={60} />
        {width > 768 && <PlaneRight height={64} color={lightGrayColor} />}
      </FooterArt>
      <FooterTitle>Contact Us</FooterTitle>
      <FooterWrap>
        <FooterContactSection>
          <Heading4>OUR ADRESS</Heading4>
          <Text>7409 E Little York Rd Orlando, Washington 50418 United States</Text>
        </FooterContactSection>
        <FooterContactSection>
          <Heading4>CONTACTS</Heading4>
          <Text>
            (303) 555-0105
            <br />
            stanley.baker@example.com
          </Text>
        </FooterContactSection>
        <FooterContactSection>
          <Heading4>WORKING HOURS</Heading4>
          <Text>
            Mon-Fri — 8 AM to 6 PM
            <br />
            Sat-Sun — 9 AM to 4 PM
          </Text>
        </FooterContactSection>
      </FooterWrap>
      <FooterCredits>
        <FooterCreditsText color={lightGrayColor}>
          Copyright © Dywizjon 303 all rights reserved. Developed by Mykhaylo Mykhaylov
        </FooterCreditsText>
        <FooterCreditsText color={lightGrayColor}>
          Icons made by Freepik and Eucalyp from www.flaticon.com
        </FooterCreditsText>
      </FooterCredits>
    </FooterContainer>
  );
}

export default Footer;
