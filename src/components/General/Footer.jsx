import React from 'react';
import styled from 'styled-components/macro';
import Logo from '../Icons/Logo';
import { primaryColor, lightGrayColor } from '../../constants/websiteColors';
import { Heading2, Heading4, Text } from './Headings';

const FooterContainer = styled.footer`
  width: 100%;
  box-sizing: border-box;
  padding: calc(100vw * 100 / 1920);
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FooterArt = styled.div`
  display: flex;
  margin-bottom: 32px;
  & > *:not(:last-child) {
    margin-right: 80px;
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

const FooterContactSection = styled.div`
  text-align: center;
  max-width: 230px;
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
  return (
    <FooterContainer>
      <FooterArt>
        <Logo color={primaryColor} height={60} />
      </FooterArt>
      <FooterTitle>Contact Us</FooterTitle>
      <FooterWrap>
        <FooterContactSection>
          <Heading4>OUR ADRESS</Heading4>
          <Text>7409 E Little York Rd Orlando, Washington 50418 United States</Text>
        </FooterContactSection>
        <FooterContactSection>
          <Heading4>CONTACTS</Heading4>
          <Text>(303) 555-0105 stanley.baker@example.com</Text>
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
