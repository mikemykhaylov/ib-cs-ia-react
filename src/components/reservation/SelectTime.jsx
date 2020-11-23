/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import ky from 'ky';

import Scissors from '../icons/Scissors';

import { Heading2, Heading3, Heading4, Heading5 } from '../general/Headings';
import { PrimaryButton, SecondaryButton } from '../general/Buttons';
import Calendar from '../general/Calendar';
import Loading from '../general/Loading';

import {
  grayColor,
  lightGrayColor,
  primaryColor,
  darkerGrayColor,
  secondaryColor,
} from '../../constants/websiteColors';
import Razor from '../icons/Razor';
import Combo from '../icons/Combo';
import FatherSon from '../icons/FatherSon';
import Kid from '../icons/Kid';

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

function SelectTime({
  time,
  setTime,
  timeFirst,
  currentService,
  setCurrentService,
  currentBarber,
}) {
  const history = useHistory();
  const { t } = useTranslation();

  const [busyHours, setBusyHours] = useState([]);
  const [loadedBusyHours, setLoadedBusyHours] = useState(false);

  // Determines whether user has already selected time, and not just got the value
  // from previously rendered component
  const [selectedTime, setSelectedTime] = useState(time.getUTCHours() !== 0);

  // Determines whether user has already selected a service
  const [selectedService, setSelectedService] = useState(false);

  // Load the available times for the master (only works in Barber First)
  if (!timeFirst) {
    useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;
      // Slowing down the loading, so user thinks it is loading
      setTimeout(() => {
        ky.post('https://europe-west3-dywizjon-303.cloudfunctions.net/api/appointments/getforday', {
          json: { day: time.toISOString().substring(0, 10), barberID: currentBarber.id },
          signal,
        })
          .json()
          .then((busyTimes) => {
            setBusyHours(
              busyTimes.map((appointment) => new Date(appointment.time).getUTCHours() + 2),
            );
            setLoadedBusyHours(true);
          })
          .catch(() => {});
      }, 500);
      // Aborting request if user leaves page before loading available times
      return () => controller.abort();
    }, [time]);
  }

  // Date selection handler
  const handleDateChange = (date) => {
    setTime(date);
    setLoadedBusyHours(false);
  };

  // Time selection handler
  const handleTimeChange = (date) => {
    setTime(date);
    setSelectedTime(true);
  };

  const handleServiceChange = ({ price, title, hourHalves }) => {
    setCurrentService({ title, price, hourHalves });
    setSelectedService(true);
  };

  const handleGoBack = () => {
    const currentLocalDate = new Date();
    const currentPolandISODate = `${currentLocalDate.toISOString().slice(0, 11)}02:00:00+02:00`;
    const currentPolandDate = new Date(currentPolandISODate);
    setTime(currentPolandDate);
    setCurrentService({
      price: 0,
      title: '',
      hourHalves: 0,
    });
    history.goBack();
  };

  // Time options assembled in an array
  const timeSelectors = [];
  for (let i = 10; i <= 20; i += 1) {
    // Checks if a time isn't busy for a master (only works in Barber First)
    if (!busyHours.includes(i)) {
      timeSelectors.push(
        <Time
          key={i}
          active={i === time.getUTCHours() + 2}
          onClick={() => handleTimeChange(new Date(time.setUTCHours(i - 2)))}
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

  const serviceSelectors = [
    {
      icon: Scissors({ color: primaryColor, height: 60 }),
      price: 80,
      title: 'Haircut',
      hourHalves: 2,
    },
    {
      icon: Razor({ color: primaryColor, height: 60 }),
      price: 65,
      title: 'Shaving',
      hourHalves: 2,
    },
    {
      icon: Combo({ color: primaryColor, height: 60 }),
      price: 130,
      title: 'Combo',
      hourHalves: 3,
    },
    {
      icon: FatherSon({ color: primaryColor, height: 60 }),
      price: 125,
      title: 'Father + son',
      hourHalves: 4,
    },
    {
      icon: Kid({ color: primaryColor, height: 60 }),
      price: 50,
      title: 'Junior haircut (<10 years)',
      hourHalves: 2,
    },
  ];

  let timeSection;
  // If available times have loaded, or user chose Time First, we can show the timepicker
  // If available times are loading, we show the loading spinner
  if (timeFirst || (!timeFirst && loadedBusyHours)) {
    timeSection = <TimePicker>{timeSelectors}</TimePicker>;
  } else {
    timeSection = <Loading height="200px" width="200px" />;
  }

  return (
    <>
      <Heading2>{t('Reservation')}</Heading2>
      <Heading3>{`${t('Step')} ${timeFirst ? 2 : 3}: ${t('Select time and service')} :`}</Heading3>
      <SelectTimeWrap>
        <SelectorContainer>
          <Heading3>{`${t('Select date')}:`}</Heading3>
          <Calendar time={time} setTime={handleDateChange} />
        </SelectorContainer>
        <SelectorContainer>
          <Heading3>{`${t('Select time')}:`}</Heading3>
          {timeSection}
        </SelectorContainer>
      </SelectTimeWrap>
      <SelectServiceWrap>
        {serviceSelectors.map(({ price, title, icon, hourHalves }) => (
          <Service
            key={title}
            active={title === currentService.title}
            onClick={() => handleServiceChange({ price, title, hourHalves })}
          >
            {icon}
            <Heading5>{t(title)}</Heading5>
            <Heading5>{`${hourHalves * 30} min.`}</Heading5>
            <Heading3>{`${price}zł`}</Heading3>
          </Service>
        ))}
      </SelectServiceWrap>
      <ButtonsContainer>
        <SecondaryButton onClick={handleGoBack}>{t('Back')}</SecondaryButton>
        {
          // Showing the button only after user selected time
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
  time: PropTypes.instanceOf(Date).isRequired,
  setTime: PropTypes.func.isRequired,
  timeFirst: PropTypes.bool,
  currentService: PropTypes.shape({
    price: PropTypes.number,
    title: PropTypes.string,
    hourHalves: PropTypes.number,
  }).isRequired,
  setCurrentService: PropTypes.func.isRequired,
  currentBarber: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    specialization: PropTypes.string,
    profileImageURL: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default SelectTime;
