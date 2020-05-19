import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import useWindowWidth from '../../hooks/useWindowWidth';

import { Heading2, Heading4 } from '../General/Headings';

import Time from '../Icons/Time';
import Barber from '../Icons/Barber';
import { primaryColor } from '../../constants/websiteColors';

const SelectWayWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 64px;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    & > *:not(:last-child) {
      margin-bottom: 0px;
    }
  }
`;

const Way = styled.div`
  cursor: pointer;
  & > * {
    text-align: center;
  }
  & > *:not(:last-child) {
    margin-bottom: 64px;
  }
`;

function SelectWay({ setTimeFirst }) {
  const history = useHistory();
  const windowWidth = useWindowWidth();
  const handleWaySelect = (timeFirst) => {
    setTimeFirst(timeFirst);
    history.push('/reserve/step2');
  };

  return (
    <>
      <Heading2>
        Reservation
        <br />
        Step 1: Select a way:
      </Heading2>
      <SelectWayWrap>
        <Way onClick={() => handleWaySelect(true)}>
          <Time color={primaryColor} height={windowWidth >= 768 ? 180 : 240} />
          <Heading4>Reserve for a specific time</Heading4>
        </Way>
        <Way onClick={() => handleWaySelect(false)}>
          <Barber color={primaryColor} height={windowWidth >= 768 ? 180 : 240} />
          <Heading4>Reserve for a specific master</Heading4>
        </Way>
      </SelectWayWrap>
    </>
  );
}

SelectWay.propTypes = {
  setTimeFirst: PropTypes.func.isRequired,
};

export default SelectWay;
