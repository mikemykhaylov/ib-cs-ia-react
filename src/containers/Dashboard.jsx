import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import Calendar from '../components/general/Calendar';
import Footer from '../components/general/Footer';
import { Heading2, Heading3, Heading4, Heading5 } from '../components/general/Headings';
import Loading from '../components/general/Loading';
import Navbar from '../components/general/Navbar';
import { darkerGrayColor, grayColor, primaryColor } from '../constants/websiteColors';

const Container = styled.section`
  margin-top: calc(100vh * 96 / 1080);
  padding: 0 calc(100vw * 196 / 1920);
  margin-bottom: 100px;
  min-height: calc(100vh - 100vw * 50 / 1920 - 40px - 100vh * 96 / 1080 - 100px);
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

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 64px;
  }
  @media (min-width: 992px) {
    align-items: flex-start;
    flex-direction: row;
    & > *:not(:last-child) {
      margin-bottom: 0px;
    }
  }
`;

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  & > *:first-child {
    margin-bottom: 32px;
    text-align: center;
  }
`;

const BarberImage = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: cover;
`;

const BarberInfo = styled.div`
  width: 100%;
`;

const BarberMainInfo = styled.div`
  margin-bottom: 32px;
`;

const AppointmentsWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.singleChild
      ? 'repeat(auto-fit, minmax(250px, 1fr))'
      : 'repeat(auto-fill, minmax(300px, 1fr))'};
  grid-template-rows: 1fr;
  grid-gap: 32px;
`;

const AppointmentContainer = styled.div`
  box-sizing: border-box;
  background-color: ${darkerGrayColor};
  text-align: left;
  border-radius: 5px;
  padding: 32px;
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const AppointmentTimeSpan = styled.span`
  color: ${primaryColor};
`;

// GraphQL query getting barber's specialisation and all appointments for a day
const GET_BARBER_SPECIALISATION_AND_APPOINTMENTS_FOR_DAY = gql`
  query getBarberByEmail($email: String!, $date: String!) {
    barber(email: $email) {
      specialisation
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

function Dashboard() {
  const { t, i18n } = useTranslation();
  const { user, getAccessTokenSilently } = useAuth0();

  // Default date to show appointments for
  const [date, setDate] = useState(new Date());

  // State of the current user
  const [currentUser, setCurrentUser] = useState({
    fullName: user.name,
    profileImageURL: user.picture,
    email: user.email,
    id: '',
    specialisation: '',
  });

  // Getting barber access token
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://u06740719i.execute-api.eu-central-1.amazonaws.com/dev/graphql`,
        });
        sessionStorage.setItem('accessToken', accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };

    getAccessToken();
  }, []);

  const { data, loading } = useQuery(GET_BARBER_SPECIALISATION_AND_APPOINTMENTS_FOR_DAY, {
    variables: {
      date: date.toISOString().split('T')[0],
      email: currentUser.email,
    },
  });

  if (data?.barber?.specialisation && !currentUser.specialisation) {
    setCurrentUser({ ...currentUser, specialisation: data.barber.specialisation });
  }

  // Mapping appointments to cards
  let appointmentsCards = null;
  if (data?.barber?.appointments) {
    appointmentsCards =
      data.barber.appointments.length === 0 ? (
        <Heading4>{t('No appointments for this day')}</Heading4>
      ) : (
        data.barber.appointments.map((appointment) => (
          <AppointmentContainer key={appointment.id}>
            <Heading4>
              {`${t('Time')}:`}
              <AppointmentTimeSpan>
                {` ${new Date(appointment.time).getUTCHours()}:00`}
              </AppointmentTimeSpan>
            </Heading4>
            <Heading5>{`${t('Name')}: ${appointment.fullName}`}</Heading5>
            <Heading5>{`${t('Service')}: ${t(appointment.serviceName)}`}</Heading5>
            <Heading5>{`${t('Duration')}: ${appointment.duration} min`}</Heading5>
          </AppointmentContainer>
        ))
      );
  }

  return (
    <>
      <Navbar />
      <Container>
        <Heading2>{`${t('Welcome back')}, ${currentUser.fullName}`}</Heading2>
        <Wrap>
          <ElementContainer>
            <BarberImage src={currentUser.profileImageURL} />
            <BarberInfo>
              <BarberMainInfo>
                <Heading4>{currentUser.fullName}</Heading4>
                <Heading5 color={grayColor}>{t('Barber')}</Heading5>
              </BarberMainInfo>
              <Heading4>
                {currentUser.specialisation &&
                  `${t('Specialisation')}: ${t(currentUser.specialisation)}`}
              </Heading4>
            </BarberInfo>
          </ElementContainer>
          <ElementContainer>
            <Heading3>{`${t('View appointments')}:`}</Heading3>
            <Calendar date={date} setDate={setDate} allDates />
          </ElementContainer>
        </Wrap>
        <Heading3>
          {`${t('Showing appointments for')} ${date.toLocaleString(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`}
        </Heading3>
        {/* If appointments are loading, or there are none for the date,
        we set the loaded to false, therefore stretching the grids */}
        <AppointmentsWrap singleChild={loading || data?.barber?.appointments?.length === 0}>
          {!loading ? appointmentsCards : <Loading height="80px" width="100%" />}
        </AppointmentsWrap>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
