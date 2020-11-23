import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Heading4 } from './Headings';

import ArrowRight from '../icons/ArrowRight';
import ArrowLeft from '../icons/ArrowLeft';
import { secondaryColor, lightGrayColor } from '../../constants/websiteColors';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  & > *:first-child {
    margin-bottom: 32px;
  }
`;

const MonthWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChangeMonthButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const DatePicker = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  & > *:first-child {
    margin-bottom: 16px;
  }
`;

const WeekDays = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 32px);
  grid-auto-rows: 32px;
  grid-gap: 8px;
  & > :first-child {
    grid-column-start: ${(props) => props.dayOfWeekOfMonthBeginning};
  }
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${(props) => props.active && secondaryColor};
  cursor: pointer;
  transition-duration: 200ms;
  &:hover {
    background-color: ${secondaryColor};
  }
`;

function Calendar({ time, setTime, allDates }) {
  const { t, i18n } = useTranslation();
  const dayOfWeekOfMonthBeginning = new Date(time.getFullYear(), time.getMonth(), 1).getDay();
  const daysInCurrentMonth = new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate();
  const days = [];
  for (let i = 1; i <= daysInCurrentMonth; i += 1) {
    days[i] = (
      <Day
        key={i}
        active={i === time.getDate()}
        onClick={
          i >= new Date().getDate() || allDates ? () => setTime(new Date(time.setDate(i))) : null
        }
      >
        <Heading4>{i}</Heading4>
      </Day>
    );
  }
  return (
    <CalendarContainer>
      <MonthWrap>
        <ChangeMonthButton
          onClick={
            time.getMonth() - 1 >= new Date().getMonth() ||
            time.getFullYear() > new Date().getFullYear() ||
            allDates
              ? () => setTime(new Date(time.setMonth(time.getMonth() - 1)))
              : null
          }
        >
          <ArrowLeft height={24} color={lightGrayColor} />
        </ChangeMonthButton>
        <Heading4>
          {time.toLocaleString(i18n.language, { year: 'numeric', month: 'long' })}
        </Heading4>
        <ChangeMonthButton onClick={() => setTime(new Date(time.setMonth(time.getMonth() + 1)))}>
          <ArrowRight height={24} color={lightGrayColor} />
        </ChangeMonthButton>
      </MonthWrap>
      <DatePicker>
        <WeekDays>
          <Heading4 color={secondaryColor}>{t('Mo')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Tu')}</Heading4>
          <Heading4 color={secondaryColor}>{t('We')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Th')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Fr')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Sa')}</Heading4>
          <Heading4 color={secondaryColor}>{t('Su')}</Heading4>
        </WeekDays>
        <Days dayOfWeekOfMonthBeginning={dayOfWeekOfMonthBeginning}>{days}</Days>
      </DatePicker>
    </CalendarContainer>
  );
}

Calendar.propTypes = {
  time: PropTypes.instanceOf(Date).isRequired,
  setTime: PropTypes.func.isRequired,
  allDates: PropTypes.bool,
};

Calendar.defaultProps = {
  allDates: false,
};

export default Calendar;
