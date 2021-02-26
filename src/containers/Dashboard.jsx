import { useAuth0 } from '@auth0/auth0-react';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Heading2 } from '../components/general/Headings';
import Loading from '../components/general/Loading';
import Navbar from '../components/general/Navbar';
import Home from '../components/icons/Home';
import Logo from '../components/icons/Logo';
import { darkerGrayColor, lighterGrayColor, primaryColor } from '../constants/websiteColors';
import Admin from './Admin';
import Barber from './Barber';

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`;

const SideBar = styled.aside`
  width: 100px;
  background-color: ${darkerGrayColor};
  box-sizing: border-box;
  padding: calc(100vw * 50 / 1920) 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 100px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const SideNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const SideNavElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  transition-duration: 100ms;
  border-radius: 10px;
  & > svg > path {
    fill: ${(props) => (props.current ? primaryColor : lighterGrayColor)};
  }
  &:hover > svg > path {
    fill: ${primaryColor};
  }
`;

const HomePage = styled.section`
  width: 100%;
`;

const HomePageWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0px calc(100vw * 50 / 1920);
  margin-top: calc(100vh * 72 / 1080);
`;

const HomePageGrid = styled.div`
  margin-top: calc(100vh * 72 / 1080 / 2);
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(100vw * 50 / 1920);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Dashboard = () => {
  const { t } = useTranslation();
  const { user, getAccessTokenSilently } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(null);

  // Getting Auth0 ACCESS token to allow sentitive API calls
  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: `https://u06740719i.execute-api.eu-central-1.amazonaws.com/dev/graphql`,
      });
      const payload = jwtDecode(accessToken);
      setIsAdmin(payload.permissions.includes('create:barber'));
      sessionStorage.setItem('accessToken', accessToken);
    };

    setTimeout(getAccessToken, 500);
  }, []);

  // Creating a timed greeting for the barber
  const getGreeting = () => {
    const time = new Date().getUTCHours();
    if (time >= 0 && time < 6) {
      return 'Good afternoon';
    }
    if (time >= 6 && time < 12) {
      return 'Good morning';
    }
    if (time >= 12 && time < 18) {
      return 'Good day';
    }
    return 'Good afternoon';
  };

  return (
    <Container>
      <SideBar>
        <LogoContainer>
          <Link aria-label="Go to the main page" to="/">
            <Logo color={primaryColor} height={60} />
          </Link>
        </LogoContainer>
        <SideNav>
          <SideNavElement current>
            <Home height={30} />
          </SideNavElement>
        </SideNav>
      </SideBar>
      <HomePage>
        <Navbar noLogo />
        <HomePageWrap>
          <Heading2>{`${t(getGreeting())}, ${user.name}`}</Heading2>
          {isAdmin !== null ? (
            <HomePageGrid>{isAdmin ? <Admin /> : <Barber />}</HomePageGrid>
          ) : (
            <Loading width="100%" />
          )}
        </HomePageWrap>
      </HomePage>
    </Container>
  );
};

export default Dashboard;
