/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import ky from 'ky';

import { Heading2, Heading3, Heading5 } from '../General/Headings';
import { SecondaryButton, PrimaryButton } from '../General/Buttons';
import Loading from '../General/Loading';

import { darkerGrayColor, primaryColor } from '../../constants/websiteColors';
import Barber from '../Icons/Barber';

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
  border: ${(props) => props.active && `2px solid ${primaryColor}`};
  cursor: pointer;
  transition-duration: 200ms;
  &:hover {
    border: 2px solid ${primaryColor};
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

function SelectBarber({ time, timeFirst, currentBarber, setCurrentBarber }) {
  const [availableBarbers, setAvailableBarbers] = useState([]);
  const [loadedBarbers, setLoadedBarbers] = useState(false);
  const history = useHistory();
  // Loading all barbers (only works in Barber First)
  // Loading available barbers (only works in Time First)
  useEffect(() => {
    (async () => {
      let fetchedAvailableBarbers;
      if (timeFirst) {
        fetchedAvailableBarbers = await ky
          .post('https://europe-west3-dywizjon-303.cloudfunctions.net/api/barbers/available', {
            json: { time: time.toISOString() },
          })
          .json();
      } else {
        fetchedAvailableBarbers = await ky
          .get('https://europe-west3-dywizjon-303.cloudfunctions.net/api/barbers/all')
          .json();
      }
      setAvailableBarbers(fetchedAvailableBarbers);
      setLoadedBarbers(true);
    })();
  }, []);

  // Mapping available barbers to BarberCards
  const barberCards =
    availableBarbers.length > 0 ? (
      <SelectBarberWrap loaded={loadedBarbers ? 1 : 0}>
        {availableBarbers.map((availableBarber) => (
          <BarberCard
            key={availableBarber.id}
            onClick={() => setCurrentBarber(availableBarber)}
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
              <Heading3>{`${availableBarber.firstName} ${availableBarber.lastName}`}</Heading3>
              <Heading5>{availableBarber.specialization}</Heading5>
            </BarberDescription>
          </BarberCard>
        ))}
      </SelectBarberWrap>
    ) : (
      // If no barber is available, we show the none are available message (only works in Time First)
      <Heading3>Sorry, no barbers are available for that time</Heading3>
    );
  return (
    <>
      <Heading2>
        Reservation
        <br />
        {`Step ${timeFirst ? 3 : 2}: Select master`}
      </Heading2>
      {loadedBarbers ? barberCards : <Loading width="100%" height="200px" />}
      {loadedBarbers ? (
        <ButtonsContainer>
          <SecondaryButton
            onClick={() => {
              // Resetting the barber on going back to previous step
              setCurrentBarber({
                firstName: '',
                lastName: '',
                specialization: '',
                profileImageURL: '',
                id: '',
              });
              history.goBack();
            }}
          >
            Back
          </SecondaryButton>
          {currentBarber.firstName && (
            <Link to={`/reserve/step${timeFirst ? 4 : 3}`}>
              <PrimaryButton>Next</PrimaryButton>
            </Link>
          )}
        </ButtonsContainer>
      ) : null}
    </>
  );
}

SelectBarber.propTypes = {
  time: PropTypes.instanceOf(Date).isRequired,
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

export default SelectBarber;
