import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import {
  darkerGrayColor,
  grayColor,
  lightGrayColor,
  primaryColor,
  secondaryColor,
} from '../../constants/websiteColors';
import { PrimaryButton, SecondaryButton } from '../general/Buttons';
import Calendar from '../general/Calendar';
import { Heading2, Heading3, Heading4, Heading5 } from '../general/Headings';
import Loading from '../general/Loading';
import Combo from '../icons/Combo';
import FatherSon from '../icons/FatherSon';
import Kid from '../icons/Kid';
import Razor from '../icons/Razor';
import Scissors from '../icons/Scissors';

const SelectTimeWrap = styled.div`
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

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  & > *:first-child {
    margin-bottom: 32px;
    text-align: center;
  }
  @media (min-width: 992px) {
    &:first-child {
      align-items: flex-start;
    }
    &:not(:first-child) {
      align-items: flex-end;
    }
  }
`;

const TimePicker = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 100px));
  grid-auto-rows: 50px;
  grid-gap: 32px;
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, minmax(80px, 100px));
  }
`;

const Time = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.active ? 'none' : `1px solid ${grayColor}`)};
  border-radius: 5px;
  transition-duration: 200ms;
  background-color: ${(props) => props.active && secondaryColor};
  cursor: pointer;
  &:hover {
    border-color: ${lightGrayColor};
  }
`;

const InactiveTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${grayColor};
  border-radius: 5px;
  transition-duration: 200ms;
`;

const SelectServiceWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 32px;
  width: 100%;
`;

const Service = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 32px;
  background-color: ${darkerGrayColor};
  border: 2px solid;
  border-radius: 10px;
  border-color: ${(props) => (props.active ? primaryColor : darkerGrayColor)};
  box-sizing: border-box;
  cursor: pointer;
  transition-duration: 200ms;
  &:hover {
    border-color: ${primaryColor};
  }
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column-reverse;
  & > *:last-child {
    margin-bottom: 64px;
  }
  @media (min-width: 992px) {
    flex-direction: row;
    & > *:last-child {
      margin-bottom: 0px;
    }
    & > *:first-child {
      margin-right: 64px;
    }
  }
`;

// GraphQL query getting all barber appointments for a date
const GET_BUSY_TIMES = gql`
  query GetBusyTimes($barberID: ID!, $date: String!) {
    appointments(date: $date, barberID: $barberID) {
      time
      duration
    }
  }
`;

function SelectTime({ timeFirst, currentAppointment, setCurrentAppointment, currentBarber }) {
  const history = useHistory();
  const { t } = useTranslation();

  // Retrieving appointments (only barber-first)
  const { loading, data: loadedAppoinents } = useQuery(GET_BUSY_TIMES, {
    variables: {
      date: currentAppointment.time.toISOString().split('T')[0],
      barberID: currentBarber.id,
    },
    skip: timeFirst,
  });

  // Determines whether user has already selected time
  const [selectedTime, setSelectedTime] = useState(false);

  // Determines whether user has already selected service
  const [selectedService, setSelectedService] = useState(false);

  // Date selection handler (passed to Calendar component)
  const handleDateChange = (date) => {
    setCurrentAppointment({ ...currentAppointment, time: date });
    // When changing date time resets to 00:00, so user has to choose again
    // Needed because user could go forward a day, check earlier time and go back
    setSelectedTime(false);
  };

  // Time selection handler (passed to Time component)
  const handleTimeChange = (hour) => {
    const appointmentDateTime = currentAppointment.time;
    appointmentDateTime.setUTCHours(hour, 0, 0, 0);
    setCurrentAppointment({ ...currentAppointment, time: appointmentDateTime });
    setSelectedTime(true);
  };

  // Service selection handler (passed to Service component)
  const handleServiceChange = ({ price, serviceName, duration }) => {
    setCurrentAppointment({ ...currentAppointment, serviceName, price, duration });
    setSelectedService(true);
  };

  // Going back handler
  const handleGoBack = () => {
    // Resetting the appointment info
    setCurrentAppointment({
      ...currentAppointment,
      duration: 0,
      serviceName: '',
      time: new Date(),
      price: 0,
    });
    history.goBack();
  };

  // Function checks if the passed date is today, ignoring time
  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  // Mapping appointments recieved from query to get their hours (only barber-first)
  // If some appointment has a duration more than an hour, we block the next hour
  // If time-first, it is assigned to empty array
  const busyHours =
    !timeFirst && !loading
      ? loadedAppoinents.appointments.reduce((accum, appointment) => {
          const newAccum = [...accum];
          newAccum.push(new Date(appointment.time).getUTCHours());
          if (appointment.duration > 60) {
            newAccum.push(newAccum[newAccum.length - 1] + 1);
          }
          return newAccum;
        }, [])
      : [];

  // Time options assembled in an array
  // Barbershop works 9 to 20
  const timeSelectors = [];
  for (let i = 9; i <= 20; i += 1) {
    // Checks if
    // 1) Time isn't busy for a master (only works in Barber First) AND
    // 2) Time is more than currently is in UTC
    // 3) OR it is not today
    if (
      !busyHours.includes(i) &&
      (i > new Date().getUTCHours() || !isToday(currentAppointment.time))
    ) {
      timeSelectors.push(
        <Time
          key={i}
          active={i === currentAppointment.time.getUTCHours()}
          onClick={() => handleTimeChange(i)}
        >
          <Heading4>{`${i}:00`}</Heading4>
        </Time>,
      );
    } else {
      timeSelectors.push(
        <InactiveTime key={i}>
          <Heading4 color={grayColor}>{`${i}:00`}</Heading4>
        </InactiveTime>,
      );
    }
  }

  // Services data
  const serviceSelectors = [
    {
      icon: Scissors({ color: primaryColor, height: 60 }),
      price: 80,
      serviceName: 'HAIRCUT',
      duration: 60,
    },
    {
      icon: Razor({ color: primaryColor, height: 60 }),
      price: 65,
      serviceName: 'SHAVING',
      duration: 60,
    },
    {
      icon: Combo({ color: primaryColor, height: 60 }),
      price: 130,
      serviceName: 'COMBO',
      duration: 90,
    },
    {
      icon: FatherSon({ color: primaryColor, height: 60 }),
      price: 125,
      serviceName: 'FATHERSON',
      duration: 120,
    },
    {
      icon: Kid({ color: primaryColor, height: 60 }),
      price: 50,
      serviceName: 'JUNIOR',
      duration: 60,
    },
  ];

  // If appointments are loading, we show the loading spinner
  // If not, we show the time picker
  const timeSection = loading ? (
    <Loading height="200px" width="200px" />
  ) : (
    <TimePicker>{timeSelectors}</TimePicker>
  );

  return (
    <>
      <Heading2>{t('Reservation')}</Heading2>
      <Heading3>{`${t('Step')} ${timeFirst ? 2 : 3}: ${t('Select time and service')} :`}</Heading3>
      <SelectTimeWrap>
        <SelectorContainer>
          <Heading3>{`${t('Select date')}:`}</Heading3>
          <Calendar date={currentAppointment.time} setDate={handleDateChange} />
        </SelectorContainer>
        <SelectorContainer>
          <Heading3>{`${t('Select time')}:`}</Heading3>
          {timeSection}
        </SelectorContainer>
      </SelectTimeWrap>
      <SelectServiceWrap>
        {serviceSelectors.map(({ price, serviceName, icon, duration }) => (
          <Service
            key={serviceName}
            active={serviceName === currentAppointment.serviceName}
            onClick={() => handleServiceChange({ price, serviceName, duration })}
          >
            {icon}
            <Heading5>{t(serviceName)}</Heading5>
            <Heading5>{`${duration} min.`}</Heading5>
            <Heading3>{`${price}$`}</Heading3>
          </Service>
        ))}
      </SelectServiceWrap>
      <ButtonsContainer>
        <SecondaryButton onClick={handleGoBack}>{t('Back')}</SecondaryButton>
        {
          // Showing the button only after user selected time and service
          selectedTime && selectedService && (
            <Link to={`/reserve/step${timeFirst ? 3 : 4}`}>
              <PrimaryButton>{t('Next')}</PrimaryButton>
            </Link>
          )
        }
      </ButtonsContainer>
    </>
  );
}

SelectTime.propTypes = {
  timeFirst: PropTypes.bool,
  currentAppointment: PropTypes.shape({
    duration: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    serviceName: PropTypes.string,
    time: PropTypes.instanceOf(Date),
    price: PropTypes.number,
  }).isRequired,
  setCurrentAppointment: PropTypes.func.isRequired,
  currentBarber: PropTypes.shape({
    fullName: PropTypes.string,
    specialisation: PropTypes.string,
    profileImageURL: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

SelectTime.defaultProps = {
  timeFirst: true,
};

export default SelectTime;
