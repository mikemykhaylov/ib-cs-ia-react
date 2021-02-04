import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import Footer from '../components/general/Footer';
import { Heading2, Heading4 } from '../components/general/Headings';
import Navbar from '../components/general/Navbar';
import { darkerGrayColor, primaryColor } from '../constants/websiteColors';

const WorksContainer = styled.section`
  margin-top: calc(100vh * 96 / 1080);
  padding: 0 calc(100vw * 196 / 1920);
  margin-bottom: 100px;
  height: calc(100vh - 100vw * 50 / 1920 - 40px - 100vh * 96 / 1080 - 100px);
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
            <Heading4>{t('HAIRCUT')}</Heading4>
            <Heading4 color={primaryColor}>60$</Heading4>
          </Work>
          <Work>
            <Heading4>{t('SHAVING')}</Heading4>
            <Heading4 color={primaryColor}>50$</Heading4>
          </Work>
          <Work>
            <Heading4>{t('COMBO')}</Heading4>
            <Heading4 color={primaryColor}>100$</Heading4>
          </Work>
          <Work>
            <Heading4>{t('FATHERSON')}</Heading4>
            <Heading4 color={primaryColor}>100$</Heading4>
          </Work>
          <Work>
            <Heading4>{t('JUNIOR')}</Heading4>
            <Heading4 color={primaryColor}>60$</Heading4>
          </Work>
        </WorksWrap>
      </WorksContainer>
      <Footer />
    </>
  );
}

export default Works;
