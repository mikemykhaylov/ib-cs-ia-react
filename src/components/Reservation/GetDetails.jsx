import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ky from 'ky';

import { Heading2, Heading4, Heading3, Heading5 } from '../General/Headings';
import {
  darkerGrayColor,
  grayColor,
  lightGrayColor,
  primaryColor,
} from '../../constants/websiteColors';
import Barber from '../Icons/Barber';
import { SecondaryButton, PrimaryButton } from '../General/Buttons';

import { validateCreateAppointment } from '../../utils/validateInput';

const GetDetailsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 64px;
  }
  @media (min-width: 1200px) {
    align-items: flex-start;
    flex-direction: row;
    & > *:not(:last-child) {
      margin-bottom: 0px;
    }
  }
`;

const GetDetailsContainer = styled.div`
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
  @media (min-width: 576px) {
    width: 400px;
  }
`;

const GetDetailsFormRow = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 16px;
  }
`;

const GetDetailsInputGroup = styled.div`
  flex-grow: 1;
  text-align: left;
  & > *:first-child {
    margin-bottom: 16px;
  }
  & > *:nth-child(2) {
    margin-bottom: 8px;
  }
`;

const GetDetailsInput = styled.input`
  background-color: ${darkerGrayColor};
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 0;
  padding: 9px 12px;
  width: 100%;
  font-family: Montserrat;
  font-size: 16px;
  line-height: 24px;
  color: ${lightGrayColor};
  &::placeholder {
    color: ${grayColor};
  }
`;

const ReservationSummaryTimeRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ReservationSummaryTime = styled.div`
  text-align: center;
`;

const ReservationSummaryBarberContainer = styled.div`
  width: 100%;
  text-align: center;
  & > *:first-child {
    margin-bottom: 16px;
  }
`;

const ReservationSummaryBarber = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  & > *:first-child {
    margin-bottom: 32px;
  }
  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: space-around;
    & > *:first-child {
      margin-bottom: 0px;
    }
  }
`;

const ReservationSummaryBarberPhoto = styled.div`
  width: 125px;
  height: 125px;
  object-fit: cover;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.div`
  width: 100%;
  text-align: center;
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
  @media (min-width: 1200px) {
    flex-direction: row;
    & > *:last-child {
      margin-bottom: 0px;
    }
    & > *:first-child {
      margin-right: 64px;
    }
  }
`;

function GetDetails({ time, currentBarber, userInfo, setUserInfo, setFinishedReservation }) {
  const history = useHistory();

  // Object containing all validation errors
  const [errorsObj, setErrorsObj] = useState(null);
  // Object containing all DB creation errors
  // ! Not tested!
  const [DBErrors, setDBErrors] = useState({ error: null });

  // Form input handler
  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Form submit handler
  const handleSubmit = async () => {
    const newAppointment = { time: time.toISOString(), barberID: currentBarber.id, ...userInfo };
    const errors = await validateCreateAppointment(newAppointment);
    if (!errors.valid) {
      setErrorsObj(errors);
      return;
    }
    const response = await ky
      .post('https://us-central1-dywizjon-303.cloudfunctions.net/api/appointments', {
        json: newAppointment,
      })
      .json();
    if (response.err) {
      setDBErrors(response.err);
      return;
    }
    // Setting finishedReservation to true and allowing access to /reserve/success
    setFinishedReservation(true);
    history.push('/reserve/success');
  };
  return (
    <>
      <Heading2>
        Reservation
        <br />
        Step 4: Details and confirmation
      </Heading2>
      <GetDetailsWrap>
        <GetDetailsContainer>
          <Heading3>Contact information</Heading3>
          <GetDetailsFormRow>
            <GetDetailsInputGroup>
              <Heading4>First name:</Heading4>
              <GetDetailsInput
                name="firstName"
                onChange={handleInput}
                value={userInfo.firstName}
                placeholder="Enter first name:"
              />
              {errorsObj && !errorsObj.valid && errorsObj.errors.firstName && (
                <Heading5 color={primaryColor}>{errorsObj.errors.firstName}</Heading5>
              )}
            </GetDetailsInputGroup>
            <GetDetailsInputGroup>
              <Heading4>Last name:</Heading4>
              <GetDetailsInput
                name="lastName"
                onChange={handleInput}
                value={userInfo.lastName}
                placeholder="Enter last name:"
              />
              {errorsObj && !errorsObj.valid && errorsObj.errors.lastName && (
                <Heading5 color={primaryColor}>{errorsObj.errors.lastName}</Heading5>
              )}
            </GetDetailsInputGroup>
          </GetDetailsFormRow>
          <GetDetailsFormRow>
            <GetDetailsInputGroup>
              <Heading4>Email:</Heading4>
              <GetDetailsInput
                name="email"
                onChange={handleInput}
                value={userInfo.email}
                type="email"
                placeholder="Enter email:"
              />
              {errorsObj && !errorsObj.valid && errorsObj.errors.email && (
                <Heading5 color={primaryColor}>{errorsObj.errors.email}</Heading5>
              )}
            </GetDetailsInputGroup>
          </GetDetailsFormRow>
          <GetDetailsFormRow>
            <GetDetailsInputGroup>
              <Heading4>Phone Number:</Heading4>
              <GetDetailsInput
                name="phoneNumber"
                onChange={handleInput}
                value={userInfo.phoneNumber}
                type="tel"
                placeholder="Enter phone number:"
              />
              {errorsObj && !errorsObj.valid && errorsObj.errors.phoneNumber && (
                <Heading5 color={primaryColor}>{errorsObj.errors.phoneNumber}</Heading5>
              )}
            </GetDetailsInputGroup>
          </GetDetailsFormRow>
        </GetDetailsContainer>
        <GetDetailsContainer>
          <Heading3>Reservation Summary</Heading3>
          <ReservationSummaryTimeRow>
            <ReservationSummaryTime>
              <Heading4 color={lightGrayColor}>Date</Heading4>
              <Heading4 color={grayColor}>
                {time.toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Heading4>
            </ReservationSummaryTime>
            <ReservationSummaryTime>
              <Heading4 color={lightGrayColor}>Time</Heading4>
              <Heading4 color={grayColor}>
                {`${time.getUTCHours() + 2}:${time.getUTCMinutes().toString().padStart(2, '0')}`}
              </Heading4>
            </ReservationSummaryTime>
          </ReservationSummaryTimeRow>
          <ReservationSummaryBarberContainer>
            <Heading4>Barber</Heading4>
            <ReservationSummaryBarber>
              {currentBarber.profileImageURL ? (
                <ReservationSummaryBarberPhoto src={currentBarber.profileImageURL} />
              ) : (
                <ReservationSummaryBarberPhoto>
                  <Barber height={100} color={primaryColor} />
                </ReservationSummaryBarberPhoto>
              )}
              <Heading4>{`${currentBarber.firstName} ${currentBarber.lastName}`}</Heading4>
            </ReservationSummaryBarber>
          </ReservationSummaryBarberContainer>
        </GetDetailsContainer>
      </GetDetailsWrap>
      {DBErrors.err && (
        <ErrorContainer>
          <Heading3>{DBErrors.err}</Heading3>
        </ErrorContainer>
      )}
      <ButtonsContainer>
        <SecondaryButton onClick={() => history.goBack()}>Back</SecondaryButton>
        <PrimaryButton onClick={() => handleSubmit()}>Confirm</PrimaryButton>
      </ButtonsContainer>
    </>
  );
}

GetDetails.propTypes = {
  time: PropTypes.instanceOf(Date).isRequired,
  currentBarber: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    specialization: PropTypes.string,
    profileImageURL: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
  setUserInfo: PropTypes.func.isRequired,
  setFinishedReservation: PropTypes.func.isRequired,
};

export default GetDetails;
