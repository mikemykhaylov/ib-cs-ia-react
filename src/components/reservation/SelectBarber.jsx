import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import { darkerGrayColor, primaryColor, secondaryColor } from '../../constants/websiteColors';
import { PrimaryButton, SecondaryButton } from '../general/Buttons';
import { Heading2, Heading3, Heading5 } from '../general/Headings';
import Loading from '../general/Loading';
import Barber from '../icons/Barber';

const SelectBarberWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.loaded
      ? 'repeat(auto-fill, minmax(225px, 1fr))'
      : 'repeat(auto-fit, minmax(250px, 1fr))'};
  grid-auto-rows: auto;
  grid-gap: 64px;
`;

const BarberCard = styled.div`
  border-radius: 10px;
  background-color: ${darkerGrayColor};
  border: 2px solid;
  border-color: ${(props) => (props.active ? secondaryColor : darkerGrayColor)};
  cursor: pointer;
  transition-duration: 200ms;
  &:hover {
    border-color: ${secondaryColor};
  }
`;

const BarberImage = styled.div`
  border-radius: 10px 10px 0 0;
  width: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const BarberDescription = styled.div`
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  & > *:first-child {
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

// GraphQL query getting all free barbers for date and time
const GET_FREE_BARBERS = gql`
  query GetFreeBarbers($dateTime: String) {
    barbers(dateTime: $dateTime) {
      fullName
      profileImageURL
      id
      specialisation
    }
  }
`;

function SelectBarber({ timeFirst, currentAppointment, currentBarber, setCurrentBarber }) {
  const { t } = useTranslation();
  const history = useHistory();

  // Retrieving all barbers (only barber-first)
  // Retrieving free barbers for date and time (only time-first)
  const { loading, data: loadedBarbers } = useQuery(GET_FREE_BARBERS, {
    variables: {
      dateTime: timeFirst ? currentAppointment.time.toISOString() : null,
    },
  });

  // Determines whether user has already selected time
  const [selectedBarber, setSelectedBarber] = useState(false);

  // Barber selection handler (passed to BarberCard component)
  const handleBarberChange = (barber) => {
    // Cloning the barber object and deleting __typename added by GraphQL
    const barberClone = { ...barber };
    // eslint-disable-next-line no-underscore-dangle
    delete barberClone.__typename;
    setCurrentBarber({ ...barberClone });
    setSelectedBarber(true);
  };

  // Going back handler
  const handleGoBack = () => {
    // Resetting the barber info
    setCurrentBarber({
      fullName: '',
      specialisation: '',
      profileImageURL: '',
      id: '',
    });
    history.goBack();
  };

  // Mapping available barbers to BarberCards
  let barberCards;
  if (loadedBarbers) {
    barberCards =
      loadedBarbers.barbers.length > 0 ? (
        <SelectBarberWrap loaded={loadedBarbers ? 1 : 0}>
          {loadedBarbers.barbers.map((availableBarber) => (
            <BarberCard
              key={availableBarber.id}
              onClick={() => handleBarberChange(availableBarber)}
              active={currentBarber && currentBarber.id === availableBarber.id}
            >
              {availableBarber.profileImageURL ? (
                <BarberImage src={availableBarber.profileImageURL} />
              ) : (
                <BarberImage>
                  <Barber height={250} color={primaryColor} />
                </BarberImage>
              )}
              <BarberDescription>
                <Heading3>{availableBarber.fullName}</Heading3>
                <Heading5>{t(availableBarber.specialisation)}</Heading5>
              </BarberDescription>
            </BarberCard>
          ))}
        </SelectBarberWrap>
      ) : (
        // If no barber is available, we show the none are available message (only time-first)
        <Heading3>{t('Sorry, no barbers are available for that time')}</Heading3>
      );
  }

  return (
    <>
      <Heading2>{t('Reservation')}</Heading2>
      <Heading3>{`${t('Step')} ${timeFirst ? 3 : 2}: ${t('Select a master')} :`}</Heading3>
      {loading ? <Loading width="100%" height="200px" /> : barberCards}
      {!loading && (
        <ButtonsContainer>
          <SecondaryButton onClick={handleGoBack}>{t('Back')}</SecondaryButton>
          {selectedBarber && (
            <Link to={`/reserve/step${timeFirst ? 4 : 3}`}>
              <PrimaryButton>{t('Next')}</PrimaryButton>
            </Link>
          )}
        </ButtonsContainer>
      )}
    </>
  );
}

SelectBarber.propTypes = {
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
  timeFirst: PropTypes.bool,
  currentBarber: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    specialization: PropTypes.string,
    profileImageURL: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  setCurrentBarber: PropTypes.func.isRequired,
};

SelectBarber.defaultProps = {
  timeFirst: false,
};

export default SelectBarber;
