/* eslint-disable react/jsx-props-no-spreading */
import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import Calendar from '../components/general/Calendar';
import { Heading2, Heading3, Heading4 } from '../components/general/Headings';
import Loading from '../components/general/Loading';
import Navbar from '../components/general/Navbar';
import Delete from '../components/icons/Delete';
import Home from '../components/icons/Home';
import Logo from '../components/icons/Logo';
import { darkerGrayColor, lighterGrayColor, primaryColor } from '../constants/websiteColors';

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

const Box = styled.div`
  background-color: ${darkerGrayColor};
  border-radius: calc(100vw * 50 / 1920 / 2);
  box-sizing: border-box;
  padding: calc(100vh * 72 / 1080 / 2);
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const DoubleBox = styled(Box)`
  @media (min-width: 768px) {
    grid-column: auto / span 2;
  }
`;

const EmptyBox = styled(Box)`
  background: none;
  border: 5px dashed ${darkerGrayColor};
  height: 300px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const AppointmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Appointment = styled.div`
  height: 60px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 2fr 1fr;
  place-items: center center;
  @media (max-width: 810px) {
    grid-template-columns: 1fr 1fr 2fr 1fr;
    & > *:nth-child(2) {
      display: none;
    }
  }
`;

const AppointmentTimeSpan = styled.span`
  color: ${primaryColor};
`;

// GraphQL query getting barber's specialisation and all appointments for a day
const GET_BARBER_APPOINTMENTS_FOR_DAY = gql`
  query getBarberByEmail($email: String!, $date: String!) {
    barber(email: $email) {
      id
      appointments(date: $date) {
        duration
        fullName
        id
        serviceName
        time
      }
    }
  }
`;

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { user, getAccessTokenSilently } = useAuth0();

  // Default date to show appointments for
  const [date, setDate] = useState(new Date());

  // Getting Auth0 ACCESS token to allow sentitive API calls
  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: `https://u06740719i.execute-api.eu-central-1.amazonaws.com/dev/graphql`,
      });
      sessionStorage.setItem('accessToken', accessToken);
    };

    getAccessToken();
  }, []);

  // Loading barber appointments for the day
  const { data, loading } = useQuery(GET_BARBER_APPOINTMENTS_FOR_DAY, {
    variables: {
      date: date.toISOString().split('T')[0],
      email: user.email,
    },
  });

  // Mapping appointments to rows
  let appointmentsCards = null;
  if (data?.barber?.appointments) {
    appointmentsCards =
      data.barber.appointments.length === 0 ? (
        <Heading4>{t('No appointments for this day')}</Heading4>
      ) : (
        data.barber.appointments
          .filter(
            (appointment) =>
              new Date(appointment.time).getUTCHours() > new Date().getUTCHours() ||
              new Date(appointment.time).getUTCDate() !== new Date().getUTCDate() ||
              new Date(appointment.time).getUTCMonth() !== new Date().getUTCMonth() ||
              new Date(appointment.time).getUTCFullYear() !== new Date().getUTCFullYear(),
          )
          .slice(0, 5)
          .map((appointment) => (
            <Appointment key={appointment.id}>
              <Heading4>
                <AppointmentTimeSpan>
                  {` ${new Date(appointment.time).getUTCHours()}:00`}
                </AppointmentTimeSpan>
              </Heading4>
              <Heading4>{appointment.fullName}</Heading4>
              <Heading4>{t(appointment.serviceName)}</Heading4>
              <Heading4>{`${appointment.duration} min`}</Heading4>
              <Delete height={30} />
            </Appointment>
          ))
      );
  }

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
          <HomePageGrid>
            <DoubleBox>
              <Heading3>
                {`${t('Showing appointments for')} ${date.toLocaleString(i18n.language, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}`}
              </Heading3>
              <AppointmentsContainer>
                {loading ? <Loading height="100%" width="100%" /> : appointmentsCards}
              </AppointmentsContainer>
            </DoubleBox>
            <Box>
              <Heading3>{t('Select date')}</Heading3>
              <Calendar allDates date={date} setDate={setDate} />
            </Box>
            <EmptyBox>
              <Heading3 color={darkerGrayColor}>Under construction</Heading3>
            </EmptyBox>
            <EmptyBox>
              <Heading3 color={darkerGrayColor}>Under construction</Heading3>
            </EmptyBox>
            <EmptyBox>
              <Heading3 color={darkerGrayColor}>Under construction</Heading3>
            </EmptyBox>
          </HomePageGrid>
        </HomePageWrap>
      </HomePage>
    </Container>
  );
};

export default Dashboard;
