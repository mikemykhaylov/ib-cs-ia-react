/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import ky from 'ky';

import { Heading2, Heading3, Heading4 } from '../General/Headings';
import { PrimaryButton, SecondaryButton } from '../General/Buttons';
import Calendar from '../General/Calendar';
import Loading from '../General/Loading';

import { grayColor, lightGrayColor, primaryColor } from '../../constants/websiteColors';

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
`;

const TimePicker = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 100px));
  grid-auto-rows: 50px;
  grid-gap: 32px;
`;

const Time = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.active ? 'none' : `1px solid ${grayColor}`)};
  border-radius: 5px;
  transition-duration: 200ms;
  background-color: ${(props) => props.active && primaryColor};
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

function SelectTime({ time, setTime, timeFirst, currentBarber }) {
  const history = useHistory();

  const [busyHours, setBusyHours] = useState([]);
  const [loadedBusyHours, setLoadedBusyHours] = useState(false);

  // Determines whether user has already selected time, and not just got the value
  // from previously rendered component
  const [selectedTime, setSelectedTime] = useState(time.getUTCHours() !== 0);

  // Load the available times for the master (only works in Barber First)
  if (!timeFirst) {
    useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;
      // Slowing down the loading, so user thinks it is loading
      setTimeout(() => {
        ky.post('https://us-central1-dywizjon-303.cloudfunctions.net/api/appointments/getforday', {
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
          .catch(() => {  })
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
      <Heading2>
        Reservation
        <br />
        {`Step ${timeFirst ? 2 : 3}: Select day and time`}
      </Heading2>
      <SelectTimeWrap>
        <SelectorContainer>
          <Heading3>Select Date:</Heading3>
          <Calendar time={time} setTime={handleDateChange} />
        </SelectorContainer>
        <SelectorContainer>
          <Heading3>Select Time:</Heading3>
          {timeSection}
        </SelectorContainer>
      </SelectTimeWrap>
      <ButtonsContainer>
        <SecondaryButton
          onClick={() => {
            // Resetting the time on going back to previous step
            const currentLocalDate = new Date();
            const currentPolandISODate = `${currentLocalDate
              .toISOString()
              .slice(0, 11)}02:00:00+02:00`;
            const currentPolandDate = new Date(currentPolandISODate);
            setTime(currentPolandDate);
            history.goBack();
          }}
        >
          Back
        </SecondaryButton>
        {
          // Showing the button only after user selected time
          selectedTime && (
            <Link to={`/reserve/step${timeFirst ? 3 : 4}`}>
              <PrimaryButton>Next</PrimaryButton>
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
  currentBarber: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    specialization: PropTypes.string,
    profileImageURL: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default SelectTime;
