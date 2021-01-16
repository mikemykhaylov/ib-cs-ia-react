import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import { grayColor, lightGrayColor, primaryColor } from '../../constants/websiteColors';
import { validateCreateAppointment } from '../../utils/validateInput';
import { PrimaryButton, SecondaryButton } from '../general/Buttons';
import { FormContainer, FormRow, Input } from '../general/Form';
import { Heading2, Heading3, Heading4, Heading5 } from '../general/Headings';
import Barber from '../icons/Barber';

const GetDetailsWrap = styled.div`
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

const GetDetailsContainer = styled.div`
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
  @media (min-width: 576px) {
    width: 400px;
  }
`;

const ReservationSummaryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ReservationSummaryColumn = styled.div`
  text-align: start;
  & > :first-child {
    margin-bottom: 1rem;
  }
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

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      id
    }
  }
`;

function GetDetails({
  currentBarber,
  currentAppointment,
  setCurrentAppointment,
  setFinishedReservation,
}) {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  // Creating a new appointment
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  // Object containing all validation errors
  const [validationErrors, setValidationErrors] = useState(null);

  // Form input handler
  const handleInput = (e) => {
    setCurrentAppointment({ ...currentAppointment, [e.target.name]: e.target.value });
  };

  // Form submit handler
  const handleSubmit = async () => {
    const {
      duration,
      email,
      phoneNumber,
      serviceName,
      time,
      firstName,
      lastName,
    } = currentAppointment;

    // Validating inputs
    const errors = await validateCreateAppointment({ firstName, lastName, phoneNumber, email });
    if (!errors.valid) {
      setValidationErrors(errors);
      return;
    }

    const newAppointment = {
      duration,
      email,
      phoneNumber,
      serviceName,
      name: { first: firstName, last: lastName },
      time: time.toISOString(),
      barberID: currentBarber.id,
    };

    createAppointment({ variables: { input: newAppointment } });
    setFinishedReservation(true);
    history.push('/reserve/success');
  };
  return (
    <>
      <Heading2>{t('Reservation')}</Heading2>
      <Heading3>{`${t('Step')} 4: ${t('Details and confirmation')} :`}</Heading3>
      <GetDetailsWrap>
        <FormContainer>
          <Heading3>{t('Contact information')}</Heading3>
          <FormRow>
            <Input
              heading="First name"
              value={currentAppointment.firstName}
              placeholder="Clark"
              onChange={handleInput}
              errorsObj={validationErrors}
            />
            <Input
              heading="Last name"
              value={currentAppointment.lastName}
              placeholder="Kent"
              onChange={handleInput}
              errorsObj={validationErrors}
            />
          </FormRow>
          <FormRow>
            <Input
              heading="Email"
              value={currentAppointment.email}
              placeholder="example@email.com"
              onChange={handleInput}
              errorsObj={validationErrors}
            />
          </FormRow>
          <FormRow>
            <Input
              heading="Phone number"
              value={currentAppointment.phoneNumber}
              placeholder="+XXXXXXXXXXXX"
              onChange={handleInput}
              errorsObj={validationErrors}
            />
          </FormRow>
        </FormContainer>
        <GetDetailsContainer>
          <Heading3>{t('Reservation Summary')}</Heading3>
          <ReservationSummaryRow>
            <ReservationSummaryColumn>
              <Heading4 color={lightGrayColor}>{t('Date')}</Heading4>
              <Heading5 color={grayColor}>
                {currentAppointment.time.toLocaleDateString(i18n.language, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Heading5>
            </ReservationSummaryColumn>
            <ReservationSummaryColumn>
              <Heading4 color={lightGrayColor}>{t('Time')}</Heading4>
              <Heading5 color={grayColor}>
                {`${currentAppointment.time.getUTCHours()}:${currentAppointment.time
                  .getUTCMinutes()
                  .toString()
                  .padStart(2, '0')}`}
              </Heading5>
            </ReservationSummaryColumn>
          </ReservationSummaryRow>
          <ReservationSummaryRow>
            <ReservationSummaryColumn>
              <Heading4 color={lightGrayColor}>{t('Service')}</Heading4>
              <Heading5 color={grayColor}>{t(currentAppointment.serviceName)}</Heading5>
            </ReservationSummaryColumn>
            <ReservationSummaryColumn>
              <Heading4 color={lightGrayColor}>{t('Money to bring')}</Heading4>
              <Heading5 color={grayColor}>{`${currentAppointment.price}$`}</Heading5>
            </ReservationSummaryColumn>
          </ReservationSummaryRow>
          <ReservationSummaryBarberContainer>
            <Heading4>{t('Barber')}</Heading4>
            <ReservationSummaryBarber>
              {currentBarber.profileImageURL ? (
                <ReservationSummaryBarberPhoto src={currentBarber.profileImageURL} />
              ) : (
                <ReservationSummaryBarberPhoto>
                  <Barber height={100} color={primaryColor} />
                </ReservationSummaryBarberPhoto>
              )}
              <Heading4>{currentBarber.fullName}</Heading4>
            </ReservationSummaryBarber>
          </ReservationSummaryBarberContainer>
        </GetDetailsContainer>
      </GetDetailsWrap>
      <ButtonsContainer>
        <SecondaryButton onClick={() => history.goBack()}>{t('Back')}</SecondaryButton>
        <PrimaryButton onClick={() => handleSubmit()}>{t('Confirm')}</PrimaryButton>
      </ButtonsContainer>
    </>
  );
}

GetDetails.propTypes = {
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
  currentBarber: PropTypes.shape({
    fullName: PropTypes.string,
    specialization: PropTypes.string,
    profileImageURL: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  setCurrentAppointment: PropTypes.func.isRequired,
  setFinishedReservation: PropTypes.func.isRequired,
};

export default GetDetails;
