import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import Calendar from '../components/general/Calendar';
import { Heading3, Heading4 } from '../components/general/Headings';
import Loading from '../components/general/Loading';
import { darkerGrayColor, primaryColor } from '../constants/websiteColors';

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
  min-height: 300px;
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
  grid-template-columns: 1fr 2fr 1fr 2fr;
  place-items: center center;
  @media (max-width: 810px) {
    grid-template-columns: 1fr 1fr 2fr;
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

const Barber = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth0();

  // Default date to show appointments for
  const [date, setDate] = useState(new Date());

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
          // Filtering to show only next appointments for today OR
          // any if the date is not today
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
            </Appointment>
          ))
      );
  }

  return (
    <>
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
    </>
  );
};

export default Barber;
