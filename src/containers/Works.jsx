import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/general/Navbar';
import { Heading2, Heading4 } from '../components/general/Headings';
import { primaryColor, darkerGrayColor } from '../constants/websiteColors';
import Footer from '../components/general/Footer';

const WorksContainer = styled.section`
  margin-top: calc(100vh * 96 / 1080);
  padding: 0 calc(100vw * 196 / 1920);
  margin-bottom: 100px;
  min-height: calc(100vh - 45px - 100vh * 96 / 1080 - 100px);
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  & > * {
    text-align: center;
  }
  & > *:not(:last-child) {
    margin-bottom: 64px;
  }
`;

const WorksWrap = styled.div`
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
  @media (min-width: 576px) {
    width: 80%;
  }
`;

const Work = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  &:not(:last-child) {
    padding-bottom: 16px;
    border-bottom: 1px solid ${darkerGrayColor};
  }
  @media (min-width: 576px) {
    flex-direction: row;
  }
`;

function Works() {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <WorksContainer>
        <Heading2>{t('Services')}</Heading2>
        <WorksWrap>
          <Work>
            <Heading4>{t('Haircut')}</Heading4>
            <Heading4 color={primaryColor}>60zł</Heading4>
          </Work>
          <Work>
            <Heading4>{t('Beard trim')}</Heading4>
            <Heading4 color={primaryColor}>50zł</Heading4>
          </Work>
          <Work>
            <Heading4>{t('Combo (hair + beard)')}</Heading4>
            <Heading4 color={primaryColor}>100zł</Heading4>
          </Work>
          <Work>
            <Heading4>{t('Junior haircut (10 years)')}</Heading4>
            <Heading4 color={primaryColor}>60zł</Heading4>
          </Work>
          <Work>
            <Heading4>{t('Father + son')}</Heading4>
            <Heading4 color={primaryColor}>100zł</Heading4>
          </Work>
          <Work>
            <Heading4>{t('Elderly haircut 65+')}</Heading4>
            <Heading4 color={primaryColor}>40zł</Heading4>
          </Work>
        </WorksWrap>
      </WorksContainer>
      <Footer />
    </>
  );
}

export default Works;
