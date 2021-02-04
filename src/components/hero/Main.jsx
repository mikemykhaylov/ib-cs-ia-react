import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { primaryColor } from '../../constants/websiteColors';
import heroImage from '../../images/heroImage.webp';
import { PrimaryButton } from '../general/Buttons';
import { Heading1, Heading3, Heading5 } from '../general/Headings';
import Navbar from '../general/Navbar';
import Combo from '../icons/Combo';
import Razor from '../icons/Razor';
import Scissors from '../icons/Scissors';

const MainContainer = styled.div`
  align-items: center;
  background: linear-gradient(rgba(35, 35, 35, 0.8), rgba(35, 35, 35, 0.6)), url(${heroImage});
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
  align-items: center;
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
  width: 150px;
  text-align: center;
  & > *:first-child {
    margin-bottom: 20px;
  }
`;

const MainServiceName = styled(Heading5)`
  margin-bottom: 16px;
`;

function Main() {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Navbar />
      <MainHeadingContainer>
        <Heading1>
          Cyberpunk
          <br />
          Barbershop
        </Heading1>
      </MainHeadingContainer>
      <MainServicesContainer>
        <MainService>
          <Scissors color={primaryColor} height={60} />
          <MainServiceName>{t('HAIRCUT')}</MainServiceName>
          <Heading3>60$</Heading3>
        </MainService>
        <MainService>
          <Razor color={primaryColor} height={60} />
          <MainServiceName>{t('SHAVING')}</MainServiceName>
          <Heading3>50$</Heading3>
        </MainService>
        <MainService>
          <Combo color={primaryColor} height={60} />
          <MainServiceName>{t('COMBO')}</MainServiceName>
          <Heading3>100$</Heading3>
        </MainService>
      </MainServicesContainer>
      <Link to="/reserve/step1">
        <PrimaryButton>{t('Reserve')}</PrimaryButton>
      </Link>
    </MainContainer>
  );
}

export default Main;
