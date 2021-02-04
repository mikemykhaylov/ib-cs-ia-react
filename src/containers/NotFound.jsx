import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import { SecondaryButton } from '../components/general/Buttons';
import Footer from '../components/general/Footer';
import { Heading2 } from '../components/general/Headings';
import Navbar from '../components/general/Navbar';

const NotFoundContainer = styled.section`
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

function ForgotPassword() {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <NotFoundContainer>
        <Heading2>{t('Looks like you are lost')}</Heading2>
        <SecondaryButton onClick={() => history.push('/')}>
          {t('Go back to main page')}
        </SecondaryButton>
      </NotFoundContainer>
      <Footer />
    </>
  );
}

export default ForgotPassword;
