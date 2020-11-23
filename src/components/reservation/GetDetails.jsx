import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ky from 'ky';

import { useTranslation } from 'react-i18next';
import { Heading2, Heading4, Heading3, Heading5 } from '../general/Headings';
import { grayColor, lightGrayColor, primaryColor } from '../../constants/websiteColors';
import Barber from '../icons/Barber';
import { SecondaryButton, PrimaryButton } from '../general/Buttons';

import { validateCreateAppointment } from '../../utils/validateInput';
import { Input, FormRow, FormContainer } from '../general/Form';

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

function GetDetails({
  time,
  currentBarber,
  currentService,
  userInfo,
  setUserInfo,
  setFinishedReservation,
}) {
  const { t, i18n } = useTranslation();
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
    const newAppointment = {
      time: time.toISOString(),
      barberID: currentBarber.id,
      serviceName: currentService.title,
      hourHalves: currentService.hourHalves,
      ...userInfo,
    };
    const errors = await validateCreateAppointment(newAppointment);
    if (!errors.valid) {
      setErrorsObj(errors);
      return;
    }
    const response = await ky
      .post('https://europe-west3-dywizjon-303.cloudfunctions.net/api/appointments', {
        json: newAppointment,
      })
      .json();
    if (response.error) {
      setDBErrors(response.error);
      return;
    }
    // Setting finishedReservation to true and allowing access to /reserve/success
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
              value={userInfo.firstName}
              onChange={handleInput}
              errorsObj={errorsObj}
            />
            <Input
              heading="Last name"
              value={userInfo.lastName}
              onChange={handleInput}
              errorsObj={errorsObj}
            />
          </FormRow>
          <FormRow>
            <Input
              heading="Email"
              value={userInfo.email}
              onChange={handleInput}
              errorsObj={errorsObj}
            />
          </FormRow>
          <FormRow>
            <Input
              heading="Phone number"
              value={userInfo.phoneNumber}
              onChange={handleInput}
              errorsObj={errorsObj}
            />
          </FormRow>
        </FormContainer>
        <GetDetailsContainer>
          <Heading3>{t('Reservation Summary')}</Heading3>
          <ReservationSummaryRow>
            <ReservationSummaryColumn>
              <Heading4 color={lightGrayColor}>{t('Date')}</Heading4>
              <Heading5 color={grayColor}>
                {time.toLocaleDateString(i18n.language, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Heading5>
            </ReservationSummaryColumn>
            <ReservationSummaryColumn>
              <Heading4 color={lightGrayColor}>{t('Time')}</Heading4>
              <Heading5 color={grayColor}>
                {`${time.getUTCHours() + 2}:${time.getUTCMinutes().toString().padStart(2, '0')}`}
              </Heading5>
            </ReservationSummaryColumn>
          </ReservationSummaryRow>
          <ReservationSummaryRow>
            <ReservationSummaryColumn>
              <Heading4 color={lightGrayColor}>{t('Service')}</Heading4>
              <Heading5 color={grayColor}>{t(currentService.title)}</Heading5>
            </ReservationSummaryColumn>
            <ReservationSummaryColumn>
              <Heading4 color={lightGrayColor}>{t('Money to bring')}</Heading4>
              <Heading5 color={grayColor}>{`${currentService.price}zł`}</Heading5>
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
              <Heading4>{`${currentBarber.firstName} ${currentBarber.lastName}`}</Heading4>
            </ReservationSummaryBarber>
          </ReservationSummaryBarberContainer>
        </GetDetailsContainer>
      </GetDetailsWrap>
      {DBErrors.error && (
        <ErrorContainer>
          <Heading3>{DBErrors.error}</Heading3>
        </ErrorContainer>
      )}
      <ButtonsContainer>
        <SecondaryButton onClick={() => history.goBack()}>{t('Back')}</SecondaryButton>
        <PrimaryButton onClick={() => handleSubmit()}>{t('Confirm')}</PrimaryButton>
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
  currentService: PropTypes.shape({
    price: PropTypes.number,
    title: PropTypes.string,
    hourHalves: PropTypes.number,
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
