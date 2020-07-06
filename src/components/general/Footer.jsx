import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Heading2, Heading4, Text } from './Headings';

import Logo from '../icons/Logo';
import PlaneRight from '../icons/PlaneRight';
import PlaneLeft from '../icons/PlaneLeft';

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
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <FooterArt>
        {width > 768 && <PlaneLeft height={64} color={lightGrayColor} />}
        <Logo color={primaryColor} height={60} />
        {width > 768 && <PlaneRight height={64} color={lightGrayColor} />}
      </FooterArt>
      <FooterTitle>{t('Get in touch')}</FooterTitle>
      <FooterWrap>
        <FooterContactSection>
          <Heading4>{t('Our adress')}</Heading4>
          <Text>Jurija Gagarina 33, 00-753 Warszawa, Polska</Text>
        </FooterContactSection>
        <FooterContactSection>
          <Heading4>{t('Phone')}</Heading4>
          <Text>+48 575 233 135</Text>
        </FooterContactSection>
        <FooterContactSection>
          <Heading4>{t('Working hours')}</Heading4>
          <Text>
            Pn — 15:00 - 20:00
            <br />
            Wt-Sr — 11:00 - 20:00
            <br />
            Czw-Pt — 8:00 - 20:00
            <br />
            Sb — 8:00 - 18:00
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
