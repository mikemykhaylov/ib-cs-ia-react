import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import ky from 'ky';

import Navbar from '../components/general/Navbar';
import { Heading2, Heading4, Heading5, Heading3 } from '../components/general/Headings';

import firebase from '../utils/firebaseSetup';
import { grayColor, primaryColor, darkerGrayColor } from '../constants/websiteColors';
import Calendar from '../components/general/Calendar';
import Loading from '../components/general/Loading';
import Footer from '../components/general/Footer';

const Container = styled.section`
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
    props.loaded
      ? 'repeat(auto-fill, minmax(300px, 1fr))'
      : 'repeat(auto-fit, minmax(250px, 1fr))'};
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

function Dashboard() {
  const { t, i18n } = useTranslation();
  // User data from firebase.auth()
  const { currentUser: firebaseCurrentUser } = firebase.auth();

  // Default date to show appointments for
  const currentLocalDate = new Date();
  const currentPolandISODate = `${currentLocalDate.toISOString().slice(0, 11)}02:00:00+02:00`;
  const currentPolandDate = new Date(currentPolandISODate);
  const [time, setTime] = useState(currentPolandDate);

  // Assembling used data from firebase to component user
  const [currentUser, setCurrentUser] = useState({
    displayName: firebaseCurrentUser.displayName,
    profileImageURL: firebaseCurrentUser.photoURL,
    email: firebaseCurrentUser.email,
    id: firebaseCurrentUser.uid,
  });

  // Determines the appointments for selected time and whether appointments
  // are in the process of loading
  const [appointments, setAppointments] = useState([]);
  const [loadedAppointments, setLoadedAppointments] = useState(false);

  // On component mount we load additional info about the barber,
  // which is not stored in firebase user
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    (async () => {
      const barber = await ky
        .post('https://europe-west3-dywizjon-303.cloudfunctions.net/api/barbers/email', {
          json: { email: currentUser.email },
          signal,
        })
        .json();
      // Adding this new data to existing component user
      setCurrentUser({ ...currentUser, ...barber });
    })();
    // Aborting request if user leaves page before loading available times
    return () => controller.abort();
  }, []);

  // Loading all appointments for selected date
  useEffect(() => {
    setLoadedAppointments(false);
    const controller = new AbortController();
    const { signal } = controller;
    (async () => {
      const token = await firebaseCurrentUser.getIdToken();
      const fetchedAppointments = await ky
        .post(
          'https://europe-west3-dywizjon-303.cloudfunctions.net/api/appointments/getforday/name',
          {
            json: { day: time.toISOString().substring(0, 10), barberID: currentUser.id },
            // Getting and passing the user token with the request
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
            signal,
          },
        )
        .json();
      setAppointments(fetchedAppointments);
      setLoadedAppointments(true);
    })();
    // Aborting request if user leaves page before loading available times
    return () => controller.abort();
  }, [time]);

  // Mapping appointments to cards
  let appointmentsCards;
  if (appointments.length === 0) {
    appointmentsCards = <Heading4>{t('No appointments for this day')}</Heading4>;
  } else {
    appointmentsCards = appointments.map((appointment) => (
      <AppointmentContainer key={appointment.id}>
        <Heading4>
          {`${t('Time')}:`}
          <AppointmentTimeSpan>
            {` ${new Date(appointment.time).getUTCHours() + 2}:00`}
          </AppointmentTimeSpan>
        </Heading4>
        <Heading5>{`${t('Name')}: ${appointment.firstName} ${appointment.lastName}`}</Heading5>
        <Heading5>{`${t('Service')}: ${t(appointment.serviceName)}`}</Heading5>
        <Heading5>{`${t('Duration')}: ${appointment.duration} min`}</Heading5>
      </AppointmentContainer>
    ));
  }
  return (
    <>
      <Navbar />
      <Container>
        <Heading2>{`${t('Welcome back')}, ${currentUser.displayName}`}</Heading2>
        <Wrap>
          <ElementContainer>
            <BarberImage src={currentUser.profileImageURL} />
            <BarberInfo>
              <BarberMainInfo>
                <Heading4>{currentUser.displayName}</Heading4>
                <Heading5 color={grayColor}>{t('Barber')}</Heading5>
              </BarberMainInfo>
              <Heading4>
                {currentUser.specialization &&
                  `${t('Specialisation')}: ${currentUser.specialization}`}
              </Heading4>
            </BarberInfo>
          </ElementContainer>
          <ElementContainer>
            <Heading3>{`${t('View appointments')}:`}</Heading3>
            <Calendar time={time} setTime={setTime} allDates />
          </ElementContainer>
        </Wrap>
        <Heading3>
          {`${t('Showing appointments for')} ${time.toLocaleString(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`}
        </Heading3>
        {/* If appointments are loading, or there are none for the date,
        we set the loaded to false, therefore stretching the grids */}
        <AppointmentsWrap loaded={!(!loadedAppointments || appointments.length === 0)}>
          {loadedAppointments ? appointmentsCards : <Loading height="80px" width="100%" />}
        </AppointmentsWrap>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
